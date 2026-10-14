import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire('/Users/benjaminhaddon/Github Repos/argus-ooda-pilot/node_modules/');
const { chromium } = require('playwright');
const URL = 'https://hearthv2--hearthv2.us-east4.hosted.app/?mode=demo';
const VIEW = { width: 393, height: 852 };
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 3, isMobile: true, hasTouch: true, colorScheme: 'dark' });
const page = await ctx.newPage();
const out = 'states';

async function loadAllImages() {
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll('img')];
    imgs.forEach((img) => { img.loading = 'eager'; });
    // scroll every scroller fully to trigger lazy loads, then reset
    const scrollers = [...document.querySelectorAll('*')].filter((el) => {
      const cs = getComputedStyle(el);
      return (/(auto|scroll)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 4) || (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 4);
    });
    for (const el of scrollers) { el.scrollLeft = el.scrollWidth; el.scrollTop = el.scrollHeight; }
    await new Promise((r) => setTimeout(r, 600));
    for (const el of scrollers) { el.scrollLeft = 0; el.scrollTop = 0; }
    await Promise.all([...document.querySelectorAll('img')].map((img) => (img.complete && img.naturalWidth > 0) ? null : new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 10000); })));
  });
  await page.waitForTimeout(900);
}

async function snap(name, opts = {}) {
  await page.evaluate(() => {
    document.querySelectorAll('input, textarea').forEach((el) => {
      if (el.tagName === 'TEXTAREA') el.textContent = el.value; else el.setAttribute('value', el.value);
    });
  });
  const data = await page.evaluate(() => {
    const clone = document.body.cloneNode(true);
    clone.querySelectorAll('script, noscript').forEach((n) => n.remove());
    return {
      htmlClass: document.documentElement.className,
      htmlStyle: document.documentElement.getAttribute('style'),
      bodyClass: document.body.className,
      bodyStyle: document.body.getAttribute('style'),
      body: clone.innerHTML,
      links: [...document.querySelectorAll('link[rel=stylesheet]')].map((l) => l.href),
      inlineStyles: [...document.querySelectorAll('style')].map((s) => s.textContent),
      imgs: [...new Set([...document.querySelectorAll('img')].map((i) => i.currentSrc || i.src).filter(Boolean))],
      text: document.body.innerText.slice(0, 4000),
    };
  });
  fs.writeFileSync(`${out}/${name}.json`, JSON.stringify(data));
  await page.screenshot({ path: `${out}/${name}.png` });
  console.log('captured', name, data.body.length, 'chars', data.imgs.length, 'imgs');
  return data;
}

await page.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });
await page.getByText('Easy & Comforting', { exact: false }).first().waitFor({ timeout: 30000 });
await page.waitForTimeout(2500);
await loadAllImages();

// geometry of the tonight scroll content
const geo = await page.evaluate(() => {
  const scroller = [...document.querySelectorAll('div')].find((el) => el.className.includes('overflow-y-auto'));
  const sections = [...scroller.querySelectorAll('h2, h3, [class*="tracking"]')].filter((el) => /EASY|LAUGH|QUICK|DEEP|SPECTACLES|CLASSICS|COMING|COLLECTION|WATCHING/i.test(el.innerText || '')).map((el) => ({ text: el.innerText.trim().slice(0, 40), top: el.getBoundingClientRect().top + scroller.scrollTop }));
  return { scrollHeight: scroller.scrollHeight, clientHeight: scroller.clientHeight, sections };
});
fs.writeFileSync(`${out}/tonight-geo.json`, JSON.stringify(geo, null, 1));
console.log(JSON.stringify(geo));
await snap('tonight0');

// hero slide 2
const hero = page.locator('[aria-label^="Open details for"]').first();
await hero.focus();
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(900);
await snap('tonight-hero1');
await page.keyboard.press('ArrowLeft');
await page.waitForTimeout(900);

// Add flow
await page.getByTitle('Add new item').first().click();
await page.waitForTimeout(1200);
await snap('add0');
const search = page.getByPlaceholder('Search movie or show title');
await search.click();
await page.keyboard.type('Paddington', { delay: 120 });
await page.waitForTimeout(4000);
await loadAllImages();
await snap('add1');
// choose the 2014 movie
const result = page.locator('button', { hasText: 'Paddington' }).filter({ hasText: '2014' }).first();
await result.click();
await page.waitForTimeout(3500);
await loadAllImages();
await snap('add2');
await page.locator('button', { hasText: /^\s*Comfort\s*$/i }).first().click();
await page.waitForTimeout(500);
await snap('add3');
await page.locator('button', { hasText: /^\s*Light\s*$/i }).first().click();
await page.waitForTimeout(500);
await snap('add4');
await page.getByRole('button', { name: /Put on Shelf/i }).click();
await page.waitForTimeout(2500);
await loadAllImages();
const geo2 = await page.evaluate(() => {
  const res = [];
  document.querySelectorAll('[aria-label="View details for Paddington"]').forEach((b) => {
    const r = b.getBoundingClientRect();
    let sec = b.closest('section') || b.parentElement;
    let label = '';
    for (let el = b; el && !label; el = el.parentElement) { const h = el.querySelector && el.querySelector('h2, h3'); if (h) label = h.innerText; }
    res.push({ x: r.x, y: r.y, w: r.width, h: r.height, label });
  });
  return res;
});
console.log('PADDINGTON positions', JSON.stringify(geo2));
fs.writeFileSync(`${out}/tonight1-paddington.json`, JSON.stringify(geo2, null, 1));
await snap('tonight1');

// v2: open Paddington from its Tonight rail; the details sheet shows the vibe/energy set on save
const card = page.locator('[aria-label="View details for Paddington"]').first();
await card.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await card.click();
await page.waitForTimeout(2500);
await loadAllImages();
await snap('details');
await browser.close();
