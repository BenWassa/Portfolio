#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const getArg = (flag, fallback = null) => {
  const idx = args.indexOf(flag);
  return idx >= 0 ? args[idx + 1] : fallback;
};
const hasFlag = (flag) => args.includes(flag);

const pass = getArg('--pass', 'first_pass');
const cloneMissing = hasFlag('--clone-missing');
const commit = hasFlag('--commit');
const dryRun = hasFlag('--dry-run');
const forceOverwrite = hasFlag('--force-overwrite');

const rootDir = process.cwd();
const inventoryPath = path.join(rootDir, 'llm-project-contexts/repo-rollout.csv');
const templatePath = path.join(rootDir, 'llm-project-contexts/LLM_PROJECT_CONTEXT_TEMPLATE.md');
const statusPath = path.join(rootDir, 'llm-project-contexts/repo-rollout-status.csv');
const githubRepoDataPath = path.join(rootDir, 'Notion/2026_02_21/all_repos.json');

const requiredPasses = new Set(['first_pass', 'edge_case', 'all']);
if (!requiredPasses.has(pass)) {
  console.error(`Invalid --pass value: ${pass}. Use first_pass, edge_case, or all.`);
  process.exit(1);
}

if (!fs.existsSync(inventoryPath)) {
  console.error(`Missing inventory file: ${inventoryPath}`);
  process.exit(1);
}

if (!fs.existsSync(templatePath)) {
  console.error(`Missing template file: ${templatePath}`);
  process.exit(1);
}

const parseCsvLine = (line) => {
  const cols = [];
  let cur = '';
  let quote = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    const next = line[i + 1];
    if (ch === '"' && quote && next === '"') {
      cur += '"';
      i += 1;
      continue;
    }
    if (ch === '"') {
      quote = !quote;
      continue;
    }
    if (ch === ',' && !quote) {
      cols.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  cols.push(cur);
  return cols.map((c) => c.trim());
};

const csv = fs.readFileSync(inventoryPath, 'utf8').trim();
const lines = csv.split(/\r?\n/);
const header = parseCsvLine(lines[0]);
const rows = lines.slice(1).map((line) => {
  const cols = parseCsvLine(line);
  const rec = {};
  for (let i = 0; i < header.length; i += 1) rec[header[i]] = cols[i] ?? '';
  return rec;
});

const selectedRows = rows.filter((row) => (pass === 'all' ? true : row.pass === pass));
if (selectedRows.length === 0) {
  console.error(`No rows matched --pass=${pass}.`);
  process.exit(1);
}

const ghRepos = fs.existsSync(githubRepoDataPath)
  ? JSON.parse(fs.readFileSync(githubRepoDataPath, 'utf8'))
  : [];
const homepageBySlug = new Map(ghRepos.map((r) => [String(r.name || '').toLowerCase(), r.homepageUrl || '']));

const run = (cmd, cwd = rootDir) =>
  execSync(cmd, { cwd, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' }).trim();

const safeRun = (cmd, cwd = rootDir) => {
  try {
    return run(cmd, cwd);
  } catch {
    return '';
  }
};

const q = (value) => `"${String(value).replace(/(["\\$`])/g, '\\$1')}"`;

const exists = (p) => fs.existsSync(path.resolve(rootDir, p));

