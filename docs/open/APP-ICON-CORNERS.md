---
status: open
lane: standard
issues: []
owner: Ben
updated: 2026-10-24
---

# App icon corners and dimensions

The square (app) cards show each app's icon. The icons do not share a corner radius, and several
sit inside transparent padding. Nothing has been remade yet. This doc lists which ones need it.

Measured with `node scripts/audit-icon-corners.mjs`, which reads the square cards out of
`src/js/project-descriptions.ts` and the PNGs in `src/public/assets/projects/`. Re-run it after
any remake; the table below is its output with a verdict grouping added.

## The spec the audit checks

| Property | Target | Tolerance |
|---|---|---|
| Canvas | 1024×1024 RGBA PNG | exact |
| Corner radius | 22.5% of icon width (230px at 1024), circular corner | ±2.5 points |
| Icon body | edge to edge, square, no padding, no drop shadow | fills ≥97% of the canvas, within 1.5% of square |

22.5% is the radius Argus already uses and sits in the middle of the existing set (Flag 20.0%,
Ecological 21.1%, PushUp 22.4%, Argus 22.7%). It is a proposal; Ben can pick another number and
the script's `TARGET_RADIUS` changes with it. The radius is a circular-corner equivalent
measured from each icon's own bounds. It is accurate for comparing icons with each other, not an
exact figure for a squircle.

## Result

| Card | File | Canvas | Radius | Icon body | Fill | Verdict |
|---|---|---|---|---|---|---|
| drop | `drop.png` | 720×720 | 16.6% | 720×720 | 100% | remake: 720×720, not 1024×1024; radius 16.6% |
| STARK | `STARK.png` | 1024×1024 | 9.7% | 1024×1024 | 100% | remake: radius 9.7% |
| Vox | `Vox.png` | 1024×1024 | 9.7% | 1024×1024 | 100% | remake: radius 9.7% |
| Punchbuggy | `punchbuggy.png` | 1024×1024 | 23.5% | 1019×972 | 95% | remake: icon fills 95% of canvas; icon body 1019×972, not square |
| Hearth | `hearth.png` | 1024×1024 | 25.6% | 982×999 | 96% | remake: radius 25.6%; icon fills 96% of canvas; icon body 982×999, not square |
| PushUp Challenge | `pushup.png` | 1024×1024 | 22.4% | 1012×993 | 97% | remake: icon fills 97% of canvas; icon body 1012×993, not square |
| Wrestle | `wrestle.png` | 1024×1024 | 9.7% | 1024×1024 | 100% | remake: radius 9.7% |
| Narrative | `narrative.png` | 1024×1024 | 9.7% | 1024×1024 | 100% | remake: radius 9.7% |
| Morpheus | `morpheus.png` | 1024×1024 | 20.7% | 988×989 | 96% | remake: icon fills 96% of canvas |
| Argus | `argus.png` | 1024×1024 | 22.7% | 1024×1024 | 100% | ok |
| HAUS | `haus.png` | 1024×1024 | 9.7% | 1024×1024 | 100% | remake: radius 9.7% |
| Flag | `flag.png` | 1024×1024 | 20.0% | 1024×1024 | 100% | ok |
| Chef's Journal | `chefs-journal.png` | 1024×1024 | 19.5% | 1004×899 | 88% | remake: radius 19.5%; icon fills 88% of canvas; icon body 1004×899, not square |
| Ecological Constellation | `ecological.png` | 1024×1024 | 21.1% | 1011×1014 | 99% | ok |

## What needs a remake, in order of how visible it is

### 1. Corners clearly different: STARK, Vox, Wrestle, Narrative, HAUS, drop

Five icons are nearly square-cornered (9.7%) next to neighbours at 20–26%, which is the
mismatch you can see in the grid. All five are opaque and edge to edge, so the art itself is the
right size; they need the corner mask re-cut at 22.5%, not new artwork. Their corners are
dark or cream background, so the larger radius clips nothing that matters.

drop is also 720×720 (every other icon is 1024) and its radius is 16.6%. Re-export it at
1024×1024 with the 22.5% mask. The source is a generated illustration, so check the upscale or
regenerate.

### 2. Right-ish corners, but padded or off-centre: Chef's Journal, Punchbuggy, Hearth, PushUp, Morpheus

These carry transparent margin or a soft shadow baked into the PNG, so the icon renders smaller
than its neighbours and sits off centre.

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

## Alternative: round with CSS

The square cards use `object-fit: contain` and no radius (`src/css/input.css`,
`.project-card[data-orientation='square'] .project-card__img`). One `border-radius: 22.5%` on
that image would unify group 1 immediately. It would not fix group 2, because the transparent
padding would still be there and the radius would round the padding, not the icon. It also
leaves the PNGs themselves wrong. Not applied.

## Done when

`node scripts/audit-icon-corners.mjs` reports `ok` for every card.
