# Brag Plan: Hearth — v2

## What changed from v1, and why
v1 opened on a "you pick / you pick" chat joke, put a 3.4s logo lockup before any value, then toured the app (Tonight first, Save second) with feature-label captions. Ben's review: the UVP wasn't clear or hooking, and the cut felt random. The joke named indecision, but nothing showed why Hearth ends it. The rails looked like generic streaming categories because the viewer saw the effect (Tonight) before the cause (tagging).

v2 is built on the value stated in Hearth's own README: streaming platforms *"optimize for attention, not satisfaction. Hearth does the opposite"* with a *"finite"* shelf curated by the couple. The video contrasts the endless feed with your own shelf, and runs cause → effect: save + tag → pick by mood. A clock ties the hook to the payoff.

## What is this app?
Hearth is a calm, shared watchlist for couples: a private, finite shelf of movies and shows the two of you saved, tagged by vibe and energy, so choosing what to watch tonight is quick and pleasant instead of a forty-minute scroll.

## The angle
**You don't need more options. You need yours.** Endless choice is the problem. Hearth answers it with the shelf you two already picked, sorted by how you feel tonight.

## Hook (first 2-3 seconds)
An endless wall of posters races upward like a streaming feed that never ends. A clock ticks 9:12 → 9:47. One line: **"Still scrolling."**

