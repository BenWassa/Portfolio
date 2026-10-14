# Brag Plan: Hermes ("The Daily") — v4

## What changed from v3, and why

Ben on v3: nearly perfect, but a bit too fast to read through; the start needs to be cleaner; frame
the problem more clearly, then get into the solutions. So v4 keeps every v3 beat and changes three things:

1. **Cleaner start.** The 4x masthead macro with the hook line over a moving crop is gone. The video
   opens on the quiet night background, the music fades in, and one plain line at a time lands in the
   same top caption band the rest of the video uses. No camera move, no phone yet.
2. **The problem first (0–8.7s).** Kicker "THE PROBLEM", three lines held ~2.7s each: "Three news
   apps." / "Endless feeds." / "No finish line." Behind them, three abstract phone feeds (skeletons,
   no real apps) land one per beat while the line says "three", then scroll faster and faster. The
   drop in the music (8.73s) cuts them away for "THE FIX / THE DAILY / One finished paper.", which
   reads as the answer to "No finish line." and sets up the end card ("Ten minutes. Then you're done.").
3. **Slower tour.** Every scene is on the beat grid and held about 1.25–1.5x longer than v3 (captions
   now get roughly 0.4s per word, tabs get 1.64s instead of 1.09s, the lamplight wipe waits a beat so
   the light front page registers first), with a slow camera settle on the long holds so they stay alive.
   The run log gets a beat to read its headline before the card appears.

It runs 48.6s, up from 31.0s and well past the 25s guideline: the extra 17.6s is the problem act (8.7s,
new) plus the slower holds. Same copy, same real captures, same sound palette.

- Format: vertical 1080x1920, 48.6s
- Tone: default preset; quiet broadsheet, plain captions (kicker + one line), every tap on the beat grid
- Camera: one persistent phone, framed by a virtual camera; offstage until the push
- Music cue guidance: bundled vol-10, grids hand-read from its cue file. Intro grid 0.267 + n·0.5457
  (problem act); the track drops at ~8.73s and the groove grid is k·0.5457 from there (everything else)

| Time      | Beat                                                | Copy                                                    |
| --------- | --------------------------------------------------- | ------------------------------------------------------- |
| 0–0.8     | Night background, music fades in                    | (nothing)                                               |
| 0.8–3.5   | Three feeds land, one per beat                      | THE PROBLEM / "Three news apps."                        |
| 3.5–6.3   | Feeds scroll, accelerating                          | "Endless feeds."                                        |
| 6.3–8.7   | Still scrolling, faster                             | "No finish line."                                       |
| 8.7–11.5  | The drop: feeds fall away, masthead lands           | THE FIX / THE DAILY / "One finished paper."             |
| 11.5–15.8 | Real run log (Actions, Oct 2)                       | IT WRITES ITSELF / "188 stories in. 27 make the paper." |
| 15.8–18.5 | Lock screen, real push at 7:07, tap, app grows open | 7:07 A.M. / "One notification a day."                   |
| 18.5–21.3 | Front page                                          | FRONT PAGE / "Ranked and summarized by Gemini."         |
| 21.3–24.0 | Tap weather → week                                  | WEATHER / "Toronto today. Tap for the week."            |
| 24.0–30.6 | Tabs: Toronto, World, Sports, Business (1.64s each) | SECTIONS / section name                                 |
| 30.6–33.8 | Business lead expands, scroll, push-in on the note  | EVERY STORY / "The summary, and why it matters."        |
| 33.8–36.6 | Ask AI panel                                        | ASK AI / "One tap to Claude or ChatGPT."                |
| 36.6–39.3 | Opinion → Following desk                            | FOLLOWING / "Writers you follow, not outlets."          |
| 39.3–43.1 | Real weekly push → Voices this week                 | ONCE A WEEK / "Three pieces worth your time."           |
| 43.1–45.3 | Back to the front page, lamplight wipe              | DARK MODE / "The lamplight edition."                    |
| 45.3–48.6 | End card                                            | THE DAILY / "Ten minutes. Then you're done."            |

Copy sources: PRODUCT.md ("replace doomscrolling three news apps with one finite, finished paper",
"done in five to ten minutes", "pushed once per day"), README (Gemini ranks/summarizes; a Voice is a
person, not a publication), app UI strings, voice_digest.py (weekly push copy), the Oct 2 Actions logs.
"Three news apps" and "No finish line" are the PRODUCT.md framing; the 188 and 27 are the real run log.
