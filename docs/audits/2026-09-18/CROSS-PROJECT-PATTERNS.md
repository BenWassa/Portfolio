---
status: reference
lane: reference
updated: 2026-09-18
---

# Cross-project patterns — audit 2026-09-18

What the 48-repo sweep says when read together rather than one repo at a time.
Per-repo detail: `FINDINGS-BY-PROJECT.md`. Method: `../_method/AUDIT-SPEC.md`.

## Headline numbers

| | count |
|---|---|
| Repos audited (locally cloned, read-only) | 48 |
| `playbook`-grade demo mode | **2** — `HAUS`, `macht` |
| `partial` demo mode | 21 |
| No demo affordance | 25 |
| Recommended `demo` / `link` / `index` / `skip` | 27 / 8 / 6 / 7 |
| Deployed somewhere | 33 |
| Material drift (action needed) | 21 |

## Deployment × demo-mode

| | no demo | partial | playbook |
|---|---|---|---|
| **deployed** | 13 | 18 | 2 |
| **not deployed** | 12 | 3 | 0 |

The interesting cell is *deployed + partial* (18). These are live sites that already
half-support an anonymous visitor. They are the cheapest wins in the entire estate,
and they are invisible from the outside — which is why the portfolio undercounts the work.

## The one variable that decides everything

Not language, not framework, not age. **What stands between an anonymous visitor and
meaningful content.** Every repo falls into one of five archetypes, and the archetype
fully determines the recipe and the cost.

| # | Archetype | What blocks a visitor | Demo work needed | Examples |
|---|---|---|---|---|
| 1 | **No user data** | Nothing | None — demo mode is *moot*, embed as-is | `faust`, `arc`, `theos`, `flag`, `Ares`, `great-decoupling` |
| 2 | **Local-only state** (localStorage/IndexedDB) | Empty state on first load | Seed fixtures only; no auth to bypass | `vox-v2`, `marvel`, `JobQuestOS`, `layer-up`, `LothbrookLore` |
| 3 | **Auth + cloud backend** | Sign-in wall | Full playbook: gate + seeds + write-block + auth isolation | `hearth_v2` ✅, `pushup` ✅, `almanac`, `HAUS`, `Telos`, `hestia`, `iroh`, `morpheus-dream-archive` |
| 4 | **Non-web** (CLI, manuscript, corpus) | No web surface at all | Not embeddable — `link` or `index` | `Janus`, `personal-history-compiler`, `mirror-laws` |
| 5 | **Needs the visitor's own data/device** | Requires *their* files | Structurally impossible | `Narrative` (File System Access API, Chromium-only) |

Archetype 1 is the biggest surprise in the audit: a large share of `demo` recommendations
are *not* "has demo mode" — they are "has nothing to protect." Those need a card, not code.

## Effort tiers — what it actually costs

| Tier | Cost | What it is | Repos |
|---|---|---|---|
| **T0** | zero | Already embeddable. Add a card. | `arc` (ships real screenshots, correct base path), `faust`, `flag`, `JobQuestOS`, `Vox` |
| **T1** | one line / one config | A working demo path exists but is unreachable | `almanac` (gate is `import.meta.env.DEV`, unreachable in prod), `jarvis-core` (`MOCK_ENABLED = false`), `layer-up` (`.env` says `TRUE`, code tests `=== 'true'`), `pantheon` (`dayAdvance` pins Day 1 forever), `HAUS` (demo built; workflow never sets `VITE_DEMO`) |
| **T2** | seed data | Gate works, content is empty | `the-pushup-challenge-2025` (real `?mode=demo`, **zero seeds** → empty tracker), `LothbrookLore` (12 finished episodes sitting unused) |
| **T3** | full playbook | Auth + cloud, real data to protect | `morpheus-dream-archive`, `Telos`, `hestia`, `iroh`, `hearthMVP` |
| **TX** | don't | Structurally unembeddable or not portfolio material | `Narrative`, `Janus`, `mirror-laws`, plus the 7 `skip`s |

**T1 is the finding that matters.** Five projects have complete, working demo paths that
no visitor can reach, each blocked by a single constant, env-var case, or missing CI variable.
That is roughly an afternoon for five new embeddable projects.

## Recurring failure modes

These repeat across the estate and are worth fixing as classes, not one-offs.

1. **The gate exists but is unreachable** (T1 above, 5 repos). A demo path written for
   local development, gated on something a production build can never satisfy.
2. **Deploy config points at the wrong directory** — `psyche` (`firebase.json` serves
   `public/` while Vite builds to `dist/`, so the live site is not the app), `jarvis-core`
   (hosting root has no `index.html` → blank site), `Iris` (`docs/` build hardcoded to
   `localhost:5000`, every visitor sees a backend error). **Deployment is not evidence
   that the deployed thing works.**
3. **Uncommitted README rewrites** — `Ares`, `Janus`, `Project-Loki`, `psyche`. `faust`'s
   is actively dangerous: it would replace the public README with internal triage notes.
4. **Build output committed *and* rebuilt in CI** — `Narrative`, `Project-Loki`, `FamilyPlan`.
   The same class of problem this repo just fixed by moving `docs/` → `dist/`.
5. **Credentials and personal data** — see `SECURITY-ACTIONS.md`. Three repos need action.
6. **Template forks as a demo substitute** — the anti-pattern. See below.

## The template-fork verdict

The forks were created to give anonymous visitors something to look at. Two are now
obsolete because the real product grew a proper demo mode; one is still load-bearing.

| Fork | Status | Evidence |
|---|---|---|
| `template-pushup` | **redundant** | `the-pushup-challenge-2025/src/utils/mode.js` has a real `?mode=demo` / `VITE_DEMO_MODE` gate wired through `useAuth`, `useUserData`, `useLeaderboard`. The fork's last commit is the *same day* upstream shipped "Add demo local mode" |
| `template-hearth` | **redundant** | `hearth_v2` has the full playbook. The fork is a 6.5-month-stale CRA copy of what is now a Vite product, and its localStorage persistence with no reset is a defect for an embed |
| `template-morpheus` | **still required** | It is the only build that renders the gallery to an anonymous visitor *with content*. `morpheus-dream-archive` is gated behind Google sign-in + a hardcoded UID whitelist, ships an empty `public/index.json`, and `vite.config.js:15-26` **throws** without Firebase env vars |

**Do not retire `template-morpheus` until the real repo has demo mode.** Switching that
card today replaces a working demo with a sign-in wall. This reverses the guidance in
`docs/open/PORTFOLIO-REFRESH-PLAN.md` §2.1 and issue #16.

The general lesson: a fork is a *snapshot*, and snapshots rot silently because nothing
fails when they do. Demo mode inside the real product cannot rot without the product
breaking too. That is the whole argument for the playbook, now with evidence behind it.
