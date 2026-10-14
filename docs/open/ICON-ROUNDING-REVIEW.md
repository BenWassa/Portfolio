---
status: open
lane: opus
issues: [35]
owner: Ben
updated: 2026-10-13
---

# Icon corner rounding on square cards (#35)

Recommendation and prototype. Branch `chore/icon-rounding-review`, cut from `origin/main` (4346c0c). Nothing here is pushed.

## Recommendation

Make the card CSS the single source of the icon shape, and make the PNGs shapeless full-bleed squares.

1. **CSS (implemented on this branch).** One `border-radius: 22.37%` on `.project-card__img` for square cards. Percent of tile, so it scales from the 90px phone tile to the 212px desktop tile. 22.37% is the iOS app-icon ratio.
2. **Assets (script added, not applied).** `scripts/normalize-icon-squares.mjs` trims transparent padding, centre-crops to square, fills baked corners by extending the nearest solid pixel, and resizes to 1024. Dry run by default. It writes nothing unless given `--out <dir>` or `--write`. Ben decides whether to run it over the committed PNGs (see "Decisions").

This is option 1 plus the flatten half of option 2. The mask stays in CSS, so changing the radius later is a one-line edit and never touches an image.

## What is actually inconsistent

Measured from the alpha channel of every square PNG in `src/public/assets/projects/` (radius estimated from the corner diagonal, as a share of the art width):

| Group | Baked radius | Padding / shape |
| --- | --- | --- |
| Wrestle, Narrative, STARK, Vox | 9.7% | full bleed |
| drop | 16.6% | full bleed |
| Argus, Chef's Journal, Flag, HAUS, Poseidon (on `main`, the cropped-screenshot batch) | 20.0% | full bleed |
| Ecological, Morpheus | 21% | 0.4% to 1.6% transparent inset, baked shadow |
| Punchbuggy, PushUp | 22% | 0.3% to 1.6% inset, uneven top and bottom |
| Hearth | 25% | 1.8% inset left, 0.9% top, asymmetric |

So the radius varies from 10% to 25% on `main`, and the older illustrated icons also carry uneven transparent margins that make them draw smaller than their neighbours (Hearth and Morpheus are visibly smaller in the 1440px grid).

The state described in the issue is the unmerged `content/new-card-icons` branch, which swaps in each repo's own icon for Argus, Chef's Journal, Flag and HAUS. Those files differ again:

| File | Result |
| --- | --- |
| `argus.png` | 512px, fully opaque square, radius 0, upscaled to 1024 by the browser |
| `haus.png` | 9.7% radius, light wordmark tile |
| `flag.png` | 22% radius |
| `chefs-journal.png` | 19% radius, but the art is 1006 x 899 inside a 1024 canvas: 12% wider than tall, off-centre vertically, so it draws small and low |

Argus, Flag and drop are dark tiles on a near-black page, so their edge, and with it their rounding, is barely visible at all. That reads as "no corner" next to the white tiles even when the radius matches.

## Approaches

### A. CSS radius only
- Effort: 5 lines. Risk: none, fully reversible.
- Fixes: any source with a smaller baked radius or none (Argus 512, HAUS, Narrative, Wrestle, STARK, Vox become 22.37%).
- Does not fix: sources with a larger baked radius keep it (Hearth 25%, a 2.6 point gap, subtle); transparent padding and the off-centre, non-square Chef's Journal art. CSS cannot un-round or un-pad an image.

### B. Flatten the assets, mask in CSS (recommended)
- Effort: the CSS plus one script, about 4 seconds to process all 15 square PNGs. Risk: low. Edits to committed PNGs are reversible through git, and the script defaults to a dry run.
- Fixes everything A does, plus uniform size (no more small Hearth), Chef's Journal centred, and no baked shadow fringe.
- Cost: crops. Chef's Journal loses about 12% of its width (the hat survives). Punchbuggy and PushUp lose a few pixels. Anything the script centre-crops is flagged "check by eye" in its output.
- The radius is a CSS value, so Ben can retune it after seeing the grid with no asset churn.

