// Render a human-review contact sheet for batch 2 only.
// Output is evidence for PR #63, not an app asset.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';
const directory = fileURLToPath(new URL('../src/public/assets/projects/', import.meta.url));
const output = fileURLToPath(new URL('../docs/open/ICON-PADDING-BATCH2-PREVIEW.png', import.meta.url));
const icons = [
  ['Chef’s Journal', 'chefs-journal.png'],
  ['Punchbuggy', 'punchbuggy.png'],
  ['Hearth', 'hearth.png'],
  ['PushUp', 'pushup.png'],
  ['Morpheus', 'morpheus.png'],
];
const width = 1500;
const height = 432;
const cellW = 274;
const margin = 65;
const big = 202;
const small = 90;
const rows = [];
const layers = [];
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (let i = 0; i < icons.length; i++) {
  const [name, filename] = icons[i];
  const x = margin + cellW * i;
  const image = sharp(join(directory, filename));
  layers.push({ input: await image.clone().resize(big, big, { fit: 'fill' }).png().toBuffer(), left: x, top: 80 });
  layers.push({ input: await image.clone().resize(small, small).png().toBuffer(), left: x + big - small, top: 313 });
  rows.push(`<text x="${x}" y="62" font-size="22" fill="#f2f2f2" font-weight="600">${escape(name)}</text>`);
}
const labels = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
<rect width="100%" height="100%" fill="#0c0e11"/>
<text x="40" y="28" font-size="17" fill="#9ba1ad">Batch 2 · Existing artwork · 22.5% corner mask · 1024×1024 source</text>
${rows.join('')}
<text x="40" y="389" font-size="14" fill="#98a2ad">Large = desktop display · small = mobile display</text>
</svg>`);
await mkdir(fileURLToPath(new URL('../docs/open/', import.meta.url)), { recursive: true });
await sharp({ create: { width, height, channels: 4, background: '#0c0e11' } })
  .composite([{ input: labels, left: 0, top: 0 }, ...layers])
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(`Wrote ${output}`);
