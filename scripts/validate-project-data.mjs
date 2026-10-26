#!/usr/bin/env node
/**
 * Validate the portfolio project data in src/js/project-descriptions.ts.
 *
 * Offline and deterministic: the TypeScript source is sliced at its
 * `export const` markers and the literal data is evaluated in an empty `vm`
 * context (no globals, so no network or filesystem access is possible from the
 * data). Nothing here performs network I/O, so a demo site being offline can
 * never fail this check.
 *
 * Usage:
 *   node scripts/validate-project-data.mjs [path/to/project-descriptions.ts] [--public-dir <dir>]
 *
 * Errors  -> exit code 1 (duplicate ids/titles, missing required fields,
 *            missing local image, non-https URL, credentials embedded in a URL).
 * Warnings -> printed, never fail (demoUrl on an unlisted host, missing long
 *            description, unexpected repoUrl host, demoUrl/demoMode mismatch).
 *
 * Schema (src/types.ts): `projectsData` holds two tiers, discriminated on `tier`.
 *   - 'featured' (default when `tier` is absent): a card with image, theme, etc.
 *   - 'index': a text-only line (title, desc, href|null, type, year required).
 * Any other exported array of objects with a `title` is validated as an extra
 * entry list too, so a future split into a separate exported index array is
 * tolerated.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const rootDir = process.cwd();

// ---------------------------------------------------------------- arguments
const argv = process.argv.slice(2);
let sourceArg = null;
let publicDirArg = null;
for (let i = 0; i < argv.length; i += 1) {
  if (argv[i] === '--public-dir') {
    publicDirArg = argv[(i += 1)];
  } else if (!argv[i].startsWith('--') && !sourceArg) {
    sourceArg = argv[i];
  } else {
    console.error(`Unknown argument: ${argv[i]}`);
    process.exit(2);
  }
}
const sourcePath = path.resolve(rootDir, sourceArg ?? 'src/js/project-descriptions.ts');
const publicDir = path.resolve(rootDir, publicDirArg ?? 'src/public');

// ---------------------------------------------------------------- constants
const TYPES = ['narrative', 'app', 'psychology'];
const STATUSES = ['active', 'draft', 'prototype'];
const ORIENTATIONS = ['landscape', 'square'];
const TIERS = ['featured', 'index'];
const DEMO_MODES = ['playbook', 'live', 'template', 'none'];
const THEME_KEYS = ['primary', 'secondary', 'tertiary', 'bg'];

// demoUrl hosts/paths the owner has explicitly accepted for iframe embeds.
// Anything else is reported as a warning for human review (never an error).
const DEMO_ALLOW_PATTERNS = [
  /^https:\/\/benwassa\.github\.io\//,
  /^https:\/\/hearthv2--hearthv2\.us-east4\.hosted\.app\//,
];
const SECRET_PARAM = /^(token|access_token|key|api[-_]?key|secret|password|auth|sig|signature)$/i;

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const normalizeKey = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;

// ------------------------------------------------------------------ parsing
const readSections = (source) => {
  // Top-level `export const NAME ... = <literal>` sections, split at the next
  // `export const` (or EOF). Mirrors scripts/generate-portfolio-project-docs.mjs,
  // which relies on the same `export const projectsData` / `projectDescriptions` markers.
  const re = /^export const (\w+)\s*(?::[^=\n]+)?=\s*/gm;
  const starts = [];
  let m;
  while ((m = re.exec(source)) !== null) {
    starts.push({ name: m[1], bodyStart: re.lastIndex, declStart: m.index });
  }
  const sections = {};
  starts.forEach((s, i) => {
    const end = i + 1 < starts.length ? starts[i + 1].declStart : source.length;
    const text = source.slice(s.bodyStart, end).trim().replace(/;\s*$/, '');
    try {
      sections[s.name] = vm.runInNewContext(`(${text})`, Object.create(null), { timeout: 2000 });
    } catch (e) {
      sections[s.name] = { __parseError: e.message };
    }
  });
  return sections;
};

