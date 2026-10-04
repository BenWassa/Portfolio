// Turns the captured live-demo DOM states into phone-screen fragments for the composition:
// - scopes the app's production stylesheet to `.hs` (the phone screen), rewriting viewport units to the
//   captured 393x852 viewport and dropping wider breakpoints
// - downloads Anybody + Figtree (latin) locally so the render has no network dependency
// - removes demo-only chrome (DEMO banner, Planning demo readouts)
// - splits each state into page / bottom nav / fixed overlays and tags the elements the timeline animates
// - re-measures every tagged element on the REBUILT screens (geometry-ui.json), so camera moves and taps
//   are computed from what is actually rendered in the video, not from the live page
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire('/Users/benjaminhaddon/Github Repos/argus-ooda-pilot/node_modules/');
const { chromium } = require('playwright');

const W = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
const COMP = path.resolve(W, '../composition');
const UI_DIR = path.join(COMP, 'assets/ui');
const FONT_DIR = path.join(COMP, 'assets/fonts');
const FRAG_DIR = path.join(W, 'fragments');
const VW = 393;
const VH = 852;
const STATES = ['home0', 'home-alexout', 'home-1h', 'home-out-1h', 'settings', 'matrixview', 'matrixsheet', 'planning', 'task0', 'task1'];

[UI_DIR, FONT_DIR, FRAG_DIR].forEach((d) => fs.mkdirSync(d, { recursive: true }));
const states = Object.fromEntries(STATES.map((n) => [n, JSON.parse(fs.readFileSync(path.join(W, 'states', `${n}.json`), 'utf8'))]));

// ---------- 1. fonts (Google Fonts, latin subset, served locally) ----------
const GF =
  'https://fonts.googleapis.com/css2?family=Anybody:wght@500;600;700&family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap';
