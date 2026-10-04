# Hyperframes Composition Brief: Hearth — v5

## Objective
Create a launch-style brag video for Hearth: one shared watchlist for every streaming service, with a private shelf for each group you watch with (couples, friends, family).

## Output
- Composition directory: `brag/hearth/v5/composition/`
- Rendered video: `brag/hearth/v5/brag.mp4`
- Format: landscape — 1920x1080, 30fps
- Duration: 40.5 seconds (v4 was also 40.5s; v3 was 37.2s. Deliberately past the 15-25s default: Ben asked for a longer hook and a slower pace in v3)

## Source Material
- Project root: `../hearth_v2` (live demo: the app's `?mode=demo` template mode)
- Primary files read: `README.md`, `src/App.jsx`, `src/index.css`, `tailwind.config.js`, `src/views/TonightView.jsx`, `src/views/AddView.jsx`, `src/views/DecisionView.jsx`, `src/views/OnboardingView.jsx`, `src/views/components/tonight/HeroCarousel.jsx`, `src/views/components/tonight/BottomNav.jsx`, `src/components/ui/Button.jsx`, `src/config/constants.js`, `src/template/seedLibrary.js`
- Real UI capture: the live demo driven headlessly (393x852 viewport) through Tonight → Add → search "Paddington" → select 2014 film → Comfort → Light → Put on Shelf → Tonight → tap Paddington (Need a Laugh rail) → details sheet. Each state's DOM plus the app's production stylesheet is reused, scoped to the phone screen.
- Rail logic verified in `src/views/TonightView.jsx`: rails are mood-based (comfort/light, focused/gripping, short shows, comedy…), daily-shuffled and de-duplicated; in the captured state Paddington lands in Need a Laugh, so that is what is shown.
- Details sheet verified in `src/components/ItemDetailsModal/components/ModalHeader.jsx`: shows the item's vibe/energy badges.
- Product name: Hearth
- Tagline / strongest claim: streaming "optimize[s] for attention, not satisfaction. Hearth does the opposite" with "a finite, human-curated library" (README); "make deciding what to watch together feel easy and good" (README); "Gather Around" (onboarding)
- Choose a Space: the demo has one space and hides the switcher, so the screen is rebuilt from `src/views/components/SpaceSwitcherModal.jsx` (`work/build-spaces.mjs`) with three stand-in space names. Space model verified in `src/services/firebase/spaces.js` (members list, several spaces per user). No per-streaming-service data exists in the app; the film claims platform-independence only and shows no service names or logos.
- Key UI or visual moment to recreate: the Tonight screen (hero carousel + mood rails) and the "Save for Us" sheet with Vibe/Energy chips and the amber "Put on Shelf" button
- Copy that must appear verbatim:
  - Hearth / GATHER AROUND
  - A shared watchlist for every streaming service
  - One watchlist for every service and everyone you watch with.
  - Which app was that on? / Doesn't matter. It's on the shelf.
  - Your people, your shelves. / Saw it anywhere? / Pick by mood. (captions)
  - Easy & Comforting · Need a Laugh · Quick Bites (rail names)
  - Save for Us / Put on Shelf / Comfort / Light (UI labels, shown in-app)

## Creative Direction
- Tone preset: polished
- Creative direction: fireside product film — warm, unhurried, with a knowing smile in the opening
- Interpretation: cold, fast hook (the only frantic motion) → decisive stop → warm, unhurried amber for everything after; restrained, tactile UI motion; warmth from amber glow and slow embers, not effects
- Angle: which app was that on? doesn't matter, it's on the shelf — one shared watchlist across every streaming service, one shelf per group you watch with (who: Spaces → what: save + tag → when: pick by mood); a clock ties hook to payoff.
- Hook: endless poster feed, accelerating, + clock 9:12 → 11:00 PM in 3-minute steps + "Still scrolling." (7.1s; the feed stops dead on 11:00 with a ~1s hold)
- Outro / punchline: "9:04 PM — Already watching." → HEARTH · GATHER AROUND · "One watchlist for every service and everyone you watch with."
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
Use the storyboard in `brag/hearth/v5/brag-plan.md` as the creative contract.

Scene summary:
1. Still scrolling — 7.5s — endless poster feed accelerating, clock ticking 9:12 → 11:00 PM, "Still scrolling.", a held beat on 11:00
2. It's on the shelf — 6.9s — feed freezes, ten posters form one shelf, "Which app was that on?" / "Doesn't matter. It's on the shelf." (drop), Hearth flame + "A shared watchlist for every streaming service."
3. Spaces — 3.9s — the real Choose a Space screen, tap Living Room; "Your people, your shelves."
4. Save for Us — 9.5s (every gesture two beats after the last) — Add → Paddington → Comfort + Light → Put on Shelf; "Saw it anywhere?"
5. Pick by mood — 9.1s — Tonight (new collection card, then the mood rails, two scroll stops), tap Paddington in Need a Laugh, details sheet with COMFORT · LIGHT; "Pick by mood." / "Plain categories, built from the tags you set." → "Every title shows the tags behind it."
6. Already watching — 6.4s — "9:04 PM — Already watching." then the final lockup

## Audio
- Audio role: tension → release, then warm bed with tactile UI accents
- Audio arc: tick ratchet over a quiet bed → near-silence at the freeze → music drop on "Doesn't matter. It's on the shelf." → steady bed under the demo → fade under the lockup
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`, entered at media offset 0.5457s (one beat in; drop at media 8.7423s → video 8.197s)
- Music treatment: ~0.2 under the hook, ~0.07 from the freeze until just before the drop, ~0.36 from the drop, fade over the last 2.2s; delivered at −16 LUFS (two-pass loudnorm)
- Music cue guidance: see brag-plan.md; every cue is a beat index off the drop (8.197 + k × 0.5457s): 8.20 (shelf + "Doesn't matter. It's on the shelf."), 21.84 (Put on Shelf), 27.84 (tap Paddington), 33.84 (lockup)
- Audio-reactive treatment: subtle — bass/RMS drives the ember glow; no visualizer imagery
- SFX: pre-mixed tick ratchet (interface/click_002, one tick per clock step at the times in work/clock-steps.json, seeded gain jitter, loudest on 11:00) plus a soft thud as the feed stops; impactWood_light on the shelf and on Put on Shelf; interface clicks on taps; keyboard ticks; interface drops; one clock tick at the payoff; bong on the lockup
- Audio files: copied into `brag/hearth/v5/composition/assets/`

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
