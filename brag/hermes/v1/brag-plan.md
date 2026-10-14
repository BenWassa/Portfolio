# Brag Plan: Hermes ("The Daily")

## What is this app?
An autonomous overnight pipeline that assembles a personalized Toronto morning newspaper, renders it as one static page, and pushes a single notification when it's ready. (Repo is `Hermes`; the product is named "The Daily".)

## The angle
A newspaper that delivers itself, deadpan. The pipeline runs at 5:17 AM while its one reader sleeps; the payoff is a finished paper and a notification that says "Today's edition is ready." The joke is the product's own restraint: no second user, no engagement metric.

## Hook (first 3s)
Huge serif clock: "5:17 AM", label "America/Toronto". Line: "Nobody is awake. The paper is being written."

## Key moments
- Pipeline stages light up one by one (project's own stage names).
- Lock-screen push: "The Daily — Jul 22 / Today's edition is ready."
- The paper: masthead THE DAILY, tagline "Toronto · World · Sports · Business · Opinion", weather strip, lead story; a simulated tap expands a card to reveal "Why it matters".

## Outro / punchline
"One finite, finished paper." then "No second user. No engagement metric." then THE DAILY masthead.

## User flow worth showing
Entry: push notification → key action: tap lead story → result: summary + "Why it matters" note.

## Tone
- Preset: default
- Creative direction: quiet clockwork broadsheet, deadpan
- Interpretation: restrained motion, long-enough holds, serif type, the humor comes from the product's own copy.

## Format: vertical — 1080x1920
## Duration: 22.4s

## Visual identity (from the project)
- Background: #151a22 (dark lamplight edition) for framing; paper #faf8f3 inside the phone
- Accent: navy #1a2744, masthead red #8b1a1a
- Text: ink #17130d on paper, cream #e9e3d5 on dark
- Display font: Georgia (bold); body Georgia; labels Arial bold, letterspaced
- Strongest visual element: the broadsheet masthead + lead card

## Share copy (draft)
My newspaper builds itself at 5:17 AM and sends one push: "Today's edition is ready." No second user, no engagement metric.

## Audio direction
- Role: warm bed with sparse accents
- Music: bundled "happy-beats-business-moves-vol-10" (≈110 BPM)
- Music treatment: starts 0s, low-moderate, fade-out over last 2s
- Music cue guidance: preset read; strong cues ~15.82, 18.01, 18.55, 20.19; beat grid 0.27 + 0.55 steps
- Audio-reactive: subtle; glow behind phone breathes with music energy
- SFX posture: sparse, motion-matched (tick on stage reveals, notification ping, tap)
- Restraint: no stings over text reading

## Storyboard

### Scene 1 — Clock hook — 3.5s
Dark ground. "5:17 AM" big, "AMERICA/TORONTO" label, then line "Nobody is awake. The paper is being written." Holds ≥1.8s.
Sequential/interaction: none
Transition mood: clean → Scene 2

### Scene 2 — Pipeline — 4.5s
Six stages stack in one by one on beat: fetch · normalize · curate (Gemini) · render · deploy · notify, each ticking to a check. Full set held ~1.5s.
Sequential/interaction: yes — each row checks off, tick SFX, every other beat; full list held at end.
Transition mood: clean → Scene 3

### Scene 3 — Push — 2.9s
Lock-screen notification card slides in: "The Daily — Jul 22", "Today's edition is ready." Ping SFX.
Transition mood: soft → Scene 4

### Scene 4 — The paper — 7.1s
Phone with the real UI: masthead, tagline, weather strip, tabs, lead card (Segro/Prologis). Cursor taps card; it expands to summary + "Why it matters". 
Sequential/interaction: yes — simulated tap.
Transition mood: clean → Scene 5

### Scene 5 — Outro — 4.4s
"One finite, finished paper." → "No second user. No engagement metric." → THE DAILY masthead.
Transition mood: end

**Music mood:** warm upbeat bed
**Audio summary:** quiet bed under a clockwork build, ping on the push, soft tap on the story, fade at the masthead.
