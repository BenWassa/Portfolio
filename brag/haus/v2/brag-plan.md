# Brag Plan: HAUS — v2

## What changed from v1, and why

Ben's review of v1: _"we do not have a coherent order to steps and we drift during steps into different features. See each feature through, don't jump around."_ Frame-by-frame, that was right.

**Where v1 drifted** (v1 timestamps):

- **7.6-13.6, "01 Who's in · How long"** put two features under one marker, driven by three different mechanisms: a tap on Home, a camera scroll down to Best Fit, then a floating SESSION card that flipped 4h → 1h. That card is not a control in the app. Session length is set in **Settings → This session**, so v1 showed a gesture HAUS does not have.
- **13.6-17.0, "02 The Matrix"** put its caption up while Home was still on screen, and gave the heatmap under a second before the cell tap.
- **17.0-22.5, "03 Together"** hopped Matrix sheet → Settings (invite code) → Planning (lanes) → Task detail in about 1.5s each, with three different captions. Nothing connected the invite code to the lanes or the faucet job; it read as three unrelated features.

**The v2 contract: one feature per chapter, taken from cause to effect.** Every chapter has the same four beats, in the same order:

1. **Name it.** The chapter's rail step lights up and its one caption lands (before the action).
2. **Do it.** A real tap, on a real control, shown on the phone.
3. **See it.** The result holds for at least 1.5s with the caption still up.
4. **Leave it.** Only then does the next chapter start. No chapter borrows a screen or a caption from the next.

**Order logic.** Each chapter answers the question the previous one raises: _Who's home?_ → _How long have we got?_ → _Why is that job first?_ → _Who does what?_ A four-step rail (01 Who's in · 02 How long · 03 Matrix · 04 Together) sits above the phone for the whole product section so the viewer always knows where they are and what is left.

**Other changes**

- **"How long" now uses the app's real control.** Settings → This session: the 1h chip. Home is shown before and after, with SESSION reading 1h on return. The invented callout is gone.
- **"Who's in" and "How long" are separate chapters** (01 and 02), each with its own cause and effect.
- **Together is one through-line, the faucet job:** Planning (By person) → tap the faucet → Prep (Sam ✓) / Install (Alex) / Test (Jordan, "Waiting on Install") → tap ✓ → the label clears. The Settings invite-code beat is cut (see "Deliberately cut").
- **Real state continuity.** v1 captured the Matrix, Planning and faucet screens from a fresh session. v2 captures one continuous run (`work/capture.mjs`), so every screen is the actual next state of the one before it. The Matrix is session-independent (same cells, same "3 tasks"), which was verified rather than assumed.
- **Real nav taps** carry every screen change (Home → Settings → Home → Matrix view → Planning → task), instead of silent cross-fades.
- **Length 25.0s → 40.5s.** The 25s window was a skill default; four complete chapters need room, and the repo's history shows Hearth (22s → 37s) and Hermes (31s → 49s) both being lengthened after review.
- **Unchanged from v1:** the hook (0-3.7s), the UVP turn (3.7-7.6s), the closing line and logo, the palette and type, the music track and SFX language, loudness target, and the rebuild-from-real-DOM approach.

## What is this app?

HAUS is a phone-first shared household task manager that ranks every job by urgency × importance × what actually fits today, given who is home and how many hours the household has. The home is the unit: everyone sees everything.

## Message architecture (the spine)

| #   | Job                                           | Line on screen                                                                       | Proof on screen                                                                        | Grounded in                                                               |
| --- | --------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 1   | **Issue** — a shared backlog nobody can start | "The list never ends. Saturday does."                                                | The real 17 open tasks pouring in, counter "OPEN 17", chips "3 in · 4h"                | Demo seed; Dashboard stat cards                                           |
| 2   | **UVP** — plan the session, not the backlog   | "Plan the session, not the backlog." / "Ranked by what can actually get done today." | The pile collapses to a short ranked stack                                             | `project-descriptions.ts` (haus `full` + card `desc`); README             |
| 3   | **01 Who's in**                               | "Step out, and your jobs sink."                                                      | Home: Alex taps their portrait; Best Fit drops Alex's two jobs                         | `Dashboard.jsx` ("Tap your portrait to join or leave…"); verified live    |
| 4   | **02 How long**                               | "Only an hour? Quick jobs rise."                                                     | Settings → This session: tap 1h; back on Home, SESSION 1h and Best Fit re-ranks        | `Settings` ("Hours available today & who's in."); verified live           |
| 5   | **03 Matrix**                                 | "Urgent × important × what fits."                                                    | Home Matrix panel → Open matrix view → heatmap → top-right cell → "3 tasks"            | `MatrixView.jsx`, README `matrixScore`                                    |
| 6   | **04 Together**                               | "Everyone sees everything." / "Sam preps. Alex installs. Jordan tests."              | Planning (By person) → faucet → phased handoff → ✓ Install → "Waiting on Install" gone | `PlanningView.jsx`, README ("Everyone in the home sees everything"), seed |
| 7   | **Ask**                                       | "Start with what fits." + "Manage tasks at home, together."                          | HAUS logo on paper                                                                     | `SignIn.jsx` tagline                                                      |

