---
status: standard
lane: reference
updated: 2026-09-18
---

# Demo-mode methods

How to decide **which** projects get a live demo, and **how** to build one for each kind
of project. Derived from evidence across 48 audited repos (`docs/audits/2026-09-18/`)
and from the two implementations that already work (`hearth_v2`, `the-pushup-challenge-2025`).

The normative spec — what "done" means — is `DEMO_STATE_PLAYBOOK.md`. This document is
the layer above it: triage, archetype selection, and per-archetype recipes.

---

## Part 1 — Which projects get a demo

### The decision rule

Ask these in order and stop at the first that answers.

1. **Is there a web surface at all?** No → `link` or `index`. Never `demo`.
   (A CLI, a manuscript, or a research corpus is not a demo candidate. `Janus`,
   `mirror-laws`, `personal-history-compiler`.)
2. **Does it require the visitor's own files, device, or account?** Yes → `link`.
   Structurally impossible, no amount of work fixes it. (`Narrative` needs a folder
   picker against the visitor's own photo library.)
3. **Is there any user data to protect?** No → **embed as-is.** Demo mode is moot.
   Do not build one. (`faust`, `arc`, `theos`, `flag`.)
4. **Is state local-only (localStorage/IndexedDB, no auth)?** Yes → **seed fixtures only.**
   No mode gate needed; there is no auth to bypass and no backend to protect.
5. **Otherwise** (auth + cloud backend) → **full playbook**, or `link` if the project
   isn't worth that cost.

### What makes a project *worth* the cost

Build a demo when the answer to "what does a visitor learn in 10 seconds?" is
substantive and visual. A demo that opens on an empty tracker teaches nothing and is
worse than a screenshot — this is the `template-pushup` failure: a correct mode gate
with **zero seed data**, so the demo renders an empty calendar and an empty leaderboard.

Rank candidates by `(what a visitor sees) ÷ (effort tier)`. Use the tier table in
`docs/audits/2026-09-18/CROSS-PROJECT-PATTERNS.md`. T0 and T1 first, always — five
projects currently sit one constant away from being embeddable.

### Never do this

**Do not fork the project to make a demo.** A fork is a snapshot; snapshots rot silently
because nothing fails when they drift. Two of three existing template forks are already
obsolete, and the third (`template-morpheus`) is only still needed because the real
product cannot serve an anonymous visitor at all. Demo mode inside the real product
cannot rot without the product breaking too.

---

## Part 2 — Recipes by archetype

### Archetype 1 — No user data (static content, calculators, essays)

**Work required: none.** Add the card, point `demoUrl` at the live site.

Check only: correct base path for the host, no `localhost` URLs in the build, and that
the deployed artifact is actually the app (see the deploy-config trap below).

### Archetype 2 — Local-only state (localStorage / IndexedDB, no auth)

**Work required: seed fixtures.**

1. Write a deterministic fixture module — stable IDs, stable timestamps, no `Math.random()`,
   no `Date.now()`. Screenshots and tests must be reproducible.
2. Seed on first load **only when the store is empty**, so a real user's data is never
   overwritten.
3. Gate on `?mode=demo` so a normal visitor still gets an empty app.
4. Reset on refresh, or offer an explicit "reset demo" control.

Content matters more than machinery here: seed enough to show the product's *point*
(`LothbrookLore` has 12 finished episodes sitting unused while its tracker cold-starts blank).

### Archetype 3 — Auth + cloud backend

**Work required: the full `DEMO_STATE_PLAYBOOK.md`.** Do not improvise; follow it.
Summarised, in the order that keeps the work isolated:

1. **Mode resolver first**, before any other change — one central place, reading both an
   env var and a URL param. Never scatter `isDemo` checks through components.
2. **Demo state adapter** exposing the *same interface* as production state, so view
   components need no demo-specific branching. (Contract parity over implementation parity.)
3. **Deterministic seeds** with stable IDs/timestamps.
4. **Block durable writes** — import/export/sync/delete stubbed in demo.
5. **Reset semantics** — refresh returns to baseline; clear app storage keys on entry.
6. **Auth isolation** — a real signed-in session must never run in demo mode.
7. **Visible demo messaging** in the UI.

**Placement is the part that goes wrong.** The mode check must sit *before* the auth gate,
not after. `morpheus-dream-archive` has the content-loading machinery already
(`loadStaticEntries()` at `src/App.jsx:491-517`) but every path reaches it only after
sign-in, so none of it is usable by a visitor.

Also relax any build-time guard that hard-fails without backend credentials — a demo
build must be producible with no secrets at all (`morpheus-dream-archive/vite.config.js:15-26`
currently throws).

### Archetype 4 & 5 — Non-web / requires visitor's own data

Not demo candidates. Give them a card that links out, or a line in the work index.
Invest in a good screenshot and a clear description instead.

---

## Part 3 — Traps this audit actually found

Each of these was observed in a real repo. Check for them explicitly.

| Trap | Symptom | Seen in |
|---|---|---|
| **Gate unreachable in production** | Demo works locally, never on the deployed site | `almanac` (`import.meta.env.DEV`), `HAUS` (CI never sets `VITE_DEMO`) |
| **Env-var comparison mismatch** | Feature silently dead, no error | `layer-up` (`.env` `TRUE` vs code `=== 'true'`) |
| **Mock flag shipped off** | Real path points at `127.0.0.1` | `jarvis-core` (`MOCK_ENABLED = false`) |
| **Deploy serves the wrong directory** | Live URL returns 200 but isn't the app | `psyche` (`public/` vs `dist/`), `jarvis-core` (no `index.html`) |
| **Build hardcoded to localhost** | Every visitor sees a connection error | `Iris` (`docs/` build → `localhost:5000`) |
| **Gate without seeds** | Demo opens empty; teaches nothing | `the-pushup-challenge-2025` |
| **Demo pinned to one state** | Every visitor sees the same first screen forever | `pantheon` (`dayAdvance` pins Day 1 of 7) |
| **Demo persists across visits** | Second visitor inherits the first one's mess | `template-hearth` (localStorage, no reset) |
| **Demo writes to production** | Seeding script targets the real backend | `hestia` (`scripts/seed-demo.ts` → production Firestore) |
| **Build-time secret requirement** | No credential-free build possible | `morpheus-dream-archive` |

**A 200 response is not evidence the demo works.** Three repos in this audit return
HTTP 200 while serving something broken or wrong. Verify content, not status.

---

## Part 4 — Acceptance checklist

A project qualifies for `demoMode: 'playbook'` and an iframe `demoUrl` only when:

- [ ] The demo is reachable on the **deployed production URL**, not just locally
- [ ] A visitor sees **meaningful, populated content** within one screen
- [ ] No sign-in, no credentials, no visitor-supplied files required
- [ ] Seeds are deterministic — same content on every load
- [ ] Refresh resets cleanly; nothing persists between visitors
- [ ] No writes reach any production backend
- [ ] A real signed-in session cannot run in demo mode
- [ ] The UI says it is a demo
- [ ] The demo build is producible with **no secrets**
- [ ] It renders inside an iframe at the portfolio's embed size
- [ ] Verified by loading the URL and looking at it — not by checking the HTTP status

Archetype 1 projects (nothing to protect) are exempt from seeds/reset/auth items but
must still pass the iframe, content, and verification checks.