const detectPackageManager = (repoPath) => {
  if (fs.existsSync(path.join(repoPath, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(repoPath, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(repoPath, 'package-lock.json'))) return 'npm';
  if (fs.existsSync(path.join(repoPath, 'pyproject.toml'))) return 'pip/poetry';
  if (fs.existsSync(path.join(repoPath, 'Cargo.toml'))) return 'cargo';
  return 'N/A';
};

const detectTech = (repoPath) => {
  const packageJsonPath = path.join(repoPath, 'package.json');
  const deps = new Set();
  const scripts = {};
  if (fs.existsSync(packageJsonPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      Object.keys(parsed.dependencies || {}).forEach((d) => deps.add(d.toLowerCase()));
      Object.keys(parsed.devDependencies || {}).forEach((d) => deps.add(d.toLowerCase()));
      Object.assign(scripts, parsed.scripts || {});
    } catch {
      // ignore parse errors
    }
  }

  let framework = 'N/A';
  if (deps.has('next')) framework = 'Next.js';
  else if (deps.has('react')) framework = 'React';
  else if (deps.has('vue')) framework = 'Vue';
  else if (deps.has('svelte')) framework = 'Svelte';
  else if (deps.has('solid-js')) framework = 'SolidJS';

  let language = 'N/A';
  if (fs.existsSync(path.join(repoPath, 'tsconfig.json'))) language = 'TypeScript';
  else if (fs.existsSync(packageJsonPath)) language = 'JavaScript';
  else if (fs.existsSync(path.join(repoPath, 'pyproject.toml')) || fs.existsSync(path.join(repoPath, 'requirements.txt'))) language = 'Python';

  const styling = deps.has('tailwindcss') ? 'Tailwind CSS' : 'N/A';
  const buildTool = deps.has('vite') ? 'Vite' : deps.has('next') ? 'Next.js build' : fs.existsSync(packageJsonPath) ? 'npm scripts' : 'N/A';
  const testFramework =
    deps.has('vitest') ? 'Vitest' : deps.has('jest') ? 'Jest' : scripts.test ? 'npm test' : 'N/A';
  const lint = deps.has('eslint') ? 'ESLint' : 'N/A';

  const installCmd =
    detectPackageManager(repoPath) === 'pnpm'
      ? 'pnpm install'
      : detectPackageManager(repoPath) === 'yarn'
      ? 'yarn'
      : fs.existsSync(packageJsonPath)
      ? 'npm ci'
      : fs.existsSync(path.join(repoPath, 'requirements.txt'))
      ? 'pip install -r requirements.txt'
      : 'N/A';
  const runCmd = scripts.dev
    ? detectPackageManager(repoPath) === 'pnpm'
      ? 'pnpm dev'
      : detectPackageManager(repoPath) === 'yarn'
      ? 'yarn dev'
      : 'npm run dev'
    : scripts.start
    ? detectPackageManager(repoPath) === 'pnpm'
      ? 'pnpm start'
      : detectPackageManager(repoPath) === 'yarn'
      ? 'yarn start'
      : 'npm start'
    : 'N/A';
  const buildCmd = scripts.build
    ? detectPackageManager(repoPath) === 'pnpm'
      ? 'pnpm build'
      : detectPackageManager(repoPath) === 'yarn'
      ? 'yarn build'
      : 'npm run build'
    : 'N/A';
  const testCmd = scripts.test
    ? detectPackageManager(repoPath) === 'pnpm'
      ? 'pnpm test'
      : detectPackageManager(repoPath) === 'yarn'
      ? 'yarn test'
      : 'npm test'
    : 'N/A';

  return { framework, language, styling, buildTool, testFramework, lint, installCmd, runCmd, buildCmd, testCmd };
};

const replaceLine = (content, label, value) => {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^- ${escaped}:.*$`, 'm');
  const line = `- ${label}: ${value}`;
  return regex.test(content) ? content.replace(regex, line) : `${content}\n${line}\n`;
};

const renderContext = ({
  template,
  projectTitle,
  repoUrl,
  mainBranch,
  activeBranch,
  productionApp,
  lastUpdated,
  tech,
  packageManager,
}) => {
  let out = template;
  out = replaceLine(out, 'Project name', projectTitle);
  out = replaceLine(out, 'Last updated (YYYY-MM-DD)', lastUpdated || '');
  out = replaceLine(out, 'Production app', productionApp || '');
  out = replaceLine(out, 'Repository', repoUrl || '');
  out = replaceLine(out, 'Main branch', repoUrl ? `${repoUrl}/tree/${mainBranch || 'main'}` : mainBranch || 'main');
  out = replaceLine(out, 'Active working branch', repoUrl ? `${repoUrl}/tree/${activeBranch || mainBranch || 'main'}` : activeBranch || mainBranch || 'main');
  out = replaceLine(out, 'Framework', tech.framework);
  out = replaceLine(out, 'Language', tech.language);
  out = replaceLine(out, 'Styling', tech.styling);
  out = replaceLine(out, 'Package manager', packageManager);
  out = replaceLine(out, 'Build tool', tech.buildTool);
  out = replaceLine(out, 'Test frameworks', tech.testFramework);
  out = replaceLine(out, 'Lint/format', tech.lint);

  out = out.replace(/- `npm ci` \(or equivalent\)/g, `- \`${tech.installCmd}\``);
  out = out.replace(/- `npm run dev` \(or equivalent\)/g, `- \`${tech.runCmd}\``);
  out = out.replace(/- `npm run build` \(or equivalent\)/g, `- \`${tech.buildCmd}\``);
  out = out.replace(/- `npm test` \(or equivalent\)/g, `- \`${tech.testCmd}\``);

  return out;
};

const template = fs.readFileSync(templatePath, 'utf8');
const results = [];

for (const row of selectedRows) {
  const repoPath = path.resolve(rootDir, row.local_path || `../${row.repo_slug}`);
  const shouldCommit = row.commit_enabled === 'yes' && commit;
  const rec = {
    project: row.project_title,
    repo: row.repo_slug,
    pass: row.pass,
    path: repoPath,
    status: 'pending',
    note: '',
    changed: 'no',
    committed: 'no',
    pushed: 'no',
  };

  try {
    if (!fs.existsSync(repoPath)) {
      if (!cloneMissing) {
        rec.status = 'blocked';
        rec.note = 'missing-local-repo';
        results.push(rec);
        continue;
      }
      const cloneCmd = `git clone ${q(row.repo_url)} ${q(repoPath)}`;
      if (!dryRun) execSync(cloneCmd, { stdio: 'inherit' });
      rec.note = 'cloned';
    }

    const isGit = fs.existsSync(path.join(repoPath, '.git'));
    if (!isGit) {
      rec.status = 'blocked';
      rec.note = 'not-a-git-repo';
      results.push(rec);
      continue;
    }

    const dirty = safeRun('git status --porcelain', repoPath);
    if (dirty && !forceOverwrite) {
      rec.status = 'blocked';
      rec.note = 'dirty-working-tree';
      results.push(rec);
      continue;
    }

    const mainBranch = safeRun('git remote show origin | sed -n "s/.*HEAD branch: //p"', repoPath) || 'main';
    if (shouldCommit && !dryRun) {
      run(`git checkout ${mainBranch}`, repoPath);
      run(`git pull --rebase origin ${mainBranch}`, repoPath);
    }
    const activeBranch = safeRun('git branch --show-current', repoPath) || mainBranch;
    const repoUrlRaw = safeRun('git remote get-url origin', repoPath) || row.repo_url;
    const repoUrl = repoUrlRaw.replace(/\.git$/, '');
    const lastUpdated = safeRun('git log -1 --format=%cs', repoPath);

    const existingContextPath = path.join(repoPath, 'LLM_CONTEXT.md');
    const existedBefore = fs.existsSync(existingContextPath);
    const existingContext = fs.existsSync(existingContextPath)
      ? fs.readFileSync(existingContextPath, 'utf8')
      : '';
    const existingProdMatch = existingContext.match(/^- Production app:\s*(.+)$/m);
    let productionApp = existingProdMatch ? existingProdMatch[1].trim() : '';
    if (!productionApp) productionApp = homepageBySlug.get(String(row.repo_slug).toLowerCase()) || '';

    const tech = detectTech(repoPath);
    const rendered = renderContext({
      template,
      projectTitle: row.project_title,
      repoUrl,
      mainBranch,
      activeBranch,
      productionApp,
      lastUpdated,
      tech,
      packageManager: detectPackageManager(repoPath),
    });

    const finalContent =
      existingContext && !forceOverwrite
        ? replaceLine(
            replaceLine(
              replaceLine(
                replaceLine(
                  replaceLine(
                    replaceLine(existingContext, 'Project name', row.project_title),
                    'Production app',
                    productionApp || ''
                  ),
                  'Repository',
                  repoUrl || ''
                ),
                'Main branch',
                repoUrl ? `${repoUrl}/tree/${mainBranch}` : mainBranch
              ),
              'Active working branch',
              repoUrl ? `${repoUrl}/tree/${activeBranch}` : activeBranch
            ),
            'Last updated (YYYY-MM-DD)',
            lastUpdated || ''
          )
        : rendered;

    const changed = existingContext !== finalContent;
    if (changed && !dryRun) {
      fs.writeFileSync(existingContextPath, finalContent);
    }

    rec.changed = changed ? 'yes' : 'no';

    if (shouldCommit && changed) {
      if (!dryRun) {
        run('git add LLM_CONTEXT.md', repoPath);
        const commitMsg = existedBefore
          ? 'docs: update LLM_CONTEXT with project context details'
          : 'docs: add LLM_CONTEXT scaffold and prefilled project metadata';
        const staged = safeRun('git diff --cached --name-only', repoPath);
        if (staged) {
          run(`git commit -m "${commitMsg}"`, repoPath);
          rec.committed = 'yes';
          run(`git push origin ${mainBranch}`, repoPath);
          rec.pushed = 'yes';
        }
      }
    }

    rec.status = 'done';
    if (!rec.note) rec.note = changed ? 'context-updated' : 'no-change';
  } catch (error) {
    rec.status = 'blocked';
    rec.note = String(error.message || error).split('\n')[0].slice(0, 220);
  }

  results.push(rec);
}

const statusHeader = 'project,repo,pass,path,status,changed,committed,pushed,note';
const statusLines = results.map((r) =>
  [r.project, r.repo, r.pass, r.path, r.status, r.changed, r.committed, r.pushed, r.note]
    .map((v) => `"${String(v).replace(/"/g, '""')}"`)
    .join(',')
);
const statusCsv = `${statusHeader}\n${statusLines.join('\n')}\n`;
if (!dryRun) fs.writeFileSync(statusPath, statusCsv);

const done = results.filter((r) => r.status === 'done').length;
const blocked = results.filter((r) => r.status !== 'done').length;
console.log(`Rollout complete for --pass=${pass}. done=${done}, blocked=${blocked}, total=${results.length}`);
if (!dryRun) console.log(`Status written: ${statusPath}`);
for (const r of results) {
  console.log(`- [${r.status}] ${r.project} (${r.repo}) changed=${r.changed} commit=${r.committed} push=${r.pushed} note=${r.note}`);
}
