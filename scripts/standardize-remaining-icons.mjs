// Non-destructive by default. Standardize existing app-card PNG corners only.
// Follow-up: Macht and Pantheon only. Their existing screenshots/artwork are preserved.
// Hermes needs a separate app-icon branding decision; do NOT modify it here.
// Usage: node scripts/standardize-remaining-icons.mjs [--write|--check]
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import sharp from 'sharp';

const directory = fileURLToPath(new URL('../src/public/assets/projects/', import.meta.url));
const files = ['macht.png', 'pantheon.png'];
const size = 1024;
const radius = size * 0.225; // 230.4 px, circular corner.
// At the top raster row (y=0.5), antialiasing makes the first opaque x
// smaller than the geometric radius: x = r - sqrt(r - 0.25).
const topEdgeTarget = radius - Math.sqrt(radius - 0.25);
const estimatedRadius = (edge) => edge + Math.sqrt(edge) + 0.5;
const args = new Set(process.argv.slice(2));
if ([...args].some((a) => a !== '--write' && a !== '--check') || (args.has('--write') && args.has('--check'))) {
  throw new Error('Usage: node scripts/standardize-remaining-icons.mjs [--write|--check]');
}

const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/></svg>`);
const threshold = 128;
async function topEdgeRadius(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.width !== size || info.height !== size || info.channels !== 4) throw new Error('Expected 1024x1024 RGBA');
  const middle = Math.floor(size / 2);
  const centerAlpha = data[(middle * size + middle) * 4 + 3];
  const topCenterAlpha = data[(middle) * 4 + 3];
  if (centerAlpha < 250 || topCenterAlpha < 250) throw new Error('Unexpected transparency through icon centre');
  for (let x = 0; x < middle; x++) {
    if (data[x * 4 + 3] >= threshold) return x;
  }
  throw new Error('Cannot detect solid top edge');
}

let failed = false;
for (const file of files) {
  const path = join(directory, file);
  const original = await readFile(path);
  const meta = await sharp(original).metadata();
  if (meta.width !== size || meta.height !== size) throw new Error(`${file}: expected 1024x1024, got ${meta.width}x${meta.height}`);
  const before = await topEdgeRadius(original);
  if (args.has('--check')) {
    const ok = Math.abs(before - topEdgeTarget) <= 8;
    console.log(`${ok ? 'OK' : 'FAIL'} ${file}: ${(100 * estimatedRadius(before) / size).toFixed(2)}% radius`);
    if (!ok) failed = true;
    continue;
  }
  if (Math.abs(before - topEdgeTarget) <= 2) {
    console.log(`unchanged ${file}: already at target`);
    continue;
  }
  if (before > radius + 8) {
    throw new Error(`${file}: existing ${before}px radius is larger than target; manual restoration required`);
  }
  const output = await sharp(original)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  const after = await topEdgeRadius(output);
  if (Math.abs(after - topEdgeTarget) > 8) throw new Error(`${file}: output radius ${after}px failed verification`);
  if (args.has('--write')) await writeFile(path, output);
  console.log(`${args.has('--write') ? 'wrote' : 'dry-run'} ${file}: ${(100 * estimatedRadius(before) / size).toFixed(2)}% -> ${(100 * estimatedRadius(after) / size).toFixed(2)}%`);
}
if (failed) process.exitCode = 1;
if (!args.has('--write') && !args.has('--check')) {
  console.log('Dry run only. Use --write to update PNGs; --check to verify.');
}
