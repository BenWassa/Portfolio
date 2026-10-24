#!/usr/bin/env node
/**
 * Portfolio health check (issue #14).
 *
 *   npm run health [-- --threshold-days=30 --summary=health.md --skip-links --skip-stale --strict]
 *
 * Reads src/js/project-descriptions.ts via the generator's own parser and reports:
 *   1. LINKS (hard failure): every `href` and `demoUrl` must end at HTTP 200 after redirects.
 *   2. STALENESS (warning): a card whose `repoUrl` default branch has commits newer than its
 *      `lastVerified` date, and cards with no `lastVerified`.
 *   3. TEMPLATE LAG (warning): cards with `demoMode: 'template'` whose template repo (taken from
 *      `demoUrl`/`href`) trails the real repo (`repoUrl`) by more than the threshold. This is the
 *      documented exception in docs/open/INCLUSION-AND-DEMO-WORKPLAN.md (Narrative, Morpheus).
 *
 * Exit code is 1 when a link is broken (or the data cannot be parsed). Stale cards are warnings,
 * unless --strict is passed: then they exit 2 so a scheduled run goes red and its tracking issue
 * is opened (see .github/workflows/portfolio-health.yml). Template lag (the approved Narrative and
 * Morpheus exceptions) and cards with no `lastVerified` stay warnings in both modes. A markdown summary is written to $GITHUB_STEP_SUMMARY (or --summary=<file>).
 *
 * `repoUrl` is never fetched as a web page (it is not rendered on the site). Repos are looked up
 * through the GitHub API; a 404 means private or missing, which is reported as "not checkable",
 * never as a broken link. Set GITHUB_TOKEN to lift the unauthenticated rate limit (60/hour).
 */

import fs from 'node:fs';
import { readData } from './generate-portfolio-project-docs.mjs';

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const THRESHOLD_DAYS = Number(option('threshold-days', 30));
const SUMMARY_PATH = option('summary', process.env.GITHUB_STEP_SUMMARY || '');
const LINK_TIMEOUT_MS = 15000;
const API_TIMEOUT_MS = 15000;
const CONCURRENCY = 6;
const DAY_MS = 86400000;
const inActions = process.env.GITHUB_ACTIONS === 'true';

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

// ---------------------------------------------------------------- helpers

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mapLimit = async (items, limit, fn) => {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
};

const parseRepo = (url) => {
  const m = /^https:\/\/github\.com\/([^/]+)\/([^/#?]+?)(?:\.git)?\/?$/.exec(url || '');
  return m ? { owner: m[1], repo: m[2] } : null;
};

/** `https://<owner>.github.io/<repo>/...` -> { owner, repo } of the repo that publishes it. */
const parsePagesRepo = (url) => {
  try {
    const u = new URL(url);
    const m = /^([^.]+)\.github\.io$/i.exec(u.hostname);
    const repo = u.pathname.split('/').filter(Boolean)[0];
    return m && repo ? { owner: m[1], repo } : null;
  } catch {
    return null;
  }
};

const repoKey = ({ owner, repo }) => `${owner}/${repo}`.toLowerCase();
const isoDay = (iso) => iso.slice(0, 10);
const daysBetween = (laterIso, earlierIso) =>
  Math.round((Date.parse(laterIso) - Date.parse(earlierIso)) / DAY_MS);

// ---------------------------------------------------------------- 1. links

const fetchStatus = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    signal: AbortSignal.timeout(LINK_TIMEOUT_MS),
    headers: { 'user-agent': 'portfolio-health-check (+https://github.com/BenWassa/Portfolio)' },
  });
  // Drain nothing: we only need the status, so cancel the body.
  await res.body?.cancel().catch(() => {});
  return res.status;
};

/** One retry after a short pause; a link passes if either attempt returns 200. */
const checkLink = async (url) => {
  let last = '';
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await sleep(1500);
    try {
      const status = await fetchStatus(url);
      if (status === 200) return { url, ok: true, detail: '200' };
      last = `HTTP ${status}`;
    } catch (err) {
      last =
        err?.name === 'TimeoutError' ? 'timeout' : `${err?.cause?.code || err?.message || err}`;
    }
  }
  return { url, ok: false, detail: last };
};

