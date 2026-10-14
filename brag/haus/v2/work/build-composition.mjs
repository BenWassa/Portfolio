// HAUS v2 — "The backlog is infinite. Your Saturday isn't." (re-ordered: one feature per chapter, seen through)
// Assembles composition/index.html from the rebuilt HAUS UI fragments (build-ui.mjs), their measured
// geometry (geometry-ui.json) and the per-frame music energy (audio-data.json).
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const W = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
const COMP = path.resolve(W, '../composition');
const F = Object.fromEntries(
  ['home0', 'home-alexout', 'home-out-1h', 'settings-out', 'settings-out-1h', 'matrixview', 'matrixsheet', 'planning', 'task0', 'task1'].map((n) => [
    n,
    JSON.parse(fs.readFileSync(path.join(W, 'fragments', `${n}.json`), 'utf8')),
  ]),
);
const G = JSON.parse(fs.readFileSync(path.join(W, 'geometry-ui.json'), 'utf8'));
const audio = JSON.parse(fs.readFileSync(path.join(W, 'audio-data.json'), 'utf8'));

const DURATION = 40.5;
const FPS = 30;
const CW = 1080;
const CH = 1920;

// ------------------------------------------------------------------ schedule (seconds)
// One chapter per feature: NAME it (rail + caption) -> DO it (a real tap) -> SEE it (result holds, caption still up) -> leave.
// Taps and re-ranks snap to the music's beat grid (work/beats.json, from the bundled track's cue preset).
const BEATS = JSON.parse(fs.readFileSync(path.join(W, 'beats.json'), 'utf8')).beats;
const B = (t) => BEATS.reduce((a, b) => (Math.abs(b - t) < Math.abs(a - t) ? b : a));
const T = {
  phoneIn: 6.95,
  // 01 Who's in  (Home: portrait -> Best Fit)
  rail: 7.6,
  capA: 8.0,
  tapAlex: B(8.96),
  scroll1: B(9.5),
  rerank1: B(10.54),
  capAOut: 13.0,
  // 02 How long  (Settings > This session: 1h -> Home: Best Fit)
  r2: 13.1,
  capB: 13.3,
  tapSettings: B(13.7),
  tapChip: B(15.28),
  tapHome: B(16.34),
  scroll2: B(17.39),
  rerank2: B(18.44),
  capBOut: 20.9,
  // 03 The Matrix  (Home panel -> heatmap -> cell sheet)
  r3: 20.95,
  scroll3: 21.0,
  capC: 21.2,
  tapMx: B(22.65),
  tapCell: B(25.29),
  capCOut: 27.7,
  sheetOut: 27.75,
  // 04 Together  (Planning -> faucet -> handoff)
  r4: 27.95,
  tapPlan: B(28.43),
  capD: 28.95,
  scrollAlex: 30.0,
  tapFaucet: B(31.07),
  capE: B(31.07) + 0.22,
  tapCheck: B(34.75),
  capEOut: 36.5,
  phoneOut: 36.6,
  // Ask
  line: B(37.38),
  lift: 38.07,
  logo: 38.22,
  tag: 38.47,
};

// ------------------------------------------------------------------ palette (DESIGN.md, oklch -> hex)
const C = {
  paper: '#fbf6ee',
  surface: '#fffcf7',
  line: '#e2dacc',
  ink: '#3a2d25',
  muted: '#7e7269',
  railMuted: '#6b6057', // inactive chapter-rail labels: AA at 22px
  amber: '#d9a767',
  amberText: '#703f0e',
  amberSoft: '#f8e9d2',
};

// ------------------------------------------------------------------ fonts (local copies of Anybody / Figtree)
const FONT_FACES = fs.readFileSync(path.join(W, 'font-faces.css'), 'utf8').split('\n').join('\n      ');

// ------------------------------------------------------------------ phone geometry
const S = 1.8; // UI px -> canvas px
const BEZEL = 14;
const SCREEN_W = +(393 * S).toFixed(1);
const SCREEN_H = +(852 * S).toFixed(1);
const DEV = { w: +(SCREEN_W + BEZEL * 2).toFixed(1), h: +(SCREEN_H + BEZEL * 2).toFixed(1) };
DEV.left = +((CW - DEV.w) / 2).toFixed(1);
DEV.top = 330;

// ------------------------------------------------------------------ Home composite (S3 -> S4)
const g0 = G.home0;
const g1 = G['home-alexout'];
const g2 = G['home-out-1h'];
const DY = +(g0['panel-bestfit'].h - g2['panel-bestfit'].h).toFixed(1); // keep the panel tall enough for the 4h list
const SC_BF = +(g2['panel-bestfit'].y - 70).toFixed(0); // scroll that frames Best Fit
const MX_BTN = { x: g2['btn-matrix'].x + g2['btn-matrix'].w / 2, y: g2['btn-matrix'].y + DY + g2['btn-matrix'].h / 2 };
const SC_MX = +(g2['panel-matrix'].y + DY - 70).toFixed(0); // scroll that frames The Matrix

// union of Best Fit rows across the three states (by title), with their slot (y within the list) per state
const bfStates = [
  ['home0', g0],
  ['home-alexout', g1],
  ['home-out-1h', g2],
];
const bfRows = new Map();
bfStates.forEach(([sname, g], si) => {
  for (let j = 0; j < 5; j++) {
    const r = g[`row-bestfit-${j}`];
    if (!r) continue;
    const entry = bfRows.get(r.title) || { title: r.title, html: F[sname].parts[`row-bestfit-${j}`], pos: [null, null, null], h: r.h };
    entry.pos[si] = +(r.y - g['ul-bestfit'].y).toFixed(1);
    bfRows.set(r.title, entry);
  }
});
const BF = [...bfRows.values()];
const BF_UL = g2['ul-bestfit'];