// ------------------------------------------------------------ path / url utils
const dirListingCache = new Map();
const existsExactCase = (rel) => {
  // Case-sensitive existence check, so a macOS-only match (Foo.png vs foo.png)
  // is caught here rather than on the Linux CI/Pages host.
  const parts = rel.split('/').filter(Boolean);
  let cur = publicDir;
  for (const part of parts) {
    if (!dirListingCache.has(cur)) {
      try {
        dirListingCache.set(cur, fs.readdirSync(cur));
      } catch {
        return false;
      }
    }
    if (!dirListingCache.get(cur).includes(part)) return false;
    cur = path.join(cur, part);
  }
  return fs.statSync(cur).isFile();
};

const parseUrl = (where, field, value) => {
  if (!isNonEmptyString(value)) {
    err(where, `${field} must be a non-empty string`);
    return null;
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    err(where, `${field} is not an absolute URL: ${value}`);
    return null;
  }
  if (url.protocol !== 'https:') {
    err(where, `${field} must be https (got ${url.protocol}//): ${value}`);
    return null;
  }
  if (url.username || url.password) {
    err(where, `${field} embeds credentials: ${url.origin}/...`);
    return null;
  }
  for (const key of url.searchParams.keys()) {
    if (SECRET_PARAM.test(key))
      err(where, `${field} carries a secret-looking query parameter "${key}"`);
  }
  return url;
};