Nothing in the video is a feature tour for its own sake. If a feature does not feed the chain it is cut.

## The angle

**The backlog is infinite. Your Saturday isn't.** Every other household list asks you to look at everything. HAUS answers the only question that matters at 9 AM on a Saturday: _given who's home and how long we've got, what do we start?_ Same list, different Saturday, different order. That "same list, different answer" is the demo, and it is real: it is verified in the live app.

## Hook (first 2-3 seconds) — unchanged

Cream paper canvas. The real task titles pour into one long list, accelerating, each row a real Planning row. The counter climbs to **OPEN 17**. **"The list never ends."** lands before 1s; at ~2.2s **"Saturday does."** with three lit portraits and **SESSION 4h**.

## Pacing map (v2)

One feature per chapter. The caption lands first and stays through the result. Times are seconds; every tap and re-rank snaps to the music's beat grid.

| Time       | Chapter     | Screen context           | Name → Do → See                                                                             | Result held                |
| ---------- | ----------- | ------------------------ | ------------------------------------------------------------------------------------------- | -------------------------- |
| 0.0-3.7    | Issue       | Pile of rows             | the backlog, OPEN 17                                                                        | "Saturday does." ≥ 1.4s    |
| 3.7-7.6    | UVP         | Ink canvas, ranked stack | the pile collapses to five                                                                  | headline 2.2s, sub ≥ 2.4s  |
| 7.6-13.0   | 01 Who's in | Home                     | caption 8.0 → tap Alex 8.96 → scroll to Best Fit → re-rank 10.54                            | ≈ 2.0s                     |
| 13.1-20.9  | 02 How long | Settings → Home          | caption 13.3 → Settings tab 13.7 → tap 1h 15.28 → Home tab 16.34 → scroll → re-rank 18.44   | ≈ 1.5s                     |
| 20.95-27.7 | 03 Matrix   | Home panel → Matrix view | caption 21.2 → Open matrix view 22.65 → heatmap still beat → tap cell 25.29 → sheet         | heatmap 2.3s, sheet ≈ 1.9s |
| 27.95-36.5 | 04 Together | Planning → task detail   | Planning tab 28.43 → "Everyone sees everything." → tap faucet 31.07 → handoff → tap ✓ 34.76 | ≈ 1.5s after ✓             |
| 36.6-40.5  | Ask         | Paper                    | "Start with what fits." on the 37.38 cue → logo → "Manage tasks at home, together."         | lockup ≥ 1.6s              |

## Tone

- Preset: `polished`
- Creative direction: "The Shared House Ledger", a calm editorial product film. The only frantic motion is the hook's pile-up; the turn is a decisive stop; everything after is unhurried and tactile, like paper being laid down.
- Restraint is the brand (PRODUCT.md: "trustworthy, organised, shared"). No chore-chart cutesiness, no SaaS dashboard language, no gamified flourish. Wit is in the copy ("Saturday does."), not in the motion.

## Format: vertical — 1080x1920, 30fps

Reason: HAUS is "phone-first, always"; the app itself is a 393-wide phone column. A landscape cut remains a cheap follow-up.

## Duration: 40.5s

## Visual identity (from the project)

