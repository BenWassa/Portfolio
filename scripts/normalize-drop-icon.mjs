// Preserve drop's existing illustration; normalize only its size/corner shape.
// Usage: node scripts/normalize-drop-icon.mjs [--write|--check]
// Default is a dry run. Does not produce new/generated artwork.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = fileURLToPath(new URL('../src/public/assets/projects/drop.png', import.meta.url));
const options = new Set(process.argv.slice(2));
if ([...options].some((x) => !['--write', '--check'].includes(x)) ||
    (options.has('--check') && options.has('--write'))) {
  throw new Error('Usage: node scripts/normalize-drop-icon.mjs [--write|--check]');
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
    if (alpha(x, y) !== 255) throw new Error(`Transparent or padded card edge at ${x},${y}`);
  }
  for (const [x, y] of [[0, 0], [0, size - 1], [size - 1, 0], [size - 1, size - 1]]) {
    if (alpha(x, y) !== 0) throw new Error(`Corner must be fully transparent at ${x},${y}`);
  }
  // For a circular rounded-rectangle corner, the first opaque pixel on y=0
  // is slightly inside the geometric radius owing to antialiasing.
  let first = 0;
  while (first < mid && alpha(first, 0) < 128) first++;
  const expected = targetRadius - Math.sqrt(targetRadius - 0.25);
  if (Math.abs(first - expected) > 8) {
    throw new Error(`Corner too different: top starts at ${first}, expected ~${Math.round(expected)}`);
  }
  return (100 * (first + Math.sqrt(first) + 0.5) / size).toFixed(2);
}

const original = await readFile(source);
const before = await sharp(original).metadata();
if (options.has('--check')) {
  const radius = await validate(original);
  console.log(`OK drop.png: ${before.width}x${before.height}, 22.5% target (measured ${radius}%), full-bleed canvas`);
} else {
  if (before.width !== before.height || ![720, 1024].includes(before.width)) {
    throw new Error(`Unexpected drop source size ${before.width}x${before.height}; aborting rather than distorting art`);
  }
  if (before.width === 1024) {
    await validate(original);
    console.log('No change: drop.png is already a valid 1024px icon');
  } else {
    const png = await sharp(original)
      .ensureAlpha()
      .resize(size, size, { kernel: sharp.kernel.lanczos3 })
      .composite([{ input: mask, blend: 'dest-in' }])
      .png({ compressionLevel: 9 })
      .toBuffer();
    const radius = await validate(png);
    if (options.has('--write')) await writeFile(source, png);
    console.log(`${options.has('--write') ? 'WROTE' : 'DRY RUN'} drop.png: ${before.width}x${before.height} -> 1024x1024, measured radius ${radius}%`);
  }
}
