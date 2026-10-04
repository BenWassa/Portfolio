# Brag Plan: Hearth — v5

## What changed from v4, and why
Ben's review of v4: **the turn screen ("You don't need more options. You need one place for it all.") felt wrong.** The diagnosis: "more options" is about too much choice, which is what the scrolling hook shows, but "one place for it all" fixes a different problem (scattered lists), and "it all" never says what *it* is. The two lines didn't answer each other.

Six alternatives were drafted and then run through the humanizer skill, which flagged every "not X, it's Y" line, the fragment/triad lockup line, and an invented number ("half your list"). Ben picked option 1, the one that sounds like a person at 10:40 PM:

- **The turn.** "You don't need more options. / You need one place for it all." becomes **"Which app was that on?" / "Doesn't matter. It's on the shelf."** The question follows straight on from "Still scrolling", and "doesn't matter" carries the platform-independence point without naming a service. The answer still lands on the drop, over the shelf.
- **Final lockup.** "One watchlist. Every service. Everyone you watch with." (a fragment run) becomes **"One watchlist for every service and everyone you watch with."**
- **Unchanged:** the hook, all pacing and cues, the wordmark line "A shared watchlist for every streaming service.", the Spaces / Save / Tonight captions, audio, and the 40.5s length. The turn line makes no claim about groups, so the Spaces scene and the lockup still carry that half of the UVP.
- **Open:** the Spaces caption "Your people, your shelves." was also flagged by the humanizer as an aphorism-style parallel; not changed yet.

## Earlier: what changed from v3 (v4)
Ben's review of v3: **the copy had problems** ("You don't need more options" was fine, but "You need yours" made no sense), and the video wasn't saying the real UVP: **Hearth is one place for your watchlist across all the streaming platforms, and between groups (couples, friends, etc.). It also shows clear, transparent categories based on how people feel.**

v3 kept v2's line "You need yours." and its couples-only framing ("both love", "for couples"). "Yours" had no referent, and nothing in the film said "every service" or "every group". v4 keeps v3's hook, pacing, beat grid and captured app UI, and rewrites the message:

- **The turn.** "You don't need more options." stays. The answer is now **"You need one place for it all."** (was "You need yours."), over the ten posters landing on one shelf. The wordmark's descriptor was "A calm, shared watchlist for couples."; it is now **"A shared watchlist for every streaming service."**
- **New scene: Spaces** (the groups half of the UVP). The phone opens on the app's real **"Choose a Space"** startup screen with three spaces; the viewer taps Living Room and the app opens on Tonight. Caption: **"Your people, your shelves."** / "Couples, friends, family: a private shelf for each."
- **Save caption.** "Saw one you'd both love?" (couples-only) becomes **"Saw it anywhere?"** / "Save it once, whatever it streams on. Then tag the mood." (the platform-independence half).
- **Tonight caption.** "Pick by mood, not by menu." ("menu" was vague) becomes **"Pick by mood."** / "Plain categories, built from the tags you set." On the details sheet the line swaps to **"Every title shows the tags behind it."** (the sheet shows COMFORT · LIGHT, the tags that were set), which is the transparency point.
- **Final lockup.** The line is now **"One watchlist. Every service. Everyone you watch with."** (v3: README mission line). Share copy rewritten to match.
- **Timing.** The new scene and a longer hold on the wordmark descriptor add ~3.3s: **37.2s → 40.5s**. Everything after the new scene shifts by beat-grid steps; nothing else is re-paced. Music, hook, clock and tick mix are unchanged.

### Honest scope of the claims (checked against `../hearth_v2`)
- **Groups:** a "space" is a generic named shelf with a member list, a user can belong to several, and the app has the "Choose a Space" switcher (`SpaceSwitcherModal.jsx`, `spaces.js`). The README still says "couples", but nothing in the model is couples-only.
- **Streaming services:** Hearth has **no per-service data**. Search is by title (TMDB), and nothing records or shows where a title streams. The claim "one watchlist for every streaming service" is therefore about the shelf being platform-independent (any title, whatever it streams on), not about availability or integrations. The film never shows service logos or "where to watch", and names no service.
- **Categories:** the rails are named for moods and built from the vibe/energy tags set on save; the film says "plain categories, built from the tags you set", and does **not** claim "no algorithm" (the app also has a decision helper, and rails are shuffled daily).

