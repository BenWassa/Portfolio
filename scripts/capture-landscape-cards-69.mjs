// Temporary review capture for #69; use inside a GitHub Actions runner with playwright installed.
// Usage: node scripts/capture-landscape-cards-69.mjs <before-url> <after-url>
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const beforeUrl = process.argv[2];
const afterUrl = process.argv[3];
if (!beforeUrl || !afterUrl) throw new Error('Usage: <before-url> <after-url>');
const outputDir = fileURLToPath(new URL('../docs/open/', import.meta.url));
await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const names = ['Ares', 'Iris'];
const screenshots = [];
try {
  for (const [label,url] of [['Before',beforeUrl], ['After',afterUrl]]) {
    for (const width of [390,1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      const failures = [];
      // A clean browser normally shows seven-day onboarding. Use a valid recent local visit
      // for both before and after so screenshot automation measures the actual portfolio grid.
      await page.addInitScript(() => window.localStorage.setItem('portfolio_last_visit', new Date().toISOString()));
      page.on('pageerror', (e) => failures.push(e.message));
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('#pillar-psych').click({ position: { x: 20, y: 20 }, force: true });
      await page.locator('#pillar-psych .track-content').waitFor({ state: 'visible', timeout: 20000 });
      for (const name of names) {
        const heading = page.locator('#pillar-psych').getByRole('heading', { name, exact: true });
        await heading.waitFor({ state: 'visible' });
        await heading.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const path = `${outputDir}ISSUE69-${name.toUpperCase()}-${width}-${label.toUpperCase()}.png`;
        await page.screenshot({ path, animations: 'disabled' });
        screenshots.push(path);
      }
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      if (scrollWidth > width + 2) throw new Error(`${label} at ${width}px has horizontal overflow: ${scrollWidth}`);
      if (failures.length) throw new Error(`${label} at ${width}px page errors: ${failures.join(' | ')}`);
      await page.close();
    }
  }
  const W = 800;
  const H = 1240;
  const labels = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#0e1014"/>
    <text x="15" y="29" fill="white" font-size="20" font-family="Arial">Ares and Iris: 390px mobile — actual browser captures</text>
    <text x="20" y="58" fill="#ccd2dc" font-size="16" font-family="Arial">Before (square card)</text>
    <text x="420" y="58" fill="#ccd2dc" font-size="16" font-family="Arial">After (contained landscape card)</text>
    <text x="20" y="650" fill="#b5bdca" font-size="16" font-family="Arial">Ares (top), Iris (bottom). Art bytes unchanged.</text>
  </svg>`);
  const crops = [];
  for (let i = 0; i < names.length; i++) {
    const name = names[i].toUpperCase();
    for (let j = 0; j < 2; j++) {
      const label = j === 0 ? 'BEFORE' : 'AFTER';
      const png = await readFile(`${outputDir}ISSUE69-${name}-390-${label}.png`);
      crops.push({ input: await sharp(png).resize(380, 535, { fit: 'cover', position: 'top' }).png().toBuffer(), left: j === 0 ? 20 : 420, top: i === 0 ? 75 : 660 });
    }
  }
  await sharp({create:{width:W,height:H,channels:4,background:'#0e1014'}})
    .composite([{input:labels,left:0,top:0},...crops])
    .png({compressionLevel:9})
    .toFile(`${outputDir}ISSUE69-MOBILE-COMPARISON.png`);
  console.log('Captured 8 viewport screenshots plus contact sheet.');
} finally {
  await browser.close();
}
