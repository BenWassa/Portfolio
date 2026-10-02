---
status: open
lane: opus
issues: [8, 9, 10, 12, 13, 14, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28]
owner: Ben
updated: 2026-10-02
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
| A | `morpheus-dream-archive` | demo | **Settled → build demo mode** (opus, #16). Removes the sign-in wall and UID whitelist for the demo path and relaxes the `vite.config.js` build guard. The `template-morpheus` card stays until it passes the checklist, then is retired. |
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

**Open (Q1):** the same pattern may apply to `template-morpheus` (a working demo per the audit)
and `wrestle-template`. If Ben wants separate clean demo repos there too, #16 changes from
"build demo mode in the real repo" to "keep the template, refresh it". Not decided.

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
| HAUS | demo fully built, never deployed | Build with `VITE_DEMO=true`, add `?mode=demo`, deploy | standard (spec'd) |
| chefs-journal | `?snapshot=true` gate exists, private repo | Publish a Pages/Hosting target | opus (privacy call) |
| wrestlePWA | repoint off `wrestle-template` | Verify repo has a credential-free path; else build | opus |
| morpheus-dream-archive | none | Full playbook demo mode (A) | opus |
| Narrative | demo = `narrative-template` (clean separate repo, drifted) | Re-verify it loads with sample data; record template-vs-Narrative drift; retarget card to repo `Narrative` + that demoUrl (#10) | opus |
| liebestraum | none | Full playbook demo mode, after key rotation (C) | opus |
| FamilyPlan (`link`) | public build contains real income | Take Pages offline; redeploy from synthetic data (D) | human, then standard |

## 4. Workstreams

Dependencies are real; the first two gates decide how much runs in parallel.

```
Gate 0  Ben answers Q1 below (A–F settled) · #20 items 1–2 done before touching FamilyPlan/liebestraum
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
| **WS5 Index tier** | 10 index lines (name, one-liner, year, link) | #12 | One agent |
| **WS6 Staleness CI** | `repoUrl` vs `lastVerified`, HTTP check on every link | #14 | One standard agent after #13 |

Issues #9 (re-verify displayed cards), #10 (Narrative collision) and #16 (template retirement)
fold into WS1/WS2 as noted on each.

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

## 5. Definition of done (this workplan)

- Every `demo`/`link` ruling has a card; every `index` ruling has an index line; nothing ruled
  `skip` is shown (the three skipped repos still linked today are retargeted or removed).
- Every `demo` card's iframe was loaded and looked at, not just fetched (CLAUDE.md §5).
- No card targets a template repo.
- Conflicts B, E, F have a written resolution (A, C, D settled above).
- `npm run lint`, `npm run format:check`, `npm run build` pass; new URLs return 200.
