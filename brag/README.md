# Brag videos

Short launch-style videos for the projects in this portfolio, made with the `/brag` skill
(Hyperframes). One folder per project, one subfolder per iteration: `brag/<project>/v<N>/`.
Past versions are never overwritten.

## Watch

Newest version first within each project.

| Project | Version | Angle                                                                                                                                                                                                                                                                                                                       | Video                                             | Poster                         | Share copy                                 |
| ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------ | ------------------------------------------ |
| HAUS    | v2      | "The backlog is infinite. Your Saturday isn't." v1 re-ordered so each feature is seen through: a four-step rail (Who's in, How long, Matrix, Together), one caption held through each cause → effect, the real Settings > This session control for "1h" instead of a made-up card, and a single faucet handoff for Together | [brag.mp4](haus/v2/brag.mp4) (40.5s, 1080×1920)   | [brag.jpg](haus/v2/brag.jpg)   | [share-copy.txt](haus/v2/share-copy.txt)   |
| HAUS    | v1      | "The backlog is infinite. Your Saturday isn't." Issue → UVP → proof → together: the real 17 open tasks pile up, "Plan the session, not the backlog.", then Best Fit re-ranks when Alex steps out and when SESSION goes 4h → 1h, the Matrix heatmap, the invite code and a phased faucet handoff                             | [brag.mp4](haus/v1/brag.mp4) (25.0s, 1080×1920)   | [brag.jpg](haus/v1/brag.jpg)   | [share-copy.txt](haus/v1/share-copy.txt)   |
| Hermes  | v5      | "Other news apps." problem first, then the same tour at half speed with every page scrolled; Sports re-captured and accuracy-checked (logos, no weather, placeholder time removed)                                                                                                                                          | [brag.mp4](hermes/v5/brag.mp4) (66.0s, 1080×1920) | [brag.jpg](hermes/v5/brag.jpg) | [share-copy.txt](hermes/v5/share-copy.txt) |
| Hermes  | v4      | "Three news apps. Endless feeds. No finish line." The problem first, then "One finished paper." on the music drop; same tour as v3, slower holds on the beat grid                                                                                                                                                           | [brag.mp4](hermes/v4/brag.mp4) (48.6s, 1080×1920) | [brag.jpg](hermes/v4/brag.jpg) | [share-copy.txt](hermes/v4/share-copy.txt) |
| Hermes  | v3      | "I replaced three news apps with one finished paper." Masthead macro, real run log, push at 7:07, then a camera tour of the front page, weather, four sections, Ask AI, Following, the weekly Voices push and dark mode                                                                                                     | [brag.mp4](hermes/v3/brag.mp4) (31.0s, 1080×1920) | [brag.jpg](hermes/v3/brag.jpg) | [share-copy.txt](hermes/v3/share-copy.txt) |
| Hermes  | v2      | "A circulation of one." Real run log, real push and real captures of the Oct 2 edition, tapped through on a phone                                                                                                                                                                                                           | [brag.mp4](hermes/v2/brag.mp4) (24.8s, 1080×1920) | [brag.jpg](hermes/v2/brag.jpg) | [share-copy.txt](hermes/v2/share-copy.txt) |
| Hermes  | v1      | "A newspaper that delivers itself." Deadpan 5:17 AM clock and a hand-drawn recreation of one screen. Re-rendered from the preserved composition (original render wasn't kept)                                                                                                                                               | [brag.mp4](hermes/v1/brag.mp4) (22.4s, 1080×1920) | [brag.jpg](hermes/v1/brag.jpg) | [share-copy.txt](hermes/v1/share-copy.txt) |
| Hearth  | v4      | "One place for it all." v3's pacing, new message: one shared watchlist for every streaming service and a private shelf per group (new real "Choose a Space" scene), plain mood categories; replaces "You need yours"                                                                                                        | [brag.mp4](hearth/v4/brag.mp4) (40.5s, 1080p)     | [brag.jpg](hearth/v4/brag.jpg) | [share-copy.txt](hearth/v4/share-copy.txt) |
| Hearth  | v3      | "Still scrolling." v2 re-timed: the clock now runs 9:12 → 11:00 PM and holds on the freeze, every app gesture gets two beats, Tonight scrolls in two stops; same copy, same real UI                                                                                                                                         | [brag.mp4](hearth/v3/brag.mp4) (37.2s, 1080p)     | [brag.jpg](hearth/v3/brag.jpg) | [share-copy.txt](hearth/v3/share-copy.txt) |
| Hearth  | v2      | "Still scrolling." Endless feed vs. your own shelf: save + tag the mood, then pick by mood tonight; clock pays off "9:04 PM. Already watching."                                                                                                                                                                             | [brag.mp4](hearth/v2/brag.mp4) (22.2s, 1080p)     | [brag.jpg](hearth/v2/brag.jpg) | [share-copy.txt](hearth/v2/share-copy.txt) |
| Hearth  | v1      | "You pick." chat standoff, then a tour of the real app (Tonight rails, Save for Us)                                                                                                                                                                                                                                         | [brag.mp4](hearth/v1/brag.mp4) (22.6s, 1080p)     | [brag.jpg](hearth/v1/brag.jpg) | [share-copy.txt](hearth/v1/share-copy.txt) |

On GitHub, click the `.mp4` to play it in the browser.

## Folder layout

```
brag/<project>/v<N>/
  brag.mp4            final render (poster baked in as frame 0)
  brag.jpg            poster / thumbnail
  share-copy.txt      post text
  brag-plan.md        angle + storyboard (from v2 on: what changed and why)
  composition-brief.md
  composition/        Hyperframes project (npx hyperframes preview)
  work/               capture + build scripts used to regenerate it
```

## Adding a project or a new version

1. Pick the next unused version number (`v1` for a new project).
2. Run `/brag <project>` with `brag/<project>/v<N>/` as the output directory. To build on an
   earlier version, copy its `work/` scripts and `composition/` into the new folder and edit the copy.
3. Add a row to the table above with a one-line angle.

Never edit or delete a past version's files. Keep `composition/assets/music/` out of git
(see `.gitignore`).

Hermes compositions load proprietary system fonts (SF Pro, SF Mono, Arial, Georgia) from
`composition/assets/fonts/*.ttf`. Those are gitignored; to re-render a Hermes version, copy them from
macOS (`/System/Library/Fonts`, `/Library/Fonts`) into that folder first. HAUS's open-source woff2 fonts are tracked.
