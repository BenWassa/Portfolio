#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import vm from 'node:vm';

const rootDir = process.cwd();
const sourcePath = path.join(rootDir, 'src/js/project-descriptions.ts');
const outDir = path.join(rootDir, 'llm-project-contexts/portfolio-project-docs');

const normalizeKey = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '');

const safeExec = (cmd) => {
  try {
    return execSync(cmd, { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

const extractSection = (source, startMarker, endMarker) => {
  const start = source.indexOf(startMarker);
  if (start < 0) throw new Error(`Missing section start marker: ${startMarker}`);
  const from = source.slice(start + startMarker.length);
  const end = from.indexOf(endMarker);
  if (end < 0) throw new Error(`Missing section end marker: ${endMarker}`);
  return from.slice(0, end).trim();
};

const readData = () => {
  if (!fs.existsSync(sourcePath)) throw new Error(`Missing source file: ${sourcePath}`);
  const source = fs.readFileSync(sourcePath, 'utf8');

  const projectsArrayText = extractSection(
    source,
    'export const projectsData: Project[] =',
    'export const projectDescriptions: ProjectDescriptions ='
  )
    .trim()
    .replace(/;\s*$/, '');
  const descriptionsObjectText = extractSection(
    source,
    'export const projectDescriptions: ProjectDescriptions =',
    '\n};'
  )
    .trim()
    .replace(/^\{/, '')
    .replace(/\}$/, '');

  const projectsData = vm.runInNewContext(`(${projectsArrayText})`);
  const projectDescriptions = vm.runInNewContext(`({${descriptionsObjectText}})`);

  if (!Array.isArray(projectsData)) throw new Error('projectsData did not evaluate to an array');
  return { projectsData, projectDescriptions };
};

const toSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const toDocName = (title) => `${toSlug(title)}.md`;

const renderProjectDoc = ({ project, description, generatedAt, commit, branch }) => {
  const slug = toSlug(project.title);
  const stack = (project.techSpecs?.stack || []).map((item) => `\`${item}\``).join(', ') || 'N/A';
  const features = (project.techSpecs?.features || []).map((item) => `- ${item}`).join('\n') || '- N/A';

  return `# ${project.title} - Portfolio Project Record

Generated: ${generatedAt}
Source: \`src/js/project-descriptions.ts\`
Branch: ${branch || 'unknown'}
Commit: ${commit || 'unknown'}
Project slug: \`${slug}\`

## Snapshot
- Title: ${project.title}
- Tag: ${project.tag}
- Status: \`${project.status}\`
- Type: \`${project.type}\`
- Orientation: \`${project.orientation}\`
- Live URL: ${project.href || '(not set)'}
- Image path: \`${project.img}\`
- Image alt: ${project.alt}

## Core Description
- Card description: ${project.desc}
- Portfolio summary: ${description?.portfolio || '(not set)'}
- Full description: ${description?.full || '(not set)'}

## Technical Profile
- Model: ${project.techSpecs?.model || 'N/A'}
- Stack: ${stack}
- Key features:
${features}

## Theme
- Primary: \`${project.theme?.primary || 'N/A'}\`
- Secondary: \`${project.theme?.secondary || 'N/A'}\`
- Tertiary: \`${project.theme?.tertiary || 'N/A'}\`
- Background: \`${project.theme?.bg || 'N/A'}\`
`;
};

const renderIndexDoc = ({ projects, generatedAt, commit, branch }) => {
  const rows = projects
    .map(
      (p) =>
        `| ${p.title} | \`${p.status}\` | \`${p.type}\` | ${p.href || '(not set)'} | [${toDocName(p.title)}](${toDocName(
          p.title
        )}) |`
    )
    .join('\n');

  return `# Portfolio Project Docs Index

Generated: ${generatedAt}
Source: \`src/js/project-descriptions.ts\`
Branch: ${branch || 'unknown'}
Commit: ${commit || 'unknown'}
Total projects: ${projects.length}

This folder is auto-generated on build. Edit source project data in \`src/js/project-descriptions.ts\`.

| Project | Status | Type | Live URL | Doc |
| --- | --- | --- | --- | --- |
${rows}
`;
};

const main = () => {
  const { projectsData, projectDescriptions } = readData();
  const generatedAt = new Date().toISOString();
  const commit = safeExec('git rev-parse --short HEAD');
  const branch = safeExec('git branch --show-current');

  fs.mkdirSync(outDir, { recursive: true });

  for (const project of projectsData) {
    const key = normalizeKey(project.title);
    const description = projectDescriptions[key];
    const content = renderProjectDoc({ project, description, generatedAt, commit, branch });
    fs.writeFileSync(path.join(outDir, toDocName(project.title)), content);
  }

  const index = renderIndexDoc({ projects: projectsData, generatedAt, commit, branch });
  fs.writeFileSync(path.join(outDir, 'INDEX.md'), index);

  console.log(`Generated ${projectsData.length} project docs in ${path.relative(rootDir, outDir)}`);
};

main();
