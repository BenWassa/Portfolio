// v5 — v4's structure, new turn copy: "Which app was that on?" / "Doesn't matter. It's on the shelf." (one watchlist across every streaming service, shared with every group you watch with)
// Assembles composition/index.html from the rebuilt Hearth UI fragments (build-ui.mjs),
// their measured geometry, and the per-frame music energy (extract-audio-data.py).
// Also writes work/clock-steps.json, which mix-ticks.py reads so the tick ratchet matches the clock.
import fs from 'fs';
import path from 'path';

const W = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
const COMP = path.resolve(W, '../composition');
const frag = (n) => fs.readFileSync(path.join(W, 'fragments', `${n}.html`), 'utf8');
const geo = JSON.parse(fs.readFileSync(path.join(W, 'geometry.json'), 'utf8'));
const audio = JSON.parse(fs.readFileSync(path.join(W, 'audio-data.json'), 'utf8'));

const FPS = 30;
// The track's bass drop is at media 8.7423s. Starting the music one beat in (media 0.5457s) puts it
// at video 8.197s, on "Doesn't matter."; everything below is locked to that beat grid.
const BEAT = 60 / 109.96; // 0.5457s
const MUSIC_OFFSET = +BEAT.toFixed(4);
const DROP = +(8.7423 - MUSIC_OFFSET).toFixed(4); // 8.1966
const g = (k) => +(DROP + k * BEAT).toFixed(3); // beat k relative to the drop (k may be negative)
const DURATION = +(g(53) + 3.4).toFixed(1); // the final lockup holds 3.4s

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
const t1 = frag('tonight1');
const a4 = frag('add4');
const det = frag('details');
const sp0 = frag('spaces0');
const sp1 = frag('spaces1');
const IC = {
  moon: icon(t0, 'moon'),
  plus: icon(t0, 'plus'),
  coffee: icon(t0, 'coffee'),
  smile: icon(t0, 'smile'),
  clock: icon(t0, 'clock'),
  feather: icon(a4, 'feather'),
  // lucide "users" (the app's icon set), for the Spaces caption label
  users: '<svg class="ic" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
};

// ---------- posters from the demo shelf ----------
const POSTERS = {};
for (const h of [t0, t1]) for (const m of h.matchAll(/<img src="([^"]+)" alt="([^"]+) poster"/g)) POSTERS[m[2]] ??= m[1];
const wallPosters = Object.entries(POSTERS).filter(([t]) => t !== 'Paddington').map(([, s]) => s);
const SHELF = ['The Grand Budapest Hotel', 'Ted Lasso', 'Paddington 2', 'The Intern', 'Knives Out', 'Casablanca', 'Gilmore Girls', 'Spider-Man: Into the Spider-Verse', 'Planet Earth II', 'School of Rock'];
SHELF.forEach((t) => { if (!POSTERS[t]) throw new Error(`poster ${t} missing`); });
const backdrop = (det.match(/<img src="([^"]+)"[^>]*alt="Paddington backdrop"/) || [])[1];
if (!backdrop) throw new Error('Paddington backdrop missing');

// endless feed: 9 columns x 24 rows, neighbours never repeat (taller than v2: the scroll now runs ~6s)
const COLS = 9;
const ROWS = 24;
const TILE = { w: 176, h: 264, gap: 22 };
const wallHtml = Array.from({ length: COLS }, (_, c) => {
  const imgs = Array.from({ length: ROWS }, (_, r) => `<img src="${wallPosters[(r * 5 + c * 11) % wallPosters.length]}" alt="" />`).join('');
  return `<div class="wall-col" style="margin-top:${(c % 2) * -143}px">${imgs}</div>`;
}).join('');

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
// camera push-in: keep the focus point at the phone's centre
const cam = (zoom, ux, uy) => {
  const f = uiToCanvas(ux, uy);
  return { scale: zoom, x: +(-zoom * (f.x - center.x)).toFixed(1), y: +(-zoom * (f.y - center.y)).toFixed(1) };
};
const CAM_CHIPS = cam(1.3, 200, 445); // Vibe / Energy chips in Save for Us
const CAM_DETAILS = cam(1.45, 196.5, 330); // Comfort · Light badges, title and "If started now"
const SCROLL = -400; // Tonight scroll that brings the Need a Laugh rail to mid-screen
const mid = (r) => ({ x: +(r.x + r.w / 2).toFixed(1), y: +(r.y + r.h / 2).toFixed(1) });
const TAP = {
  space: mid(geo.spaces0.room),
  add: mid(geo.tonight0.add),
  search: mid(geo['add-typing'].search),
  row0: mid(geo['add-typing'].row0),
  comfort: mid(geo.add2.comfort),
  light: mid(geo.add3.light),
  put: mid(geo.add4.put),
  pad: (() => { const p = mid(geo.tonight1.paddington); return { x: p.x, y: +(p.y + SCROLL).toFixed(1) }; })(),
};

