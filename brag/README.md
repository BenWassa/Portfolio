# Brag videos

Short launch-style videos for the projects in this portfolio, made with the `/brag` skill
(Hyperframes). One folder per project: `brag/<project>/`.

## Watch

| Project | Video | Poster | Share copy |
|---|---|---|---|
| Hearth | [brag/hearth/brag.mp4](hearth/brag.mp4) (22.6s, 1080p) | [brag.jpg](hearth/brag.jpg) | [share-copy.txt](hearth/share-copy.txt) |

On GitHub, click the `.mp4` to play it in the browser.

## Folder layout

```
brag/<project>/
  brag.mp4            final render (poster baked in as frame 0)
  brag.jpg            poster / thumbnail
  share-copy.txt      post text
  brag-plan.md        angle + storyboard
  composition-brief.md
  composition/        Hyperframes project (npx hyperframes preview)
  work/               capture + build scripts used to regenerate it
```

## Adding a project

Run `/brag <project>`, then move the output into `brag/<project>/` and add a row above.
Keep the composition's `assets/music/` out of git (see `.gitignore`).
