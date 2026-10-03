---
status: open
lane: opus
issues: [12, 13]
owner: Ben
updated: 2026-10-02
---

# Foundation notes — schema v2 (#13) and two-tier IA (#12)

What the foundation agent did on `feat/schema-v2-two-tier-ia`, and what it left for Ben.
Parent plan: `INCLUSION-AND-DEMO-WORKPLAN.md` (WS1). #5 (Pages flip) was out of scope.

**Base branch.** `main` does not yet have `CLAUDE.md`, `docs/open`, or the `dist/` build, so this
branch is stacked on `chore/portfolio-refresh-scoping` (PR #4). Merge #4 first; GitHub then
retargets this PR to `main`.

## 1. Schema v2 (#13)

`Project` in `src/types.ts` is now a union on `tier`:

- `FeaturedProject` (`tier: 'featured'`): the existing card shape.
- `IndexProject` (`tier: 'index'`): `title`, `desc`, `href`, `type` (pillar), `year`. It has no
  image, theme or techSpecs, so nobody has to invent them for a text row.
- On both: `repoUrl?`, `lastVerified?` (ISO date), `demoMode?`, `year?`.

`year` is **not in plan §2.3**. I added it because the index rows need it, and made it required
on index entries.

`projectsData: Project[]` and the generator markers are unchanged. The generator now emits the
v2 fields and handles index entries (`n/a` instead of `undefined`). I checked it against a
temporary fixture.

### Backfill rules I applied

- **`repoUrl`** = the repo of the product the card represents, **not** the template/showcase it
  links to today: Narrative → `Narrative`, Morpheus → `morpheus-dream-archive`,
  Wrestle → `wrestlePWA`, Vox → `Vox` (private). With the template repo there, a staleness check
  would compare the card against a frozen fork and never flag it.
- **`demoMode`** describes what the card serves today:
  - `playbook`: Hearth, PushUp
  - `live`: drop, STARK, Punchbuggy (their `demoUrl` embeds production)
  - `template`: Wrestle, Narrative, Morpheus, and **Vox** (its `href` is `Vox_Showcase`, a
    snapshot of private `Vox`)
  - `none`: link-out cards (Skywalker, Sankofa, Dukkha, Agoge, Ecological Constellation) and
    Orpheus (no href)
- **`lastVerified: 2026-10-02`** is set on 10 cards. For each one I loaded the URL in headless
  Chromium, looked at the screenshot, and confirmed the deployment is the repo's current HEAD
  (Pages deployment SHA, or the App Hosting rollout check for Hearth). I left it **unset on
  purpose** for the four `template` cards: their content is known to lag `repoUrl`, and a date
  there would hide that from #14. Orpheus is also unset, since it has nothing to load.

The new fields are not displayed anywhere, but they do end up in the public JS bundle. That
puts the private repo names `Vox` and `wrestlePWA` in the bundle. `wrestlePWA` is already
public through its Pages URL.

## 2. Two-tier IA (#12)

- `src/components/ProjectIndex.tsx` adds an index list **inside each pillar, below its cards**.
  Each row has the name, one line, the year, and an outbound link when there is one. The
  component returns `null` when the pillar has no index entries, so the site is unchanged today.
- I diffed screenshots against the pre-change site at 390px and 1440px. The only differences
  were from animation timing. I checked layout, hover, keyboard focus, new-tab clicks, accessible
  names and touch targets (71px) with a fixture that was **not committed**.
- **Bug fix that matters at scale:** the Pillar showed only one secondary status group, so a
  pillar with both `draft` and `prototype` cards silently dropped the drafts. Now every
  non-empty status group gets its own divider. Today's output is unchanged.

## 3. Open decisions for Ben

**IA / scaling 15 → ~28 (needs a call before WS3 writes cards):**

0. **Featured count vs. #12's target.** #12 asks for a "curated ~18-24, not a wall". The rulings
   give **28** featured cards (15 `demo` + 13 `link`). Either accept 28, or move some `link`
   rulings to `index`. The container works either way. This is the cutoff question #12 leaves
   open, and why this PR only says "part of #12".
1. **Pillar balance.** Under the workplan, Orpheus moves to the index, which leaves **Psyche with
   one card** (Dukkha). Most of the 14 new featured repos read as apps, so Systems could reach
   about 24 icons while Narrative has 3. Which pillar each new card goes into is a taxonomy call.
   Ecological Constellation (`type: 'app'`, "Personality Framework") is a candidate for Psyche.
2. **Mixed orientations.** If a pillar has *any* square card, every card in it uses the dense
   3/4/5-column icon grid, which would cramp landscape cards. That happens as soon as an app
   lands in Psyche or Narrative. Options: one orientation per pillar, or split the grid by
   orientation.
3. **Phone viewport.** On a 390px phone the pillar header takes about 45% of the height before
   the first card, so a 24-icon Systems grid scrolls inside a short window. Options: collapse or
   shorten the header once scrolled, or accept it.
4. **Index placement and label.** I put the index per pillar, as a section with no routing, which
   keeps to the `SPRINTS.md` no-routing non-goal. The alternative is a site-wide "All work" view
   or an `/all-work` route, which #12 lists as an option. The label "Index · N" is container chrome
   and you may want different copy. Rows sort by newest year first, then title.
5. **What `year` means for index rows.** First release or last activity? WS5 needs one rule.
6. **Status vocabulary.** Cards use `active | draft | prototype`; the rulings use lifecycle
   (`active | maintaining | dormant | archived`). WS3 needs a mapping, or the card field changes.

**Schema:**

7. Confirm the `repoUrl` = real product rule, including Vox → private `Vox` (§1). The workplan
   still has "confirm which repo the Vox card should target" open.
8. Type checking isn't enforced: `npm run lint` / `format:check` only cover `.js/.json/.css`,
   and `tsc --noEmit` has one existing error (missing `three` types). Adding
   `tsc --noEmit` to CI would have to come with fixing that error.

## 4. Things I saw while verifying (not acted on)

- **Blocker for #5 (RESOLVED on `fix/image-filename-case`):** the `img` paths in
  `src/js/project-descriptions.ts` now use the on-disk names `STARK.png` / `Vox.png`; an
  exact-case check of `dist/` found 19 image refs, 0 mismatches. Original finding:
  `src/public/assets/projects/STARK.png` and `Vox.png` are referenced as
  `stark.png` / `vox.png`. The live site works only because the old `docs/` build on `main` has
  lowercase copies. A Linux Actions build is case-sensitive, so **both card images will 404 after
  the Pages flip** unless the files are renamed (or the paths changed).
- **Wrestle:** the card's `href` (`wrestlePWA`) shows a **"Firestore · Live"** badge, while the
  card copy says "no accounts" and the `demoUrl` template shows "Demo Mode". Relevant to the WS2
  repoint.
- **STARK** throws `isDevMode is not defined` on load. Onboarding still advances (I tested 3
  steps).
- **drop**'s splash screen says **"atmen"**, not "drop".
- **Hearth**'s demo banner reads "Template mode" / "Template Demo". It is the playbook demo, so
  this is only the wording.
- `src/js/app.js` is a leftover entry point that nothing imports. If it ever came back, it would
  treat index entries as cards.

## 5. Batch 1 observations (2026-10-02, `content/demo-cards-batch-1`)

Five app cards added (Poseidon, Argus, HAUS, Flag, Chef's Journal): featured goes 15 → 20, and
Systems goes 10 → 15 cards (13 Active, 2 Prototype). Looked at full-grid screenshots at 1440px
and 390px. Reported only; the grid was not changed.

- **Two image languages.** The older square cards use illustrated app-icon art (Hearth,
  Punchbuggy, PushUp, Wrestle, drop). The five new ones are cropped screenshots of the live demos,
  framed as rounded squares at the same 1024×1024 RGBA. Poseidon and Flag hold up at icon size.
  Argus, HAUS and Chef's Journal are UI-dense and read as noise at 90px on a phone. If Ben prefers
  icons, every repo ships its own (`argus/public/icons/argus-icon-512.png`, `HAUS/public/HAUS.png`,
  `chefs-journal/public/icon.png`, `flag/public/icons/`, `poseidon/tools/brand`).
- **Pillar balance is worse.** Systems now has 15 cards; Narrative has 3 and Psyche has 2
  (Dukkha, Orpheus). §3 item 1 still needs a decision.
- **1440px:** 5 columns × 3 Active rows plus a Prototype row. Fine. Cards are uniform at 212×240
  and no titles overflow.
- **390px:** 3 columns of 90px tiles, so 13 Active cards make 5 rows. The pillar header still
  fills about 52% of the first screen (§3 item 3). Long titles wrap onto two lines ("Chef's
  Journal", "Ecological Constellation", "PushUp Challenge"), which makes those tiles 138px tall
  instead of 118px and leaves the rows ragged.
- **Phone modal (all embed cards, not only the new ones):** the scaled phone bezel overlaps the
  "Live Demo · best on mobile" badge below it.
- **Narrative's demo in the phone frame:** `narrative-template` is a desktop, keyboard-first tool.
  In the 392px bezel its header buttons wrap and the photo grid is tiny. It works, but it doesn't
  show the product well.