const gfCss = await (
  await fetch(GF, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' } })
).text();
const fontFaces = [];
const fileFor = new Map();
for (const block of gfCss.split('/* ').slice(1)) {
  const [subset, rest] = [block.slice(0, block.indexOf(' */')), block.slice(block.indexOf('@font-face'))];
  if (subset.trim() !== 'latin') continue;
  const family = /font-family:\s*'([^']+)'/.exec(rest)[1];
  const style = /font-style:\s*(\w+)/.exec(rest)[1];
  const weight = /font-weight:\s*([\d ]+);/.exec(rest)[1].trim();
  const url = /url\(([^)]+)\)/.exec(rest)[1];
  if (!fileFor.has(url)) {
    const name = `${family.toLowerCase()}-${style}-${weight.replace(/\s+/g, '-')}.woff2`;
    fs.writeFileSync(path.join(FONT_DIR, name), Buffer.from(await (await fetch(url)).arrayBuffer()));
    fileFor.set(url, name);
  }
  fontFaces.push(
    `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};font-display:block;src:url('assets/fonts/${fileFor.get(url)}') format('woff2');}`,
  );
}
console.log(`fonts: ${fileFor.size} files, ${fontFaces.length} faces`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
await page.goto('about:blank');

// ---------- 2. scope the stylesheet ----------
const cssUrl = states.home0.links[0];
const rawCss = (await (await fetch(cssUrl)).text()).replace(/@import\s+url\([^)]*\)\s*;?/g, '');
const scopedCss = await page.evaluate(
  ({ css, vw, vh }) => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    const sheet = style.sheet;
    const units = (text) =>
      text
        .replace(/(-?\d*\.?\d+)(dvh|svh|lvh|vh)\b/g, (_, n) => `${+(parseFloat(n) * vh / 100).toFixed(3)}px`)
        .replace(/(-?\d*\.?\d+)(dvw|svw|lvw|vw)\b/g, (_, n) => `${+(parseFloat(n) * vw / 100).toFixed(3)}px`);
    const splitSel = (sel) => {
      const parts = [];
      let depth = 0;
      let cur = '';
      for (let i = 0; i < sel.length; i++) {
        const c = sel[i];
        if (c === '\\') { cur += c + (sel[i + 1] || ''); i++; continue; }
        if (c === '(' || c === '[') depth++;
        if (c === ')' || c === ']') depth--;
        if (c === ',' && depth === 0) { parts.push(cur); cur = ''; continue; }
        cur += c;
      }
      parts.push(cur);
      return parts;
    };
    // system stacks the renderer can't supply; Anybody/Figtree are shipped locally, emoji falls back natively
    const DROP = /^["']?(apple color emoji|segoe ui emoji|segoe ui symbol|noto color emoji|sfmono-regular|oxygen|ubuntu|cantarell|fira sans|droid sans|source-code-pro|liberation mono|menlo|monaco|consolas|courier new|cambria|times new roman|times|georgia|helvetica neue|arial|noto sans|segoe ui|roboto|blinkmacsystemfont|ui-sans-serif|ui-monospace|ui-serif)["']?$/i;
    const fonts = (text) =>
      text.replace(/font-family:\s*([^;]+);/g, (m, stack) => {
        const kept = stack.split(',').map((f) => f.trim()).filter((f) => f && !DROP.test(f));
        return `font-family: ${kept.join(', ')};`;
      });
    const scopeSel = (sel) =>
      splitSel(sel)
        .map((s) => {
          s = s.trim();
          if (/^(html|:root|:host)(?![\w-])/.test(s)) return s.replace(/^(html|:root|:host)/, '.hs');
          if (/^body(?![\w-])/.test(s)) return s.replace(/^body/, '.hs');
          return `.hs ${s}`;
        })
        .join(', ');
    const px = (n, u) => parseFloat(n) * (u === 'px' ? 1 : 16);
    const evalCond = (c) => {
      c = c.trim().replace(/^\(|\)$/g, '').trim();
      let m;
      if ((m = /^(min-|max-)?(width|height)\s*:\s*([\d.]+)(px|rem|em)$/.exec(c))) {
        const v = px(m[3], m[4]);
        const actual = m[2] === 'width' ? vw : vh;
        return m[1] === 'max-' ? actual <= v : m[1] === 'min-' ? actual >= v : actual === v;
      }
      if ((m = /^(width|height)\s*(>=|<=|>|<)\s*([\d.]+)(px|rem|em)$/.exec(c))) {
        const v = px(m[3], m[4]);
        const a = m[1] === 'width' ? vw : vh;
        return { '>=': a >= v, '<=': a <= v, '>': a > v, '<': a < v }[m[2]];
      }
      if (/^hover\s*:\s*hover$/.test(c) || /^pointer\s*:\s*fine$/.test(c)) return false;
      if (/^prefers-color-scheme\s*:\s*dark$/.test(c)) return false;
      if (/^prefers-color-scheme\s*:\s*light$/.test(c)) return true;
      if (/^prefers-reduced-motion/.test(c)) return false;
      if (/^(screen|all)$/.test(c)) return true;
      if (/^print$/.test(c)) return false;
      return null;
    };
    const evalMedia = (text) => {
      const results = text.split(/\s+and\s+/).map(evalCond);
      if (results.includes(false)) return false;
      if (results.every((x) => x === true)) return true;
      return null;
    };
    const walk = (rules) => {
      let out = '';
      for (const r of rules) {
        if (r instanceof CSSStyleRule) {
          out += `${scopeSel(r.selectorText)}{${fonts(units(r.style.cssText)).replace(/transition[a-z-]*:[^;]+;/g, '')}}`;
        } else if (r instanceof CSSMediaRule) {
          const verdict = evalMedia(r.media.mediaText);
          if (verdict === true) out += walk(r.cssRules);
          else if (verdict === null) out += `@media ${r.media.mediaText}{${walk(r.cssRules)}}`;
        } else if (r instanceof CSSSupportsRule) {
          out += `@supports ${r.conditionText}{${walk(r.cssRules)}}`;
        } else if (r instanceof CSSKeyframesRule || r instanceof CSSFontFaceRule) {
          out += r.cssText;
        } else if (r.cssRules) {
          out += walk(r.cssRules);
        } else {
          out += r.cssText;
        }
      }
      return out;
    };
    const result = walk(sheet.cssRules);
    style.remove();
    return result;
  },
  { css: rawCss, vw: VW, vh: VH },
);
const freeze = '.hs,.hs *,.hs *::before,.hs *::after{transition:none!important;animation:none!important;caret-color:transparent}';
// the phone screen: fixed-size window; the page scrolls inside it (timeline-driven); the app's fixed
// elements (bottom nav, sheet) become absolutely-positioned layers of the screen
const phoneCss = `
.hs.phone{position:relative;width:${VW}px;height:${VH}px;overflow:hidden;min-height:0}
.hs .screen{position:absolute;left:0;top:0;width:${VW}px;height:${VH}px;overflow:hidden}
.hs .page{position:absolute;left:0;top:0;width:${VW}px}
.hs nav.fixed,.hs .fixed{position:absolute!important}
.hs .layer{position:absolute;left:0;top:0;width:${VW}px;height:${VH}px}
`;
fs.writeFileSync(path.join(W, 'font-faces.css'), fontFaces.join('\n'));
const appCss = `/* HAUS production stylesheet (${cssUrl.split('/').pop()}), scoped to .hs for a ${VW}x${VH} screen */\n${scopedCss}\n${phoneCss}\n${freeze}\n`;
fs.writeFileSync(path.join(UI_DIR, 'haus-app.css'), appCss);
console.log(`css: ${rawCss.length} -> ${appCss.length} chars`);

