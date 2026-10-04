// v5 captures of the frozen Oct 2 edition (states/frozen.html, served on :8791). Run from work/ with
//   (cd states && python3 -m http.server 8791) &   node capture5.cjs
// Full-page shots at rest (the sticky tab strip sits at its natural offset, so cropping from tabsNatural gives
// "scrolled to the tabs" with the strip at the top) for Front, Toronto, World, Sports, Business and the dark front.
// Weather stays collapsed except in the Weather state. Sports waits for the team marks to load or fail and logs which.
// The one DOM edit: the Blue Jays spring-training line drops its placeholder "3:33 a.m." (see brag-plan.md).
const puppeteer = require('/Users/benjaminhaddon/.npm/_npx/702923228c2ce1e6/node_modules/puppeteer-core');
const fs = require('fs');
const EXE = '/Users/benjaminhaddon/.cache/hyperframes/chrome/chrome-headless-shell/mac_arm-152.0.7977.30/chrome-headless-shell/mac_arm-152.0.7977.30/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const EXE_ALT = '/Users/benjaminhaddon/.cache/hyperframes/chrome/chrome-headless-shell/mac_arm-152.0.7977.30/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const W = 393, H = 802, DIR = 'states', BASE = 'http://127.0.0.1:8791/';
const FIX = '.weather .summary > * { flex-shrink: 0; } .weather .temp, .weather .city { white-space: nowrap; }';
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { viewport: { w: W, h: H }, states: {} };

async function open(browser, file, scheme = 'light') {
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }, { name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(BASE + file, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.addStyleTag({ content: FIX });
  await sleep(500);
  return page;
}
const frame = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const click = async (page, sel) => { await page.evaluate((s) => document.querySelector(s).click(), sel); await sleep(300); await frame(page); };
const tab = (id) => `.tab[data-tab="${id}"]`;

async function settle(page) {
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll('img')];
    imgs.forEach((i) => { i.loading = 'eager'; });
    await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 10000); }))));
  });
  await sleep(1500);
}

async function shoot(page, name) {
  const m = await page.evaluate(() => ({
    docH: document.documentElement.scrollHeight,
    tabsNatural: document.querySelector('.tabs').offsetTop,
    tabsH: document.querySelector('.tabs').offsetHeight,
  }));
  const geo = await page.evaluate(() => {
    const r = (el) => { const b = el.getBoundingClientRect(); return { x: b.x, y: b.y + window.scrollY, w: b.width, h: b.height }; };
    const q = (s) => [...document.querySelectorAll(s)].map(r);
    return { cards: q('.card'), teams: q('.sports-team'), marks: q('[data-sports-mark]'), tabs: q('.tab') };
  });
  await page.evaluate(() => window.scrollTo(0, 0)); await frame(page);
  await page.screenshot({ path: `${DIR}/${name}_full.png`, fullPage: true });
  out.states[name] = { ...m, geo };
  console.log(name, 'docH', m.docH, 'tabsNatural', m.tabsNatural, 'cards', geo.cards.length, 'teams', geo.teams.length);
}

(async () => {
  const exe = fs.existsSync(EXE) ? EXE : EXE_ALT;
  const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ['--hide-scrollbars'] });

  // Front (weather collapsed), whole page
  { const p = await open(browser, 'frozen.html'); await settle(p); await shoot(p, 'front'); await p.close(); }

  // The four section tabs, each in a fresh page so weather is never expanded
  for (const id of ['toronto', 'world', 'sports', 'business']) {
    const p = await open(browser, 'frozen.html');
    await click(p, tab(id)); await settle(p);
    if (id === 'sports') {
      const marks = await p.evaluate(() => [...document.querySelectorAll('[data-sports-mark]')].map((m) => ({ team: m.closest('.sports-team') && m.closest('.sports-team').getAttribute('data-sports-team'), cls: m.className })));
      console.log('sports marks', JSON.stringify(marks));
      const fix = await p.evaluate(() => {
        const lines = [...document.querySelectorAll('.sports-team[data-sports-team="blue-jays"] .sports-status-line')];
        return lines.map((l) => { const before = l.textContent; const walker = document.createTreeWalker(l, NodeFilter.SHOW_TEXT); let n; while ((n = walker.nextNode())) n.nodeValue = n.nodeValue.replace(/ · \d{1,2}:\d{2} [ap]\.m\./, ''); return [before, l.textContent]; });
      });
      console.log('blue jays line', JSON.stringify(fix));
    }
    await shoot(p, id);
    await p.close();
  }

  // Weather week (as v3/v4)
  { const p = await open(browser, 'frozen.html'); await click(p, '#weather');
    await p.evaluate(() => window.scrollTo(0, 0)); await frame(p);
    await p.screenshot({ path: `${DIR}/weather.png`, clip: { x: 0, y: 0, width: W, height: H } }); await p.close(); }

  // Lamplight edition, whole page
  { const p = await open(browser, 'frozen.html', 'dark'); await settle(p); await shoot(p, 'front_dark'); await p.close(); }

  // Voices this week, whole page (v4's clip stopped mid-way through the third piece)
  { const p = await open(browser, 'voices.html'); await settle(p);
    const docH = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.screenshot({ path: `${DIR}/voices_full.png`, fullPage: true }); console.log('voices docH', docH); await p.close(); }

  fs.writeFileSync(`${DIR}/geometry5.json`, JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