## Key moments (the middle)
- **The turn.** The feed freezes; almost everything dissolves and ten posters drop into a single warm shelf. "You don't need more options." / **"You need yours."** (on the music's drop). Hearth flame + HEARTH + *A calm, shared watchlist for couples.*
- **Save for Us (cause).** Real app: tap Add → "Paddington" → select the 2014 film → tap **Comfort**, tap **Light** → **Put on Shelf**. Caption: "Saw one you'd both love?" / "Save it for us, and tag the mood."
- **Tonight (effect).** Real app: back on Tonight, scroll to the mood rails; tap Paddington in *Need a Laugh*; its details sheet opens showing **COMFORT · LIGHT** (the tags just set) and "If started now 10:39 PM". Caption: "Pick by mood, not by menu."

## Outro / punchline
The clock returns: **9:04 PM — "Already watching."** Final lockup: flame, HEARTH, GATHER AROUND, *Make deciding what to watch together feel easy and good.* (README, verbatim).

## User flow worth showing
Save for Us (search → select → Vibe: Comfort, Energy: Light → Put on Shelf) → Tonight (mood rails) → tap the title → details with its mood tags.

## Tone
- Preset: `polished`
- Creative direction: fireside product film, now with a cold/warm contrast: the hook is cold, fast and blue-lit (screen glow); everything from "You need yours." on is warm, unhurried amber.
- Interpretation: the only frantic motion is the hook feed; the turn is a decisive stop; the app demo is calm and tactile.

## Format: landscape — 1920x1080
## Duration: ~22.2s

## Visual identity (from the project)
- Background `#0c0a09`, warm radial glow `rgba(66,40,20,…)`; hook adds a cool screen-glow tint that fades at the turn
- Accent amber `#d97706` / `#f59e0b`, highlights `#fcd34d` / `#fde68a`
- Text `#f5f5f4` / `#d6d3d1` / `#a8a29e`
- Display: the app's `ui-serif` (New York); body: system sans; clock: system sans, tabular numerals
- Strongest visuals: real posters from the demo shelf, the real Save for Us sheet, Tonight rails, the details sheet with Comfort/Light badges, the Hearth flame

## Share copy (draft)
35 minutes of scrolling, nothing watched. So I built Hearth: a calm, shared watchlist for couples. Save picks for each other, tag the mood, and choose from your own shelf by how you feel tonight.

## Audio direction
- Role: tension → release. Fast clock/scroll ticks over a quiet bed in the hook; near-silence at the freeze; the music's drop lands on "You need yours."; warm bed with tactile UI accents after.
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`, entered at media 4.14s so its soft intro sits under the hook and its bass drop (media 8.74s) lands at video 4.60s
- Music treatment: bed ~0.2 under the hook, ducked to ~0.08 at the freeze, steps up to ~0.36 on the drop, fades out under the final lockup
- Music cue guidance: preset `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`. With the 4.14s offset: drop/strong cue at video 4.60; beat grid ≈ every 0.545s (5.15, 5.69, 6.23, … 8.41, … 10.06, … 11.15, 11.70, 12.24, … 13.33, 13.88, 14.42, 14.96, … 17.14, 17.70, 18.23, 18.79, 19.32)
- Cue locks: shelf lands + "You need yours." (4.60, main lock); Put on Shelf (12.24); tap Paddington (14.96); final lockup (18.79)
- Audio-reactive: subtle — music bass/RMS breathes the ember glow; no visualizer imagery
- SFX: pre-mixed fast tick ratchet for the hook clock; wood knock on the shelf landing (and again on Put on Shelf, the motif); soft clicks on taps; low key ticks while typing; soft drops on results and the sheet opening; one clock tick when the clock returns; warm bong on the lockup
- Restraint: ticks stay under the bed; no stacked hits

## Privacy / stand-ins
- Demo space label "Template Demo" → **"Living Room"**; demo-only banner removed (as v1)
- The details sheet's "If started now" time is computed from the capture clock; it is set to **10:39 PM** to match the story's 9:04 PM (+1h35m runtime)
- The clock times are a dramatisation; no invented stats or claims
- No real user data; the library is the app's public demo seed

## Storyboard

### Scene 1 — Still scrolling — 0.0–3.4s
Cold, blue-tinted dark. A 9-column wall of real posters scrolls upward, accelerating. Centre: clock "9:12 PM" ticking to "9:47 PM"; serif headline "Still scrolling."
Sequential/interaction: continuous scroll + per-minute ticks.
Audio: fast tick ratchet; quiet bed.
Transition: hard stop — the feed decelerates to a freeze at ~3.3s; clock and headline lift away.

### Scene 2 — You need yours — 3.4–7.3s
Wall dissolves; ten posters fly in from scattered positions into one shelf row with a warm plank glow. "You don't need more options." (3.55) → "You need yours." in amber (4.60, drop). Cold tint fades, ember blooms. At 5.7 the lines give way to the Hearth flame + HEARTH and *A calm, shared watchlist for couples.* above the shelf.
Audio: near-silence at the freeze; wood knock + music drop at 4.60; soft hit on the logo.
Transition: shelf slides away as the phone glides in.

### Scene 3 — Save for Us — 7.3–12.5s
Phone (real Tonight screen) glides in on the right. Left: SAVE FOR US / "Saw one you'd both love?" / "Save it for us, and tag the mood." Tap Add (8.41) → sheet rises → "Paddington" types → results (10.06) → select → push-in → Comfort (11.15), Light (11.70) echoed as chips on the left → Put on Shelf (12.24, wood knock).
Audio: clicks, key ticks, soft drops, wood knock.

### Scene 4 — Pick by mood — 12.5–17.0s
Back on Tonight. Left: TONIGHT / "Pick by mood, not by menu." The screen scrolls to the mood rails; rail names echo on the left (Easy & Comforting, Need a Laugh, Quick Bites). Tap Paddington in Need a Laugh (14.96): "Need a Laugh" turns amber; the details sheet fades in (app: 200ms fade); camera pushes in on COMFORT · LIGHT and "If started now 10:39 PM".
Audio: soft click, soft drop on the sheet.
Transition: phone slides away.

### Scene 5 — Already watching — 17.0–22.2s
Clock returns in the hook's style: "9:04 PM" (17.14) and "Already watching." (17.70) over a dim, warm Paddington backdrop. Final lockup lands on the strong cue (18.79): flame, HEARTH, GATHER AROUND, *Make deciding what to watch together feel easy and good.* Hold to the end.
Audio: single clock tick, soft drop, bong on the lockup, music fades.

**Music mood:** warm, steady, upbeat-but-restrained — held back under the hook, released on the turn.
**Audio summary:** a fast clock ratchet over a quiet bed builds the endless-scroll tension, cuts to near-silence at the freeze, and the music's drop releases on "You need yours."; tactile UI sounds carry the demo; a single clock tick brings the payoff.
