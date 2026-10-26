// Read-only before/after contact sheet from pinned pre-mask sources; no artwork regeneration.
// Usage: node scripts/render-remaining-icon-preview.mjs <before-dir>
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
const before = process.argv[2];
if (!before) throw new Error('Usage: node scripts/render-remaining-icon-preview.mjs <before-dir>');
const assets = fileURLToPath(new URL('../src/public/assets/projects/', import.meta.url));
const output = fileURLToPath(new URL('../docs/open/ICON68-MACHT-PANTHEON-BEFORE-AFTER.png', import.meta.url));
const specs = [['Macht', 'macht.png'], ['Pantheon', 'pantheon.png']];
const W = 1200;
const H = 710;
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<rect width="${W}" height="${H}" fill="#0c0e11"/>
<text x="45" y="45" fill="#f0f2f5" font-size="24" font-family="Arial" font-weight="bold">Existing image · corner correction only</text>
<text x="45" y="73" fill="#9ba1ad" font-size="15" font-family="Arial">Macht and Pantheon · 1024px RGBA · 22.5% circular mask</text>
<text x="110" y="116" fill="#fafafa" font-size="19" font-family="Arial">Before (main)</text>
<text x="680" y="116" fill="#fafafa" font-size="19" font-family="Arial">After (PR #68)</text>
<line x1="600" y1="104" x2="600" y2="672" stroke="#393b42"/>
<text x="45" y="689" fill="#9ba1ad" font-size="14" font-family="Arial">Images rendered at 200px and 90px, matching desktop/mobile card use · no new branding</text>
</svg>`);
const layers=[{ input:svg, left:0, top:0 }];
for (let i=0;i<specs.length;i++){
  const [label,file]=specs[i];
  const y=140+i*260;
  for (const [path,x] of [[join(before,file),110],[join(assets,file),680]]){
    const buf=await readFile(path);
    layers.push({input:await sharp(buf).resize(200,200).png().toBuffer(),left:x,top:y});
    layers.push({input:await sharp(buf).resize(90,90).png().toBuffer(),left:x+235,top:y+60});
  }
}
await mkdir(dirname(output),{recursive:true});
await sharp({create:{width:W,height:H,channels:4,background:'#0c0e11'}})
  .composite(layers).png({compressionLevel:9}).toFile(output);
console.log(output);
