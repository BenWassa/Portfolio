---
status: open
lane: opus
issues: [8, 9, 10, 12, 13, 14, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31]
owner: Ben
updated: 2026-10-24
---

# Inclusion + demo workplan

Supersedes `CANDIDATE-INVENTORY.md` (archived to `docs/closed/`). The triage that file asked
Ben to fill in was done in **Almanac** instead, as `human.demo_intent` on all 98 repos.
Snapshot: [`demo-rulings.json`](./demo-rulings.json), pulled 2026-10-02 from Firestore
(`almanac-4631c`) with `scripts/pull-decisions.mjs`. Almanac's own
`data/github-inventory.json` still shows no rulings until someone runs that script with
`--write` — the Portfolio snapshot is the working copy for agents.

Rulings use the `DEMO-MODE-METHODS.md` §1 vocabulary:

| Ruling | Count | Meaning here |
|---|---|---|
| `demo` | 15 | Featured card, embeddable live demo |
| `link` | 13 | Featured card, links out, no iframe |
| `index` | 10 | Text line in a full-work index, no card |
| `skip` | 60 | Not portfolio material |

> **Moved out of the public repo (2026-10-02, #31):** the per-repo audit findings, security actions and raw audit JSON now live
> in the private `BenWassa/almanac` repo under `docs/portfolio-audit/`. Paths below pointing into `docs/audits/2026-09-18/` for
> `FINDINGS-BY-PROJECT.md`, `SECURITY-ACTIONS.md`, `targets.json`, `material-drift.json` and `raw/` resolve there, not here.

## 1. Where the site stands against the rulings

The site shows 15 cards. Against the 39 non-skip rulings:

**Consistent — keep, re-verify (#9):** hearth_v2, punchbuggy, drop, STARK, the-pushup-challenge-2025
(all `demo`); Skywalker, sankofa, dukkha, agoge, ecological-constellation (all `link`);
Vox (`demo`, but see conflict C below).

**Shown, but the ruling changes the treatment:**

| Card | Ruling on the real repo | Problem |
|---|---|---|
| Orpheus | `index` | Has a card with `href: null`. Becomes an index line, card removed. |
| Wrestle | `wrestlePWA` = `demo` | `demoUrl` still points at `wrestle-template` (archived). Repoint, see WS2. |
| Narrative | `Narrative` = `demo`; `narrative-template` = `skip` | Card targets the template. Template is the demo of the same app, so there is no collision: card = repo `Narrative`, demoUrl = template. |
| Morpheus | `morpheus-dream-archive` = `demo`; `template-morpheus` = `skip` | Card targets the skipped template; real repo cannot be embedded today. |
| Vox | `Vox` (private) = `demo`; `Vox_Showcase` = `skip` | Card targets `Vox_Showcase`, which was ruled skip. |

**Not on the site yet — 24 additions:**

- **Featured `demo` (6):** poseidon, argus, flag, chefs-journal, liebestraum, HAUS
- **Featured `link` (8):** Hermes, Ares, macht, pantheon, layer-up, FamilyPlan, Psi, Iris
- **Index tier (10):** demeter, padme, arc, psyche, faust, static, vox-v2, iroh,
  great-decoupling, plus orpheus (moved from card)

Featured grid goes 15 → ~28 cards, so the two-tier IA (#12) is a prerequisite, not polish.

## 2. Rulings that conflict with the 2026-09-18 audit — Ben decides

These are in the human lane. Agents must not resolve them.

**Direction from Ben, 2026-10-02:** auth-gated apps get a demo mode that skips the sign-in wall
entirely — no Firebase, dummy data pre-loaded. That is `DEMO-MODE-METHODS.md` Archetype 3 and the
`DEMO_STATE_PLAYBOOK.md`: mode check *before* the auth gate, a mock state adapter with the same
interface as production, deterministic seeds, Firebase never initialised, a build that needs no
secrets. It lives in the real repo behind a flag — never a fork.

| # | Repo | Ruling | Status |
|---|---|---|---|
| A | `morpheus-dream-archive` | demo | **Settled → keep `template-morpheus` as the demo** (Ben, 2026-10-02: a clean separate demo repo "might make sense"). Same documented exception as Narrative. No demo mode is built in the real repo for now; revisit if the template drifts too far. Card = repo `morpheus-dream-archive`, `demoUrl` = `template-morpheus`. |
| B | `Narrative` | demo | **Settled → use `narrative-template` as the demo.** It is the clean, separate demo Ben already built: 33 stock photos, a preset project, no folder picker, no backend. Card = repo `Narrative`, `demoUrl` = `narrative-template`. Deliberate exception to CLAUDE.md §5 (see below). The #10 "name collision" was a misreading: the template is the same app. |
| C | `liebestraum` | demo | **Settled → build demo mode** (opus). Mock layer needs no Mapbox/Gemini/geocoding keys. Do #20 item 2 (rotate the admin key) *before* any agent pushes from this repo, and the demo build must not read `apphosting*.yaml`. |
| D | `FamilyPlan` | link | **Settled → rebuild with synthetic figures.** Real income is still public today: Pages must go offline now (#20 item 1, human, urgent) regardless. The card ships only after redeploy from synthetic data. |
| E | `pysche-app` | index → **skip** | **Settled → `skip`** (Ben, 2026-10-02). 2-commit AI Studio scaffold with nothing in it; the real app is `psyche`. Almanac still says `index` until flipped there. |
| F | `wrestlePWA`, `the-pushup-challenge-2025` | demo | **Settled → keep as demos.** |

Also noted: **the 2026-09-18 quick-win list (#21) shrinks.** Of its five repos only `HAUS` is
ruled `demo`. `almanac` and `jarvis-core` are `skip`; `pantheon` and `layer-up` are `link`. The
`layer-up` silent-Firebase bug and `almanac`'s DEV gate stay worth fixing but are no longer
portfolio work.

### Exception to "never fork a project to create a demo"

`narrative-template` is a separate repo and has drifted: the real `Narrative` has about 96 commits
since the template was last pushed (2026-02-23), including a dashboard and recap work. Ben chose
to keep it as the demo (2026-10-02) because it is clean and isolated. Narrative is local-only —
no backend, no auth — so drift costs the demo features, not correctness or safety. Mitigation:
the staleness check (#14) compares `narrative-template` against `Narrative` and flags it. This
needs a carve-out sentence in `DEMO-MODE-METHODS.md` and CLAUDE.md §5; neither is edited yet.

**Q1 resolved (Ben, 2026-10-02):** Morpheus keeps its clean separate demo repo (`template-morpheus`) under this
same exception; Wrestle does not (`wrestle-template` is archived and retired once `wrestlePWA` has its own demo).

## 3. What each `demo` ruling needs

From `demo-rulings.json` + audit findings. "Embed-ready" means no code change, only verification
by loading the deployed URL (CLAUDE.md §5).

| Repo | State | Work | Lane |
|---|---|---|---|
| hearth_v2 | playbook, live | Re-verify only | standard |
| the-pushup-challenge-2025 | playbook, live | Re-verify only | standard |
| punchbuggy / drop / STARK | live `demoUrl`s, never audited | Load each, confirm it is real and current (#9) | opus |
| flag | none, but embeddable as-is | Confirm URL, screenshot | standard |
| Vox | partial, embeds as-is | Confirm which repo the card should target | standard |
| poseidon | machinery complete, fenced by `import.meta.env.DEV` | Build-flag swap + demo Pages build | standard (spec'd) |
| argus | `npm run build:e2e` already yields a local-only ungated build | Deploy that build as the demo target | standard (spec'd) |
| HAUS | demo build merged (PR #9) | Publish via GitHub Pages from the private repo (works on this account: wrestlePWA, Vox are private with public Pages) | standard |
| chefs-journal | `?snapshot=true` gate exists, private repo | Publish a Pages/Hosting target | opus (privacy call) |
| wrestlePWA | **no separate demo repo** (Ben, 2026-10-02: not needed) | Real repo gets the demo: local-only state, so seed fixtures + reset (Archetype 2), no sign-in. Repoint `demoUrl` off `wrestle-template`; Pages is already live on this private repo (#24) | opus |
| morpheus-dream-archive | demo = `template-morpheus` (clean separate repo, ~5 months stale) | Re-verify the template loads with sample data; retarget card repo to `morpheus-dream-archive` (#16) | opus |
| Narrative | demo = `narrative-template` (clean separate repo, drifted) | Re-verify it loads with sample data; record template-vs-Narrative drift; retarget card to repo `Narrative` + that demoUrl (#10) | opus |
| liebestraum | none | Full playbook demo mode, after key rotation (C) | opus |
| FamilyPlan (`link`) | public build contains real income | Take Pages offline; redeploy from synthetic data (D) | human, then standard |

### WS3 batch 1: cards written (2026-10-02, branch `content/demo-cards-batch-1`)

For every card below, the demo was loaded in the site's own embed modal at 1440px and 390px and
the screenshot was looked at. None of the embeds logged console errors, and every `href`/`demoUrl`
returns 200.

| Card | Change | `demoMode` | `lastVerified` |
|---|---|---|---|
| Poseidon | **new**, demo `poseidon/demo/`, href is the real app (sign-in) | playbook | 2026-10-02 |
| Argus | **new**, demo = Pages demo build | playbook | 2026-10-02 |
| HAUS | **new**, demo = Pages demo build (private repo; `repoUrl` set, not rendered) | playbook | 2026-10-02 |
| Flag | **new**, embeds production as-is (in-app name "Atlas") | live | 2026-10-02 |
| Chef's Journal | **new**, demo = Pages demo build (private repo; `repoUrl` set, not rendered) | playbook | 2026-10-02 |
| Wrestle | `demoUrl` → `wrestlePWA/demo/`; copy corrected (anonymous sign-in + Firestore, not "no accounts") | template → playbook | 2026-10-02 |
| Narrative | href → real `Narrative/`; `demoUrl` → `narrative-template` (opens on the sample project, no folder picker); copy says the demo is a sample on an earlier version | template | unset (template lags repo) |
| Morpheus | `demoUrl` added (`template-morpheus`, populated archive); copy describes `morpheus-dream-archive` and says the demo is an older snapshot | template | unset (template lags repo) |

Vox and Orpheus were not touched. Card images are new 1024×1024 crops of the live demos. Layout
observations are in `FOUNDATION-NOTES.md` §5.

### WS5: index tier written (2026-10-13, branch `content/index-tier`)

Ten text-only `IndexProject` entries added to `src/js/project-descriptions.ts`; the Orpheus card
(`href: null`) is deleted and replaced by an index entry. `pysche-app` is not included (ruled skip).
Built, linted and previewed at 390px and 1440px; every index row renders under the pillar below
and its link was loaded.

- **`year`** = year of the repo's first commit (`git log --max-parents=0`; GitHub `createdAt` for
  demeter and padme, which have no local clone). Index years are *first release*, not last
  activity (answers FOUNDATION-NOTES §3 item 5 for these ten).
- **`href`** = the live URL when there is one, else the public repo; `null` for the two private
  repos (vox-v2, iroh). All others returned HTTP 200 on 2026-10-13. `repoUrl` is set on all ten
  (including the private two, as for HAUS/Vox; names end up in the bundle).
- **`lastVerified: 2026-10-13`** only where the link loaded and matched `repoUrl`: the five Pages
  sites (deployment SHA = repo HEAD) plus the two repo links. Unset on psyche (Firebase Hosting,
  deployed SHA not checkable), vox-v2 and iroh (nothing public to load).

| Entry | Pillar | Why | Link |
|---|---|---|---|
| Arc | narrative | a manifesto: long-form prose as the interface | live |
| Faust | narrative | research essay, same family as Dukkha/Agoge | live |
| Great Decoupling | narrative | research essay plus infographic; repo is mostly stubs | repo |
| Demeter | app | planning atlas, installable web app | live |
| Vox v2 | app | study tool; sits with Vox | none (private) |
| Padme | psychology | chakra model read as psychological development | live |
| Psyche | psychology | psychology encyclopedia | live |
| Static | psychology | mechanics of autistic / AuDHD cognition | live |
| Orpheus | psychology | listening history as an emotional mirror (was already there) | repo |
| Iroh | psychology | reflective journaling; judgment call, `app` is the alternative | none (private) |

Result: Narrative 3 cards + 3 index, Systems 15 cards + 2 index, Psyche 1 card + 5 index. This
softens the Psyche-has-one-card problem (FOUNDATION-NOTES §3 item 1) on the index side only.

Left for Ben: Iroh's in-app name is Thread (README, `<title>`), so the row says so. Orpheus's
`projectDescriptions` entry (`portfolio:` line says "experimental audio interfaces") is stale and
now feeds the generated doc; not edited, since it changes the meaning of that file. The unused
`Orpheus.png` card image is still in `src/public/assets/projects/`.

## 4. Workstreams

Dependencies are real; the first two gates decide how much runs in parallel.

```
Gate 0  card design questions (later) · FamilyPlan Pages off ✅ · HAUS published via Pages · #20 items 1–2 done before touching FamilyPlan/liebestraum
Gate 1  WS1 Foundation        #5 Pages Actions · #13 schema v2 · #12 two-tier IA
          └─ unblocks ─►  WS3 Cards (writing into a schema about to change is the main waste risk)
WS2 Demo enablement   independent of WS1 — separate repos, can start now
WS4 Brag videos       DEFERRED by Ben (2026-10-02) — revisit later
WS5 Index tier        needs #12 only
WS6 Staleness CI #14  needs #13 (`repoUrl`, `lastVerified`)
```

| WS | Scope | Issues | Parallelism |
|---|---|---|---|
| **WS1 Foundation** | Pages → Actions, schema v2, two-tier IA, adopt rulings as the source for `tier`/`demoMode` | #5 #12 #13 | Sequential, 1 opus agent |
| **WS2 Demo enablement** | Per-repo changes in §3, each verified against the deployed URL | #21 + new | One agent per repo, fully parallel |
| **WS3 Cards** | Copy + `techSpecs` + screenshot for the 24 additions and the 5 retargeted cards | #17 #18 | One agent per card after WS1; opus writes, standard captures |
| **WS4 Brag videos** | Hermes, hearth_v2, third chosen by Ben (few projects only) | new | One agent per video |
| **WS5 Index tier** | 10 index lines (name, one-liner, year, link). **Written 2026-10-13, branch `content/index-tier`** (see "WS5" below) | #12 | One agent |
| **WS6 Staleness CI** | `repoUrl` vs `lastVerified`, HTTP check on every link | #14 | One standard agent after #13 |

Issues #9 (re-verify displayed cards), #10 (Narrative collision) and #16 (template retirement)
fold into WS1/WS2 as noted on each.

### Staleness and link check (WS6, #14)

`npm run health` runs `scripts/check-portfolio-health.mjs`; `.github/workflows/portfolio-health.yml`
runs it every Monday and on manual dispatch (not on push or PR, because it needs the network, and
it never deploys). It reads `src/js/project-descriptions.ts` through the generator's `readData()`.

| Section | Rule | Effect |
|---|---|---|
| Links | every `href` and `demoUrl` must end at HTTP 200 (redirects followed, one retry, 15s timeout) | **fails the run** |
| Stale cards | repo default branch has a commit dated after `lastVerified` | warning, with days and commits since |
| No `lastVerified` | the card was never verified | warning; template-backed cards are annotated as expected |
| Template lag | for `demoMode: 'template'` cards, the template repo (from `demoUrl`) trails `repoUrl` by more than 30 days (`--threshold-days=N`) | warning. Today: Narrative and Morpheus, about 145 days |
| Not checkable | the GitHub API returned 404 for the repo | info only |

How to read it: a red run means a card link is dead; fix or retarget the card. A stale card means
the repo moved since someone last loaded the demo; re-verify it, then bump `lastVerified`. Lagging
templates are the accepted exception above and stay as warnings until Ben decides to rebuild them.

Notes:

- `repoUrl` is not rendered, so it is never fetched as a web page. It is looked up through the
  GitHub API instead. Private repos return 404 unauthenticated, and the workflow's default token
  only sees this repo, so they land under "Not checkable" (Wrestle, HAUS, Chef's Journal, Vox).
  To check them, add a read-only PAT as the `PORTFOLIO_HEALTH_TOKEN` repo secret; locally, set
  `GITHUB_TOKEN`.
- Staleness uses the latest default-branch commit date, not `pushed_at`, because Pages deploy
  pushes move `pushed_at`.
- Unauthenticated runs have 60 API calls per hour; one run uses about 25.
- Flags: `--skip-links`, `--skip-stale`, `--summary=<file>` (defaults to `$GITHUB_STEP_SUMMARY`).

### Brag videos (WS4) — deferred

**Deferred by Ben, 2026-10-02: leave for later.** No agent work. Notes kept for when it resumes.

**Demos and videos are separate things.** Demos are live, interactive, testable iframes (the `demo` ruling). Brag videos are extra, for a few projects Ben picks, and never replace a demo. Requested: Hermes, hearth_v2, one more. Fit with the rulings:

- **Hermes** is ruled `link` and its published page is a static, self-updating, zero-auth artifact
  — the video shows the pipeline is alive without needing a demo mode.
- **hearth_v2** is the reference playbook demo; the video complements the iframe.
- **Third:** Ben has not chosen. Do not pick for him.

**Tool:** [`latent-spaces/brag`](https://github.com/latent-spaces/brag) (MIT, public, pushed
2026-10-01) — an agent skill that turns the project in the current directory into a ~20s launch
video with music, motion and share copy, rendered to `brag-output/brag.mp4`. On Opus 5.5 it
switches to `/brag-slim` automatically (single-file skill, no Hyperframes); `/brag --full` keeps
the classic Hyperframes workflow. `/brag --tone "…"` steers style; voiceover is off unless `--voice`.

- **Install (Claude Code):** `/plugin marketplace add latent-spaces/brag` then
  `/plugin install brag@brag`. Not currently installed; it writes to `~/.claude`, so Ben runs it.
- **Prereqs on this machine:** Node 24 ✓, FFmpeg 8.1 ✓. `/brag --full` also needs `npx hyperframes doctor`.
- **Run it locally, not via letsbrag.app** — the hosted service takes a site URL and sends it to a
  third party. Fine for public Pages, but running locally keeps control of what is shown.
- **Run it against demo/seeded state only**, never a real account — for hearth_v2 use
  `?mode=demo`. Hermes is a static public page so it is safe as-is.
- Each run is inside that project's repo; add `brag-output/` to its `.gitignore`, and keep the
  rendered mp4 outside the repo unless Ben wants it committed.

## Decision log

### 2026-10-24: Poseidon is off the portfolio for now (Ben)

- **Decision:** Poseidon's card and long-form description are removed from
  `src/js/project-descriptions.ts`. It is not shown anywhere on the site, as a card or in the
  index, until Ben says otherwise. No reason was recorded.
- **This overrides** the `demo` ruling for `poseidon` in `demo-rulings.json` (an Almanac
  snapshot, left unedited) and the batch 1 card above. The ruling in Almanac should be changed
  to match if the pause is meant to last. `skip` would be wrong if this is temporary.
- **Effect:** featured goes 20 → 19, Systems 15 → 14.
- **Kept, so it can come back as a revert:** `src/public/assets/projects/poseidon.png` (the
  batch 1 screenshot crop; it was not swapped to the app icon), the `poseidon/demo/` Pages
  build in the `poseidon` repo, and the card as it stood in commit history. `poseidon.md` was
  dropped from the generated project docs because the generator does not prune stale files.
- **Re-adding it** needs a decision on the card image first (the screenshot crop or the app
  icon from `poseidon/tools/brand/source/`, a 320px master).

### 2026-10-24: App cards use the app's own icon, not a UI screenshot (Ben)

Argus, HAUS and Chef's Journal now use the icon each repo ships (`argus/icon_original.png`,
`HAUS/public/HAUS.png`, `chefs-journal/public/icon.png`), replacing the batch 1 screenshot
crops. This is the option `FOUNDATION-NOTES.md` §5 left open. Narrative, Morpheus and
Ecological already used their repo icons. Vox has no icon file in `Vox` or `vox-v2`, so its
card still shows the "PROJECT VOX" art.

## 5. Definition of done (this workplan)

- Every `demo`/`link` ruling has a card; every `index` ruling has an index line; nothing ruled
  `skip` is shown (the three skipped repos still linked today are retargeted or removed).
- Every `demo` card's iframe was loaded and looked at, not just fetched (CLAUDE.md §5).
- No card targets a template repo.
- Conflicts B, E, F have a written resolution (A, C, D settled above).
- `npm run lint`, `npm run format:check`, `npm run build` pass; new URLs return 200.

## Follow-through, 2026-10-13

Current execution state and pending approvals are in `STATUS-2026-10-13.md`.
FamilyPlan Pages is now actually disabled; a synthetic-build PR is prepared. The
liebestraum rotation remains blocked by GCP IAM permissions. STARK refers to the
migrated `stark-v1` product; the new `stark` app is deferred until a demo is ready.
Vox remains a sample CSV-table showcase, with corrected claims. Narrative/Morpheus
exceptions are now documented in CLAUDE.md and DEMO-MODE-METHODS.md.

## Release 1 candidate, 2026-10-24

Branch `release/portfolio-refresh-1` is a media-free release candidate: it merges #37, #38,
#39, #40, #42 and #43, and applies #44's resolution commits (approved copy fixes, demo
exceptions, link labels) without any `brag/` content. Result: 25 featured cards and 10 index
entries in the data (3 narrative + 4 psychology + 18 app featured; 3 + 5 + 2 index). Poseidon is
removed per the 2026-10-24 decision above; the Argus, HAUS and Chef's Journal icons come from
the `content/project-app-icons` work.

**Index tier is hidden in the UI (Ben, 2026-10-24).** `Pillar` no longer renders `ProjectIndex`, so
no index section appears on the site. The 10 `tier: 'index'` entries stay in
`project-descriptions.ts` (they still feed the generated project docs and the health check), and
`ProjectIndex.tsx` is kept so the section can be switched back on by re-adding one line in
`Pillar.tsx`. This changes the intent of #12/#26 (two-tier IA); decide whether to rescope them.

Deliberately left out, each with its own decision:

- **#41 icon corner radius** (22.37% CSS rule): visual approval pending, issue #35.
- **Launch videos** (#36, #45, `brag/`): ~273 MB of permanent history; see PR #52.
- **Source-repo demo fixes** (stark-v1 #4, PushUp #1, FamilyPlan #1): separate repositories.

Change to #40's health workflow: the scheduled run now uses `--strict`. A stale card turns the
run red and opens or updates one tracking issue ("Portfolio health: drift detected", label
`portfolio-health`); the issue closes on the next clean run. Template lag (the approved
Narrative/Morpheus exceptions) and cards with no `lastVerified` remain warnings. This closes
the gap against #14's "don't just log silently" criterion; #14 still needs a successful
manually dispatched run after merge.

First live run (2026-10-24): 37/37 links return 200. Stale: Argus, Flag, Hermes. Nine cards
have no `lastVerified` (Iris, Iroh, Morpheus, Narrative, Psi, Psyche, STARK, Vox, Vox v2).
The first scheduled run will therefore open the tracking issue, which is the intended signal.

### Source-repo demo review, 2026-10-24

Independent review of the three unmerged source-repo PRs. Nothing was merged or published.

- **stark-v1 #4**: ready to merge. Build and tests pass; loads cleanly at 390px and 1440px.
  Not playbook-grade: IndexedDB mock data persists across refresh. The live site is still the
  old bundle, so the fix is not deployed. This release already points the card at `/stark-v1/`
  (the previous `/STARK/` URL returns 404).
- **PushUp #1**: ready to merge after one fix pushed to the PR head (`a44ca30`): seeded logs
  were stamped 12:00 local, so before about 11:00 the "today" entry was rejected as future and
  the demo opened at 0. Seeds are now capped at the reset time, with a regression test. All
  playbook items pass. Live is still the old bundle; after merging, confirm 385/2000 and then
  archive `template-pushup` (#16).
- **FamilyPlan #1**: blocked, review only. No credentials in HEAD or any of 78 commits; the
  built app makes no external requests. Remaining: hardcoded fallback cost figures
  (`strategyDerivations.js`) that match real source values and are not covered by the
  verifier; real data remains in the private repo's tree and history; `npm run assemble`
  defaults to the real data. The human approval gate in #20 and #28 stands; Pages is still off.