const collectLinks = (projects) => {
  const byUrl = new Map();
  for (const p of projects) {
    for (const field of ['href', 'demoUrl']) {
      const url = p[field];
      if (!url) continue;
      if (!byUrl.has(url)) byUrl.set(url, []);
      byUrl.get(url).push(`${p.title} (${field})`);
    }
  }
  return byUrl;
};

// ---------------------------------------------------------------- 2/3. GitHub

const ghHeaders = {
  accept: 'application/vnd.github+json',
  'user-agent': 'portfolio-health-check',
  'x-github-api-version': '2022-11-28',
  ...(token ? { authorization: `Bearer ${token}` } : {}),
};

const ghGet = async (path) => {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: ghHeaders,
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });
  const body = res.ok ? await res.json() : null;
  return { status: res.status, body, remaining: res.headers.get('x-ratelimit-remaining') };
};

const headCache = new Map();

/**
 * Latest commit on the repo's default branch.
 * Returns { state: 'ok', date, sha } | { state: 'private' } | { state: 'unknown', detail }.
 * Commit date is used rather than `pushed_at`, which also moves on gh-pages deploy pushes.
 */
const latestCommit = (ref) => {
  const key = repoKey(ref);
  if (!headCache.has(key)) {
    headCache.set(
      key,
      (async () => {
        try {
          const { status, body } = await ghGet(
            `/repos/${ref.owner}/${ref.repo}/commits?per_page=1`
          );
          if (status === 200 && body?.[0]) {
            return {
              state: 'ok',
              date: body[0].commit.committer?.date || body[0].commit.author?.date,
              sha: body[0].sha.slice(0, 7),
            };
          }
          if (status === 404) return { state: 'private' };
          if (status === 409) return { state: 'unknown', detail: 'empty repository' };
          if (status === 403 || status === 429)
            return { state: 'unknown', detail: 'API rate limit' };
          return { state: 'unknown', detail: `API HTTP ${status}` };
        } catch (err) {
          return {
            state: 'unknown',
            detail: err?.name === 'TimeoutError' ? 'API timeout' : String(err?.message || err),
          };
        }
      })()
    );
  }
  return headCache.get(key);
};

const commitsSince = async (ref, sinceIso) => {
  try {
    const { status, body } = await ghGet(
      `/repos/${ref.owner}/${ref.repo}/commits?per_page=100&since=${encodeURIComponent(sinceIso)}`
    );
    if (status !== 200) return null;
    return body.length;
  } catch {
    return null;
  }
};

const checkStaleness = async (projects) => {
  const stale = [];
  const unverified = [];
  const uncheckable = [];
  const fresh = [];

  await mapLimit(projects, 4, async (p) => {
    const ref = parseRepo(p.repoUrl);
    if (!ref) return;
    const templateCard = p.demoMode === 'template';

    if (!p.lastVerified) {
      unverified.push({
        title: p.title,
        repoUrl: p.repoUrl,
        note: templateCard ? 'template-backed (expected: content lags repo by design)' : '',
      });
      return;
    }

    const head = await latestCommit(ref);
    if (head.state !== 'ok') {
      uncheckable.push({
        title: p.title,
        repoUrl: p.repoUrl,
        reason: head.state === 'private' ? 'private or missing repo (API 404)' : head.detail,
      });
      return;
    }

    const moved = isoDay(head.date) > p.lastVerified;
    if (!moved) {
      fresh.push(p.title);
      return;
    }
    const since = await commitsSince(ref, `${p.lastVerified}T23:59:59Z`);
    stale.push({
      title: p.title,
      repoUrl: p.repoUrl,
      lastVerified: p.lastVerified,
      headDate: isoDay(head.date),
      sha: head.sha,
      days: daysBetween(head.date, `${p.lastVerified}T00:00:00Z`),
      commits: since === null ? null : since >= 100 ? '100+' : since,
    });
  });

  const order = (a, b) => a.title.localeCompare(b.title);
  return {
    stale: stale.sort(order),
    unverified: unverified.sort(order),
    uncheckable: uncheckable.sort(order),
    fresh: fresh.sort(),
  };
};

