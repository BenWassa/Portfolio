# Composition Brief: The Daily (Hermes) — v4

- Source: `work/index4.src.html` → `composition/index.html` via `work/assemble4.cjs` (fills beat-grid
  section times, inlines RMS, icons and SFX clips). Copied from v3 and edited; v3 is untouched.
- Screens: the same real captures of the live Oct 2 edition as v3 (`work/capture3.cjs`,
  `capture3b.cjs`; geometry in `work/states/geometry.json`, which is git-ignored). No new captures.
- Problem act: three abstract phone feeds (skeleton rows from a seeded RNG, so renders are
  deterministic), scrolled with `power1.in` so they accelerate; deliberately not real apps or logos.
- Device: drawn at 1pt = 1px; camera rig (`fit()` / `at()` / `drift()`) frames regions of the screen into
  the box below an opaque caption band. The phone is offstage until the push. Status-bar clock is a 6x
  SF Pro PNG.
- Timing: `A(n)` = intro grid (problem act), `G(k)` = groove grid (from the 8.73s drop). Taps and
  scene changes sit on `G()` beats; captions swap with each tap.
- Audio: `work/rms.py` and a one-line ffmpeg recipe rebuild the bed: vol-10 from 0s, -6 dB, 0.8s fade-in,
  1.0s fade-out (`bed-mix.wav`, git-ignored). SFX on feeds, taps, pushes, toggle. Final master matches
  v3: -16.0 LUFS, peak -2.1 dBFS (v3 measured -1.8). Poster baked as frame 0.
- Gate: `hyperframes check` 0 errors (advisory lint warnings only), WCAG contrast 17/17.

## Rebuild recipe

```bash
# bed (from the /brag skill's assets/music), then RMS for the glow
ffmpeg -t 48.57 -i happy-beats-business-moves-vol-10-by-ende-dot-app.mp3 \
  -af "volume=-6dB,afade=t=in:st=0:d=0.8,afade=t=out:st=47.57:d=1.0" -ar 48000 -ac 2 composition/assets/music/bed-mix.wav
python3 work/rms.py composition/assets/music/bed-mix.wav work/rms-v4.json
node work/assemble4.cjs && (cd composition && npx hyperframes check && npx hyperframes render --quality high --output ../work/brag-raw.mp4)
# poster = Front page frame at 20.4s, baked as frame 0; master +4.7 dB through a limiter (-16.0 LUFS / -2.1 dBFS)
ffmpeg -ss 20.4 -i work/brag-raw.mp4 -frames:v 1 -q:v 2 brag.jpg
ffmpeg -i work/brag-raw.mp4 -i brag.jpg -filter_complex "[0:v][1:v]overlay=0:0:enable='eq(n,0)'[v];[0:a]volume=4.7dB,alimiter=limit=0.76:attack=5:release=60:level=disabled[a]" \
  -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart brag.mp4
```
