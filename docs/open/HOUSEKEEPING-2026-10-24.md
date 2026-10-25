---
status: open
lane: standard
issues: [47]
owner: Ben
updated: 2026-10-24
---

# Housekeeping audit, 2026-10-24 (#47)

Facts only. Nothing here closes an issue, deletes a branch or removes tracked files. Where a
step needs Ben, it says so. Base: `origin/main` is still `4346c0c` (PR #34, 2026-10-02); nothing
from the refresh has been merged or deployed, so no issue below can be closed on deployed
evidence yet.

## What this pass changed

- `README.md`: build output is `dist/` deployed by Actions (was `docs/`); project structure,
  Projects section, image optimization and config sections brought in line with the code; dead
  link to `docs/IMAGE_OPTIMIZATION.md` removed; `tailwind.config.js` corrected to `.cjs`.
- `package.json`: removed the `deploy` script, which only echoed "Ready to deploy from docs/".
- `SPRINTS.md`: rebaselined into a short current plan. The old migration plan is archived at
  `docs/closed/SPRINTS-REACT-MIGRATION.md` with a banner; its text is unchanged.
- `docs/open/STATUS-2026-10-13.md` and `REVERIFY-2026-10-13.md` moved to `docs/closed/` with
  `status: closed` and a banner. `PORTFOLIO-REFRESH-PLAN.md` stays open: it is still referenced
  by `DEMO_STATE_PLAYBOOK.md` and the audits, and already carries its own superseded notice.

## Issue states against evidence

All 19 open `portfolio-refresh` issues stay open. "In #53" means present on the unmerged
release branch only.

| Issue | Evidence today | Why it stays open |
|---|---|---|
| #6 branch protection | `pr-quality` is the stable check name (PR #49) | Needs Ben (human lane); not verified enabled |
| #9 re-verify cards | Re-verified 2026-10-13 (in #53) | Health check now lists 4 stale and 9 unverified, below |
| #12 two-tier IA | Schema and tiers in #53; index hidden on site | Not merged or deployed |
| #14 staleness check | Strict mode and tracking issue in #53 | Scheduled workflow only runs from `main`; not live |
| #15 playbook | Imported in #53 | Not merged |
| #16 PushUp replacement | Source-repo PR the-pushup-challenge-2025 #1 | Not merged or deployed; template not retired |
| #17, #18 assets, copy | Cards in #53 | Icons for Ares, LayerUp, Iris, Narrative need new art (external, Ben) |
| #20 credentials | Rotation needs an authorized account | Human lane; #27 blocked behind it |
| #21 audit follow-up | HAUS demo done earlier | Also covers source-repo items; do not close wholesale |
| #23 demo enablement | Poseidon removed from the portfolio, Argus and HAUS cards in | Verify after deploy |
| #25 brag videos | #36, #44, #45 overlap; reconciliation in PR #52 | Storage venue undecided; #54 ignores local version folders |
| #26 index tier | 10 entries in #53, hidden | Not merged; hidden by choice |
| #27 liebestraum demo | Blocked by #20 | No work possible yet |
| #28 FamilyPlan | FamilyPlan PR #1 prepared; Pages offline | Needs review, republish and live check |
| #35 icon corners | `APP-ICON-CORNERS.md` audit and tracking table | Radius (22.5%) is Ben's call |
| #46 PR quality gate | PR #49 | Not merged |
| #47 housekeeping | This PR | Open until merged |
| #48 dark background on license page | Not reproducible on the current build (earlier check) | Ben decides whether to close; PR #3 was its origin |

## Cards still stale or unverified (`npm run health`, 2026-10-24)

Links: 35/35 return 200. Re-run after any card change.

- **Stale** (repo moved after `lastVerified`): Argus (67 commits since 2026-10-13), Hermes (47),
  Flag (3 since 2026-10-02), Great Decoupling (3 since 2026-10-13).
- **No `lastVerified`:** Iris, Iroh, Psi, Psyche, STARK, Vox v2, plus Morpheus, Narrative and Vox,
  which are template-backed by design.
- **Not checkable** (private repo): Chef's Journal, HAUS, Wrestle.
- **Template lag:** Narrative 148 days, Morpheus 144 days (documented sample-demo exceptions).

Consequence to expect: the first scheduled `--strict` run after #53 merges will open the
"Portfolio health: drift detected" issue because of the four stale cards. That is the intended
behaviour, but re-verifying those four first would give a clean first run. Re-verification is
Ben's call per card; a `lane:standard` agent should not set `lastVerified` without checking the
copy against the repo.

## Pull requests

The refresh PRs, by what they are today:

| PR | State | Disposition |
|---|---|---|
| #36 `content/brag-videos-pr` | open | Videos; see `VIDEO-RECONCILIATION.md` (PR #52) |
| #37 perf, #38 index, #39 link cards, #40 staleness, #41 icon rounding, #42 reverify, #43 status | open | #37–#40 and #42 are ancestors of the release branch; #43 is archived here; #41 needs Ben's visual approval and is not in #53 |
| #44 `content/refresh-integration` | open | Integration of #36–#43 including about 310 MB of brag media. Superseded by #53 for the media-free release |
| #45 `content/brag-videos` | open | Overlaps #36 and #44, not identical (25 stale generated docs differ) |
| #49 PR quality checks | open | Merge before or after #53; independent |
| #53 Release 1 | open | Needs Ben's review |
| #52 video reconciliation | open | Docs only |
| #54 brag ignore | open | Docs-free, one `.gitignore` rule |

Legacy PRs #1 and #3 (Copilot WIP, +0/-0, zero files) are already **closed**; no action. Their
destinations: #1's PNG-path problem on Pages is addressed by `base: './'` and the merged
`fix/image-filename-case` branch; #3's background-continuity problem is issue #48.

## Remote branches (report only, nothing deleted)

Deleting needs Ben's explicit approval. Squash-merging #53 would lose ancestry, so check
"ahead of main" again before deleting anything.

- **Already in `main` (0 commits ahead):** `chore/portfolio-refresh-scoping`,
  `content/demo-cards-batch-1`, `dev`, `docs/inclusion-workplan`, `docs/record-q1-decisions`,
  `feat/schema-v2-two-tier-ia`, `fix/image-filename-case`.
- **Contained in the release branch (safe after #53 merges):** `chore/reverify-cards`,
  `content/index-tier`, `content/link-cards-batch-2`, `docs/status-2026-10-13`,
  `infra/staleness-check`, `perf/image-delivery`.
- **Heads of open PRs, keep:** `release/portfolio-refresh-1`, `infra/pr-quality-checks`,
  `docs/video-reconciliation`, `chore/brag-version-ignore`, `content/brag-videos`,
  `content/brag-videos-pr`, `content/refresh-integration`, `chore/icon-rounding-review`.
- **Throwaway proofs from #49:** `ci-proof/failing-lint`, `ci-proof/failing-typecheck`. Delete
  after #49 merges.
- **Closed empty PR heads:** `copilot/fix-fa5b5302-...`, `copilot/fix-defab239-...` (one empty
  commit each).

## Obsolete generated artifacts

Decided 2026-10-25 (Ben: delete if no longer needed). Verified unused and removed in PR #58:
`docs/index.html`, `docs/assets/`, `docs/icons/`, `docs/icon.png`, `docs/manifest.webmanifest`
(about 24 MB, pre-`dist/` build output; live copies are in `src/public`) and `backups/` (four
dated snapshots, still in git history).

## Lint gate

Decided 2026-10-25 (Ben: use best practice). `no-unused-vars`, `no-console` and `no-undef` were
warnings, so the PR gate never failed on them. PR #57 makes them errors. The tree has zero warnings,
so nothing breaks today.

## Decisions taken 2026-10-25

- **Icon corner radius: 22.5%**, baked into the PNGs (Ben had no preference; 22.5% is what Argus,
  the audit script and PR #56 already use). No CSS clip radius: Release 1 has none, because #41
  is not in it.
- **Narrative keeps its sample demo.** CLAUDE.md records it as an approved exception; the
  link-out commit stays unapplied.
- **Hermes icon: hold.** Leave the current card image until Ben's external icon art arrives.
- **PR #56:** keep as is; after #53 merges, re-run `scripts/standardize-app-icons.mjs --write` on
  the five PNGs (see `APP-ICON-CORNERS.md`). Do not merge #56's PNGs or CSS.

## Carried forward from the 2026-10-13 status

Still needing Ben, none resolved by this pass: approve #53; credential rotation (#20); FamilyPlan
republication (#28); PushUp seed PR and template retirement (#16); Narrative link-out versus
sample demo; icon radius (#35); the taxonomy placements proposed there (Pantheon in Systems, Iroh
in Psyche). Open question not in that list: README says "MIT" while also saying reuse needs written
permission and points at a `docs/LICENSE.md` that does not exist. Which licence applies is Ben's
decision (lane:opus); no file was changed.

## Not done

- Branches not deleted; issues not closed; no card `lastVerified` changed.
- Developer docs for `context:*` scripts were not re-tested end to end; only `npm run build`,
  `lint` and `format:check` were run (see PR).
