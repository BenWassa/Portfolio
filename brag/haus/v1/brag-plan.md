# Brag Plan: HAUS — v1

## What is this app?

HAUS is a phone-first shared household task manager that ranks every job by urgency × importance × what actually fits today, given who is home and how many hours the household has. The home is the unit: everyone sees everything.

## Message architecture (the spine)

Lesson from Hearth v1 → v2: a video that tours features before stating the problem and the value reads as random. HAUS v1 is built on one chain, and every scene does exactly one job in it.

| #   | Job                                           | Line on screen                                                                                | Proof on screen                                                                 | Grounded in                                                                              |
| --- | --------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | **Issue** — a shared backlog nobody can start | "The list never ends. Saturday does."                                                         | The real 17 open tasks pouring in, counter "OPEN 17", chips "3 in · 4h"         | Demo seed; Dashboard stat cards; Planning header ("3 in session")                        |
| 2   | **UVP** — plan the session, not the backlog   | "Plan the session, not the backlog." / "Ranked by what can actually get done today."          | The pile collapses to a short ranked stack                                      | `project-descriptions.ts` (haus `full` + card `desc`); README "session-based planning"   |
| 3   | **Proof A — the inputs** (01 The session)     | "Step out, and your jobs sink." / "Only an hour? Quick jobs rise."                            | Real Best Fit panel re-ranking when Alex leaves, then when SESSION goes 4h → 1h | Verified live (see Pacing map); README scoring                                           |
| 4   | **Proof B — the answer** (02 The Matrix)      | "Urgent × important × what fits."                                                             | Real heatmap, tap the top-right cell, real bottom sheet                         | `MatrixView.jsx`, README `matrixScore`                                                   |
| 5   | **Together** (03 Together)                    | "Join with a code." / "Everyone sees everything." / "Sam preps. Alex installs. Jordan tests." | Real invite code card, real By-person lanes, real phased handoff unblocking     | Settings, `PlanningView.jsx`, README ("Everyone in the home sees everything"), demo seed |
| 6   | **Ask**                                       | "Start with what fits." + HAUS lockup "Manage tasks at home, together."                       | Logo cut-out on paper                                                           | `SignIn.jsx` tagline                                                                     |

Nothing in the video is a feature tour for its own sake. If a feature does not feed the chain it is cut (see "Deliberately cut").

## The angle

**The backlog is infinite. Your Saturday isn't.** Every other household list asks you to look at everything. HAUS answers the only question that matters at 9 AM on a Saturday: _given who's home and how long we've got, what do we start?_ Same list, different Saturday, different order. That "same list, different answer" is the demo, and it is real: it is verified in the live app.

## Hook (first 2-3 seconds)

Cream paper canvas. The real task titles ("Replace kitchen faucet", "Clean garage gutters", "Sort basement donation bins" …) pour into one long list, accelerating, each row a real Planning row (room emoji, priority badge). The counter in the corner climbs to **OPEN 17**. Line one lands before 1s: **"The list never ends."** At ~2.2s: **"Saturday does."** with two real chips: three portraits lit and **SESSION 4h**.

## Key moments (the middle)

- **01 The session — who's in.** Real Home. Alex taps their own portrait; the card un-fills, the green dot goes grey. The camera pans to Best Fit: Alex's two rows (faucet, fridge filter) slide out, "Swap entry hall bulbs / Sam Rivera" rises to #1.
- **01 The session — how long.** The SESSION stat card is lifted out as a callout and flips **4h → 1h**. Best Fit re-ranks again: fridge water filter (a ~1h job) to #1; the three-hour faucet and gutters drop away.
- **02 The Matrix.** Real heatmap ("Top-right is what to tackle first."). Tap the top-right cell; the real sheet rises: "3 tasks".
- **03 Together.** Real invite code `DEMO42` and Copy → Planning By person: four lanes, every job attributed → the faucet job: Prep (Sam ✓), Install (Alex), Test (Jordan, "Waiting on Install"). Tap ✓ on Install and the waiting label disappears: Jordan is up.

## Outro / punchline

"Start with what fits." Then the HAUS stone-and-paper logo lands on cream with the app's own line, _Manage tasks at home, together._ The hook's problem ("never ends") is answered by the closing instruction ("start with what fits").

## User flow worth showing

