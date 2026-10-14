// Re-capture Opinion at the section top (what selectTab() intends), merged into shots3/geometry.json.
const puppeteer = require('/Users/benjaminhaddon/.npm/_npx/702923228c2ce1e6/node_modules/puppeteer-core');
const fs = require('fs');
const EXE = '/Users/benjaminhaddon/.cache/hyperframes/chrome/chrome-headless-shell/mac_arm-152.0.7977.30/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const W = 393, H = 802;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const g = JSON.parse(fs.readFileSync('shots3/geometry.json', 'utf8'));
  const browser = await puppeteer.launch({ executablePath: EXE, headless: true, args: ['--hide-scrollbars'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://127.0.0.1:8791/frozen.html', { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: '.weather .summary > * { flex-shrink: 0; } .weather .temp, .weather .city { white-space: nowrap; }' });
  const frame = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const click = async (s) => { await page.evaluate((x) => document.querySelector(x).click(), s); await sleep(220); await frame(); };
  await click('#weather');
  console.log("scroll-behavior:", await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior));
  await page.evaluate(() => window.scrollTo(0, 0)); await frame();
  await click('.tab[data-tab="opinion"]'); await sleep(600); await frame();
  console.log("after tap scrollY", await page.evaluate(() => window.scrollY));
  const geo = (sel) => page.$eval(sel, (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y + window.scrollY, w: r.width, h: r.height }; });
  const m = await page.evaluate(() => ({ scrollY: window.scrollY, docH: document.documentElement.scrollHeight, tabsNatural: document.querySelector('.tabs').offsetTop, tabsH: document.querySelector('.tabs').offsetHeight }));
  const clipH = Math.min(H + 600, m.docH - m.scrollY);
  const t = {};
  for (const id of ['front', 'toronto', 'world', 'sports', 'business', 'opinion']) t[id] = await geo(`.tab[data-tab="${id}"]`);
  t.following = await geo('.following-block'); t.followingTitle = await geo('#following-title'); t.today = await geo('#today-opinion-title');
  t.followCards = await page.$$eval('.following-block .card', (els) => els.map((el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y + window.scrollY, w: r.width, h: r.height }; }));
  console.log("pre-shot scrollY", await page.evaluate(() => window.scrollY));
  // Full-page capture at rest (sticky tab strip sits at its natural offset), cropped below with ffmpeg.
  await page.evaluate(() => window.scrollTo(0, 0)); await frame();
  await page.screenshot({ path: 'shots3/opinion_full.png', fullPage: true });
  console.log("post-shot scrollY", await page.evaluate(() => window.scrollY));
  g.states.opinion = { ...m, clipY: m.scrollY, clipH, targets: t };
  fs.writeFileSync('shots3/geometry.json', JSON.stringify(g, null, 2));
  console.log('opinion scrollY', m.scrollY, 'clipH', clipH);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
