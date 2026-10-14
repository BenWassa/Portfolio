const puppeteer = require('/Users/benjaminhaddon/.npm/_npx/702923228c2ce1e6/node_modules/puppeteer-core');
const fs = require('fs');
const EXE = '/Users/benjaminhaddon/.cache/hyperframes/chrome/chrome-headless-shell/mac_arm-152.0.7977.30/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const W = 393, H = 802, DIR = 'shots2';
const out = { viewport: { w: W, h: H, dpr: 3 }, states: {} };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: EXE, headless: true, args: ['--hide-scrollbars'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://127.0.0.1:8791/frozen.html', { waitUntil: 'networkidle0', timeout: 60000 });
  // App bug workaround (reported to Ben): temp/city spans shrink and wrap "19° / 11°" onto 3 lines at phone width.
  await page.addStyleTag({ content: '.weather .summary > * { flex-shrink: 0; } .weather .temp, .weather .city { white-space: nowrap; }' });
  await sleep(400);

  const frame = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const click = async (sel) => { await page.evaluate((s) => document.querySelector(s).click(), sel); await sleep(200); await frame(); };
  const scrollTo = async (y) => { await page.evaluate((yy) => window.scrollTo(0, yy), y); await frame(); };
  const meta = () => page.evaluate(() => {
    const t = document.querySelector('.tabs');
    return { scrollY: window.scrollY, docH: document.documentElement.scrollHeight, tabsNatural: t.offsetTop, tabsH: t.offsetHeight };
  });
  const geo = (sel) => page.$eval(sel, (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y + window.scrollY, w: r.width, h: r.height }; });
  const eager = async () => {
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('img')];
      imgs.forEach((i) => { i.loading = 'eager'; });
      await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); }))));
    });
    await sleep(300);
  };
  const tab = (id) => `.tab[data-tab="${id}"]`;
  const tabs = { front: tab('front'), toronto: tab('toronto'), world: tab('world'), sports: tab('sports'), business: tab('business'), opinion: tab('opinion') };
  const rec = async (name, extra, targets) => {
    const m = await meta();
    const clipH = Math.min(H + extra, m.docH - m.scrollY);
    const t = {};
    for (const [k, sel] of Object.entries(targets || {})) { try { t[k] = await geo(sel); } catch (e) { t[k] = null; } }
    await page.screenshot({ path: `${DIR}/${name}.png`, clip: { x: 0, y: m.scrollY, width: W, height: clipH }, captureBeyondViewport: true });
    out.states[name] = { ...m, clipY: m.scrollY, clipH, targets: t };
    console.log(name, 'scrollY', m.scrollY, 'docH', m.docH, 'tabs', m.tabsNatural, 'clipH', clipH);
  };

  await scrollTo(0);
  await rec('front', 0, { weather: '#weather .summary', ...tabs });
  await click('#weather'); await scrollTo(0);
  await rec('weather', 0, { ...tabs });
  await click(tab('toronto')); await eager();
  let m = await meta(); await scrollTo(m.tabsNatural);
  await rec('toronto', 0, { ...tabs, lead: '.card.lead .headline' });
  await click('.card.lead .headline'); await eager();
  m = await meta(); await scrollTo(m.tabsNatural);
  await rec('toronto_open', 700, { ...tabs, analysis: '.card.open .analysis', askai: '.card.open .askai', readmore: '.card.open .readmore', img: '.card.open img', sumtext: '.card.open .sumtext' });
  await click('.card.open .askai'); await scrollTo(m.tabsNatural);
  await rec('toronto_ask', 700, { ...tabs, askpanel: '.card.open .ask-panel', claude: '.card.open .ask-panel .ask-opt', askai: '.card.open .askai' });
  // From the scrolled reading position, tap Sports and let the app's own selectTab() decide the scroll.
  await scrollTo(m.tabsNatural + 330);
  await click(tab('sports')); await eager(); await sleep(300);
  await rec('sports', 0, { ...tabs });
  await click(tab('opinion')); await eager();
  await rec('opinion', 600, { ...tabs, following: '#following-title', today: '#today-opinion-title' });

  fs.writeFileSync(`${DIR}/geometry.json`, JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
