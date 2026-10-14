// Drives the live HAUS demo (public, seeded fake household) through every state the video needs and
// records, per state: the rendered DOM + stylesheet links (states/<name>.json), a QC screenshot, and
// document-space geometry for tap targets / panels / rows (geometry.json).
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

// ======================= A. Home baseline, Alex out, Settings, 1h =======================
await fresh();
await snap('home0');
geometry.home0 = {
  alexCard: await rect(() => [...document.querySelectorAll('button')].find((b) => /Alex/.test(b.innerText) && b.title)),
  members: await page.evaluate(() => {
    const sy = window.scrollY;
    return [...document.querySelectorAll('button[title]')]
      .filter((b) => /(Alex|Jordan|Priya|Sam)/.test(b.title))
      .map((b) => {
        const r = b.getBoundingClientRect();
        return { name: b.title, rect: { x: +r.x.toFixed(1), y: +(r.y + sy).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) } };
      });
  }),
  statSession: await rect(() => [...document.querySelectorAll('div')].find((d) => d.children.length === 2 && /^Session$/i.test(d.children[0].textContent.trim()))),
  statRow: await rect(() => [...document.querySelectorAll('div')].find((d) => d.className.includes('grid-cols-3') && /Open/i.test(d.textContent))),
  portraitsSection: await rect(() => [...document.querySelectorAll('section')].find((s) => /Who's in right now/.test(s.textContent))),
  openMatrixBtn: await rect(() => [...document.querySelectorAll('button')].find((b) => /Open matrix view/.test(b.innerText))),
  panels: await panels('home'),
};

// Alex steps out
await page.getByRole('button', { name: /Alex/ }).first().click();
await settle(1000);
await snap('home-alexout');
geometry['home-alexout'] = { panels: await panels('home') };
// back in (restores baseline for the next steps)
await page.getByRole('button', { name: /Alex/ }).first().click();
await settle(700);

// Settings baseline (4h) for the invite card, then switch session to 1h
await byRole('Settings').click();
await settle(1000);
await snap('settings');
geometry.settings = {
  inviteCard: await rect(() => [...document.querySelectorAll('div')].filter((d) => /Invite code/.test(d.textContent) && d.className.includes('rounded-xl')).pop()),
  copyBtn: await rect(() => [...document.querySelectorAll('button')].find((b) => b.innerText.trim() === 'Copy')),
  code: await rect(() => document.querySelector('code')),
  sessionChips: await rect(() => [...document.querySelectorAll('div')].find((d) => /Session length/.test(d.textContent) && d.children.length === 2 && d.className.includes('mb-2'))?.nextElementSibling),
};
await byRole('1h').click();
await page.waitForTimeout(500);
await byRole('Home').click();
await settle(1000);
await snap('home-1h');
geometry['home-1h'] = {
  statSession: await rect(() => [...document.querySelectorAll('div')].find((d) => d.children.length === 2 && /^Session$/i.test(d.children[0].textContent.trim()))),
  openMatrixBtn: await rect(() => [...document.querySelectorAll('button')].find((b) => /Open matrix view/.test(b.innerText))),
  panels: await panels('home'),
};

// ======================= B. Matrix view + cell sheet (from the 1h Home) =======================
await page.getByText('Open matrix view').click();
await settle(1200);
await snap('matrixview');
geometry.matrixview = {
  cells: await page.evaluate(() => {
    const sy = window.scrollY;
    return [...document.querySelectorAll('button[aria-label*="importance"]')].map((b) => {
      const r = b.getBoundingClientRect();
      return { label: b.getAttribute('aria-label'), rect: { x: +r.x.toFixed(1), y: +(r.y + sy).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) } };
    });
  }),
  grid: await rect(() => document.querySelector('button[aria-label*="importance"]')?.closest('.min-w-0')),
};
await page.locator('button[aria-label^="High importance, Urgent urgency"]').click();
await page.waitForTimeout(1200);
await snap('matrixsheet');
geometry.matrixsheet = await page.evaluate(() => {
  const el = [...document.querySelectorAll('*')].find((e) => /HIGH IMPORTANCE/i.test(e.textContent) && e.children.length > 0 && getComputedStyle(e).position === 'fixed');
  const sheetRows = [...document.querySelectorAll('button')].filter((b) => b.closest('[role="dialog"]') || (el && el.contains(b)));
  const r = (x) => { const b = x.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
  return { sheet: el ? r(el) : null, rows: sheetRows.map((b) => ({ text: b.innerText.split('\n')[0], rect: r(b) })) };
});

// ======================= C. Planning (By person) + faucet handoff =======================
await fresh();
await byRole('Planning').click();
await settle(1100);
await snap('planning');
geometry.planning = { lanes: await panels('planning') };

await page.getByText('Replace kitchen faucet').first().click();
await settle(1100);
await snap('task0');
geometry.task0 = {
  completeInstall: await rect(() => document.querySelector('[aria-label="Complete Install new fixture"]')),
  completeTest: await rect(() => document.querySelector('[aria-label="Complete Run leak test"]')),
  waiting: await rect(() => [...document.querySelectorAll('*')].find((e) => e.children.length === 0 && e.textContent.trim() === 'Waiting on Install')),
  subtasksCard: await rect(() => [...document.querySelectorAll('h2, h3')].find((h) => /Subtasks/.test(h.textContent))?.closest('section, div.rounded-\\[1\\.5rem\\], div')),
  phaseHeads: await page.evaluate(() => {
    const sy = window.scrollY;
    return ['Prep', 'Install', 'Test'].map((n) => {
      const el = [...document.querySelectorAll('*')].find((e) => e.children.length === 0 && e.textContent.trim() === n);
      if (!el) return { name: n, rect: null };
      const r = el.getBoundingClientRect();
      return { name: n, rect: { x: +r.x.toFixed(1), y: +(r.y + sy).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) } };
    });
  }),
  doneCounter: await rect(() => [...document.querySelectorAll('*')].find((e) => e.children.length === 0 && /^\d\/3 done$/.test(e.textContent.trim()))),
};
await page.getByRole('button', { name: 'Complete Install new fixture' }).click();
await settle(1300);
await snap('task1');
geometry.task1 = {
  doneCounter: await rect(() => [...document.querySelectorAll('*')].find((e) => e.children.length === 0 && /^\d\/3 done$/.test(e.textContent.trim()))),
  waitingGone: await page.evaluate(() => !/Waiting on Install/.test(document.body.innerText)),
};

// ======================= D. Alex out AND 1h (continuation of the S3 beats) =======================
await fresh();
await page.getByRole('button', { name: /Alex/ }).first().click();
await page.waitForTimeout(600);
await byRole('Settings').click();
await settle(900);
await byRole('1h').click();
await page.waitForTimeout(500);
await byRole('Home').click();
await settle(1000);
await snap('home-out-1h');
geometry['home-out-1h'] = {
  statSession: await rect(() => [...document.querySelectorAll('div')].find((d) => d.children.length === 2 && /^Session$/i.test(d.children[0].textContent.trim()))),
  panels: await panels('home'),
};

fs.writeFileSync(path.join(W, 'geometry.json'), JSON.stringify(geometry, null, 1));
console.log('geometry written');
await browser.close();