### C. Bake the mask into the PNGs (option 2 in the issue, as written)
- Same script plus a rounded-rect alpha mask. Effort: small more than B. Risk: medium, because the radius is baked in 15 files and the next icon swap must remember to re-run it. Soft AA edges against the dark page can show a halo. Nothing is gained over B, since CSS masks the same shape for free.

### D. Per-repo fixes (issue option 3)
- Most consistent in principle, six repos touched, and Argus and Poseidon only ship 512px. Out of proportion for a corner radius. Worth doing only for Chef's Journal, whose source icon is the one real asset defect.

### E. Accept the variety (issue option 4)
- Free. But the grid is where visitors compare projects side by side, and the spread is 0% to 25%. Not recommended.

## Before and after

All shots are the Systems pillar grid at 2x device scale, from a local `vite preview`. The "icons" shots overlay the four icon files from `content/new-card-icons` onto `main`, to reproduce what the issue describes.

1440px:

- Current `main`: `icon-rounding/main-1440.jpg`
- `content/new-card-icons` (the problem as filed): `icon-rounding/icons-before-1440.jpg`
- CSS only: `icon-rounding/icons-css-only-1440.jpg`
- CSS plus normalised PNGs: `icon-rounding/icons-css-normalised-1440.jpg`

390px:

- Before: `icon-rounding/icons-before-390.jpg`
- After (CSS plus normalised PNGs): `icon-rounding/icons-css-normalised-390.jpg`

What the screenshots show:

- Before: Argus is a hard square, HAUS a soft tile, Chef's Journal is small and low, Hearth and Morpheus draw smaller than their neighbours.
- CSS only: Argus, HAUS and Narrative round to match. Chef's Journal, Hearth and Morpheus are still smaller.
- CSS plus normalised: every tile is the same size and shape in both viewports.

The "after" screenshot used normalised copies swapped into a scratch copy of `dist/`. No committed PNG was changed.

## What is on this branch

- `src/css/input.css`: `border-radius: 22.37%` on the square-card image (the only change that affects the site).
- `scripts/normalize-icon-squares.mjs`: the normaliser. Run `node scripts/normalize-icon-squares.mjs` for a dry run report.
- `docs/open/icon-rounding/*.jpg`: the screenshots above.
- No PNG was modified or deleted. `project-descriptions.ts` is untouched.

The CSS alone changes `main` only slightly today, because the five 20% crops already look alike. It pays off once `content/new-card-icons` lands, and it makes any future icon safe by default.

## Decisions for Ben

1. **Radius and shape.** 22.37% (iOS ratio) is a plain rounded rect, not a true squircle. A true continuous-curve squircle needs an SVG `clip-path` and is not worth it at 90 to 212px. Confirm 22.37%, or pick a number.
2. **Older illustrated icons.** Run the normaliser over Hearth, Punchbuggy, PushUp, Wrestle, drop, Ecological and Morpheus too, or only the new ones? Recommend all, for uniform size. It is reversible in git.
3. **Argus and Poseidon at 512px.** The script upscales to 1024 with Lanczos, which is fine at 212px max display (about 424 device pixels at 2x). No replacement needed unless Ben wants sharper art. Poseidon's card is removed on `content/new-card-icons`, so only Argus matters.
4. **Chef's Journal source.** Its icon is 12% wider than tall. Centre-crop (what the script does) or have the repo regenerate a square icon. Regenerating is the cleaner fix.
5. **Dark icons on a dark page.** Argus, Flag and drop have almost no visible edge. If that matters, a 1px `rgba(255,255,255,0.08)` inset ring would define them. A design call, not applied here.
6. **Modal.** The detail modal shows the square image with `rounded-lg` (8px, `ProjectModal.tsx`), which will no longer match the card radius. Not changed. Worth aligning once the radius is confirmed.
7. **Rolling the asset change.** Apply it on the `content/new-card-icons` branch (which owns the icon swap), not on `main`, so the icon files and their normalisation land together.

## Notes

- `scripts/optimize-project-images.mjs` exists only on `content/new-card-icons` (it generates WebP sizes from the PNGs). It was not on `main`, so the normaliser is a separate script. When that branch lands, run normalise first, then optimise.
- Every build rewrites the timestamp and branch lines in `llm-project-contexts/portfolio-project-docs/`. That churn was reverted and is not part of this branch.