const checkTemplateLag = async (projects) => {
  const rows = [];
  for (const p of projects) {
    if (p.demoMode !== 'template') continue;
    const real = parseRepo(p.repoUrl);
    const tpl = parsePagesRepo(p.demoUrl || p.href);
    if (!real || !tpl || repoKey(real) === repoKey(tpl)) continue;

    const [realHead, tplHead] = await Promise.all([latestCommit(real), latestCommit(tpl)]);
    if (realHead.state !== 'ok' || tplHead.state !== 'ok') {
      const why = (h, r) =>
        h.state === 'private' ? `${r.repo}: private or missing` : `${r.repo}: ${h.detail}`;
      rows.push({
        title: p.title,
        template: tpl.repo,
        real: real.repo,
        lagging: false,
        unknown: [
          realHead.state !== 'ok' && why(realHead, real),
          tplHead.state !== 'ok' && why(tplHead, tpl),
        ]
          .filter(Boolean)
          .join('; '),
      });
      continue;
    }
    const lagDays = daysBetween(realHead.date, tplHead.date);
    rows.push({
      title: p.title,
      template: tpl.repo,
      real: real.repo,
      templateDate: isoDay(tplHead.date),
      realDate: isoDay(realHead.date),
      lagDays,
      lagging: lagDays > THRESHOLD_DAYS,
    });
  }
  return rows;
};

// ---------------------------------------------------------------- reporting

const renderText = ({ linkResults, linksByUrl, stale, templates, skipped }) => {
  const out = [];
  const broken = linkResults.filter((r) => !r.ok);
  if (!skipped.links) {
    out.push(
      `LINKS: ${linkResults.length - broken.length}/${linkResults.length} ok, ${broken.length} broken`
    );
    for (const r of broken)
      out.push(`  FAIL ${r.url} -> ${r.detail}  [${linksByUrl.get(r.url).join(', ')}]`);
  }
  if (!skipped.stale) {
    out.push(
      `STALENESS: ${stale.stale.length} stale, ${stale.unverified.length} unverified, ` +
        `${stale.uncheckable.length} not checkable, ${stale.fresh.length} fresh`
    );
    for (const s of stale.stale)
      out.push(
        `  WARN stale: ${s.title} verified ${s.lastVerified}, repo head ${s.headDate} (${s.sha}), ` +
          `${s.days}d later, ${s.commits ?? '?'} commits since`
      );
    for (const s of stale.unverified)
      out.push(`  WARN no lastVerified: ${s.title}${s.note ? ` - ${s.note}` : ''}`);
    for (const s of stale.uncheckable) out.push(`  INFO not checkable: ${s.title} - ${s.reason}`);
    out.push(
      `TEMPLATE LAG (threshold ${THRESHOLD_DAYS}d): ${templates.filter((t) => t.lagging).length} lagging`
    );
    for (const t of templates) {
      if (t.unknown) out.push(`  INFO ${t.title}: cannot compare (${t.unknown})`);
      else
        out.push(
          `  ${t.lagging ? 'WARN' : 'ok  '} ${t.title}: ${t.template} @ ${t.templateDate} vs ${t.real} @ ` +
            `${t.realDate} (${t.lagDays}d)`
        );
    }
  }
  return out.join('\n');
};

const cell = (s) => String(s).replace(/\|/g, '\\|');