Tokens from `DESIGN.md` (oklch converted; `#fbf6ee` matches the app's own `theme-color`).

- Background (House Paper): `#fbf6ee`; surface `#fffcf7`; warm rule `#e2dacc`
- Text (Ledger Ink): `#3a2d25`; muted `#7e7269`; inactive rail labels `#6b6057` (AA at 22px); active numerals `#703f0e`
- Accent (House Amber): `#d9a767` (rules, rings, highlights only; never text on paper)
- Display font: Anybody 600 (tight tracking); body: Figtree
- Canvas: cream paper for the hook, the phone chapters and the lockup; the UVP scene inverts to Ledger Ink, the one deliberate dark beat. The phone has a Ledger-Ink bezel and a soft ambient shadow.
- New in v2: the **chapter rail** — `01 WHO'S IN · 02 HOW LONG · 03 MATRIX · 04 TOGETHER`. The current step is lit (amber numeral, ink label, amber underline); the rest sit in muted ink.

## Share copy

17 jobs, 3 people home, 4 hours. HAUS plans the session, not the backlog: a shared household task manager that ranks every job by urgency × importance × what actually fits today. Live demo: https://benwassa.github.io/HAUS/

## Audio direction

- Role: tension → release → warm bed. Quiet bed plus accelerating soft ticks under the pile-up; a one-beat dip at the stop; music steadies at the UVP and stays calm; tactile UI accents carry the chapters.
- Music: bundled `happy-beats-business-moves-vol-11-by-ende-dot-app.mp3` (114.84 BPM), media start 0.0s. Bed ~0.18 under the hook, brief dip at the stop, ~0.32 from the UVP lock, steady, fade over the last 1.7s.
- Music cue guidance: preset `happy-beats-business-moves-vol-11-by-ende-dot-app.music-cues.json`. Beat times are saved in `work/beats.json`. Locks: 3.70 (the stop → UVP headline), 22.65 (Open matrix view), 37.38 (the closing line). Every other tap and re-rank is snapped to the nearest beat by the build script (`B()` in `work/build-composition.mjs`), including 8.96, 10.54, 13.70, 15.28, 16.34, 17.39, 18.44, 25.29, 28.43, 31.07, 34.76.
- Audio-reactive: subtle. Music energy breathes the warm amber light behind the phone. No waveform or equalizer imagery.
- SFX: sparse, motion-matched, warm. A distinct soft click per tap (a different file for nav taps, chip, row and ✓), card-slide for each screen change, soft drops on re-ranks and the sheet, one bell on the ✓, one bong on the logo. 31 clips on distinct tracks. No fireworks / "Task complete!" confetti even though the app has it.
- Loudness: normalized to −16 LUFS in `work/finalize.sh` so it sits with Hearth and Hermes.

## Grounding table (every on-screen claim)

| On screen                                                                       | Source                                                                                                                    |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| OPEN 17 / DONE 4 / SESSION 4h; 3 in session                                     | Live demo Home (verified)                                                                                                 |
| "Plan the session, not the backlog." / "Ranked by what can actually…"           | haus `full` copy and card `desc` (adapted / trimmed)                                                                      |
| Tap Alex's portrait; Alex's faucet + fridge filter leave Best Fit               | Live demo (captured in `work/capture.mjs`); Dashboard copy "Tap your portrait to join or leave the current work session." |
| Settings → This session → Session length chips (1h … 8h), Who's in              | Live demo Settings ("This session — Hours available today & who's in.")                                                   |
| SESSION 1h on Home; Best Fit "Tasks that fit a 1-hour session"                  | Live demo (captured after the 1h tap)                                                                                     |
| "Urgent × important × what fits."                                               | README `matrixScore = urgency × importance × resource`; Home Matrix panel subtitle                                        |
| Heatmap, "Top-right is what to tackle first.", sheet "3 tasks"                  | `MatrixView.jsx` (verbatim UI copy); identical with Alex out and 1h (checked)                                             |
| Planning By person lanes; faucet; Prep ✓ / Install / Test, "Waiting on Install" | Demo seed; captured live, including the label clearing after Install is completed                                         |
| "Everyone sees everything."                                                     | README ("Everyone in the home sees everything.")                                                                          |
| "Manage tasks at home, together."                                               | `SignIn.jsx`                                                                                                              |

## Stand-ins and privacy

- Source is the **public demo** (`https://benwassa.github.io/HAUS/`, seeded fake household "Maple Street House", fake members Alex/Jordan/Priya/Sam). No real user data, no `.env`, no service-account file read. The HAUS repo is read-only; nothing is written to it.
- Demo-only chrome removed from the captured screens (not part of the product): the "DEMO · sample household" banner (Home) and the demo readouts and note (Planning).
- Collaboration beats show **shared state**, not live multi-device sync. The demo is single-device, so real-time sync is not claimed on screen.
- "Saturday" and the hook's rhythm are dramatisation. The 17, 3 and 4h are the demo's real numbers.
- Overlay devices that are not in the app: tap ripples; an amber outline on the two rows that leave Best Fit; an amber ring on "Waiting on Install"; and the Best Fit rows glide between their captured positions (a FLIP between the real before/after lists, since in the app the list simply updates).

## Deliberately cut

- **Settings → Members (4) + invite code `DEMO42` ("Join with a code.")** was in v1. In v2 it could only be a one-off hop to a screen unrelated to the faucet job, which is the drift Ben called out. It is the first thing to add back, as its own chapter if wanted.
- Lane glide through all four people (v2 shows Unassigned, Alex and Jordan's lanes, which is enough to read "everyone, with names").
- Recurrence pills, photos, rooms, the 4-step Add flow, household switcher, whitelist, the "Task complete!" fireworks, the By-room view.

## Storyboard

### Issue — 0.0-3.7s (unchanged from v1)

Real Planning rows pour into one column, accelerating; OPEN counts to 17. "The list never ends." then "Saturday does." with three lit portraits and SESSION 4h. Hard stop on 3.70.

### UVP — 3.7-7.6s (unchanged from v1)

Ink canvas. The pile collapses to five; they lock into a ranked stack. **"Plan the session, not the backlog."** on the 3.70 lock, **"Ranked by what can actually get done today."** at 4.75. Ink inverts back to cream as the phone rises in (6.95).

### 01 Who's in — 7.6-13.0s

Phone on Home top, rail lights **01**. Caption **"Step out, and your jobs sink."** (8.0). Alex taps their own portrait (8.96): the card un-fills. The phone scrolls to Best Fit (9.50); on 10.54 Alex's two jobs flash and leave and "Swap entry hall bulbs" rises to #1. Hold to 13.0.

### 02 How long — 13.1-20.9s

Rail lights **02**; caption **"Only an hour? Quick jobs rise."** (13.3). Tap the Settings tab (13.70). Settings → **This session**: Session length 4h, Who's in with Alex Out. Tap **1h** (15.28). Tap the Home tab (16.34): SESSION now reads 1h; scroll to Best Fit (17.39); the 4-hour list re-ranks to the 1-hour list on 18.44 and the subtitle flips to "1-hour session". Hold to 20.9.

### 03 The Matrix — 20.95-27.7s

Rail lights **03**; caption **"Urgent × important × what fits."** (21.2). Home scrolls to The Matrix panel. Tap **Open matrix view** (22.65, a strong cue). The heatmap holds for 2.3s with nothing else moving. Tap the top-right cell (25.29): the sheet rises to "3 tasks". Hold to 27.7, then the sheet is dismissed.

### 04 Together — 27.95-36.5s

Rail lights **04**. Tap the Planning tab (28.43). Caption **"Everyone sees everything."** (28.95) over Planning By person; one smooth move brings Alex's lane to the top (30.0). Tap the faucet row (31.07). Caption **"Sam preps. Alex installs. Jordan tests."** (31.35). The task holds on its title for a beat, then scrolls to the phases; "Waiting on Install" is ringed. Tap ✓ on Install (34.76): the label clears and the counter reads 2/3 done. Hold to 36.5.

### Ask — 36.6-40.5s

The phone exits. **"Start with what fits."** lands on the 37.38 cue, lifts away at 38.07; the HAUS logo and **Manage tasks at home, together.** hold to the end.

## Poster frame

The settled UVP frame (6.5s: headline plus sub on Ledger Ink with the ranked stack; baked in as frame 0). It states the issue-answer on its own and is postable as a still.

## Open decisions for Ben

1. **Invite code / Members.** Cut from v2 to keep Together to one through-line. Want it back as a short fifth chapter ("Join with a code.")?
2. **Length.** 40.5s. Each chapter is 5-8s; the two-input session (01 + 02) is the longest stretch. If this is too long, 01 and 02 are the ones to compress, not to merge.
3. **Vertical vs landscape.** Still vertical (phone-first). A landscape re-cut is a new version.

## As built (v2)

- **Duration 40.5s, 1080×1920, 30fps, 1215 frames.** `hyperframes check`: 0 errors, 0 layout issues, 36/36 text checks pass WCAG AA (lint: the same 7 advisory warnings as v1 and the sibling brags). Final mix normalized to **-16.0 LUFS** (peak -1.3 dBFS) by `work/finalize.sh`; the raw render was -24.4 LUFS.
- Frame 0 of `brag.mp4` is the poster (UVP frame at 6.5s, PSNR 36.8 dB against `brag.jpg`).
- **Holds as built** (result on screen with its caption still up): 01 ≈ 2.0s, 02 ≈ 1.5s, 03 heatmap 2.3s then sheet ≈ 1.9s, 04 faucet read ≈ 2.1s before the ✓ and ≈ 1.5s after.
- **Changes from the v2 draft while building:**
  - Screen changes are now an opaque 0.14-0.18s dissolve with the incoming screen on top; the first draft's simultaneous cross-fade left a double-exposure frame mid-switch.
  - The task detail holds on its title (31.5-31.9s) before scrolling to the phases, so the viewer sees _which_ task the handoff belongs to. That pushed the ✓ and the ask back one beat (34.22 → 34.76; closing line 36.86 → 37.38), and the video from 40.0s to 40.5s.
  - The chapter rail's inactive labels use `#6b6057`, not the app's muted `#7e7269`: at 22px the lighter ink measured 4.3:1 and failed AA.
- **Honest limits:**
  - Best Fit's re-sort is a motion device. In the app the list just updates; v2 glides rows between the captured before/after positions. The before and after lists themselves are real.
  - With Alex out and 1h, "Replace fridge water filter" (Alex's job) is still in the 1-hour list at #4. That is what the live app shows, and it is a quick job, so "quick jobs rise" holds; it is not claimed that Alex's jobs leave at 1h.
  - Real-time multi-device sync is still not claimed.
