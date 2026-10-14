const puppeteer = require('/Users/benjaminhaddon/.npm/_npx/702923228c2ce1e6/node_modules/puppeteer-core');
const fs = require('fs');
const EXE = '/Users/benjaminhaddon/.cache/hyperframes/chrome/chrome-headless-shell/mac_arm-152.0.7977.30/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const W = 393, H = 802, DIR = 'shots3', BASE = 'http://127.0.0.1:8791/';
const FIX = '.weather .summary > * { flex-shrink: 0; } .weather .temp, .weather .city { white-space: nowrap; }';
const out = { viewport: { w: W, h: H }, states: {} };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function openPage(browser, url, { dpr = 3, scheme = 'light', fix = true } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: dpr, isMobile: true, hasTouch: true });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }, { name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(BASE + url, { waitUntil: 'networkidle0', timeout: 60000 });
  if (fix) await page.addStyleTag({ content: FIX });
  await sleep(400);
  return page;
}
function helpers(page) {
  const frame = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const click = async (sel) => { await page.evaluate((s) => document.querySelector(s).click(), sel); await sleep(220); await frame(); };
  const scrollTo = async (y) => { await page.evaluate((yy) => window.scrollTo(0, yy), y); await frame(); };
  const meta = () => page.evaluate(() => {
    const t = document.querySelector('.tabs');
    return { scrollY: window.scrollY, docH: document.documentElement.scrollHeight, tabsNatural: t ? t.offsetTop : null, tabsH: t ? t.offsetHeight : null };
  });
  const geo = (sel) => page.$eval(sel, (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y + window.scrollY, w: r.width, h: r.height }; });
  const geoAll = (sel) => page.$$eval(sel, (els) => els.map((el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y + window.scrollY, w: r.width, h: r.height }; }));
  const eager = async () => {
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('img')];
      imgs.forEach((i) => { i.loading = 'eager'; });
      await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); }))));
    });
    await sleep(300);
  };
  const rec = async (name, extra, targets, multi) => {
    const m = await meta();
    const clipH = Math.min(H + extra, m.docH - m.scrollY);
    const t = {};
    for (const [k, sel] of Object.entries(targets || {})) { try { t[k] = await geo(sel); } catch (e) { t[k] = null; } }
    for (const [k, sel] of Object.entries(multi || {})) { try { t[k] = await geoAll(sel); } catch (e) { t[k] = null; } }
    await page.screenshot({ path: `${DIR}/${name}.png`, clip: { x: 0, y: m.scrollY, width: W, height: clipH }, captureBeyondViewport: true });
    out.states[name] = { ...m, clipY: m.scrollY, clipH, targets: t };
    console.log(name, 'scrollY', m.scrollY, 'docH', m.docH, 'tabs', m.tabsNatural, 'clipH', clipH);
  };
  return { frame, click, scrollTo, meta, geo, eager, rec };
}
const tab = (id) => `.tab[data-tab="${id}"]`;
const tabs = { front: tab('front'), toronto: tab('toronto'), world: tab('world'), sports: tab('sports'), business: tab('business'), opinion: tab('opinion') };

(async () => {
  const browser = await puppeteer.launch({ executablePath: EXE, headless: true, args: ['--hide-scrollbars'] });

  // Front page at 6x for the masthead macro
  {
    const page = await openPage(browser, 'frozen.html', { dpr: 6 });
    const h = helpers(page);
    await h.rec('front6', 0, { title: '.masthead .title', masthead: '.masthead', weather: '#weather .summary', ...tabs, lead: '.card.lead .headline' });
    await page.close();
  }
  // The tour at 3x
  {
    const page = await openPage(browser, 'frozen.html', { dpr: 3 });
    const h = helpers(page);
    await h.click('#weather'); await h.scrollTo(0);
    await h.rec('weather', 0, { weatherBlock: '#weather', ...tabs, lead: '.card.lead .headline' });
    for (const id of ['toronto', 'world', 'sports', 'business']) {
      await h.click(tab(id)); await h.eager();
      const m = await h.meta();
      // the app scrolls the tab strip to the top; keep exactly what it did
      await h.rec(id, 0, { ...tabs, lead: '.card.lead .headline', sportsHead: '.stories' });
    }
    let m = await h.meta();
    await h.scrollTo(m.tabsNatural);
    await h.click('.card.lead .headline'); await h.eager();
    await h.scrollTo(m.tabsNatural);
    await h.rec('business_open', 800, { ...tabs, img: '.card.open img', sumtext: '.card.open .sumtext', analysis: '.card.open .analysis', actions: '.card.open .actions', askai: '.card.open .askai', headline: '.card.open .headline' });
    await h.click('.card.open .askai'); await h.scrollTo(m.tabsNatural);
    await h.rec('business_ask', 800, { ...tabs, analysis: '.card.open .analysis', actions: '.card.open .actions', askpanel: '.card.open .ask-panel', askai: '.card.open .askai' });
    await h.scrollTo(m.tabsNatural + 420);
    await h.click(tab('opinion')); await h.eager();
    m = await h.meta();
    await h.rec('opinion', 600, { ...tabs, following: '.following-block', followingTitle: '#following-title', today: '#today-opinion-title' }, { followCards: '.following-block .card' });
    await page.close();
  }
  // Lamplight edition (dark mode)
  {
    const page = await openPage(browser, 'frozen.html', { dpr: 3, scheme: 'dark' });
    const h = helpers(page);
    await h.rec('front_dark', 0, { ...tabs });
    await page.close();
  }
  // Voices this week
  {
    const page = await openPage(browser, 'voices.html', { dpr: 3, fix: false });
    const h = helpers(page);
    await h.rec('voices', 700, { summary: '.summary', sectionTitle: '.section-title', eyebrow: '.eyebrow', dek: '.dek', brand: '.brand' }, { pieces: '.piece' });
    await page.close();
  }
  fs.writeFileSync(`${DIR}/geometry.json`, JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
