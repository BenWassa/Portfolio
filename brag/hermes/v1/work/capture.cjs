const puppeteer = require('/Users/benjaminhaddon/.npm/_npx/702923228c2ce1e6/node_modules/puppeteer-core');
const fs = require('fs');
const EXE = '/Users/benjaminhaddon/.cache/hyperframes/chrome/chrome-headless-shell/mac_arm-152.0.7977.30/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const W = 393, H = 800;
const out = { viewport: { w: W, h: H, dpr: 3 }, states: {} };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: EXE, headless: true, args: ['--hide-scrollbars'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://127.0.0.1:8791/frozen.html', { waitUntil: 'networkidle0', timeout: 60000 });
  await sleep(500);

  const geo = (sel) => page.$eval(sel, (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y + window.scrollY, w: r.width, h: r.height }; });
  const meta = () => page.evaluate(() => {
    const t = document.querySelector('.tabs').getBoundingClientRect();
    return { scrollY: window.scrollY, docH: document.documentElement.scrollHeight, tabsTop: t.top + window.scrollY, tabsH: t.height };
  });
  const eagerImages = async () => {
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('img')];
      imgs.forEach((i) => { i.loading = 'eager'; });
      await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); }))));
    });
  };
  // clip from y0 (doc coords) for height hh
  const shot = async (name, y0, hh) => {
    await page.screenshot({ path: `shots/${name}.png`, clip: { x: 0, y: y0, width: W, height: hh }, captureBeyondViewport: true });
  };
  const rec = async (name, y0, hh, targets) => {
    const m = await meta();
    const t = {};
    for (const [k, sel] of Object.entries(targets || {})) { try { t[k] = await geo(sel); } catch (e) { t[k] = null; } }
    await shot(name, y0, hh);
    out.states[name] = { ...m, clipY: y0, clipH: hh, targets: t };
    console.log(name, JSON.stringify(out.states[name]));
  };
  const tab = (id) => `.tab[data-tab="${id}"]`;
  const allTabs = { toronto: tab('toronto'), world: tab('world'), sports: tab('sports'), business: tab('business'), opinion: tab('opinion'), front: tab('front') };

  // 1. front page, top
  await rec('front', 0, H, { weather: '#weather .summary', ...allTabs });
  // 2. weather open
  await page.click('#weather'); await sleep(200);
  await rec('weather', 0, H, { ...allTabs });
  // 3. section tabs (selectTab scrolls the tab strip to the top)
  for (const id of ['toronto', 'world', 'sports', 'business', 'opinion']) {
    await page.click(tab(id)); await sleep(250); await eagerImages();
    const m = await meta();
    await rec(id, m.scrollY, H, { ...allTabs, lead: '.card.lead .headline', firstCard: '.card .headline' });
  }
  // 4. open + ask, for Toronto and Business leads (taller clip so we can scroll)
  for (const id of ['toronto', 'business']) {
    await page.click(tab(id)); await sleep(250);
    const m0 = await meta();
    await page.click('.card.lead .headline'); await sleep(250); await eagerImages(); await sleep(300);
    const extra = 700;
    await rec(`${id}_open`, m0.scrollY, H + extra, { ...allTabs, analysis: '.card.open .analysis', askai: '.card.open .askai', readmore: '.card.open .readmore', img: '.card.open img', sumtext: '.card.open .sumtext' });
    await page.click('.card.open .askai'); await sleep(250);
    await rec(`${id}_ask`, m0.scrollY, H + extra, { ...allTabs, askpanel: '.card.open .ask-panel', claude: '.card.open .ask-panel a.ask-opt', note: '.card.open .ask-note' });
  }
  // 5. opinion, tall for a slow scroll through Following
  await page.click(tab('opinion')); await sleep(250); await eagerImages();
  const mo = await meta();
  await rec('opinion_tall', mo.scrollY, H + 900, { ...allTabs, followingTitle: '#following-title', todayTitle: '#today-opinion-title' });
  // 6. sports tall
  await page.click(tab('sports')); await sleep(400); await eagerImages(); await sleep(400);
  const ms = await meta();
  await rec('sports_tall', ms.scrollY, Math.min(H + 900, ms.docH - ms.scrollY), {});

  fs.writeFileSync('shots/geometry.json', JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