// ------------------------------------------------------------------ tasks for the hook pile (verified against the live Planning view)
const TASK = {
  vent: { title: 'Clean hallway return vent', room: 'Living Room', who: 'Sam Rivera', p: 'low', e: '🛋️' },
  bins: { title: 'Sort basement donation bins', room: 'Basement', who: 'Priya Shah', p: 'low', e: '📦' },
  table: { title: 'Refinish dining table scratches', room: 'Living Room', who: 'Priya Shah', p: 'low', e: '🛋️' },
  linen: { title: 'Organize linen closet shelves', room: 'Master Bedroom', who: 'Priya Shah', p: 'medium', e: '🛏️' },
  clips: { title: 'Replace backyard string light clips', room: 'Backyard', who: 'Alex Morgan', p: 'medium', e: '🌿' },
  hardware: { title: 'Install closet hardware', room: 'Master Bedroom', who: 'Alex Morgan', p: 'medium', e: '🛏️' },
  laundry: { title: 'Fix laundry shelf anchors', room: 'Laundry', who: 'Sam Rivera', p: 'medium', e: '🧺' },
  tools: { title: 'Return tools to wall rack', room: 'Garage', who: 'Unassigned', p: 'medium', e: '🚗' },
  zones: { title: 'Label shelf zones', room: 'Garage', who: 'Jordan Lee', p: 'high', e: '🚗' },
  fixture: { title: 'Install new fixture', room: 'Kitchen', who: 'Alex Morgan', p: 'urgent', e: '🍳' },
  test: { title: 'Run leak test', room: 'Kitchen', who: 'Jordan Lee', p: 'high', e: '🍳' },
  smoke: { title: 'Replace upstairs smoke detector batteries', room: 'Master Bedroom', who: 'Unassigned', p: 'urgent', e: '🛏️' },
  gutters: { title: 'Clean garage gutters', room: 'Garage', who: 'Jordan Lee', p: 'high', e: '🚗' },
  bulbs: { title: 'Swap entry hall bulbs', room: 'Living Room', who: 'Sam Rivera', p: 'high', e: '🛋️' },
  faucet: { title: 'Replace kitchen faucet', room: 'Kitchen', who: 'Alex Morgan', p: 'urgent', e: '🍳' },
  labels: { title: 'Reset garage shelf labels', room: 'Garage', who: 'Sam Rivera', p: 'high', e: '🚗' },
  fridge: { title: 'Replace fridge water filter', room: 'Kitchen', who: 'Alex Morgan', p: 'urgent', e: '🍳' },
};
// arrival order: the five that win the Matrix land last, in a scrambled order, so the ranking is visible as a re-sort
const ORDER = ['vent', 'bins', 'table', 'linen', 'clips', 'hardware', 'laundry', 'tools', 'zones', 'fixture', 'test', 'smoke', 'gutters', 'bulbs', 'faucet', 'labels', 'fridge'];
const RANKED = ['faucet', 'fridge', 'bulbs', 'labels', 'gutters']; // The Matrix, baseline (verified live)
if (ORDER.length !== 17) throw new Error('need 17 tasks');

const BADGE = {
  urgent:
    '<span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-[oklch(0.90_0.06_28)] text-[oklch(0.36_0.14_25)] border-[oklch(0.80_0.09_26)]"><span aria-hidden="true" class="h-0 w-0 border-x-[5px] border-b-[8px] border-x-transparent border-b-current"></span><span>Urgent</span></span>',
  high: '<span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-[oklch(0.94_0.04_32)] text-[oklch(0.42_0.12_28)] border-[oklch(0.85_0.06_30)]"><span aria-hidden="true" class="text-[0.65rem] font-black leading-none">!</span><span>High</span></span>',
  medium:
    '<span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-haus-amber-soft text-haus-ink border-haus-line"><span aria-hidden="true" class="h-2.5 w-2.5 rounded-full bg-current"></span><span>Medium</span></span>',
  low: '<span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-haus-blue-soft text-haus-ink border-haus-line"><span>Low</span></span>',
};
const rowHtml = (key) => {
  const t = TASK[key];
  const rank = RANKED.indexOf(key) + 1;
  return `<div class="p-row" id="pr-${key}"><div class="dashboard-task-row flex w-full items-start gap-3 rounded-[1.1rem] px-3 py-3 text-left priority-row-${t.p}"><div class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-haus-surface text-lg shadow-[inset_0_0_0_1px_var(--haus-line)]"><span class="em">${t.e}</span><span class="num font-display text-base font-semibold text-haus-muted">${rank || ''}</span></div><div class="min-w-0 flex-1"><div class="truncate text-sm font-semibold text-haus-ink">${t.title}</div><div class="truncate text-xs text-haus-muted">${t.room} / ${t.who}</div></div><div class="flex shrink-0 flex-col items-end gap-1.5">${BADGE[t.p]}</div></div></div>`;
};

// pile geometry (canvas px)
const R = 2.7; // UI px -> canvas px for the pile
const PITCH = 72; // UI px between pile rows
const PILE_X = (CW - 327 * R) / 2;
const Y_BOTTOM = 1850; // canvas y of the newest row's bottom edge
const yc = (k) => +(Y_BOTTOM - (k + 1) * PITCH * R).toFixed(1); // container y once row k has arrived
// accelerating arrival cadence
const ARR = [];
{
  let t = 0.2;
  let step = 0.235;
  for (let k = 0; k < 17; k++) {
    ARR.push(+t.toFixed(3));
    t += step;
    step *= 0.91;
  }
}
const YC_F = yc(16);
const STACK_TOP = 690; // canvas y of the ranked stack's first row
const rankDelta = (key, r) => +(((STACK_TOP - YC_F) / R + r * PITCH) - ORDER.indexOf(key) * PITCH).toFixed(2); // UI px (container-local)

// ------------------------------------------------------------------ audio-reactive energy (fast attack, slow release)
const raw = audio.frames.map((f) => 0.6 * f.rms + 0.4 * (f.bands[0] + f.bands[1]) / 2);
let prev = 0;
const smooth = raw.map((v) => (prev = Math.max(v, prev * 0.9)));
const peak = Math.max(...smooth) || 1;
const ENERGY = smooth.map((v) => +(v / peak).toFixed(3));

// ------------------------------------------------------------------ pre-mixed SFX: the pile's ratcheting ticks
const SFXDIR = path.join(COMP, 'assets/sfx');
fs.mkdirSync(path.join(SFXDIR, 'mix'), { recursive: true });
{
  const SR = 44100;
  const pcm = execFileSync('ffmpeg', ['-v', 'error', '-i', path.join(SFXDIR, 'interface/drop_001.ogg'), '-f', 's16le', '-ac', '1', '-ar', String(SR), '-'], { maxBuffer: 1 << 24 });
  const tick = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.length / 2);
  const out = new Float32Array(Math.ceil(SR * 3.0));
  ARR.forEach((t, k) => {
    const gain = 0.32 + (0.5 * k) / 16; // tightening, never loud
    const i0 = Math.round((t - 0.2) * SR);
    for (let j = 0; j < tick.length && i0 + j < out.length; j++) out[i0 + j] += (tick[j] / 32768) * gain;
  });
  let max = 0;
  for (let i = 0; i < out.length; i++) max = Math.max(max, Math.abs(out[i]));
  max = max || 1;
  const scale = Math.min(1, 0.9 / max);
  const data = Buffer.alloc(out.length * 2);
  out.forEach((v, i) => data.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(v * scale * 32767))), i * 2));
  const hdr = Buffer.alloc(44);
  hdr.write('RIFF', 0); hdr.writeUInt32LE(36 + data.length, 4); hdr.write('WAVEfmt ', 8);
  hdr.writeUInt32LE(16, 16); hdr.writeUInt16LE(1, 20); hdr.writeUInt16LE(1, 22); hdr.writeUInt32LE(SR, 24);
  hdr.writeUInt32LE(SR * 2, 28); hdr.writeUInt16LE(2, 32); hdr.writeUInt16LE(16, 34); hdr.write('data', 36); hdr.writeUInt32LE(data.length, 40);
  fs.writeFileSync(path.join(SFXDIR, 'mix/pile-ticks.wav'), Buffer.concat([hdr, data]));
}

