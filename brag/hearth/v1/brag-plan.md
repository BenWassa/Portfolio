# Brag Plan: Hearth

## What is this app?
Hearth is a calm, shared watchlist for couples: a private shelf of saved movies and shows, tagged by vibe and energy, that turns "what should we watch?" into a small, pleasant ritual instead of a forty-minute scroll.

## The angle
Every couple knows the nightly standoff: *"what do you want to watch?"* / *"idk, you pick."* / *"you pick."* Forever. Hearth's README states its whole reason to exist: **make deciding what to watch together feel easy and good.** The video stages the standoff as a chat volley, answers it with Hearth, shows the real app sorting the shelf by mood and saving a pick together, then replays the opening question — this time answered in one line.

The joke is the problem, not the product. The product is shown straight, warm, and real.

## Hook (first 2-3 seconds)
A chat volley on a warm near-black field. Grey bubble: **"what do you want to watch?"** → amber bubble: **"idk. you pick."** → grey bubble: **"you pick."** → amber typing dots that never resolve. Instantly relatable, readable in under two seconds, and it sets up the payoff.

## Key moments (the middle)
- **Tonight, already sorted.** The real Tonight screen inside a phone: the cinematic hero (The Godfather) swipes to the next title, then the shelf scrolls through its mood rails — *Easy & Comforting*, *Need a Laugh*, *Quick Bites*, *Deep Dives*.
- **Save for Us.** Tap **Add** → the real "Save for Us" sheet. "Paddington" types into search, TMDB results drop in, tap the 2014 film → **✓ Selected**. Tap **Comfort**, tap **Light**, tap **Put on Shelf**.
- **It's on the shelf.** Back on Tonight, a new *Collections* card for Paddington is waiting (real app behaviour after the save).

## Outro / punchline
The chat returns. Grey: **"what do you want to watch?"** → amber, instantly: **"Paddington. It's on our shelf."** Then the lockup: the Hearth flame, **HEARTH**, **GATHER AROUND**, and *A calm, shared watchlist for couples.*

## User flow worth showing
Tonight (entry: the shelf sorted into mood rails) → Save for Us (key action: search, pick the real title, tag Vibe = Comfort and Energy = Light, Put on Shelf) → back on Tonight with the title on the shelf (result: Paddington appears in Collections and the rails).

## Tone
- Preset: `polished`
- Creative direction: fireside product film — warm, unhurried, with a knowing smile in the opening
- Interpretation: restrained, confident motion with long holds and soft transitions; humour lives only in the chat volley; amber glow and ember warmth instead of flashy effects; every UI interaction feels tactile and calm, never frantic.

## Format: landscape — 1920x1080
## Duration: ~22.6s

## Visual identity (from the project)
- Background: `#0c0a09` (`--shell-bg`, warm near-black) with the app's warm radial `rgba(66,40,20,…)` glow, pushed to video strength
- Accent: amber — `#d97706` (amber-600, primary button), `#f59e0b` (amber-500), `#fcd34d` / `#fde68a` (amber-300/200 selected states)
- Text: `#f5f5f4` (stone-100) headlines, `#d6d3d1` (stone-300) body, `#a8a29e` (stone-400) muted
- Display font: the app's `font-serif` (`ui-serif` → New York on Apple), used for "Hearth", "Save for Us" and the HEARTH wordmark (black, uppercase, tight tracking)
- Body font: the app's system sans (`-apple-system` stack); small labels uppercase with wide amber tracking (the "GATHER AROUND" treatment)
- Strongest visual element: the real UI — poster rails, the hero with title logos, the amber "Put on Shelf" button and the Vibe/Energy chips — plus the Hearth flame logo (`src/assets/hearth_vector.png`)

## Share copy (draft)
"what do you want to watch?" / "idk, you pick." — so I built Hearth: a calm, shared watchlist for couples. Tag picks by vibe and energy, put them on the shelf, and the question answers itself.

## Audio direction
- Role: warm bed with sparse, tactile UI accents
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (steady and clean, 110 BPM), entered at ~5.0s into the track so its soft intro sits under the hook and its first lift lands on the logo
- Music treatment: short fade-in, bed around 0.3, fade out under the final lockup
- Music cue guidance: preset `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`. With a 5.0s media offset, strong cues land at video ≈ 3.74s (logo reveal), 8.11s (hero swipe), 12.47s (Save for Us sheet settles), 13.56s (search results), 14.66s (Comfort tap), 17.37/17.93s (outro bubbles), 19.56s (final lockup). Beat grid ≈ every 0.545s from 0.34s.
- Audio-reactive treatment: subtle — music bass/RMS makes the ember glow behind the scenes and the logo's halo breathe. No waveform or visualizer imagery.
- SFX posture: sparse to moderate, motion-matched, low HF risk — soft bubble drops, a warm hit on the logo, a soft slide for the phone, low key ticks while "Paddington" types, soft clicks on taps, a warm wood knock when it's put on the shelf.
- Audio-coupled moments: chat bubble pops; logo landing; phone slide-in and hero swipe; typed search; result rows dropping in; chip taps; Put on Shelf; outro bubbles; lockup.
- Restraint rule: nothing bright or repeated loudly; typing ticks stay well under the music; no stacked hits.

