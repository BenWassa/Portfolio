# Brag Plan: Hearth — v3

## What changed from v2, and why
Ben's review of v2: **"Still scrolling" ended too soon — use more time, run the clock until 11 PM — and the whole piece was a bit too fast; slow it down to explore a bit more.** v2's hook gave the endless scroll 3.4s (clock 9:12 → 9:47 at a constant 13 ticks/s), so the viewer never felt the time draining, and the app demo moved one beat per action, too quickly to read.

v3 keeps v2's angle, copy, captured UI and privacy stand-ins exactly. It only re-times the film:

- **The hook is 7.1s, not 3.4s.** The clock runs **9:12 → 11:00 PM** in 3-minute steps (36 ticks). The tick rate climbs from ~3.5/s to ~9/s, so the minutes visibly pick up speed. The feed starts moving on frame 0 and accelerates steadily, each column at its own pace (parallax). The last tick lands on **11:00 PM** (6.0s) and the feed stops dead. A full second holds on "Still scrolling." at 11:00 PM before the turn.
- **Every gesture is two beats (~1.1s) after the last** (v2: one beat). Typing is ~0.1s/char (v2 0.06), result rows cascade 0.1s apart, camera pushes take 0.8s, and each tag tap has its own beat to land and be read.
- **Tonight now explores.** Two unhurried scroll stops: first the new Paddington *Collections* card the save just created plus the first rail, then down to the mood rails. Rail names echo two beats apart (v2: one beat, which broke the "no faster than every other beat" rule). The details sheet holds ~1.6s on COMFORT · LIGHT and "If started now 10:39 PM".
- **The payoff breathes.** "9:04 PM" holds 2.2s and "Already watching." 1.9s before the lockup (v2: 0.55s). The lockup holds 3.4s.
- **Music re-anchored.** Music now starts at media 0.55s (v2: 4.14s) so the bass drop (media 8.74s) lands at video 8.20s on "You need yours.". Every cue is a beat index off that drop (`g(k)` in `work/build-composition.mjs`), so the film stays beat-locked at the new length.
- **Length: 22.2s → 37.2s.** Deliberately past the /brag default of 15–25s, at Ben's request. v2 remains the short cut if a platform needs one.
- The "9:04 PM" payoff still works against a hook that now ends at 11:00 PM: Hearth gets you watching *before* the scrolling would even have started (9:12), and 9:04 + 1h35 runtime = the details sheet's 10:39 PM.

## What is this app?
Hearth is a calm, shared watchlist for couples: a private, finite shelf of movies and shows the two of you saved, tagged by vibe and energy, so choosing what to watch tonight is quick and pleasant instead of a forty-minute scroll.

## The angle
**You don't need more options. You need yours.** Endless choice is the problem. Hearth answers it with the shelf you two already picked, sorted by how you feel tonight.

## Hook (first 7 seconds)
An endless wall of posters scrolls upward like a streaming feed that never ends, speeding up. A clock ticks from 9:12 PM toward 11:00 PM. One line: **"Still scrolling."** At 11:00 PM the feed stops dead and the line holds.