const SFX = [
  ['sfx-pile', 'mix/pile-ticks.wav', 0.2, 3.0, 0.5],
  ['sfx-lock', 'impact/impactSoft_medium_001.ogg', 3.68, 0.19, 0.55], // beat-locked: 3.70s
  ['sfx-fly', 'casino/card-slide-1.ogg', 3.86, 0.6, 0.2],
  ['sfx-settle', 'interface/drop_002.ogg', 4.58, 0.19, 0.3],
  ['sfx-phone-in', 'casino/card-slide-3.ogg', T.phoneIn, 0.6, 0.2],
  // 01 Who's in
  ['sfx-tap-alex', 'ui/click2.ogg', T.tapAlex, 0.06, 0.5], // beat-grid
  ['sfx-toggle', 'interface/switch_007.ogg', T.tapAlex + 0.03, 0.61, 0.2],
  ['sfx-rank1', 'interface/drop_002.ogg', T.rerank1, 0.19, 0.4], // beat-grid
  ['sfx-rank1b', 'interface/drop_003.ogg', T.rerank1 + 0.24, 0.19, 0.24],
  // 02 How long
  ['sfx-tap-set', 'interface/click_003.ogg', T.tapSettings, 0.05, 0.5], // beat-grid
  ['sfx-set-in', 'casino/card-slide-3.ogg', T.tapSettings + 0.1, 0.6, 0.14],
  ['sfx-tap-chip', 'interface/click_005.ogg', T.tapChip, 0.05, 0.5], // beat-grid
  ['sfx-chip', 'interface/select_008.ogg', T.tapChip + 0.08, 0.05, 0.4],
  ['sfx-tap-home', 'interface/click_003.ogg', T.tapHome, 0.05, 0.5], // beat-grid
  ['sfx-home-in', 'casino/card-slide-1.ogg', T.tapHome + 0.1, 0.6, 0.14],
  ['sfx-rank2', 'interface/drop_001.ogg', T.rerank2, 0.11, 0.36], // beat-grid
  ['sfx-rank2b', 'interface/drop_002.ogg', T.rerank2 + 0.25, 0.19, 0.22],
  // 03 The Matrix
  ['sfx-tap-mx', 'interface/click_003.ogg', T.tapMx, 0.05, 0.5], // beat-locked: 22.65s
  ['sfx-mx-in', 'casino/card-slide-1.ogg', T.tapMx + 0.12, 0.6, 0.14],
  ['sfx-tap-cell', 'interface/click_005.ogg', T.tapCell, 0.05, 0.5], // beat-grid
  ['sfx-sheet', 'interface/drop_003.ogg', T.tapCell + 0.12, 0.19, 0.32],
  ['sfx-sheet-out', 'casino/card-slide-3.ogg', T.sheetOut, 0.6, 0.12],
  // 04 Together
  ['sfx-tap-plan', 'interface/click_003.ogg', T.tapPlan, 0.05, 0.5], // beat-grid
  ['sfx-pl-in', 'casino/card-slide-1.ogg', T.tapPlan + 0.1, 0.6, 0.14],
  ['sfx-tap-faucet', 'ui/click2.ogg', T.tapFaucet, 0.06, 0.5], // beat-grid
  ['sfx-task-in', 'casino/card-slide-3.ogg', T.tapFaucet + 0.1, 0.6, 0.14],
  ['sfx-tap-check', 'interface/click_003.ogg', T.tapCheck, 0.05, 0.55], // beat-grid
  ['sfx-confirm', 'impact/impactBell_heavy_000.ogg', T.tapCheck + 0.09, 1.48, 0.26],
  // Ask
  ['sfx-phone-out', 'casino/card-slide-1.ogg', T.phoneOut, 0.6, 0.2],
  ['sfx-line', 'impact/impactSoft_medium_004.ogg', T.line - 0.03, 0.15, 0.5], // beat-locked: 37.38s
  ['sfx-logo', 'interface/bong_001.ogg', T.logo + 0.05, 0.13, 0.5],
].map(([id, f, st, d, v]) => [id, f, +st.toFixed(3), d, v]);
const MUSIC_VOL = {
  version: 1,
  lanes: [
    {
      target: 'volume',
      points: [
        { t: 0, v: 0 }, { t: 0.4, v: 0.18 }, { t: 3.3, v: 0.18 }, { t: 3.55, v: 0.06 }, { t: 3.68, v: 0.06 }, { t: 3.74, v: 0.32 },
        { t: DURATION - 1.7, v: 0.32 }, { t: DURATION, v: 0 },
      ],
    },
  ],
};
const audioHtml = [
  `<audio id="music-bed" src="assets/music/happy-beats-business-moves-vol-11-by-ende-dot-app.mp3" data-start="0" data-duration="${DURATION}" data-media-start="0" data-track-index="10" data-automation='${JSON.stringify(MUSIC_VOL)}'></audio>`,
  ...SFX.map(([id, file, start, dur, vol], i) => `<audio id="${id}" src="assets/sfx/${file}" data-start="${start}" data-duration="${dur}" data-track-index="${11 + i}" data-volume="${vol}"></audio>`),
].join('\n      ');

// ------------------------------------------------------------------ screens for the phone
const nav = (n) => F[n].nav;
const geoPlan = G.planning;
const lane = (i) => geoPlan[`lane-${i}`];

// home: base page = Alex out + 1h; overlays restore the 4h / Alex-in look for the first beats
const homePage = F['home-out-1h'].page.replace('fit a 1-hour session', 'fit a <span class="hr"><span class="hr4">4</span><span class="hr1">1</span></span>-hour session');
if (!homePage.includes('class="hr"')) throw new Error('Best Fit subtitle not found');
const homeOverlay = (k, html, rect, cls) => `<div class="ovl ${cls}" style="left:${rect.x}px;top:${rect.y}px;width:${rect.w}px;height:${rect.h}px">${html}</div>`;
const alexOv = homeOverlay('m-alex', F.home0.parts['m-alex'], g0['m-alex'], 'ov-alex');
const statOv = homeOverlay('stat', F.home0.parts['stat-session'], g0['stat-session'], 'ov-stat');
const bfUl = `<div class="bf-ul" style="left:${BF_UL.x}px;top:${BF_UL.y}px;width:${BF_UL.w}px;height:${Math.max(...BF.map((r) => Math.max(...r.pos.filter((p) => p != null)) + r.h))}px">${BF.map(
  (r, i) => `<div class="bf-row" id="bf-${i}" style="width:${BF_UL.w}px">${r.html}</div>`,
).join('')}</div>`;
const homeScreen = `<div class="screen" id="scr-home"><div class="pager" id="pg-home"><div class="page" id="pg-home-page">${homePage}${alexOv}${statOv}${bfUl}</div></div>${nav('home-out-1h')}</div>`;

