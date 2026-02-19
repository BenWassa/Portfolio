#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const docsDir = path.join(rootDir, 'llm-project-contexts/portfolio-project-docs');
const outMd = path.join(docsDir, 'ALL_PROJECTS.md');
const outHtml = path.join(docsDir, 'ALL_PROJECTS.html');

if (!fs.existsSync(docsDir)) {
  console.error(`Missing docs directory: ${docsDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(docsDir)
  .filter((name) => name.endsWith('.md'))
  .filter((name) => name !== 'INDEX.md' && name !== 'ALL_PROJECTS.md')
  .sort((a, b) => a.localeCompare(b));

if (files.length === 0) {
  console.error('No project markdown files found to compile.');
  process.exit(1);
}

const generatedAt = new Date().toISOString();

const read = (file) => fs.readFileSync(path.join(docsDir, file), 'utf8');
const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getMatch = (body, regex, fallback = '') => {
  const match = body.match(regex);
  return match ? match[1].trim() : fallback;
};

const getSection = (body, startHeader, nextHeader) => {
  const start = body.indexOf(startHeader);
  if (start < 0) return '';
  const tail = body.slice(start + startHeader.length);
  const end = nextHeader ? tail.indexOf(nextHeader) : -1;
  return (end >= 0 ? tail.slice(0, end) : tail).trim();
};

const docs = files.map((file) => {
  const body = read(file);
  const title = getMatch(body, /^#\s+(.+)$/m, file.replace(/\.md$/, ''));
  const projectName = getMatch(body, /^- Project slug:\s+`([^`]+)`$/m, file.replace(/\.md$/, ''));
  const status = getMatch(body, /^- Status:\s+`([^`]+)`$/m, 'unknown');
  const type = getMatch(body, /^- Type:\s+`([^`]+)`$/m, 'unknown');
  const liveUrl = getMatch(body, /^- Live URL:\s+(.+)$/m, '(not set)');
  const cardDesc = getMatch(body, /^- Card description:\s+(.+)$/m, '');
  const model = getMatch(body, /^- Model:\s+(.+)$/m, '');
  const stack = getMatch(body, /^- Stack:\s+(.+)$/m, '');
  const features = getSection(body, '- Key features:', '## Theme')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  return { file, body, title, projectName, status, type, liveUrl, cardDesc, model, stack, features };
});

const combinedMd = `# Portfolio Project Records (Compiled)

Generated: ${generatedAt}
Source folder: \`llm-project-contexts/portfolio-project-docs/\`
Total project docs: ${docs.length}

## Included Files
${docs.map((doc) => `- [${doc.file}](./${doc.file})`).join('\n')}

---

${docs
  .map(
    (doc) => `## ${doc.title}
Source file: \`${doc.file}\`

${doc.body}
`
  )
  .join('\n\n---\n\n')}
`;

fs.writeFileSync(outMd, combinedMd);

const docsWithAnchors = docs.map((doc) => ({
  ...doc,
  anchor: doc.file.replace(/\.md$/, ''),
  portfolioSummary: getMatch(doc.body, /^- Portfolio summary:\s+(.+)$/m, ''),
  fullDescription: getMatch(doc.body, /^- Full description:\s+(.+)$/m, ''),
  orientation: getMatch(doc.body, /^- Orientation:\s+`([^`]+)`$/m, 'unknown'),
}));

const statusCounts = docsWithAnchors.reduce((acc, doc) => {
  acc[doc.status] = (acc[doc.status] || 0) + 1;
  return acc;
}, {});
const typeCounts = docsWithAnchors.reduce((acc, doc) => {
  acc[doc.type] = (acc[doc.type] || 0) + 1;
  return acc;
}, {});

const tocLinks = docsWithAnchors
  .map((doc) => `<li><a href="#${escapeHtml(doc.anchor)}">${escapeHtml(doc.title)}</a></li>`)
  .join('');

const summaryRows = docsWithAnchors
  .map((doc) => {
    const live = doc.liveUrl && doc.liveUrl !== '(not set)';
    return `<tr>
  <td><a href="#${escapeHtml(doc.anchor)}">${escapeHtml(doc.title)}</a></td>
  <td><span class="badge status">${escapeHtml(doc.status)}</span></td>
  <td><span class="badge type">${escapeHtml(doc.type)}</span></td>
  <td>${live ? `<a href="${escapeHtml(doc.liveUrl)}" target="_blank" rel="noreferrer">Open</a>` : '<span class="muted">Not set</span>'}</td>
  <td><a href="${escapeHtml(doc.file)}">MD</a></td>
</tr>`;
  })
  .join('\n');

