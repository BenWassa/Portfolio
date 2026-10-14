# Brag Plan: Hermes ("The Daily") — v2

## What changed from v1, and why

v1 (`../v1/`) was a hand-drawn recreation of one screen. Ben's notes on v1: more frames of the
app itself and the areas it offers; technicals simpler but more credible; an editorial pass and fixes.

## What is this app?
An autonomous pipeline that assembles a personalized Toronto morning newspaper, renders it as one static
page, and sends one push when the edition is ready.

## The angle
A newspaper with a readership of one, shown as it actually ran this morning (Friday, October 2, 2026):
the real build, the real push, and the real edition, tapped through on a phone.

## Hook (0–2.9s)
"Circulation: one." with the dek "A personalized morning newspaper."

## Key moments
- The run, simplified: "188 stories in. 27 make the paper." plus four real log lines from today's Actions run.
- The real push at 7:07 → tap → the app opens from the notification.
- The tour, on real screens captured from the live edition: front page → weather week → Toronto →
  "Why it matters" → Ask AI (Claude / ChatGPT) → Sports (home teams) → Following.

## Outro / punchline
"One finite, finished paper." / "The only KPI: was this morning's read worth it?" (both from PRODUCT.md)

## User flow worth showing
Push → open → browse sections → expand a story → hand it to an AI → check the people you follow.

## Tone
- Preset: default
- Creative direction: quiet broadsheet, deadpan, evidence over claims
- Interpretation: newspaper-style captions (kicker + one-line headline), every tap on the beat grid,
  real data everywhere a number appears.

## Format: vertical — 1080x1920
## Duration: 24.8s (the extra app beats Ben asked for are the reason it runs past 22s)

## Visual identity (from the project)
- Background: #151a22 lamplight navy with a soft glow; paper #faf8f3 inside the phone
- Accents: masthead red (dark-mode #d1726b for kickers), navy #1a2744
- Type: Georgia (display/body), Arial (labels), SF Pro / SF Mono for the iPhone chrome and the log

## Share copy (draft)
My morning newspaper has a circulation of one. Today it read 188 stories, printed 27, and sent one push at 7:07.

## Audio direction
- Music: bundled "happy-beats-business-moves-vol-10" (≈110 BPM), 0.5 gain, fade from 23.7s
- Strong cues used: 20.19 (masthead), 20.74 (line 1), 21.83 (line 2); beat grid for log lines and every tap
- Audio-reactive: subtle background glow from precomputed RMS
- SFX: soft impact on the hook, ticks on log lines, one notification bong, a click on each tap,
  soft impacts under the outro lines

## Storyboard
1. Hook — 0–2.9s — "Circulation: one."
2. The run — 2.9–6.9s — headline + log panel (lines on 4.10 / 4.64 / 5.19 / 5.74, ✓ 1m 49s at 6.28)
3. Push — 6.9–8.7s — lock screen 7:07, ntfy banner at 7.35, tap 8.22, app zooms open
4. Tour — 8.7–20.1s — captions swap with each tap:
   - 8.73 FRONT PAGE "Ranked, summarized, done."
   - 9.83 TORONTO WEATHER "Today, then the week." (tap the weather strip)
   - 11.47 TORONTO "City Hall to bike lanes." (tap the Toronto tab)
   - 12.56 WHY IT MATTERS "The why, not just the what." (tap the lead; scroll to the note)
   - 15.28 ASK AI "Ask Claude or ChatGPT." (tap Ask AI; the panel opens)
   - 17.47 SPORTS "The home teams." (tap Sports in the pinned tab strip)
   - 18.55 FOLLOWING "People, not publications." (tap Opinion)
5. Outro — 20.1–24.8s — masthead, then the two closing lines on strong cues