## What is this app?
Hearth is a calm, shared watchlist: one private, finite shelf of movies and shows, for any streaming service and for each group you watch with (partner, friends, family), tagged by vibe and energy so choosing what to watch tonight is quick and pleasant instead of a forty-minute scroll.

## The angle
**Which app was that on? Doesn't matter. It's on the shelf.** The scattered, endless feed is the problem. Hearth is the single shared shelf: one list for every service, one shelf per group, sorted into plain, readable moods.

## Hook (first 7 seconds)
Unchanged from v3: an endless wall of posters scrolls upward, speeding up; a clock ticks from 9:12 PM to 11:00 PM; one line, **"Still scrolling."** At 11:00 PM the feed stops dead and the line holds.

## Key moments (the middle)
- **The turn.** The feed dissolves; ten posters drop into a single warm shelf. **"Which app was that on?"** / **"Doesn't matter. It's on the shelf."** (on the music's drop). Hearth flame + HEARTH + *A shared watchlist for every streaming service.*
- **Spaces (who).** Real app screen: "Choose a Space", three spaces, tap Living Room, the app opens on Tonight. Caption: "Your people, your shelves."
- **Save for Us (what).** Real app: tap Add → "Paddington" → select the 2014 film → tap **Comfort**, tap **Light** → **Put on Shelf**. Caption: "Saw it anywhere?" / "Save it once, whatever it streams on. Then tag the mood."
- **Tonight (when).** Real app: back on Tonight, the new Paddington collection card is waiting; scroll to the mood rails; tap Paddington in *Need a Laugh*; its details sheet shows **COMFORT · LIGHT** and "If started now 10:39 PM". Caption: "Pick by mood." / "Plain categories, built from the tags you set." → "Every title shows the tags behind it."

## Outro / punchline
The clock returns: **9:04 PM — "Already watching."** Final lockup: flame, HEARTH, GATHER AROUND, **One watchlist for every service and everyone you watch with.**

## User flow worth showing
Choose a Space → Save for Us (search → select → Vibe: Comfort, Energy: Light → Put on Shelf) → Tonight (new collection card, mood rails) → tap the title → details with its mood tags.

## Tone
- Preset: `polished`
- Creative direction: fireside product film, with a cold/warm contrast: the hook is cold, blue-lit and accelerating; everything from the turn on is warm, unhurried amber.
- Interpretation: the only urgent motion is the hook feed; the turn is a decisive stop; the app demo is calm, tactile and given room.

## Format: landscape — 1920x1080, 30fps
## Duration: 40.5s
(Past the /brag default of 15–25s, at Ben's request for a longer, slower film in v3, plus the new scene. v2 remains the short cut of the old message.)

## Visual identity (from the project)
- Background `#0c0a09`, warm radial glow `rgba(66,40,20,…)`; hook adds a cool screen-glow tint that fades through the turn
- Accent amber `#d97706` / `#f59e0b`, highlights `#fcd34d` / `#fde68a`
- Text `#f5f5f4` / `#d6d3d1` / `#a8a29e`
- Display: the app's `ui-serif` (New York); body: system sans; clock: system sans, tabular numerals
- Strongest visuals: real posters from the demo shelf, the real Choose a Space, Save for Us and Tonight screens, the details sheet with Comfort/Light badges, the Hearth flame

## Share copy (draft)
See `share-copy.txt`.

## Audio direction
Unchanged from v3 (same track, same offset, same beat grid, ducked at the 11:00 PM hold, up on the drop, fade under the lockup, −16 LUFS). New SFX: a soft click when the space is tapped and a soft drop as Tonight opens.
- Beat grid: video time = 8.197 + k × 0.5457s (109.96 BPM). Cue locks (k → time): 11:00 lands (-4 → 6.01); turn text (-2 → 7.11); **drop / "Doesn't matter. It's on the shelf." (0 → 8.20, main lock)**; flame lands (4 → 10.38); tap Living Room (14 → 15.84); tap Add (18 → 18.02); tap search (20 → 19.11); results (23 → 20.75); tap result (25 → 21.84); Comfort (27 → 22.93); Light (29 → 24.02); Put on Shelf (31 → 25.11); first scroll (34 → 26.75); rail names (36, 38, 40 → 27.84, 28.93, 30.02); tap Paddington (42 → 31.11); details badges (45 → 32.75); clock returns (48 → 34.39); "Already watching." (49 → 34.93); final lockup (53 → 37.12)

## Privacy / stand-ins
- Demo space label "Template Demo" → **"Living Room"**; demo-only banner removed (as v1–v3)
- **Choose a Space is rebuilt from source, not captured**: the demo has a single space and hides the switcher, so `work/build-spaces.mjs` transcribes `SpaceSwitcherModal.jsx` (classes, copy, structure) and renders it with the same production stylesheet. The three space names (Living Room, Friday Film Club, Family Sunday) are stand-ins for a couple, a friend group and a family.
- The details sheet's "If started now" time is set to **10:39 PM** to match the story's 9:04 PM (+1h35m runtime)
- The clock times are a dramatisation; no invented stats or claims. No service names or logos appear anywhere.
- No real user data; the library is the app's public demo seed

## Storyboard

### Scene 1 — Still scrolling — 0.0–7.5s
Unchanged from v3. 9-column poster wall accelerating from frame 0; clock 9:12 PM → 11:00 PM (36 ticks, rate rising), "Still scrolling."; 11:00 lands at 6.01s, the feed stops dead, ~1s hold. Cold, blue-tinted.

### Scene 2 — It's on the shelf — 6.8–13.7s
Wall dissolves; ten posters fly into one shelf, the last landing on the drop. "Which app was that on?" (7.11) → **"Doesn't matter. It's on the shelf."** in amber (8.10–8.20). At 9.83 the lines give way to the flame + HEARTH (10.38) and *A shared watchlist for every streaming service.* (10.73), held ~2.4s. Shelf slides away as the phone glides in.

### Scene 3 — Spaces — 13.1–17.0s
Phone glides in (13.21) on the real **Choose a Space** screen (Living Room · Friday Film Club · Family Sunday · Create new space). Left: SPACES / "Your people, your shelves." / "Couples, friends, family: a private shelf for each." Tap Living Room (15.84): the row highlights with its check, then a short crossfade to Tonight.

### Scene 4 — Save for Us — 16.4–25.9s
Left: SAVE FOR US / "Saw it anywhere?" / "Save it once, whatever it streams on. Then tag the mood." Tap Add (18.02) → the sheet rises and sits → tap search (19.11) → "Paddington" types at ~0.1s/char → results drop in one by one (20.75) → select the 2014 film (21.84) → push-in on the chips → Comfort (22.93), Light (24.02), each echoed as a chip → Put on Shelf (25.11, wood knock).

### Scene 5 — Pick by mood — 25.3–34.4s
Back on Tonight. Left: TONIGHT / "Pick by mood." / "Plain categories, built from the tags you set." Scroll stop 1 (26.75): the new Paddington Collections card and first rail; "Easy & Comforting" (27.84). Scroll stop 2 (28.39); "Need a Laugh" (28.93), "Quick Bites" (30.02). Tap Paddington (31.11): the details sheet opens, the camera pushes in (32.0), COMFORT · LIGHT glow (32.75), and the line swaps to "Every title shows the tags behind it." Phone slides away (33.84).

### Scene 6 — Already watching — 34.1–40.5s
"9:04 PM" (34.39) and "Already watching." (34.93) over a dim, warm Paddington backdrop, held ~1.9s. Final lockup lands on the strong cue (37.12): flame, HEARTH, GATHER AROUND, **One watchlist for every service and everyone you watch with.** Hold to the end.

**Music mood:** warm, steady, upbeat-but-restrained — held back under the hook, released on the turn.
