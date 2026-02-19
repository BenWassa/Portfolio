#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const args = new Set(process.argv.slice(2));
const requireAll = args.has('--require-all');

const portfolioPath = path.join(process.cwd(), 'src/js/project-descriptions.ts');
const contextsDir = path.join(process.cwd(), 'llm-project-contexts');

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '');

const cleanField = (value) => value.replace(/^`|`$/g, '').trim();

const normalizeUrl = (value) => {
  if (!value) return null;
  const raw = cleanField(value);
  if (!raw || /^n\/a$/i.test(raw)) return null;
  try {
    const url = new URL(raw);
    url.hash = '';
    if (url.pathname.length > 1) {
      url.pathname = url.pathname.replace(/\/+$/, '');
    }
    return url.toString();
  } catch {
    return raw;
  }
};

const readText = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Failed to read ${filePath}: ${error.message}`);
    process.exit(1);
  }
};

if (!fs.existsSync(portfolioPath)) {
  console.error(`Missing portfolio source file: ${portfolioPath}`);
  process.exit(1);
}

if (!fs.existsSync(contextsDir)) {
  console.error(`Missing contexts directory: ${contextsDir}`);
  process.exit(1);
}

const portfolioSource = readText(portfolioPath);
const projectRegex = /\{\s*title:\s*'([^']+)'\s*,[\s\S]*?href:\s*(null|'([^']*)')/g;
const portfolioProjects = [];
let match;
while ((match = projectRegex.exec(portfolioSource)) !== null) {
  portfolioProjects.push({
    title: match[1],
    key: normalize(match[1]),
    href: match[3] || null,
  });
}

if (portfolioProjects.length === 0) {
  console.error(`No projects parsed from ${portfolioPath}.`);
  process.exit(1);
}

const contextFiles = fs
  .readdirSync(contextsDir)
  .filter(
    (fileName) =>
      /^LLM_PROJECT_CONTEXT_/i.test(fileName) &&
      /\.md$/i.test(fileName) &&
      !/^LLM_PROJECT_CONTEXT_TEMPLATE\.md$/i.test(fileName)
  );

const requiredPatterns = [
  /^## 1\) Project Snapshot/m,
  /^## 3\) Links \(Use Full URLs\)/m,
  /^## 4\) Tech Stack/m,
  /^## 5\) Architecture Overview/m,
];

const issues = [];
const contextByProjectKey = new Map();

for (const fileName of contextFiles) {
  const filePath = path.join(contextsDir, fileName);
  const body = readText(filePath);

  const missingSections = requiredPatterns.filter((pattern) => !pattern.test(body));
  if (missingSections.length > 0) {
    issues.push(
      `${fileName}: missing one or more required template sections (snapshot, links, tech stack, architecture).`
    );
  }

  const projectNameMatch = body.match(/^- Project name:\s*(.+)$/m);
  if (!projectNameMatch) {
    issues.push(`${fileName}: missing "- Project name:" line.`);
    continue;
  }

  const projectName = cleanField(projectNameMatch[1]);
  const key = normalize(projectName);
  const productionUrlMatch = body.match(/^- Production app:\s*(.+)$/m);
  const productionUrl = productionUrlMatch ? normalizeUrl(productionUrlMatch[1]) : null;

  if (contextByProjectKey.has(key)) {
    issues.push(
      `${fileName}: duplicate project context for "${projectName}" (already defined in ${contextByProjectKey.get(key).fileName}).`
    );
    continue;
  }

  contextByProjectKey.set(key, { fileName, projectName, productionUrl });
}

const portfolioByKey = new Map(portfolioProjects.map((project) => [project.key, project]));

for (const context of contextByProjectKey.values()) {
  const project = portfolioByKey.get(normalize(context.projectName));
  if (!project) {
    issues.push(
      `${context.fileName}: project "${context.projectName}" not found in src/js/project-descriptions.ts.`
    );
    continue;
  }

  const portfolioUrl = normalizeUrl(project.href);
  if (context.productionUrl && portfolioUrl && context.productionUrl !== portfolioUrl) {
    issues.push(
      `${context.fileName}: production URL mismatch for "${project.title}" (context=${context.productionUrl}, portfolio=${portfolioUrl}).`
    );
  }
}

if (requireAll) {
  for (const project of portfolioProjects) {
    if (!contextByProjectKey.has(project.key)) {
      issues.push(
        `Missing context file for "${project.title}" (expected in llm-project-contexts/ with "- Project name: ${project.title}").`
      );
    }
  }
}

if (issues.length > 0) {
  console.error('Portfolio/context sync check failed:\n');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  console.error(
    `\nChecked ${contextFiles.length} context file(s) against ${portfolioProjects.length} portfolio project(s).`
  );
  process.exit(1);
}

console.log(
  `Portfolio/context sync check passed. Checked ${contextFiles.length} context file(s) against ${portfolioProjects.length} portfolio project(s).`
);
