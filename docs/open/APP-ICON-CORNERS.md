---
status: open
lane: standard
issues: [35]
owner: Ben
updated: 2026-10-25
---

# App icon corners and dimensions

The square (app) cards show each app's icon. This page retains the initial audit and diagnoses,
with the actual 21-card audit output captured from the combined approved PR #66 / #67 branch.
PRs #66 and #67 are merged. Draft PR #71 proposes preservation-only Macht/Pantheon corrections; Hermes artwork is a separate approval decision.

Measured with `node scripts/audit-icon-corners.mjs`, which reads the square cards out of
`src/js/project-descriptions.ts` and the PNGs in `src/public/assets/projects/`. Re-run it after
any remake; the table below is its output with a verdict grouping added.

## The spec the audit checks

| Property | Target | Tolerance |
|---|---|---|
| Canvas | 1024×1024 RGBA PNG | exact |
| Corner radius | 22.5% of icon width (230px at 1024), circular corner | ±2.5 points |
| Icon body | edge to edge, square, no padding, no drop shadow | fills ≥97% of the canvas, within 1.5% of square |

The approved 22.5% target sits in the middle of the existing set (Flag 20.0%,
Ecological 21.1%, PushUp 22.4%, Argus 22.7%). The approved target is encoded in the audit script as `TARGET_RADIUS`. The radius is a circular-corner equivalent
measured from each icon's own bounds. It is accurate for comparing icons with each other, not an
exact figure for a squircle.

## Result — PR #68 branch (21 square-labelled cards; Macht and Pantheon corrected)

