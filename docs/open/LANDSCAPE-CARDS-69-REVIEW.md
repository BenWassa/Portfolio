# Landscape project cards — Ares and Iris (owner review)

**Issue:** [#69](https://github.com/BenWassa/Portfolio/issues/69) · **Artwork:** unchanged. Both icons were misclassified as square app icons despite the owner decision to treat them as landscape project artwork.

## Before / proposed after

The images below are the **actual existing source PNGs**, pinned to pre-change main commit [`6703f4f0`](https://github.com/BenWassa/Portfolio/commit/6703f4f06df7f5ac098c883ebeb13f814661cc2f). **Pixels are identical before and after.** The difference is their React layout and image-fit behaviour, not an image edit.

| Project | Existing artwork (square source) | Proposed landscape presentation |
|---|---|---|
| Ares | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/6703f4f06df7f5ac098c883ebeb13f814661cc2f/src/public/assets/projects/ares.png" width="180" alt="Ares square full original artwork"> | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/6703f4f06df7f5ac098c883ebeb13f814661cc2f/src/public/assets/projects/ares.png" width="260" alt="Ares same original artwork contained inside responsive landscape card"> <br>16:9 image region; full screenshot contained instead of cropped; card spans 3 mobile grid columns and 2 desktop columns |
| Iris | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/6703f4f06df7f5ac098c883ebeb13f814661cc2f/src/public/assets/projects/iris.png" width="180" alt="Iris square full original artwork"> | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/6703f4f06df7f5ac098c883ebeb13f814661cc2f/src/public/assets/projects/iris.png" width="260" alt="Iris same original artwork contained inside responsive landscape card"> <br>16:9 image region; full screenshot contained instead of cropped; card spans 3 mobile grid columns and 2 desktop columns |

**Note:** The right-hand images show the unchanged source at a larger reference size, **not a browser capture**. The 16:9 sizing and overlay are implemented in the branch and require actual 390px/desktop visual acceptance.

## Implementation

- `orientation: 'landscape'` for Ares and Iris in `src/js/project-descriptions.ts`; no changes to any PNGs.
- `landscapeImageFit: 'contain'` makes their screenshot fully visible inside the cinematic 16:9 image area. Other landscape cards retain their existing `cover` behaviour.
- In pillars with mixed icon and landscape cards, landscape entries take `col-span-3` at mobile and `col-span-2` from tablet upwards, avoiding a cramped single icon-width image.
- Image alt text, project copy, links, status, theme, modal/open behaviour and all other cards remain unchanged.

## Approval / tests

- [x] Confirm original artwork retained (unchanged source image references; PR contains no PNG changes).
- [ ] Verify in-browser at 390px and 1440px, particularly Ares heading visibility, Iris control content, overlay legibility, no overflow and modal behaviour.
- [ ] CI: lint, format, TypeScript, data validation, build and smoke on final PR branch.
- [ ] Owner approves the resulting layout before merge.

Do not reinterpret either screenshot as a candidate rounded-square app icon. This branch is independent of the remaining Hermes/Macht/Pantheon icon audit work (#68).
