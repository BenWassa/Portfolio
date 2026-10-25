#!/usr/bin/env node
// Measures corner rounding, fill and squareness of every square card's icon.
// Output is the table in docs/open/APP-ICON-CORNERS.md. Read-only.

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const source = fs.readFileSync(path.join(rootDir, 'src/js/project-descriptions.ts'), 'utf8');
const imageDir = path.join(rootDir, 'src/public/assets/projects');

const TARGET_RADIUS = 22.5; // % of icon width; the Argus mask and the iOS app-icon look
const RADIUS_TOLERANCE = 2.5;
const MIN_FILL = 97; // % of the canvas the icon body should cover
const OPAQUE = 127;

const entries = source.split(/\n {2}\{\n {4}title:/).slice(1);
const cards = entries
  .map((entry) => ({
    title: entry.match(/^\s*(['"])(.+?)\1/)?.[2],
    img: entry.match(/img:\s*'assets\/projects\/([^']+)'/)?.[1],
    square: /orientation:\s*'square'/.test(entry),
  }))
  .filter((card) => card.square && card.img);

const measure = async ({ title, img }) => {
  const { data, info } = await sharp(path.join(imageDir, img))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;
  const alpha = (x, y) => data[(y * w + x) * channels + channels - 1];
  const margin = (at) => {
    let i = 0;
    while (at(i) <= OPAQUE && i < w / 2) i++;
    return i;
  };
  const top = margin((i) => alpha(w >> 1, i));
  const bottom = margin((i) => alpha(w >> 1, h - 1 - i));
  const left = margin((i) => alpha(i, h >> 1));
  const right = margin((i) => alpha(w - 1 - i, h >> 1));
  const bw = w - left - right;
  const bh = h - top - bottom;
  // Walk each bounding-box corner diagonally to the first opaque pixel. A circular corner of
  // radius r is cut by r * (1 - 1/sqrt(2)) along each axis at the diagonal.
  const diagonal = (x0, y0, dx, dy) => {
    let d = 0;
    while (alpha(x0 + dx * d, y0 + dy * d) <= OPAQUE && d < bw / 2) d++;
    return d;
  };
  const cuts = [
    diagonal(left, top, 1, 1),
    diagonal(w - 1 - right, top, -1, 1),
    diagonal(left, h - 1 - bottom, 1, -1),
    diagonal(w - 1 - right, h - 1 - bottom, -1, -1),
  ];
  const radius = (cuts.reduce((s, v) => s + v, 0) / 4 / (1 - Math.SQRT1_2) / bw) * 100;
  const fill = (Math.min(bw, bh) / w) * 100;
  const squareness = (bw / bh) * 100;
  const problems = [];
  if (w !== 1024 || h !== 1024) problems.push(`${w}×${h}, not 1024×1024`);
  if (Math.abs(radius - TARGET_RADIUS) > RADIUS_TOLERANCE) {
    problems.push(`radius ${radius.toFixed(1)}%`);
  }
  if (fill < MIN_FILL) problems.push(`icon fills ${fill.toFixed(0)}% of canvas`);
  if (Math.abs(squareness - 100) > 1.5) problems.push(`icon body ${bw}×${bh}, not square`);
  return { title, img, size: `${w}×${h}`, radius, fill, bw, bh, problems };
};

const rows = [];
for (const card of cards) rows.push(await measure(card));

console.log('| Card | File | Canvas | Radius | Icon body | Fill | Verdict |');
console.log('|---|---|---|---|---|---|---|');
for (const r of rows) {
  const verdict = r.problems.length ? `remake: ${r.problems.join('; ')}` : 'ok';
  console.log(
    `| ${r.title} | \`${r.img}\` | ${r.size} | ${r.radius.toFixed(1)}% | ${r.bw}×${r.bh} | ${r.fill.toFixed(0)}% | ${verdict} |`
  );
}
