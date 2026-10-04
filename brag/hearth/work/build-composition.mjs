// Assembles composition/index.html from the rebuilt Hearth UI fragments (build-ui.mjs),
// their measured geometry, and the per-frame music energy (extract-audio-data.py).
import fs from 'fs';
import path from 'path';

const W = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
const COMP = path.resolve(W, '../composition');
const frag = (n) => fs.readFileSync(path.join(W, 'fragments', `${n}.html`), 'utf8');
const geo = JSON.parse(fs.readFileSync(path.join(W, 'geometry.json'), 'utf8'));
const audio = JSON.parse(fs.readFileSync(path.join(W, 'audio-data.json'), 'utf8'));

const DURATION = 22.6;
const FPS = 30;

// ---------- real app icons (lucide, as rendered by the app) ----------
const icon = (html, name) => {
  const m = html.match(new RegExp(`<svg[^>]*lucide-${name}[^>]*>[\\s\\S]*?</svg>`));
  if (!m) throw new Error(`icon ${name} missing`);
  return m[0]
    .replace(/class="[^"]*"/, 'class="ic" aria-hidden="true"')
    .replace(/\swidth="\d+"/, '')
    .replace(/\sheight="\d+"/, '');
};
const t0 = frag('tonight0');
const a4 = frag('add4');
const IC = {
  moon: icon(t0, 'moon'),
  plus: icon(t0, 'plus'),
  coffee: icon(t0, 'coffee'),
  smile: icon(t0, 'smile'),
  clock: icon(t0, 'clock'),
  zap: icon(t0, 'zap'),
  feather: icon(a4, 'feather'),
};

// ---------- poster wall (the demo shelf's own posters) ----------
const posters = [...new Set([...t0.matchAll(/<img src="([^"]+)" alt="[^"]+ poster"/g)].map((m) => m[1]))];
const row = (offset) => {
  const list = [];
  for (let i = 0; i < 16; i++) list.push(posters[(i * 3 + offset) % posters.length]);
  return list.map((src) => `<img src="${src}" alt="" />`).join('');
};
const paddingtonPoster = (frag('add2').match(/<img src="([^"]+)"/) || [])[1];

// ---------- music energy -> glow (fast attack, slow release) ----------
const raw = audio.frames.map((f) => 0.6 * f.rms + 0.4 * (f.bands[0] + f.bands[1]) / 2);
let prev = 0;
const smooth = raw.map((v) => (prev = Math.max(v, prev * 0.9)));
const peak = Math.max(...smooth) || 1;
const ENERGY = smooth.map((v) => +(v / peak).toFixed(3));

// ---------- phone geometry ----------
const S = 1.15; // UI px -> canvas px
const BEZEL = 11;
const PHONE = { left: 1158, top: 39, w: Math.round(393 * S) + BEZEL * 2, h: Math.round(852 * S) + BEZEL * 2 };
const center = { x: PHONE.left + PHONE.w / 2, y: PHONE.top + PHONE.h / 2 };
const uiToCanvas = (ux, uy) => ({ x: PHONE.left + BEZEL + ux * S, y: PHONE.top + BEZEL + uy * S });
// camera push-in on the Vibe/Energy chips: keep their centre at the phone's centre
const ZOOM = 1.3;
const chipFocus = uiToCanvas(200, 445);
const CAM = {
  x: +(-(ZOOM * (chipFocus.x - center.x)) + (center.x - center.x)).toFixed(1),
  y: +(-(ZOOM * (chipFocus.y - center.y)) + (center.y - center.y)).toFixed(1),
};
const mid = (r) => ({ x: +(r.x + r.w / 2).toFixed(1), y: +(r.y + r.h / 2).toFixed(1) });
const TAP = {
  add: mid(geo.tonight0.add),
  search: mid(geo['add-typing'].search),
  row0: mid(geo['add-typing'].row0),
  comfort: mid(geo.add2.comfort),
  light: mid(geo.add3.light),
  put: mid(geo.add4.put),
  hero: mid(geo.tonight0.hero),
};
const HERO_W = geo.tonight0.hero.w;

// ---------- embers (seeded) ----------
function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20261003);
const EMBERS = [];
for (let i = 0; i < 16; i++) {
  const cycles = [];
  let t = +(rand() * 4).toFixed(2);
  const dur = 6.5 + rand() * 3.5;
  while (t + dur < DURATION + dur * 0.6) {
    cycles.push({
      t: +t.toFixed(2),
      dur: +dur.toFixed(2),
      x0: Math.round(140 + rand() * 1640),
      sway: Math.round(18 + rand() * 40) * (rand() > 0.5 ? 1 : -1),
      yEnd: Math.round(180 + rand() * 420),
      a: +(0.35 + rand() * 0.45).toFixed(2),
      s: +(0.7 + rand() * 0.9).toFixed(2),
    });
    t += dur + rand() * 1.5;
  }
  EMBERS.push(cycles);
}