## Key moments (the middle)
- **The turn.** The feed dissolves; ten posters drop into a single warm shelf. "You don't need more options." / **"You need yours."** (on the music's drop). Hearth flame + HEARTH + *A calm, shared watchlist for couples.*
- **Save for Us (cause).** Real app: tap Add → "Paddington" → select the 2014 film → tap **Comfort**, tap **Light** → **Put on Shelf**. Caption: "Saw one you'd both love?" / "Save it for us, and tag the mood."
- **Tonight (effect).** Real app: back on Tonight, the new Paddington collection card is waiting; scroll to the mood rails; tap Paddington in *Need a Laugh*; its details sheet opens showing **COMFORT · LIGHT** (the tags just set) and "If started now 10:39 PM". Caption: "Pick by mood, not by menu."

## Outro / punchline
The clock returns: **9:04 PM — "Already watching."** Final lockup: flame, HEARTH, GATHER AROUND, *Make deciding what to watch together feel easy and good.* (README, verbatim).

## User flow worth showing
Save for Us (search → select → Vibe: Comfort, Energy: Light → Put on Shelf) → Tonight (new collection card, mood rails) → tap the title → details with its mood tags.

## Tone
- Preset: `polished`
- Creative direction: fireside product film, with a cold/warm contrast: the hook is cold, blue-lit (screen glow) and accelerating; everything from "You need yours." on is warm, unhurried amber.
- Interpretation: the only urgent motion is the hook feed, now long enough to feel; the turn is a decisive stop; the app demo is calm, tactile and given room.

## Format: landscape — 1920x1080, 30fps
## Duration: 37.2s

## Visual identity (from the project)
- Background `#0c0a09`, warm radial glow `rgba(66,40,20,…)`; hook adds a cool screen-glow tint that fades through the turn
- Accent amber `#d97706` / `#f59e0b`, highlights `#fcd34d` / `#fde68a`
- Text `#f5f5f4` / `#d6d3d1` / `#a8a29e`
- Display: the app's `ui-serif` (New York); body: system sans; clock: system sans, tabular numerals
- Strongest visuals: real posters from the demo shelf, the real Save for Us sheet, Tonight rails, the details sheet with Comfort/Light badges, the Hearth flame

## Share copy (draft)
Almost two hours of scrolling, nothing watched. So I built Hearth: a calm, shared watchlist for couples. Save picks for each other, tag the mood, and choose from your own shelf by how you feel tonight.

## Audio direction
- Role: tension → release. An accelerating tick ratchet over a quiet bed in the hook; near-silence for the hold on 11:00 PM; the music's drop lands on "You need yours."; warm bed with tactile UI accents after.
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`, entered at media 0.5457s (one beat in) so its soft intro sits under the hook and its bass drop (media 8.7423s) lands at video 8.197s
- Music treatment: bed ~0.2 under the hook, ducked to ~0.07 from the freeze to just before the drop, steps up to ~0.36 on the drop, fades out over the last 2.2s under the final lockup
- Beat grid: video time = 8.197 + k × 0.5457s (tempo 109.96 BPM). Cue locks, by beat index k: 11:00 lands (k=-4, 6.01s); turn text (k=-2, 7.11); **drop / "You need yours." (k=0, 8.20, main lock)**; flame lands (k=4, 10.38); phone in (≈12.66); tap Add (k=12, 14.74); tap search (k=14, 15.84); results (k=17, 17.47); tap result (k=19, 18.56); Comfort (k=21, 19.66); Light (k=23, 20.75); Put on Shelf (k=25, 21.84); first scroll (k=28, 23.47); rail names (k=30, 32, 34 → 24.57, 25.66, 26.75); tap Paddington (k=36, 27.84); details badges (k=39, 29.48); clock returns (k=42, 31.11); "Already watching." (k=43, 31.66); final lockup (k=47, 33.84)
- Audio-reactive: subtle — music bass/RMS breathes the ember glow; no visualizer imagery
- SFX: a pre-mixed tick ratchet at the exact clock-step times (`work/clock-steps.json` → `work/mix-ticks.py`, the 11:00 tick is the loudest) plus one soft thud as the feed stops; wood knock on the shelf landing (and again on Put on Shelf, the motif); soft clicks on taps; low key ticks while typing; soft drops on the sheet and results; one clock tick when the clock returns; warm bong on the lockup
- Restraint: ticks stay under the bed; no stacked hits. Delivered at −16 LUFS (two-pass loudnorm), same as v2

## Privacy / stand-ins
- Demo space label "Template Demo" → **"Living Room"**; demo-only banner removed (as v1/v2)
- The details sheet's "If started now" time is computed from the capture clock; it is set to **10:39 PM** to match the story's 9:04 PM (+1h35m runtime)
- The clock times are a dramatisation; no invented stats or claims
- No real user data; the library is the app's public demo seed

## Storyboard

### Scene 1 — Still scrolling — 0.0–7.5s
Cold, blue-tinted dark. A 9-column wall of real posters scrolls upward from frame 0 and keeps accelerating, columns at 0.86–1.12× each other's speed. Centre: clock "9:12 PM" fades in (0.1s), "Still scrolling." (0.55s). From 0.8s the clock ticks up in 3-minute steps with a rising rate; **11:00 PM lands at 6.01s** with a small swell as the feed stops dead. Held ~1s.
Audio: tick ratchet matching each step over a quiet bed; one soft thud on 11:00; music ducks.
Transition: clock and headline lift away (7.06s).

### Scene 2 — You need yours — 6.8–13.3s
Wall dissolves; ten posters fly in from scattered positions into one shelf row with a warm plank glow, the last landing on the drop. "You don't need more options." (7.11) → "You need yours." in amber (8.10–8.20, drop). Cold tint fades, ember blooms. At 9.83 the lines give way to the Hearth flame + HEARTH (10.38) and *A calm, shared watchlist for couples.* (10.73), held ~2.2s.
Audio: near-silence, then wood knock + music drop at 8.20; soft hit on the logo.
Transition: shelf slides away as the phone glides in.

### Scene 3 — Save for Us — 12.6–22.4s
Phone (real Tonight screen) glides in on the right (12.66). Left: SAVE FOR US / "Saw one you'd both love?" / "Save it for us, and tag the mood." Tap Add (14.74) → the sheet rises and sits for a beat → tap search (15.84) → "Paddington" types at ~0.1s/char → results drop in one by one (17.47) → select the 2014 film (18.56) → push-in on the chips → Comfort (19.66), Light (20.75), each echoed as a chip on the left → Put on Shelf (21.84, wood knock).
Audio: clicks, key ticks, soft drops, wood knock.

### Scene 4 — Pick by mood — 22.0–30.6s
Back on Tonight. Left: TONIGHT / "Pick by mood, not by menu." Scroll stop 1 (23.47): the new Paddington Collections card and the first rail; "Easy & Comforting" (24.57). Scroll stop 2 (25.11): down to the mood rails; "Need a Laugh" (25.66), "Quick Bites" (26.75). Tap Paddington in Need a Laugh (27.84): "Need a Laugh" turns amber, the others dim; the details sheet fades in (app: 200ms); the camera pushes in (28.73–29.63); COMFORT · LIGHT glow (29.48); hold on "If started now 10:39 PM".
Audio: soft click, soft drop on the sheet, a soft slide on each scroll.
Transition: phone slides away (30.57).

### Scene 5 — Already watching — 30.9–37.2s
Clock returns in the hook's style: "9:04 PM" (31.11) and "Already watching." (31.66) over a dim, warm Paddington backdrop, held ~1.9s. Final lockup lands on the strong cue (33.84): flame, HEARTH, GATHER AROUND, *Make deciding what to watch together feel easy and good.* Hold to the end.
Audio: single clock tick, soft drop, bong on the lockup, music fades.

**Music mood:** warm, steady, upbeat-but-restrained — held back under the hook, released on the turn.
**Audio summary:** a ratchet of clock ticks over a quiet bed builds the endless-scroll tension to 11:00 PM, drops to near-silence for the hold, and the music's drop releases on "You need yours."; tactile UI sounds carry the unhurried demo; a single clock tick brings the payoff.
