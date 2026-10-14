# Composition Brief: The Daily (Hermes) — v5

- Source: `work/index5.src.html` → `composition/index.html` via `work/assemble5.cjs` (fills beat-grid
  section times, inlines RMS, icons and SFX clips). Copied from v4 and edited; v4 is untouched.
- Screens: real captures of the frozen Oct 2 edition via `work/capture5.cjs` (served from `work/states/`,
  git-ignored). Front, Toronto, World, Sports, Business and the dark front are full-page shots at rest;
  the tab pages are cropped from the tab strip down (`*_scroll.png`, strip at the top) so the page can
  scroll under a pinned copy of the strip. Weather is collapsed except in the Weather state. Business
  open/ask and Opinion are v4's captures; Voices is re-captured full length. One DOM edit: the Blue Jays
  placeholder time is removed (see `brag-plan.md`).
- Scrolling: `scroller()` / `scrollTo()` drive a proxy that sets the page image's translateY and shows the
  `.pin` tab-strip crop once it would have stuck. Camera pans (`move()`, `drift()`) cover the rest of the
  page where real scroll range is tiny.
- Problem act: three abstract phone feeds (seeded-RNG skeleton rows, deterministic), not real apps.
- Timing: `A(n)` intro grid, `G(k)` groove grid (from the 8.73s drop).
- Audio: `work/build_bed.sh` builds the bed (vol-10, -6 dB, 0.8s fade-in, 1.0s fade-out, 12-bar jump back at
  52.4s because the track is 60s); `work/rms.py` makes the glow curve. SFX on feeds, taps, pushes, toggle.
  Master -16.0 LUFS, peak -2.0 dBFS. Poster = front page at 21.0s, baked as frame 0.
- Gate: `hyperframes check` 0 errors (advisory lint warnings only), WCAG contrast 17/17.

## Rebuild recipe

```bash
(cd work/states && python3 -m http.server 8791 &) ; (cd work && node capture5.cjs)
# crop tab pages from the tab strip down (tabsNatural 153pt = 459px at 3x), e.g.
ffmpeg -i work/states/toronto_full.png -vf "crop=1179:ih-459:0:459" composition/assets/app/toronto_scroll.png
(cd work && ./build_bed.sh && python3 rms.py ../composition/assets/music/bed-mix.wav rms-v5.json && node assemble5.cjs)
(cd composition && npx hyperframes check && npx hyperframes render --quality high --output ../work/brag-raw.mp4)
ffmpeg -ss 21.0 -i work/brag-raw.mp4 -frames:v 1 -q:v 2 brag.jpg
ffmpeg -i work/brag-raw.mp4 -i brag.jpg -filter_complex "[0:v][1:v]overlay=0:0:enable='eq(n,0)'[v];[0:a]volume=4.6dB,alimiter=limit=0.76:attack=5:release=60:level=disabled[a]" \
  -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart brag.mp4
```