const matrixScreen = `<div class="screen" id="scr-matrix"><div class="pager" id="pg-matrix"><div class="page">${F.matrixsheet.page}</div></div>${nav('matrixsheet')}<div class="layer" id="mx-layer">${F.matrixsheet.overlays.join('')}</div></div>`;
// Settings > "This session": the app's own control for session length and who's in. Two stacked states: 4h, then 1h.
const settingsScreen = `<div class="screen" id="scr-settings"><div class="pager" id="pg-settings"><div class="page" id="pg-set0">${F['settings-out'].page}</div><div class="page" id="pg-set1">${F['settings-out-1h'].page}</div></div>${nav('settings-out')}</div>`;
const planningScreen = `<div class="screen" id="scr-planning"><div class="pager" id="pg-planning"><div class="page">${F.planning.page}</div></div>${nav('planning')}</div>`;
const gt = G.task0;
const taskScreen = `<div class="screen" id="scr-task"><div class="pager" id="pg-task"><div class="page" id="pg-task0">${F.task0.page}<div class="hl" id="hl-wait" style="left:${gt.waiting.x - 7}px;top:${gt.waiting.y - 5}px;width:${gt.waiting.w + 14}px;height:${gt.waiting.h + 10}px"></div></div><div class="page" id="pg-task1">${F.task1.page}</div></div>${nav('task0')}</div>`;

// ------------------------------------------------------------------ timeline constants (UI px unless noted)
const gS = G['settings-out'];
const navTap = (k) => ({ x: g2[`nav-${k}`].x + g2[`nav-${k}`].w / 2, y: g2[`nav-${k}`].y + 28 }); // the icon, not the label
const SC_ALEX = +(lane(1).y - 100).toFixed(0);
const SC_TASK = 420;
const rowF = geoPlan['row-faucet'];
const tapPos = {
  alex: { x: g0['m-alex'].x + g0['m-alex'].w / 2, y: g0['m-alex'].y + g0['m-alex'].h / 2 },
  navSettings: navTap('settings'),
  chip: { x: gS['chip-1h'].x + gS['chip-1h'].w / 2, y: gS['chip-1h'].y + gS['chip-1h'].h / 2 },
  navHome: navTap('home'),
  mx: { x: MX_BTN.x, y: MX_BTN.y - SC_MX },
  cell: { x: G.matrixview['cell-high-urgent'].x + G.matrixview['cell-high-urgent'].w / 2, y: G.matrixview['cell-high-urgent'].y + G.matrixview['cell-high-urgent'].h / 2 },
  navPlan: navTap('planning'),
  faucet: { x: rowF.x + rowF.w * 0.42, y: rowF.y + rowF.h / 2 - SC_ALEX },
  check: { x: gt['check-install'].x + gt['check-install'].w / 2, y: gt['check-install'].y + gt['check-install'].h / 2 - SC_TASK },
};
const SHEET_PANEL = G.matrixsheet['sheet-panel'];

const K = {
  R, PITCH, PILE_X,
  YC0: yc(-1),
  YC: ORDER.map((_, i) => yc(i)),
  ARR,
  RANK_DELTA: Object.fromEntries(RANKED.map((k, r) => [k, rankDelta(k, r)])),
  SC_BF, SC_MX, SC_ALEX, SC_TASK,
  TAP: tapPos,
  SHEET_H: SHEET_PANEL.h,
  BF: BF.map((r) => ({ title: r.title, pos: r.pos })),
};
const PHONE_START = 6.9;
const PHONE_DUR = +(T.phoneOut + 0.7 - PHONE_START).toFixed(2);
const END_START = +(T.line - 0.25).toFixed(2);
const END_DUR = +(DURATION - END_START).toFixed(2);

