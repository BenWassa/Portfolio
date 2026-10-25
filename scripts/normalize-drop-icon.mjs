// Remask the native-resolution drop icon WITHOUT regenerating or upscaling art.
// Authoritative source: BenWassa/drop, main@569205b3d090fe3c6b85d45f5159a68734b9b18c,
// docs/icons/old/drop_rounded_full.png (1024px, blob 3ad4a6aa1d64499e584309ea420f544fd28ef224).
// Usage: node scripts/normalize-drop-icon.mjs --source <downloaded-native.png> --write
//        node scripts/normalize-drop-icon.mjs --check
// No-argument invocation is informational; never changes files.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const destination = fileURLToPath(new URL('../src/public/assets/projects/drop.png', import.meta.url));
const args = process.argv.slice(2);
const sourceIndex = args.indexOf('--source');
const source = sourceIndex >= 0 ? args[sourceIndex + 1] : null;
const write = args.includes('--write');
const check = args.includes('--check');
if (args.some((arg, i) =>
  !['--source', '--write', '--check'].includes(arg) && i !== sourceIndex + 1) ||
    (write && (check || !source)) ||
    (check && source) ||
    (source && !write)) {
  throw new Error('Usage: --source <native-1024px-png> --write | --check');
}
const size = 1024;
const targetRadius = size * 0.225;
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${targetRadius}" ry="${targetRadius}" fill="#fff" /></svg>`);

async function validate(png) {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.width !== size || info.height !== size || info.channels !== 4) {
    throw new Error(`Expected 1024x1024 RGBA, got ${info.width}x${info.height} / ${info.channels} channels`);
  }
  const alpha = (x, y) => data[(y * size + x) * 4 + 3];
  const mid = size / 2;
  for (const [x, y] of [[mid, mid], [mid, 0], [mid, size - 1], [0, mid], [size - 1, mid]]) {
    if (alpha(x, y) !== 255) throw new Error(`Transparent or padded edge at ${x},${y}`);
  }
  for (const [x, y] of [[0, 0], [0, size - 1], [size - 1, 0], [size - 1, size - 1]]) {
    if (alpha(x, y) !== 0) throw new Error(`Corners must be transparent at ${x},${y}`);
  }
  let first = 0;
  while (first < mid && alpha(first, 0) < 128) first++;
  const expected = targetRadius - Math.sqrt(targetRadius - 0.25);
  if (Math.abs(first - expected) > 8) {
    throw new Error(`Corner mismatch: top starts at ${first}, expected ~${Math.round(expected)}`);
  }
  return (100 * (first + Math.sqrt(first) + 0.5) / size).toFixed(2);
}

if (check) {
  const png = await readFile(destination);
  const radius = await validate(png);
  console.log(`OK drop.png: 1024x1024; 22.5% target (measured ${radius}%); full-bleed canvas`);
} else if (write) {
  const original = await readFile(source);
  const meta = await sharp(original).metadata();
  if (meta.width !== size || meta.height !== size) {
    throw new Error(`Native drop source must be 1024x1024; got ${meta.width}x${meta.height}`);
  }
  const png = await sharp(original).ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png({ compressionLevel: 9 }).toBuffer();
  const radius = await validate(png);
  await writeFile(destination, png);
  console.log(`WROTE drop.png from native 1024px artwork: 22.5% target (measured ${radius}%), no resampling`);
} else {
  console.log('Read-only. Provide --source <native-1024px-png> --write or --check.');
}