// ---------- typing cadence (seeded) ----------
const TYPE_START = 12.8;
const typeTimes = [];
{
  let t = TYPE_START;
  for (let i = 0; i < 10; i++) {
    typeTimes.push(+t.toFixed(3));
    t += 0.05 + rand() * 0.03;
  }
}
const keyFiles = ['003', '011', '007', '021', '014', '028', '005', '025', '018', '030'];

// ---------- audio clips ----------
const SFX = [
  ['sfx-bubble-1', 'interface/drop_001.ogg', 0.3, 0.11, 0.5],
  ['sfx-bubble-2', 'interface/drop_002.ogg', 1.3, 0.2, 0.5],
  ['sfx-bubble-3', 'interface/drop_001.ogg', 2.05, 0.11, 0.45],
  ['sfx-dots', 'interface/drop_003.ogg', 2.62, 0.2, 0.28],
  ['sfx-logo', 'impact/impactSoft_medium_001.ogg', 3.7, 0.19, 0.62], // beat-locked: 3.74s
  ['sfx-phone', 'casino/card-slide-1.ogg', 6.98, 0.61, 0.26],
  ['sfx-swipe', 'casino/card-slide-1.ogg', 7.72, 0.61, 0.18],
  ['sfx-tap-add', 'interface/click_003.ogg', 12.02, 0.05, 0.5],
  ['sfx-tap-search', 'interface/click_002.ogg', 12.64, 0.05, 0.38],
  ...typeTimes.map((t, i) => [`sfx-key-${i}`, `keyboard/keypress-${keyFiles[i]}.wav`, t, 0.25, 0.2]),
  ['sfx-results', 'interface/drop_002.ogg', 13.52, 0.2, 0.34], // beat-locked: 13.56s
  ['sfx-tap-row', 'interface/click_005.ogg', 14.05, 0.05, 0.45],
  ['sfx-tap-comfort', 'ui/click2.ogg', 14.62, 0.06, 0.45],
  ['sfx-tap-light', 'ui/click2.ogg', 15.18, 0.06, 0.45],
  ['sfx-tap-put', 'interface/click_003.ogg', 15.84, 0.05, 0.5],
  ['sfx-shelf', 'impact/impactWood_light_002.ogg', 15.96, 0.27, 0.55],
  ['sfx-collection', 'interface/drop_003.ogg', 16.42, 0.2, 0.28],
  ['sfx-outro-1', 'interface/drop_002.ogg', 17.22, 0.2, 0.5], // beat-locked: 17.37s (-0.15)
  ['sfx-outro-2', 'interface/drop_001.ogg', 17.72, 0.11, 0.5], // beat-locked: 17.93s (-0.15)
  ['sfx-end', 'interface/bong_001.ogg', 19.56, 0.13, 0.5], // beat-locked: 19.56s
];
const audioHtml = [
  `<audio id="music-bed" src="assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3" data-start="0" data-duration="${DURATION}" data-media-start="5" data-track-index="10" data-automation='${JSON.stringify({ version: 1, lanes: [{ target: 'volume', points: [{ t: 0, v: 0 }, { t: 0.5, v: 0.34 }, { t: 21.0, v: 0.34 }, { t: DURATION, v: 0 }] }] })}'></audio>`,
  ...SFX.map(([id, file, start, dur, vol], i) => `<audio id="${id}" src="assets/sfx/${file}" data-start="${start}" data-duration="${dur}" data-track-index="${11 + i}" data-volume="${vol}"></audio>`),
].join('\n      ');