const renderMarkdown = ({ linkResults, linksByUrl, stale, templates, skipped, projectCount }) => {
  const broken = linkResults.filter((r) => !r.ok);
  const lines = ['# Portfolio health', ''];
  const laggingCount = templates.filter((t) => t.lagging).length;
  lines.push(
    `${projectCount} entries. **${broken.length} broken link${broken.length === 1 ? '' : 's'}** (fails the run), ` +
      `${stale.stale.length} stale card${stale.stale.length === 1 ? '' : 's'}, ` +
      `${stale.unverified.length} without \`lastVerified\`, ${laggingCount} lagging template${laggingCount === 1 ? '' : 's'} (warnings only).`,
    ''
  );

  if (!skipped.links) {
    lines.push(
      `## Links: ${linkResults.length - broken.length}/${linkResults.length} return 200`,
      ''
    );
    if (broken.length) {
      lines.push('| URL | Result | Used by |', '| --- | --- | --- |');
      for (const r of broken)
        lines.push(
          `| ${cell(r.url)} | ${cell(r.detail)} | ${cell(linksByUrl.get(r.url).join(', '))} |`
        );
    } else lines.push('All `href` and `demoUrl` values returned 200.');
    lines.push('');
  }

  if (!skipped.stale) {
    lines.push('## Stale cards (repo moved after `lastVerified`)', '');
    if (stale.stale.length) {
      lines.push(
        '| Card | Verified | Repo head | Days later | Commits since |',
        '| --- | --- | --- | --- | --- |'
      );
      for (const s of stale.stale)
        lines.push(
          `| [${cell(s.title)}](${s.repoUrl}) | ${s.lastVerified} | ${s.headDate} (\`${s.sha}\`) | ${s.days} | ${s.commits ?? '?'} |`
        );
    } else lines.push('None.');
    lines.push('');

    lines.push(`## Template lag (warn above ${THRESHOLD_DAYS} days)`, '');
    if (templates.length) {
      lines.push(
        '| Card | Template | Real repo | Template head | Real head | Lag (days) | |',
        '| --- | --- | --- | --- | --- | --- | --- |'
      );
      for (const t of templates)
        lines.push(
          t.unknown
            ? `| ${cell(t.title)} | ${t.template} | ${t.real} | | | | cannot compare: ${cell(t.unknown)} |`
            : `| ${cell(t.title)} | ${t.template} | ${t.real} | ${t.templateDate} | ${t.realDate} | ${t.lagDays} | ${t.lagging ? 'WARN' : 'ok'} |`
        );
    } else lines.push('No template-backed cards.');
    lines.push('');

    lines.push('## No `lastVerified`', '');
    if (stale.unverified.length) {
      for (const s of stale.unverified) lines.push(`- ${s.title}${s.note ? `: ${s.note}` : ''}`);
    } else lines.push('None.');
    lines.push('');

    if (stale.uncheckable.length) {
      lines.push('## Not checkable (private or missing repo, or API error)', '');
      for (const s of stale.uncheckable) lines.push(`- ${s.title}: ${s.reason}`);
      lines.push('');
    }
  }
  return lines.join('\n');
};

// ---------------------------------------------------------------- main

const main = async () => {
  const skipped = { links: flag('skip-links'), stale: flag('skip-stale') };
  const { projectsData: projects } = readData();

  const linksByUrl = collectLinks(projects);
  const linkResults = skipped.links
    ? []
    : await mapLimit([...linksByUrl.keys()], CONCURRENCY, (url) => checkLink(url));

  const stale = skipped.stale ? null : await checkStaleness(projects);
  const templates = skipped.stale ? [] : await checkTemplateLag(projects);

  const report = {
    linkResults,
    linksByUrl,
    stale: stale || { stale: [], unverified: [], uncheckable: [], fresh: [] },
    templates,
    skipped,
    projectCount: projects.length,
  };

  console.log(renderText(report));

  if (SUMMARY_PATH) {
    fs.appendFileSync(SUMMARY_PATH, `${renderMarkdown(report)}\n`);
    console.log(`\nMarkdown summary written to ${SUMMARY_PATH}`);
  }

  if (inActions) {
    for (const r of linkResults.filter((x) => !x.ok))
      console.log(
        `::error title=Broken link::${r.url} -> ${r.detail} (${linksByUrl.get(r.url).join(', ')})`
      );
    for (const s of report.stale.stale)
      console.log(
        `::warning title=Stale card::${s.title}: repo moved ${s.days}d after lastVerified ${s.lastVerified}`
      );
    for (const t of templates.filter((x) => x.lagging))
      console.log(
        `::warning title=Template lag::${t.title}: ${t.template} trails ${t.real} by ${t.lagDays}d`
      );
  }

  if (linkResults.some((r) => !r.ok)) process.exit(1);
  process.exit(flag('strict') && report.stale.stale.length > 0 ? 2 : 0);
};

main().catch((err) => {
  console.error(`Health check could not run: ${err?.stack || err}`);
  process.exit(1);
});
