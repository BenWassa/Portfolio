---
status: open
lane: opus
issues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
owner: Ben
updated: 2026-09-13
---

# Portfolio Refresh — scoping plan

Audit date **2026-09-13**. Portfolio last touched **2026-02-23** (~7 months).

---

## 1. State of play

**What is fine.** All 15 displayed projects return HTTP 200. `main` and `origin/main` are in
sync. The build works. Nothing is broken — the site is frozen, not rotting.

**What is stale.** Since the 2026-02-23 snapshot, three displayed projects shipped real work
that the site does not reflect (`punchbuggy` → 2026-08-14, `hearth_v2` → 2026-08-15,
`morpheus-dream-archive` → 2026-07-17), and roughly 20 new projects were built and never added.

**The scale.** 98 repos: 51 public, 47 private, no forks, no archives. After excluding
templates, backups, utilities and 22 professional/consulting repos, the triage set is
**32 candidates** — 17 live-and-public, 6 live-but-private, 9 public-but-undeployed.
See `CANDIDATE-INVENTORY.md`.

### The three real problems

1. **Template drift is measurable, not theoretical.** The "Morpheus" card points at
   `template-morpheus` (2026-02-23) while the product shipped 2026-07-17. Visitors see a
   five-month-old fork. The same structural risk applies to `narrative-template`,
   `wrestle-template`, `template-hearth` and `template-pushup`.
2. **There is no mechanism that notices staleness.** Nothing compares a card's claims against
   its repo's actual state. Seven months passed silently. This will happen again unless a
   check exists.
3. **A flat 15-card grid does not scale to 35+.** Adding everything destroys the
   Narrative/Systems/Psyche structure that makes the site legible.

### One thing already solved

`hearth_v2/docs/DEMO_STATE_PLAYBOOK.md` is a complete, rigorous demo-mode standard: mode
resolver, state-contract parity, deterministic seeds, blocked durable writes, auth isolation,
reset semantics, acceptance checklist, and a reusable implementation prompt. It does not need
to be invented — it needs to be **promoted to a repo-level standard and applied**.

---

## 2. Strategy

### 2.1 Demo mode replaces template repos

Confirmed direction: `demoUrl` iframes pointing at the **real product in demo mode**, never at
a forked template. The product stays current by construction; the demo follows it.

Migration order, cheapest-first:

| Project | Today | Target |
|---|---|---|
| Hearth | `hearth_v2?mode=demo` | ✅ already correct — reference implementation |
| PushUp | `the-pushup-challenge-2025?mode=demo` | ✅ already correct |
| Wrestle | `wrestle-template` | `wrestlePWA?mode=demo` (repo is private — needs Pages-only publish) |
| Morpheus | `template-morpheus` | `morpheus-dream-archive?mode=demo` |
| Narrative | `narrative-template` | resolve name collision first, then demo mode |

Once a project's demo mode passes the playbook's acceptance checklist, its template repo is
archived — not deleted, archived, so old links keep resolving.

### 2.2 Two-tier information architecture

A curated **featured grid** keeps the three-pillar story intact. A lightweight **full-work
index** (text rows: name, one line, year, link) carries breadth without visual cost. Each
candidate is assigned `demo`, `link`, or `index` during triage — the index tier is what makes
"I built a lot" showable without diluting the showcase.

### 2.3 Project schema v2

`Project` in `src/types.ts` gains four fields so the site can reason about its own freshness:

```ts
repoUrl?: string;        // canonical repo — enables automated staleness checks
lastVerified?: string;   // ISO date the link and content were last confirmed
demoMode?: 'playbook' | 'live' | 'template' | 'none';
tier: 'featured' | 'index';
```

`repoUrl` is the load-bearing one: without it nothing can automatically compare a card against
the repo it claims to represent.

### 2.4 A staleness check that runs

A script comparing each card's `repoUrl` pushedAt against `lastVerified`, plus an HTTP check on
every `href` and `demoUrl`, run in CI weekly. This is the control that prevents another silent
seven months. It is the highest-leverage item in the whole plan and it is small.