const html = `<!doctype html>
<html lang="en" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${CW}, height=${CH}" />
    <title>HAUS — Start with what fits</title>
    <script src="assets/vendor/gsap.min.js"></script>
    <!-- HAUS's own production stylesheet, scoped to .hs (the phone screen) by work/build-ui.mjs -->
    <link rel="stylesheet" href="assets/ui/haus-app.css" />
    <style>
      ${FONT_FACES}
      * { box-sizing: border-box; }
      html, body { margin: 0; width: ${CW}px; height: ${CH}px; overflow: hidden; background: ${C.paper}; }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; background: ${C.paper};
        font-family: 'Figtree', sans-serif; color: ${C.ink}; -webkit-font-smoothing: antialiased; }
      .scene { position: absolute; inset: 0; }

      /* ---------- background: paper, ink, warm glow, grain ---------- */
      #bg { position: absolute; inset: 0; overflow: hidden; }
      #bg-cream { position: absolute; inset: 0; background: radial-gradient(120% 70% at 50% 0%, #fffcf7 0%, ${C.paper} 55%, #f4ecdf 100%); }
      #bg-ink { position: absolute; inset: 0; opacity: 0; background: radial-gradient(110% 70% at 50% 8%, #4a3a2f 0%, ${C.ink} 55%, #2e231c 100%); }
      #glow { position: absolute; left: ${DEV.left - 160}px; top: ${DEV.top - 40}px; width: ${DEV.w + 320}px; height: ${DEV.h + 80}px; opacity: 0; border-radius: 120px;
        background: radial-gradient(closest-side, rgba(217, 167, 103, 0.55) 0%, rgba(217, 167, 103, 0.22) 55%, rgba(217, 167, 103, 0) 100%); }
      #grain { position: absolute; inset: 0; opacity: 0.06; mix-blend-mode: multiply;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.2 0 0 0 0 0.1 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }

      /* ---------- shared typography ---------- */
      .display { font-family: 'Anybody', 'Figtree', sans-serif; font-weight: 600; letter-spacing: -0.03em; }
      .ln { display: block; }
      .hs.bare { background: none !important; min-height: 0 !important; width: auto; height: auto; }

      /* ---------- 1 · the list never ends ---------- */
      .pile-clip { position: absolute; inset: 0; overflow: hidden; --m0: 700px; --m1: 900px;
        -webkit-mask-image: linear-gradient(to bottom, transparent 0px, transparent var(--m0), #000 var(--m1)); mask-image: linear-gradient(to bottom, transparent 0px, transparent var(--m0), #000 var(--m1)); }
      #pile { position: absolute; left: 0; top: 0; width: 327px; transform-origin: 0 0; }
      .p-row { position: absolute; left: 0; top: 0; width: 327px; opacity: 0; filter: drop-shadow(0 6px 10px rgba(70, 48, 23, 0.14)); }
      .p-row .num { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; }
      .fit > * { width: 100% !important; height: 100% !important; margin: 0 !important; }
      .sc { transform-origin: 0 0; }
      .hk-eyebrow { position: absolute; left: 88px; top: 104px; font: 600 36px/1 'Figtree', sans-serif; letter-spacing: 0.16em; text-transform: uppercase; color: ${C.muted}; }
      .hk-num { position: absolute; left: 80px; top: 158px; height: 330px; width: 480px; }
      .hk-num span { position: absolute; left: 0; top: 0; font-size: 360px; line-height: 330px; color: ${C.ink}; opacity: 0; font-variant-numeric: tabular-nums; }
      .hk-h1, .hk-h2 { position: absolute; left: 88px; width: 904px; font-size: 86px; line-height: 1.04; color: ${C.ink}; white-space: nowrap; }
      .hk-h1 { top: 512px; }
      .hk-h2 { top: 612px; }
      .hk-cards { position: absolute; left: 566px; top: 150px; display: flex; gap: 14px; }
      .hc { width: 126.5px; height: 208.8px; opacity: 0; }
      .hk-stat { position: absolute; left: 566px; top: 386px; width: 177px; height: 120.6px; opacity: 0; }

      /* ---------- 2 · plan the session, not the backlog ---------- */
      .uvp-eyebrow { position: absolute; left: 0; right: 0; top: 112px; text-align: center; font: 700 34px/1 'Figtree', sans-serif; letter-spacing: 0.32em; text-transform: uppercase; color: ${C.amber}; padding-left: 0.32em; opacity: 0; }
      .uvp-h { position: absolute; left: 70px; right: 70px; top: 176px; text-align: center; font-size: 100px; line-height: 1.03; color: ${C.surface}; opacity: 0; }
      .uvp-sub { position: absolute; left: 60px; right: 60px; top: 424px; text-align: center; font: 500 42px/1.25 'Figtree', sans-serif; color: #e9dfd2; opacity: 0; }

      /* ---------- chapter rail (01-04, always visible while the phone is up) + captions ---------- */
      .rail { position: absolute; left: 88px; top: 58px; display: flex; gap: 24px; opacity: 0; }
      .rk { position: relative; display: flex; align-items: baseline; gap: 8px; padding-bottom: 14px; }
      .rk-n { font: 600 44px/1 'Anybody', 'Figtree', sans-serif; letter-spacing: -0.02em; color: ${C.railMuted}; }
      .rk-t { font: 650 23px/1 'Figtree', sans-serif; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.railMuted}; }
      .rk-u { position: absolute; left: 0; right: 0; bottom: 0; height: 4px; border-radius: 2px; background: ${C.amber}; transform-origin: 0 50%; }
      .cap { position: absolute; left: 88px; right: 88px; top: 142px; font-size: 70px; line-height: 1.04; color: ${C.ink}; opacity: 0; }

      /* ---------- phone ---------- */
      #device { position: absolute; left: ${DEV.left}px; top: ${DEV.top}px; width: ${DEV.w}px; height: ${DEV.h}px; }
      .device-body { position: absolute; inset: 0; border-radius: 66px; background: linear-gradient(150deg, #5a4a40 0%, ${C.ink} 40%, #241a14 100%);
        box-shadow: inset 0 0 0 2px rgba(255, 244, 228, 0.16), 0 60px 110px rgba(58, 45, 37, 0.38), 0 20px 40px rgba(58, 45, 37, 0.28); }
      .device-screen { position: absolute; left: ${BEZEL}px; top: ${BEZEL}px; width: ${SCREEN_W}px; height: ${SCREEN_H}px; border-radius: 52px; overflow: hidden; background: ${C.paper}; }
      .ui-scale { position: absolute; left: 0; top: 0; width: 393px; height: 852px; transform: scale(${S}); transform-origin: 0 0; }
      .hs .pager { position: absolute; left: 0; top: 0; width: 393px; }
      .hs .screen { opacity: 0; background: ${C.paper}; }
      #scr-home { opacity: 1; }
      .ovl { position: absolute; }
      #pg-home-page [data-k="ul-bestfit"] { visibility: hidden; }
      #pg-home-page [data-k="panel-bestfit"] { height: ${g0['panel-bestfit'].h}px; }
      .ovl > * { width: 100% !important; height: 100% !important; margin: 0 !important; }
      .bf-ul { position: absolute; list-style: none; }
      .bf-row > li { list-style: none; }
      .hr { position: relative; display: inline-block; }
      .hr1 { position: absolute; left: 0; right: 0; top: 0; text-align: center; }
      .hr4 { display: block; }
      .bf-row { position: absolute; left: 0; top: 0; border-radius: 1.1rem; }
      .hl { position: absolute; border-radius: 10px; opacity: 0; background: rgba(217, 167, 103, 0.22); box-shadow: 0 0 0 2px rgba(217, 167, 103, 0.95); }
      .touch { position: absolute; left: -22px; top: -22px; width: 44px; height: 44px; border-radius: 50%; opacity: 0; z-index: 90;
        background: rgba(58, 45, 37, 0.22); box-shadow: 0 0 0 2px rgba(217, 167, 103, 0.95), 0 3px 12px rgba(58, 45, 37, 0.3); }
      .glare { position: absolute; inset: 0; border-radius: 52px; background: linear-gradient(115deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 30%); pointer-events: none; }

      /* ---------- ask · start with what fits ---------- */
      #end-line { position: absolute; left: 0; right: 0; top: 880px; text-align: center; font-size: 120px; line-height: 1.03; color: ${C.ink}; opacity: 0; }
      #end-logo { position: absolute; left: 90px; top: 850px; width: 900px; height: auto; display: block; opacity: 0; }
      #end-tag { position: absolute; left: 0; right: 0; top: 1290px; text-align: center; font: italic 500 50px/1.2 'Figtree', sans-serif; color: ${C.ink}; opacity: 0; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DURATION}" data-width="${CW}" data-height="${CH}" data-fps="${FPS}">
      <div id="bg" data-layout-ignore>
        <div id="bg-cream"></div>
        <div id="bg-ink"></div>
        <div id="glow"></div>
        <div id="grain"></div>
      </div>

      <!-- issue + UVP · the pile, the numeral, the hook and the promise -->
      <section id="s-pile" class="clip scene" data-start="0" data-duration="7.9" data-track-index="1">
        <div class="pile-clip" data-layout-ignore>
          <div id="pile" class="hs bare">${ORDER.map(rowHtml).join('')}</div>
        </div>
        <div id="hk" class="hk-grp">
          <div id="hk-eyebrow" class="hk-eyebrow">Open</div>
          <div id="hk-num" class="hk-num display">${Array.from({ length: 18 }, (_, n) => `<span id="n-${n}">${n}</span>`).join('')}</div>
          <div id="hk-h1" class="hk-h1 display">The list never ends.</div>
          <div id="hk-h2" class="hk-h2 display">Saturday does.</div>
          <div id="hk-cards" class="hk-cards hs bare" data-layout-ignore>
            <div id="hc-alex" class="hc"><div class="sc fit" style="width:70.3px;height:116px;transform:scale(1.8)">${F.home0.parts['m-alex']}</div></div>
            <div id="hc-jordan" class="hc"><div class="sc fit" style="width:70.3px;height:116px;transform:scale(1.8)">${F.home0.parts['m-jordan']}</div></div>
            <div id="hc-sam" class="hc"><div class="sc fit" style="width:70.3px;height:116px;transform:scale(1.8)">${F.home0.parts['m-sam']}</div></div>
          </div>
          <div id="hk-stat" class="hk-stat hs bare" data-layout-ignore><div class="sc fit" style="width:98.3px;height:67px;transform:scale(1.8)">${F.home0.parts['stat-session']}</div></div>
        </div>
        <div id="uvp-eyebrow" class="uvp-eyebrow">HAUS</div>
        <div id="uvp-h" class="uvp-h display"><span class="ln">Plan the session,</span><span class="ln">not the backlog.</span></div>
        <div id="uvp-sub" class="uvp-sub">Ranked by what can actually get done today.</div>
      </section>

      <!-- 01-04 · the real HAUS UI, rebuilt from the live demo: one feature per chapter, cause to effect -->
      <section id="s-phone" class="clip scene" data-start="${PHONE_START}" data-duration="${PHONE_DUR}" data-track-index="2">
        <div id="rail" class="rail">
          <div id="rk-1" class="rk"><span class="rk-n">01</span><span class="rk-t">Who's in</span><span class="rk-u"></span></div>
          <div id="rk-2" class="rk"><span class="rk-n">02</span><span class="rk-t">How long</span><span class="rk-u"></span></div>
          <div id="rk-3" class="rk"><span class="rk-n">03</span><span class="rk-t">Matrix</span><span class="rk-u"></span></div>
          <div id="rk-4" class="rk"><span class="rk-n">04</span><span class="rk-t">Together</span><span class="rk-u"></span></div>
        </div>
        <div id="cap-a" class="cap display"><span class="ln">Step out, and</span><span class="ln">your jobs sink.</span></div>
        <div id="cap-b" class="cap display"><span class="ln">Only an hour?</span><span class="ln">Quick jobs rise.</span></div>
        <div id="cap-c" class="cap display"><span class="ln">Urgent × important ×</span><span class="ln">what fits.</span></div>
        <div id="cap-d" class="cap display"><span class="ln">Everyone sees</span><span class="ln">everything.</span></div>
        <div id="cap-e" class="cap display"><span class="ln">Sam preps. Alex installs.</span><span class="ln">Jordan tests.</span></div>
        <div id="device" data-layout-ignore>
          <div class="device-body"></div>
          <div class="device-screen">
            <div class="ui-scale">
              <div class="hs phone" id="ui">
                ${homeScreen}
                ${matrixScreen}
                ${settingsScreen}
                ${planningScreen}
                ${taskScreen}
                <div id="touch" class="touch"></div>
              </div>
            </div>
            <div class="glare"></div>
          </div>
        </div>
      </section>

      <!-- ask · start with what fits -->
      <section id="s-end" class="clip scene" data-start="${END_START}" data-duration="${END_DUR}" data-track-index="3">
        <div id="end-line" class="display"><span class="ln">Start with</span><span class="ln">what fits.</span></div>
        <img id="end-logo" src="assets/brand/haus-logo.png" alt="HAUS logo" />
        <div id="end-tag">Manage tasks at home, together.</div>
      </section>

      ${audioHtml}
    </div>
    <script>
      const ENERGY = ${JSON.stringify(ENERGY)};
      const K = ${JSON.stringify(K)};
      const T = ${JSON.stringify(T)};
      const ORDER = ${JSON.stringify(ORDER)};
      const RANKED = ${JSON.stringify(RANKED)};
      const STAT = '#pg-home-page [data-k="stat-row"] [data-k="stat-session"]';
      const tl = gsap.timeline({ paused: true });

      // tap ripple: amber ring + soft ink core, positioned in phone-screen (UI) px
      function tap(t, p) {
        tl.set('#touch', { x: p.x, y: p.y }, Math.max(0, t - 0.2));
        tl.fromTo('#touch', { scale: 1.5, opacity: 0 }, { scale: 0.9, opacity: 1, duration: 0.18, ease: 'power2.out', immediateRender: false }, t - 0.18);
        tl.to('#touch', { scale: 0.62, duration: 0.08, ease: 'power1.in' }, t);
        tl.to('#touch', { scale: 1.7, opacity: 0, duration: 0.3, ease: 'power2.out' }, t + 0.08);
      }
      // caption in + out (a caption names the chapter's claim and stays up through the whole result)
      function show(sel, tIn, tOut, opts) {
        const o = Object.assign({ y: 24, dIn: 0.4, dOut: 0.25 }, opts || {});
        tl.fromTo(sel, { opacity: 0, y: o.y }, { opacity: 1, y: 0, duration: o.dIn, ease: 'power3.out', immediateRender: false }, tIn);
        tl.to(sel, { opacity: 0, y: -14, duration: o.dOut, ease: 'power2.in' }, tOut);
      }
      // chapter rail: the current step is lit, the rest wait in muted ink
      function railOn(i, t) {
        tl.to('#rk-' + i + ' .rk-n', { color: '${C.amberText}', duration: 0.3, ease: 'power1.out' }, t);
        tl.to('#rk-' + i + ' .rk-t', { color: '${C.ink}', duration: 0.3, ease: 'power1.out' }, t);
        tl.fromTo('#rk-' + i + ' .rk-u', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power3.out', immediateRender: false }, t);
      }
      function railOff(i, t) {
        tl.to('#rk-' + i + ' .rk-n', { color: '${C.railMuted}', duration: 0.25, ease: 'power1.in' }, t);
        tl.to('#rk-' + i + ' .rk-t', { color: '${C.railMuted}', duration: 0.25, ease: 'power1.in' }, t);
        tl.to('#rk-' + i + ' .rk-u', { opacity: 0, duration: 0.25, ease: 'power1.in' }, t);
      }
      // cross-fade the phone from one screen to another (a nav tap, or a tap into a row)
      // the incoming screen fades in opaque on top; the outgoing one is dropped once it is fully covered
      let Z = 10;
      function goto(from, to, t, d) {
        const dur = d || 0.14; // a tab switch is near-instant in the app
        Z += 1;
        tl.set(to, { zIndex: Z }, t);
        tl.fromTo(to, { opacity: 0 }, { opacity: 1, duration: dur, ease: 'power1.inOut', immediateRender: false }, t);
        tl.set(from, { opacity: 0 }, t + dur);
      }

      // ======================= background =======================
      // paper -> ink on the 3.70 lock, back to paper as the phone arrives
      tl.to('#bg-ink', { opacity: 1, duration: 0.2, ease: 'power2.out' }, 3.68);
      tl.to('#bg-ink', { opacity: 0, duration: 0.55, ease: 'power1.inOut' }, 7.1);
      // warm light behind the phone, breathing with the music (pre-extracted energy, one keyframe per frame)
      tl.to('#glow', { opacity: 1, duration: 0.7, ease: 'power1.out' }, T.phoneIn);
      tl.to('#glow', { opacity: 0, duration: 0.5, ease: 'power1.in' }, T.phoneOut + 0.1);
      tl.to('#glow', { keyframes: ENERGY.map((v) => ({ scale: 0.97 + 0.07 * v, duration: 1 / 30, ease: 'none' })) }, 0);

      // ======================= issue · the list never ends (0.00-3.70) =======================
      tl.set('#pile', { x: K.PILE_X, y: K.YC0, scale: K.R }, 0);
      ORDER.forEach((k, i) => {
        tl.set('#pr-' + k, { y: i * K.PITCH }, 0);
        const t = K.ARR[i];
        // a row appears as it rides up into the list; the whole list rises one row per arrival
        tl.fromTo('#pr-' + k, { opacity: 0 }, { opacity: 1, duration: 0.16, ease: 'power2.out', immediateRender: false }, t);
        const dur = i < 16 ? K.ARR[i + 1] - t : 0.22;
        tl.fromTo('#pile', { y: i === 0 ? K.YC0 : K.YC[i - 1] }, { y: K.YC[i], duration: dur, ease: i < 16 ? 'none' : 'power2.out', immediateRender: false }, t);
        // counter: OPEN n
        tl.set('#n-' + i, { opacity: 0 }, t);
        tl.set('#n-' + (i + 1), { opacity: 1 }, t);
      });
      tl.set('#n-0', { opacity: 1 }, 0);
      tl.fromTo('#hk-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 0.05);
      tl.fromTo('#hk-h1', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.3);
      tl.fromTo('#hk-h2', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 2.0);
      ['#hc-alex', '#hc-jordan', '#hc-sam'].forEach((sel, i) => {
        tl.fromTo(sel, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 2.0 + i * 0.1);
      });
      tl.fromTo('#hk-stat', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 2.35);
      // freeze, then everything from the hook lifts away
      tl.to(['#hk-eyebrow', '#hk-num', '#hk-h1', '#hk-h2', '#hc-alex', '#hc-jordan', '#hc-sam', '#hk-stat'], { opacity: 0, duration: 0.15, ease: 'power2.in' }, 3.52);

      // ======================= UVP · plan the session, not the backlog (3.70-7.60) =======================
      tl.to('.pile-clip', { '--m0': '0px', '--m1': '1px', duration: 0.3, ease: 'power1.out' }, 3.6);
      const OTHERS = ORDER.map((k, i) => ({ k, i })).filter((r) => !RANKED.includes(r.k));
      OTHERS.forEach((r, n) => {
        tl.to('#pr-' + r.k, { opacity: 0, y: r.i * K.PITCH + 40, duration: 0.3, ease: 'power2.in' }, 3.72 + (OTHERS.length - 1 - n) * 0.02);
      });
      RANKED.forEach((k, r) => {
        const base = ORDER.indexOf(k) * K.PITCH;
        tl.to('#pr-' + k, { y: base + K.RANK_DELTA[k], duration: 0.78, ease: 'power3.inOut' }, 3.86 + r * 0.06);
        tl.to('#pr-' + k + ' .em', { opacity: 0, duration: 0.2, ease: 'power1.out' }, 4.55);
        tl.to('#pr-' + k + ' .num', { opacity: 1, duration: 0.2, ease: 'power1.out' }, 4.55);
      });
      tl.fromTo('#uvp-h', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 3.7); // beat-locked: 3.70s
      tl.fromTo('#uvp-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, 3.82);
      tl.fromTo('#uvp-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 4.75);
      tl.to(['#uvp-eyebrow', '#uvp-h', '#uvp-sub'], { opacity: 0, y: -18, duration: 0.3, ease: 'power2.in' }, 6.85);
      RANKED.forEach((k, r) => {
        const base = ORDER.indexOf(k) * K.PITCH;
        tl.to('#pr-' + k, { y: base + K.RANK_DELTA[k] + 380, opacity: 0, duration: 0.5, ease: 'power2.in' }, 6.9 + r * 0.04);
      });

      // ======================= phone: initial states =======================
      tl.set('#device', { y: 1700 }, 0);
      tl.set('#pg-home', { y: 0 }, 0);
      tl.set('#pg-matrix', { y: 0 }, 0);
      tl.set('#pg-set1', { opacity: 0 }, 0);
      tl.set('#pg-planning', { y: 0 }, 0);
      tl.set('#pg-task', { y: 0 }, 0);
      tl.set('#pg-task1', { opacity: 0 }, 0);
      tl.set('#mx-layer [data-k="backdrop"]', { opacity: 0 }, 0);
      tl.set('#mx-layer [data-k="sheet-panel"]', { y: K.SHEET_H }, 0);
      tl.set(STAT, { opacity: 0 }, 0);
      tl.set('#pg-home-page .hr1', { opacity: 0 }, 0);
      tl.set('.rk-u', { scaleX: 0 }, 0);
      // Best Fit rows: start where the 4h / Alex-in list has them; rows that appear later wait invisible
      K.BF.forEach((r, i) => {
        const first = r.pos.find((p) => p != null);
        tl.set('#bf-' + i, { y: r.pos[0] != null ? r.pos[0] : first + 70, opacity: r.pos[0] != null ? 1 : 0, x: 0 }, 0);
      });

      // Best Fit re-rank: leaving rows flash and exit, the rest glide to their new slot, new rows rise in
      function rerank(t0, from, to) {
        let enterN = 0;
        let moveN = 0;
        K.BF.forEach((r, i) => {
          const a = r.pos[from];
          const b = r.pos[to];
          const el = '#bf-' + i;
          if (a != null && b == null) {
            tl.to(el, { boxShadow: '0 0 0 3px rgba(217,167,103,0.95)', duration: 0.18, ease: 'power1.out' }, t0 - 0.2);
            tl.to(el, { x: -96, opacity: 0, boxShadow: '0 0 0 0px rgba(217,167,103,0)', duration: 0.4, ease: 'power2.in' }, t0);
          } else if (a != null && b != null && a !== b) {
            tl.to(el, { y: b, duration: 0.65, ease: 'power3.inOut' }, t0 + 0.12 + moveN * 0.07);
            moveN += 1;
          } else if (a == null && b != null) {
            tl.fromTo(el, { x: 0, y: b + 70, opacity: 0 }, { y: b, opacity: 1, duration: 0.55, ease: 'power3.out', immediateRender: false }, t0 + 0.3 + enterN * 0.07);
            enterN += 1;
          }
        });
      }

      // ======================= phone enters =======================
      tl.to('#device', { y: 0, duration: 0.7, ease: 'power3.out' }, T.phoneIn);
      tl.fromTo('#rail', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', immediateRender: false }, T.rail);

      // ======================= 01 · Who's in  (Home: portrait -> Best Fit) =======================
      // NAME: rail 01 + "Step out, and your jobs sink."  DO: Alex taps their own portrait  SEE: Best Fit re-ranks and holds
      railOn(1, T.rail + 0.1);
      show('#cap-a', T.capA, T.capAOut);
      tap(T.tapAlex, K.TAP.alex); // beat-grid
      tl.to('#ui .ov-alex', { opacity: 0, duration: 0.18, ease: 'power1.out' }, T.tapAlex + 0.06);
      tl.fromTo('#pg-home', { y: 0 }, { y: -K.SC_BF, duration: 0.95, ease: 'power2.inOut', immediateRender: false }, T.scroll1);
      rerank(T.rerank1, 0, 1); // beat-grid

      // ======================= 02 · How long  (Settings > This session: 1h -> Home: Best Fit) =======================
      // NAME: rail 02 + "Only an hour? Quick jobs rise."  DO: Settings tab, tap 1h  SEE: back on Home, Best Fit re-ranks and holds
      railOff(1, T.r2);
      railOn(2, T.r2 + 0.05);
      show('#cap-b', T.capB, T.capBOut);
      tap(T.tapSettings, K.TAP.navSettings); // beat-grid
      goto('#scr-home', '#scr-settings', T.tapSettings + 0.12);
      // under the Settings screen the Home page catches up: SESSION reads 1h and the page is back at the top
      tl.set('#ui .ov-stat', { opacity: 0 }, T.tapSettings + 0.6);
      tl.set(STAT, { opacity: 1 }, T.tapSettings + 0.6);
      tl.set('#pg-home', { y: 0 }, T.tapSettings + 0.6);
      tap(T.tapChip, K.TAP.chip); // beat-grid
      tl.fromTo('#pg-set1', { opacity: 0 }, { opacity: 1, duration: 0.14, ease: 'power1.out', immediateRender: false }, T.tapChip + 0.04);
      tl.set('#pg-set0', { opacity: 0 }, T.tapChip + 0.2);
      tap(T.tapHome, K.TAP.navHome); // beat-grid
      goto('#scr-settings', '#scr-home', T.tapHome + 0.12);
      tl.fromTo('#pg-home', { y: 0 }, { y: -K.SC_BF, duration: 0.95, ease: 'power2.inOut', immediateRender: false }, T.scroll2);
      rerank(T.rerank2, 1, 2); // beat-grid
      tl.to('#pg-home-page .hr4', { opacity: 0, duration: 0.2, ease: 'power1.out' }, T.rerank2 + 0.1);
      tl.to('#pg-home-page .hr1', { opacity: 1, duration: 0.2, ease: 'power1.out' }, T.rerank2 + 0.1);

      // ======================= 03 · The Matrix  (Home panel -> heatmap -> cell sheet) =======================
      // NAME: rail 03 + "Urgent × important × what fits."  DO: Open matrix view, tap the top-right cell  SEE: heatmap holds, then the sheet
      railOff(2, T.r3);
      railOn(3, T.r3 + 0.05);
      tl.fromTo('#pg-home', { y: -K.SC_BF }, { y: -K.SC_MX, duration: 0.8, ease: 'power2.inOut', immediateRender: false }, T.scroll3);
      show('#cap-c', T.capC, T.capCOut);
      tap(T.tapMx, K.TAP.mx); // beat-locked: 22.65s
      goto('#scr-home', '#scr-matrix', T.tapMx + 0.12, 0.18);
      tap(T.tapCell, K.TAP.cell); // beat-grid
      tl.to('#mx-layer [data-k="backdrop"]', { opacity: 1, duration: 0.25, ease: 'power1.out' }, T.tapCell + 0.04);
      tl.to('#mx-layer [data-k="sheet-panel"]', { y: 0, duration: 0.5, ease: 'power3.out' }, T.tapCell + 0.08);
      // the sheet is dismissed before the next chapter starts
      tl.to('#mx-layer [data-k="backdrop"]', { opacity: 0, duration: 0.35, ease: 'power1.in' }, T.sheetOut);
      tl.to('#mx-layer [data-k="sheet-panel"]', { y: K.SHEET_H, duration: 0.45, ease: 'power2.in' }, T.sheetOut);

      // ======================= 04 · Together  (Planning -> faucet -> handoff) =======================
      // NAME: rail 04 + "Everyone sees everything."  DO: Planning tab, tap the faucet  SEE: Sam / Alex / Jordan, then Install is done
      railOff(3, T.r4);
      railOn(4, T.r4 + 0.05);
      tap(T.tapPlan, K.TAP.navPlan); // beat-grid
      goto('#scr-matrix', '#scr-planning', T.tapPlan + 0.12);
      show('#cap-d', T.capD, T.tapFaucet + 0.1);
      tl.fromTo('#pg-planning', { y: 0 }, { y: -K.SC_ALEX, duration: 0.75, ease: 'power2.inOut', immediateRender: false }, T.scrollAlex);
      tap(T.tapFaucet, K.TAP.faucet); // beat-grid
      goto('#scr-planning', '#scr-task', T.tapFaucet + 0.12, 0.18);
      show('#cap-e', T.capE, T.capEOut);
      tl.fromTo('#pg-task', { y: 0 }, { y: -K.SC_TASK, duration: 0.6, ease: 'power2.inOut', immediateRender: false }, T.tapFaucet + 0.85);
      tl.fromTo('#hl-wait', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.out', immediateRender: false }, T.tapFaucet + 1.7);
      tap(T.tapCheck, K.TAP.check); // beat-grid
      tl.to('#pg-task0', { opacity: 0, duration: 0.18, ease: 'power1.inOut' }, T.tapCheck + 0.01);
      tl.fromTo('#pg-task1', { opacity: 0 }, { opacity: 1, duration: 0.18, ease: 'power1.inOut', immediateRender: false }, T.tapCheck + 0.01);
      tl.to('#rail', { opacity: 0, duration: 0.3, ease: 'power2.in' }, T.phoneOut);
      tl.to('#device', { y: 1700, duration: 0.6, ease: 'power3.in' }, T.phoneOut);

      // ======================= ask · start with what fits =======================
      tl.fromTo('#end-line', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, T.line - 0.04); // beat-locked: 36.86s
      tl.to('#end-line', { y: -320, duration: 0.55, ease: 'power3.inOut' }, T.lift);
      tl.fromTo('#end-logo', { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, T.logo);
      tl.fromTo('#end-tag', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, T.tag);

      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;
fs.writeFileSync(path.join(COMP, 'index.html'), html);
console.log('wrote index.html', html.length, 'chars');
