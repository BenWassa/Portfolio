# Sprints

Current plan for the portfolio. The old React + TypeScript migration plan is finished and is kept
as a record in `docs/closed/SPRINTS-REACT-MIGRATION.md`.

Work is tracked in GitHub issues (label `portfolio-refresh`) and in the plans under `docs/open/`.
This file only says what the current batch is and where each open item lives. It does not repeat
issue checklists.

## How the site ships

- `main` is protected; every change lands through a pull request (`CLAUDE.md` section 1).
- `npm run build` emits to `dist/`. `.github/workflows/deploy-pages.yml` deploys it to
  https://benwassa.github.io/Portfolio/ on merge to `main`.
- Pull requests run the `pr-quality` checks (PR #49, issue #46).

## Current batch: Release 1 (media-free)

PR #53 (`release/portfolio-refresh-1`): 25 featured cards plus 10 index entries (index hidden on
the site), the staleness and link-health alerting from #14, and each app card using its repo's own
icon. It deliberately leaves out the launch videos.

## Open work, by where it is tracked

| Area | Issues and PRs | Plan doc |
|---|---|---|
| Release 1 review and merge | #53, #49 | `docs/open/INCLUSION-AND-DEMO-WORKPLAN.md` |
| App icon corners and square originals | #35 | `docs/open/APP-ICON-CORNERS.md` |
| Launch videos and where they are stored | #25, #36, #44, #45, #52, #54 | `docs/open/VIDEO-RECONCILIATION.md` |
| Demo enablement and source-repo PRs | #16, #21, #23, #27, #28 | `docs/open/INCLUSION-AND-DEMO-WORKPLAN.md` |
| Security and governance | #6, #20 | `docs/open/INCLUSION-AND-DEMO-WORKPLAN.md` |
| Card copy, assets, re-verification | #9, #17, #18 | `docs/closed/REVERIFY-2026-10-13.md` and the workplan |
| Housekeeping | #47 | `docs/open/HOUSEKEEPING-2026-10-24.md` |

## Not yet decided

See the "Release 1 candidate" section of `docs/open/INCLUSION-AND-DEMO-WORKPLAN.md` and the
audit in `docs/open/HOUSEKEEPING-2026-10-24.md`.
