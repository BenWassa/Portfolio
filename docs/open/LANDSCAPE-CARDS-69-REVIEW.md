# Landscape project cards — Ares and Iris (owner review)

**Issue:** [#69](https://github.com/BenWassa/Portfolio/issues/69) · **Artwork:** unchanged. Both icons were misclassified as square app icons despite the owner decision to treat them as landscape project artwork.

## Actual before/after — browser-tested viewport captures

These are real Chromium screenshots of **main before** and **this PR after**, built in separate environments by the [successful screenshot workflow](https://github.com/BenWassa/Portfolio/actions/runs/40254181966). The viewport widths are **390px mobile** and **1440px desktop**, both 900px tall. The capture bypassed first-visit onboarding equally in both builds and opened the Psyche pillar.

### 390px mobile

| Card | Before | After |
|---|---|---|
| Ares | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/ec55fea06d6a108cb7d178d6a4d3615b33f28381/docs/open/ISSUE69-ARES-390-BEFORE.png" width="210" alt="Ares before: square card at 390px"> | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/ec55fea06d6a108cb7d178d6a4d3615b33f28381/docs/open/ISSUE69-ARES-390-AFTER.png" width="210" alt="Ares after: full-width landscape card at 390px"> |
| Iris | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/ec55fea06d6a108cb7d178d6a4d3615b33f28381/docs/open/ISSUE69-IRIS-390-BEFORE.png" width="210" alt="Iris before: small square card at 390px"> | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/ec55fea06d6a108cb7d178d6a4d3615b33f28381/docs/open/ISSUE69-IRIS-390-AFTER.png" width="210" alt="Iris after: full-width landscape card at 390px"> |

[Combined mobile contact sheet](https://github.com/BenWassa/Portfolio/blob/fix/landscape-card-classification-69/docs/open/ISSUE69-MOBILE-COMPARISON.png)

### 1440px desktop

| Card | Before | After |
|---|---|---|
| Ares | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/ec55fea06d6a108cb7d178d6a4d3615b33f28381/docs/open/ISSUE69-ARES-1440-BEFORE.png" width="450" alt="Ares before desktop screenshot"> | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/ec55fea06d6a108cb7d178d6a4d3615b33f28381/docs/open/ISSUE69-ARES-1440-AFTER.png" width="450" alt="Ares after desktop screenshot"> |
| Iris | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/ec55fea06d6a108cb7d178d6a4d3615b33f28381/docs/open/ISSUE69-IRIS-1440-BEFORE.png" width="450" alt="Iris before desktop screenshot"> | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/ec55fea06d6a108cb7d178d6a4d3615b33f28381/docs/open/ISSUE69-IRIS-1440-AFTER.png" width="450" alt="Iris after desktop screenshot"> |

**Review findings:** No horizontal overflow or uncaught page errors at either width. Previously the full screenshots were squeezed into one small square icon-sized cell; the landscape presentation is materially more legible. The preserved 1024px square screenshot is fully contained in a 16:9 card, with expected side margins. Titles are legible within the cinematic overlay. No asset bytes changed.

## Original assets (unchanged)

The images below are the **actual existing source PNGs**, pinned to pre-change main commit [`6703f4f0`](https://github.com/BenWassa/Portfolio/commit/6703f4f06df7f5ac098c883ebeb13f814661cc2f). **Pixels are identical before and after.** The difference is their React layout and image-fit behaviour, not an image edit.

| Project | Existing artwork (square source) | Proposed landscape presentation |
|---|---|---|
| Ares | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/6703f4f06df7f5ac098c883ebeb13f814661cc2f/src/public/assets/projects/ares.png" width="180" alt="Ares square full original artwork"> | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/6703f4f06df7f5ac098c883ebeb13f814661cc2f/src/public/assets/projects/ares.png" width="260" alt="Ares same original artwork contained inside responsive landscape card"> <br>16:9 image region; full screenshot contained instead of cropped; card spans 3 mobile grid columns and 2 desktop columns |
| Iris | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/6703f4f06df7f5ac098c883ebeb13f814661cc2f/src/public/assets/projects/iris.png" width="180" alt="Iris square full original artwork"> | <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/6703f4f06df7f5ac098c883ebeb13f814661cc2f/src/public/assets/projects/iris.png" width="260" alt="Iris same original artwork contained inside responsive landscape card"> <br>16:9 image region; full screenshot contained instead of cropped; card spans 3 mobile grid columns and 2 desktop columns |

**Note:** The right-hand images show the unchanged source at a larger reference size, **not a browser capture**. The 16:9 sizing and overlay are implemented and demonstrated by the real browser captures above.

## Implementation

- `orientation: 'landscape'` for Ares and Iris in `src/js/project-descriptions.ts`; no changes to any PNGs.
- `landscapeImageFit: 'contain'` makes their screenshot fully visible inside the cinematic 16:9 image area. Other landscape cards retain their existing `cover` behaviour.
- In pillars with mixed icon and landscape cards, landscape entries take `col-span-3` at mobile and `col-span-2` from tablet upwards, avoiding a cramped single icon-width image.
- Image alt text, project copy, links, status, theme, modal/open behaviour and all other cards remain unchanged.

## Approval / tests

- [x] Confirm original artwork retained (unchanged source image references; PR contains no PNG changes).
- [x] Verify browser rendering at 390px and 1440px: Ares and Iris visuals, overlays and horizontal overflow, with no page errors. Modal click behavior remains the existing handler and was not separately exercised.
- [x] CI: lint, format, TypeScript, data validation, build and smoke passed on the candidate branch; recheck final documentation-only commit.
- [ ] Owner approves the resulting layout before merge.

Do not reinterpret either screenshot as a candidate rounded-square app icon. This branch is independent of the remaining Hermes/Macht/Pantheon icon audit work (#68).
