# Composition Brief: The Daily (Hermes) — v3

- Source: `build/index3.src.html` → `composition/index.html` via `build/assemble3.cjs`
- Screens: real captures of the live Oct 2 edition (`../hermes-src/capture3.cjs`, `capture3b.cjs`;
  geometry in `../hermes-src/shots3/geometry.json`). Front page at 6x for the macro; others 3x.
  Tall states with a sticky tab strip are captured full-page at rest and cropped (a taller-than-
  viewport clip makes Chrome re-scroll and paints the sticky bar mid-image).
- Capture-time tweak: weather strip nowrap/no-shrink (app bug, reported). Opinion captured at the
  section top that `selectTab()` intends (its `offsetTop` scroll is a bug when the bar is stuck).
- Device: drawn at 1pt = 1px; a camera rig (`fit()` / `at()`) frames regions of the screen into the
  box below an opaque caption band. Status-bar clock is a 6x SF Pro PNG.
- Audio: bed-mix.wav (bundled vol-10, -6 dB, fade baked), SFX on taps/pushes/toggle; final master
  -16.0 LUFS / -1.8 dBTP after a gentle limiter. Poster = hook frame at 2.2s, baked as frame 0.
- Gate: `hyperframes check` 0 errors (advisory lint warnings only).
