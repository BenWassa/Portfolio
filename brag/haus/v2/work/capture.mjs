// HAUS v2: drives the live HAUS demo (public, seeded fake household) through ONE continuous run of the exact
// flow the video shows, so every captured state is the real next state of the one before it:
//   Home -> Alex steps out -> Settings (This session) -> 1h -> Home -> Matrix -> cell sheet -> Planning -> faucet -> Install done
// Records, per state: the rendered DOM + stylesheet links (states/<name>.json) and a QC screenshot.
// Read-only against the demo: nothing is written to the HAUS repo. Demo state resets on each page load.
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire('/Users/benjaminhaddon/Github Repos/argus-ooda-pilot/node_modules/');
const { chromium } = require('playwright');

const W = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
const OUT = path.join(W, 'states');
fs.mkdirSync(OUT, { recursive: true });
const DEMO = 'https://benwassa.github.io/HAUS/';
const VIEW = { width: 393, height: 852 };

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: VIEW,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  colorScheme: 'light',
});
const page = await ctx.newPage();
const geometry = {};

async function fresh() {
  await page.goto(DEMO, { waitUntil: 'networkidle', timeout: 90000 });
  await page.getByText("Who's in right now").waitFor({ timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1800);
}

async function settle(ms = 900) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(ms);
}

async function snap(name) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => {
    document.querySelectorAll('input, textarea').forEach((el) => {
      if (el.tagName === 'TEXTAREA') el.textContent = el.value;
      else el.setAttribute('value', el.value);
    });
  });
  const data = await page.evaluate(() => {
    const clone = document.body.cloneNode(true);
    clone.querySelectorAll('script, noscript').forEach((n) => n.remove());
    return {
      htmlClass: document.documentElement.className,
      bodyClass: document.body.className,
      body: clone.innerHTML,
      links: [...document.querySelectorAll('link[rel=stylesheet]')].map((l) => l.href),
      inlineStyles: [...document.querySelectorAll('style')].map((s) => s.textContent),
      scrollH: document.scrollingElement.scrollHeight,
      text: document.body.innerText.slice(0, 6000),
    };
  });
  fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(data));
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
  console.log('captured', name, `${data.body.length} chars`, `scrollH=${data.scrollH}`);
  return data;
}

// document-space rect of the first element matching `fn` (runs in the page)
async function rect(fn, arg) {
  return page.evaluate(
    ({ src, arg }) => {
      const el = new Function('arg', `return (${src})(arg)`)(arg);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: +r.x.toFixed(1), y: +(r.y + window.scrollY).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
    },
    { src: fn.toString(), arg },
  );
}

// panels (Home) or lanes (Planning): title + rect + each row's text and rect
async function panels(kind) {
  return page.evaluate((kind) => {
    const sy = window.scrollY;
    const box = (el) => {
      const r = el.getBoundingClientRect();
      return { x: +r.x.toFixed(1), y: +(r.y + sy).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
    };
    const out = [];
    document.querySelectorAll('section.surface-card').forEach((s) => {
      const head = kind === 'home' ? s.querySelector('h3') : s.querySelector('header .font-display');
      if (!head) return;
      const rows = [...s.querySelectorAll('li > button')].map((b) => ({
        title: b.querySelector('.truncate')?.innerText ?? b.innerText.split('\n')[0],
        sub: b.querySelectorAll('.truncate')[1]?.innerText ?? '',
        rect: box(b),
      }));
      out.push({ title: head.innerText, rect: box(s), headRect: box(head), rows });
    });
    return out;
  }, kind);
}

const byRole = (name, opts = {}) => page.getByRole('button', { name, exact: true, ...opts });


const log = (...a) => console.log(...a);

// 1. Home baseline: 4h, Alex / Jordan / Sam in, Priya out
await fresh();
await snap('home0');

// 2. WHO'S IN: Alex taps their own portrait and steps out (Home shortcut)
await page.getByRole('button', { name: /Alex/ }).first().click();
await settle(1000);
await snap('home-alexout');

// 3. HOW LONG: the real control lives in Settings > "This session" (Session length chips + Who's in)
await byRole('Settings').click();
await settle(1000);
await snap('settings-out');
await byRole('1h').click();
await page.waitForTimeout(600);
await snap('settings-out-1h');

// 4. back to Home: SESSION 1h, Alex out
await byRole('Home').click();
await settle(1100);
await snap('home-out-1h');

// 5. THE MATRIX, from the state the video is actually in (Alex out, 1h)
await page.getByText('Open matrix view').click();
await settle(1200);
await snap('matrixview');
await page.locator('button[aria-label^="High importance, Urgent urgency"]').click();
await page.waitForTimeout(1200);
await snap('matrixsheet');

// 6. close the sheet, then Planning from the bottom nav (proves the nav is reachable from the Matrix view)
let closed = 'none';
for (const [label, act] of [
  ['close button', async () => { const b = page.getByRole('button', { name: /close/i }).first(); await b.click({ timeout: 2500 }); }],
  ['Escape', async () => { await page.keyboard.press('Escape'); }],
]) {
  try { await act(); await page.waitForTimeout(700); closed = label; if (!(await page.getByText(/\d+ tasks?$/).first().isVisible().catch(() => false))) break; } catch (e) { /* try next */ }
}
log('sheet closed via:', closed);
await byRole('Planning').click();
await settle(1100);
await snap('planning');

// 7. PLANNING -> the faucet handoff
await page.getByText('Replace kitchen faucet').first().click();
await settle(1100);
await snap('task0');
await page.getByRole('button', { name: 'Complete Install new fixture' }).click();
await settle(1300);
await snap('task1');
log('waitingGone:', await page.evaluate(() => !/Waiting on Install/.test(document.body.innerText)));

await browser.close();