## Privacy / stand-ins
The demo's space label "Template Demo" is replaced with **"Living Room"** (from the onboarding placeholder "The Living Room…", shortened so the header pill doesn't truncate), and the demo-only banner ("Template mode: all changes reset on refresh.") is removed. No real user data appears; the library is the app's public demo seed.

## Storyboard

### Scene 1 — The standoff — 0.0–3.6s
Warm near-black field, faint ember glow low in frame. Chat bubbles stack centre-left to centre-right: grey "what do you want to watch?" (0.3s), amber "idk. you pick." (1.3s), grey "you pick." (2.05s), amber typing dots (2.6s) pulsing.
Sequential/interaction: yes — four bubbles pop in one by one, the last is a typing indicator that never resolves.
Audio intent: quiet, intimate, a little comic.
Audio-coupled idea: a soft drop per bubble; nothing on the dots.
Music: soft intro section of the bed.
Transition mood: soft → bubbles drift apart and dim as the ember swells.

### Scene 2 — Gather around — 3.6–7.0s
The ember glow blooms; the Hearth flame logo rises into the glow and lands on the strong cue (~3.74s); **HEARTH** in black serif caps; **GATHER AROUND** tracks out in amber; *A calm, shared watchlist for couples.* settles below and holds ~1.8s.
Sequential/interaction: logo → wordmark → tagline → descriptor, staggered.
Audio intent: warm arrival, the room lights up.
Audio-coupled idea: one warm soft hit as the logo lands, beat-locked to the music lift.
Music: bed lifts.
Transition mood: soft → lockup lifts away as the phone glides in.

### Scene 3 — Tonight — 7.0–11.9s
Phone (generic, graphite) glides in on the right with the real Tonight screen ("Hearth" header, "Living Room"). Left: amber label **TONIGHT**, serif headline **"Your shelf, sorted by mood."** A touch swipes the hero from The Godfather to the next title (strong cue ~8.1s), then the screen scrolls down through the rails while the rail names echo on the left, one by one, held to reading time: *Easy & Comforting · Need a Laugh · Quick Bites · Deep Dives*.
Sequential/interaction: yes — simulated swipe on the hero, then a scroll; rail names appear one by one (every other beat, each held ≥0.8s).
Audio intent: gentle momentum.
Audio-coupled idea: soft slide on phone entrance and on the swipe.
Music: steady bed.
Transition mood: clean → a tap on **Add** drives the next scene.

### Scene 4 — Save for Us — 11.9–17.0s
Tap **Add** → the real "Save for Us" sheet rises (settles on the strong cue ~12.5s). Left: label **SAVE FOR US**, headline **"Tag the vibe. Set the energy."** In the phone: caret, "Paddington" types; results drop in (~13.6s); tap the 2014 film → **✓ Selected**; the phone pushes in on the chips; tap **Comfort** (~14.7s), tap **Light**; tap **Put on Shelf**; the app returns to Tonight and the new Paddington *Collections* card glows amber.
Sequential/interaction: yes — typing, result rows cascade, three taps, button press, state return.
Audio intent: tactile, satisfying, unhurried.
Audio-coupled idea: low key ticks for typing, soft drops for results, soft clicks for taps, a warm wood knock on Put on Shelf.
Music: steady bed.
Transition mood: soft → phone slides away, chat returns.

### Scene 5 — Asked and answered — 17.0–22.6s
The chat returns: grey "what do you want to watch?" (~17.2s), amber "Paddington. It's on our shelf." (~17.9s strong cue), held ~1.5s. Bubbles fade; final lockup lands on the strong cue (~19.6s): flame, **HEARTH**, **GATHER AROUND**, *A calm, shared watchlist for couples.* Embers drift; hold to the end.
Sequential/interaction: two bubbles, then lockup.
Audio intent: resolved, warm, quiet confidence.
Audio-coupled idea: soft drops on the bubbles, one warm accent on the lockup, music fades under the hold.
Music: bed fading out.
Transition mood: end on the lockup (no black).

**Music mood for this video:** warm, steady, upbeat-but-restrained
**Audio summary:** a soft intro under the comic chat volley lifts exactly as Hearth appears, carries the real app demo with quiet tactile UI sounds, and fades under the final "Gather around" lockup.