---

## 3. Governance

### 3.1 `main` protection

Codified in `CLAUDE.md` §1: no direct commits, no force-push, PR-only, no agent self-merge.

Currently `main` has **zero** GitHub-side protection rules — the convention is unenforced.
Because Pages deploys from `main`'s `/docs` path, protecting `main` and deploying are entangled.
Resolution, in order:

1. Move Pages to a GitHub Actions build (issue #1). `main` becomes source-only; `dist/` is the
   artifact and is git-ignored. Workflows already exist in `flag` and `poseidon` to copy.
2. Then enable branch protection on `main` (issue #2) — PRs required, force-push blocked.

This branch does the safe half: build output now targets `dist/`, and
`.github/workflows/deploy-pages.yml` is in place. The stale `docs/` build artifacts are left
untouched so the live site keeps serving until the Pages source is flipped deliberately. **Zero
downtime, and the flip is reversible.**

### 3.2 Work lanes

`docs/open/` for active work, `docs/closed/` for completed. Conventions in `docs/README.md`.
Reclaiming `docs/` for this purpose is only safe because the build no longer writes there —
`emptyOutDir: true` would previously have deleted these files on every build.

### 3.3 Agent tiers

**`lane:opus`** — judgment and irreversibility: curation, copy, pillar taxonomy, IA,
demo-mode architecture per app, schema changes, CI/CD and branch protection.

**`lane:standard`** — mechanical and verifiable: adding an approved card, screenshots,
image optimization, link checks, generators, doc regeneration, dependency bumps, archiving a
template repo once its replacement is verified.

The dividing line: *would a wrong answer here be embarrassing in public or hard to undo?*
Yes → opus. No → standard. A `lane:standard` agent that hits a judgment call escalates rather
than deciding.

---

## 4. Phased roadmap

### Phase 0 — Foundations · unblocks everything

| # | Issue | Lane |
|---|---|---|
| 1 | Migrate Pages to GitHub Actions, retire `docs/` as build output | standard |
| 2 | Enable branch protection on `main` | human |
| 3 | Adopt `CLAUDE.md`, work lanes, and this plan | opus |

### Phase 1 — Decide · gated on Ben, blocks all content work

| # | Issue | Lane |
|---|---|---|
| 4 | Per-project triage of 32 candidates | **human** |
| 5 | Re-verify the 15 displayed projects against current repo state | opus |
| 6 | Resolve the `Narrative` name collision | opus |
| 7 | Decide fate of 9 undeployed public repos (Tier C) | opus |

### Phase 2 — Architecture · build the container before filling it

| # | Issue | Lane |
|---|---|---|
| 8 | Two-tier IA: featured grid + full-work index | opus |
| 9 | Project schema v2 (`repoUrl`, `lastVerified`, `demoMode`, `tier`) | opus |
| 10 | Automated staleness + link-health check in CI | standard |

### Phase 3 — Demo-mode standard

| # | Issue | Lane |
|---|---|---|
| 11 | Import `DEMO_STATE_PLAYBOOK.md` as the repo-level standard | standard |
| 12 | Migrate Morpheus, Narrative, Wrestle off template repos to demo mode | opus |

### Phase 4 — Content production · parallelizable, fan out here

| # | Issue | Lane |
|---|---|---|
| 13 | Screenshot and asset pipeline for approved projects | standard |
| 14 | Write cards (copy + `techSpecs`) for approved projects | opus |

Phases 0–3 are sequential. Phase 4 fans out per project once phases 1–2 land, and is where
parallel agents actually pay off. Sequencing Phase 4 before Phase 2 would mean writing cards
into a schema about to change — the single most likely way to waste effort here.

---

## 5. Definition of done

- Every displayed project's `lastVerified` is within 30 days of the last release.
- No card points at a template repo.
- CI fails on a dead `href` or `demoUrl`.
- Breadth is visible without the featured grid exceeding what the three pillars can carry.
- `main` mechanically rejects direct pushes.