const lockup = (id) => `
        <div class="halo" data-layout-ignore></div>
        <div class="lockup-inner">
          <img class="logo" src="assets/ui/hearth-logo.png" alt="Hearth logo" />
          <div class="wordmark">${[...'Hearth'].map((c) => `<span>${c}</span>`).join('')}</div>
          <div class="gather">${[...'Gather Around'].map((c) => `<span>${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</div>
          <div class="desc">A calm, shared watchlist for couples.</div>
        </div>`;

const html = `<!doctype html>
<html lang="en" data-resolution="landscape">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Hearth — Gather Around</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <!-- Hearth's own production stylesheet, scoped to .hs (the phone screen) by work/build-ui.mjs -->
    <link rel="stylesheet" href="assets/ui/hearth-app.css" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #0c0a09; }
      #root {
        position: relative; width: 100%; height: 100%; overflow: hidden; background: #0c0a09;
        font-family: -apple-system, system-ui, sans-serif; color: #f5f5f4;
        -webkit-font-smoothing: antialiased;
      }
      .scene { position: absolute; inset: 0; }

      /* ---------- background: warm shell, ember glow, shelf, embers ---------- */
      #bg { position: absolute; inset: 0; overflow: hidden; background: #0c0a09; }
      .bg-warm { position: absolute; inset: 0; background: radial-gradient(120% 75% at 50% -12%, rgba(66, 40, 20, 0.8) 0%, rgba(66, 40, 20, 0.28) 45%, rgba(12, 10, 9, 0) 76%); }
      .ember { position: absolute; left: 260px; top: 140px; width: 1400px; height: 1400px; border-radius: 50%;
        background: radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.42) 0%, rgba(180, 83, 9, 0.2) 32%, rgba(120, 53, 15, 0.08) 52%, rgba(12, 10, 9, 0) 70%); }
      .ember-pulse { position: absolute; left: 22%; top: 22%; width: 56%; height: 56%; border-radius: 50%;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.34) 0%, rgba(217, 119, 6, 0.12) 45%, rgba(12, 10, 9, 0) 70%); }
      .poster-wall { position: absolute; left: 0; right: 0; top: -60px; bottom: -60px; display: flex; flex-direction: column; justify-content: center; gap: 30px; opacity: 0;
        filter: blur(2.5px) saturate(0.7) brightness(0.6);
        -webkit-mask-image: radial-gradient(ellipse 72% 62% at 50% 50%, #000 25%, rgba(0, 0, 0, 0) 88%); }
      .pw-row { display: flex; gap: 26px; width: max-content; }
      .pw-row img { width: 156px; height: 234px; object-fit: cover; border-radius: 12px; display: block; }
      .vignette { position: absolute; inset: 0; background: radial-gradient(ellipse 85% 80% at 50% 50%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.55) 100%); }
      .grain { position: absolute; inset: 0; opacity: 0.07; mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
      .embers span { position: absolute; left: 0; top: 0; width: 6px; height: 6px; border-radius: 50%; opacity: 0;
        background: radial-gradient(circle, #fde68a 0%, #f59e0b 45%, rgba(217, 119, 6, 0) 72%); }

      /* ---------- chat ---------- */
      .chat { position: absolute; top: 0; bottom: 0; left: 380px; right: 380px; display: flex; flex-direction: column; justify-content: center; gap: 26px; }
      .chat-stamp { align-self: center; margin-bottom: 12px; font: 600 22px/1 -apple-system, system-ui, sans-serif; letter-spacing: 0.2em; text-transform: uppercase; color: #a8a29e; }
      .bubble { display: flex; align-items: center; gap: 22px; max-width: 1000px; padding: 28px 46px 30px; border-radius: 52px; font: 500 62px/1.15 -apple-system, system-ui, sans-serif; letter-spacing: -0.012em; }
      .bubble.them { align-self: flex-start; background: #292524; color: #f5f5f4; border-bottom-left-radius: 12px; transform-origin: 0% 100%; }
      .bubble.us { align-self: flex-end; background: #d97706; color: #1c1917; border-bottom-right-radius: 12px; transform-origin: 100% 100%; }
      .bubble .thumb { width: 64px; height: 96px; border-radius: 9px; object-fit: cover; display: block; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35); }
      .dots { gap: 15px; padding: 40px 46px; }
      .dots i { display: block; width: 19px; height: 19px; border-radius: 50%; background: #1c1917; }

      /* ---------- Hearth lockup (onboarding brand treatment at video scale) ---------- */
      .lockup { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
      .halo { position: absolute; left: 560px; top: 20px; width: 800px; height: 800px; border-radius: 50%;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.36) 0%, rgba(217, 119, 6, 0.12) 40%, rgba(12, 10, 9, 0) 68%); }
      .lockup-inner { position: relative; display: flex; flex-direction: column; align-items: center; }
      .logo { width: 236px; height: 236px; display: block; filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.5)); }
      .wordmark { display: flex; margin-top: 22px; font: 900 150px/0.92 ui-serif, serif; letter-spacing: -0.035em; text-transform: uppercase; color: #fafaf9; }
      .wordmark span { display: inline-block; }
      .gather span { display: inline-block; }
      .gather { display: flex; margin-top: 28px; padding-left: 0.42em; font: 600 26px/1 -apple-system, system-ui, sans-serif; letter-spacing: 0.42em; text-transform: uppercase; color: #f59e0b; }
      .desc { margin-top: 44px; font: 400 44px/1.2 ui-serif, serif; color: #d6d3d1; }

      /* ---------- captions beside the phone ---------- */
      .caption { position: absolute; top: 0; bottom: 0; left: 270px; width: 840px; display: flex; flex-direction: column; justify-content: center; }
      .cap-label { display: flex; align-items: center; gap: 16px; font: 650 24px/1 -apple-system, system-ui, sans-serif; letter-spacing: 0.34em; text-transform: uppercase; color: #f59e0b; }
      .cap-label .rule { display: block; width: 56px; height: 3px; border-radius: 2px; background: #f59e0b; transform-origin: 0 50%; }
      .cap-label .txt { display: flex; align-items: center; gap: 14px; }
      .cap-label .ic { width: 28px; height: 28px; }
      .cap-head { margin-top: 30px; max-width: 860px; font: 500 96px/1.04 ui-serif, serif; letter-spacing: -0.025em; color: #f5f5f4; }
      .cap-head .ln { display: block; }
      .rails { margin-top: 56px; display: flex; flex-direction: column; gap: 22px; }
      .rail { display: flex; align-items: center; gap: 18px; font: 650 30px/1 -apple-system, system-ui, sans-serif; letter-spacing: 0.22em; text-transform: uppercase; color: #d6d3d1; }
      .rail .ic { width: 34px; height: 34px; color: #f59e0b; }
      .chips { margin-top: 56px; display: flex; gap: 22px; }
      .chip { display: flex; align-items: center; gap: 14px; padding: 18px 30px; border-radius: 999px; border: 2px solid rgba(245, 158, 11, 0.45); background: rgba(245, 158, 11, 0.15);
        font: 650 30px/1 -apple-system, system-ui, sans-serif; letter-spacing: 0.12em; text-transform: uppercase; color: #fde68a; }
      .chip .ic { width: 32px; height: 32px; }

      /* ---------- phone ---------- */
      .phone-cam { position: absolute; left: ${PHONE.left}px; top: ${PHONE.top}px; width: ${PHONE.w}px; height: ${PHONE.h}px; transform-origin: 50% 50%; }
      .phone { position: absolute; inset: 0; border-radius: 68px; background: linear-gradient(150deg, #3b3632 0%, #1c1917 38%, #0f0d0c 100%);
        box-shadow: inset 0 0 0 2px rgba(120, 113, 108, 0.35), 0 70px 120px rgba(0, 0, 0, 0.6), 0 24px 48px rgba(0, 0, 0, 0.45), 0 0 180px rgba(217, 119, 6, 0.16); }
      .phone-screen { position: absolute; left: ${BEZEL}px; top: ${BEZEL}px; width: ${PHONE.w - BEZEL * 2}px; height: ${PHONE.h - BEZEL * 2}px; border-radius: 57px; overflow: hidden; background: #0c0a09; }
      .ui-scale { position: absolute; left: 0; top: 0; width: 393px; height: 852px; transform: scale(${S}); transform-origin: 0 0; }
      .hs { position: absolute; left: 0; top: 0; width: 393px; height: 852px; overflow: hidden; contain: layout paint; opacity: 0; }
      #ui-tonight0 { opacity: 1; }
      #ui-tonight0 [data-hero-meta="1"], #ui-tonight0 [data-hero-dots="1"] { opacity: 0; }
      #ui-typing [data-ch], #ui-typing [data-result-row], #ui-typing [title="Clear search"] { opacity: 0; }
      .glare { position: absolute; inset: 0; border-radius: 57px; background: linear-gradient(115deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 30%); }
      .touch { position: absolute; left: -24px; top: -24px; width: 48px; height: 48px; border-radius: 50%; opacity: 0;
        background: rgba(255, 255, 255, 0.26); box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.55), 0 4px 18px rgba(0, 0, 0, 0.35); }
      .touch-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(253, 230, 138, 0.85); opacity: 0; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DURATION}" data-width="1920" data-height="1080" data-fps="${FPS}">
      <div id="bg" data-layout-ignore>
        <div class="bg-warm"></div>
        <div id="ember" class="ember"><div id="ember-pulse" class="ember-pulse"></div></div>
        <div id="poster-wall" class="poster-wall">
          <div class="pw-row" id="pw-0">${row(0)}</div>
          <div class="pw-row" id="pw-1">${row(5)}</div>
          <div class="pw-row" id="pw-2">${row(11)}</div>
        </div>
        <div class="vignette"></div>
        <div class="grain"></div>
        <div id="embers" class="embers">${EMBERS.map((_, i) => `<span id="em-${i}"></span>`).join('')}</div>
      </div>

      <!-- 1 · The standoff -->
      <section id="s-chat" class="clip scene" data-start="0" data-duration="3.75" data-track-index="1">
        <div class="chat">
          <div id="chat-stamp" class="chat-stamp">Tonight · 9:47 PM</div>
          <div id="b1" class="bubble them">what do you want to watch?</div>
          <div id="b2" class="bubble us">idk. you pick.</div>
          <div id="b3" class="bubble them">you pick.</div>
          <div id="b4" class="bubble us dots" aria-label="typing"><i></i><i></i><i></i></div>
        </div>
      </section>

      <!-- 2 · Gather around -->
      <section id="s-brand" class="clip scene lockup" data-start="3.25" data-duration="3.95" data-track-index="2">${lockup('brand')}
      </section>

      <!-- 3 + 4 · Tonight / Save for Us (real Hearth UI, rebuilt from the live demo) -->
      <section id="s-phone" class="clip scene" data-start="6.9" data-duration="10.6" data-track-index="3">
        <div id="cap-tonight" class="caption">
          <div class="cap-inner">
            <div class="cap-label"><span class="rule"></span><span class="txt">${IC.moon}Tonight</span></div>
            <div class="cap-head"><span class="ln">Your shelf,</span><span class="ln">sorted by mood.</span></div>
            <div class="rails">
              <div class="rail">${IC.coffee}Easy &amp; Comforting</div>
              <div class="rail">${IC.smile}Need a Laugh</div>
              <div class="rail">${IC.clock}Quick Bites</div>
              <div class="rail">${IC.zap}Deep Dives</div>
            </div>
          </div>
        </div>
        <div id="cap-save" class="caption">
          <div class="cap-inner">
            <div class="cap-label"><span class="rule"></span><span class="txt">${IC.plus}Save for Us</span></div>
            <div class="cap-head"><span class="ln">Tag the vibe.</span><span class="ln">Set the energy.</span></div>
            <div class="chips">
              <div id="chip-comfort" class="chip">${IC.coffee}Comfort</div>
              <div id="chip-light" class="chip">${IC.feather}Light</div>
            </div>
          </div>
        </div>
        <div id="phone-cam" class="phone-cam" data-layout-ignore>
          <div class="phone">
            <div class="phone-screen">
              <div class="ui-scale">
                <div id="ui-tonight0" class="hs">${t0}</div>
                <div id="ui-add0" class="hs">${frag('add0')}</div>
                <div id="ui-typing" class="hs">${frag('add-typing')}</div>
                <div id="ui-add2" class="hs">${frag('add2')}</div>
                <div id="ui-add3" class="hs">${frag('add3')}</div>
                <div id="ui-add4" class="hs">${a4}</div>
                <div id="ui-tonight1" class="hs">${frag('tonight1')}</div>
                <div id="touch" class="touch"><div class="touch-ring"></div></div>
              </div>
              <div class="glare"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5 · Asked and answered -->
      <section id="s-outro" class="clip scene" data-start="16.9" data-duration="2.95" data-track-index="4">
        <div class="chat" id="outro-chat">
          <div id="o1" class="bubble them">what do you want to watch?</div>
          <div id="o2" class="bubble us"><img class="thumb" src="${paddingtonPoster}" alt="Paddington poster" />Paddington. It's on our shelf.</div>
        </div>
      </section>
      <section id="s-end" class="clip scene lockup" data-start="19.35" data-duration="${+(DURATION - 19.35).toFixed(2)}" data-track-index="5">${lockup('end')}
      </section>

      ${audioHtml}
    </div>
    <script>
      const ENERGY = ${JSON.stringify(ENERGY)};
      const EMBERS = ${JSON.stringify(EMBERS)};
      const TAP = ${JSON.stringify(TAP)};
      const CAM = ${JSON.stringify(CAM)};
      const TYPE = ${JSON.stringify(typeTimes)};
      const HERO_W = ${HERO_W};
      const $ = (s) => document.querySelector(s);
      const $$ = (s) => [...document.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });

      // ---------- background ----------
      tl.set('#ember', { x: 0, y: 300, scale: 0.78, opacity: 0.5 }, 0);
      tl.to('#ember', { y: 40, scale: 1.05, opacity: 1, duration: 1.0, ease: 'power2.out' }, 3.3);
      tl.to('#ember', { x: 430, y: 60, scale: 0.9, opacity: 0.8, duration: 1.1, ease: 'power2.inOut' }, 6.85);
      tl.to('#ember', { x: 0, y: 220, scale: 0.85, opacity: 0.6, duration: 0.9, ease: 'power2.inOut' }, 16.95);
      tl.to('#ember', { y: 40, scale: 1.08, opacity: 1, duration: 1.1, ease: 'power2.out' }, 19.35);
      // audio-reactive: music energy breathes the ember core (pre-extracted, one keyframe per frame)
      tl.to('#ember-pulse', { keyframes: ENERGY.map((v) => ({ opacity: 0.2 + 0.8 * v, scale: 0.94 + 0.12 * v, duration: 1 / 30, ease: 'none' })) }, 0);
      // the shelf behind the standoff: endless posters drifting
      tl.fromTo('#pw-0', { x: -120 }, { x: -620, duration: ${DURATION}, ease: 'none' }, 0);
      tl.fromTo('#pw-1', { x: -760 }, { x: -260, duration: ${DURATION}, ease: 'none' }, 0);
      tl.fromTo('#pw-2', { x: -300 }, { x: -800, duration: ${DURATION}, ease: 'none' }, 0);
      tl.to('#poster-wall', { opacity: 0.24, duration: 0.9, ease: 'power1.out' }, 0.05);
      tl.to('#poster-wall', { opacity: 0, duration: 0.6, ease: 'power1.in' }, 3.2);
      tl.to('#poster-wall', { opacity: 0.2, duration: 0.7, ease: 'power1.out' }, 17.0);
      tl.to('#poster-wall', { opacity: 0, duration: 0.6, ease: 'power1.in' }, 19.3);
      EMBERS.forEach((cycles, i) => {
        const el = '#em-' + i;
        cycles.forEach((c) => {
          tl.set(el, { x: c.x0, y: 1100, scale: c.s, opacity: 0 }, c.t);
          tl.to(el, {
            keyframes: [
              { x: c.x0 + c.sway, y: 1100 - (1100 - c.yEnd) * 0.3, opacity: c.a, duration: c.dur * 0.3, ease: 'sine.inOut' },
              { x: c.x0 - c.sway * 0.6, y: 1100 - (1100 - c.yEnd) * 0.75, opacity: c.a * 0.8, duration: c.dur * 0.45, ease: 'sine.inOut' },
              { x: c.x0 + c.sway * 0.3, y: c.yEnd, opacity: 0, duration: c.dur * 0.25, ease: 'sine.inOut' },
            ],
          }, c.t);
        });
      });

      // ---------- 1 · the standoff ----------
      const pop = (sel, t) => tl.fromTo(sel, { opacity: 0, scale: 0.62, y: 26 }, { opacity: 1, scale: 1, y: 0, duration: 0.46, ease: 'back.out(1.7)' }, t);
      tl.fromTo('#chat-stamp', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.12);
      pop('#b1', 0.3);
      pop('#b2', 1.3);
      pop('#b3', 2.05);
      pop('#b4', 2.62);
      $$('#b4 i').forEach((d, i) => tl.fromTo(d, { opacity: 0.35, y: 0 }, { opacity: 1, y: -7, duration: 0.2, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 2.78 + i * 0.12));
      tl.to(['#b1', '#b3'], { x: -90, opacity: 0, filter: 'blur(6px)', duration: 0.3, ease: 'power2.in' }, 3.1);
      tl.to(['#b2', '#b4'], { x: 90, opacity: 0, filter: 'blur(6px)', duration: 0.3, ease: 'power2.in' }, 3.1);
      tl.to('#chat-stamp', { opacity: 0, duration: 0.25, ease: 'power1.in' }, 3.1);

      // ---------- 2 · gather around ----------
      tl.fromTo('#s-brand .halo', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 3.3);
      // beat-locked: 3.74s — the logo lands on the music's first lift
      tl.fromTo('#s-brand .logo', { opacity: 0, y: 46, scale: 0.86 }, { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'expo.out' }, 3.36);
      tl.fromTo('#s-brand .wordmark span', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.045 }, 3.9);
      // beat-locked: 4.29s — "Gather Around" tracks open on the strong cue
      tl.fromTo('#s-brand .gather span', { opacity: 0, x: (i) => (6 - i) * 11 }, { opacity: 1, x: 0, duration: 0.75, ease: 'expo.out', stagger: 0.012 }, 4.22);
      tl.fromTo('#s-brand .desc', { opacity: 0, y: 18, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, 4.7);
      tl.to('#s-brand .lockup-inner', { opacity: 0, y: -36, scale: 0.97, duration: 0.42, ease: 'power2.in' }, 6.8);
      tl.to('#s-brand .halo', { opacity: 0, duration: 0.5, ease: 'power1.in' }, 6.8);

      // ---------- 3 · tonight ----------
      tl.fromTo('#phone-cam', { x: 760, rotationY: -24, scale: 0.92, opacity: 0, transformPerspective: 1600 }, { x: 0, rotationY: 0, scale: 1, opacity: 1, duration: 0.95, ease: 'power3.out' }, 6.95);
      tl.fromTo('.phone', { y: 0 }, { y: -6, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 7.9);
      tl.fromTo('#cap-tonight .rule', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'expo.out' }, 7.3);
      tl.fromTo('#cap-tonight .cap-label .txt', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }, 7.38);
      tl.fromTo('#cap-tonight .ln', { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out', stagger: 0.12 }, 7.42);
      tl.set('#cap-tonight .rail', { opacity: 0 }, 0);

      // hero swipe (the carousel's own slides, offset by its measured width)
      const slides = $$('#ui-tonight0 [data-hero-slide]');
      const nextSlide = $('#ui-tonight0 [data-hero-next]');
      tl.set(slides, { x: (i) => (i === 0 ? 0 : HERO_W) }, 0);
      tl.set(nextSlide, { visibility: 'visible' }, 7.6);
      tl.set('#touch', { x: TAP.hero.x + 118, y: TAP.hero.y }, 7.5);
      tl.fromTo('#touch', { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.16, ease: 'power2.out' }, 7.5);
      tl.to('#touch', { x: TAP.hero.x - 100, duration: 0.34, ease: 'power2.inOut' }, 7.62);
      // beat-locked: 8.11s — the next title settles on the strong cue
      tl.to(slides[0], { x: -HERO_W, duration: 0.39, ease: 'power3.out' }, 7.72);
      tl.to(nextSlide, { x: 0, duration: 0.39, ease: 'power3.out' }, 7.72);
      tl.to(['#ui-tonight0 [data-hero-meta="0"]', '#ui-tonight0 [data-hero-dots="0"]'], { opacity: 0, duration: 0.14, ease: 'power1.in' }, 7.74);
      tl.to(['#ui-tonight0 [data-hero-meta="1"]', '#ui-tonight0 [data-hero-dots="1"]'], { opacity: 1, duration: 0.24, ease: 'power1.out' }, 7.9);
      tl.to('#touch', { opacity: 0, scale: 0.85, duration: 0.18, ease: 'power1.in' }, 7.98);

      // flick-scroll through the mood rails
      tl.set('#touch', { x: 214, y: 650 }, 8.7);
      tl.to('#touch', { opacity: 1, scale: 1, duration: 0.1, ease: 'power1.out' }, 8.7);
      tl.to('#touch', { y: 330, duration: 0.36, ease: 'power2.in' }, 8.78);
      tl.to('#touch', { opacity: 0, duration: 0.16, ease: 'power1.in' }, 9.08);
      tl.to('#ui-tonight0 [data-scroll-wrap]', { y: -640, duration: 2.1, ease: 'power3.out' }, 8.84);
      // beat-grid: rail names at 9.20s, 9.73s, 10.29s, 10.84s (every beat, accumulating so each holds ≥1s)
      [9.2, 9.73, 10.29, 10.84].forEach((t, i) => {
        tl.fromTo($$('#cap-tonight .rail')[i], { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.42, ease: 'back.out(1.4)', immediateRender: false }, t);
      });
      tl.to('#cap-tonight .cap-inner', { opacity: 0, y: -24, duration: 0.32, ease: 'power2.in' }, 11.92);

      // ---------- 4 · save for us ----------
      const ripple = (t) => tl.fromTo('.touch-ring', { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 2.3, duration: 0.42, ease: 'power2.out', immediateRender: false }, t);
      const press = (p, t) => {
        tl.set('#touch', { x: p.x, y: p.y, scale: 1.25 }, t - 0.1);
        tl.to('#touch', { opacity: 1, scale: 1, duration: 0.1, ease: 'power2.out' }, t - 0.1);
        ripple(t);
        tl.to('#touch', { opacity: 0, duration: 0.14, ease: 'power1.in' }, t + 0.12);
      };
      press(TAP.add, 12.02);
      tl.to('#ui-tonight0 [data-tap="add"]', { scale: 0.95, duration: 0.08, ease: 'power2.out' }, 12.02);
      tl.to('#ui-tonight0 [data-tap="add"]', { scale: 1, duration: 0.18, ease: 'power2.out' }, 12.1);
      tl.set('#ui-add0', { opacity: 1, y: 852 }, 12.12);
      // beat-locked: 12.47s — the Save for Us sheet settles on the strong cue (app: slide-in-from-bottom, 300ms)
      tl.to('#ui-add0', { y: 0, duration: 0.32, ease: 'power3.out' }, 12.15);
      tl.set('#ui-tonight0', { opacity: 0 }, 12.5);
      tl.fromTo('#cap-save .rule', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'expo.out' }, 12.28);
      tl.fromTo('#cap-save .cap-label .txt', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }, 12.34);
      tl.fromTo('#cap-save .ln', { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out', stagger: 0.12 }, 12.38);
      tl.set(['#chip-comfort', '#chip-light'], { opacity: 0 }, 0);

      // search: tap, focus, type "Paddington"
      press(TAP.search, 12.64);
      tl.set('#ui-typing', { opacity: 1 }, 12.68);
      tl.set('#ui-add0', { opacity: 0 }, 12.7);
      const chars = $$('#ui-typing [data-ch]');
      const caret = $('#ui-typing [data-caret]');
      // caret offsets: measured once at setup, never at tween time
      const ends = chars.map((c) => c.offsetLeft + c.offsetWidth);
      const full = ends[ends.length - 1];
      const startX = chars[0].offsetLeft - full;
      tl.set(caret, { x: startX }, 0);
      [12.7, 13.42, 13.74, 14.0].forEach((t, i) => tl.set(caret, { opacity: i % 2 === 0 ? 1 : 0 }, t));
      tl.set(caret, { opacity: 0 }, 12.62);
      tl.set('#ui-typing [title="Clear search"]', { opacity: 1 }, TYPE[0]);
      chars.forEach((c, i) => {
        tl.set(c, { opacity: 1 }, TYPE[i]);
        tl.set(caret, { x: ends[i] - full }, TYPE[i]);
      });
      // beat-locked: 13.56s — TMDB results drop in on the strong cue
      tl.fromTo('#ui-typing [data-result-row]', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', stagger: 0.07 }, 13.5);

      // pick Paddington (2014)
      press(TAP.row0, 14.05);
      tl.to('#ui-typing [data-result-row="0"]', { backgroundColor: 'rgba(245, 158, 11, 0.12)', duration: 0.1, ease: 'power1.out' }, 14.05);
      tl.to('#ui-add2', { opacity: 1, duration: 0.14, ease: 'power1.out' }, 14.14);
      tl.set('#ui-typing', { opacity: 0 }, 14.3);
      // camera pushes in on Vibe / Energy
      tl.to('#phone-cam', { scale: ${ZOOM}, x: CAM.x, y: CAM.y, duration: 0.5, ease: 'power2.inOut' }, 14.2);

      press(TAP.comfort, 14.62);
      tl.to('#ui-add2 [data-chip="comfort"]', { scale: 0.94, duration: 0.07, ease: 'power2.out' }, 14.6);
      // beat-locked: 14.66s — Comfort locks in on the strong cue
      tl.to('#ui-add3', { opacity: 1, duration: 0.1, ease: 'power1.out' }, 14.66);
      tl.set('#ui-add2', { opacity: 0 }, 14.8);
      tl.fromTo('#chip-comfort', { opacity: 0, scale: 0.6, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, 14.66);

      press(TAP.light, 15.18);
      tl.to('#ui-add3 [data-chip="light"]', { scale: 0.94, duration: 0.07, ease: 'power2.out' }, 15.16);
      // beat-grid: 15.19s
      tl.to('#ui-add4', { opacity: 1, duration: 0.1, ease: 'power1.out' }, 15.22);
      tl.set('#ui-add3', { opacity: 0 }, 15.36);
      tl.fromTo('#chip-light', { opacity: 0, scale: 0.6, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, 15.22);
      tl.to('#phone-cam', { scale: 1, x: 0, y: 0, duration: 0.45, ease: 'power2.inOut' }, 15.38);

      // Put on Shelf (the app's own active:scale-95, driven through its Tailwind vars)
      press(TAP.put, 15.84);
      tl.to('#ui-add4 [data-put]', { '--tw-scale-x': 0.95, '--tw-scale-y': 0.95, duration: 0.08, ease: 'power2.out' }, 15.84);
      tl.to('#ui-add4 [data-put]', { '--tw-scale-x': 1, '--tw-scale-y': 1, duration: 0.2, ease: 'power2.out' }, 15.94);
      // back on Tonight (app: fade-in, 500ms) — Paddington is on the shelf, in Collections
      tl.set('#ui-add4', { opacity: 0 }, 16.02);
      tl.to('#ui-tonight1', { opacity: 1, duration: 0.45, ease: 'power1.out' }, 16.02);
      tl.fromTo('#ui-tonight1 [data-collection-card]', { boxShadow: '0 0 0 0px rgba(245, 158, 11, 0)' }, { boxShadow: '0 0 0 3px rgba(245, 158, 11, 0.95), 0 0 34px 4px rgba(245, 158, 11, 0.45)', duration: 0.42, ease: 'power2.out' }, 16.42);
      tl.to('#cap-save .cap-inner', { opacity: 0, y: -24, duration: 0.32, ease: 'power2.in' }, 16.9);
      tl.to('#phone-cam', { x: 700, rotationY: 20, opacity: 0, duration: 0.5, ease: 'power2.in' }, 16.96);

      // ---------- 5 · asked and answered ----------
      // beat-locked: 17.37s and 17.93s (pops land within 0.15s of each cue)
      pop('#o1', 17.22);
      pop('#o2', 17.72);
      tl.to('#outro-chat', { opacity: 0, y: -46, filter: 'blur(6px)', duration: 0.28, ease: 'power2.in' }, 19.34);
      tl.fromTo('#s-end .halo', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 19.45);
      // beat-locked: 19.66s (strong cue 19.56s, +0.10s for the outro line's reading time)
      tl.fromTo('#s-end .logo', { opacity: 0, y: 42, scale: 0.88 }, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: 'expo.out' }, 19.5);
      tl.fromTo('#s-end .wordmark span', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.045 }, 19.66);
      tl.fromTo('#s-end .gather span', { opacity: 0, x: (i) => (6 - i) * 11 }, { opacity: 1, x: 0, duration: 0.75, ease: 'expo.out', stagger: 0.012 }, 19.95);
      tl.fromTo('#s-end .desc', { opacity: 0, y: 18, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, 20.22);
      tl.fromTo('#s-end .lockup-inner', { scale: 1 }, { scale: 1.03, duration: 3.2, ease: 'sine.inOut' }, 19.4);

      window.__timelines['main'] = tl;
    </script>
  </body>
</html>
`;

fs.writeFileSync(path.join(COMP, 'index.html'), html);
console.log(`index.html: ${(html.length / 1024).toFixed(0)} KB · CAM ${JSON.stringify(CAM)} · TAP ${JSON.stringify(TAP)}`);
