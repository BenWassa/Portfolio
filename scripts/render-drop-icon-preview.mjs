// Generate an explicit before/after visual check for the drop icon.
// Usage: node scripts/render-drop-icon-preview.mjs <original-720px-png>
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/render-drop-icon-preview.mjs <original-720px-png>');
const original = await readFile(input);
const current = fileURLToPath(new URL('../src/public/assets/projects/drop.png', import.meta.url));
const output = fileURLToPath(new URL('../docs/open/DROP-ICON-1024-PREVIEW.png', import.meta.url));
const originalMeta = await sharp(original).metadata();
const currentMeta = await sharp(current).metadata();
if (originalMeta.width !== 720 || originalMeta.height !== 720 ||
  currentMeta.width !== 1024 || currentMeta.height !== 1024) {
  throw new Error('Before must be 720x720 and after 1024x1024');
}
const W = 1200;
const H = 450;
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#0c0e11"/>
  <text x="50" y="40" fill="#f1f1f3" font-size="26" font-family="sans-serif" font-weight="bold">drop — app icon normalization</text>
  <text x="50" y="65" fill="#9da5b3" font-size="15" font-family="sans-serif">Existing illustration retained; 1024×1024 canvas, 22.5% radius</text>
  <text x="125" y="106" fill="#ffffff" font-size="19" font-family="sans-serif">Before</text>
  <text x="675" y="106" fill="#ffffff" font-size="19" font-family="sans-serif">After</text>
  <text x="125" y="345" fill="#a7afbd" font-size="15" font-family="sans-serif">720 × 720 · original 16.6% radius</text>
  <text x="675" y="345" fill="#a7afbd" font-size="15" font-family="sans-serif">1024 × 1024 · normalized 22.5% radius</text>
  <text x="370" y="150" fill="#a7afbd" font-size="13" font-family="sans-serif">90px</text>
  <text x="920" y="150" fill="#a7afbd" font-size="13" font-family="sans-serif">90px</text>
  <line x1="600" y1="95" x2="600" y2="390" stroke="#2c323b" stroke-width="1"/>
  <text x="50" y="419" fill="#8c949f" font-size="14" font-family="sans-serif">Before and after shown at identical 212px / 90px card sizes for visual approval.</text>
</svg>`);
const layers=[{input:svg,left:0,top:0}];
for(const [buf, x] of [[original,125],[await readFile(current),675]]){
  layers.push({input:await sharp(buf).resize(212,212,{kernel:'lanczos3'}).png().toBuffer(),left:x,top:120});
  layers.push({input:await sharp(buf).resize(90,90,{kernel:'lanczos3'}).png().toBuffer(),left:x+245,top:163});
}
await mkdir(dirname(output),{recursive:true});
await sharp({create:{width:W,height:H,channels:4,background:'#0c0e11'}})
  .composite(layers).png({compressionLevel:9}).toFile(output);
console.log(`Preview ready: ${output}`);
