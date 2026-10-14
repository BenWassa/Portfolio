// v4 — the app's "Choose a Space" screen, rebuilt from hearth_v2/src/views/components/SpaceSwitcherModal.jsx.
// The demo build has a single space and hides the switcher, so this screen can't be captured live; its markup
// (classes, copy, structure) is transcribed from the component and rendered with the same production
// stylesheet as every other fragment. Only the three space names are stand-ins.
// Writes fragments/spaces0.html (nothing selected: the startup picker) and spaces1.html (Living Room selected),
// measures the tap target into geometry.json, and screenshots both to states/ for a visual check.
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire('/Users/benjaminhaddon/Github Repos/argus-ooda-pilot/node_modules/');
const { chromium } = require('playwright');

const W = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
const COMP = path.resolve(W, '../composition');
const LOGO = 'assets/ui/img-38b9169110.png'; // hearth_vector_up, as used by the app header

const SPACES = ['Living Room', 'Friday Film Club', 'Family Sunday'];
const initials = (name = '') => (name.replace(/[^a-z]/gi, '').slice(0, 2) || '?').toUpperCase();
const svg = (name, cls, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${name} ${cls}">${body}</svg>`;
const CHECK = svg('check', 'w-4 h-4 text-amber-500 shrink-0', '<path d="M20 6 9 17l-5-5"></path>');
const PLUS = svg('plus', 'w-4 h-4', '<path d="M5 12h14"></path><path d="M12 5v14"></path>');

const picker = (currentIdx) => {
  const rows = SPACES.map((name, i) => {
    const isCurrent = i === currentIdx;
    return `<button data-space="${i}" class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-colors text-left ${
      isCurrent
        ? 'bg-amber-900/20 border-amber-700/40 text-amber-200'
        : 'bg-stone-900/60 border-stone-800/60 text-stone-200 hover:bg-stone-800/60 hover:border-stone-700'
    }"><div class="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold uppercase shrink-0 ${
      isCurrent ? 'bg-amber-800/50 text-amber-200' : 'bg-stone-800 text-stone-400'
    }">${initials(name)}</div><span class="flex-1 text-sm font-medium truncate">${name}</span>${isCurrent ? CHECK : ''}</button>`;
  }).join('');
  return `<div data-cap-id="root"><div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-shell pl-[calc(1.5rem+var(--safe-left))] pr-[calc(1.5rem+var(--safe-right))] pt-[max(3rem,var(--safe-top))] pb-[max(3rem,var(--safe-bottom))]"><div class="absolute inset-0 pointer-events-none overflow-hidden"><div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-900/10 blur-[120px] rounded-full"></div></div><div class="relative z-10 w-full max-w-sm flex flex-col items-center gap-8"><div class="flex flex-col items-center gap-3"><img src="${LOGO}" alt="Hearth" class="w-12 h-12 object-contain"><h1 class="text-2xl font-serif tracking-wide text-stone-100">Choose a Space</h1><p class="text-xs text-stone-500 text-center">Select the space you want to open, or create a new one.</p></div><div class="w-full flex flex-col gap-2">${rows}</div><div class="w-full"><button class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700 transition-colors text-sm">${PLUS}Create new space</button></div></div></div></div>`;
};

fs.writeFileSync(path.join(W, 'fragments/spaces0.html'), picker(-1));
fs.writeFileSync(path.join(W, 'fragments/spaces1.html'), picker(0));

// measure + screenshot with the same scoped stylesheet the composition uses
const css = fs.readFileSync(path.join(COMP, 'assets/ui/hearth-app.css'), 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2 });
const geo = JSON.parse(fs.readFileSync(path.join(W, 'geometry.json'), 'utf8'));
for (const [name, idx] of [['spaces0', -1], ['spaces1', 0]]) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><base href="file://${COMP}/"><style>html,body{margin:0;background:#0c0a09}${css}</style></head><body><div class="hs" style="position:relative;width:393px;height:852px;overflow:hidden;contain:layout paint">${picker(idx)}</div></body></html>`;
  fs.writeFileSync(path.join(W, 'states', `${name}-test.html`), html);
  await page.goto(`file://${path.join(W, 'states', `${name}-test.html`)}`);
  await page.waitForTimeout(400);
  if (name === 'spaces0') {
    geo.spaces0 = await page.evaluate(() => {
      const r = (el) => {
        const b = el.getBoundingClientRect();
        return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
      };
      return { room: r(document.querySelector('[data-space="0"]')), club: r(document.querySelector('[data-space="1"]')), family: r(document.querySelector('[data-space="2"]')) };
    });
  }
  await page.screenshot({ path: path.join(W, 'states', `${name}.png`) });
  fs.rmSync(path.join(W, 'states', `${name}-test.html`));
}
fs.writeFileSync(path.join(W, 'geometry.json'), JSON.stringify(geo, null, 1));
console.log('spaces geometry', JSON.stringify(geo.spaces0));
await browser.close();
