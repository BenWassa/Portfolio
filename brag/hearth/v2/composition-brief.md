# Hyperframes Composition Brief: Hearth — v2

## Objective
Create a short launch-style brag video for Hearth, a calm shared watchlist for couples.

## Output
- Composition directory: `brag/hearth/v2/composition/`
- Rendered video: `brag/hearth/v2/brag.mp4`
- Format: landscape — 1920x1080, 30fps
- Duration: 22.2 seconds

## Source Material
- Project root: `../hearth_v2` (live demo: the app's `?mode=demo` template mode)
- Primary files read: `README.md`, `src/App.jsx`, `src/index.css`, `tailwind.config.js`, `src/views/TonightView.jsx`, `src/views/AddView.jsx`, `src/views/DecisionView.jsx`, `src/views/OnboardingView.jsx`, `src/views/components/tonight/HeroCarousel.jsx`, `src/views/components/tonight/BottomNav.jsx`, `src/components/ui/Button.jsx`, `src/config/constants.js`, `src/template/seedLibrary.js`
- Real UI capture: the live demo driven headlessly (393x852 viewport) through Tonight → Add → search "Paddington" → select 2014 film → Comfort → Light → Put on Shelf → Tonight → tap Paddington (Need a Laugh rail) → details sheet. Each state's DOM plus the app's production stylesheet is reused, scoped to the phone screen.
- Rail logic verified in `src/views/TonightView.jsx`: rails are mood-based (comfort/light, focused/gripping, short shows, comedy…), daily-shuffled and de-duplicated; in the captured state Paddington lands in Need a Laugh, so that is what is shown.
- Details sheet verified in `src/components/ItemDetailsModal/components/ModalHeader.jsx`: shows the item's vibe/energy badges.
- Product name: Hearth
- Tagline / strongest claim: streaming "optimize[s] for attention, not satisfaction. Hearth does the opposite" with "a finite, human-curated library" (README); "make deciding what to watch together feel easy and good" (README); "Gather Around" (onboarding)
- Key UI or visual moment to recreate: the Tonight screen (hero carousel + mood rails) and the "Save for Us" sheet with Vibe/Energy chips and the amber "Put on Shelf" button
- Copy that must appear verbatim:
  - Hearth / GATHER AROUND
  - A calm, shared watchlist for couples
  - Make deciding what to watch together feel easy and good
  - Easy & Comforting · Need a Laugh · Quick Bites (rail names)
  - Save for Us / Put on Shelf / Comfort / Light (UI labels, shown in-app)

## Creative Direction
- Tone preset: polished
- Creative direction: fireside product film — warm, unhurried, with a knowing smile in the opening
- Interpretation: cold, fast hook (the only frantic motion) → decisive stop → warm, unhurried amber for everything after; restrained, tactile UI motion; warmth from amber glow and slow embers, not effects
- Angle: you don't need more options, you need yours — the endless feed vs. the couple's own finite shelf; cause (save + tag) → effect (pick by mood); a clock ties hook to payoff.
- Hook: endless poster feed + clock 9:12 → 9:47 + "Still scrolling."
- Outro / punchline: "9:04 PM — Already watching." → HEARTH · GATHER AROUND · "Make deciding what to watch together feel easy and good."
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
Use the storyboard in `brag/hearth/v2/brag-plan.md` as the creative contract.

Scene summary:
1. Still scrolling — 3.4s — endless poster feed, ticking clock, "Still scrolling."
2. You need yours — 3.9s — feed freezes, ten posters form one shelf, "You don't need more options." / "You need yours." (drop), Hearth flame + tagline
3. Save for Us — 5.2s — Add → Paddington → Comfort + Light → Put on Shelf; "Saw one you'd both love?"
4. Pick by mood — 4.5s — Tonight rails, tap Paddington in Need a Laugh, details sheet with COMFORT · LIGHT; "Pick by mood, not by menu."
5. Already watching — 5.2s — "9:04 PM — Already watching." then the final lockup

## Audio
- Audio role: tension → release, then warm bed with tactile UI accents
- Audio arc: tick ratchet over a quiet bed → near-silence at the freeze → music drop on "You need yours." → steady bed under the demo → fade under the lockup
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`, entered at media offset 4.14s (drop at media 8.74s → video 4.60s)
- Music treatment: ~0.2 under the hook, ~0.08 at the freeze, ~0.36 from the drop, fade over the last ~1.6s
- Music cue guidance: see brag-plan.md; locks at 4.60 (shelf + "You need yours."), 12.24 (Put on Shelf), 14.96 (tap Paddington), 18.79 (lockup)
- Audio-reactive treatment: subtle — bass/RMS drives the ember glow; no visualizer imagery
- SFX: pre-mixed tick ratchet (interface/click_002, one tick per clock minute, seeded gain jitter); impactWood_light on the shelf and on Put on Shelf; interface clicks on taps; keyboard ticks; interface drops; one clock tick at the payoff; bong on the lockup
- Audio files: copied into `brag/hearth/v2/composition/assets/`

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
