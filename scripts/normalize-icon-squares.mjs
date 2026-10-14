// Flatten square-card icon PNGs into full-bleed squares so the card CSS can apply
// one corner radius to all of them (issue #35, docs/open/ICON-ROUNDING-REVIEW.md).
//
// For each square PNG it:
//   1. trims transparent padding (alpha below 128),
//   2. centre-crops to a square when the art is not square (reported, never stretched),
//   3. fills baked-in rounded corners and soft edges by extending the nearest solid
//      pixel outward, so the result is opaque edge to edge,
//   4. resizes to --size (default 1024).
//
// Dry run by default: it prints what it would change. Nothing is overwritten unless
// you pass --write, and --out <dir> writes copies elsewhere instead.
//
//   node scripts/normalize-icon-squares.mjs                      report only
//   node scripts/normalize-icon-squares.mjs --out /tmp/icons     write copies
//   node scripts/normalize-icon-squares.mjs --write hearth.png   overwrite in place
import { mkdir, readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const sourceDir = fileURLToPath(new URL('../src/public/assets/projects/', import.meta.url));
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const write = flag('--write');
const outDir = option('--out', null);
const size = Number(option('--size', 1024));
const valueFlags = new Set(['--out', '--size']);
const named = args.filter((a, i) => !a.startsWith('--') && !valueFlags.has(args[i - 1]));

const ALPHA_EDGE = 128;
const ALPHA_SOLID = 250;

function alphaBounds(data, w, h) {
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] >= ALPHA_EDGE) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return maxX < 0 ? null : { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

// Replace every non-solid pixel with the colour of its nearest solid pixel (two-pass
// propagation of the nearest-feature index). Output is fully opaque.
function fillToSolid(data, w, h) {
  const n = w * h;
  const feature = new Int32Array(n).fill(-1);
  for (let i = 0; i < n; i++) if (data[i * 4 + 3] >= ALPHA_SOLID) feature[i] = i;
  const dist2 = (i, f) => {
    const dx = (i % w) - (f % w);
    const dy = Math.floor(i / w) - Math.floor(f / w);
    return dx * dx + dy * dy;
  };
  const relax = (i, j) => {
    const f = feature[j];
    if (f < 0) return;
    if (feature[i] < 0 || dist2(i, f) < dist2(i, feature[i])) feature[i] = f;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (x > 0) relax(i, i - 1);
      if (y > 0) {
        relax(i, i - w);
        if (x > 0) relax(i, i - w - 1);
        if (x < w - 1) relax(i, i - w + 1);
      }
    }
  }
  for (let y = h - 1; y >= 0; y--) {
    for (let x = w - 1; x >= 0; x--) {
      const i = y * w + x;
      if (x < w - 1) relax(i, i + 1);
      if (y < h - 1) {
        relax(i, i + w);
        if (x < w - 1) relax(i, i + w + 1);
        if (x > 0) relax(i, i + w - 1);
      }
    }
  }
  for (let i = 0; i < n; i++) {
    if (data[i * 4 + 3] >= ALPHA_SOLID || feature[i] < 0) continue;
    const f = feature[i] * 4;
    data[i * 4] = data[f];
    data[i * 4 + 1] = data[f + 1];
    data[i * 4 + 2] = data[f + 2];
  }
  for (let i = 0; i < n; i++) data[i * 4 + 3] = 255;
}

async function normalise(file) {
  const input = join(sourceDir, file);
  const meta = await sharp(input).metadata();
  if (meta.width !== meta.height) return { file, skipped: `canvas ${meta.width}x${meta.height} is not square` };

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const bounds = alphaBounds(data, info.width, info.height);
  if (!bounds) return { file, skipped: 'fully transparent' };

  const notes = [];
  const pad = Math.round((100 * (info.width - bounds.width)) / info.width);
  if (bounds.left > 0 || bounds.top > 0 || bounds.width < info.width || bounds.height < info.height) {
    notes.push(`trim ${bounds.width}x${bounds.height} at ${bounds.left},${bounds.top} (${pad}% padding)`);
  }
  const side = Math.min(bounds.width, bounds.height);
  const ratio = bounds.width / bounds.height;
  const square = {
    left: bounds.left + Math.floor((bounds.width - side) / 2),
    top: bounds.top + Math.floor((bounds.height - side) / 2),
    width: side,
    height: side,
  };
  if (Math.abs(ratio - 1) > 0.02) notes.push(`art is ${ratio.toFixed(2)}:1, centre-cropped to square (check by eye)`);

  const cropped = await sharp(input).ensureAlpha().extract(square).raw().toBuffer({ resolveWithObject: true });
  fillToSolid(cropped.data, cropped.info.width, cropped.info.height);
  notes.push('corners and edges filled to opaque');

  const result = sharp(cropped.data, {
    raw: { width: cropped.info.width, height: cropped.info.height, channels: 4 },
  })
    .resize(size, size, { kernel: 'lanczos3' })
    .removeAlpha()
    .png({ compressionLevel: 9 });
  const target = write && !outDir ? input : outDir ? join(outDir, basename(file)) : null;
  if (target) {
    if (outDir) await mkdir(outDir, { recursive: true });
    await result.toFile(target); // pixels are already in memory, so writing over the source is safe
  }
  return { file, notes, target };
}

const files = named.length
  ? named
  : (await readdir(sourceDir)).filter((f) => f.endsWith('.png')).sort();
for (const file of files) {
  const r = await normalise(file);
  if (r.skipped) console.log(`skip   ${file}: ${r.skipped}`);
  else console.log(`${r.target ? 'wrote ' : 'dryrun'} ${file}: ${r.notes.join('; ')}${r.target ? ` -> ${r.target}` : ''}`);
}
if (!write && !outDir) console.log('\nDry run. Pass --out <dir> to write copies or --write to overwrite sources.');