const projectSections = docsWithAnchors
  .map((doc) => {
    const live = doc.liveUrl && doc.liveUrl !== '(not set)' ? doc.liveUrl : '';
    const features = doc.features.length
      ? `<ul>${doc.features.map((f) => `<li>${escapeHtml(f.replace(/^-+\s*/, ''))}</li>`).join('')}</ul>`
      : '<p class="muted">No features listed.</p>';
    return `<section id="${escapeHtml(doc.anchor)}" class="project-section">
  <header class="project-head">
    <h2>${escapeHtml(doc.title)}</h2>
    <div class="badges">
      <span class="badge status">${escapeHtml(doc.status)}</span>
      <span class="badge type">${escapeHtml(doc.type)}</span>
      <span class="badge mono">${escapeHtml(doc.projectName)}</span>
    </div>
  </header>
  <div class="project-layout">
    <div class="project-main">
      <h3>Description</h3>
      <p>${escapeHtml(doc.cardDesc || 'No card description set.')}</p>
      <p>${escapeHtml(doc.portfolioSummary || 'No portfolio summary set.')}</p>
      <p>${escapeHtml(doc.fullDescription || 'No full description set.')}</p>
      <h3>Technical Profile</h3>
      <dl class="meta-list">
        <div><dt>Model</dt><dd>${escapeHtml(doc.model || 'N/A')}</dd></div>
        <div><dt>Stack</dt><dd>${escapeHtml(doc.stack || 'N/A')}</dd></div>
        <div><dt>Orientation</dt><dd>${escapeHtml(doc.orientation)}</dd></div>
      </dl>
      <h3>Key Features</h3>
      ${features}
    </div>
    <aside class="project-side">
      <h3>Links</h3>
      <ul class="link-list">
        ${live ? `<li><a href="${escapeHtml(live)}" target="_blank" rel="noreferrer">Live URL</a></li>` : '<li><span class="muted">Live URL not set</span></li>'}
        <li><a href="${escapeHtml(doc.file)}">Source MD</a></li>
      </ul>
      <h3>Quick Notes</h3>
      <p class="muted">Generated from portfolio source; update project data in <code>src/js/project-descriptions.ts</code>.</p>
    </aside>
  </div>
</section>`;
  })
  .join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Portfolio Documentation Report</title>
  <style>
    :root {
      --bg: #f4f7fb;
      --panel: #ffffff;
      --panel-soft: #f8fbff;
      --text: #0f1d2e;
      --muted: #51647d;
      --accent: #0f4c81;
      --accent-2: #0d9488;
      --border: #d7e1ec;
      --line: #e7eef7;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Source Sans 3", "Avenir Next", "Segoe UI", sans-serif;
      color: var(--text);
      background: linear-gradient(180deg, #f8fbff 0%, var(--bg) 42%);
      line-height: 1.5;
    }
    h1, h2, h3 { font-family: "Fraunces", "Georgia", serif; }
    .wrap {
      max-width: 1320px;
      margin: 0 auto;
      padding: 24px 20px 64px;
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 20px;
    }
    .sidebar {
      position: sticky;
      top: 14px;
      align-self: start;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px;
      max-height: calc(100vh - 28px);
      overflow: auto;
    }
    .sidebar h2 {
      margin: 0 0 10px;
      font-size: 1.05rem;
    }
    .sidebar ul {
      margin: 0;
      padding: 0 0 0 16px;
      display: grid;
      gap: 4px;
    }
    .content { min-width: 0; }
    .hero {
      background: linear-gradient(135deg, rgba(15,76,129,0.12), rgba(13,148,136,0.12));
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px 24px;
      margin-bottom: 20px;
    }
    .hero h1 { margin: 0 0 8px; font-size: clamp(1.45rem, 3vw, 2.25rem); }
    .hero p { margin: 2px 0; color: var(--muted); }
    .stats {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .summary {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 14px 16px;
      margin-bottom: 18px;
    }
    .summary h2 {
      margin: 0 0 10px;
      font-size: 1.15rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }
    th, td {
      border-bottom: 1px solid var(--line);
      padding: 8px 6px;
      vertical-align: top;
      text-align: left;
    }
    th { font-size: 0.82rem; letter-spacing: 0.03em; text-transform: uppercase; color: var(--muted); }
    .project-section {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .project-head {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
      border-bottom: 1px solid var(--line);
      padding-bottom: 10px;
      margin-bottom: 12px;
    }
    .project-head h2 { margin: 0; font-size: 1.2rem; }
    .badges, .stats { display: flex; gap: 8px; flex-wrap: wrap; }
    .badge {
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 2px 10px;
      font-size: 0.76rem;
      color: var(--muted);
      text-transform: lowercase;
      letter-spacing: 0.03em;
      background: var(--panel-soft);
    }
    .status { color: #0b4f44; border-color: #bde9df; background: #e9faf5; }
    .type { color: #203a7b; border-color: #d4dfff; background: #edf2ff; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; text-transform: none; }
    .project-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
    }
    .project-main h3, .project-side h3 {
      margin: 10px 0 5px;
      font-size: 0.86rem;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .project-main p { margin: 6px 0; }
    .meta-list { margin: 0; display: grid; gap: 6px; }
    .meta-list div {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 8px;
      padding: 5px 0;
      border-bottom: 1px dashed var(--line);
    }
    .meta-list dt { font-weight: 700; color: var(--muted); }
    .meta-list dd { margin: 0; }
    ul { margin: 8px 0 0 18px; padding: 0; }
    .link-list { margin-left: 14px; }
    code {
      background: #eef4ff;
      border: 1px solid #d9e5f8;
      border-radius: 4px;
      padding: 1px 5px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.84em;
    }
    a {
      color: var(--accent);
      text-decoration: none;
      border-bottom: 1px dotted rgba(15,76,129,0.45);
      padding-bottom: 1px;
    }
    a:hover { color: var(--accent-2); border-bottom-color: rgba(13,148,136,0.5); }
    .muted { color: var(--muted); }
    @media (max-width: 1000px) {
      .wrap { grid-template-columns: 1fr; }
      .sidebar { position: static; max-height: none; }
      .project-layout { grid-template-columns: 1fr; }
    }
    @media print {
      body { background: #fff; color: #111; }
      .wrap { display: block; max-width: none; padding: 0; }
      .sidebar { display: none; }
      .project-section {
        break-inside: avoid;
        page-break-inside: avoid;
        border: 1px solid #bbb;
        box-shadow: none;
      }
      a { color: #111; border-bottom: none; }
    }
  </style>
</head>
<body>
  <main class="wrap">
    <aside class="sidebar">
      <h2>Table Of Contents</h2>
      <ul>${tocLinks}</ul>
    </aside>
    <section class="content">
      <section class="hero">
      <h1>Portfolio Project Records</h1>
      <p>Generated: ${escapeHtml(generatedAt)}</p>
      <p>Total projects: ${docs.length}</p>
      <p>Source folder: <code>llm-project-contexts/portfolio-project-docs/</code></p>
      <p>Compiled markdown: <a href="./ALL_PROJECTS.md">ALL_PROJECTS.md</a></p>
      <div class="stats">
        ${Object.entries(statusCounts)
          .map(([k, v]) => `<span class="badge status">${escapeHtml(k)}: ${v}</span>`)
          .join('')}
        ${Object.entries(typeCounts)
          .map(([k, v]) => `<span class="badge type">${escapeHtml(k)}: ${v}</span>`)
          .join('')}
      </div>
      </section>
      <section class="summary">
        <h2>Executive Summary</h2>
        <table>
          <thead>
            <tr><th>Project</th><th>Status</th><th>Type</th><th>Live</th><th>Source</th></tr>
          </thead>
          <tbody>
            ${summaryRows}
          </tbody>
        </table>
      </section>
      ${projectSections}
    </section>
  </main>
</body>
</html>`;

fs.writeFileSync(outHtml, html);
console.log(`Compiled ${docs.length} project docs to:`);
console.log(`- ${path.relative(rootDir, outMd)}`);
console.log(`- ${path.relative(rootDir, outHtml)}`);
