// Finishes the five padded app cards after scripts/normalize-icon-squares.mjs
// has trimmed their transparent gutters and reconstructed full-bleed square edges.
// Used for Portfolio issue #35, batch 2. Preservation only: no image generation.
// Usage:
//   node scripts/finalize-padded-icons.mjs --source /tmp/portfolio-icons-normalized --write
//   node scripts/finalize-padded-icons.mjs --check
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dest = fileURLToPath(new URL('../src/public/assets/projects/', import.meta.url));
const files = ['chefs-journal.png', 'punchbuggy.png', 'hearth.png', 'pushup.png', 'morpheus.png'];
const size = 1024;
const cornerFraction = 0.225;
const radius = cornerFraction * size;
const expectedFirstOpaqueX = radius - Math.sqrt(radius - 0.25);
const args = process.argv.slice(2);
const write = args.includes('--write');
const check = args.includes('--check');
const sourceIndex = args.indexOf('--source');
const source = sourceIndex < 0 ? null : args[sourceIndex + 1];
if ((write === check) || (write && !source) || (check && source) ||
    args.some((arg, i) => !['--write', '--check', '--source'].includes(arg) && i !== sourceIndex + 1)) {
  throw new Error('Usage: --source <normalized-dir> --write | --check');
}
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`);

async function inspect(png, file) {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.width !== size || info.height !== size || info.channels !== 4) {
    throw new Error(`${file}: expected 1024x1024 RGBA, got ${info.width}x${info.height} channels=${info.channels}`);
  }
  const a = (x, y) => data[(y * size + x) * 4 + 3];
  const mid = size >> 1;
  if (a(mid, mid) < 250 || a(mid, 0) < 250 || a(0, mid) < 250 ||
      a(size - 1, mid) < 250 || a(mid, size - 1) < 250) {
    throw new Error(`${file}: canvas body does not fill its square edges`);
  }
  if (a(0, 0) > 10 || a(size - 1, 0) > 10 ||
      a(0, size - 1) > 10 || a(size - 1, size - 1) > 10) {
    throw new Error(`${file}: outside corners should be transparent`);
  }
  let x = 0;
  while (x < mid && a(x, 0) < 128) x += 1;
  if (Math.abs(x - expectedFirstOpaqueX) > 8) {
    throw new Error(`${file}: first opaque top pixel ${x} outside 22.5% corner tolerance (expected ~${Math.round(expectedFirstOpaqueX)})`);
  }
  return (100 * (x + Math.sqrt(x) + 0.5) / size).toFixed(2);
}

for (const file of files) {
  const destination = join(dest, file);
  if (check) {
    const png = await readFile(destination);
    console.log(`OK ${file}: ${await inspect(png, file)}% circular corner, 1024x1024, fills edge-to-edge`);
    continue;
  }

  // Source normalization is deliberately isolated from the committed files:
  // ensure-alpha/crop and reconstructed background are calculated into /tmp first.
  const normalized = await readFile(join(source, file));
  const meta = await sharp(normalized).metadata();
  if (meta.width !== size || meta.height !== size) {
    throw new Error(`${file}: normalized source is not 1024x1024`);
  }
  const png = await sharp(normalized)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  console.log(`write ${file}: ${await inspect(png, file)}% circular corner, 1024x1024, centered image`);
  await writeFile(destination, png);
}
