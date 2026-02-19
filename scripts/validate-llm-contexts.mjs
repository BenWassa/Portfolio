#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const getArg = (flag, fallback = null) => {
  const idx = args.indexOf(flag);
  return idx >= 0 ? args[idx + 1] : fallback;
};
const pass = getArg('--pass', 'first_pass');

const rootDir = process.cwd();
const inventoryPath = path.join(rootDir, 'llm-project-contexts/repo-rollout.csv');
if (!fs.existsSync(inventoryPath)) {
  console.error(`Missing inventory: ${inventoryPath}`);
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

const run = (cmd, cwd) =>
  execSync(cmd, { cwd, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' }).trim();
const safeRun = (cmd, cwd) => {
  try {
    return run(cmd, cwd);
  } catch {
    return '';
  }
};

const requiredSections = [
  /^## 1\) Project Snapshot/m,
  /^## 3\) Links \(Use Full URLs\)/m,
  /^## 4\) Tech Stack/m,
  /^## 5\) Architecture Overview/m,
];

const issues = [];
let checked = 0;
for (const row of selectedRows) {
  const repoPath = path.resolve(rootDir, row.local_path || `../${row.repo_slug}`);
  const filePath = path.join(repoPath, 'LLM_CONTEXT.md');
  if (!fs.existsSync(filePath)) {
    issues.push(`${row.repo_slug}: missing LLM_CONTEXT.md`);
    continue;
  }
  checked += 1;
  const body = fs.readFileSync(filePath, 'utf8');
  for (const pattern of requiredSections) {
    if (!pattern.test(body)) {
      issues.push(`${row.repo_slug}: missing required section ${pattern}`);
      break;
    }
  }

  const repoUrl = safeRun('git remote get-url origin', repoPath).replace(/\.git$/, '');
  const mainBranch = safeRun('git remote show origin | sed -n "s/.*HEAD branch: //p"', repoPath) || 'main';
  const prodMatch = body.match(/^- Production app:\s*(.+)$/m);
  const repoMatch = body.match(/^- Repository:\s*(.+)$/m);
  const mainMatch = body.match(/^- Main branch:\s*(.+)$/m);

  const prod = prodMatch ? prodMatch[1].trim() : '';
  const repo = repoMatch ? repoMatch[1].trim() : '';
  const main = mainMatch ? mainMatch[1].trim() : '';
  if (!repo) issues.push(`${row.repo_slug}: Repository link is blank`);
  if (repo && repoUrl && repo !== repoUrl) issues.push(`${row.repo_slug}: Repository mismatch (doc=${repo}, git=${repoUrl})`);
  if (!main) issues.push(`${row.repo_slug}: Main branch is blank`);
  if (main && repoUrl && !main.includes(`/tree/${mainBranch}`)) {
    issues.push(`${row.repo_slug}: Main branch link does not match git HEAD branch (${mainBranch})`);
  }
  if (!prod) issues.push(`${row.repo_slug}: Production app is blank`);
  if (prod && !/^https?:\/\//i.test(prod)) issues.push(`${row.repo_slug}: Production app is not a full URL (${prod})`);
}

if (issues.length > 0) {
  console.error(`Validation failed. checked=${checked}, issues=${issues.length}`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Validation passed. checked=${checked}, issues=0`);
