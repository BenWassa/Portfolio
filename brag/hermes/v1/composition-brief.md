# Hyperframes Composition Brief: The Daily (Hermes)

## Objective
Create a short launch-style brag video for The Daily, the product built in the `Hermes` repo.

## Output
- Composition directory: `composition/`
- Rendered video: `brag.mp4`
- Format: vertical — 1080x1920 (the product is a phone-first newspaper)
- Duration: 22.4s

## Source Material
- Project root: `~/Github Repos/Hermes`
- Primary files read: `README.md`, `PRODUCT.md`, `DESIGN.md`, `template/index.template.html`, `data/latest.json` (sample edition), `.github/workflows/build.yml`, `.github/workflows/notify.yml`
- Product name: The Daily
- Strongest claim: "an autonomous overnight pipeline that assembles a personalized Toronto morning newspaper"
- Key UI moment to recreate: masthead + weather strip + section tabs + lead story card expanding to "Why it matters"
- Copy used verbatim or trimmed from the project:
  - "THE DAILY", tagline "Toronto · World · Sports · Business · Opinion" (template masthead)
  - Pipeline stage names: fetch, normalize, curate (Gemini), render, deploy, notify (README pipeline)
  - 05:17 America/Toronto (build.yml primary cron)
  - "The Daily — Jul 22" / "Today's edition is ready." (notify.yml ntfy push)
  - Business stories, kickers, subs, times, summary and analysis (sample edition, `data/latest.json`; first sentence of analysis only)
  - "one finite, finished paper"; "no second user … no engagement metric" (PRODUCT.md)
- Stories deliberately avoided: anything flagged sensitive or about crime/abuse in the sample edition.

## Creative Direction
- Tone preset: default
- Creative direction: quiet clockwork broadsheet, deadpan
- Interpretation: restrained motion, serif type, generous holds; the humor is the product's own restraint.
- Hook: "5:17 AM / America/Toronto / The paper is being written."
- Outro: "One finite, finished paper." → "No second user. No engagement metric."
- Avoid: generic SaaS language, abstract filler, redesigning the product UI.

## Visual Identity
- Background: #151a22 (The Daily's dark "lamplight edition" paper) with a navy radial glow
- Paper: #faf8f3; ink #17130d; navy #1a2744; masthead red #8b1a1a; tints #f2ede4 / #ece6da
- Display/body font: Georgia (bundled locally from the system so Hyperframes doesn't substitute it)
- Label font: Arial bold, letterspaced (bundled locally)

## Storyboard
1. Clock hook — 0–3.5s — "5:17 AM", "America/Toronto", "The paper is being written."
2. Pipeline — 3.5–8.0s — six stages check off on the beat grid, full list held.
3. Push — 8.0–10.9s — ntfy notification lands on beat 8.73.
4. The paper — 10.9–18.0s — phone UI; cursor taps the lead card on beat 13.11; the stories below slide down (accordion) to reveal the summary and "Why it matters".
5. Outro — 18.0–22.4s — masthead, then the two closing lines locked to strong cues 18.55 and 20.19.

## Audio
- Music: `happy-beats-business-moves-vol-10-by-ende-dot-app.mp3` (≈110 BPM), 0.55 gain, fade to 0 from 21.3s.
- Cue source: bundled preset; strong cues used at 18.55 and 20.19; beat grid used for pipeline rows (4.10 … 6.82), notification (8.73) and tap (13.11).
- Audio-reactive: subtle. The music's RMS was precomputed with ffmpeg at 10 Hz and drives the background glow's scale/opacity. (The `hyperframes-creative` helper isn't installed here, so extraction was done locally.)
- SFX: `ui/click2` on each pipeline row, `interface/bong_001` on the push, `interface/click_003` on the tap, `impact/impactSoft_medium_001` under each closing line.

## Check result
`npx hyperframes check` passes with 0 errors. Remaining warnings are advisory: five "use sub-compositions" lint notes, and three contrast notes on story text scrolled below the phone's clipped bottom edge (measured against the dark background, not visible in frame).
