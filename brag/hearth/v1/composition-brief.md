# Hyperframes Composition Brief: Hearth

## Objective
Create a short launch-style brag video for Hearth, a calm shared watchlist for couples.

## Output
- Composition directory: `brag/hearth/v1/composition/`
- Rendered video: `brag/hearth/v1/brag.mp4`
- Format: landscape — 1920x1080, 30fps
- Duration: 22.6 seconds

## Source Material
- Project root: `../hearth_v2` (live demo: the app's `?mode=demo` template mode)
- Primary files read: `README.md`, `src/App.jsx`, `src/index.css`, `tailwind.config.js`, `src/views/TonightView.jsx`, `src/views/AddView.jsx`, `src/views/DecisionView.jsx`, `src/views/OnboardingView.jsx`, `src/views/components/tonight/HeroCarousel.jsx`, `src/views/components/tonight/BottomNav.jsx`, `src/components/ui/Button.jsx`, `src/config/constants.js`, `src/template/seedLibrary.js`
- Real UI capture: the live demo driven headlessly (393x852 viewport) through Tonight → Add → search "Paddington" → select 2014 film → Comfort → Light → Put on Shelf → Tonight. Each state's DOM plus the app's production stylesheet is reused, scoped to the phone screen.
- Product name: Hearth
- Tagline / strongest claim: "make deciding what to watch together feel easy and good" (README); "Gather Around" (onboarding)
- Key UI or visual moment to recreate: the Tonight screen (hero carousel + mood rails) and the "Save for Us" sheet with Vibe/Energy chips and the amber "Put on Shelf" button
- Copy that must appear verbatim:
  - Hearth / GATHER AROUND
  - A calm, shared watchlist for couples
  - Easy & Comforting · Need a Laugh · Quick Bites · Deep Dives (rail names)
  - Save for Us / Put on Shelf / Vibe / Energy (UI labels, shown in-app)

## Creative Direction
- Tone preset: polished
- Creative direction: fireside product film — warm, unhurried, with a knowing smile in the opening
- Interpretation: restrained, confident motion; long holds; soft transitions; humour only in the chat volley; warmth from amber glow and slow embers, not effects
- Angle: the nightly "what do you want to watch? / you pick" standoff, answered by Hearth; the real app sorts the shelf by mood and saves a pick together; the opening question returns and is answered in one line.
- Hook: chat volley — "what do you want to watch?" / "idk. you pick." / "you pick." / typing dots
- Outro / punchline: "what do you want to watch?" → "Paddington. It's on our shelf." → HEARTH · GATHER AROUND lockup
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign
  - Invented claims (no recommendations / algorithm claims — the app explicitly isn't a recommendation engine)

## Visual Identity
- Background: `#0c0a09` with warm radial glow (`rgba(66,40,20,…)` from the app shell, strengthened)
- Text: `#f5f5f4` headlines, `#d6d3d1` body, `#a8a29e` muted
- Accent: `#d97706` / `#f59e0b`, highlights `#fcd34d` / `#fde68a`
- Display font: the app's serif (`ui-serif`, New York on macOS)
- Body font: the app's system sans stack
- Visual references from the project: Hearth flame logo (`src/assets/hearth_vector.png`), the onboarding "HEARTH / GATHER AROUND" lockup, amber primary button, stone-950 shell with radial warm glow, poster rails, hero title logos

## Storyboard
Use the storyboard in `brag/hearth/v1/brag-plan.md` as the creative contract.

Scene summary:
1. The standoff — 3.6s — four chat bubbles: the "you pick" volley, ending on unresolved typing dots
2. Gather around — 3.4s — flame logo, HEARTH, GATHER AROUND, "A calm, shared watchlist for couples."
3. Tonight — 4.9s — phone with the real Tonight screen; hero swipe; scroll through mood rails; headline "Your shelf, sorted by mood."
4. Save for Us — 5.1s — tap Add; type "Paddington"; results; select; Comfort; Light; Put on Shelf; Collections card appears; headline "Tag the vibe. Set the energy."
5. Asked and answered — 5.6s — "what do you want to watch?" / "Paddington. It's on our shelf." then the final lockup

## Audio
- Audio role: warm bed with sparse, tactile UI accents
- Audio arc: soft intro under the hook → lift on the logo → steady bed under the app demo → fade under the lockup
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`, entered at media offset 5.0s
- Music treatment: ~0.5s fade-in, bed ≈0.3, fade-out over the last ~1.6s under the lockup
- Music cue guidance: `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`; with the 5.0s offset, strong cues at video 3.74 (logo), 8.11 (hero swipe), 12.47 (sheet settles), 13.56 (results), 14.66 (Comfort), 17.37/17.93 (outro bubbles), 19.56 (lockup); beat grid ≈0.545s from 0.34s
- Audio-reactive treatment: subtle — bass/RMS drives the background ember glow and the logo halo; no visualizer imagery
- Audio-coupled moments:
  - bubbles — soft drop per pop
  - logo — one warm soft hit, beat-locked
  - phone entrance / hero swipe — soft slide
  - typing "Paddington" — low randomized (seeded) key ticks
  - results / chip taps / Put on Shelf — soft drops, soft clicks, warm wood knock
  - lockup — one warm accent
- SFX selection guidance: low-HF-risk picks from `sfx-analysis.md` (impactSoft_medium, interface/click_00x, ui/click2, interface/drop_00x, impactWood_light/medium); keep repeated ticks quiet
- Exact SFX choice: chosen against the implemented animation
- Audio files: copied into `brag/hearth/v1/composition/assets/`

## Hyperframes Instructions
Composition-building domain skills: `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. /brag owns the creative contract; Hyperframes conventions own implementation.

Requirements:
- Show real UI from the source project (captured DOM + production CSS, scoped to the phone screen).
- Keep all text readable in the final render; captions carry the message, in-phone UI is product texture.
- Keep the video within 15-25 seconds.
- Include the music/SFX layer.
- 1-3 strong cue locks; sequential readable text not faster than every other beat.
- Use local assets only (no runtime network).
- Run `hyperframes check` before render.
- Keep creation and rendering local.
