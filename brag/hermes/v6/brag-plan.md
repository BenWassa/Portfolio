# Brag Plan: Hermes ("The Daily") — v6

## What changed from v5, and why

Ben on v5: nearly perfect; just wait 2–3 seconds longer at the end of each screen so people can check it
out for a moment.

So v6 keeps v5 exactly and adds **four beats (2.2s) of stillness at the end of every app screen**: front
page, weather, Toronto, World, Sports, Business, the story, Ask AI, Following, Voices and the lamplight
edition. Each screen now ends with its scroll finished and nothing moving (frames at the start and end of
each hold match to within encoder noise, PSNR 51–75 dB), then the next tap. Because the hold is added
after the scroll ends, the front page and each tab now rest for about 2.7s, not 0.5s.

Implementation: events are still written against v5's beat indices; `G(k)` shifts every index by 4 beats
for each screen end at or before it (`ENDS` in `index6.src.html` / `assemble6.cjs`). The camera also
settles slowly across the longer lamplight hold. The problem act, turn, run log, lock screen and end card
are unchanged.

It runs 90.0s, up from 66.0s and well past the 25s guideline: that is 11 holds of 2.2s. The bed (vol-10)
is 60s, so the groove loops: it plays straight to 52.4s, then repeats its beats 48–96 (12 bars) twice with
60 ms crossfades (`work/build_bed.sh`), staying on the beat grid.

- Format: vertical 1080x1920, 90.0s
- Tone: default preset; quiet broadsheet, plain captions (kicker + one line), every tap on the beat grid
- Camera: one persistent phone, framed by a virtual camera; offstage until the push
- Music cue guidance: bundled vol-10. Intro grid 0.267 + n·0.5457 (problem act); drop at ~8.73s, then
  groove grid k·0.5457 for everything else (looped from 52.4s)

| Time      | Beat                                                                        | Copy                                                                    |
| --------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 0–0.8     | Night background, music fades in                                            | (nothing)                                                               |
| 0.8–8.7   | Three feeds land, then scroll faster and faster                             | THE PROBLEM / "Other news apps." / "Endless feeds." / "No finish line." |
| 8.7–11.5  | The drop: feeds fall away, masthead lands                                   | THE FIX / THE DAILY / "One finished paper."                             |
| 11.5–16.4 | Real run log (Actions, Oct 2)                                               | IT WRITES ITSELF / "188 stories in. 27 make the paper."                 |
| 16.4–19.6 | Lock screen, real push at 7:07, tap, app grows open                         | 7:07 A.M. / "One notification a day."                                   |
| 19.6–26.7 | Front page, scrolls to the bottom, then holds 2.7s                          | FRONT PAGE / "Ranked and summarized by Gemini."                         |
| 26.7–32.2 | Tap weather → week, pan down, hold                                          | WEATHER / "Toronto today. Tap for the week."                            |
| 32.2–54.0 | Tabs: Toronto, World, Sports, Business (5.5s each: hold, scroll, 2.7s hold) | SECTIONS / section name                                                 |
| 54.0–60.6 | Business lead expands, scroll to the summary and why it matters, hold       | EVERY STORY / "The summary, and why it matters."                        |
| 60.6–66.6 | Ask AI panel, hold                                                          | ASK AI / "One tap to Claude or ChatGPT."                                |
| 66.6–73.1 | Opinion → Following desk, slow push-in and scroll, hold                     | FOLLOWING / "Writers you follow, not outlets."                          |
| 73.1–81.9 | Real weekly push → Voices this week, scroll to the third piece, hold        | ONCE A WEEK / "Three pieces worth your time."                           |
| 81.9–86.8 | Back to the front page, lamplight wipe, slow settle                         | DARK MODE / "The lamplight edition."                                    |
| 86.8–90.0 | End card                                                                    | THE DAILY / "Ten minutes. Then you're done."                            |

Copy sources: PRODUCT.md ("replace doomscrolling three news apps with one finite, finished paper",
"done in five to ten minutes", "pushed once per day"), README (Gemini ranks/summarizes; a Voice is a
person, not a publication), app UI strings, voice_digest.py (weekly push copy), the Oct 2 Actions logs.

## Sports accuracy check (unchanged from v5)

Checked every field on the screen against the Oct 2 edition's `sports` block (embedded in
`frozen.html`) and the app's renderer (`template/sports.js` in the Hermes repo, read-only here).

| On screen                                                                                                   | Source data                                                     | Result                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Leafs: Regular, W 2–1 vs New York Islanders, record 1-1-0, 4th Atlantic, next vs Ottawa Sat Oct 3 7:00 p.m. | NHL: Sep 30 final 2–1 (home), 1-1-0, 4th Atlantic, Oct 3 23:00Z | matches                                                                                                                                                                                                                                                                                                |
| Raptors: Preseason, next vs Miami Heat Sat Oct 3 7:00 p.m.                                                  | ESPN: preseason, home, Oct 3 23:00Z                             | matches                                                                                                                                                                                                                                                                                                |
| Blue Jays: Offseason, next @ Pittsburgh Pirates Fri, Feb 19                                                 | MLB: Feb 19 2027 spring-training game                           | date matches; time removed (below)                                                                                                                                                                                                                                                                     |
| Weather week above the tabs                                                                                 | n/a                                                             | v4 bug: the page is too short to scroll past it and the weather panel had been left open. v5 captures with weather collapsed and frames from the tab strip down                                                                                                                                        |
| Raptors logo shown as a plain "R"                                                                           | `mark.light` = cdn.nba.com logo (HTTP 200)                      | v4 capture failed to load it in headless Chrome, so the app fell back to its "R" mark. v5 captures with a mobile UA, waits for marks, and all three logos load                                                                                                                                         |
| Blue Jays "· 3:33 a.m."                                                                                     | `start_time_toronto` 2027-02-19T03:33                           | **App bug, not a capture bug.** MLB returns a placeholder 08:33Z for spring-training games and `torontoWhen()` prints it as a real time. The live Oct 4 edition still shows it. The v5 capture removes only that time from the DOM (`capture5.cjs`); nothing was changed in Hermes. Worth fixing there |

The Sports section has no stories on Oct 2 ("zero is normal" per the sports spec) and the only major event
(Champions League) is unavailable and hidden, so Home Teams is genuinely all the page has. If Ben meant
something else missing, it isn't in this edition's data.
