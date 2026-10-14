# Hyperframes Composition Brief: The Daily (Hermes) — v2

## Output
- Composition: `composition/` (built from `build/index.src.html` by `build/assemble.cjs`)
- Render: `brag.mp4`, vertical 1080x1920, 24.8s

## Source material (all real, all from Friday, October 2, 2026)
- App screens: captured from the live edition at https://benwassa.github.io/Hermes/ (frozen copy, `../hermes-src/frozen.html`)
  with headless Chrome at 393x802 CSS px, 3x DPR, light mode. Taps were scripted as DOM clicks and
  scroll was set explicitly per state, so the sticky tab strip renders where the app puts it.
  Capture script: `../hermes-src/capture2.cjs`; tap and scroll geometry: `../hermes-src/shots2/geometry.json`.
- One capture-time CSS tweak: `.weather .summary > * { flex-shrink: 0 }` and `nowrap` on temp/city.
  At phone width the live app wraps "19° / 11°" onto three lines (an app bug, reported to Ben).
- Run data: GitHub Actions run 36999039795 ("Build The Daily", schedule): Toronto 07:05:07 start,
  `normalized 188 stories` (07:05:57), `gemini-2.5-flash` 200 OK (07:06:50),
  `sections=6 stories=27 following=6` (07:06:50), job 1m 49s. Notify run: push sent 07:07:02.
  No secret-bearing log lines are shown.
- Copy: PRODUCT.md ("one finite, finished paper", "the why, not just the what", "The only KPI…",
  "pushed once per day"), README ("A Voice is a person, not a publication", rank/summarize),
  template UI strings (Why it matters, Ask AI, Claude/ChatGPT, HOME TEAMS, Following).

## Device
- Drawn in CSS at scale 1.76: bezel, Dynamic Island, SF Pro status bar at 7:07, home indicator.
- Lock screen with the real ntfy push ("📰 The Daily — Oct 2" / "Today's edition is ready.").
- App states are instant cuts after each tap (as in the app); scrolls are transforms on the captured
  image, with the tab strip pinned via a background crop of the same image.

## Gate
`npx hyperframes check`: 0 errors. Remaining lint warnings are the advisory "use sub-compositions"
notes for the five scene sections.
