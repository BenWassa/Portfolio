# Hyperframes Composition Brief: HAUS — v1

## Objective

Create a short launch-style brag video for HAUS: a phone-first shared household task manager that ranks every job by urgency × importance × what actually fits today. The spine is Issue → UVP → proof (the inputs, the answer) → collaboration → ask (see `brag-plan.md`).

## Output

- Composition directory: `brag/haus/v1/composition/`
- Rendered video: `brag/haus/v1/brag.mp4`
- Format: vertical — 1080x1920, 30fps
- Duration: 25.0s

## Source Material

- Project root: `../HAUS` (sibling repo, read-only). Source of truth for UI is the **public demo** at https://benwassa.github.io/HAUS/ (seeded fake household, no sign-in, no backend). No `.env` or service-account file was read.
- Primary files read: `README.md`, `PRODUCT.md`, `DESIGN.md`, `src/components/{Dashboard,PlanningView,MatrixView,MatrixCellSheet,TaskDetail,SignIn,Onboarding,Settings,BottomNav}.jsx`, `src/components/ui/{TaskRow,PriorityBadge,Avatar}.jsx`, `src/lib/scoring.js`, `src/demo/demoStore.js`, `docs/DEMO.md`; Portfolio `src/js/project-descriptions.ts` (haus entry).
- Product name: HAUS
- Tagline / strongest claim: "Shared household tasks, ranked by what can actually get done today." / "HAUS plans housework around the session, not the backlog."
- Key UI or visual moments to recreate (all rebuilt from the live demo's real DOM + production stylesheet, not redrawn):
  - Home: stat cards (OPEN 17 / DONE 4 / SESSION 4h), "Who's in right now" portraits, the Most Urgent / Best Fit / The Matrix panels
  - Best Fit re-ranking when Alex leaves the session, then when SESSION goes 4h → 1h
  - The Matrix panel and the importance × urgency heatmap, with the high × urgent bottom sheet ("3 tasks")
  - Settings: Members (4) and the invite code `DEMO42`
  - Planning, By person lanes
  - The faucet task: Prep (Sam ✓) → Install (Alex) → Test (Jordan, "Waiting on Install"), then Install completed
- Copy that must appear verbatim:
  - "The list never ends." / "Saturday does."
  - "Plan the session, not the backlog." / "Ranked by what can actually get done today."
  - "Step out, and your jobs sink." / "Only an hour? Quick jobs rise."
  - "Urgent × important × what fits."
  - "Join with a code." / "Everyone sees everything." / "Sam preps. Alex installs. Jordan tests."
  - "Start with what fits." / "Manage tasks at home, together."
  - Chapter markers: 01 Who's in · How long / 02 The Matrix / 03 Together

## Creative Direction

- Tone preset: `polished`
- Creative direction: "The Shared House Ledger", a calm editorial product film. The only frantic motion is the hook's pile-up; the turn is a decisive stop; everything after is unhurried and tactile.
- Interpretation: restraint is the brand (PRODUCT.md: trustworthy, organised, shared; editorial restraint). No chore-chart cutesiness, no SaaS-dashboard language, no gamified flourish (the app's "Task complete!" fireworks are deliberately not used).
- Angle: The backlog is infinite. Your Saturday isn't. Same list, different Saturday, different order, verified in the live app.
- Hook: the real 17 open tasks pour in on an accelerating cadence while OPEN counts to 17; "The list never ends." then "Saturday does." with three lit portraits and SESSION 4h.
- Outro / punchline: "Start with what fits." then the stone-and-paper HAUS logo and the app's own line, "Manage tasks at home, together."
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign
  - Claiming live multi-device sync on screen (the demo is single-device)

## Visual Identity

- Background: House Paper `#fbf6ee` (UVP scene inverts to Ledger Ink `#3a2d25`)
- Text: Ledger Ink `#3a2d25`; muted `#7e7269`; marker numerals `#703f0e` (accessible amber)
- Accent: House Amber `#d9a767` (rules, rings, highlights only; never text on paper)
- Display font: Anybody 600 (tight tracking); body font: Figtree (both shipped locally in `assets/fonts/`)
- Visual references from the project: Best Fit / Matrix panels, the heatmap, the phased faucet task, the HAUS logo (slate letters cut from paper)

## Storyboard

Use the storyboard in `brag-plan.md` as the creative contract.

Scene summary:

1. The list never ends — 0.0-3.7s — real task rows pour in; OPEN counts to 17; "The list never ends." / "Saturday does."; 3 portraits + SESSION 4h
2. Plan the session, not the backlog — 3.7-7.6s — ink canvas; the pile collapses to the five that win, re-sorted into a ranked stack; headline + sub
3. 01 Who's in · How long — 7.6-13.6s — phone on Home; Alex steps out (tap) and their jobs leave Best Fit; SESSION flips 4h → 1h and quick jobs rise
4. 02 The Matrix — 13.6-17.0s — Open matrix view; heatmap; tap the top-right cell; sheet "3 tasks"
5. 03 Together — 17.0-22.5s — invite code `DEMO42`; Planning By person; the faucet handoff clears "Waiting on Install"
6. Start with what fits — 22.5-25.0s — line, then HAUS logo and tagline

## Audio

- Audio role: tension → release → warm bed. Quiet bed and tightening soft ticks under the pile-up; a one-beat dip at the stop; music steps up at the UVP and stays calm; tactile UI accents carry the product scenes.
- Audio arc: ratcheting ticks → stop → lift → clicks and soft drops → one confirm → one bell.
- Music: `happy-beats-business-moves-vol-11-by-ende-dot-app.mp3` (114.84 BPM), media start 0.
- Music treatment: ~0.18 under the hook, dip to 0.06 at 3.55-3.68, lift to 0.32 at 3.74, steady, fade from 23.7s to the end (volume lane on the `<audio>` clip).
- Music cue guidance: bundled preset `happy-beats-business-moves-vol-11-by-ende-dot-app.music-cues.json` (strong cues 3.70, 9.50, 17.91, 22.65). Locks used: 3.70 (UVP headline), 9.50 (Best Fit re-rank), 17.91 (Copy tap), 22.65 (closing line). Sequential beats on the grid: 8.44 (tap), 12.12 (re-rank), 14.22 and 15.28 (matrix taps), 18.96 / 19.49 / 20.02 (lane glide), 21.59 (✓ tap). Each marked `// beat-locked` or `// beat-grid` in the script/SFX table.
- Audio-reactive treatment: subtle; per-frame music energy (`work/audio-data.json`, 30fps) breathes the warm amber light behind the phone. No waveform or equalizer imagery.
- Audio-coupled moments:
  - Pile-up — row arrivals — pre-mixed tightening tick bed (`assets/sfx/mix/pile-ticks.wav`, 17 hits on the exact arrival times)
  - The stop and the closing line — soft impacts on the beat-locked cues
  - Portrait tap, matrix taps, Copy, ✓ — clicks matched to the tap ripple
  - Best Fit re-ranks — soft drops as rows land
  - Install ✓ — one soft bell
  - Logo — one bong
- SFX selection guidance: warm, low high-frequency-risk files from `sfx-analysis.md` (`interface/drop_*`, `interface/click_*`, `ui/click2`, `impactSoft_medium_*`, `casino/card-slide-*` kept very quiet for phone moves, `impactBell_heavy_000` at low gain, `bong_001`).
- Exact SFX choice: see the `SFX` table in `work/build-composition.mjs` (id, file, start, duration, volume; 27 clips on distinct tracks).
- Audio files: copied into `composition/assets/` (music is gitignored for every version).

## Hyperframes Instructions

Domain skills used: `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. /brag is its own workflow; the `hyperframes` entry-point intent interview was not entered.

Requirements:

- Real HAUS UI on screen in every product scene (rebuilt from the live demo's DOM and production stylesheet by `work/capture.mjs` → `work/build-ui.mjs`; geometry for taps and camera moves is measured on the rebuilt screens).
- All text readable at its planned hold (see the plan's pacing map).
- 25.0s, inside the 15-25s window.
- Music + SFX layer included.
- `hyperframes check` passes before render (0 errors; 16/16 text checks pass WCAG AA).
- Demo-only chrome removed from the captured screens: the DEMO banner (Home), the demo readouts (Planning) and the "Demo data" / reset buttons (Settings).
- Creation and rendering are local.