Home (who's in, session length) → Best Fit / The Matrix re-rank → Matrix view → Settings invite code → Planning (By person) → Task detail (phased handoff). Entry → key action → result: **set who's in → the ranking changes → the right job is obvious → hand it on.**

## Pacing map (how the content is explored)

One idea per scene. Max three UI beats per scene. One meaningful change roughly every 1.5-2.0s once the hook ends. Chapter numerals **01 / 02 / 03** reuse the app's own panel numbering (the editorial "01 Most Urgent / 02 Best Fit / 03 The Matrix" device) so the structure is visible and the viewer always knows where they are.

| Time      | Scene          | Intensity            | New idea                | Read load (floor)                 | Held at floor?                    |
| --------- | -------------- | -------------------- | ----------------------- | --------------------------------- | --------------------------------- |
| 0.0-3.7   | Issue          | high, accelerating   | the backlog             | 4w + 2w lines (1.2s + 0.9s)       | yes, "Saturday does." holds ≥1.4s |
| 3.7-7.6   | UVP            | hard stop, then calm | session beats backlog   | 6w + 8w (1.8s + 2.4s, overlapped) | headline 2.2s; sub ≥2.4s          |
| 7.6-13.6  | 01 The session | measured             | two inputs, one ranking | 6w + 5w (1.8s + 1.5s)             | A 2.1s, B 1.8s                    |
| 13.6-17.0 | 02 The Matrix  | measured             | the answer, visualised  | 5w (1.5s)                         | 2.2s                              |
| 17.0-22.5 | 03 Together    | measured, tighter    | shared state + handoff  | 4w + 3w + 6w (1.2 + 0.9 + 1.8s)   | each ≥ floor, no slack            |
| 22.5-25.0 | Ask            | calm                 | the line + logo         | 4w + 5w (1.2s + 1.5s)             | lockup ≥1.6s                      |

## Tone

- Preset: `polished`
- Creative direction: "The Shared House Ledger", a calm editorial product film. The only frantic motion is the hook's pile-up; the turn is a decisive stop; everything after is unhurried and tactile, like paper being laid down.
- Interpretation: restraint is the brand (PRODUCT.md: "trustworthy, organised, shared", "editorial restraint"). No chore-chart cutesiness, no SaaS dashboard language, no gamified flourish. Wit is in the copy ("Saturday does."), not in the motion.

## Format: vertical — 1080x1920

Reason: HAUS is "phone-first, always"; the app itself is a 393-wide phone column, and Hermes (the other phone app) is vertical. A landscape cut is a cheap v2 if wanted.

## Duration: 25.0s

## Visual identity (from the project)

Tokens from `DESIGN.md` (oklch converted; `#fbf6ee` matches the app's own `theme-color`).

- Background (House Paper): `#fbf6ee`; surface `#fffcf7`; pressed stone `#faf2e6`; warm rule `#e2dacc`
- Text (Ledger Ink): `#3a2d25`; muted `#7e7269`
- Accent (House Amber): `#d9a767`; amber wash `#f8e9d2`; olive wash `#eaf2e0`; blue wash `#e2f1fa`
- Semantic (only with labels): success `#43b966`, danger `#e55551`
- Display font: Anybody 600 (tight tracking); body: Figtree
- Canvas treatment: cream paper for the hook, the phone scenes and the lockup; the UVP scene inverts to Ledger Ink (`#3a2d25`) with cream type, the one deliberate dark beat, so the turn is felt. The phone has a Ledger-Ink bezel and a soft ambient shadow.
- Strongest visual elements: the real Best Fit / Matrix panels, the heatmap, the phased faucet task, and the HAUS logo (slate letters cut from paper with green, blue and terracotta room colours showing through)

## Share copy (draft)

17 jobs, 3 people home, 4 hours. HAUS plans the session, not the backlog: a shared household task manager that ranks every job by urgency × importance × what actually fits today. Live demo: https://benwassa.github.io/HAUS/

## Audio direction

- Role: tension → release → warm bed. Quiet bed plus accelerating soft ticks under the pile-up; a one-beat dip at the stop; music steadies at the UVP and stays calm through the demo; tactile UI accents carry the product scenes.
- Music: bundled `happy-beats-business-moves-vol-11-by-ende-dot-app.mp3` (114.84 BPM). Variety: Hermes used vol-10, Hearth vol-12.
- Music treatment: media start 0.0s. Bed ~0.18 under the hook, brief dip at the stop, lift to ~0.32 on the UVP lock, steady through the demo, fade from ~24.0s to the end.
- Music cue guidance: preset `assets/music/cues/happy-beats-business-moves-vol-11-by-ende-dot-app.music-cues.json` (read). Beat grid ≈ every 0.522s. Strong cues in window: 1.60, 3.70, 5.80, 6.34, 8.96, 9.50, 12.65, 17.91, 22.65, 24.23. **Locks (3):** 3.70 (the stop → UVP headline), 9.50 (Best Fit re-ranks: "your jobs sink"), 22.65 (outro line). Sequential events on the grid: S1 row cadence accelerating into 3.70; S3 beat B re-rank at 12.12; S5 lane glide at 18.96, 19.49, 20.02. Ignore any cue that hurts readability.
- Audio-reactive treatment: subtle. Music bass/RMS gently breathes the warm amber light behind the phone and the paper shadow under the headline. No waveform or equalizer imagery.
- SFX posture: sparse, motion-matched, warm and low high-frequency-risk (per `sfx-analysis.md`): soft ticks on the pile-up, a soft impact on the stop and the UVP lock, clicks on taps, a toggle sound on the portrait, soft drops on row re-ranks and the sheet, one confirm accent on Jordan's unblock, one bong/bell on the logo. Exact files and timestamps chosen after the animation exists.
- Audio-coupled moments: row pour-in cadence; portrait toggle; list re-rank (rows land one by one); sheet rise; the ✓ on Install; the logo.
- Restraint rule: no stacked hits, no SFX louder than the music bed's lift, nothing that sounds like a game ("gimmicky gamification" is an anti-reference). No fireworks / "Task complete!" confetti even though the app has it.

## Grounding table (every on-screen claim)

| On screen                                                                             | Source                                                                                         |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| OPEN 17 / DONE 4 / SESSION 4h; 3 in session                                           | Live demo Home + Planning header (verified)                                                    |
| "Plan the session, not the backlog."                                                  | haus `full` copy: "plans housework around the session, not the backlog" (adapted)              |
| "Ranked by what can actually get done today."                                         | haus card `desc` (trimmed)                                                                     |
| "Who's in right now" / "Tap your portrait to join or leave the current work session." | `Dashboard.jsx`                                                                                |
| Best Fit re-rank on leaving the session                                               | Verified live: Best Fit loses faucet + fridge filter; "Swap entry hall bulbs" → #1             |
| 4h → 1h re-rank                                                                       | Verified live: Best Fit #1 = "Replace fridge water filter"; Matrix #1 likewise; faucet to #3   |
| "Urgent × important × what fits."                                                     | README `matrixScore = urgency × importance × resource`; Home Matrix panel subtitle             |
| Heatmap + "Top-right is what to tackle first."                                        | `MatrixView.jsx` (verbatim UI copy)                                                            |
| "Join with a code."                                                                   | README ("enter a 6-character code"); Onboarding ("Enter the 6-character code someone shared.") |
| Invite code `DEMO42` + Copy                                                           | Live demo Settings (public demo code)                                                          |
| "Everyone sees everything."                                                           | README ("Everyone in the home sees everything.")                                               |
| Sam / Alex / Jordan + Prep / Install / Test, "Waiting on Install"                     | Demo seed; verified live, including the label clearing after Install is completed              |
| "Manage tasks at home, together."                                                     | `SignIn.jsx`                                                                                   |

## Stand-ins and privacy

- Source is the **public demo** (`https://benwassa.github.io/HAUS/`, seeded fake household "Maple Street House", fake members Alex/Jordan/Priya/Sam). No real user data, no `.env`, no service-account file read. HAUS repo is read-only; nothing is written to it.
- Demo-only chrome removed from the captured screens (not part of the product): the "DEMO · sample household" banner (Home), the demo readouts and note (Planning), and the "Demo data" card plus reset buttons (Settings).
- Collaboration beats show **shared state**, not live multi-device sync. The demo is single-device, so real-time sync is not claimed on screen.
- "Saturday" and the hook's rhythm are dramatisation. The 17, 3 and 4h are the demo's real numbers.
- The Matrix panel contents, the Members list and invite card, and the By-person lanes are real demo UI. The Onboarding join screen is not shown (it differs in demo mode).
- Overlay devices that are not in the app: tap ripples, an amber ring on the invite card and on the "Waiting on Install" label, an amber outline pulse on the two rows that leave Best Fit, and the SESSION callout (a clone of the real stat card lifted out of the page).

## Capture plan (from the live demo, 393×852 phone viewport, Playwright)

States to record as real DOM + CSS, then animate in the composition: Home baseline; Home with Alex out; Home with SESSION 1h; Matrix view; Matrix cell sheet (high × urgent); Settings (invite card); Planning By person (full lanes); Faucet task before and after completing Install; Planning rows for the pile-up. Fonts (Anybody, Figtree) bundled locally so the render has no network dependency.

## Deliberately cut

Recurrence pills, photos, rooms and room visibility, the 4-step Add flow, household switcher, whitelist, the "Task complete!" fireworks, the By-room view. Each is real but none feeds the Issue → UVP → proof → together chain, and the 25s cap is firm.

## Storyboard

### Scene 1 — The list never ends — 0.0-3.7s

Cream paper. Real Planning rows pour into one column and scroll, accelerating; counter **OPEN 17** counts up in step with the pour. "The list never ends." (settled by ~0.9s, hold to ~2.2s). "Saturday does." lands at ~2.2s with three lit portraits and a **SESSION 4h** chip; holds ≥1.4s.
Sequential/interaction: yes. Rows arrive one by one on an accelerating cadence (≈0.25s apart falling to ≈0.08s); counter ticks 1→17 in sync.
Audio intent: tension without alarm. A quiet bed and soft ticks that tighten.
Audio-coupled idea: ticks on row arrival, ratcheting with the cadence; counter ticks on the same hits.
Music: bed held back (~0.18).
Transition mood: hard stop → Scene 2. Everything freezes at ~3.6s; on the 3.70 strong cue the canvas inverts to Ledger Ink.

### Scene 2 — Plan the session, not the backlog — 3.7-7.6s

Ink canvas. The pile collapses: all but five rows drop away; the survivors lock into a ranked stack. Small amber "HAUS" eyebrow. **"Plan the session, not the backlog."** lands on the 3.70 lock (hold ≥2.2s). **"Ranked by what can actually get done today."** lands ~4.8s (hold ≥2.4s).
Sequential/interaction: yes. The five survivors settle top to bottom with a card-like drop.
Audio intent: relief, decision. One soft impact on the lock; music steps up.
Audio-coupled idea: beat-locked headline at 3.70; soft drops as the five rows settle.
Music: lift to ~0.32.
Transition mood: soft → Scene 3. The ink inverts back to cream as the phone rises in.

### Scene 3 — 01 The session — 7.6-13.6s

Phone on cream, amber glow behind. Chapter marker **01 The session**. Real Home top (stats, "Who's in right now", four portraits, three lit). 8.96: Alex taps their own portrait (card un-fills, dot goes grey). Pan down to Best Fit. 9.50 (lock): Alex's two rows slide out, the rest rise, "Swap entry hall bulbs" is #1. Caption A: **"Step out, and your jobs sink."** (hold ≥2.1s). 11.4: the SESSION stat card lifts out as a callout and flips **4h → 1h**; 12.12: Best Fit re-ranks, fridge water filter to #1, the half-day jobs drop. Caption B: **"Only an hour? Quick jobs rise."** (hold ≥1.8s).
Sequential/interaction: yes. Simulated tap on the portrait; rows re-rank one by one on beats; callout flip.
Audio intent: cause and effect, clean and tactile.
Audio-coupled idea: click + toggle on the tap; soft drops as rows land; a lighter tick on the 4h → 1h flip.
Music: steady bed.
Transition mood: clean → Scene 4.

### Scene 4 — 02 The Matrix — 13.6-17.0s

Chapter marker **02 The Matrix**. Phone at the Matrix panel; tap **Open matrix view** (~14.3). Heatmap fades in ("Top-right is what to tackle first."). Tap the top-right cell (~15.8, on the beat); the real sheet rises: HIGH IMPORTANCE · URGENT URGENCY, "3 tasks". Caption: **"Urgent × important × what fits."** (hold ≥2.2s).
Sequential/interaction: yes. Simulated taps (button, cell); sheet rises.
Audio intent: a satisfied, orderly click.
Audio-coupled idea: click on each tap; soft drop on the sheet.
Music: steady bed.
Transition mood: slide → Scene 5.

### Scene 5 — 03 Together — 17.0-22.5s

Chapter marker **03 Together**. (a) 17.0-18.5, Settings: the invite card, `DEMO42`, tap **Copy** on the 17.91 strong cue; caption **"Join with a code."** (b) 18.5-20.1, Planning By person: the camera glides lane to lane (Alex, Jordan, Priya, Sam) on beats; caption **"Everyone sees everything."** (c) 20.1-22.5, tap into "Replace kitchen faucet": phases Prep (Sam ✓), Install (Alex), Test (Jordan, "Waiting on Install"); tap ✓ on Install (~21.6); the waiting label clears and the counter reads 2/3 done. Caption **"Sam preps. Alex installs. Jordan tests."** (hold ≥1.8s).
Sequential/interaction: yes. Lanes glide on the beat grid; names read one at a time in (c); simulated tap on the ✓.
Audio intent: warm, collaborative; one gentle confirm when Jordan unblocks.
Audio-coupled idea: click on Copy; soft glide ticks per lane (accents only, not text); confirm accent on the ✓.
Music: steady bed.
Transition mood: soft → Scene 6.

### Scene 6 — Start with what fits — 22.5-25.0s

Cream. **"Start with what fits."** lands on the 22.65 lock (hold ≥1.2s), then lifts away as the HAUS logo lands at ~23.4 (cut from paper, soft shadow) with **Manage tasks at home, together.** (hold ≥1.6s to the end).
Sequential/interaction: none.
Audio intent: resolve and rest.
Audio-coupled idea: one warm bong/bell on the logo; music fades from ~24.0.
Music: fade out.

**Music mood for this video:** steady, warm, upbeat-but-restrained, held back under the pile-up and released at the UVP.
**Audio summary:** a quiet tightening tick bed under the pile-up stops dead on the 3.70 cue, the music steps up and stays calm, tactile clicks and soft drops carry each cause and effect, one confirm when Jordan unblocks, and a single bell on the logo.

## Poster frame

The settled UVP frame in Scene 2 (6.5s: headline plus sub on Ledger Ink with the ranked stack; baked in as frame 0). It states the issue-answer on its own and is postable as a still.

## Open decisions for Ben

1. **Vertical vs landscape.** Chosen vertical (phone-first). Say the word and v2 is a landscape re-cut.
2. **25s cap vs 30s.** Held at 25.0s per the skill gate. "03 Together" is the tightest scene (three captions back to back); a ~30s cut would let it breathe (Hermes v3 ran 31s).
3. **Single-phone collaboration.** Shown as shared state on one device; a two-phone "Jordan sees it instantly" shot would imply live sync, which the single-device demo cannot honestly prove.

## As built (v1)

- **Duration 25.0s, 1080×1920, 30fps.** `hyperframes check`: 0 errors, 16/16 text checks pass WCAG AA. Final mix normalized to **-16.0 LUFS** (peak -1.3 dBFS) with a two-pass loudnorm in `work/finalize.sh` so it sits with Hearth/Hermes; the raw render was -24.5 LUFS.
- Scene boundaries held: 0.0 / 3.7 / 7.6 / 13.6 / 17.0 / 22.5 / 25.0. Strong-cue locks used: 3.70, 9.50, 17.91, 22.65. Taps and re-ranks sit on the beat grid (8.44, 12.12, 14.22, 15.28, 18.96, 19.49, 20.02, 21.59).
- Changes from the plan while building: the settings beat also shows the real **Members (4)** list above the invite code; chapter 01's marker reads "Who's in · How long" (no separate headline); the closing line is a deliberate two-line lockup ("Start with / what fits."), logo and tagline below it.
- Pacing is the weak point. Every caption holds at or above its reading floor, but "03 Together" runs three captions back to back and the Matrix scene gives the heatmap ~0.7s before the cell tap. Hearth (22s → 37s) and Hermes (31s → 49s) were both lengthened after review; the 25s window is a skill rule, not a content limit. A paced v2 (~35s: two beats per gesture, longer holds on each re-rank, a still beat on the heatmap, lanes one per two beats) is the obvious next version.
