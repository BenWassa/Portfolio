# Brag Plan: Hermes ("The Daily") — v5

## What changed from v4, and why

Ben on v4: way better but still really fast; the intro should say "other news apps"; go slower on each
screen and scroll slowly down to show things; the Sports screen shouldn't show the weather (inaccurate),
was missing a team logo and some stuff, and needs an accuracy check.

1. **"Other news apps."** The first problem line is now "Other news apps." (was "Three news apps."),
   then "Endless feeds." and "No finish line." The three scrolling feeds stay.
2. **Slower, with scrolling.** Every screen is held about twice as long as v4 (tabs 3.3s instead of
   1.6s, front page 5s, Voices 6.5s) and every scene now moves down its page slowly:
   - Front page: the real page scrolls ~330pt with the sticky tab strip pinned.
   - Toronto / World / Business: the page scrolls to its end (the sticky strip pinned) while the camera
     pans down, so the fourth story is read, not cropped. These pages are only four collapsed cards, so
     real scroll range is 26–65pt and the camera does the rest.
   - Weather: pans down from the week to the tabs and the lead story. Story: holds the top, scrolls to
     the summary, then to "why it matters". Following: slow push-in plus a page scroll.
   - Voices: skips the long paragraph, rests on the first piece, then scrolls to the real end of the
     page so all three pieces are seen ("Three pieces worth your time" is now literally shown).
3. **Sports re-captured and accuracy-checked** (details below).

It runs 66.0s, up from 48.6s: the extra is slower holds and scrolling, not new content. The bed
(vol-10) is only 60s, so at 52.4s it jumps back 12 bars (48 beats) with a 60 ms crossfade, which keeps
the beat grid intact (`work/build_bed.sh`).

- Format: vertical 1080x1920, 66.0s
- Tone: default preset; quiet broadsheet, plain captions (kicker + one line), every tap on the beat grid
- Camera: one persistent phone, framed by a virtual camera; offstage until the push
- Music cue guidance: bundled vol-10. Intro grid 0.267 + n·0.5457 (problem act); drop at ~8.73s, then
  groove grid k·0.5457 for everything else

## Sports accuracy check

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

| Time      | Beat                                                              | Copy                                                                    |
| --------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 0–0.8     | Night background, music fades in                                  | (nothing)                                                               |
| 0.8–8.7   | Three feeds land, then scroll faster and faster                   | THE PROBLEM / "Other news apps." / "Endless feeds." / "No finish line." |
| 8.7–11.5  | The drop: feeds fall away, masthead lands                         | THE FIX / THE DAILY / "One finished paper."                             |
| 11.5–16.4 | Real run log (Actions, Oct 2)                                     | IT WRITES ITSELF / "188 stories in. 27 make the paper."                 |
| 16.4–19.6 | Lock screen, real push at 7:07, tap, app grows open               | 7:07 A.M. / "One notification a day."                                   |
| 19.6–24.6 | Front page, scrolls to the bottom                                 | FRONT PAGE / "Ranked and summarized by Gemini."                         |
| 24.6–27.8 | Tap weather → week, pan down                                      | WEATHER / "Toronto today. Tap for the week."                            |
| 27.8–40.9 | Tabs: Toronto, World, Sports, Business (3.3s each, each scrolled) | SECTIONS / section name                                                 |
| 40.9–45.3 | Business lead expands, scroll to the summary and why it matters   | EVERY STORY / "The summary, and why it matters."                        |
| 45.3–49.1 | Ask AI panel                                                      | ASK AI / "One tap to Claude or ChatGPT."                                |
| 49.1–53.5 | Opinion → Following desk, slow push-in and scroll                 | FOLLOWING / "Writers you follow, not outlets."                          |
| 53.5–60.0 | Real weekly push → Voices this week, scroll to the third piece    | ONCE A WEEK / "Three pieces worth your time."                           |
| 60.0–62.8 | Back to the front page, lamplight wipe                            | DARK MODE / "The lamplight edition."                                    |
| 62.8–66.0 | End card                                                          | THE DAILY / "Ten minutes. Then you're done."                            |

Copy sources: PRODUCT.md ("replace doomscrolling three news apps with one finite, finished paper",
"done in five to ten minutes", "pushed once per day"), README (Gemini ranks/summarizes; a Voice is a
person, not a publication), app UI strings, voice_digest.py (weekly push copy), the Oct 2 Actions logs.