// ---------- seeded randomness ----------
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
// embers only once the room warms up (from the turn on)
const EMBERS = [];
for (let i = 0; i < 16; i++) {
  const cycles = [];
  let t = +(DROP + rand() * 3).toFixed(2);
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
// shelf posters fly in from scattered spots (as if picked out of the feed)
const SCATTER = SHELF.map(() => ({
  x: Math.round(-720 + rand() * 1440),
  y: Math.round(-430 + rand() * 820),
  r: +(-16 + rand() * 32).toFixed(1),
}));
// ---------- the story, on the beat grid ----------
// Each gesture sits two beats (~1.09s) after the last so every state can be read.
const T = {
  clockStart: 0.8,
  clockLand: g(-4), // 11:00 PM lands, the feed stops dead; ~1s hold before the turn
  turnIn: g(-2), // "Which app was that on?"
  needYours: g(0), // drop: "Doesn't matter. It's on the shelf."
  turnTextOut: g(3),
  brandIn: g(4), // flame lands
  brandOut: g(9),
  phoneIn: +(g(9) + 0.1).toFixed(3),
  tapSpace: g(14), // pick a space on the startup picker
  capSave: +(g(14) + 0.55).toFixed(3),
  tapAdd: g(18),
  tapSearch: g(20),
  results: g(23),
  tapRow: g(25),
  tapComfort: g(27),
  tapLight: g(29),
  tapPut: g(31),
  tonightCap: g(32),
  flick1: g(34),
  railEasy: g(36),
  flick2: g(37),
  railLaugh: g(38),
  railQuick: g(40),
  tapPad: g(42),
  camDetails: g(44),
  badges: g(45),
  phoneOut: g(47),
  payClock: g(48),
  payHead: g(49),
  payOut: g(52),
  lockup: g(53),
};
// typing cadence: ~0.1s per character (v2: ~0.06s)
const TYPE_START = +(T.tapSearch + 0.2).toFixed(3);
const typeTimes = [];
{
  let t = TYPE_START;
  for (let i = 0; i < 10; i++) {
    typeTimes.push(+t.toFixed(3));
    t += 0.085 + rand() * 0.05;
  }
}
const TYPE_END = typeTimes[typeTimes.length - 1];
const keyFiles = ['003', '011', '007', '021', '014', '028', '005', '025', '018', '030'];

// ---------- clock ----------
// 9:12 -> 11:00 PM in 3-minute steps (36 ticks). The tick rate climbs from ~3.5/s to ~9/s, so the
// minutes visibly pick up speed, then the last tick lands exactly when the feed stops.
const CLOCK_LINE = 100;
const CLOCK_N = 36;
const CLOCK_MIN0 = 12; // minutes past 9:00
const clockLabel = (k) => {
  const m = CLOCK_MIN0 + 3 * k;
  return `${9 + Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
};
const clockStrip = Array.from({ length: CLOCK_N + 1 }, (_, k) => `<div>${clockLabel(k)}</div>`).join('');
const CLOCK_C = 0.55; // progress curve q(p) = c*p + (1-c)*p^2 (rate rises linearly)
const clockStepTimes = Array.from({ length: CLOCK_N }, (_, i) => {
  const q = (i + 1) / CLOCK_N;
  const p = (-CLOCK_C + Math.sqrt(CLOCK_C * CLOCK_C + 4 * (1 - CLOCK_C) * q)) / (2 * (1 - CLOCK_C));
  return +(T.clockStart + p * (T.clockLand - T.clockStart)).toFixed(3);
});
fs.writeFileSync(path.join(W, 'clock-steps.json'), JSON.stringify({ steps: clockStepTimes }));

// ---------- audio clips ----------
const TICKS_DUR = +(T.clockLand + 0.4).toFixed(2);
const SFX = [
  ['sfx-ticks', 'mix/clock-ticks.wav', 0, TICKS_DUR, 0.3], // one tick per clock step (work/mix-ticks.py, reads clock-steps.json)
  ['sfx-land', 'impact/impactSoft_medium_001.ogg', +(T.clockLand - 0.02).toFixed(3), 0.19, 0.38], // the feed stops on 11:00
  ['sfx-shelf', 'impact/impactWood_light_002.ogg', +(DROP - 0.02).toFixed(3), 0.27, 0.6], // beat-locked: the music drop
  ['sfx-logo', 'impact/impactSoft_medium_001.ogg', +(T.brandIn - 0.03).toFixed(3), 0.19, 0.45], // beat-grid
  ['sfx-phone', 'casino/card-slide-1.ogg', +(T.phoneIn + 0.03).toFixed(3), 0.61, 0.24],
  ['sfx-tap-space', 'interface/click_005.ogg', T.tapSpace, 0.05, 0.45], // beat-grid
  ['sfx-space-in', 'interface/drop_001.ogg', +(T.tapSpace + 0.4).toFixed(3), 0.11, 0.22],
  ['sfx-tap-add', 'interface/click_003.ogg', T.tapAdd, 0.05, 0.5], // beat-grid
  ['sfx-sheet-up', 'interface/drop_001.ogg', +(T.tapAdd + 0.12).toFixed(3), 0.11, 0.2],
  ['sfx-tap-search', 'interface/click_002.ogg', +(T.tapSearch - 0.02).toFixed(3), 0.05, 0.38],
  ...typeTimes.map((t, i) => [`sfx-key-${i}`, `keyboard/keypress-${keyFiles[i]}.wav`, t, 0.25, 0.2]),
  ['sfx-results', 'interface/drop_002.ogg', +(T.results - 0.04).toFixed(3), 0.2, 0.34], // beat-grid
  ['sfx-tap-row', 'interface/click_005.ogg', T.tapRow, 0.05, 0.45],
  ['sfx-tap-comfort', 'ui/click2.ogg', +(T.tapComfort - 0.02).toFixed(3), 0.06, 0.45], // beat-grid
  ['sfx-tap-light', 'ui/click2.ogg', +(T.tapLight - 0.02).toFixed(3), 0.06, 0.45], // beat-grid
  ['sfx-tap-put', 'interface/click_003.ogg', T.tapPut, 0.05, 0.5], // beat-grid
  ['sfx-put-knock', 'impact/impactWood_light_002.ogg', +(T.tapPut + 0.06).toFixed(3), 0.27, 0.5],
  ['sfx-flick-1', 'casino/card-slide-1.ogg', T.flick1, 0.61, 0.12],
  ['sfx-flick-2', 'casino/card-slide-1.ogg', T.flick2, 0.61, 0.12],
  ['sfx-tap-pad', 'interface/click_003.ogg', T.tapPad, 0.05, 0.48], // beat-grid
  ['sfx-sheet', 'interface/drop_003.ogg', +(T.tapPad + 0.1).toFixed(3), 0.2, 0.3],
  ['sfx-badges', 'interface/drop_003.ogg', T.badges, 0.2, 0.22],
  ['sfx-phone-out', 'casino/card-slide-1.ogg', T.phoneOut, 0.61, 0.16],
  ['sfx-pay-tick', 'interface/click_002.ogg', T.payClock, 0.05, 0.55], // beat-grid
  ['sfx-pay-drop', 'interface/drop_001.ogg', +(T.payHead - 0.1).toFixed(3), 0.11, 0.42],
  ['sfx-end', 'interface/bong_001.ogg', T.lockup, 0.13, 0.5], // beat-grid
];
// bed ~0.2 under the hook, ducked at the freeze, up on the drop, fades under the final lockup
const MUSIC_VOL = { version: 1, lanes: [{ target: 'volume', points: [
  { t: 0, v: 0 }, { t: 0.4, v: 0.2 }, { t: +(T.clockLand - 0.1).toFixed(2), v: 0.2 }, { t: +(T.clockLand + 0.2).toFixed(2), v: 0.07 },
  { t: +(DROP - 0.08).toFixed(2), v: 0.07 }, { t: DROP, v: 0.36 },
  { t: +(DURATION - 2.2).toFixed(2), v: 0.36 }, { t: DURATION, v: 0 },
] }] };
const audioHtml = [
  `<audio id="music-bed" src="assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3" data-start="0" data-duration="${DURATION}" data-media-start="${MUSIC_OFFSET}" data-track-index="10" data-automation='${JSON.stringify(MUSIC_VOL)}'></audio>`,
  ...SFX.map(([id, file, start, dur, vol], i) => `<audio id="${id}" src="assets/sfx/${file}" data-start="${start}" data-duration="${dur}" data-track-index="${11 + i}" data-volume="${vol}"></audio>`),
].join('\n      ');

const html = `<!doctype html>
<html lang="en" data-resolution="landscape">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Hearth — It's on the shelf</title>
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

      /* ---------- background: warm shell, ember glow, embers; cold screen-glow for the hook ---------- */
      #bg { position: absolute; inset: 0; overflow: hidden; background: #0c0a09; }
      .bg-warm { position: absolute; inset: 0; background: radial-gradient(120% 75% at 50% -12%, rgba(66, 40, 20, 0.8) 0%, rgba(66, 40, 20, 0.28) 45%, rgba(12, 10, 9, 0) 76%); }
      .bg-cold { position: absolute; inset: 0; background: radial-gradient(110% 80% at 50% 10%, rgba(37, 66, 112, 0.55) 0%, rgba(20, 30, 48, 0.5) 50%, rgba(10, 12, 16, 0.95) 100%); }
      .ember { position: absolute; left: 260px; top: 140px; width: 1400px; height: 1400px; border-radius: 50%;
        background: radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.42) 0%, rgba(180, 83, 9, 0.2) 32%, rgba(120, 53, 15, 0.08) 52%, rgba(12, 10, 9, 0) 70%); }
      .ember-pulse { position: absolute; left: 22%; top: 22%; width: 56%; height: 56%; border-radius: 50%;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.34) 0%, rgba(217, 119, 6, 0.12) 45%, rgba(12, 10, 9, 0) 70%); }
      .vignette { position: absolute; inset: 0; background: radial-gradient(ellipse 85% 80% at 50% 50%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.55) 100%); }
      .grain { position: absolute; inset: 0; opacity: 0.07; mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
      .embers span { position: absolute; left: 0; top: 0; width: 6px; height: 6px; border-radius: 50%; opacity: 0;
        background: radial-gradient(circle, #fde68a 0%, #f59e0b 45%, rgba(217, 119, 6, 0) 72%); }

      /* ---------- 1 · endless feed ---------- */
      .wall-wrap { position: absolute; inset: 0; overflow: hidden; filter: brightness(0.62) saturate(0.75); }
      .wall { position: absolute; left: ${(1920 - (COLS * TILE.w + (COLS - 1) * TILE.gap)) / 2}px; top: -40px; display: flex; gap: ${TILE.gap}px; }
      .wall-col { display: flex; flex-direction: column; gap: ${TILE.gap}px; }
      .wall-col img { width: ${TILE.w}px; height: ${TILE.h}px; object-fit: cover; border-radius: 12px; display: block; }
      .wall-tint { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15, 23, 42, 0.35) 0%, rgba(15, 23, 42, 0.15) 50%, rgba(15, 23, 42, 0.45) 100%); }
      .hook-scrim { position: absolute; inset: 0; background: radial-gradient(ellipse 46% 40% at 50% 50%, rgba(8, 10, 14, 0.92) 0%, rgba(8, 10, 14, 0.78) 45%, rgba(8, 10, 14, 0) 100%); }
      .center-stack { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
      .clock { display: flex; align-items: baseline; gap: 14px; color: #e7e5e4; }
      .clock-win { height: ${CLOCK_LINE}px; overflow: hidden; }
      .clock-strip div, .clock-static { text-align: right; height: ${CLOCK_LINE}px; font: 300 92px/${CLOCK_LINE}px -apple-system, system-ui, sans-serif; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
      .clock-ampm { font: 500 38px/1 -apple-system, system-ui, sans-serif; letter-spacing: 0.06em; color: #a8a29e; }
      .big-head { margin-top: 26px; font: 500 124px/1.02 ui-serif, serif; letter-spacing: -0.03em; color: #fafaf9; }

      /* ---------- 2 · it's on the shelf ---------- */
      .turn-text { position: absolute; left: 0; right: 0; top: 196px; display: flex; flex-direction: column; align-items: center; }
      .turn-l1 { font: 500 92px/1.05 ui-serif, serif; letter-spacing: -0.025em; color: #f5f5f4; }
      .turn-l2 { margin-top: 18px; font: italic 500 92px/1.05 ui-serif, serif; letter-spacing: -0.02em; color: #f59e0b; }
      .turn-brand { position: absolute; left: 0; right: 0; top: 168px; display: flex; flex-direction: column; align-items: center; }
      .brand-row { display: flex; align-items: center; gap: 30px; }
      .brand-row .logo { width: 136px; height: 136px; display: block; filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.5)); }
      .brand-word { display: flex; font: 900 124px/0.92 ui-serif, serif; letter-spacing: -0.035em; text-transform: uppercase; color: #fafaf9; }
      .brand-word span { display: inline-block; }
      .brand-desc { margin-top: 30px; font: 400 46px/1.2 ui-serif, serif; color: #d6d3d1; }
      .shelf { position: absolute; left: ${(1920 - (10 * 140 + 9 * 20)) / 2}px; top: 548px; display: flex; gap: 20px; }
      .shelf img { width: 140px; height: 210px; object-fit: cover; border-radius: 10px; display: block; box-shadow: 0 18px 34px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06); }
      .plank { position: absolute; left: 150px; right: 150px; top: 776px; height: 4px; border-radius: 2px; transform-origin: 50% 50%;
        background: linear-gradient(90deg, rgba(217, 119, 6, 0) 0%, #f59e0b 22%, #fcd34d 50%, #f59e0b 78%, rgba(217, 119, 6, 0) 100%);
        box-shadow: 0 0 26px 6px rgba(245, 158, 11, 0.35), 0 18px 60px 18px rgba(217, 119, 6, 0.18); }

      /* ---------- Hearth lockup (onboarding brand treatment at video scale) ---------- */
      .lockup { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
      .halo { position: absolute; left: 560px; top: 20px; width: 800px; height: 800px; border-radius: 50%;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.36) 0%, rgba(217, 119, 6, 0.12) 40%, rgba(12, 10, 9, 0) 68%); }
      .lockup-inner { position: relative; display: flex; flex-direction: column; align-items: center; }
      .lockup-inner .logo { width: 236px; height: 236px; display: block; filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.5)); }
      .wordmark { display: flex; margin-top: 22px; font: 900 150px/0.92 ui-serif, serif; letter-spacing: -0.035em; text-transform: uppercase; color: #fafaf9; }
      .wordmark span { display: inline-block; }
      .gather span { display: inline-block; }
      .gather { display: flex; margin-top: 28px; padding-left: 0.42em; font: 600 26px/1 -apple-system, system-ui, sans-serif; letter-spacing: 0.42em; text-transform: uppercase; color: #f59e0b; }
      .desc { margin-top: 44px; font: 400 44px/1.2 ui-serif, serif; color: #d6d3d1; }

      /* ---------- captions beside the phone ---------- */
      .caption { position: absolute; top: 0; bottom: 0; left: 250px; width: 860px; display: flex; flex-direction: column; justify-content: center; }
      .cap-label { display: flex; align-items: center; gap: 16px; font: 650 24px/1 -apple-system, system-ui, sans-serif; letter-spacing: 0.34em; text-transform: uppercase; color: #f59e0b; }
      .cap-label .rule { display: block; width: 56px; height: 3px; border-radius: 2px; background: #f59e0b; transform-origin: 0 50%; }
      .cap-label .txt { display: flex; align-items: center; gap: 14px; }
      .cap-label .ic { width: 28px; height: 28px; }
      .cap-head { margin-top: 30px; max-width: 860px; font: 500 96px/1.04 ui-serif, serif; letter-spacing: -0.025em; color: #f5f5f4; }
      .cap-head .ln { display: block; }
      .cap-sub { margin-top: 30px; font: 400 40px/1.3 -apple-system, system-ui, sans-serif; color: #d6d3d1; }
      .sub-swap { display: grid; max-width: 860px; }
      .sub-swap > div { grid-area: 1 / 1; }
      .rails { margin-top: 52px; display: flex; flex-direction: column; gap: 22px; }
      .rail { display: flex; align-items: center; gap: 18px; font: 650 30px/1 -apple-system, system-ui, sans-serif; letter-spacing: 0.22em; text-transform: uppercase; color: #d6d3d1; }
      .rail .ic { width: 34px; height: 34px; color: #f59e0b; }
      .chips { margin-top: 44px; display: flex; gap: 22px; }
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
      #ui-spaces0 { opacity: 1; }
      #ui-tonight0 [data-hero-meta="1"], #ui-tonight0 [data-hero-dots="1"] { opacity: 0; }
      #ui-typing [data-ch], #ui-typing [data-result-row], #ui-typing [title="Clear search"] { opacity: 0; }
      .glare { position: absolute; inset: 0; border-radius: 57px; background: linear-gradient(115deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 30%); }
      .touch { position: absolute; left: -24px; top: -24px; width: 48px; height: 48px; border-radius: 50%; opacity: 0;
        background: rgba(255, 255, 255, 0.26); box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.55), 0 4px 18px rgba(0, 0, 0, 0.35); }
      .touch-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(253, 230, 138, 0.85); opacity: 0; }

      /* ---------- 5 · already watching ---------- */
      .pay-bg { position: absolute; inset: -40px; background: url("${backdrop}") center 30% / cover no-repeat; opacity: 0; filter: blur(7px) saturate(0.85); }
      .pay-shade { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 55% at 50% 50%, rgba(12, 10, 9, 0.82) 0%, rgba(12, 10, 9, 0.6) 60%, rgba(12, 10, 9, 0.9) 100%); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DURATION}" data-width="1920" data-height="1080" data-fps="${FPS}">
      <div id="bg" data-layout-ignore>
        <div class="bg-warm"></div>
        <div id="ember" class="ember"><div id="ember-pulse" class="ember-pulse"></div></div>
        <div id="bg-cold" class="bg-cold"></div>
        <div class="vignette"></div>
        <div class="grain"></div>
        <div id="embers" class="embers">${EMBERS.map((_, i) => `<span id="em-${i}"></span>`).join('')}</div>
      </div>

      <!-- 1 · Still scrolling -->
      <section id="s-hook" class="clip scene" data-start="0" data-duration="${+(T.turnIn + 0.95).toFixed(2)}" data-track-index="1">
        <div id="wall-wrap" class="wall-wrap" data-layout-ignore>
          <div id="wall" class="wall">${wallHtml}</div>
          <div class="wall-tint"></div>
        </div>
        <div class="hook-scrim" data-layout-ignore></div>
        <div class="center-stack">
          <div id="hook-clock" class="clock">
            <div class="clock-win"><div id="clock-strip" class="clock-strip" data-layout-allow-overflow>${clockStrip}</div></div>
            <span class="clock-ampm">PM</span>
          </div>
          <div id="hook-head" class="big-head">Still scrolling.</div>
        </div>
      </section>

      <!-- 2 · It's on the shelf -->
      <section id="s-turn" class="clip scene" data-start="${+(T.turnIn - 0.3).toFixed(2)}" data-duration="${+(T.brandOut + 0.7 - (T.turnIn - 0.3)).toFixed(2)}" data-track-index="2">
        <div id="turn-text" class="turn-text">
          <div id="turn-l1" class="turn-l1">Which app was that on?</div>
          <div id="turn-l2" class="turn-l2">Doesn't matter. It's on the shelf.</div>
        </div>
        <div id="turn-brand" class="turn-brand">
          <div class="brand-row">
            <img id="turn-logo" class="logo" src="assets/ui/hearth-logo.png" alt="Hearth logo" />
            <div id="turn-word" class="brand-word">${[...'Hearth'].map((c) => `<span>${c}</span>`).join('')}</div>
          </div>
          <div id="turn-desc" class="brand-desc">A shared watchlist for every streaming service.</div>
        </div>
        <div id="shelf" class="shelf">${SHELF.map((t, i) => `<img class="sp" id="sp-${i}" src="${POSTERS[t]}" alt="${t} poster" />`).join('')}</div>
        <div id="plank" class="plank" data-layout-ignore></div>
      </section>

      <!-- 3 + 4 · Save for Us / Tonight (real Hearth UI, rebuilt from the live demo) -->
      <section id="s-phone" class="clip scene" data-start="${+(T.phoneIn - 0.1).toFixed(2)}" data-duration="${+(T.phoneOut + 0.65 - (T.phoneIn - 0.1)).toFixed(2)}" data-track-index="3">
        <div id="cap-spaces" class="caption">
          <div class="cap-inner">
            <div class="cap-label"><span class="rule"></span><span class="txt">${IC.users}Spaces</span></div>
            <div class="cap-head"><span class="ln">Your people,</span><span class="ln">your shelves.</span></div>
            <div class="cap-sub">Couples, friends, family: a private shelf for each.</div>
          </div>
        </div>
        <div id="cap-save" class="caption">
          <div class="cap-inner">
            <div class="cap-label"><span class="rule"></span><span class="txt">${IC.plus}Save for Us</span></div>
            <div class="cap-head"><span class="ln">Saw it anywhere?</span></div>
            <div class="cap-sub">Save it once, whatever it streams on.<br />Then tag the mood.</div>
            <div class="chips">
              <div id="chip-comfort" class="chip">${IC.coffee}Comfort</div>
              <div id="chip-light" class="chip">${IC.feather}Light</div>
            </div>
          </div>
        </div>
        <div id="cap-tonight" class="caption">
          <div class="cap-inner">
            <div class="cap-label"><span class="rule"></span><span class="txt">${IC.moon}Tonight</span></div>
            <div class="cap-head"><span class="ln">Pick by mood.</span></div>
            <div class="sub-swap">
              <div id="sub-a" class="cap-sub">Plain categories, built from the tags you set.</div>
              <div id="sub-b" class="cap-sub">Every title shows the tags behind it.</div>
            </div>
            <div class="rails">
              <div id="rail-easy" class="rail">${IC.coffee}Easy &amp; Comforting</div>
              <div id="rail-laugh" class="rail">${IC.smile}Need a Laugh</div>
              <div id="rail-quick" class="rail">${IC.clock}Quick Bites</div>
            </div>
          </div>
        </div>
        <div id="phone-cam" class="phone-cam" data-layout-ignore>
          <div class="phone">
            <div class="phone-screen">
              <div class="ui-scale">
                <div id="ui-spaces0" class="hs">${sp0}</div>
                <div id="ui-spaces1" class="hs">${sp1}</div>
                <div id="ui-tonight0" class="hs">${t0}</div>
                <div id="ui-add0" class="hs">${frag('add0')}</div>
                <div id="ui-typing" class="hs">${frag('add-typing')}</div>
                <div id="ui-add2" class="hs">${frag('add2')}</div>
                <div id="ui-add3" class="hs">${frag('add3')}</div>
                <div id="ui-add4" class="hs">${a4}</div>
                <div id="ui-tonight1" class="hs">${t1}</div>
                <div id="ui-details" class="hs">${det}</div>
                <div id="touch" class="touch"><div class="touch-ring"></div></div>
              </div>
              <div class="glare"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5 · Already watching -->
      <section id="s-pay" class="clip scene" data-start="${+(T.payClock - 0.25).toFixed(2)}" data-duration="${+(T.payOut + 0.75 - (T.payClock - 0.25)).toFixed(2)}" data-track-index="4">
        <div id="pay-bg" class="pay-bg" data-layout-ignore></div>
        <div class="pay-shade" data-layout-ignore></div>
        <div class="center-stack">
          <div id="pay-clock" class="clock"><div class="clock-static">9:04</div><span class="clock-ampm">PM</span></div>
          <div id="pay-head" class="big-head">Already watching.</div>
        </div>
      </section>
      <section id="s-end" class="clip scene lockup" data-start="${+(T.lockup - 0.4).toFixed(2)}" data-duration="${+(DURATION - (T.lockup - 0.4)).toFixed(2)}" data-track-index="5">
        <div class="halo" data-layout-ignore></div>
        <div class="lockup-inner">
          <img class="logo" src="assets/ui/hearth-logo.png" alt="Hearth logo" />
          <div class="wordmark">${[...'Hearth'].map((c) => `<span>${c}</span>`).join('')}</div>
          <div class="gather">${[...'Gather Around'].map((c) => `<span>${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</div>
          <div class="desc">One watchlist for every service and everyone you watch with.</div>
        </div>
      </section>

      ${audioHtml}
    </div>
    <script>
      const ENERGY = ${JSON.stringify(ENERGY)};
      const EMBERS = ${JSON.stringify(EMBERS)};
      const SCATTER = ${JSON.stringify(SCATTER)};
      const TAP = ${JSON.stringify(TAP)};
      const CAM_CHIPS = ${JSON.stringify(CAM_CHIPS)};
      const CAM_DETAILS = ${JSON.stringify(CAM_DETAILS)};
      const TYPE = ${JSON.stringify(typeTimes)};
      const T = ${JSON.stringify(T)};
      const CLOCK_STEPS = ${JSON.stringify(clockStepTimes)};
      const CLOCK_LINE = ${CLOCK_LINE};
      const DROP = ${DROP};
      const SCROLL = ${SCROLL};
      const SCROLL_1 = -230; // first stop: the new Paddington collection card + the first rail
      const $ = (s) => document.querySelector(s);
      const $$ = (s) => [...document.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });

      // ---------- background ----------
      tl.set('#ember', { x: 0, y: 380, scale: 0.7, opacity: 0.2 }, 0);
      tl.to('#bg-cold', { opacity: 0, duration: 1.7, ease: 'power1.inOut' }, T.turnIn + 0.2);
      tl.to('#ember', { y: 60, scale: 1.05, opacity: 1, duration: 1.2, ease: 'power2.out' }, DROP - 0.15);
      tl.to('#ember', { x: 430, y: 60, scale: 0.9, opacity: 0.8, duration: 1.2, ease: 'power2.inOut' }, T.brandOut - 0.1);
      tl.to('#ember', { x: 0, y: 200, scale: 0.9, opacity: 0.7, duration: 1.0, ease: 'power2.inOut' }, T.phoneOut - 0.2);
      tl.to('#ember', { y: 40, scale: 1.08, opacity: 1, duration: 1.2, ease: 'power2.out' }, T.lockup - 0.3);
      // audio-reactive: music energy breathes the ember core (pre-extracted, one keyframe per frame)
      tl.to('#ember-pulse', { keyframes: ENERGY.map((v) => ({ opacity: 0.2 + 0.8 * v, scale: 0.94 + 0.12 * v, duration: 1 / 30, ease: 'none' })) }, 0);
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

      // ---------- 1 · still scrolling ----------
      // The feed is already moving on frame 0 and keeps speeding up (each column at its own pace)
      // until the clock lands on 11:00 PM, then stops dead. The clock ticks up in 3-minute steps whose
      // pace rises with the scroll; the tick audio is mixed from the same step times (CLOCK_STEPS).
      const WALL_T = T.clockLand;
      const SPEED0 = 380; // px/s on frame 0
      const ACCEL = 30; // px/s per second
      const WALL_DIST = SPEED0 * WALL_T + ACCEL * WALL_T * WALL_T;
      const COL_MULT = [1, 0.86, 1.1, 0.92, 1.05, 0.88, 1.12, 0.95, 1.0];
      tl.fromTo('.wall-col', { y: 0 }, { y: (i) => -WALL_DIST * COL_MULT[i], duration: WALL_T, ease: (p) => (SPEED0 * WALL_T * p + ACCEL * WALL_T * WALL_T * p * p) / WALL_DIST }, 0);
      tl.to('.wall-col', { y: (i) => -(WALL_DIST + 150) * COL_MULT[i], duration: 0.45, ease: 'power3.out' }, WALL_T);
      tl.fromTo('#hook-clock', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.1);
      tl.fromTo('#hook-head', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.55);
      tl.set('#clock-strip', { y: 0 }, 0);
      CLOCK_STEPS.forEach((t, k) => tl.set('#clock-strip', { y: -(k + 1) * CLOCK_LINE }, t));
      // 11:00 PM lands with a small swell
      tl.to('#hook-clock', { scale: 1.06, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 }, T.clockLand);
      // the hold: a full second on "Still scrolling." at 11:00 PM before the turn
      tl.to(['#hook-clock', '#hook-head'], { opacity: 0, y: -30, filter: 'blur(6px)', duration: 0.35, ease: 'power2.in' }, T.turnIn - 0.05);
      tl.to('#wall-wrap', { opacity: 0, filter: 'brightness(0.62) saturate(0.75) blur(10px)', duration: 0.8, ease: 'power2.in' }, T.turnIn + 0.05);

      // ---------- 2 · it's on the shelf ----------
      tl.fromTo('#turn-l1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, T.turnIn);
      // beat-locked: the last shelf poster lands on the music's drop
      tl.fromTo('.sp', { x: (i) => SCATTER[i].x, y: (i) => SCATTER[i].y, rotation: (i) => SCATTER[i].r, scale: 1.25, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.055 }, DROP - 0.65 - 9 * 0.055);
      tl.fromTo('#plank', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.7, ease: 'expo.out' }, DROP - 0.1);
      // beat-locked: "Doesn't matter. It's on the shelf." on the drop
      tl.fromTo('#turn-l2', { opacity: 0, y: 24, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'expo.out' }, DROP - 0.1);
      tl.to('#turn-text', { opacity: 0, y: -24, duration: 0.3, ease: 'power2.in' }, T.turnTextOut);
      // beat-grid: the flame lands
      tl.fromTo('#turn-logo', { opacity: 0, y: 30, scale: 0.88 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'expo.out' }, T.brandIn - 0.22);
      tl.fromTo('#turn-word span', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.05 }, T.brandIn - 0.11);
      tl.fromTo('#turn-desc', { opacity: 0, y: 16, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, T.brandIn + 0.35);
      tl.to('#turn-brand', { opacity: 0, y: -30, duration: 0.45, ease: 'power2.in' }, T.brandOut);
      tl.to('.sp', { x: -260, opacity: 0, duration: 0.5, ease: 'power2.in', stagger: 0.03 }, T.brandOut - 0.05);
      tl.to('#plank', { opacity: 0, duration: 0.45, ease: 'power1.in' }, T.brandOut);

      // ---------- 3 · save for us ----------
      tl.fromTo('#phone-cam', { x: 760, rotationY: -24, scale: 0.92, opacity: 0, transformPerspective: 1600 }, { x: 0, rotationY: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' }, T.phoneIn);
      tl.fromTo('.phone', { y: 0 }, { y: -6, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: 7 }, T.phoneIn + 1.0);
      // spaces caption arrives with the phone; it hands over to the save caption after the tap
      tl.fromTo('#cap-spaces .rule', { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: 'expo.out' }, T.phoneIn + 0.3);
      tl.fromTo('#cap-spaces .cap-label .txt', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, T.phoneIn + 0.37);
      tl.fromTo('#cap-spaces .ln', { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out', stagger: 0.16 }, T.phoneIn + 0.42);
      tl.fromTo('#cap-spaces .cap-sub', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, T.phoneIn + 1.0);
      tl.to('#cap-spaces .cap-inner', { opacity: 0, y: -24, duration: 0.35, ease: 'power2.in' }, T.tapSpace + 0.2);
      tl.fromTo('#cap-save .rule', { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: 'expo.out' }, T.capSave);
      tl.fromTo('#cap-save .cap-label .txt', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, T.capSave + 0.07);
      tl.fromTo('#cap-save .ln', { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out', stagger: 0.16 }, T.capSave + 0.12);
      tl.fromTo('#cap-save .cap-sub', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, T.capSave + 0.65);
      tl.set(['#chip-comfort', '#chip-light'], { opacity: 0 }, 0);

      const ripple = (t) => tl.fromTo('.touch-ring', { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 2.3, duration: 0.45, ease: 'power2.out', immediateRender: false }, t);
      const press = (p, t) => {
        tl.set('#touch', { x: p.x, y: p.y, scale: 1.25 }, t - 0.12);
        tl.to('#touch', { opacity: 1, scale: 1, duration: 0.12, ease: 'power2.out' }, t - 0.12);
        ripple(t);
        tl.to('#touch', { opacity: 0, duration: 0.16, ease: 'power1.in' }, t + 0.14);
      };
      // the startup picker ("Choose a Space"): tap Living Room, the app opens on Tonight
      press(TAP.space, T.tapSpace);
      tl.to('#ui-spaces0 [data-space="0"]', { scale: 0.97, duration: 0.09, ease: 'power2.out' }, T.tapSpace);
      tl.set('#ui-spaces1', { opacity: 1 }, T.tapSpace + 0.08);
      tl.set('#ui-spaces0', { opacity: 0 }, T.tapSpace + 0.1);
      // selected row holds for a beat, then the picker hands over to Tonight in one short crossfade
      tl.to('#ui-tonight0', { opacity: 1, duration: 0.4, ease: 'power1.out' }, T.tapSpace + 0.5);
      tl.to('#ui-spaces1', { opacity: 0, duration: 0.3, ease: 'power1.in' }, T.tapSpace + 0.5);
      // tap Add
      press(TAP.add, T.tapAdd);
      tl.to('#ui-tonight0 [data-tap="add"]', { scale: 0.95, duration: 0.09, ease: 'power2.out' }, T.tapAdd);
      tl.to('#ui-tonight0 [data-tap="add"]', { scale: 1, duration: 0.2, ease: 'power2.out' }, T.tapAdd + 0.09);
      // the Save for Us sheet (app: slide-in-from-bottom, 300ms); it then sits for a beat
      tl.set('#ui-add0', { opacity: 1, y: 852 }, T.tapAdd + 0.09);
      tl.to('#ui-add0', { y: 0, duration: 0.36, ease: 'power3.out' }, T.tapAdd + 0.11);
      tl.set('#ui-tonight0', { opacity: 0 }, T.tapAdd + 0.5);

      // search: tap, focus, type "Paddington"
      press(TAP.search, T.tapSearch);
      tl.set('#ui-typing', { opacity: 1 }, T.tapSearch + 0.04);
      tl.set('#ui-add0', { opacity: 0 }, T.tapSearch + 0.06);
      const chars = $$('#ui-typing [data-ch]');
      const caret = $('#ui-typing [data-caret]');
      // caret offsets: measured once at setup, never at tween time
      const ends = chars.map((c) => c.offsetLeft + c.offsetWidth);
      const full = ends[ends.length - 1];
      const startX = chars[0].offsetLeft - full;
      const typeEnd = TYPE[TYPE.length - 1];
      tl.set(caret, { x: startX }, 0);
      tl.set(caret, { opacity: 0 }, T.tapSearch - 0.02);
      [T.tapSearch + 0.06, typeEnd + 0.2, typeEnd + 0.38, T.results - 0.02].forEach((t, i) => tl.set(caret, { opacity: i % 2 === 0 ? 1 : 0 }, t));
      tl.set('#ui-typing [title="Clear search"]', { opacity: 1 }, TYPE[0]);
      chars.forEach((c, i) => {
        tl.set(c, { opacity: 1 }, TYPE[i]);
        tl.set(caret, { x: ends[i] - full }, TYPE[i]);
      });
      // beat-grid: TMDB results drop in, one by one
      tl.fromTo('#ui-typing [data-result-row]', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', stagger: 0.1 }, T.results - 0.06);

      // pick Paddington (2014), then the camera settles in on Vibe / Energy
      press(TAP.row0, T.tapRow);
      tl.to('#ui-typing [data-result-row="0"]', { backgroundColor: 'rgba(245, 158, 11, 0.12)', duration: 0.12, ease: 'power1.out' }, T.tapRow);
      tl.to('#ui-add2', { opacity: 1, duration: 0.16, ease: 'power1.out' }, T.tapRow + 0.09);
      tl.set('#ui-typing', { opacity: 0 }, T.tapRow + 0.25);
      tl.to('#phone-cam', { scale: CAM_CHIPS.scale, x: CAM_CHIPS.x, y: CAM_CHIPS.y, duration: 0.8, ease: 'power2.inOut' }, T.tapRow + 0.2);

      // beat-grid: Comfort
      press(TAP.comfort, T.tapComfort - 0.02);
      tl.to('#ui-add2 [data-chip="comfort"]', { scale: 0.94, duration: 0.08, ease: 'power2.out' }, T.tapComfort - 0.04);
      tl.to('#ui-add3', { opacity: 1, duration: 0.12, ease: 'power1.out' }, T.tapComfort + 0.02);
      tl.set('#ui-add2', { opacity: 0 }, T.tapComfort + 0.16);
      tl.fromTo('#chip-comfort', { opacity: 0, scale: 0.6, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)', immediateRender: false }, T.tapComfort + 0.02);

      // beat-grid: Light
      press(TAP.light, T.tapLight - 0.02);
      tl.to('#ui-add3 [data-chip="light"]', { scale: 0.94, duration: 0.08, ease: 'power2.out' }, T.tapLight - 0.04);
      tl.to('#ui-add4', { opacity: 1, duration: 0.12, ease: 'power1.out' }, T.tapLight + 0.02);
      tl.set('#ui-add3', { opacity: 0 }, T.tapLight + 0.16);
      tl.fromTo('#chip-light', { opacity: 0, scale: 0.6, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)', immediateRender: false }, T.tapLight + 0.02);
      tl.to('#phone-cam', { scale: 1, x: 0, y: 0, duration: 0.6, ease: 'power2.inOut' }, T.tapLight + 0.45);

      // beat-grid: Put on Shelf (the app's own active:scale-95, driven through its Tailwind vars)
      press(TAP.put, T.tapPut);
      tl.to('#ui-add4 [data-put]', { '--tw-scale-x': 0.95, '--tw-scale-y': 0.95, duration: 0.09, ease: 'power2.out' }, T.tapPut);
      tl.to('#ui-add4 [data-put]', { '--tw-scale-x': 1, '--tw-scale-y': 1, duration: 0.22, ease: 'power2.out' }, T.tapPut + 0.09);
      // back on Tonight (app: unmount + fade-in, 500ms), where the new collection card is waiting
      tl.set('#ui-add4', { opacity: 0 }, T.tapPut + 0.2);
      tl.to('#ui-tonight1', { opacity: 1, duration: 0.5, ease: 'power1.out' }, T.tapPut + 0.2);
      tl.to('#cap-save .cap-inner', { opacity: 0, y: -24, duration: 0.35, ease: 'power2.in' }, T.tapPut + 0.2);

      // ---------- 4 · pick by mood ----------
      tl.fromTo('#cap-tonight .rule', { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: 'expo.out' }, T.tonightCap);
      tl.fromTo('#cap-tonight .cap-label .txt', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, T.tonightCap + 0.06);
      tl.fromTo('#cap-tonight .ln', { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out', stagger: 0.16 }, T.tonightCap + 0.1);
      tl.fromTo('#sub-a', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, T.tonightCap + 0.5);
      tl.set('#sub-b', { opacity: 0 }, 0);
      tl.set('#cap-tonight .rail', { opacity: 0 }, 0);
      // two unhurried scrolls: the shelf's new collection card, then down to the mood rails
      const flick = (t, y0, y1, to, dur) => {
        tl.set('#touch', { x: 214, y: y0, scale: 1 }, t);
        tl.to('#touch', { opacity: 1, duration: 0.12, ease: 'power1.out' }, t);
        tl.to('#touch', { y: y1, duration: 0.4, ease: 'power2.in' }, t + 0.08);
        tl.to('#touch', { opacity: 0, duration: 0.18, ease: 'power1.in' }, t + 0.48);
        tl.to('#ui-tonight1 [data-scroll-wrap]', { y: to, duration: dur, ease: 'power3.out' }, t + 0.1);
      };
      flick(T.flick1, 650, 430, SCROLL_1, 1.55);
      flick(T.flick2, 580, 470, SCROLL, 1.5);
      // beat-grid: rail names, two beats apart (each holds to the scene's end)
      [T.railEasy, T.railLaugh, T.railQuick].forEach((t, i) => {
        tl.fromTo($$('#cap-tonight .rail')[i], { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.4)', immediateRender: false }, t);
      });
      // beat-grid: tap Paddington in Need a Laugh
      press(TAP.pad, T.tapPad);
      tl.to('#ui-tonight1 [data-tap="paddington"]', { scale: 0.95, duration: 0.09, ease: 'power2.out' }, T.tapPad);
      tl.to('#ui-tonight1 [data-tap="paddington"]', { scale: 1, duration: 0.18, ease: 'power2.out' }, T.tapPad + 0.09);
      tl.to('#rail-laugh', { color: '#fcd34d', duration: 0.35, ease: 'power1.out' }, T.tapPad);
      // transparency: the sheet shows the tags behind the category
      tl.to('#sub-a', { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in' }, T.camDetails - 0.3);
      tl.fromTo('#sub-b', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', immediateRender: false }, T.camDetails + 0.1);
      tl.to(['#rail-easy', '#rail-quick'], { opacity: 0.32, duration: 0.35, ease: 'power1.out' }, T.tapPad);
      // details sheet (app: fade-in, 200ms) — its badges are the tags set on save
      tl.to('#ui-details', { opacity: 1, duration: 0.22, ease: 'power1.out' }, T.tapPad + 0.1);
      tl.to('#phone-cam', { scale: CAM_DETAILS.scale, x: CAM_DETAILS.x, y: CAM_DETAILS.y, duration: 0.9, ease: 'power2.inOut' }, T.camDetails - 0.2);
      // the tags set on save, lit up
      tl.fromTo('#ui-details [data-badge]', { boxShadow: '0 0 0 0px rgba(245, 158, 11, 0)' }, { boxShadow: '0 0 0 1.5px rgba(245, 158, 11, 0.95), 0 0 16px 2px rgba(245, 158, 11, 0.5)', duration: 0.45, ease: 'power2.out', stagger: 0.15 }, T.badges);
      tl.to('#cap-tonight .cap-inner', { opacity: 0, y: -24, duration: 0.35, ease: 'power2.in' }, T.phoneOut - 0.1);
      tl.to('#phone-cam', { x: '+=700', rotationY: 20, opacity: 0, duration: 0.5, ease: 'power2.in' }, T.phoneOut);

      // ---------- 5 · already watching ----------
      tl.fromTo('#pay-bg', { opacity: 0, scale: 1.06 }, { opacity: 0.34, scale: 1, duration: 1.2, ease: 'power2.out' }, T.payClock - 0.14);
      // beat-grid: the clock comes back — at 9:04
      tl.fromTo('#pay-clock', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, T.payClock - 0.04);
      tl.fromTo('#pay-head', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, T.payHead - 0.25);
      tl.to(['#pay-clock', '#pay-head'], { opacity: 0, y: -30, filter: 'blur(6px)', duration: 0.3, ease: 'power2.in' }, T.payOut);
      tl.to('#pay-bg', { opacity: 0, duration: 0.6, ease: 'power1.in' }, T.payOut + 0.06);

      tl.fromTo('#s-end .halo', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out' }, T.lockup - 0.24);
      // beat-grid: the flame lands
      tl.fromTo('#s-end .logo', { opacity: 0, y: 42, scale: 0.88 }, { opacity: 1, y: 0, scale: 1, duration: 0.29, ease: 'expo.out' }, T.lockup - 0.29);
      tl.fromTo('#s-end .wordmark span', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.05 }, T.lockup + 0.16);
      tl.fromTo('#s-end .gather span', { opacity: 0, x: (i) => (6 - i) * 11 }, { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out', stagger: 0.012 }, T.lockup + 0.53);
      tl.fromTo('#s-end .desc', { opacity: 0, y: 18, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out' }, T.lockup + 0.81);
      tl.fromTo('#s-end .lockup-inner', { scale: 1 }, { scale: 1.03, duration: 3.8, ease: 'sine.inOut' }, T.lockup - 0.09);

      window.__timelines['main'] = tl;
    </script>
  </body>
</html>
`;

fs.writeFileSync(path.join(COMP, 'index.html'), html);
console.log(`index.html: ${(html.length / 1024).toFixed(0)} KB · CAM_CHIPS ${JSON.stringify(CAM_CHIPS)} · CAM_DETAILS ${JSON.stringify(CAM_DETAILS)} · TAP ${JSON.stringify(TAP)}`);