| Card | File | Canvas | Radius | Icon body | Fill | Verdict |
|---|---|---|---|---|---|---|
| drop | `drop.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| STARK | `STARK.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Vox | `Vox.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Punchbuggy | `punchbuggy.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Hearth | `hearth.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| PushUp Challenge | `pushup.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Wrestle | `wrestle.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Narrative | `narrative.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Morpheus | `morpheus.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Argus | `argus.png` | 1024×1024 | 22.7% | 1024×1024 | 100% | ok |
| HAUS | `haus.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Flag | `flag.png` | 1024×1024 | 20.0% | 1024×1024 | 100% | ok |
| Chef's Journal | `chefs-journal.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Ecological Constellation | `ecological.png` | 1024×1024 | 21.1% | 1011×1014 | 99% | ok |
| Hermes | `hermes.png` | 1024×1024 | 0.0% | 1024×1024 | 100% | remake: radius 0.0% |
| Ares | `ares.png` | 1024×1024 | 0.0% | 1024×1024 | 100% | remake: radius 0.0% |
| Macht | `macht.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Pantheon | `pantheon.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| LayerUp | `layer-up.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Psi | `psi.png` | 1024×1024 | 22.3% | 1024×1024 | 100% | ok |
| Iris | `iris.png` | 1024×1024 | 14.7% | 1024×1024 | 100% | remake: radius 14.7% |

### Outstanding, outside approved icon batches

The full auditor reads **21** cards whose source metadata says `orientation: 'square'`. **18 pass and 3 fail on this PR branch.** The five original failures existed before this follow-up. PR #71 changes only Macht/Pantheon; Hermes, Ares and Iris still need separate decisions. All original five had 1024×1024 canvases and 100% measured fill; the remaining defects are Hermes branding and Ares/Iris classification.

- **Hermes:** 0.0% measured radius. Source identity (masthead vs. app icon) needs review before applying a mask.
- **Macht / Pantheon:** both were 19.7% and are 22.3% on draft PR #71; existing image content preserved, subject to owner review.
- **Ares:** 0.0%; explicitly **landscape project artwork**, not a square app icon. Its `orientation: 'square'` data value needs separate card-layout review. Do not modify artwork for this audit.
- **Iris:** 14.7%; also explicitly **landscape project artwork**, not a square app icon, despite `orientation: 'square'`. Do not modify artwork for this audit.

The temporary experiment of making the full audit a mandatory PR check failed on these five previously unscoped entries; that workflow change was reverted. The original 16 approved target assets remain valid. Keep issue #35 open while Hermes branding is decided and the Ares/Iris landscape classification is resolved in separate draft PR #70. The rest of PR #67 retains existing artwork.

## Historical diagnoses from the original audit (before corrections)

### 1. Original corner defects: STARK, Vox, Wrestle, Narrative, HAUS, drop

Five icons are nearly square-cornered (9.7%) next to neighbours at 20–26%, which is the
mismatch you can see in the grid. All five are opaque and edge to edge, so the art itself is the
right size; they need the corner mask re-cut at 22.5%, not new artwork. Their corners are
dark or cream background, so the larger radius clips nothing that matters.

The original drop export was 720×720 with a 16.6% radius. Approved PR #66 restored the
native 1024×1024 artwork from `BenWassa/drop/docs/icons/old/drop_rounded_full.png` and
masked it to 22.5%, without any upscale or redesign. This fix is now merged into `main`.

### 2. Originally padded or off-centre: Chef's Journal, Punchbuggy, Hearth, PushUp, Morpheus

These originally carried transparent margins or soft shadows baked into their PNGs. The five
were corrected in approved [PR #67](https://github.com/BenWassa/Portfolio/pull/67), with a
[202px/90px visual preview](https://github.com/BenWassa/Portfolio/blob/fix/icon-padding-main-review/docs/open/ICON-PADDING-BATCH2-PREVIEW.png).
The original measurements below explain why the change was necessary. Hearth retains its light
artwork; a separate dark-mode redesign has been deferred.

- **Chef's Journal is the worst.** The icon body is 1004×899, so it is not square at all, and it
  fills 88% of the canvas. The source `chefs-journal/public/icon.png` has the same shape, so this
  is the repo's own export rather than something introduced here. Crop to the body and rebuild
  at 1024×1024, or fix it in the `chefs-journal` repo first.
- **Punchbuggy:** 20px of margin on top, 32px on the bottom, about 3px at the sides.
- **Hearth:** 9–24px of margin, uneven on every side.
- **PushUp:** 16px of margin top and bottom, 6px at the sides.
- **Morpheus:** 16px of margin all round. Corners are in range (20.7%).

Cropping to the opaque body and rescaling to 1024×1024 fixes the size. Chef's Journal also has
a faint shadow tail below the body (about 10% alpha); drop it while cropping.

### 3. Fine as they are: Argus, Flag, Ecological Constellation

Argus was re-cut to 22.5% when the icons replaced the screenshots. Flag and Ecological are
within tolerance.

## Not audited

- **Poseidon** is off the portfolio (see `INCLUSION-AND-DEMO-WORKPLAN.md`, decision log). Its
  `poseidon.png` is still the old screenshot crop and is not a real icon.
- **Vox** has no icon file in `Vox` or `vox-v2`. Its card is generated art, so it is measured
  like the others, but a remake there means making an icon first.
- Landscape cards (Skywalker, Sankofa, Dukkha, Agoge, Orpheus) are site artwork, not icons.

## Square originals: what exists in the source repos (2026-10-24)

Question: for each app, is there an uncropped, square, full-bleed original (no baked corners)
to re-cut from at the one corner radius, rather than re-rounding an already-rounded file?
Searched every `icon|logo|favicon|apple-touch|maskable|pwa|app-icon` image and vector in each
repo under `~/Github Repos` (excluding `node_modules`, `dist`, `.git`), plus loose icon files in
Desktop, Downloads, Documents and Pictures (none found). Git history of the repos was **not**
searched. Nothing was remade; this is a lookup only. Ben is producing new icons externally, so
treat this as an input to that work, not a plan to act on.

"Square original" means the corners are opaque artwork, not transparent and not a white or
contrasting fill outside a rounded body. Each candidate was checked by eye against the file now
on the site, because several repo icons are different artwork from the site's.

| Card | Square original? | Best source (repo-relative) | Notes |
|---|---|---|---|
| drop | **Yes — used in merged PR #66** | `drop/docs/icons/old/drop_rounded_full.png` (1024) | Native-resolution multicolour droplet illustration retained; new 1024×1024 PNG and 22.5% mask passed the audit. |
| Argus | **Yes, already used** | `argus/icon_original.png` (1254) | Site file is already cut from it at 22.7%. |
| Pantheon | **Yes (vector)** | `pantheon/public/favicon.svg` | `rx="14"` on a 64 viewBox; drop the `rx` for a true square at any size. `pwa-maskable-512.png` is square but only 512. |
| Flag | **Yes (vector)** | `flag/public/icons/app-icon.svg` (1024, generated by `scripts/generate-brand-icons.mjs`) | Already `ok` (20.0%). The repo's current icon is a white globe on dark; the site's `flag.png` is a green globe in a blue ring, a different design. |
| Macht | Partly | `macht/public/logo_fullpic.png` (1254) | Body is full-bleed but the corners are baked opaque near-white at about 20%. Masking at 22.5% removes them. `maskable-icon-512x512.png` is padded, not usable. |
| Punchbuggy | Maybe (vector) | `punchbuggy/docs/icons/punchbuggy_old.svg` | Rect with `rx=120` on 512 (23.4%), removable. File name says `_old`; confirm it is the current artwork. The 1024 PNG in the repo is already rounded. |
| PushUp Challenge | No | `template-pushup/public/icon.png` (1024) | Rounded art sitting on an opaque white square (254,254,254), not full-bleed. Would need the white keyed out. The real repo (`the-pushup-challenge-2025`) only has rounded 512 files. |
| Hermes | Yes, but wrong app | `Hermes/archive/v1-hermes/public/hermes-icon-maskable-1024.png` | Caduceus on dark, square. It belongs to the archived v1 app. Current Hermes has only the flat "THE DAILY" masthead SVG. Ben's call which one represents the card. |
| STARK | No | (none) | `STARK/public/icons/stark-ascent-1024.png` is full-bleed and square but it is a different design (orange ridge). The "S" icon on the site has no source file in the repo. |
| Hearth | No | `hearth_v2/public/icons/icon-512.png` | Cream square, 512 only, with the art inset. Smaller than the site's file. |
| HAUS | No | `HAUS/public/HAUS.png`, `archive/HAUS_v1.png` | Rounded only. `archive/HAUS_noBG_v1.svg` is a possible vector source for recomposing. |
| Wrestle | No | `wrestlePWA/app/Wrestleicon.png` | Rounded transparent only (the 9.7% corner comes from this file). |
| Narrative | No | `Narrative/public/assets/Narrative_icon.png` | Rounded transparent only (9.7%). |
| Chef's Journal | No | `chefs-journal/public/icon.png` | Rounded transparent with padding and shadow; no square file. |
| Morpheus | No | `morpheus-dream-archive/src/assets/app-icon-source.png` | Named "source" but already rounded transparent. |
| Ecological Constellation | No | `ecological-constellation/src/assets/icon.png` | Rounded transparent. Already `ok`. |
| LayerUp | No | `layer-up/public/LayerUp.png` | Rounded transparent. Already `ok`. |
| Psi | No | `Psi/docs/assets/favicon.svg` only | A favicon vector, not an app icon. Already `ok`. |
| Vox | No | (none) | No icon file in `Vox` or `vox-v2`; card is generated art. |
| Ares, Iris | No | (none) | No icon in the repos. New art needed. |

### Tracking

Update this table as icons land. "Source" is where the final 1024 square is re-cut from.

| Card | Needs | Source | Status |
|---|---|---|---|
| drop | re-cut to 1024 at 22.5% | `drop_rounded_full.png` | approved and merged via PR #66 (2026-10-25) |
| Pantheon | re-cut to 1024 at 22.5% | `favicon.svg` without `rx` | not started |
| Macht | re-mask at 22.5% | `logo_fullpic.png` | not started |
| Punchbuggy | correct padding, art retained | existing portfolio app icon | approved correction in PR #67 |
| PushUp Challenge | correct padding, art retained | existing portfolio app icon | approved correction in PR #67 |
| Hermes | choose icon, then cut | undecided | needs Ben |
| STARK, Vox, Wrestle, Narrative, HAUS | corner re-mask at 22.5%, art unchanged | the card's own PNG | merged via clean replacement PR #62 on 2026-10-25 (`scripts/standardize-app-icons.mjs`); obsolete PR #56 closed unmerged |
| Hearth, Chef's Journal, Morpheus | correct padding, art retained | existing portfolio PNGs | approved corrections in PR #67; Hearth dark redesign excluded |
| Ares, Iris | correct mistaken square classification; leave artwork alone | existing portfolio landscape art | excluded from icon changes; metadata/layout requires separate review |
| Argus, Flag, Ecological, LayerUp, Psi | none | | ok |

### Draft PR #56: corner re-mask of five icons (another agent, 2026-10-24)

`fix/icon-corners-batch1` (draft) re-masks STARK, Vox, Wrestle, Narrative and HAUS to 22.5% with
`scripts/standardize-app-icons.mjs` (`--check` / `--write`, refuses to enlarge a bigger existing
radius) and changes the card CSS radius from 22.37% to 22.5%. Artwork is preserved; this is a
corner pass, not new art. Checked here on 2026-10-24:

- `--check` on its branch reports 22.58% for all five, matching its report.
- It is **stacked on #44** (`content/refresh-integration`), which Release 1 (#53) supersedes, and
  #44 is not an ancestor of #53. Merging #56 into #44 would not reach `main`.
- **It does not transplant as-is.** On #44's base `haus.png` is the old screenshot crop; #53 uses
  the HAUS repo's own icon. Applying #56's PNG would put the wrong HAUS art back. The CSS hunk
  assumes the 22.37% rule from #41, which is not in #53.
- **The script does transplant.** Dry-run against #53's five files reports 9.76% to 22.58% for
  each, including the repo-icon HAUS. So the clean route is to re-run `--write` on top of #53
  (PNGs only, no CSS) rather than merge #56's PNGs.

Not done here: no PNG was rewritten and #56 was not touched. Whether to retarget #56 onto #53,
or re-run its script after #53 merges, is Ben's call. Decided 2026-10-25: radius is **22.5%**, baked into the PNGs, no CSS clip (#41 is not in #53).
This was completed via merged PR #62; do not merge the obsolete stacked #56.

Finding to keep in mind: for eight cards the repos hold only already-rounded files, so those
cannot be fixed by re-cutting. They need either new square art or an upscale-and-mask of the
rounded file, which would keep the old corner as a faint edge.

## Alternative: round with CSS

The square cards use `object-fit: contain` and no radius (`src/css/input.css`,
`.project-card[data-orientation='square'] .project-card__img`). One `border-radius: 22.5%` on
that image would unify group 1 immediately. It would not fix group 2, because the transparent
padding would still be there and the radius would round the padding, not the icon. It also
leaves the PNGs themselves wrong. Not applied.

## Done when

`node scripts/audit-icon-corners.mjs` must report `ok` for all in-scope app icons are compliant after integration into `main`. The current branch has **16/21** audit rows compliant: Hermes, Macht and Pantheon still need owner-reviewed corner treatment, while Ares/Iris need to be removed from the square-icon classification without changing their landscape artwork. PR-branch audit results alone do not close the task; verify CI and the deployed 390px/desktop page. Landscape art and deferred Hearth dark branding are outside this scope.
