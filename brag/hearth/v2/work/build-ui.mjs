// Turns the captured live-demo DOM states into phone-screen fragments for the composition:
// - downloads the app's production stylesheet and scopes it to `.hs` (the phone screen),
//   rewriting viewport units to the captured 393x852 viewport and dropping wider breakpoints
// - downloads every image locally and rewrites src
// - removes demo-only chrome ("Template mode" banner, "Template Demo" space name)
// - tags elements the timeline animates and measures tap targets on the rebuilt screens
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const require = createRequire('/Users/benjaminhaddon/Github Repos/argus-ooda-pilot/node_modules/');
const { chromium } = require('playwright');

const W = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
const COMP = path.resolve(W, '../composition');
const UI_DIR = path.join(COMP, 'assets/ui');
const FRAG_DIR = path.join(W, 'fragments');
const BASE = 'https://hearthv2--hearthv2.us-east4.hosted.app/';
const VW = 393;
const VH = 852;
const STATES = ['tonight0', 'tonight-hero1', 'add0', 'add1', 'add2', 'add3', 'add4', 'tonight1', 'details'];

fs.mkdirSync(UI_DIR, { recursive: true });
fs.mkdirSync(FRAG_DIR, { recursive: true });
const states = Object.fromEntries(
  STATES.map((n) => [n, JSON.parse(fs.readFileSync(path.join(W, 'states', `${n}.json`), 'utf8'))]),
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
await page.goto('about:blank');

// ---------- 1. collect image URLs ----------
const urlSet = new Set();
for (const n of STATES) {
  const found = await page.evaluate(
    ({ body, base }) => {
      const host = document.createElement('div');
      host.innerHTML = body;
      const out = [];
      host.querySelectorAll('img[src]').forEach((img) => out.push(new URL(img.getAttribute('src'), base).href));
      host.querySelectorAll('[style*="url("]').forEach((el) => {
        for (const m of el.getAttribute('style').matchAll(/url\((?:&quot;|"|')?([^"')&]+)(?:&quot;|"|')?\)/g)) {
          out.push(new URL(m[1], base).href);
        }
      });
      return out;
    },
    { body: states[n].body, base: BASE },
  );
  found.forEach((u) => urlSet.add(u));
}

// ---------- 2. download images ----------
const map = {};
const urls = [...urlSet];
async function download(u) {
  const ext = (path.extname(new URL(u).pathname) || '.jpg').toLowerCase();
  const name = `img-${crypto.createHash('sha1').update(u).digest('hex').slice(0, 10)}${ext}`;
  const dest = path.join(UI_DIR, name);
  if (!fs.existsSync(dest)) {
    const res = await fetch(u);
    if (!res.ok) throw new Error(`${res.status} ${u}`);
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  }
  map[u] = `assets/ui/${name}`;
}
for (let i = 0; i < urls.length; i += 8) await Promise.all(urls.slice(i, i + 8).map(download));
console.log(`images: ${urls.length}`);

// ---------- 3. scope the stylesheet ----------
const cssUrl = states.tonight0.links[0];
const rawCss = await (await fetch(cssUrl)).text();
const inlineCss = states.tonight0.inlineStyles.join('\n');
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
    // drop font names the renderer can't supply (emoji / Linux UI faces never used by this UI)
    const DROP = /^["']?(apple color emoji|segoe ui emoji|segoe ui symbol|noto color emoji|sfmono-regular|oxygen|ubuntu|cantarell|fira sans|droid sans|source-code-pro|liberation mono|menlo|monaco|consolas|courier new|cambria|times new roman|times|georgia|helvetica neue|arial|noto sans|segoe ui|roboto|blinkmacsystemfont)["']?$/i;
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
      if (/^prefers-color-scheme\s*:\s*dark$/.test(c)) return true;
      if (/^prefers-color-scheme\s*:\s*light$/.test(c)) return false;
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
          out += `${scopeSel(r.selectorText)}{${fonts(units(r.style.cssText))}}`;
        } else if (r instanceof CSSMediaRule) {
          // Evaluate the query against the captured phone viewport, then unwrap or drop it.
          // (Chrome serialises min-width as range syntax: "(width >= 1024px)".)
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
  { css: `${rawCss}\n${inlineCss}`, vw: VW, vh: VH },
);
const freeze =
  '.hs,.hs *,.hs *::before,.hs *::after{transition:none!important;animation:none!important;caret-color:transparent}';
const appCss = `/* Hearth production stylesheet (${cssUrl.split('/').pop()}), scoped to .hs for a ${VW}x${VH} screen */\n${scopedCss}\n${freeze}\n`;
fs.writeFileSync(path.join(UI_DIR, 'hearth-app.css'), appCss);
console.log(`css: ${rawCss.length} -> ${appCss.length} chars`);

// ---------- 4. clean + tag fragments ----------
const fragments = {};
for (const n of STATES) {
  fragments[n] = await page.evaluate(
    ({ body, map, base, name, heroAlt }) => {
      const host = document.createElement('div');
      host.innerHTML = body;

      // demo-only chrome
      const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
      const hits = [];
      while (walker.nextNode()) hits.push(walker.currentNode);
      for (const t of hits) {
        if (t.nodeValue.includes('Template mode: all changes reset on refresh.')) {
          let el = t.parentElement;
          while (el.parentElement && el.parentElement !== host && el.parentElement.textContent.trim() === el.textContent.trim()) el = el.parentElement;
          el.remove();
        } else if (t.nodeValue.trim() === 'Template Demo') {
          t.nodeValue = t.nodeValue.replace('Template Demo', 'Living Room');
        }
      }
      host.querySelectorAll('[aria-label*="Template Demo"],[title*="Template Demo"]').forEach((el) => {
        ['aria-label', 'title'].forEach((a) => el.hasAttribute(a) && el.setAttribute(a, el.getAttribute(a).replace('Template Demo', 'Living Room')));
      });

      // ids must not collide with the composition
      host.querySelectorAll('[id]').forEach((el) => {
        el.setAttribute('data-cap-id', el.id);
        el.removeAttribute('id');
      });
      host.querySelectorAll('[tabindex],[autofocus],[draggable],[fetchpriority]').forEach((el) => {
        ['tabindex', 'autofocus', 'draggable', 'fetchpriority'].forEach((a) => el.removeAttribute(a));
      });

      // images: local src, eager, loaded state
      host.querySelectorAll('img').forEach((img) => {
        const abs = new URL(img.getAttribute('src') || '', base).href;
        if (map[abs]) img.setAttribute('src', map[abs]);
        ['srcset', 'sizes', 'loading', 'decoding'].forEach((a) => img.removeAttribute(a));
        if (img.classList.contains('opacity-0') && img.classList.contains('transition-opacity')) {
          img.classList.replace('opacity-0', 'opacity-100');
        }
      });
      host.querySelectorAll('div[aria-hidden="true"].animate-pulse').forEach((el) => el.remove());
      host.querySelectorAll('[style]').forEach((el) => {
        let s = el.getAttribute('style');
        s = s.replace(/url\((?:&quot;|"|')?([^"')&]+)(?:&quot;|"|')?\)/g, (m, u) => {
          const abs = new URL(u, base).href;
          return map[abs] ? `url("${map[abs]}")` : m;
        });
        s = s.replace(/(^|;)\s*(transition|will-change)\s*:[^;]*/g, '$1');
        el.setAttribute('style', s);
      });

      const textEl = (root, re) =>
        [...root.querySelectorAll('*')].find((el) => el.children.length === 0 && re.test(el.textContent.trim()));

      // Tonight: hero carousel + scroll wrapper
      if (name === 'tonight0' || name === 'tonight1') {
        const scroller = [...host.querySelectorAll('div')].find((el) => el.classList.contains('overflow-y-auto'));
        if (scroller) {
          const wrap = document.createElement('div');
          wrap.setAttribute('data-scroll-wrap', '');
          [...scroller.children].filter((c) => c.tagName !== 'HEADER').forEach((c) => wrap.appendChild(c));
          scroller.appendChild(wrap);
        }
        const hero = host.querySelector('[aria-label^="Open details for"]');
        if (hero) {
          hero.setAttribute('data-hero', '');
          const slides = [...hero.children].filter((c) => c.classList.contains('inset-0') && c.classList.contains('overflow-hidden'));
          slides.forEach((s, i) => {
            s.setAttribute('data-hero-slide', String(i));
            s.style.removeProperty('transform');
            if (i !== 0) s.style.setProperty('visibility', 'hidden');
          });
          const meta = hero.querySelector('.bottom-7');
          if (meta) meta.setAttribute('data-hero-meta', '0');
          const dots = [...hero.querySelectorAll('div')].find((d) => d.children.length >= 3 && [...d.children].every((c) => c.classList.contains('rounded-full')));
          if (dots) dots.setAttribute('data-hero-dots', '0');
          if (heroAlt && name === 'tonight0') {
            const alt = document.createElement('div');
            alt.innerHTML = heroAlt;
            const altHero = alt.querySelector('[aria-label^="Open details for"]');
            const altMeta = altHero && altHero.querySelector('.bottom-7');
            const altDots = altHero && [...altHero.querySelectorAll('div')].find((d) => d.children.length >= 3 && [...d.children].every((c) => c.classList.contains('rounded-full')));
            const altSlides = altHero ? [...altHero.children].filter((c) => c.classList.contains('inset-0') && c.classList.contains('overflow-hidden')) : [];
            let nextIdx = altSlides.findIndex((sl) => /translateX\(0(px)?\)/.test(sl.getAttribute('style') || ''));
            if (nextIdx <= 0) nextIdx = 1;
            if (slides[nextIdx]) slides[nextIdx].setAttribute('data-hero-next', '');
            if (altMeta && meta) {
              altMeta.setAttribute('data-hero-meta', '1');
              altMeta.querySelectorAll('img').forEach((img) => {
                const abs = new URL(img.getAttribute('src') || '', base).href;
                if (map[abs]) img.setAttribute('src', map[abs]);
                ['srcset', 'sizes', 'loading', 'decoding', 'fetchpriority'].forEach((a) => img.removeAttribute(a));
              });
              meta.after(altMeta);
            }
            if (altDots && dots) {
              altDots.setAttribute('data-hero-dots', '1');
              dots.after(altDots);
            }
          }
        }
        const addBtn = host.querySelector('[title="Add new item"]');
        if (addBtn) addBtn.setAttribute('data-tap', 'add');
        if (name === 'tonight1') {
          const label = textEl(host, /^Collections$/);
          const section = label && label.closest('section, div.shrink-0, div.space-y-1\\.5, div[class*="space-y"]');
          const card = section && section.querySelector('button');
          if (card) card.setAttribute('data-collection-card', '');
          const pad = host.querySelector('[aria-label="View details for Paddington"]');
          if (pad) pad.setAttribute('data-tap', 'paddington');
        }
      }

      // Details sheet: keep only the modal (and its ancestor chain); its "If started now" time
      // is computed from the capture clock, so set it to the story's 9:04 PM + 1h35m
      if (name === 'details') {
        const close = host.querySelector('[aria-label="Close details"]');
        let node = close && close.parentElement;
        while (node && node.parentElement && node !== host) {
          [...node.parentElement.children].forEach((c) => c !== node && c.remove());
          if (node.parentElement === host) break;
          node = node.parentElement;
        }
        const finish = textEl(host, /^\d{1,2}:\d{2} (AM|PM)$/);
        if (finish) finish.textContent = '10:39 PM';
        const sheet = close && close.nextElementSibling;
        if (sheet) sheet.setAttribute('data-sheet', '');
        host.querySelectorAll('span').forEach((el) => {
          if (/^(comfort|light)$/i.test(el.textContent.trim())) el.setAttribute('data-badge', el.textContent.trim().toLowerCase());
        });
      }

      // Add flow
      if (name.startsWith('add')) {
        const input = host.querySelector('input[placeholder="Search movie or show title"]');
        if (input) input.setAttribute('data-search', '');
        const chip = (label) => [...host.querySelectorAll('button')].find((b) => b.textContent.trim().toLowerCase() === label);
        const comfort = chip('comfort');
        const light = chip('light');
        if (comfort) comfort.setAttribute('data-chip', 'comfort');
        if (light) light.setAttribute('data-chip', 'light');
        const put = [...host.querySelectorAll('button')].find((b) => /Put on Shelf/.test(b.textContent));
        if (put) put.setAttribute('data-put', '');
        if (name === 'add1') {
          const rows = [...host.querySelectorAll('button')].filter((b) => /TOP MATCH|Top match/i.test(b.textContent));
          rows.forEach((r, i) => r.setAttribute('data-result-row', String(i)));
          if (rows[0]) rows[0].parentElement.setAttribute('data-results', '');
        }
      }
      return host.innerHTML;
    },
    { body: states[n].body, map, base: BASE, name: n, heroAlt: n === 'tonight0' ? states['tonight-hero1'].body : null },
  );
}

// add-typing: add1 with the input swapped for a div of per-character spans (seekable typing)
await page.setContent(`<!doctype html><html><head><style>${appCss}</style></head><body style="margin:0"><div class="hs" style="position:relative;width:${VW}px;height:${VH}px;overflow:hidden;contain:layout paint">${fragments.add1}</div></body></html>`);
await page.waitForTimeout(300);
const typing = await page.evaluate(() => {
  const input = document.querySelector('[data-search]');
  input.focus();
  const cs = getComputedStyle(input);
  const keep = ['border-color', 'border-width', 'border-style', 'box-shadow', 'background-color', 'outline', 'color', 'font', 'letter-spacing', 'padding', 'border-radius', 'height', 'width', 'line-height'];
  const styleText = keep.map((k) => `${k}:${cs.getPropertyValue(k)}`).join(';');
  const div = document.createElement('div');
  div.className = input.className;
  div.setAttribute('data-search', '');
  div.setAttribute('style', `${styleText};display:flex;align-items:center;white-space:pre;overflow:hidden`);
  const value = input.getAttribute('value') || 'Paddington';
  div.innerHTML = `${[...value].map((c, i) => `<span data-ch="${i}">${c}</span>`).join('')}<span data-caret style="display:inline-block;width:2px;height:1.15em;margin-left:1px;background:#f59e0b;border-radius:1px"></span>`;
  input.replaceWith(div);
  return document.querySelector('.hs').innerHTML;
});
fragments['add-typing'] = typing;

// ---------- 5. measure tap targets + fidelity screenshots ----------
const geometry = {};
const measure = {
  tonight0: { add: '[data-tap="add"]', hero: '[data-hero]', labels: null },
  'add-typing': { search: '[data-search]', row0: '[data-result-row="0"]', results: '[data-results]' },
  add0: { search: '[data-search]' },
  add2: { comfort: '[data-chip="comfort"]', selected: '[data-put]' },
  add3: { light: '[data-chip="light"]' },
  add4: { put: '[data-put]', light: '[data-chip="light"]', comfort: '[data-chip="comfort"]' },
  tonight1: { collection: '[data-collection-card]', hero: '[data-hero]', paddington: '[data-tap="paddington"]' },
  details: { sheet: '[data-sheet]', badge: '[data-badge="comfort"]', badgeLight: '[data-badge="light"]' },
};
for (const n of [...STATES.filter((s) => s !== 'add1' && s !== 'tonight-hero1'), 'add-typing']) {
  const testFile = path.join(COMP, `.fidelity-${n}.html`);
  fs.writeFileSync(testFile, `<!doctype html><html><head><link rel="stylesheet" href="assets/ui/hearth-app.css"></head><body style="margin:0;background:#000"><div class="hs" style="position:relative;width:${VW}px;height:${VH}px;overflow:hidden;contain:layout paint">${fragments[n]}</div></body></html>`);
  await page.goto(`file://${testFile}`);
  await page.waitForLoadState('load');
  fs.unlinkSync(testFile);
  await page.evaluate(async () => {
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
  });
  await page.waitForTimeout(200);
  geometry[n] = await page.evaluate((sels) => {
    const out = {};
    for (const [k, sel] of Object.entries(sels || {})) {
      if (!sel) continue;
      const el = document.querySelector(sel);
      if (!el) { out[k] = null; continue; }
      const r = el.getBoundingClientRect();
      out[k] = { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
    }
    const wrap = document.querySelector('[data-scroll-wrap]');
    if (wrap) {
      out.scrollHeight = wrap.getBoundingClientRect().height;
      out.railLabels = [...wrap.querySelectorAll('*')]
        .filter((el) => el.children.length === 0 && /^(Easy & Comforting|Need a Laugh|Quick Bites|Deep Dives|Spectacles|The Classics|Collections|Currently Watching|Coming Soon)$/i.test(el.textContent.trim()))
        .map((el) => ({ text: el.textContent.trim(), y: +el.getBoundingClientRect().y.toFixed(1) }));
    }
    return out;
  }, measure[n]);
  await page.screenshot({ path: path.join(FRAG_DIR, `${n}.png`) });
}
fs.writeFileSync(path.join(W, 'geometry.json'), JSON.stringify(geometry, null, 1));
for (const [n, html] of Object.entries(fragments)) fs.writeFileSync(path.join(FRAG_DIR, `${n}.html`), html);
console.log(JSON.stringify(geometry, null, 1));
await browser.close();