// -------------------------------------------------------------- entry checks
const validateEntry = (entry, label, seen) => {
  const where = label;
  if (!entry || typeof entry !== 'object') {
    err(where, 'entry is not an object');
    return;
  }
  if (!isNonEmptyString(entry.title)) {
    err(where, 'missing title');
    return;
  }
  const id = normalizeKey(entry.title);
  if (!id) err(where, `title "${entry.title}" has no alphanumeric characters to derive an id from`);
  const lowerTitle = entry.title.trim().toLowerCase();
  if (seen.titles.has(lowerTitle))
    err(where, `duplicate title (case-insensitive): "${entry.title}"`);
  else if (seen.ids.has(id))
    err(where, `duplicate id "${id}" (title "${entry.title}" collides with "${seen.ids.get(id)}")`);
  seen.titles.set(lowerTitle, entry.title);
  if (!seen.ids.has(id)) seen.ids.set(id, entry.title);

  const tier = entry.tier ?? 'featured';
  if (!TIERS.includes(tier))
    err(where, `tier must be one of ${TIERS.join('|')} (got ${JSON.stringify(entry.tier)})`);

  // Base fields (every tier).
  if (!isNonEmptyString(entry.desc)) err(where, 'missing desc');
  if (!TYPES.includes(entry.type))
    err(where, `type must be one of ${TYPES.join('|')} (got ${JSON.stringify(entry.type)})`);
  if (!('href' in entry)) err(where, 'href is required (use null for no link)');
  else if (entry.href !== null) parseUrl(where, 'href', entry.href);

  // Optional freshness metadata, validated when present.
  if (entry.repoUrl !== undefined) {
    const u = parseUrl(where, 'repoUrl', entry.repoUrl);
    if (u && u.hostname !== 'github.com')
      warn(where, `repoUrl host is not github.com: ${entry.repoUrl}`);
  }
  if (entry.lastVerified !== undefined) {
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(entry.lastVerified) ||
      Number.isNaN(Date.parse(entry.lastVerified))
    ) {
      err(
        where,
        `lastVerified must be a real ISO date YYYY-MM-DD (got ${JSON.stringify(entry.lastVerified)})`
      );
    }
  }
  if (entry.demoMode !== undefined && !DEMO_MODES.includes(entry.demoMode)) {
    err(
      where,
      `demoMode must be one of ${DEMO_MODES.join('|')} (got ${JSON.stringify(entry.demoMode)})`
    );
  }
  if (
    entry.year !== undefined &&
    !(Number.isInteger(entry.year) && entry.year >= 2000 && entry.year <= 2100)
  ) {
    err(where, `year must be an integer between 2000 and 2100 (got ${JSON.stringify(entry.year)})`);
  }

  if (tier === 'index') {
    if (entry.year === undefined) err(where, 'index entries require a year');
    if (entry.demoUrl !== undefined)
      err(where, 'index entries must not carry a demoUrl (text-only tier)');
    for (const f of ['img', 'theme', 'techSpecs']) {
      if (entry[f] !== undefined)
        warn(where, `index entry carries card field "${f}", which is not rendered`);
    }
    return;
  }

  // Featured card fields.
  if (!isNonEmptyString(entry.tag)) err(where, 'missing tag');
  if (!STATUSES.includes(entry.status))
    err(where, `status must be one of ${STATUSES.join('|')} (got ${JSON.stringify(entry.status)})`);
  if (!ORIENTATIONS.includes(entry.orientation)) {
    err(
      where,
      `orientation must be one of ${ORIENTATIONS.join('|')} (got ${JSON.stringify(entry.orientation)})`
    );
  }
  if (entry.landscapeImageFit !== undefined) {
    if (!['cover', 'contain'].includes(entry.landscapeImageFit)) {
      err(where, 'landscapeImageFit must be cover or contain');
    }
    if (entry.orientation !== 'landscape') {
      err(where, 'landscapeImageFit requires landscape orientation');
    }
  }

  if (!isNonEmptyString(entry.alt)) err(where, 'missing alt text');

  if (!entry.theme || typeof entry.theme !== 'object') err(where, 'missing theme');
  else {
    for (const k of THEME_KEYS) {
      if (!/^#[0-9a-fA-F]{3,8}$/.test(entry.theme[k] ?? ''))
        err(where, `theme.${k} must be a hex colour (got ${JSON.stringify(entry.theme[k])})`);
    }
  }

  const ts = entry.techSpecs;
  if (!ts || typeof ts !== 'object') err(where, 'missing techSpecs');
  else {
    if (!isNonEmptyString(ts.model)) err(where, 'techSpecs.model missing');
    for (const k of ['stack', 'features']) {
      if (!Array.isArray(ts[k]) || ts[k].length === 0 || !ts[k].every(isNonEmptyString)) {
        err(where, `techSpecs.${k} must be a non-empty array of strings`);
      }
    }
  }

  // Image asset: local path under publicDir, exact case.
  if (!isNonEmptyString(entry.img)) err(where, 'missing img');
  else if (/^[a-z]+:\/\//i.test(entry.img) || entry.img.startsWith('//')) {
    err(where, `img must be a local asset path, not a URL: ${entry.img}`);
  } else {
    const rel = entry.img.replace(/^\.?\//, '');
    if (rel.split('/').includes('..')) err(where, `img escapes the public directory: ${entry.img}`);
    else if (!existsExactCase(rel)) {
      const looseHit = fs.existsSync(path.join(publicDir, rel));
      err(
        where,
        `img asset not found${looseHit ? ' (exists only with different letter case)' : ''}: ${path.relative(rootDir, path.join(publicDir, rel))}`
      );
    }
  }

  // demoUrl classification.
  if (entry.demoUrl !== undefined) {
    const u = parseUrl(where, 'demoUrl', entry.demoUrl);
    if (u && !DEMO_ALLOW_PATTERNS.some((re) => re.test(entry.demoUrl))) {
      warn(where, `demoUrl is not on the allow-list (review before publishing): ${entry.demoUrl}`);
    }
    if (entry.demoMode === 'none') warn(where, 'demoUrl is set but demoMode is "none"');
  } else if (entry.demoMode === 'playbook' || entry.demoMode === 'live') {
    warn(where, `demoMode "${entry.demoMode}" but no demoUrl`);
  }
};

// --------------------------------------------------------------------- main
const main = () => {
  if (!fs.existsSync(sourcePath)) {
    console.error(`Missing source file: ${sourcePath}`);
    process.exit(2);
  }
  if (!fs.existsSync(publicDir)) {
    console.error(`Missing public directory: ${publicDir}`);
    process.exit(2);
  }
  const sections = readSections(fs.readFileSync(sourcePath, 'utf8'));

  for (const [name, value] of Object.entries(sections)) {
    if (value && value.__parseError) err(name, `could not evaluate literal: ${value.__parseError}`);
  }
  const { projectsData, projectDescriptions } = sections;
  if (!Array.isArray(projectsData)) {
    err('projectsData', 'missing or not an array (keep `export const projectsData` marker intact)');
  }
  if (
    !projectDescriptions ||
    typeof projectDescriptions !== 'object' ||
    Array.isArray(projectDescriptions)
  ) {
    err(
      'projectDescriptions',
      'missing or not an object (keep `export const projectDescriptions` marker intact)'
    );
  }

  // Entry lists: projectsData plus any other exported array of titled objects.
  const lists = [];
  if (Array.isArray(projectsData)) lists.push(['projectsData', projectsData]);
  for (const [name, value] of Object.entries(sections)) {
    if (name === 'projectsData' || !Array.isArray(value)) continue;
    if (value.length && value.every((v) => v && typeof v === 'object' && 'title' in v))
      lists.push([name, value]);
  }

  const seen = { ids: new Map(), titles: new Map() };
  const counts = {};
  const all = [];
  for (const [name, list] of lists) {
    list.forEach((entry, i) => {
      validateEntry(entry, `${name}[${i}]${entry?.title ? ` "${entry.title}"` : ''}`, seen);
      all.push(entry);
      const tier = entry?.tier ?? 'featured';
      counts[tier] = (counts[tier] ?? 0) + 1;
    });
  }

  // Descriptions: keyed by normalised title.
  if (projectDescriptions && typeof projectDescriptions === 'object') {
    for (const [key, d] of Object.entries(projectDescriptions)) {
      if (!d || !isNonEmptyString(d.portfolio) || !isNonEmptyString(d.full)) {
        err(`projectDescriptions.${key}`, 'needs non-empty `portfolio` and `full` strings');
      }
      if (!seen.ids.has(key))
        warn(
          `projectDescriptions.${key}`,
          'no project with a matching title (orphaned description)'
        );
    }
    for (const entry of all) {
      if (
        (entry?.tier ?? 'featured') === 'featured' &&
        isNonEmptyString(entry?.title) &&
        !projectDescriptions[normalizeKey(entry.title)]
      ) {
        warn(
          `"${entry.title}"`,
          'no projectDescriptions entry (modal falls back to the card desc)'
        );
      }
    }
  }

  // Cross-entry hint: identical hrefs across entries.
  const hrefs = new Map();
  for (const entry of all) {
    if (typeof entry?.href !== 'string') continue;
    const k = entry.href.replace(/\/+$/, '');
    if (hrefs.has(k)) warn(`"${entry.title}"`, `shares href with "${hrefs.get(k)}"`);
    else hrefs.set(k, entry.title);
  }

  const tierSummary = Object.entries(counts)
    .map(([t, n]) => `${n} ${t}`)
    .join(', ');
  console.log(
    `Project data: ${path.relative(rootDir, sourcePath)} (${all.length} entries: ${tierSummary || 'none'})`
  );
  console.log(`Public dir:   ${path.relative(rootDir, publicDir) || '.'}`);

  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s) (do not fail the check):`);
    for (const w of warnings) console.log(`  warn  ${w}`);
  }
  if (errors.length) {
    console.error(`\n${errors.length} error(s):`);
    for (const e of errors) console.error(`  ERROR ${e}`);
    process.exit(1);
  }
  console.log('\nProject data OK.');
};

main();