// ---------- 3. clean, split + tag fragments ----------
const fragments = {};
for (const n of STATES) {
  fragments[n] = await page.evaluate(
    ({ body, name }) => {
      const host = document.createElement('div');
      host.innerHTML = body;
      const text = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim();
      const tag = (el, k) => el && el.setAttribute('data-k', k);

      // demo-only chrome (not part of the product): banner, Planning readouts
      host.querySelectorAll('p[role="note"]').forEach((p) => { if (/^DEMO/.test(text(p))) p.remove(); });
      host.querySelectorAll('p').forEach((p) => { if (/Demo mode is seeded/.test(text(p))) p.remove(); });
      host.querySelectorAll('div.grid').forEach((g) => {
        if (g.className.includes('grid-cols-2') && g.children.length === 4 && /open tasks/.test(text(g)) && /in session/.test(text(g))) g.remove();
      });

      // Settings: demo-only reset controls
      [...host.querySelectorAll('div, section')].filter((d) => /Demo data/.test(text(d)) && /Reset demo data/.test(text(d)) && d.querySelector('h2') && !d.querySelector('section')).slice(-1).forEach((d) => d.remove());
      host.querySelectorAll('button').forEach((b) => { if (/^(Reset demo and return home|Restart demo)$/.test(text(b))) b.remove(); });

      const nav = host.querySelector('nav');
      const navHtml = nav ? nav.outerHTML : '';
      if (nav) nav.remove();

      // fixed overlays inside the app (bottom sheet + backdrop)
      const overlayEls = [...host.querySelectorAll('.fixed')].filter((el) => !el.parentElement.closest('.fixed'));
      const overlayHtml = overlayEls.map((el) => {
        el.setAttribute('data-k', 'backdrop');
        const panel = el.querySelector('.haus-sheet-panel');
        if (panel) {
          panel.setAttribute('data-k', 'sheet-panel');
          panel.querySelectorAll('ul > li').forEach((li, i) => li.setAttribute('data-k', `sheet-row-${i}`));
        }
        const h = el.outerHTML;
        el.remove();
        return h;
      });

      const shell = host.querySelector('.app-shell');

      // ---- tags ----
      if (name.startsWith('home')) {
        shell.querySelectorAll('button[title]').forEach((b) => {
          const m = /(Alex|Jordan|Priya|Sam)/.exec(b.title);
          if (m) tag(b, `m-${m[1].toLowerCase()}`);
        });
        shell.querySelectorAll('div').forEach((d) => {
          if (d.children.length === 2 && /^Session$/i.test(text(d.children[0]))) { tag(d, 'stat-session'); tag(d.children[1], 'stat-session-val'); }
          if (d.className.includes('grid-cols-3') && /Open/.test(text(d)) && /Done/.test(text(d))) tag(d, 'stat-row');
        });
        const keys = { 'Most Urgent': 'urgent', 'Best Fit': 'bestfit', 'The Matrix': 'matrix' };
        shell.querySelectorAll('section.surface-card').forEach((s) => {
          const h = s.querySelector('h3');
          const k = h && keys[text(h)];
          if (!k) return;
          tag(s, `panel-${k}`);
          const ul = s.querySelector('ul');
          if (ul) {
            tag(ul, `ul-${k}`);
            [...ul.children].forEach((li, i) => { tag(li, `row-${k}-${i}`); li.setAttribute('data-title', text(li.querySelector('.truncate'))); });
          }
          const btn = [...s.querySelectorAll('button')].find((b) => /Open matrix view/.test(text(b)));
          if (btn) tag(btn, 'btn-matrix');
        });
        const who = [...shell.querySelectorAll('section')].find((s) => /Who's in right now/.test(text(s)));
        if (who) tag(who, 'who');
      }
      if (name === 'settings') {
        const inv = [...shell.querySelectorAll('div')].filter((d) => /Invite code/.test(text(d)) && d.className.includes('rounded-xl')).pop();
        tag(inv, 'invite');
        tag([...shell.querySelectorAll('button')].find((b) => text(b) === 'Copy'), 'copy');
        tag(shell.querySelector('code'), 'code');
        const members = [...shell.querySelectorAll('section')].find((s) => /Members \(4\)/.test(text(s)));
        tag(members, 'members');
        const sess = [...shell.querySelectorAll('section')].find((s) => /This session/.test(text(s)));
        tag(sess, 'session-card');
      }
      if (name === 'matrixview' || name === 'matrixsheet') {
        shell.querySelectorAll('button[aria-label*="importance"]').forEach((b) => {
          const m = /^(\w+) importance, (\w+) urgency/.exec(b.getAttribute('aria-label'));
          if (m) tag(b, `cell-${m[1].toLowerCase()}-${m[2].toLowerCase()}`);
        });
      }
      if (name === 'planning') {
        let i = 0;
        shell.querySelectorAll('section.surface-card').forEach((s) => {
          const h = s.querySelector('header .font-display');
          if (!h) return;
          tag(s, `lane-${i}`);
          s.setAttribute('data-title', text(h));
          i += 1;
        });
        shell.querySelectorAll('li > button').forEach((b) => {
          const t = text(b.querySelector('.truncate, .font-medium'));
          if (/Replace kitchen faucet/.test(t)) tag(b, 'row-faucet');
        });
      }
      if (name === 'task0' || name === 'task1') {
        tag(shell.querySelector('[aria-label="Complete Install new fixture"]'), 'check-install');
        tag(shell.querySelector('[aria-label="Complete Run leak test"]'), 'check-test');
        tag(shell.querySelector('[aria-label="Complete Clear cabinet and lay towels"]'), 'check-prep');
        const leaf = (re) => [...shell.querySelectorAll('*')].find((e) => e.children.length === 0 && re.test(text(e)));
        tag(leaf(/^Waiting on Install$/), 'waiting');
        tag(leaf(/^\d\/3 done$/), 'done-counter');
        tag(leaf(/^Replace kitchen faucet$/), 'task-title');
        ['Prep', 'Install', 'Test'].forEach((p) => {
          const head = leaf(new RegExp(`^${p}$`));
          if (head) tag(head.closest('div[class*="border-t"], section, div') , `phase-${p.toLowerCase()}`);
        });
        const subs = [...shell.querySelectorAll('h2,h3')].find((h) => /Subtasks/.test(text(h)));
        if (subs) tag(subs.closest('section, div[class*="rounded"]'), 'subtasks');
      }

      // cloneable parts (portrait cards, stat cards, task rows) for composite screens
      const parts = {};
      shell.querySelectorAll('[data-k]').forEach((el) => {
        const k = el.getAttribute('data-k');
        if (/^(m-|stat-|row-)/.test(k)) parts[k] = el.outerHTML;
      });

      return { page: shell.outerHTML, nav: navHtml, overlays: overlayHtml, parts };
    },
    { body: states[n].body, name: n },
  );
  fs.writeFileSync(path.join(FRAG_DIR, `${n}.json`), JSON.stringify(fragments[n]));
}
console.log('fragments:', STATES.map((n) => `${n}(${fragments[n].page.length}${fragments[n].overlays.length ? '+ov' : ''})`).join(' '));

// ---------- 4. measure tagged elements on the rebuilt screens ----------
const harness = (n) => `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${path.relative(W, path.join(UI_DIR, 'haus-app.css'))}"><style>${fontFaces.map((f) => f.replace(/assets\/fonts\//g, '../composition/assets/fonts/')).join('\n')}</style></head>
<body style="margin:0;background:#888"><div class="hs phone" id="ph"><div class="screen"><div class="page" id="pg">${fragments[n].page}</div>${fragments[n].nav}${fragments[n].overlays.map((o) => `<div class="layer">${o}</div>`).join('')}</div></div></body></html>`;
const geo = {};
for (const n of STATES) {
  const file = path.join(W, '_harness.html');
  fs.writeFileSync(file, harness(n));
  await page.goto(`file://${file}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  geo[n] = await page.evaluate(() => {
    const pg = document.getElementById('pg').getBoundingClientRect();
    const ph = document.getElementById('ph').getBoundingClientRect();
    const out = { _pageH: +document.getElementById('pg').scrollHeight };
    document.querySelectorAll('[data-k]').forEach((el) => {
      const r = el.getBoundingClientRect();
      const inLayer = !!el.closest('.layer');
      const base = inLayer ? ph : pg;
      const rec = { x: +(r.x - base.x).toFixed(1), y: +(r.y - base.y).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
      if (el.dataset.title) rec.title = el.dataset.title;
      if (inLayer) rec.layer = true;
      out[el.dataset.k] = rec;
    });
    // matrix sheet panel (overlay layer): the white panel + backdrop, found by shape
    const layer = document.querySelector('.layer');
    if (layer) {
      const kids = [...layer.querySelectorAll('div')].filter((d) => { const r = d.getBoundingClientRect(); return r.width > 300 && r.height > 150 && r.y > 200; });
      if (kids.length) { const r = kids[0].getBoundingClientRect(); out._sheet = { x: +(r.x - ph.x).toFixed(1), y: +(r.y - ph.y).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; }
    }
    return out;
  });
  await page.screenshot({ path: path.join(W, 'states', `rebuilt-${n}.png`), clip: { x: 0, y: 0, width: VW, height: VH } });
}
fs.rmSync(path.join(W, '_harness.html'));
fs.writeFileSync(path.join(W, 'geometry-ui.json'), JSON.stringify(geo, null, 1));
console.log('geometry-ui written');
await browser.close();
