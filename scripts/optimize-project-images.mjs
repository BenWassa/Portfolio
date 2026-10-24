import { readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const directory = fileURLToPath(new URL('../src/public/assets/projects/', import.meta.url));
let originalBytes = 0;
let optimizedBytes = 0;
for (const file of await readdir(directory)) {
  if (!file.endsWith('.png')) continue;
  const input = `${directory}/${file}`;
  originalBytes += (await stat(input)).size;
  for (const width of [400, 800, 1200]) {
    const output = `${directory}/${file.slice(0, -4).toLowerCase()}-${width}w.webp`;
    await sharp(input).resize({ width }).webp({ quality: 82 }).toFile(output);
    if (width === 800) optimizedBytes += (await stat(output)).size;
  }
}
console.log(
  `Project images: ${(originalBytes / 1e6).toFixed(2)} MB PNG → ${(optimizedBytes / 1e6).toFixed(2)} MB at 800px WebP`
);
