---
status: reference
lane: reference
updated: 2026-09-18
---

# Per-project findings — audit 2026-09-18

Generated from `raw/*.json` by `docs/audits/_method/render.py`. **Do not hand-edit** —
change the raw JSON and re-render, or the two will drift.

48 locally-cloned repositories, audited read-only. Method: `docs/audits/_method/AUDIT-SPEC.md`.

Sorted by recommendation, then name.


---

## Recommended `demo` (27)

### `almanac`

**A season-and-cadence ledger for long-running personal projects that ingests a nightly capture of every GitHub repo you own and queues overnight agent work against them, returning draft pull requests by morning.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `import.meta.env.DEV (Vite build-mode gate only — no URL param, no env flag)` |
| Seed data / blocks writes / auth isolated | True / True / True |
| Stack | React 19, Vite 6, TypeScript 5.7, Zustand 5, Firebase 12 (Auth + Firestore), vite-plugin-pwa |
| Build | `npm run build  (tsc -b && vite build); full gate: npm run check` |
| Deployed | True — https://almanac-4631c.web.app (firebase-hosting) |
| Git | `main` @ 2026-09-16 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `public/favicon.svg`, `public/pwa-192x192.png`, `public/pwa-512x512.png` |

It already has a complete, deterministic, write-safe demo path with real seeded content and a demo banner; the only blocker to embedding it is that the gate is DEV-only, which is a few lines to fix. Most portfolio-ready of the six by a wide margin.

<details><summary>Demo-mode evidence</summary>

- `src/app/App.tsx:12 — `if (import.meta.env.DEV) { return <DemoApp /> }` is the entire mode gate`
- `src/app/App.tsx:6 — `const DemoApp = lazy(() => import("@/app/DemoApp"))``
- `src/app/DemoApp.tsx:4 — `import inventory from "../../data/github-inventory.json"` (129 KB deterministic captured seed)`
- `src/app/DemoApp.tsx:10-12 — localStorage keys `almanac.inventory-decisions.v1`, `almanac.demo-seasons.v1`, `almanac.demo-assignments.v1``
- `src/app/AppShell.tsx:21 — `{demo && <div className="demo-banner">Local demo · changes are not saved</div>}``
- `src/features/settings/SettingsView.tsx:6-7 — Firebase-backed store kept lazy so the fixture demo never initializes Firebase`
- `src/features/settings/SettingsView.tsx:28 — demo branch hides Google sign-in and GitHub capture`
- `.env.example:1 — "Local development always uses demo data. These values are used by production builds."`

Structurally this is the closest of the six to the playbook: a dedicated DemoApp component, deterministic seed data, a visible demo banner, and durable writes guarded by construction (DemoApp never touches Firestore — all mutations go to localStorage, and Firebase modules are lazy so they are never even initialized). Held back from `playbook` for one reason: the gate is `import.meta.env.DEV`, a build-time constant. A production bundle can never reach DemoApp — it renders the Firebase setup screen or the authenticated app. Adding a `?mode=demo` / `VITE_DEMO=1` branch alongside the DEV check would make it playbook-grade with a few lines.

</details>

<details><summary>Drift findings</summary>

- README says "Development automatically uses the captured GitHub inventory when Firebase is not configured", but src/app/App.tsx:12 short-circuits on DEV unconditionally — a configured dev environment still gets the demo, never Firebase. README and code disagree about the condition.
- No hosting deploy workflow despite a complete firebase.json; the live site only updates when someone runs `firebase deploy` by hand, so the deployed build's freshness is unverifiable from the repo.
- 13 remote branches open (codex/*, claude/*, backend/*, ops/*, night-shift, fix/*) against a single-author project — substantial in-flight/abandoned branch sprawl.
- `codex/production-verification-audit` is checked out in a separate worktree (git branch shows `+`), i.e. there is live work parked outside main.
- No PWA/app screenshots anywhere in-repo — only icons. A portfolio card would need a capture taken by hand.
- dist/ exists on disk but is not tracked (correctly gitignored) — noted only because psyche makes the opposite claim.

</details>

### `arc`

**A personal manifesto rebuilt as an offline-capable PWA: seven laws of governed capability, the counterfeit each virtue degrades into, and an interactive five-gate runner that walks a proposed action through the gates and returns a verdict.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`none`** |
| Triggers | `none — and none is required. Grep for demo|mock|sample|fixture across src/ returns a single unrelated prose comment (src/components/plates/PlateViewer.tsx:12).` |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | React 19, Vite 8, TypeScript 6 (project references, tsc -b in build), vite-plugin-pwa + workbox (precaching, routing, strategies, window), Hand-written CSS design system in @layers (src/styles/global.css) — no Tailwind, no UI library, Self-hosted fonts, zero runtime third-party requests |
| Build | `npm run build (tsc -b && vite build → dist/)` |
| Deployed | True — https://benwassa.github.io/arc/ (GitHub Pages via Actions (typecheck + lint + build, upload-pages-artifact from dist/)) |
| Git | `main` @ 2026-08-06 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `public/screenshots/desktop.png`, `public/screenshots/mobile.png`, `public/screenshots/social.png` |

Clean, current (HEAD 2026-08-06), fully deployed with CI, correct base path, zero backend, zero accounts, in-memory interactive state, and ready-made desktop/mobile/social screenshots. It can be iframed exactly as-is with no work at all — it is the reference case for what the other repos should look like.

<details><summary>Demo-mode evidence</summary>

- `package.json dependencies — react and react-dom only. No backend client, no auth, no storage library.`
- `README.md:7-8 — 'No third-party requests at runtime — fonts are self-hosted and nothing is sent anywhere.'`
- `src/content/*.ts (9 modules, 323 lines) — the entire manifesto ships as typed data compiled into the bundle`
- `grep for localStorage across src/ returns zero hits — the interactive runner's state is in-memory (src/components/runner/runnerState.ts)`
- `src/sw/sw.ts + vite-plugin-pwa + workbox-* — the only persistence is an offline asset cache`

There is nothing to demo-gate: no accounts, no user data, no durable writes, no network calls. Every visitor already gets the complete product, and the interactive 'filter runner' resets cleanly on reload because its state never leaves memory. Recorded as 'none' because none of the playbook's machinery exists — but unlike morpheus, that is a property of the architecture, not a gap. This is the most embed-ready repo in the batch.

</details>

<details><summary>Drift findings</summary>

- The content corpus is small — 323 lines across 9 typed modules — for a project presented as a full manifesto. It is finished and coherent, not padded, but a reviewer expecting long-form will find it brief.
- README's Layout table omits src/components/plates/, which is where the most recent two commits (2026-08-06, the plate viewer and emblem work) landed. The docs are one feature behind the code.
- Dependency versions are aggressively bleeding-edge (Vite 8, TypeScript 6, ESLint 10, React 19.2.8, @types/node 26). Nothing is broken today, but CI pins nothing beyond the lockfile and a transitive break would take the Pages deploy with it.
- public/screenshots/{desktop,mobile,social}.png exist and are the best preview assets in the whole batch, but nothing in the README references them — they are invisible to anyone reading the repo.
- Untracked local build debris in the working tree (dist/, graphify-out/, *.tsbuildinfo) — all correctly gitignored, so cosmetic only.

</details>

### `Ares`

> **⚠ Action needed:** non-standard entry point — Pages would not serve the real document

**A single-page interactive digital synopsis of Dutton, Boyanowsky & Bond's 2005 paper on extreme mass homicide, compiled by a Python build from 8 analytical sections and 8 historical case studies (Armenian, Nanking, Holodomor, My Lai, Cambodia, Rwanda, Bosnia, El Mozote) into one styled document with a dual-voice visual system - warm cream/gold for narrative vignettes, cool grey/blue for analysis - plus a sticky table of contents, scroll-progress bar and glossary tooltips.**

| | |
|---|---|
| Recommendation | **`demo`** (medium confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Vanilla HTML/CSS/JS (no framework), Python 3 build pipeline (build.py -> 03-content/build/unified_builder.py), Google Fonts (Merriweather, Open Sans), Markdown + JSON content sources |
| Build | `python build.py` |
| Deployed | False   |
| Git | `main` @ 2025-11-18 · 1 uncommitted · 0 unpushed |
| Screenshots in repo | `02-assets/images/20250714_1147_Ancient Justice Remains_simple_compose_01k04stv9de3m973cyzvd81kvf.png` |

It is a zero-dependency static document with no user data, so it is trivially iframe-able once it has a URL - the only work is enabling GitHub Pages and making the built HTML the served index. Weigh the subject matter deliberately before embedding it rather than linking it.

<details><summary>Demo-mode evidence</summary>

- `01-core/index-with-content.html`
- `01-core/script.js`
- `03-content/build/unified_builder.py`

Not applicable rather than missing. Ares is a static, single-document website with no user accounts, no persistence, no backend and no user-entered state - the entire artefact is a 44KB pre-built HTML file (01-core/index-with-content.html) generated by a Python build from 16 markdown sources plus glossary.json and casestudies.json. There is nothing to seed, gate or write-block, so every surface a visitor sees is already 'demo content' by construction. Recorded as 'none' because no mode gate, no fixture layer and no write guard exist in the code.

</details>

<details><summary>Drift findings</summary>

- The README in the working tree is a complete uncommitted rewrite (62 insertions / 148 deletions) that has never been committed or pushed. The README visible on GitHub is still the older emoji-heavy 'Project Ares' version, so the repo's public face and its local face disagree.
- Entry point is non-standard: the real document is 01-core/index-with-content.html, not an index.html at the repo root, so GitHub Pages would not serve it without a copy/rename or a docs/ output step.
- Build output (index-with-content.html) is committed alongside its markdown sources, so the two can silently diverge - there is no CI that rebuilds or verifies them.
- README's own 'What's missing' list is accurate and unaddressed: 03-content/maps/interactive-maps.json and 02-assets/svgs/process-model.svg exist but are not wired into the frontend, and the claimed WCAG 2.1 AA target in 01-core/package.json is aspirational with no audit run.
- 01-core/package.json declares devDependencies (html5validator, axe-core, lighthouse) and scripts (validate, accessibility, lighthouse) that have never been installed or run - there is no lockfile and no node_modules.
- A stale generated snapshot from 2025-07-14 is committed at the repo root (repo_status_ares.txt) and duplicated at 05-utilities/scripts/repo-status/repo_status_ares.txt.
- Windows-only helper scripts (.bat, .ps1) sit alongside their shell equivalents; 05-utilities/start-server.bat will not run on the owner's macOS machine.
- Untouched since 2025-11-18 - the oldest repo in this batch by ten months.
- Subject matter is genocide and mass atrocity; embedding it live on a personal portfolio is a curation/framing decision, not just a technical one.

</details>

### `argus`

**A mobile-first spaced-repetition app built around finitely-scoped competencies — each topic (NATO alphabet, Morse A-Z, compass bearings) declares an explicit scored boundary so it can actually be finished via delayed recall rather than endless exposure — with a separate ungraded Learn surface, a scheduler that decides whether a Test result is timely enough to advance retention, and optional Google-account sync that reports conflicts instead of overwriting either device.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `env trigger: absence of the four required VITE_FIREBASE_* variables switches the whole app to a local-only, ungated build`; `npm run build:e2e — a first-class script that blanks every VITE_FIREBASE_* var and produces exactly that build`; `.env.example documents 'leaving these unset is a supported configuration'` |
| Seed data / blocks writes / auth isolated | True / True / True |
| Stack | React 19, TypeScript 5.8, Vite 7, Firebase 12 (Auth + Firestore), motion 13, Vitest 4 |
| Build | `npm run build  (tsc -b && vite build); demo-shaped build: npm run build:e2e` |
| Deployed | True — https://argus-b7a5a.web.app (firebase-hosting (manual CLI deploy from dist/, SPA rewrite, immutable asset caching)) |
| Git | `main` @ 2026-09-18 · 18 uncommitted · 1 unpushed |
| Screenshots in repo | `public/media/splash-poster.jpg`, `public/icons/argus-icon-512.png`, `public/icons/argus-maskable-512.png` |

It is the most polished and most actively developed project in this batch and it is already one npm script from an embeddable build: `npm run build:e2e` yields an unauthenticated, fully local app that installs a real seeded library on first run, so the demo can show genuine learning content rather than an empty shell. The live URL cannot be embedded — it demands Google sign-in as the owner — so the demo must be a separately deployed unconfigured build, and demo-namespaced storage plus a reset-to-seed would take it to playbook.

<details><summary>Demo-mode evidence</summary>

- `src/services/sync/syncConfig.ts:43-48`
- `src/services/sync/syncConfig.ts:60-70`
- `src/services/sync/syncConfig.ts:89-96`
- `src/app/gate/AuthGate.tsx:6-18`
- `src/app/gate/AuthGate.test.tsx:10-18`
- `src/domain/library/catalogSeed.ts:34`
- `src/infrastructure/persistence/libraryMigrations.ts:4`
- `src/infrastructure/persistence/libraryMigrations.ts:90`
- `src/domain/library/catalog.ts:28`
- `src/services/inbox/inboxConfig.ts:32`

The closest thing to playbook in this batch, reached from a different direction. There IS a real mode gate, it is just env-shaped rather than URL-shaped: readSyncConfig returns {configured:false} when any of VITE_FIREBASE_API_KEY/AUTH_DOMAIN/PROJECT_ID/APP_ID is blank (syncConfig.ts:43-70), and AuthGate.tsx deliberately does not gate an unconfigured build — its own comment calls this 'the configuration the repository has always supported, where there is nothing to sign in to and Argus is a local-only app'. Deterministic seed data exists and is the product, not a fixture: seedLibrary() in catalogSeed.ts:34 (NATO alphabet, full A-Z Morse, compass bearings) is what libraryMigrations.ts:90 installs for a new library. Durable remote writes are structurally impossible in that build — there is no Firebase backend to push to, so nothing reaches Firestore. Held at partial rather than playbook for two honest reasons: there is no ?mode=demo or VITE_*_DEMO runtime trigger (the switch is build-time only), and a visitor's progress still writes to the same localStorage keys a real local user would use, with no demo namespacing and no reset-to-seed. Both are cheap to add. Note syncConfig.ts also hard-refuses to build if any VITE_ var matches PRIVATE_KEY|SERVICE_ACCOUNT|CLIENT_SECRET|GITHUB_TOKEN|ADMIN_KEY — unusually careful.

</details>

<details><summary>Drift findings</summary>

- 18 uncommitted modified files plus 1 unpushed commit ('Simplify Morse keyed placement and audio startup'). The dirty set is coherent and mid-refactor — Morse curriculum (lesson.ts, lessonSitting.ts, listening.ts), study/journey.ts, libraryParser.ts, TopicPage.tsx, MorseLesson.tsx, their tests, and docs/open/PROGRESS_ARCHITECTURE.md — i.e. live work in progress on the default branch, not stray noise.
- README states the offline-first runtime guarantee is NOT yet true of the current localStorage/service-worker implementation and is active scope in issue #113. Honest of the README, but it means any 'works offline' portfolio claim would be premature.
- Production requires Google sign-in and the Firestore rules are rendered for a single owner email (firestore.rules.template + ARGUS_OWNER_EMAIL), so https://argus-b7a5a.web.app is NOT publicly viewable — a visitor hits SignInScreen and gets no further. The public-looking URL is effectively private.
- Deploy is manual CLI only by deliberate design; validate.yml runs tests and a build sanity check but never deploys, so the live site can silently lag main.
- Working tree carries generated/local clutter: six .graphify_*.json files, graphify-out/, dist/, firebase-debug.log, firestore-debug.log, .env.local, .firebase/ (all untracked/ignored — none appear in git ls-files).
- Six local branches beyond main (integration/upgrade-reconciliation, issue-93-progress-safety-closeout, refactor/src-structure, upgrade, wip/exposure-test-tap-closeout) and 13 remote ones, several looking like abandoned closeouts.
- Root-level doc sprawl (AGENTS.md, CLAUDE.md, DESIGN.md, DESIGN.json, PRODUCT.md, argus-prd.md, README.md) plus a large docs/open + docs/closed tree.

</details>

### `chefs-journal`

**A household cooking journal PWA where two signed-in members share one Firestore-backed log of cooked meals — structured ingredients, taste/texture/visuals ratings, photos and notes — plus a cookbook of recipes, a shopping list with a curated quick-add catalogue and frequent-item suggestions, and an offline OCR importer that bulk-loads scanned recipe cards.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `?snapshot=true — a real URL query-param mode gate read at runtime`; `it bypasses the Google sign-in wall, synthesises a fake user, and injects 8 deterministic fixture meals`; `no env-var switch; .env / apphosting env carry only VITE_FIREBASE_* and VITE_HOUSEHOLD_ID` |
| Seed data / blocks writes / auth isolated | True / False / True |
| Stack | React 19 + Vite 7 (JSX, no TypeScript), Tailwind CSS 4 + PostCSS, Firebase 12 (Auth Google provider, Firestore, Storage), lucide-react icons, boneyard-js (generated skeleton loaders), node --test unit tests (9 test files under src/lib) |
| Build | `npm run build (vite build); npm test (node --test src/lib/*.test.js); npm run test:rules (firestore emulator)` |
| Deployed | True — https://chefs-journal-1b491.web.app (implied by .firebaserc / authDomain; no URL is written down anywhere in the repo) (firebase-hosting (dist) + firestore/storage rules, with a parallel App Hosting config) |
| Git | `main` @ 2026-08-21 · 0 uncommitted · 1 unpushed |
| Screenshots in repo | `public/skeleton-loader.png`, `public/icon.png`, `public/icon-192.png` |

This is the most finished and best-tested app in the batch (9 unit test files plus emulator-run Firestore rules tests, strict field-level validation rules, PWA, versioned releases) and it already has the exact machinery a portfolio demo needs — a URL mode gate, an auth bypass, and inline fixtures — just aimed at skeleton capture instead of at showing the product. Repointing that same gate at a seeded demo dataset and stubbing writes is a small, well-defined change, which makes this the best embed candidate here; ship it against demo fixtures, never against the live household project.

<details><summary>Demo-mode evidence</summary>

- `src/App.jsx:264 (const isSnapshotMode = new URLSearchParams(window.location.search).get("snapshot") === "true";)`
- `src/App.jsx:267 (effectiveUser = isSnapshotMode ? { email: "demo@example.com", displayName: "Demo User" } : user)`
- `src/App.jsx:284-301 (effectiveMeals = 8 generated fixtures: 'Sample Dish', 3/3/3/3 ratings, garlic/olive oil/chicken thighs ingredients, fixed pros/cons)`
- `src/App.jsx:793 (if (!user && !isSnapshotMode) return <SignInView .../> — the gate that snapshot mode skips)`
- `src/App.jsx:263,266 (comment 'Force skeleton loading state during boneyard snapshot capture'; effectiveMealsLoading = isSnapshotMode ? true : mealsLoading)`
- `firestore.rules:5-27 (isAuthenticated() + isHouseholdMember() required for every path — an unauthenticated snapshot session cannot read or write real data)`
- `src/bones/registry.js, src/bones/meal-card.bones.json, src/bones/dashboard-stats.bones.json (boneyard-js skeleton artifacts this mode exists to generate)`

The only repo in this batch with a genuine runtime URL mode gate, deterministic fixtures AND an auth bypass — but it was built to capture skeleton-loader screenshots for boneyard-js, not to demo the product: it deliberately forces the loading/skeleton state on (line 266), so ?snapshot=true shows shimmer placeholders rather than the 8 seeded meals. Nothing explicitly guards writes in this mode; durable writes are stopped only incidentally, by Firestore rules rejecting the unauthenticated client (so a demo user clicking save would see an error, not a no-op). Upgrading this into a proper playbook demo is cheap and mechanical: stop forcing the loading flag, richer fixtures, and short-circuit the write helpers.

</details>

<details><summary>Drift findings</summary>

- FIREBASE WEB CONFIG COMMITTED IN PLAINTEXT: apphosting.yaml and apphosting.production.yaml both hardcode VITE_FIREBASE_API_KEY (<REDACTED_API_KEY>), app id, sender id and bucket, while README instructs keeping these in a gitignored .env. Firebase web API keys are public-by-design (they ship in the client bundle) so this is NOT a credential leak — the real protection is firestore.rules/storage.rules, which are strict here — but it is inconsistent with the repo's own stated handling and should be a conscious choice before the repo is made public.
- NO REAL SECRETS COMMITTED (verified): git ls-files finds only recipe-import/importer/.env.example; the local .env (6 VITE_FIREBASE_* values, same public web config) is gitignored (.gitignore:27) and untracked; service-account*.json and raw PDF scans are explicitly ignored.
- BUILD CACHE IS TRACKED, AND IS THE UNPUSHED WORK: .firebase/hosting.ZGlzdA.cache is committed, so every deploy dirties the tree. The single unpushed commit (07b1a26 'firesbae misc', 2026-08-21) contains nothing but churn in that cache file — a typo'd commit message over a generated artifact.
- TWO COMPETING DEPLOY CONFIGS: firebase.json configures classic Hosting from dist/, while apphosting.yaml + apphosting.production.yaml configure Firebase App Hosting with byte-identical contents. Nothing says which is live, and the duplicate pair serves no purpose.
- NO LIVE URL RECORDED: no web.app/hosted.app URL appears in README, docs/, PRODUCT.md or DESIGN.md, despite a deployed hosting cache. README says 'your production domain (when applicable)'.
- FIVE UNMERGED BRANCHES: local feat/shopping-home-frequent-items, feature/recipe-lifecycle-prd, fix/issue-12-disable-pull-refresh plus remote claude/dining-courses-workflow-y60wjy and claude/ingredient-logging-extraction-njpk8u — parked work streams around the documented-but-unshipped recipe lifecycle PRD.
- MANUAL MEMBERSHIP PROVISIONING: README documents that each user needs a hand-created Firestore member document at artifacts/default-app-id/households/shared-household/members/<uid>. There is no self-serve onboarding, so a stranger signing in with Google gets an authenticated session with zero access — worth knowing before linking it publicly.
- THIN IMPORT DATASET vs BIG PIPELINE DOC: recipe-import/ has a full README, PRD reference, importer, backfill and enrichment scripts, but recipes.import.json holds only 3 recipes OCR'd from Chef's Plate meal-kit cards. Note the _note field records the source scan filename; the recipes are transcribed third-party meal-kit content, which argues against surfacing that data publicly.
- PERSONAL/SHARED-HOUSEHOLD DATA: the production Firestore holds a real two-person household's meal history and photos. Nothing personal is committed, but any public demo must point away from chefs-journal-1b491.

</details>

### `FamilyPlan`

> **⚠ Action needed:** public Pages build serves real household income (verified)

**A client-side React/Recharts dashboard over a JSON-assembled economics engine that projects household income, childcare and housing costs, and affordability/buffer headroom across a multi-decade family timeline.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Seed data / blocks writes / auth isolated | True / True / False |
| Stack | React 18, Vite 5, Tailwind 3, Recharts 2, Zod 4, Vitest 4 |
| Build | `npm run build  (plus `npm run build:data` to regenerate data/output/generated_familyplan.json)` |
| Deployed | True — https://benwassa.github.io/FamilyPlan/ (github-pages-docs-folder) |
| Git | `main` @ 2026-03-17 · 0 uncommitted · 0 unpushed |

Technically the strongest embed candidate here — a fully static, no-auth, no-backend React dashboard already building to /docs and already live on Pages. But it should only be embedded after swapping the data import to mock_familyplan.json (or a fresh scrubbed fixture), because as shipped it publishes the owner's real household income and net worth.

<details><summary>Demo-mode evidence</summary>

- `dashboard/src/App.jsx:27`
- `dashboard/src/views/DashboardProfessional.jsx:4`
- `data/output/mock_familyplan.json`
- `data/README.md:39`
- `exports/math-economics-flat10/App.jsx:27`

No mode gate of any kind: no URL param, no env var, no resolver. A fixture DOES exist (data/output/mock_familyplan.json, 1.6KB) and an older export (exports/math-economics-flat10/App.jsx:27) imports it as `mockData`, but the ACTIVE dashboard hard-imports data/output/generated_familyplan.json at build time (App.jsx:27, DashboardProfessional.jsx:4) and data/README.md:39 explicitly demotes the mock to 'legacy reference only ... should not be treated as the active dashboard source'. blocks_writes is true only incidentally — the app has no persistence at all, it is a pure read-only client-side calculator over one baked-in JSON. Swapping the import to the mock is a one-line change, so a real demo mode is cheap.

</details>

<details><summary>Drift findings</summary>

- PRIVACY: the deployed GitHub Pages build embeds the owner's own household financial plan — generated_familyplan.json carries grossIncome <REDACTED> netIncome <REDACTED> monthlyBurn <REDACTED> liquidAssets <REDACTED> child birth years, province ON — and data/source/income_history.json carries year-by-year real income. This is already public at benwassa.github.io/FamilyPlan.
- README and data/README both still document mock_familyplan.json as a data/output 'contract' while data/README.md:39 calls it dead legacy; the file is referenced by no live code.
- docs/ build output is committed and is only as fresh as the last manual `npm run build` — no CI enforces it (docs/ and source last touched the same commit today, so currently in sync, but nothing keeps it that way).
- Only icon PNGs in repo — no screenshots or preview imagery for a portfolio card.
- exports/ and _archive/ hold three near-duplicate forks of the dashboard (math-economics-flat10, math-economics-review-2026-02-20, ClaudeDashboard.tsx, GeminiDashboard.jsx), so 'which App.jsx is real' is ambiguous from a cold read.

</details>

### `faust`

**A deployed long-form digital essay and self-diagnostic that argues extreme career ambition in expensive cities is a 'rational maladaptation', walking through seven chapters (system, cities, machines, casualties, exits, resources) with source-backed economic comparisons for Toronto/Vancouver/London/NYC and five standalone archetype pages.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / True |
| Stack | Vite 7, vanilla JS SPA with hash routing, Tailwind CSS 3, PostCSS, Vitest (configured, unused), ESLint/Prettier |
| Build | `npm run build` |
| Deployed | True — https://benwassa.github.io/faust/ (github-pages (docs/ folder, committed build output)) |
| Git | `main` @ 2026-02-06 · 1 uncommitted · 0 unpushed |
| Screenshots in repo | `faust/public/infographics/architecture-of-ambition-beyond-workism.png`, `faust/public/infographics/architecture-of-ambition-identity-fragility-vs-resilience.png`, `faust/public/infographics/digital-panopticon-career-anxiety-problem-solution.png` |

Fully static, zero user data, already live at benwassa.github.io/faust/ — it embeds in an iframe with no work at all, and it is the most visually finished artefact of the six. Resolve the uncommitted README rewrite before linking, since the working-tree version exposes internal portfolio-triage notes.

<details><summary>Demo-mode evidence</summary>

- `src/cities/index.js`
- `src/views/`
- `vite.config.js`

No demo affordance and none needed. A grep across src/, scripts/ and vite.config.js for localStorage, sessionStorage, fetch(, isDemo, demoMode, mode=, seed, mock and sample returns zero hits — the site has no user data, no persistence, no network calls and no auth. Every view is an editorial HTML string and the city comparison data is authored research content in src/cities/index.js, not sample data. There is therefore nothing to gate: the deployed site already is the full public experience. Classified 'none' strictly (no mode resolver, no fixtures, no write guard exists to cite), not as a defect.

</details>

<details><summary>Drift findings</summary>

- README.md is modified and uncommitted (78 insertions / 76 deletions): the working tree has replaced the public-facing 'Project Faust — The Architecture of Ambition' README with an internal audit/INDEX format containing portfolio-triage sections ('Overlap / merge candidates', 'Cluster Role', speculative comparisons to psyche/dukkha/Orpheus/Janus/Ares). Committing this as-is would publish internal curation notes as the repo's front page.
- That same working-tree README self-documents unfinished work: 'Sprint 6 (Final Polish) incomplete', open city source verifications in documentation/CITIES_FIGURE_SOURCE_TRACKER.md, and 'The Machines'/'The Practice' lacking content depth.
- Vitest + @vitest/coverage-v8 + jsdom are installed devDependencies but there is no test script in package.json and no test files.
- README references public/unnamed.png as a 'stale asset'; that file is not present in public/ — the note is itself stale.
- Three overlapping dead-content directories at root: archive/ (COMMISSION.md, PROJECT_STATUS.md, archived_sprints].md — note the stray bracket in the filename), backup/archetypes/, and documentation/ alongside a separate docs/ build output. The docs/ vs documentation/ split is easy to confuse.
- docs/ build output is committed and currently in sync with src (both last touched by the same 2026-02-06 commit), but nothing enforces that.

</details>

### `flag`

**A mobile-first offline-capable PWA that teaches world geography across four domains - flags, country locations, country outlines and land-border neighbours - navigated through an interactive 3D Earth where the learner picks a continent or region and then starts a Learn (familiarisation) or Play (scored retrieval) session, with per-region mastery tracked locally and optionally backed up to Firestore.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Vite 8, React 19, TypeScript 5.8 (strict, multi-project), vite-plugin-pwa, Firebase Auth + Firestore (optional cloud sync), d3-geo / topojson / maplibre-gl (map asset generation) |
| Build | `npm run build  (full gate: npm test, which chains check + unit + firebase rules + build + ~40 verify:* scripts)` |
| Deployed | True — https://BenWassa.github.io/flag/ (Pages) and the atlas-3c48a Firebase Hosting site (github-pages (primary) + firebase-hosting (secondary)) |
| Git | `main` @ 2026-09-12 · 0 uncommitted · 0 unpushed |

Anonymous first-load already shows the complete product with real content and no login, `base: './'` means it runs under any path, and it is the most rigorously tested and recently worked repo in the set - it is embeddable as-is with no demo-mode work at all. It needs a stated URL and at least one screenshot before it can be carded.

<details><summary>Demo-mode evidence</summary>

- `src/react/useAuth.ts:31`
- `src/infrastructure/firebase.ts:29`
- `src/infrastructure/cloud-sync-service.ts:1`
- `src/main.tsx:16`

No demo/template/preview affordance exists and none is needed. Atlas is a content-driven learning app: all 195 flags, country outlines, location and neighbour data ship as static assets, and progress is local-first in `flag-atlas:*` localStorage namespaces. Sign-in (Google, via src/infrastructure/firebase.ts:29) is entirely optional and exists only for cloud backup/sync - main.tsx:16 explicitly comments that the Firebase module is not imported on the critical path and a Firebase failure must never prevent Atlas from starting. A first-time anonymous visitor gets the full product immediately, which is functionally what a demo mode would provide. There is no seeded/fake state and no write-blocking, hence the honest classification is 'none'.

</details>

<details><summary>Drift findings</summary>

- Extreme branch sprawl against the repo's own stated policy: ~40 remote branches (issue-*, spike/*, claude/*, docs/*, noop, noop-2, archive/*) and 7 local ones, while README says old feature/spike/agent branches 'are not project history and should be deleted once their useful work is merged, superseded or captured'.
- One local branch has real unmerged work: issue-212-broad-suite-reconciliation is 2 commits ahead of main; the other six local branches are 0 ahead (fully merged, safe to delete).
- Untracked heavy directories sit in the working tree: dist-spike-maplibre, .pwa-runtime-builds, .verify-dist, spike-evidence-maplibre, test-results, graphify-out, experiments, research.
- No screenshot or preview imagery in the repo at all - only PWA app icons under public/icons/. For the most polished project here, that is the biggest portfolio gap.
- README describes two live hosts (Pages primary, Firebase secondary) but never states either URL, so there is no canonical link to put on a portfolio card.
- Firebase web config (apiKey, authDomain atlas-3c48a.firebaseapp.com, storageBucket) is hardcoded in src/infrastructure/firebase.ts:14-22 rather than read from env, unlike every other Firebase project in this batch. Not a secret leak (web config is public by design) but it is inconsistent and pins the build to one project.

</details>

### `HAUS`

> **⚠ Action needed:** demo mode fully built but workflow never sets VITE_DEMO — never deployed

**A mobile-first shared household task manager where a home joins by 6-character code and tasks are ranked by an urgency x importance x resource-fit matrix so a household can see what is actually doable in the time and people available right now.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`playbook`** |
| Triggers | `VITE_DEMO=true (env gate, build-time only)`; `.env.demo committed with VITE_DEMO=true`; `npm run dev:demo -> vite --mode demo --port 5174` |
| Seed data / blocks writes / auth isolated | True / True / True |
| Stack | React 18, Vite 8, Tailwind CSS 3, Firebase (Auth/Firestore/Storage/Hosting), @dnd-kit, Vitest |
| Build | `npm run build (runs scripts/validate-firebase-env.mjs then vite build)` |
| Deployed | True — https://haus-4cfd8.web.app (firebase-hosting) |
| Git | `main` @ 2026-08-08 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `public/HAUS.png`, `public/HAUS_noBG.png`, `archive/HAUS_v1.png` |

HAUS already has the best demo implementation in this batch — a real mode gate that swaps the whole data layer, 870 lines of deterministic seed store, fake user, and a reset control. The only work needed to embed it is building with VITE_DEMO=true and deploying that to a second Firebase Hosting channel or Pages path (and ideally adding a ?mode=demo URL trigger).

<details><summary>Demo-mode evidence</summary>

- `App.jsx:27`
- `App.jsx:150`
- `App.jsx:151`
- `App.jsx:183`
- `App.jsx:230`
- `App.jsx:231`
- `App.jsx:232`
- `App.jsx:261`
- `App.jsx:448`
- `src/demo/demoStore.js:19`

Real mode gate: IS_DEMO swaps the entire data layer (App.jsx:230-232 picks demoStore over useHomeData/firebaseActions), so no Firestore write path is reachable in demo. Seeds are deterministic with stable IDs (DEMO_HOME_ID 'demo-home', DEMO_CONDO_HOME_ID 'demo-condo', DEMO_MEMBER_ID 'demo-alex', two sample homes 'Maple Street House' and 'Juniper Loft' with members, rooms, tasks, subtasks, phases and session state). Auth is isolated: authState is forced to 'signed-in' with a fake demoUser and the Firebase auth listener is skipped (App.jsx:183). Settings exposes an explicit 'Reset demo data' control (Settings.jsx:826-847) and the admin WhitelistManager is hidden in demo. Two gaps vs the hearth_v2 playbook: (1) no URL trigger (no ?mode=demo / ?demo=1 / URLSearchParams anywhere in the codebase), so demo cannot be reached on a hosted production build; (2) demo mutations persist to localStorage keys hk_demo_state_v2_* rather than being in-memory/ephemeral, so reset is a button rather than a refresh.

</details>

<details><summary>Drift findings</summary>

- Demo mode is fully built but never deployed: .github/workflows/deploy.yml passes only production VITE_FIREBASE_* secrets and never sets VITE_DEMO, so the live Firebase Hosting site is auth-gated only. Demo exists solely as a localhost target (port 5174).
- No URL trigger for demo mode; grep for URLSearchParams/location.search across src returns nothing. Embedding requires a second build/deploy target rather than a query string.
- Five root-level SWIPE_DELETE_*.md documents (SPEC, SUMMARY, IMPLEMENTATION, QUICK_REFERENCE, VISUAL_WALKTHROUGH) for a single feature — doc sprawl at repo root alongside AGENTS.md, CLAUDE.md, DESIGN.md, DESIGN.json, PRODUCT.md.
- Four stale remote branches from agent runs: origin/claude/add-user-whitelist-Cda1U, origin/claude/fix-uid-whitelist-loading-DEafN, origin/copilot/fix-firebase-deploy-issue, origin/copilot/update-codebase-for-release.
- firebase-adminsdk.json and .env sit in the working tree; both are gitignored (.gitignore:21, .gitignore:9) and untracked, so not leaked, but a service-account key living in the repo root is a hazard.
- Access is whitelist-gated by UID in src/data/whitelist.js plus an APP_ADMIN_UID check in App.jsx:448, so the public URL shows nothing to a visitor.

</details>

### `Hermes`

**An overnight Python pipeline that pulls Toronto weather, Guardian/NYT/Perigon world news, Toronto RSS and a registry of followed writers, has Gemini dedupe/section/rank/summarize them in one call, renders the result into a static newspaper page, commits it to GitHub Pages at 05:17 local time, and pushes an ntfy.sh notification linking to it.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `no runtime mode switch; the published artifact is a static page with no user data`; `python -m src.render __main__ block renders the site from a committed fixture edition` |
| Seed data / blocks writes / auth isolated | True / False / False |
| Stack | Python 3.11, requests, feedparser, google-genai (Gemini 2.5 Flash), jinja2, python-dotenv |
| Build | `python -m src.build  (offline preview: python -m src.render)` |
| Deployed | True — https://BenWassa.github.io/Hermes/ (github-pages (main /docs, published by a scheduled Actions cron, not by pages-build)) |
| Git | `main` @ 2026-09-11 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `archive/v1-hermes/assets/Hermes_vector.png`, `archive/v1-hermes/assets/hermes_pixel.png`, `archive/v1-hermes/assets/hermes_icon.png` |

The live GitHub Pages edition is already a public, zero-auth, self-updating artifact with no personal data, so it can be iframed directly with no demo-mode work at all — and it is the rare portfolio piece that is provably alive, rebuilding itself every morning. The only preparation needed is capturing a screenshot, since the repo has none of the v2 UI.

<details><summary>Demo-mode evidence</summary>

- `src/render.py:61`
- `src/images.py:30`
- `src/curate.py:299`
- `src/curate.py:320`
- `data/fixtures/edition_sample.json`
- `template/index.template.html`

Demo mode is arguably moot here: Hermes is an unauthenticated static-site generator. The published GitHub Pages page (docs/index.html) contains only public news content, so there is nothing personal to hide behind a demo gate. What does exist is a deterministic seed: data/fixtures/edition_sample.json (a full 15KB June-2026 edition) plus a __main__ preview path in src/render.py:61 that renders the real template from it with no API keys. That is a genuine offline preview build but not a mode gate, so: partial. There is no ?mode=demo, no VITE_/env demo flag, and no write guard (nothing durable is written client-side).

</details>

<details><summary>Drift findings</summary>

- The only in-repo images are v1 archive icons — there is no screenshot of the v2 newspaper UI anywhere in the repo, so a portfolio card has no asset to use without capturing one.
- Local origin/main ref is stale: it shows only 1 commit behind (the 2026-09-12 edition) while the pipeline publishes daily and today is 2026-09-18, so the real remote is ~6 editions ahead. Fetch is not permitted here, so treat 'behind: 1' as a floor, not a count.
- Very heavy branch sprawl: 30 remote branches (sports-34..39, voices-26/29/31, issue-11/13/17/25, several claude/* and copilot/*, plus one explicitly named 'sports-38-broadsheet-rendering-DO-NOT-USE'). Two local feature branches (feature/crucix-integration-v2, feature/the-daily-v2) are also unmerged.
- Root-level documentation sprawl: 15 top-level .md files (SPORTS_V2 x5, VOICES x4, PRD, PRODUCT, DESIGN, BUILD_INSTRUCTIONS, FOLLOWING_INTEGRATION) — several read as completed-sprint notes rather than durable docs.
- A .venv and a graphify-out directory sit in the working tree.
- README documents a Sports V2 surface across 5 separate spec docs; the shipped pipeline diagram in the README does not include a sports stage, so the docs claim more surface than the documented pipeline does.

</details>

### `Iris`

> **⚠ Action needed:** docs/ build hardcoded to localhost:5000 — visitors see a backend error

**A five-slider neurochemical mixer (dopamine, serotonin, oxytocin, cortisol, norepinephrine, each 0-100) that runs the input vector through cosine similarity against a five-emotion reference table and renders the winning emotion as an animated dot moving across a colour-coded Valence-Arousal quadrant map.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `No URL, env or config trigger of any kind exists. The only thing literally labelled 'demo' is a UI affordance: five preset emotion buttons that call testEmotionDisplay(emotion) and stamp the confidence readout with the string `Demo Mode: NN%` where NN is Math.random()*20+80.`; `startEmotionDemo() in docs/js/updateEmotionDot.js is an auto-cycling attract loop, exported but never imported or called by any page.` |
| Seed data / blocks writes / auth isolated | True / False / False |
| Stack | Python 3 / Flask REST API (api.py, POST /infer, flask-cors), pandas + numpy + scikit-learn (sklearn.metrics.pairwise.cosine_similarity) for the inference engine, Vanilla HTML/CSS/JS front-end, inline SVG visualisation, ES modules, Google Fonts (Cinzel + Inter), pytest test suite (testing/), CSV as the data store (data/emotion_core_5.csv) |
| Build | `None. No requirements.txt, pyproject.toml, package.json or lockfile exists. README instructs `pip install flask flask-cors pandas numpy scikit-learn` manually, then `python api.py`, then open docs/index.html.` |
| Deployed | False   |
| Git | `main` @ 2025-07-22 · 1 uncommitted · 0 unpushed |

standalone/docs/ is a finished, self-contained, zero-dependency client-side build of the whole idea - it already does the inference in the browser, so it is iframe-ready the moment it has a URL, and the work is repointing GitHub Pages at that folder rather than writing anything. The caveat is that the repo does not know this about itself: the README calls that folder legacy and the Pages-conventional docs/ folder holds the broken backend-dependent copy, so publishing requires a deliberate five-minute decision about which file is canonical - not a revival of the Python half, which can stay dormant.

<details><summary>Demo-mode evidence</summary>

- `docs/index.html:295`
- `docs/index.html:320`
- `docs/index.html:332`
- `docs/index.html:363`
- `docs/index.html:325`
- `docs/js/updateEmotionDot.js:114`
- `standalone/docs/index.html:120`
- `standalone/docs/js/inference.js:1`
- `data/emotion_core_5.csv:1`

Two different front-ends with opposite demo characteristics, and the wrong one is in the Pages-serving folder. docs/index.html hardcodes `const API_URL = 'http://localhost:5000/infer'` (docs/index.html:295) and drives the sliders through fetch(); its catch handler (docs/index.html:332) does NOT fall back to local inference - it writes 'Error' / 'Unable to reach backend. Please start the API server.' into the UI. So the page GitHub Pages would serve is dead on arrival for any visitor without the Flask server running locally. By contrast standalone/docs/index.html is a complete client-side port: it imports inferEmotion from ./js/inference.js (standalone/docs/index.html:120) and that file re-implements the cosine-similarity engine in JS over an inlined emotionData array of the same five profiles (standalone/docs/js/inference.js:1-47), so it runs fully offline with zero backend. The seed data is real and deterministic - the same five emotion/neurochemical profiles appear in data/emotion_core_5.csv, inlined in docs/index.html as emotionCoords + emotionNeurochemistry, and again in standalone/docs/js/inference.js - but there is no mode gate choosing between real and seeded state, and no resolver file. blocks_writes and auth_isolated are recorded false because the app is entirely stateless: no accounts, no persistence, no localStorage, no export/import, nothing durable to guard. Not 'playbook' - it has seeds without a gate, which the spec explicitly calls partial.

</details>

<details><summary>Drift findings</summary>

- The README in the working tree is an uncommitted full rewrite (61 insertions / 219 deletions) that has never been committed or pushed, so the README on GitHub is a different, older document than the one on disk. Same pattern as Ares.
- README calls standalone/ 'Duplicate of docs/ - purpose unclear, likely legacy'. That is wrong and it is the single most consequential error in the repo: standalone/ is not a duplicate, it is the only version that works without a running Flask server, because standalone/docs/js/inference.js re-implements the engine in JavaScript. The README dismisses the one deployable artefact in the repo.
- docs/index.html is the file a GitHub Pages /docs deployment would serve, and it hard-codes http://localhost:5000 with no client-side fallback - it renders 'Unable to reach backend' for every visitor. The directory name docs/ implies publishability that the file's contents contradict.
- README claims '19 tests passing' as current fact; the suite has not been run in this audit (read-only) and dependencies are undeclared, so that number is a 2025-07 assertion, not a verified state.
- The five-emotion profile data is triplicated - data/emotion_core_5.csv, an inline emotionNeurochemistry object in docs/index.html, and the emotionData array in standalone/docs/js/inference.js - with no generation step keeping them in sync.
- data/emotion_chem_profiles.csv (the extended emotion set) is committed but wired to nothing; README's own 'Next Step' is to connect it, and that step was never taken.
- Compiled Python bytecode is committed to git: __pycache__/api.cpython-313.pyc, __pycache__/engine.cpython-313.pyc and four files under testing/__pycache__/ are all tracked (git ls-files). There is no .gitignore in the repo at all.
- docs/test.html is a committed zero-byte file, added by the most recent commit (3392be3, 'chore: Add initial test.html file for documentation purposes'). The last thing that happened to this repo was committing an empty file.
- docs/backup/index_backup.html and docs/backup/styles_backup.css are committed snapshots living inside the would-be publish directory, and docs/emotion-explorer-quadrants.html is a 718-line third parallel copy of the same UI. Three-plus versions of one page, no indication which is canonical.
- Stale remote branch origin/codex/create-standalone-version-for-project-iris sits 1 commit ahead of main (2025-07-21) and was never deleted after merge.
- Dormant 423 days (HEAD 2025-07-22, today 2026-09-18) - the oldest repo in this batch of six.

</details>

### `jarvis-core`

> **⚠ Action needed:** hosting root has no index.html — deploy publishes a blank site

**A 'digital butler' control plane where a typed natural-language command is classified into a fixed intent taxonomy by Gemini, then run through a deterministic policy engine that decides whether to clarify, propose options, request explicit approval, or reject — with every step written to Firestore as append-only audit logs and no action ever executed by the model.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `MOCK_ENABLED — a hardcoded module-level boolean in frontend/src/api.js, currently false`; `no URL trigger (mode=demo / demo=1 / ?preview), no env var, no runtime resolver; flipping the demo requires editing source` |
| Seed data / blocks writes / auth isolated | True / True / False |
| Stack | Vanilla JS PWA frontend (no framework), Vite 7 dev server, Firebase Cloud Functions (TypeScript) + Firestore, @google/generative-ai (Gemini) for intent classification only, zod, Prettier + ESLint 9 + Husky + lint-staged + standard-version, GitHub Actions CI |
| Build | `npm run dev (concurrently: firebase emulators:start + vite); frontend: npm run build (vite build); backend: npm --prefix backend/functions run build (tsc)` |
| Deployed | True — https://jarvis-core-467f7.web.app (implied by .firebaserc; never stated in the repo and almost certainly serving nothing) (firebase-hosting + cloud-functions + firestore (MISCONFIGURED — see drift)) |
| Git | `main` @ 2026-02-04 · 1 uncommitted · 0 unpushed |

The architecture story (AI interprets intent, a deterministic policy engine owns authority, everything is audited, nothing executes without explicit approval) is genuinely the most portfolio-legible idea in this batch, and the complete mock layer means a convincing click-through of the clarify/propose/approve flow is one edited constant plus a corrected hosting root away — with no backend, no keys and no data. Embed it explicitly as an interaction prototype; do not present it as a working calendar assistant, because the calendar layer is unimplemented and the current deploy config would ship a blank page.

<details><summary>Demo-mode evidence</summary>

- `frontend/src/api.js:4 (const MOCK_ENABLED = false;)`
- `frontend/src/api.js:11-62 (MOCK_RESPONSES: full deterministic clarification / proposal / approval payloads — three calendar options, three proposed times incl. one with a stated conflict, and a complete approval summary)`
- `frontend/src/api.js:66-77 (getMockResponse routes on keywords in the typed command: 'clarify' -> clarification, 'schedule'/'meeting'/'propose' -> proposal, else approval)`
- `frontend/src/api.js:87-89,141-143,166-168,191-196 (every one of the four API methods short-circuits on MOCK_ENABLED before any fetch, so the mock path performs zero network and zero durable writes)`
- `frontend/src/auth.js:1-2 (entire file is two comment lines — there is no auth at all, so no demo/real user distinction exists)`
- `firestore.rules:5-19 (allow read, write: if false everywhere; no client can write regardless of mode)`

This is the cheapest demo retrofit in the batch and the only repo already carrying a mock/real switch. The mock layer is complete, deterministic, keyword-driven and covers the whole UI flow, but the switch is a compile-time constant set to false with no gate, and the real path points at a localhost emulator, so today the deployed UI works in neither mode. Changing line 4 to true (or reading it from a URL/env flag) yields a fully working, backend-free, self-contained demo of the entire command -> clarify -> propose -> approve flow.

</details>

<details><summary>Drift findings</summary>

- HOSTING ROOT IS EMPTY OF HTML: firebase.json sets hosting.public = "frontend/public", but that directory contains only manifest.json and service-worker.js — no index.html. The SPA rewrite sends every request to /index.html, which does not exist there. The real entrypoint is frontend/index.html (a Vite entry referencing /src/styles.css and ES modules) and no vite build output is wired into hosting. A `firebase deploy --only hosting` as documented in frontend/DEPLOYMENT.md would publish a blank site.
- FRONTEND POINTS AT LOCALHOST: frontend/src/api.js:5 hardcodes API_BASE_URL = 'http://127.0.0.1:5001/jarvis-core-467f7/us-central1' — the Firebase functions emulator. With MOCK_ENABLED=false, any deployed copy of the UI calls the developer's own machine and fails.
- README CONTRADICTS CONFIG: README.md:23 says 'Frontend: PWA (GitHub Pages)'; the repo is configured for Firebase Hosting (firebase.json) with no Pages workflow. README.md:27 says 'Auth: Firebase Auth (passkeys / biometrics)'; frontend/src/auth.js is two comment lines and implements nothing, and docs/PROJECT_STATE.md admits the backend uses a temporary hardcoded 'admin_v1' user id.
- DOC/CODE MISMATCH ON MOCKING: docs/PROJECT_STATE.md states 'The frontend PWA renders ... using mocked API responses' and lists 'Frontend API wiring to the Firebase backend (currently mocked)' as not-yet-wired, but MOCK_ENABLED was set to false in the last commit — so the shipped state is the opposite of what the status doc describes, and the UI now has no working data source at all.
- THREE OVERLAPPING BACKENDS: (a) backend/functions/*.ts at the top level (approvals/, audit/, calendar/ with createEvent/proposeTimes/readCalendar, classifyIntent.ts, policyEngine.ts), (b) backend/functions/src/*.ts — a second, differently-organised copy of index/classifyIntent/policyEngine/audit plus commandHandler and clarificationHandler, and (c) a top-level functions/ directory that is untouched `firebase init functions` boilerplate (node 24, firebase-functions ^7) while firebase.json deploys backend/functions (node 18, firebase-functions ^4). It is not evident from the tree which copy is live.
- FEATURES DOCUMENTED BUT NOT WIRED: PROJECT_STATE.md itself lists calendar integration, time inference, the Gemini summarisation prompt, auth, and the execution layer as unwired — i.e. the calendar-first product promised by README and the docs/ set performs no calendar read or write.
- SINGLE-DAY PROJECT, THEN STOPPED: all 8 commits land on 2026-02-04 and nothing has happened since (~7 months stale at audit time). One branch only, clean, pushed.
- TRACKED JUNK: .DS_Store is committed AND is the sole uncommitted modification in the tree; firestore-debug.log sits in the working directory.
- NO SECRETS COMMITTED (verified): git ls-files finds no .env, key, credential or service-account file; README's 'No production credentials committed' claim holds.

</details>

### `JobQuestOS`

**A single-page PWA that renders a fixed 9-to-5 job-search day as timed blocks with per-block guardrails and a local weekly momentum counter (focus blocks, outreach touches, artifacts), so the search is executed as a schedule rather than improvised.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Seed data / blocks writes / auth isolated | True / False / True |
| Stack | Vite 6, vanilla JS (ES modules), Tailwind CSS 3, PostCSS, PWA (manifest.json + public/sw.js), ESLint/Prettier |
| Build | `npm run build` |
| Deployed | True — https://benwassa.github.io/JobQuestOS/ (github-pages (docs/ folder, committed build output)) |
| Git | `main` @ 2026-01-12 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `JobQuestOS/infographic.png`, `JobQuestOS/docs/assets/infographic-BvHMT8Ys.png` |

Self-contained static PWA with hardcoded content, no login and no server — it renders correctly in an iframe with zero setup and is already deployed at benwassa.github.io/JobQuestOS/. The only work needed is pointing the portfolio card at that URL and, ideally, fixing the README so the project reads as a shipped app.

<details><summary>Demo-mode evidence</summary>

- `src/app.js:18`
- `src/app.js:187`
- `src/app.js:210`
- `public/version.json:1`

No mode gate of any kind: grep for mode=demo, mode=template, demo=1, ?preview, isDemo, demoMode, *_DEMO and VITE_*_MODE across src/, scripts/, public/, index.html and *.md returns nothing, and there is no .env.example. It scores 'partial' only because the app is inherently demo-shaped: the entire day schedule is a hardcoded literal array (src/app.js:18 onward, with title/desc/timer/guardrail per block), there is no backend and no auth, and the only persisted state is a per-browser weekly counter in localStorage under key 'jobquest_weekly_stats' (read src/app.js:187, written src/app.js:210). A first-time visitor therefore sees full realistic content with zero setup, but nothing blocks writes and there is no way to reset to a curated state.

</details>

<details><summary>Drift findings</summary>

- README is pure manifesto — it documents the daily structure and philosophy but never mentions that the repo is a working web app, never gives the live GitHub Pages URL, and never lists the build commands.
- package.json 'homepage' points at the GitHub README (https://github.com/BenWassa/JobQuestOS#readme), not the deployed Pages URL, so the repo's own metadata hides the demo.
- package.json declares "main": "sw.js" and "type": "commonjs" for what is an ESM Vite app — vestigial/incorrect metadata.
- "test": "echo \"Error: no test specified\" && exit 1" — no tests at all.
- Duplicated app source: scripts/app.js is an older copy of src/app.js (same localStorage logic at scripts/app.js:109/132 vs src/app.js:187/210) with no build referencing it; archive/ holds four superseded standalone HTML versions (JobQuest-OS.html, JobQuestOS_v2.html, backup.html, test.html), and 'new UX.md' is an untracked-looking spec file at repo root.
- docs/ build output is committed and currently in sync with src (both last touched by 9494fa3, 2026-01-12), but there is no CI to keep it that way — a future src edit without a rebuild silently ships stale.

</details>

### `layer-up`

> **⚠ Action needed:** VITE_FIREBASE_ENABLED case mismatch — cloud sync never worked in prod

**A mobile PWA that pulls live local weather, asks what you are about to do and for how long, recommends a specific six-slot outfit (base, mid, outer, bottom, accessories, footwear), then learns from how cold or hot you actually felt - logged comfort ratings feed per-activity temperature offsets that shift future recommendations through four escalating personalisation phases.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `In-app UI button only: Settings -> 'Test or reset' -> 'Load 25 Demo Logs' (src/views/SettingsView.jsx:120-122), wired to onLoadDemoLogs in src/App.jsx:296-298.`; `Env mode gate exists but is NOT a demo gate: VITE_FIREBASE_ENABLED (src/firebase.js:5) switches cloud sync on/off, not real-vs-seeded content.`; `No URL trigger of any kind - no ?demo, ?mode=demo, ?preview, no hash parameter, no route.` |
| Seed data / blocks writes / auth isolated | True / False / True |
| Stack | React 18 + Vite 5, plain CSS (src/styles.css), no UI framework, no router (tab state in useState), Firebase 10 - Anonymous Auth + Firestore (optional sync), Firebase Hosting, Installable PWA: public/manifest.webmanifest + a hand-written service worker (public/sw.js, cache 'layerup-v1'), Live data with no API key required: Open-Meteo forecast API (App.jsx:134), ipapi.co for IP geolocation with browser geolocation preferred (App.jsx:91-97), ESLint 9 flat config + Prettier 3 |
| Build | `npm install && npm run build (vite build); deploy with npm run deploy or npm run release:beta` |
| Deployed | True — https://layer-up-d17b0.web.app (and https://layer-up-d17b0.firebaseapp.com) (firebase hosting + firestore (manual CLI deploy, no CI)) |
| Git | `main` @ 2026-04-03 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `public/LayerUp.png (1.5 MB app icon, not a screenshot - no UI captures exist in the repo)` |

This is the most genuinely embeddable application of the six: a deployed, installable PWA that already works for an anonymous stranger with no login and no API key - it geolocates by IP, pulls live Open-Meteo weather, and ships a 25-log demo-history generator plus real empty states. Two cheap changes make it iframe-ready: promote the existing 'Load 25 Demo Logs' button to a URL trigger (?demo=1) so a portfolio embed lands pre-populated and the personalisation phases are actually visible, and seed it deterministically into a session-scoped store instead of appending into the user's real log array. Separately and independently of the portfolio decision, the VITE_FIREBASE_ENABLED=TRUE casing bug is worth fixing or the whole Firebase layer worth deleting - right now the repo carries a full sync architecture, a Firestore ruleset and a Firebase dependency that the shipped bundle proves are inert.

<details><summary>Demo-mode evidence</summary>

- `src/constants.js:150`
- `src/constants.js:168`
- `src/constants.js:175`
- `src/constants.js:176`
- `src/App.jsx:296`
- `src/views/SettingsView.jsx:120`
- `src/storage.js:62`
- `src/firebase.js:5`
- `src/firebase.js:57`
- `src/firebase.js:73`

The best demo affordance in this batch of six, and still short of playbook on three counts. What exists: generateDemoLogs(count = 25) at src/constants.js:150 fabricates a plausible 25-day history - temperature, feels-like, humidity, wind, precipitation, UV, weather code, activity, duration, comfort rating - and runs each synthetic day through the real phase1Recommend() so the outfits are internally consistent with the app's own logic. It is reachable from a labelled button in Settings. What is missing: (1) NOT DETERMINISTIC - every field is Math.random() (constants.js:168-186) and ids are `demo-${i}-${Date.now()}` (constants.js:175), so no two loads produce the same dataset and nothing is reproducible; location is hardcoded 'Toronto, ON' regardless of the user's real geolocation. (2) NO WRITE GUARD - App.jsx:297 is `setLogs((prev) => [...prev, ...generateDemoLogs(25)])`, which APPENDS demo rows into the same array as genuine logs and then persists them through the normal saveAppState path (storage.js:62) into localStorage and, when sync is on, into the user's Firestore document. Demo data is indistinguishable from real data afterwards except by the 'demo-' id prefix, which nothing filters on; the only way back is the destructive 'Clear All Logs'. (3) NO MODE GATE - it is a manual button buried in Settings, not addressable by URL or env, so an iframe or a shared link cannot land anyone in a populated state. auth_isolated is recorded true but deserves a caveat: the app never asks anyone to sign in, uses signInAnonymously (firebase.js:73) with per-uid document scoping and correct matching Firestore rules (firestore.rules:5), so every visitor is already isolated - but that is the app's general architecture, not a demo-specific accommodation.

</details>

<details><summary>Drift findings</summary>

- PRODUCTION BUG, highest-value finding: .env contains `VITE_FIREBASE_ENABLED=TRUE` (uppercase - verified byte-for-byte with od), but src/firebase.js:5 tests `import.meta.env.VITE_FIREBASE_ENABLED === 'true'`, a strict case-sensitive comparison against lowercase. 'TRUE' !== 'true', so isEnabled is a compile-time constant false and Vite dead-code-eliminates the entire Firebase path. Confirmed in the shipped bundle: dist/assets/index-EjIGMZyr.js contains zero occurrences of the project id 'layer-up-d17b0', zero of 'firebaseapp', and zero of 'signInAnonymously'. The live app is localStorage-only. Cloud sync, anonymous auth and the Firestore document have never worked in production, and they fail silently because every guarded function early-returns null rather than throwing. .env.example correctly shows lowercase `false`, so the typo was introduced by hand when the real .env was created.
- Corroborating that the symptom was noticed but misdiagnosed: the remote branch origin/claude/force-firebase-redeploy-aNBFY is 1 commit ahead of main and its single commit is 'chore: update package-lock.json after npm install'. The branch name says someone was trying to force a redeploy to make Firebase work; the actual cause was one character of casing in an untracked file, so redeploying could never have fixed it.
- app.jsx at the repo root is a 1,863-line single-file version of the whole application - the pre-refactor monolith - still tracked and still being touched as recently as 2026-04-02 ('Add lint and prettier tooling'). It duplicates all of src/ (2,375 lines across 18 modules) with no marker of which is authoritative. Vite builds from index.html -> src/main.jsx, so app.jsx is dead code that lint and format still process.
- 1,777 lines of markdown across 7 root-level documents (DOCUMENTATION_INDEX, IMPLEMENTATION_CHECKLIST, MOBILE_BEST_PRACTICES, MOBILE_UI_VISUAL_GUIDE, MOBILE_UPGRADE_README, MOBILE_UPGRADE_SUMMARY, README) - six of them about a single mobile-UI upgrade - against 2,375 lines of application source. The README itself is 102 lines and its description of the product is the two words 'Weather and clothing'.
- public/LayerUp.png is 1.5 MB and is both the PWA icon and a service-worker precache entry (sw.js urlsToCache), so every first visit downloads 1.5 MB before the app is usable - on the mobile-first PWA whose repo contains 344 lines of MOBILE_BEST_PRACTICES.md.
- The service worker is hand-rolled with a hardcoded cache name 'layerup-v1' that is never bumped, and it precaches '/' and '/index.html' while firebase.json sets no-cache headers on index.html - the two caching strategies work against each other, and a returning user can be served a stale shell indefinitely.
- Demo logs are written into the same store as real logs with no separation (see demo_mode notes) - loading them is a one-way action reversible only by deleting everything.
- Version drift: package.json says 1.1.0-beta.0 and the Settings footer renders '{appVersion} · Beta'; the app has been sitting at a beta version tag for 168 days with no release since.
- Both merged feature branches were left undeleted - ui/impeccable-refresh exists locally AND remotely at 0 commits ahead of main; origin/claude/force-firebase-redeploy-aNBFY is the stale 1-commit branch above.
- src/.DS_Store is tracked despite .gitignore listing .DS_Store (it predates the rule).
- .gitignore excludes .agents/, .claude/, .impeccable.md and skills-lock.json, all of which exist on disk - agent tooling state that is local-only, so a fresh clone behaves differently from this working copy.
- Idle 168 days (HEAD 2026-04-03, today 2026-09-18). Working tree is completely clean and nothing is unpushed.

</details>

### `LothbrookLore`

**A rules framework and browser-based session tracker for running a long-form, LLM-narrated Viking-era roleplay campaign where the stakes are social standing, obligation and delayed consequence rather than combat stats - shipping with a full canon bible, relationship web, episode/season structure rules, and one completed 12-episode season of finished narrative prose.**

| | |
|---|---|
| Recommendation | **`demo`** (medium confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Single-file vanilla HTML/CSS/JS app (playthrough_tracker.html, 2,023 lines, zero dependencies, no build), localStorage as the entire persistence layer, Markdown as the content format (canon bible, engine rules, episode scripts, state templates), One Python 3 utility (split_episodes.py, stdlib only: re + pathlib) |
| Build | `None. No package.json, no build step, no dependencies - open playthrough_tracker.html directly, or serve the repo root so fetch('VERSION') and the starter-pack ZIP resolve.` |
| Deployed | False   |
| Git | `main` @ 2026-01-01 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `sessions/season_00/Raw and Notes/readometer-stats.png` |

Honest read: the tool is abandoned but the work is not - Season 0 is genuinely finished-and-unpublished, a complete 12-episode narrative with reviews and an integrity report, and the tracker around it is real single-file craft (export to JSON/Markdown/clipboard, a transcript splitter with preview-and-confirm, keyboard shortcuts, ARIA labels, debounced autosave) rather than a scaffold. It qualifies as `demo` under the spec's 'could cheaply get demo mode' clause and only under that clause: the single blocking fact is that loadData() cold-starts empty, so embedding it today shows an empty shell with zeroes on every counter. The cheap fix is a default-state object seeded from the 12 Season 0 episodes that already exist in the repo, applied when localStorage is empty - do not attempt the 9-14 hour storage refactor in SYSTEM_REVIEW.md, which is a different and much larger job, and note that publishing the repo also publishes that unflattering bug list.

<details><summary>Demo-mode evidence</summary>

- `playthrough_tracker.html:1980`
- `playthrough_tracker.html:1984`
- `playthrough_tracker.html:1987`
- `playthrough_tracker.html:1999`
- `playthrough_tracker.html:1403`
- `playthrough_tracker.html:1696`
- `playthrough_tracker.html:1357`

This is the repo in the batch where a demo mode would matter most, and it has none. playthrough_tracker.html is a real single-file app with 49 localStorage call sites and genuine durable state (episodes, episodeMeta, sessionNotes, stateSnapshot, providedFiles, currentSeason, tasks). Its cold start is completely blank: loadData() at :1980 reads every key with an empty fallback - `localStorage.getItem('stateSnapshot') || ''` (:1984), `|| ''` for notes (:1987), `JSON.parse(... || '[]')` for episodes and tasks (:1999) - so a first-time visitor, or anyone loading it in an iframe, sees an empty shell with zero episodes and a '0' on every counter. There is no seeds file, no fixture, no mode gate, no ?demo trigger, no env var, and no bundled default state anywhere in the file. Writes are never blocked - autoSave() (:1403) fires on a 1000ms debounce straight into localStorage, and Ctrl/Cmd+S saves everything. There is no auth at all, so nothing to isolate. The irony worth recording: the repo already contains an ideal deterministic seed - 12 finished Season 0 episodes, 5,759 lines - and the tracker cannot read any of it. Its only contact with repo files is fetch('VERSION') for a version badge (:1696) and a static href to downloads/season_00_starter_pack.zip (:1357).

</details>

<details><summary>Drift findings</summary>

- SYSTEM_REVIEW.md is a 400-line self-audit that confirms six user-reported bugs plus more, calls the app 'functionally complete but architecturally misaligned', and lays out a costed 5-phase, 9-14 hour fix roadmap. It was committed 2025-12-31. playthrough_tracker.html's last commit is 2025-12-30 - the day BEFORE. Not one line of that roadmap was ever implemented; the repo went silent two days later. Every bug the document confirms is still live in the shipped file.
- SYSTEM_REVIEW.md is dated 'December 30, 2024' in its header and footer, but its own commit and every commit it describes are December 2025 - the date is wrong by a full year.
- The confirmed, still-unfixed bugs are user-visible: episodes are stored in one global array with no seasonId, so switching to Season 1 still displays Season 0's episodes and the 'Total Episodes Logged' counter sums across seasons; session notes are a single blob despite an episode-selector dropdown implying per-episode scoping, so switching episodes silently loses notes; saveState() never updates lastStateUpdate, making the 'Since Last State Update' metric false; and the per-episode 'State updated' checkbox is, in the review's own word, 'decorative'.
- README says 'Early-stage framework. Structure-first. Content-light by design.' That is flatly untrue of the repo as it stands: Season 0 is finished - 12 episodes totalling 5,759 lines of narrative prose, each with its own review document, plus an edit log and an integrity report. The README describes the project as it was conceived, not as it is, and undersells the one genuinely complete thing in it.
- README documents the rules framework and says nothing whatsoever about playthrough_tracker.html - the 2,023-line application that is the repo's only executable artefact and its only candidate for a portfolio embed.
- Content is duplicated between the live tree and a committed snapshot: season_00_starter_pack/ holds copies of canon/CANON_BIBLE.md, canon/RELATIONSHIP_WEB.md, engine/EPISODE_SPINE.md, engine/SEASON_SPINE.md, engine/SESSION_SETUP.md, state/STATE_TEMPLATE.md and state/characters/bersi_kodransson.md that also exist at the repo root, and downloads/season_00_starter_pack.zip is a third frozen copy built 2025-12-30. Three versions of the same canon with no sync mechanism.
- Season 1 is scaffolded and abandoned: 9 episode scaffolds (1,015 lines) plus initial_state.md and a raw chat log exist, but no episodes were played or written. The final commit - 'Add children (Koðrán and Sigrid) to initial_state.md' - is a Season 1 setup edit, so the repo stopped mid-preparation for a season that never started.
- sessions/season_01/REFONLY_session_01.md and 'Rollo chat.md' are loose working files sitting in the session directory with no explanation in any README.
- No .gitignore at all, so .DS_Store is committed at the repo root, in sessions/ and in sessions/season_01/.
- Version drift: VERSION reads 1.0.1 and SYSTEM_REVIEW recommends bumping to 2.0.0 after the storage refactor; no bump ever happened because no refactor ever happened.
- Dormant 260 days (HEAD 2026-01-01, today 2026-09-18).

</details>

### `macht`

**An offline-first PWA powerlifting tracker that logs sets with weight/reps/RPE, computes estimated 1RM via the Brzycki formula, runs rest timers and plate math, and substitutes exercises around recorded injuries - all persisted to localStorage with no account.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`playbook`** |
| Triggers | `Vite mode gate: import.meta.env.MODE === 'demo'`; `Env gate: VITE_DEMO_MODE === 'true'`; `npm scripts: dev:demo (vite --mode demo), build:demo (vite build --mode demo)` |
| Seed data / blocks writes / auth isolated | True / True / True |
| Stack | Vite 6, React 18, TypeScript 5.6, Tailwind CSS 4, Zustand 5, framer-motion |
| Build | `npm run build  (demo build: npm run build:demo)` |
| Deployed | True — https://BenWassa.github.io/macht/ (github-pages) |
| Git | `main` @ 2026-06-19 · 0 uncommitted · 0 unpushed |

It already has a build-time demo mode with deterministic seed data, storage-key isolation and a reset banner, and it is a self-contained local-storage PWA with no auth or backend - the single best iframe candidate in this batch. The only work is pointing a deploy (or a second Pages path) at `npm run build:demo`.

<details><summary>Demo-mode evidence</summary>

- `src/lib/demoMode.ts:10`
- `src/lib/demoMode.ts:11`
- `src/lib/demoMode.ts:13`
- `src/data/demoData.ts:140`
- `src/state/useHistoryStore.ts:41`
- `src/state/useHistoryStore.ts:70`
- `src/components/DemoModeBanner.tsx:5`
- `src/components/DemoModeBanner.tsx:7`
- `package.json:9`
- `package.json:11`

The cleanest demo implementation of the six. A single resolver (src/lib/demoMode.ts) derives IS_DEMO_MODE from the Vite mode or VITE_DEMO_MODE, and demoStorageKey() suffixes every persisted zustand store key with '_demo' (macht_history, macht_injuries, macht_settings, macht_custom_exercises, macht_ui, macht_workout). Durable writes are therefore namespace-isolated rather than blocked: a demo session can never overwrite a real user's localStorage. DEMO_HISTORY in src/data/demoData.ts is deterministic (built from fixed weight/rep/RPE tuples through brzyckiE1rm), and DemoModeBanner renders a visible 'Demo mode' banner with a Reset button that clears only the _demo keys. There is no auth in the app at all (local-storage only), so auth isolation is trivially satisfied. The one gap vs the hearth playbook is that there is no URL trigger (?mode=demo) - the mode is fixed at build time.

</details>

<details><summary>Drift findings</summary>

- Deployed build is NOT the demo build: .github/workflows/deploy.yml:31 runs `npm run build`, so the live GitHub Pages beta uses the production storage keys, not the demo ones. build:demo exists but nothing ever runs it in CI.
- Production default state is not empty: src/state/useHistoryStore.ts:41 falls back to MOCK_HISTORY when not in demo mode, so a first-time beta tester opening the live site sees fabricated workout history rather than an empty log.
- Hardcoded personal medical data ships to every user: src/data/mockData.ts:3 INITIAL_INJURIES seeds a specific 'Left anteroinferior labral tear' profile with forbidden/caution movement tags. This is the owner's own injury, shipped as the default for all users.
- README markets the GitHub Pages URL as a 'Beta' for external testers but never mentions demo mode; the demo affordance is undocumented.
- Three stale local branches (barbell-measure-scale-backup, claude/fix-open-issues, impeccable/ux-critique-fixes) plus an unmerged remote branch claude/workout-progress-strength-metrics-h69lu3.
- No screenshots or preview imagery anywhere in the repo - only PWA icons and two logo files in public/.

</details>

### `marvel`

**An interactive cartographic atlas of Marvel screen continuities that lays every film and series out as parallel universe tracks — Spider, legacy mutant, MCU and more — with curated viewing routes, release-order context and a per-browser watched-state overlay.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Seed data / blocks writes / auth isolated | True / False / True |
| Stack | React 19, Vite 8, TypeScript 7 (preview), Tailwind CSS 4 (@tailwindcss/vite), motion 12, lucide-react |
| Build | `npm run build  (vite build); checks: npm run lint (tsc --noEmit) && npm test` |
| Deployed | True — https://benwassa.github.io/marvel/ (github-pages) |
| Git | `main` @ 2026-09-17 · 4 uncommitted · 3 unpushed |
| Screenshots in repo | `public/favicon.svg` |

A finished, self-contained, zero-backend static app already wired to GitHub Pages — it is embeddable in an iframe today with no demo-mode work at all. The only real cost is writing a README and pushing the three local commits.

<details><summary>Demo-mode evidence</summary>

- `src/data.ts:1-938 — INITIAL_TIMELINE_NODES and UNIVERSE_TRACKS: the entire catalogue is a hardcoded, deterministic TypeScript constant`
- `src/App.tsx:2 — `import { INITIAL_TIMELINE_NODES } from './data'``
- `src/App.tsx:15-16 — only persistence is localStorage keys `chronometric_loom_nodes_v2` and `marvel_screen_atlas_route_v1``
- `src/App.tsx:30 — `// Fall through to the seeded catalogue.` on corrupt storage`
- `src/App.tsx:53-60 — writes go to localStorage inside try/catch; comment: "Progress remains in memory when storage is unavailable"`
- `grep for genai|GEMINI|API_KEY across src/ returns zero hits — no backend call is ever made`

There is no demo *mode* — there is no non-demo mode to switch away from. The app is 100% static seeded content with per-browser localStorage for watch state, no auth, no network, no server. That makes it trivially embeddable but it is `partial` by the spec's letter: seed data with no mode gate and no write guard (none is needed, since no write is durable beyond the viewer's own browser). Every visitor to an iframe would get a clean seeded atlas.

</details>

<details><summary>Drift findings</summary>

- NO README AT ALL. The repo's only prose is metadata.json and the index.html meta description. For a portfolio card this is the single biggest gap — a visitor arriving from GitHub sees bare source.
- 3 unpushed commits on main (a7a62e0 vite watcher symlink, 2e3843f ignore graphify artifacts, 3b16714 vite dev setup) — the deployed Pages build is behind local work.
- 4 uncommitted paths: modified .gitignore plus untracked DESIGN.json, DESIGN.md, PRODUCT.md — the design/product docs exist locally and have never been committed.
- .env.example documents GEMINI_API_KEY and APP_URL as required, but nothing in src/ reads either; @google/genai, express and dotenv are declared dependencies with zero imports. Leftover Google AI Studio scaffolding — the app needs no key at all.
- package.json still named "react-example" at version 0.0.0; `clean` script removes a server.js that does not exist.
- package-lock.json is present but the Pages workflow uses `npm install`, not `npm ci`, with commit a69b6a8 titled "Fix Pages dependency install for lockfile-free repo" — the workflow and the lockfile disagree about whether this repo has one.
- Vite 8 / TypeScript 7 / @vitejs/plugin-react 6 are unusually forward versions; CI pins Node 22 — build reproducibility depends on those prereleases staying available.

</details>

### `NightShift`

**A Firebase-backed 'nocturnal ledger' (ALMANAC) that tracks many long-running personal projects by season/sprint/burst cadence with milestone checklists and a next-action per project — living inside a larger repo that specifies an overnight autonomous-agent routine and its parked read-only Control Centre.**

| | |
|---|---|
| Recommendation | **`demo`** (medium confidence) |
| Demo mode | **`partial`** |
| Triggers | `VITE_FB_API_KEY / VITE_FB_PROJECT_ID presence check (a config gate, not a demo gate)` |
| Seed data / blocks writes / auth isolated | True / False / True |
| Stack | React 19, Vite 7, TypeScript 5.6, Zustand 5, Firebase 12 (Auth + Firestore), lucide-react |
| Build | `npm run build  (root delegates to `npm run build --prefix almanac` = tsc --noEmit && vite build)` |
| Deployed | True  (firebase-hosting (declared, not provisioned)) |
| Git | `main` @ 2026-08-09 · 0 uncommitted · 0 unpushed |

The shipped app is login-walled and not deployed, so it is not embeddable as-is — but almanac/almanac.jsx is already a complete, self-contained, in-memory, seeded version of the exact same UI with a frozen date, which makes a genuine demo build a near-zero-cost wiring change rather than new work. Recommend demo contingent on pointing main.tsx at the prototype; downgrade to link if that rewiring is not done.

<details><summary>Demo-mode evidence</summary>

- `almanac/src/seed.ts:1`
- `almanac/src/seed.ts:20`
- `almanac/src/App.tsx:9`
- `almanac/src/App.tsx:44`
- `almanac/src/App.tsx:50`
- `almanac/almanac.jsx:9`
- `almanac/almanac.jsx:303`
- `almanac/firestore.rules:5`

No demo/preview/template trigger anywhere. What exists instead: (1) almanac/src/seed.ts — ~14 real hand-written starter projects imported once into Firestore via writeBatch, surfaced as an 'Import starter projects' button on an empty ledger; not deterministic (crypto.randomUUID per milestone) and it WRITES to the live database. (2) almanac/almanac.jsx — a 676-line self-contained prototype of the whole UI with in-memory state, the same seeded projects, and a hardcoded 'today' of 2026-07-07 (line 303); it is kept 'for reference' and is not wired into main.tsx. (3) App.tsx:9 gates on Firebase env vars and shows a 'No Firebase config' screen — a setup gate, not a demo mode. Real use is hard-gated behind Google sign-in (App.tsx:50) with per-uid Firestore rules (firestore.rules:5), so auth is isolated but there is no anonymous or demo path.

</details>

<details><summary>Drift findings</summary>

- Local main is 3 commits BEHIND origin/main, including 'Add scheduled inventory refresh, an assignment CLI, CI, and a vision doc' — which is why the local clone has no .github/ directory while the remote has CI. (Remote refs may themselves be stale; no fetch was run.)
- Two stale remote agent branches: origin/claude/autonomous-coding-work-backend-qhg614 and origin/claude/open-issues-ui-fixes-415vl3.
- Identity split: the top of README.md still describes Night Shift as an overnight agent + Control Centre; a status note mid-README says the actual app is now ALMANAC and the whole Control Centre stack is parked in archive/. The README's folder map and the repo's name point at two different products.
- archive/apps/web/.next build output (a whole committed Next.js SSR chunk tree) is still in the tree, inflating the repo and confusing any stack detection.
- hub/inventory.json is dated 2026-06-11 while HEAD is 2026-08-09 — the 'source of truth for portfolio state' is two months stale.
- almanac/README.md 'Where this stands (2026-07-07)' lists four manual Firebase-console steps that have never been done, so the app cannot boot for anyone who clones it.

</details>

### `orpheus`

**A local-first Python pipeline that ingests a Spotify Extended Streaming History export, scores each track across 8 emotions and 8 themes with local transformer models, separates a 3-day 'state' window from a 90-day 'trait' window using engagement-weighted exponential decay, and renders the result in a React dashboard written as a narrative letter about yourself rather than an analytics grid.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Seed data / blocks writes / auth isolated | True / False / False |
| Stack | Python 3.11, Click CLI, SQLite, transformers (BART-large-mnli), sentence-transformers, scikit-learn (DBSCAN/GMM) |
| Build | `npm --prefix frontend run build  (tsc --noEmit && vite build); Python: pip install -e ".[dev]"` |
| Deployed | True — https://benwassa.github.io/orpheus/ (implied; serving stale v1 content) (github-pages (gh-pages branch, via peaceiris/actions-gh-pages) - BROKEN) |
| Git | `main` @ 2026-05-31 · 1 uncommitted · 0 unpushed |
| Screenshots in repo | `archive/v1/05_output/visualizations/listening_timeline.png`, `archive/v1/05_output/visualizations/monthly_heatmap.png`, `archive/v1/05_output/visualizations/top_artists.png` |

Directly answering the question posed: YES, orpheus is genuinely close to shippable, and the gap is smaller than the README suggests. The React dashboard is finished work - 12 components, a completed narrative-layout UI pass (every box in UI_UPGRADE_TODO.md is checked), and a complete typed sample report already sitting in the repo. The single blocker is that sampleReport.ts was never wired in and the report API exists only as Vite dev-server middleware, so a static build shows an empty state. Wiring the fixture in as the fallback when /api/profiles is unavailable or empty is roughly a ten-line change in frontend/src/app/App.tsx, needs no backend, exposes zero personal data, and yields a fully static embeddable dashboard. The competing signal is that the Python pipeline behind it is only 13% scored, so the demo must be honestly framed as a sample report - which the fixture's own metadata.note already does.

<details><summary>Demo-mode evidence</summary>

- `frontend/src/data/sampleReport.ts:3`
- `frontend/src/app/App.tsx:21`
- `frontend/src/services/reportService.ts:5`
- `frontend/src/services/reportService.ts:11`
- `frontend/vite.config.ts:1`
- `frontend/src/screens/dashboard/lib/exportReport.ts:4`

A complete, deterministic 290-line fixture exists at frontend/src/data/sampleReport.ts (a fully-typed OrpheusReport with state/trait emotion+theme distributions, clusters, trends, evidence tracks) but it is imported NOWHERE - `grep -rn sampleReport frontend/src` returns only its own declaration. There is no mode gate of any kind: no ?demo/?mode param, no VITE_* env flag, no .env.example. App.tsx unconditionally calls loadProfiles() -> fetch('/api/profiles') on mount and falls back to an empty profile-selection screen with the message 'Could not load profiles. Run the local server and try again.' (frontend/src/app/App.tsx:29). Critically, /api/profiles and /api/reports/latest are implemented ONLY as Vite dev/preview-server middleware inside frontend/vite.config.ts (configureServer/configurePreviewServer), reading the local filesystem at data/output/reports. A static `vite build` therefore ships no API at all, so a deployed build renders the empty state forever. No auth exists anywhere in the app. The only write path is exportReport.ts, a client-side Blob download - no durable writes to guard.

</details>

<details><summary>Drift findings</summary>

- README 'What's missing' claims: "Frontend frontend/src/ files are not visible in the repo root (likely in node_modules or untracked)". FALSE - all 25 files under frontend/src are tracked (git ls-files frontend/src).
- README claims "config.yaml contains real API credentials (Spotify client secret, Genius token) - should not be in version control". Misleading - config.yaml is listed in .gitignore:96 and is NOT tracked; only config.yaml.template is committed. The stated risk is already mitigated.
- deploy_docs.yml is a v1-era workflow pointing at 01_setup/ and 04_data/, paths that now live under archive/v1/. The Pages job has been failing on every push to main since the v2 restructure.
- origin/gh-pages publishes the v1 static report site while the repo's actual product is the v2 React dashboard - anyone who finds the Pages URL sees dead work.
- Local main is 2 commits behind origin/main (eb90a2d 'Merge PR #10 ... repo-assessment-consolidate', a04100d 'Consolidate status docs; add narrative, temporal, and experimental report layers'). Ref may be stale - no fetch performed.
- frontend/dist/ is present on disk (260K, built) but untracked and gitignored - a stale local build artifact.
- Large personal data in the working tree: my_spotify_data.zip (2.2MB), 'Spotify Extended Streaming History/', data/output/reports/Ben/*.json (~60-75KB each), data/cache/*.db. All correctly untracked/gitignored, but they are the reason the app cannot simply be deployed with real data.
- README states scoring coverage is ~13% (17 plays in the state window against a 4,243-track catalog), so the real reports it can generate are statistically unreliable - an argument for demoing the fixture rather than real output.
- Repo root is littered with tooling residue: 8 .graphify_*.json files, graphify-out/, .venv/, .pytest_cache/, .ruff_cache/, orpheus.egg-info/, frontend_upgrade_handoff/, archive/v1/ - noisy for a portfolio visitor.

</details>

### `pantheon`

> **⚠ Action needed:** dayAdvance pins every visitor to Day 1 — embed shows one day forever

**A once-a-day reading app that presents a single theme as six hidden tiles — Person, Picture, Poem, Principle, Passage, Parallel — each revealing a short sourced piece chosen to rhyme with the others, with the next day unlocking only at local midnight.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `none — no ?mode=demo, no demo env var, no mode resolver. Grep for mode=demo|demoMode|isDemo|demo=1|VITE_*_DEMO across src/ and scripts/ returns zero product hits (the only 'seed' matches are unrelated form-seeding in the Studio UI).` |
| Seed data / blocks writes / auth isolated | True / True / True |
| Stack | React 18, Vite 5, TypeScript 5.6 (strict, tsc --noEmit in build), Tailwind CSS 3, Zustand 4 (state), vite-plugin-pwa |
| Build | `npm run build (build-manifest + validate, then tsc --noEmit && vite build); GITHUB_PAGES=true for the Pages base path` |
| Deployed | True — https://benwassa.github.io/pantheon/ (GitHub Pages via Actions (actions/upload-pages-artifact from dist/)) |
| Git | `claude/mobile-studio-game-ui-o8db8r` @ 2026-06-23 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `content/images/placeholder.svg — the ONLY image in the content library`, `public/pwa-512.png, public/pwa-192.png, public/apple-touch-icon.png, public/favicon.svg (icons only)` |

It is already a local-first, backend-free, fully-seeded static app that deploys to Pages and needs no login — the cheapest genuine embed in this batch, and the most distinctive concept. The one blocker is the by-design daily unlock, which pins every visitor to Day 1 of 7; a small showcase gate (free navigation across published days under ?mode=demo) plus some real Picture-facet imagery would make it a strong live iframe.

<details><summary>Demo-mode evidence</summary>

- `README.md:19-21 — 'Local-first: no backend, no accounts. Content ships as portable JSON, lazy-loaded one day at a time.'`
- `content/days/001-hubris.json … 007-repair.json — 7 fully authored days of real content ship in the repo and into dist/content/days`
- `src/store/persistence.ts:36-53 — the only durable state is a localStorage blob (current day, per-day open record, per-facet read state); there is no network write path`
- `package.json dependencies — react, react-dom, zustand only. No Firebase, no auth SDK, no API client.`
- `src/store/dayAdvance.ts:30-51 — advanceSequence(): first-ever use unlocks Day 1 only; a new calendar day advances by exactly one; index is clamped to the highest published day`
- `src/store/useAppStore.ts:52-93 — currentDayIndex is read from persisted state; there is no setDay/goToDay override exposed`

Pantheon does not need a demo mode in the usual sense — there is no user data to hide and no account to create, so the shipped content IS the demo. That satisfies the seed/no-durable-write/no-auth parts of the playbook by construction. It falls short of 'playbook' for one reason that matters a lot for an embed: there is no mode gate and no day override, and src/store/dayAdvance.ts hard-limits a first-time visitor to Day 1 of the 7 published days, with no way to browse further without returning tomorrow (or hand-editing localStorage). A portfolio iframe would therefore show exactly one day's six tiles, forever, to every visitor. A tiny 'showcase' gate (e.g. ?mode=demo letting the reader page freely across published days) would flip this to playbook with minimal work.

</details>

<details><summary>Drift findings</summary>

- Working tree is checked out on claude/mobile-studio-game-ui-o8db8r (HEAD 2026-06-23), three commits behind origin/main (2026-07-02). Any local inspection or build here is not what Pages deploys.
- README describes 'tiles with sourced images use them as backgrounds' and the whole Picture facet, but content/images contains exactly one file: placeholder.svg. The app's most visual feature currently has no assets.
- Only 7 days of content exist for an app whose core premise is an indefinite daily sequence — a returning reader is 'caught up' (clamped) after one week.
- mobile-studio.html is a rollup input (vite.config.ts:117) and ships in dist/, so the private editorial review layer is built and published to the public Pages site. studio.html is correctly excluded, which makes the mobile one look like an oversight rather than a decision.
- dist/content/studio-manifest.json is generated into the deployed output — internal review metadata on a public URL. (content/judgments.jsonl itself is NOT shipped, so the exposure is limited to the manifest.)
- Six stale remote feature branches (five claude/*, plus feat/pwa and studio-review-flow-upgrade) with no cleanup.
- dist/ is committed to the repo while CI builds its own artifact from source — two sources of truth for the deployed output.
- Repo root is cluttered with tooling debris (.graphify_*.json x6, graphify-out/) and five loose planning markdown files (prd-1.md, data-model.md, editorial-charter.md, studio.md, PRODUCT.md).

</details>

### `poseidon`

**A mobile-first PWA dive journal that records each recreational dive (site, depth, conditions, memory note), lets the diver pick the creatures they saw from an illustrated marine catalogue, and accumulates those encounters into a personal creature collection and a geographic Atlas of places dived.**

| | |
|---|---|
| Recommendation | **`demo`** (medium confidence) |
| Demo mode | **`partial`** |
| Triggers | `URL trigger: ?mock=0|3|5|15|30 and ?mock=off|real`; `localStorage trigger: poseidon.dev.selection`; `In-app dev badge picker (bottom-right) that sets the selection and reloads`; `Hard gate: import.meta.env.DEV` |
| Seed data / blocks writes / auth isolated | True / True / True |
| Stack | npm workspaces monorepo (packages/domain + apps/web), React + Vite, strict TypeScript, Tailwind CSS v4, React Router (HashRouter), Firebase Auth + Firestore |
| Build | `npm run build  (full gate: npm run gate)` |
| Deployed | True — https://benwassa.github.io/poseidon/ (github-pages + firebase-hosting) |
| Git | `main` @ 2026-09-18 · 1 uncommitted · 2 unpushed |
| Screenshots in repo | `docs/evidence/01-home.jpg`, `docs/evidence/02-journal.jpg`, `docs/evidence/03-dive-detail.jpg` |

The demo machinery already exists and is production-quality (in-memory client, five deterministic seed presets, acceptance test, docs); the only blocker is the deliberate import.meta.env.DEV fence, which a build-flag swap (e.g. VITE_POSEIDON_DEMO) plus a demo Pages build would lift in a handful of lines. Visually it is the strongest portfolio piece here and it already ships 15 evidence screenshots for the card.

<details><summary>Demo-mode evidence</summary>

- `apps/web/src/main.tsx:22`
- `apps/web/src/main.tsx:33`
- `apps/web/src/main.tsx:39`
- `apps/web/src/dev/mode.ts:9`
- `apps/web/src/dev/selection.ts:14`
- `apps/web/src/dev/selection.ts:35`
- `apps/web/src/dev/selection.ts:51`
- `apps/web/src/dev/mock-data.ts:40`
- `apps/web/src/dev/mock-data.ts:359`
- `apps/web/src/dev/mock-data.ts:401`

Mechanically this is the most sophisticated demo system in the batch - deterministic MOCK_DIVE_SEQUENCE seeds at five preset sizes (0/3/5/15/30 dives), an in-memory MemoryPersistence client so nothing durable is ever written, no Firebase initialisation at all, resolution order query-param -> stored choice -> real app, an in-app switcher badge, its own acceptance script (npm run test:mock) and a dedicated doc. It is classified 'partial' rather than 'playbook' for one reason: the whole thing is fenced behind an inline `if (import.meta.env.DEV)` in main.tsx:22, written that way deliberately so Vite's build-time replacement makes the mock branch unreachable and tree-shakeable. The shipped production bundle contains no mock path, so `?mock=15` on the live site does nothing. Production always falls through to AuthProvider + AuthGate, which requires a Google sign-in AND a manually 'approved' status before any UI renders.

</details>

<details><summary>Drift findings</summary>

- The live site cannot be demonstrated: production strips the mock branch (main.tsx:22) and AuthGate requires an approved Google account, so anyone opening https://benwassa.github.io/poseidon/ sees only a sign-in / pending-approval screen.
- 2 unpushed commits on main, including a release commit (106bbeb 'release: v0.1.2') and a feature commit (0a491b7 'feat(web): add source art review surface'). The tagged/published release state is behind the local one.
- 1 uncommitted modification: apps/web/src/dev/DevAssetReview.tsx.
- Very heavy branch sprawl: ~45 remote branches (art batches, issue branches, docs branches, release-please) plus 3 stale local ones. README explicitly says old branches 'should be deleted once their useful work is merged' - they have not been.
- Two deploy targets configured (GitHub Pages and Firebase Hosting for poseidon-e1e34) but only the Pages one is wired to CI; the Firebase target implies a second live URL with no automation behind it.
- A 2026-09-07 creature-source-library zip is committed at the repo root (poseidon-creature-source-library-2026-09-07.zip) - a build artefact in version control.
- A .venv directory exists in the working tree.

</details>

### `Project-Loki`

**A single-page React diagnostic that takes a task you are stuck on, narrows your symptoms to one of seven Pirsig-derived 'gumption traps' (Egotism, Anxiety, Impatience, Boredom, Fog, Intermittent Failure, Reassembly Failure) through calibration questions, then runs you through a timed four-step intervention playbook and logs the session to localStorage with a dashboard and JSON export.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | React 18, Vite 7, React Router 6, Tailwind 3, framer-motion 8, lucide-react |
| Build | `npm run build  (vite build -> docs/)` |
| Deployed | True — https://BenWassa.github.io/Project-Loki/ (github-pages (Actions: build then upload-pages-artifact from ./docs)) |
| Git | `feature/analyzer-ui-refresh` @ 2026-02-02 · 1 uncommitted · 0 unpushed |

It is a self-contained, auth-free, backend-free React SPA already building to GitHub Pages under the correct base path — the cheapest genuine iframe embed in this batch, requiring no demo mode at all. The real work before embedding is git hygiene, not code: merge feature/analyzer-ui-refresh to main so the deployed site matches the restructured app, and commit the rewritten README.

<details><summary>Demo-mode evidence</summary>

- `src/features/analyzer/utils/storage.js:1`
- `src/features/analyzer/utils/storage.js:16`
- `package.json (no firebase/auth dependency)`

Nothing matching mode=demo, isDemo, demoMode, *_DEMO, VITE_*_MODE, resolveMode, or any fixtures/mock/seed directory exists anywhere in src/. Level is honestly 'none'. But the level understates embeddability: the app has no auth, no backend and no network calls. All state is a single localStorage key, loki_sessions_v1 (src/features/analyzer/utils/storage.js:1), written by saveSession at :16. There is no real user data to protect and no seeded content to show — a visitor starts empty and creates their own session by walking the 8-step flow, which is exactly the thing worth demonstrating. Adding seeded sessions so the Dashboard is not empty on arrival would be the only cheap improvement.

</details>

<details><summary>Drift findings</summary>

- HEAD is on feature/analyzer-ui-refresh, not main, and the two have genuinely diverged: 9 commits on the feature branch are absent from main (including 'Modularize analyzer screens', 'Fix analyzer export and trim UI', and Sprints 1-4 restructuring) while 6 commits on main are absent from the feature branch. CI deploys only from main, so the live GitHub Pages site is NOT the code in this working tree — it predates the entire features-based restructure.
- README.md has 148 deleted / 60 added uncommitted lines: the working copy replaces the old vision-led 'Project Loki is a mission to help individuals reclaim agency' README with a factual INDEX-style one. The rewrite is the accurate document and it is unstaged.
- The uncommitted README asserts 'deployed to GitHub Pages via CI' — true of main, but not of the branch being edited.
- docs/ build output is committed to git (docs/assets/index-COdr8OVM.css, docs/assets/index-iRJc3_EN.js) while pages.yml also rebuilds it in CI, so the tracked bundle is a stale duplicate of whatever CI last produced.
- project-loki-nutshell.zip is committed at the repo root. The README itself flags it as 'unknown archive, likely a snapshot; not referenced by the app'.
- README admits the larger 'Loki OS' vision (philosophy/tools/metrics site) is documented but unbuilt, and that src/pages/home.jsx exists as a stub for it; infrastructure/analyzer_schema_v3.sql is a frozen Postgres schema wired to nothing.
- No screenshot or preview image exists anywhere in the repo.

</details>

### `psyche`

> **⚠ Action needed:** firebase.json serves public/ not dist/ — live site is not the app

**A psychology-literacy PWA that renders roughly 28 theories across six domains in visual grammars matched to each theory's actual structure — a Big Five hierarchy, an attachment plane, a bias catalogue — with inspector panels that tier every claim by evidence quality from cornerstone to popular-but-revised.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / True |
| Stack | React 19, Vite 6, TypeScript 5.8, Tailwind CSS 4 (@tailwindcss/vite), vite-plugin-pwa 0.21 + workbox, Firebase Hosting |
| Build | `npm run build  (vite build -> dist/); only quality gate is npm run lint (tsc --noEmit)` |
| Deployed | True — https://psyche-555.web.app (firebase-hosting) |
| Git | `main` @ 2026-05-03 · 2 uncommitted · 0 unpushed |
| Screenshots in repo | `public/ink_in_water.mp4 (16.7 MB background video — the only visual asset in the repo)` |

Static, account-free, network-free content app — inherently safe to embed, and the Personality domain is genuinely finished and visually distinctive. Gated on two fixes: point firebase.json hosting.public at dist/ so the deploy actually ships the app, and commit the good README. If those are not done it drops to `index`, because the live URL currently does not serve the project.

<details><summary>Demo-mode evidence</summary>

- `grep -rniE 'demo|isDemo|demoMode|mode=demo|fixture|seed' over src/ returns zero hits (only unrelated prose matches in content/layers/*.md)`
- `grep -rn 'firebase|firestore' src/ returns zero hits — the app never talks to Firebase`
- `package.json dependencies are only react + react-dom; `firebase` is not a dependency at all (only firebase-tools as a devDependency)`
- `src/data/domains.ts and src/data/inspectorCopy.ts are the content source — authored encyclopedia copy, not demo fixtures`

No demo affordance exists, and none is needed: the app is a read-only static encyclopedia with no accounts, no user data, and no network calls. README states the design ethos explicitly — "no gamification, no accounts, no push notifications." It is demo-safe by nature rather than by a mode gate, so `none` is the honest classification even though embeddability is unaffected.

</details>

<details><summary>Drift findings</summary>

- DEPLOY IS BROKEN BY CONFIG: firebase.json sets hosting.public = "public", but Vite builds the app to dist/. The GitHub Actions deploy therefore publishes the stale standalone public/index.html (4.6 KB, dated May 3) plus a 16.7 MB mp4 — not the React app. The live site at psyche-555.web.app is almost certainly not the app this repo builds.
- firebase.json declares firestore rules + indexes and firestore.rules/firestore.indexes.json are committed, but nothing in src/ imports firebase and `firebase` is not a dependency. Dead backend configuration.
- README (uncommitted version) claims "dist/ — production build artifact; committed to repo"; `git ls-files dist` returns nothing. dist/ exists only on disk. The README asserts a repo state that is not true.
- The substantive 106-line README exists only as an uncommitted working-tree change (+99/-17 over the 24-line committed version). GitHub still shows the old stub README. Also untracked: ideas.md.
- README's own "What's missing" is a long honest defect list: visual grammars 2-12 unbuilt, EvidenceCard renders nowhere, Settings rows (Manage Subscription, Export Library, Sign Out) are visible no-ops, Self & Identity inspector copy thin, no test suite.
- README notes PWA icons are not generated (public/ has no favicon/apple-touch-icon/icon-*.png) while vite.config.ts VitePWA includeAssets lists exactly those files — the manifest references icons that do not exist.
- README flags CLAUDE.md as stale: it describes a single-file app, the codebase has been split into views/domains/components/hooks.
- Oldest active code repo of the four apps — HEAD 2026-05-03, ~4.5 months stale.
- 16.7 MB mp4 committed in public/ and served on every page load.

</details>

### `static`

> **⚠ Action needed:** unpushed 80MB commit; pages.yml uploads path:. (would publish drafts/PDFs)

**A dark, mobile-first, dependency-free web app that turns a researched manuscript on autistic and AuDHD neurology into a drill-down reference - six mechanics chapters, 25 behaviour-to-mechanism flip cards, 5 differential comparisons, 15 worked scenarios, 34 filterable strategies, and two interactive tools (a Capacity Cup and a Sensory Profile radar) - built to ten stated AuDHD-informed interaction principles including a one-tap escape from every depth.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Vanilla HTML/CSS/JS single-page app with a hash router - no framework, no runtime build, no backend, no tracking (index.html 54 lines, app.js 781 lines, styles.css 396 lines), Node 18+ author-time build: tools/build-data.mjs (263 lines, node: builtins only, zero npm dependencies) generates assets/site/data.js, Markdown as the content source (manuscript/chapters/ + research/extraction/), Google Fonts (Barlow Condensed, Source Serif 4, IBM Plex Mono); inline SVG data-URI favicon, Documented design system: DESIGN.md + DESIGN.json + PRINCIPLES.md + PRODUCT.md |
| Build | `node tools/build-data.mjs (regenerates assets/site/data.js; no npm install needed). No runtime build - open index.html or serve the repo root.` |
| Deployed | True — https://benwassa.github.io/static/ (implied; workflow emits the real URL as steps.deployment.outputs.page_url) (github-pages (GitHub Actions workflow)) |
| Git | `main` @ 2026-07-05 · 1 uncommitted · 1 unpushed |
| Screenshots in repo | `ComicBook/image.png`, `ComicBook/Vignette1_Art_Exploration/ (17 PNG art-exploration boards, 2-3 MB each - concept art for a different project, not screenshots of this site)` |

This is the strongest repo of the six and the only one that is genuinely finished-and-unpublished: a real, content-complete, accessibility-hardened SPA with its content pre-baked into a committed 180 KB data.js, zero runtime dependencies, an explicit design system, and a working GitHub Pages workflow already in the tree - it needs no demo mode because it has no real-user mode to hide. Two things must be handled before embedding, and neither is code: decide what to do with the unpushed 80 MB of off-topic comic-book content (it should almost certainly move to its own repo rather than be pushed here), and narrow pages.yml from `path: .` so the deploy publishes the site rather than the research PDFs, manuscript drafts and internal design docs; optionally re-run node tools/build-data.mjs first, though note the recent manuscript edits live outside the build's input tree and will not appear regardless.

<details><summary>Demo-mode evidence</summary>

- `index.html:52`
- `assets/site/data.js:1`
- `assets/site/data.js:2`
- `assets/site/app.js:719`
- `assets/site/app.js:722`
- `tools/build-data.mjs:1`

No mode gate, no ?demo trigger, no env var, no fixtures directory, no mock/seed identifier - but this is the one repo in the batch that genuinely does not need any of it, because it already produces the outcome a demo mode exists to produce. The entire content layer is pre-generated at author time: tools/build-data.mjs parses the manuscript and research markdown into assets/site/data.js, a 180 KB committed file whose first line reads '/* AUTO-GENERATED by tools/build-data.mjs - do not edit by hand. */' and whose second line assigns everything to window.STATIC_DATA. index.html loads it with a plain <script src> before app.js (index.html:52), so there is no runtime fetch, no backend, no API and no network dependency beyond a Google Fonts link. Every visitor sees complete, real content on first paint with no login and no seeding step. The only durable write in the whole app is the Sensory Profile radar persisting an array of axis values to localStorage under the key 'static.profile' (app.js:719 read, app.js:722 write), and both are already wrapped in try/catch with a safe zeroed fallback - a per-viewer convenience, not user data, and nothing that needs blocking. Recorded 'none' by the letter of the spec; the practical read is 'not applicable, and correctly so'.

</details>

<details><summary>Drift findings</summary>

- The unpushed commit is the headline problem. f0fb4f1 'add commic book content' (note the typo) is 1 commit ahead of origin/main and adds roughly 80 MB in one go: a 43 MB ZIP (ComicBook/Vignette1_Art_Exploration.zip) plus 17 PNGs of 2-3 MB each, all committed as raw blobs with no Git LFS. ComicBook/ is now 86 MB of the repo's 222 MB.
- That content does not belong to this project. Static is a guide to autistic neurology; ComicBook/MD_Drafts/ holds 'the-ancestral-dream-thread.md' (685 lines) and 'vignette-09-the-ones-who-followed.md' - narrative comic drafts that read as material for the separate ancestral-dream project. Unrelated work was committed into the wrong repo.
- The two problems above compound with the deploy config: pages.yml uploads `path: .`, i.e. the ENTIRE repository, as the Pages artifact. Publishing today would put the 7 research PDFs, The_Autistic_Operating_System.pdf, the full manuscript drafts, the planning docs, AGENTS.md and the design-system internals on the public web alongside the site; pushing f0fb4f1 first would add 86 MB of unrelated comic art to that payload. Nothing is scoped to a dist/ or docs/ directory.
- The generated content is stale, and worse, the authoring tree has detached from the build. assets/site/data.js was last regenerated in commit 2f05a72 (2026-06-26 05:15 UTC); the next commit c69a78e (2026-06-27 03:09 UTC) added 257 lines to manuscript/part-1-mechanics/04-executive-function.md and 06-capacity-model.md and no rebuild followed. But build-data.mjs does not read part-1-mechanics/ at all - its CHAPTERS table (build-data.mjs:112-117) reads only manuscript/chapters/static-ch1..ch6-*.md, and its other inputs are five files under research/extraction/. So manuscript/part-1-mechanics/ (8 files), manuscript/part-2-patterns/ (5), manuscript/part-3-strategies/ (7) and manuscript/complete-draft.md - 21 files in total - feed nothing. The last substantive writing session wrote into files the site can never display.
- README's Status block is badly out of date: 'Manuscript in progress / Target completion: TBD' and the top-level framing still reads like a book project, while the repo's actual centre of gravity - a finished, deployable, a11y-hardened SPA - is described further down as 'The mobile site'. A reader of the first screen would not know the app exists.
- README ends with 'License: [TBD - likely CC BY-NC-SA or similar]' while a LICENSE file is committed at the repo root. The two disagree and the README was never updated.
- pages.yml triggers on push to BOTH main and the feature branch claude/neurodivergent-mobile-site-r5txou, so a push to that branch would deploy over production. Both that remote branch and harden/interaction-a11y-round1 are now 0 commits ahead of origin/main - fully merged and never deleted; harden/interaction-a11y-round1 also still exists as a local branch.
- assets/static-sprint-0.jsx and assets/static-sprint-1.jsx are 2,541 lines of React prototype committed alongside the shipped vanilla app. There is no React dependency, no package.json and no build that consumes them - dead parallel implementations.
- assets/microsites/ holds six files dated 2026-02-17 that are three documents in duplicate (.html + .md) plus two differently-named HTML variants ('Beyond Behavior...' and 'Beyond Behaviour.html'; 'Clinical Differential Protocol...' and 'Clinical Differential.html'), none linked from index.html or the router - orphaned earlier output that the `path: .` deploy would nonetheless publish.
- The working tree's one uncommitted change is a modified .DS_Store, which is committed to the repo despite .gitignore listing .DS_Store - it was tracked before the ignore rule was added, so the rule has no effect. Four .DS_Store files are tracked (root, ComicBook/, assets/, manuscript/, research/).
- A directory literally named 'original files to rename' holds 7 research PDFs that were never renamed; it is gitignored (0 tracked files), so it is local-only clutter rather than a publishing risk.
- Idle 75 days (HEAD 2026-07-05, today 2026-09-18) - the freshest repo in the batch, and not dormant.

</details>

### `theos`

> **⚠ Action needed:** never deployed; astro.config still holds placeholder site URL

**A static Astro site that seats you inside one world religion at a time — seven authored sections per tradition (origins, beliefs, a day in the life, practice, text, symbols, tensions) with per-tradition palettes, symbols, ambient audio, and a citation gate that refuses to ship unsourced claims.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`none`** |
| Triggers | `none — and none is needed. Grep for demo|mock|sample|fixture across src/ and scripts/ returns zero matches.` |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Astro 5.13 (static output, build.format: 'directory'), TypeScript 5.7 + @astrojs/check, Zod content collections (src/content.config.ts — enforced content contract), Markdown + JSON content, no framework runtime, @fortawesome/free-solid-svg-icons (build-time symbol generation), Node scripts: check-sourcing.mjs (editorial gate), gen-symbols.mjs |
| Build | `npm run build (npm run check:sourcing && astro build → dist/); npm run check:sourcing -- --strict blocks on unreviewed narrative/testimony` |
| Deployed | False — unknown; astro.config.mjs declares the placeholder site 'https://project-theos.example' (none — a dist/ build exists in the working tree but nothing publishes it) |
| Git | `main` @ 2026-07-25 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `docs/infographics/ and dist/infographics/ (generated infographic assets)`, `public/favicon.svg`, `immersive_religions_alpha_v1.tsx (the original React prototype, kept at repo root as a visual reference)` |

Architecturally this is the ideal portfolio embed — a pure static site with no accounts, no backend, real authored prose, and a genuinely distinctive editorial concept — and the writing quality is high. The blocker is purely operational: it has never been deployed, the site URL is a placeholder, and no base path is set, so the first job is a Pages/Netlify workflow, not any demo-mode work.

<details><summary>Demo-mode evidence</summary>

- `astro.config.mjs:2-15 — 'static, zero-runtime-framework output. No React, no client framework.' Only a few KB of progressive-enhancement JS ships.`
- `README.md:6-8 — 'A static, content-first site... No React, no database, no accounts, just Markdown + JSON compiled to plain HTML.'`
- `package.json dependencies — astro only. No auth, no data layer, no client state.`
- `src/content/traditions/{christianity,hinduism,islam}/01-origins.md … 07-tensions.md — 21 authored Markdown sections, 5,848 words total`
- `src/pages/ — three routes: index.astro, [tradition].astro, governance.astro`

The demo-mode question does not apply: this is a pre-rendered static site with no user data, no accounts, and nothing to write. Every visitor sees the full product by default, which is functionally better than a demo mode. Recorded as 'none' rather than 'playbook' because the spec's criteria (mode gate, seeds, write guards) describe machinery this architecture has no use for — do not read 'none' here as a gap.

</details>

<details><summary>Drift findings</summary>

- NOT DEPLOYED. No CI, no host config, and astro.config.mjs still carries the placeholder site URL 'https://project-theos.example'. The README's build instructions work locally but nothing publishes. This is the single biggest gap between the repo's polish and its reach.
- No base path set, so dropping it onto GitHub Pages at /theos/ will break asset URLs — it needs either a custom domain or base:'/theos/' before a Pages deploy will work.
- Content is 3 of an implied larger set of traditions (christianity, hinduism, islam only), and every one of the 21 sections is still unreviewed: 12 are review_status:draft and 9 are needs-practitioner-review. Zero sections are marked reviewed. `npm run check:sourcing -- --strict` is designed to block on exactly this, so the strict gate cannot currently pass.
- PLAN.md:218 states the governance dashboard is 'Excluded from production build', but dist/governance/ exists in the committed build output — the editorial cockpit is in the shippable artifact.
- immersive_religions_alpha_v1.tsx, a React prototype, sits at repo root in a project whose defining architectural decision (astro.config.mjs:3) is 'No React' — a 1,000-line artefact of the abandoned approach with no note saying it is historical.
- Six planning/spec markdown files at root (PLAN.md, PRODUCT.md, DESIGN.md, DESIGN.json, DECISIONS.md, religions-prd.md, CREDITS.md) against 46 source files — documentation outweighs implementation.
- dist/ is committed but there is no CI to regenerate it, so it will silently go stale against src/.

</details>

### `Vox`

**A dependency-free static dashboard that loads a bundled Spanish-A1 or Mandarin-HSK1 vocabulary CSV (word, translation, seen/practiced/tested counters, status), lets you filter and update rows in the browser, and exports the edited CSV back out — the UI half of a CSV-plus-ChatGPT language-learning tracker.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `default CSV auto-load on page open (no URL or env flag)` |
| Seed data / blocks writes / auth isolated | True / True / True |
| Stack | static HTML, vanilla JS (inline, no build), hand-rolled CSV parser, CSS |
| Deployed | True — https://benwassa.github.io/Vox/ (github-pages (docs/ folder, hand-written — no build step)) |
| Git | `main` @ 2025-09-04 · 1 uncommitted · 0 unpushed |
| Screenshots in repo | `Vox/docs/images/Spain_flag.png`, `Vox/docs/images/China_flag.png` |

The docs/ dashboard is a zero-dependency static page that self-loads committed sample data, needs no login or backend, and cannot write anything durable — it iframes safely as-is. The caveat is that it is a modest single-view CSV table, so it earns a small card rather than a headline slot.

<details><summary>Demo-mode evidence</summary>

- `docs/index.html:117`
- `docs/index.html:118`
- `docs/index.html:119`
- `docs/index.html:64`
- `docs/index.html:43`
- `docs/index.html:438`
- `docs/data/vocab_progress_es.csv:1`
- `archive/spanish/vocab_progress_es.template.csv:1`

No mode flag exists (no mode=demo, isDemo, demoMode, env vars or .env.example anywhere), but the dashboard behaves as a permanent demo: docs/index.html:117-119 declares csvPaths = { spanish: 'data/vocab_progress_es.csv', mandarin: 'data/vocab_progress_zh.csv' } and loads Spanish by default, with the banner at :64 reading 'No CSV loaded. Selecting Spanish by default.' Both bundled CSVs are deterministic 149-row committed vocabulary sets. There is no backend and no persistence: the only write path is a client-side CSV download (docs/index.html:438-454) and the only import is a user-chosen local file (:43-47), so nothing durable can be written by a visitor. Two template CSVs exist (archive/*/vocab_progress_*.template.csv) but both are 0 bytes.

</details>

<details><summary>Drift findings</summary>

- README describes the repo layout as spanish/, mandarin/, prompts/ at the root, but those directories were moved under archive/ — the documented structure no longer matches the tree.
- README describes Vox as 'not a full app — a structured system of logs + prompts' and its 'Future Extensions' list a 'simple dashboard for visualization (optional)' as not-yet-built, yet docs/index.html + docs/mobile.html (1,398 lines) are exactly that dashboard, already written and deployable. The README understates the repo by a whole artefact.
- README lists a hard goal of 'Spanish A1 by Nov 7, 2025'; HEAD is 2025-09-04 and nothing has been committed since, so the project reads as abandoned mid-goal.
- 'Vox v1.0 Pilot (deprecated).zip' — a 12 MB deprecated binary — is committed at the repo root, dominating clone size.
- archive/*/vocab_progress_*.template.csv are both 0 bytes despite a commit history that adds then removes then re-adds 'template files'.
- Two stale remote branches (codex/create-license.md-with-dual-licensing, hd5iur-codex/set-up-project-structure-and-files) left open; one untracked .DS_Store locally.

</details>

### `vox-v2`

> **⚠ Action needed:** vite define would inline GEMINI_API_KEY into public bundle

**A single-purpose Mandarin study tracker ('Vox') that runs a structured multi-phase campaign: it detects the current phase, enforces one timed training block at a time (sentence, listening or tone-drill), logs minutes against weekly targets, runs tone minimal-pair drills from a built-in set, anchors a weekly review on Fridays, and charts streaks and consistency — all client-side in the browser.**

| | |
|---|---|
| Recommendation | **`demo`** (high confidence) |
| Demo mode | **`none`** |
| Triggers | `no mode=demo / demo=1 / ?preview / isDemo / demoMode anywhere in src`; `no env-based mode switch (.env.example carries only GEMINI_API_KEY and APP_URL, both AI Studio boilerplate)`; `no mode resolver — useCampaignData() reads localStorage or falls back to an all-zero default` |
| Seed data / blocks writes / auth isolated | False / False / True |
| Stack | React 19 + TypeScript 5.8 + Vite 6, React Router 7 (7 routes), Tailwind CSS 4 via @tailwindcss/vite, motion (Framer Motion successor), lucide-react, clsx, tailwind-merge, date-fns, papaparse (CSV curriculum loading) |
| Build | `npm run build (prebuild runs scripts/generate-version.mjs); npm run dev (vite, port 3000); npm run lint (tsc --noEmit only — there are no tests)` |
| Deployed | False — https://ai.studio/apps/01ae40c9-2630-4637-af9a-932ace6da730 (from the unedited template README; this is the AI Studio editor link, not a published site) (none in-repo (originated as a Google AI Studio app)) |
| Git | `main` @ 2026-03-02 · 0 uncommitted · 0 unpushed |

Technically the easiest embed in the batch — a self-contained client-side SPA with no auth, no backend and no keys, already built to dist/ — and the product idea (a deliberately narrow training-dojo tracker that enforces one block at a time) reads clearly in a screenshot. Two things must happen first: seed the empty default state so the dashboard and analytics are not all zeros, and write an actual README, because the current one is untouched AI Studio boilerplate that does not mention the project.

<details><summary>Demo-mode evidence</summary>

- `src/hooks/useCampaignData.ts:92-105 (DEFAULT_DATA: listeningMinutes 0, conversationMinutes 0, sentences 0, toneSessions 0, logs [], sentencesList [], activeSentenceBlock null — a first-time visitor sees an entirely empty tracker)`
- `src/hooks/useCampaignData.ts:107,114,126 (STORAGE_KEY 'mandarin_campaign_v2'; all state read from and written to localStorage)`
- `src/hooks/useCampaignData.ts:162-165 (fetch('/data/sentences_phase1.csv') + Papa.parse — 58 curriculum sentences ship as static content, but that is the app's syllabus, not seeded user activity)`
- `src/hooks/useCampaignData.ts:17-22 (LISTENING_SOURCES: 3 hardcoded real podcasts/channels)`
- `src/hooks/useCampaignData.ts:32-41 (TONE_MINIMAL_PAIRS: 8 hardcoded tone minimal pairs)`
- `src/App.tsx:16-31 (7 routes, no auth guard, no login — the whole app is reachable anonymously)`

No demo mode, but also nothing standing in the way of one: this is a pure client-side SPA with zero auth, zero backend calls and all state in one localStorage key. It is already embeddable today — it would simply render an empty dashboard with 0/240 minutes and no history. A convincing demo is one small change: when localStorage is empty, hydrate DEFAULT_DATA with a few weeks of plausible logs (the analytics, streak and phase-detection screens then all light up). Writes need no blocking because they only ever touch the viewer's own browser storage.

</details>

<details><summary>Drift findings</summary>

- README IS UNEDITED BOILERPLATE: README.md is still the Google AI Studio scaffold — title 'Run and deploy your AI Studio app', a stock GitHub banner image, and instructions to set GEMINI_API_KEY. It never names Vox, Mandarin, or anything the app does. package.json:2 is likewise still "name": "react-example" at version 0.0.0, and metadata.json has empty name and description. Anyone landing on this repo learns nothing about it.
- TECH-STACK DOC DESCRIBES A BACKEND THAT DOES NOT EXIST: docs/tech-stack.md lists a '## Backend — Express, SQLite via better-sqlite3, dotenv' and '## AI / Integrations — Google GenAI SDK'. git ls-files shows no server file at all, and grep across src/ finds zero imports of express, better-sqlite3, dotenv or @google/genai. Five production dependencies (@google/genai, better-sqlite3, express, dotenv, and their @types) are dead weight in package.json.
- LATENT KEY-LEAK PATTERN: vite.config.ts:32 does define: { 'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY) }, which inlines whatever that env var holds directly into the public client bundle. Nothing currently reads it and no .env/.env.local exists on disk (only .env.example), and I scanned the built dist/ for AIza-prefixed strings and found none — so there is no leak today. But if a real Gemini key is ever put in .env.local, a build publishes it verbatim in the JS. Worth removing the define line since nothing uses it.
- HALF-REMOVED FEATURE: commit 6dc6974 'Remove Sentences section from app UI and routes', yet the sentence machinery is still live — useCampaignData.ts still fetches and parses public/data/sentences_phase1.csv, still exports Sentence/SentenceStatus types, and BlockSession.tsx and Log.tsx still reference sentences. Two of the last three commits (90dd657, e04123c) are fixes to that supposedly-removed CSV. Both sentences_phase1.csv and sentences_phase1_no_id.csv are tracked.
- STALLED: 20 commits total, 18 of them on 2026-02-28 (a single 7-sprint push), last touched 2026-03-02 — roughly six months idle at audit time. Single branch, clean, fully pushed.
- NO SECRETS COMMITTED (verified): git ls-files finds only .env.example, which contains literal placeholders ('MY_GEMINI_API_KEY', 'MY_APP_URL'). .env* is gitignored.
- PERSONAL CONTENT: docs/LearningProfile.md is a first-person profile ('Mandarin Learning Profile – Ben') covering motivation ('Relationship integration', 'Native speaker partner access'), prior language levels and skill priorities. Benign, but it is personal material that would ship with a public repo.
- NO TESTS: npm run lint is tsc --noEmit; there is no test script and no test file in the tree.

</details>


---

## Recommended `link` (8)

### `hearthMVP`

**A deliberately small React + Firebase 'calm watchlist' for two people: a shared shelf of saved films and shows, vibe/energy tags, a 'Tonight' tray, a no-algorithm decision helper that just picks for you, and JSON/CSV import with a preview-and-fix step.**

| | |
|---|---|
| Recommendation | **`link`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / True |
| Stack | React 18 (create-react-app / react-scripts), Firebase 10 (Auth + Firestore), Express 4 (server/ + api/), Tailwind, three.js 0.167, lucide-react |
| Build | `npm run build  (DISABLE_ESLINT_PLUGIN=true react-scripts build; prebuild runs scripts/setupFirebaseConfig.js + versioning checks)` |
| Deployed | True  (firebase-app-hosting (+ a contradictory GitHub Pages claim)) |
| Git | `firebase-app-hosting-vnext` @ 2026-02-13 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `_archive/legacy-github-pages/docs/posters/hero.jpg`, `src/assets/hearth_vector.png`, `hearth_nobg.png` |

The most product-complete app of the six — clear thesis, real domain layer, CI with lint/format/test gates — but it is unlaunched, needs uncommitted Firebase credentials to even render, and every session writes live user data to Firestore, so it cannot be dropped in an iframe today. Worth a card that links to the repo; it becomes a demo candidate only if someone adds a seeded read-only shelf on top of the existing anonymous-auth path.

<details><summary>Demo-mode evidence</summary>

- `src/services/firebase/auth.js:29`
- `src/services/firebase/auth.js:24`
- `src/views/OnboardingView.js:1`
- `poster-map.json:1`
- `src/views/SeasonTrackerMockup.js`

Exhaustive grep for mode=demo, demo=1, ?preview, isDemo, demoMode, *_DEMO, resolveMode, getAppState across src/, server/ and api/ returns nothing (the only package-lock hit is an unrelated dependency string). What exists is auth ISOLATION, not a demo mode: signInUser falls through to signInAnonymously (auth.js:29) unless a custom token is supplied (auth.js:24), so every unauthenticated visitor gets a private throwaway Firestore identity. But that identity starts EMPTY — OnboardingView then asks for the couple's real names, and every add/import writes to live Firestore. No seeded shelf exists: no starter/curated/catalog/DEFAULT_ITEMS constant anywhere in src/config or src/domain. poster-map.json is an asset lookup table (title -> poster path), not seed content, and SeasonTrackerMockup.js is a UI mockup view, not demo state. The anonymous-auth plumbing means a playbook-grade demo mode is cheap to add, but none is present today.

</details>

<details><summary>Drift findings</summary>

- Checked-out branch firebase-app-hosting-vnext is 19 commits AHEAD of main, and .github/workflows/deploy.yml only runs on push to main — so the entire App Hosting migration is built and tested by nothing.
- deploy.yml's closing comment ('GitHub Pages serving /docs from main') directly contradicts README.md:125 ('Primary runtime target is Firebase App Hosting') and docs/ holds no build output. Two mutually exclusive deployment stories in one repo.
- SPRINTS.md declares 'Working Branch: backend-live-metadata-foundation' — that branch exists neither locally nor on origin.
- The app cannot boot from a clean clone: public/firebase-config.js and .env.local are both gitignored and there is no committed example for the frontend config (only .env.api.example, which covers the backend media API).
- Five branches (main, dev, modular, dev-finish-time-plan, firebase-app-hosting-vnext) all last touched Jan-Feb 2026 with dev and modular each carrying 1-2 commits that never landed on main.
- SPRINTS.md is a 'Planning'-status program plan for a live-metadata backend that HEAD has only partially built — README already documents the outcome as current.
- Head date 2026-02-13 makes this the oldest repo in the batch by ~4 months.

</details>

### `hestia`

> **⚠ Action needed:** third-party email hardcoded in firestore.rules; real work unmerged on branch

**A CLI pipeline that pulls Toronto rental listings (from a Repliers feed or a CSV/JSON export), scores each address against two people's separate transit commutes via the Google Routes API with inclusive time thresholds, and emits a CSV plus a self-contained sortable HTML comparison table of the listings that work for both — with an optional Firebase-hosted, sign-in-gated web view of the same data.**

| | |
|---|---|
| Recommendation | **`link`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `npm run seed:demo (package.json:12 -> scripts/seed-demo.ts) pushes a hardcoded 12-listing demo dataset to the PRODUCTION Firestore project hestia-2f6ca`; `no URL trigger (mode=demo / ?preview / isDemo / demoMode) exists anywhere in src, web or scripts`; `no env-var mode switch; .env.example only has REPLIERS_API_KEY and GOOGLE_ROUTES_API_KEY` |
| Seed data / blocks writes / auth isolated | True / True / False |
| Stack | TypeScript (ESM, no build step, tsx at runtime), Node >=22, zod, firebase-admin ^14.4.0, vitest (61 tests), Firebase Hosting + Firestore + Google Auth (vanilla ES-module web client, no framework) |
| Build | `none (no build); npm run run:search -- --file inputs/example-listings.csv; npm test; npm run typecheck` |
| Deployed | True — https://hestia-2f6ca.web.app (firebase-hosting + firestore) |
| Git | `phase-1-rental-pipeline` @ 2026-09-12 · 0 uncommitted · 0 unpushed |

Genuinely well-engineered (61 tests, explicit contracts, cost-confirmation before paid API calls, tight Firestore rules) and the strongest documentation discipline in this batch, but the deployed artifact is a Google-sign-in-gated report for two named people, and the subject matter is a personal apartment hunt containing a partner's email and real workplace addresses. Link with a card; a live embed would need seed-demo rows rendered through src/output/html.ts as a standalone static page and the PII scrubbed first — cheap work, but not free.

<details><summary>Demo-mode evidence</summary>

- `scripts/seed-demo.ts:1-12 ("Pushes the current demo dataset ... to Firestore so the hosted app has something to show")`
- `scripts/seed-demo.ts:24-36 (12 deterministic hardcoded listing rows, 7 eligible / 5 ineligible)`
- `scripts/seed-demo.ts:80 ("Seeded https://hestia-2f6ca.web.app with the demo dataset.")`
- `package.json:12 ("seed:demo": "tsx scripts/seed-demo.ts")`
- `firestore.rules:60-70 (allow write: if false on listings and runs; Admin SDK only)`
- `firestore.rules:47-56 (isAllowlisted() hardcodes three personal Gmail addresses)`
- `web/index.html:79,155-181 (Google sign-in gate; unauthorized accounts see an error, no anonymous/demo path)`
- `src/output/html.ts:19-25 (renderHtml produces a fully self-contained, no-network HTML report)`

There is deterministic demo data and durable writes are hard-blocked for clients, but there is no mode gate at all: the demo dataset is written into the single real Firestore project, and the hosted web view is gated behind Google sign-in with a three-address email allowlist. Nothing anonymous can see anything. However, a demo is genuinely cheap here: src/output/html.ts already emits a single self-contained static HTML report (out/hestia-2026-09-13T03-04-58.html exists locally, gitignored) with sortable/filterable rows and no network calls, and seed-demo.ts already holds the fixture rows to feed it.

</details>

<details><summary>Drift findings</summary>

- STALE STATUS DOC: docs/PROJECT_STATUS.md (as of 2026-09-12) states 'Deployment/hosting: None. Phase 1 is intentionally manual/local.' but the HEAD commit c3c0551 (same day) added Firebase Hosting + Google Auth + a Firestore-backed web view, and firebase.json/.firebaserc are committed.
- README SILENT ON HOSTING: README.md never mentions the deployed web app, Firebase, or hestia-2f6ca.web.app — it documents only the local CLI path. Grep for 'hosting|firebase|web.app' in README.md returns nothing.
- PERSONAL DATA COMMITTED: firestore.rules:47-56 hardcodes three personal email addresses (<REDACTED_EMAIL@googlemail.com>, <REDACTED_EMAIL@gmail.com>, and a second person's gmail); firebase.json embeds supportEmail <REDACTED_EMAIL@googlemail.com>. Not credentials, but real PII including a third party's address — should be scrubbed or the repo kept private before any portfolio linkage.
- PERSONAL CONTEXT: the project encodes two real workplace addresses (1300 Bay St, 111 Queen St E) and a real apartment hunt with a named partner ('Ben'/'Vicky' labels in commit 1d4a783 and seed-demo reasons).
- NO SECRETS COMMITTED (verified): .env exists locally with 2 populated keys but is gitignored (.gitignore:2) and confirmed untracked; git ls-files shows only .env.example. A .githooks/pre-commit secret guard is committed. This repo is clean on the committed-credential axis.
- FEATURE BRANCH IS THE REAL HEAD: all 5 commits of the rental pipeline live on origin/phase-1-rental-pipeline and are not merged to main; origin/main is 5 commits behind the actual project. Seven other remote branches (issue-1, issue-2, issue-6, issue-7, docs/*, housekeeping/*) remain unmerged.
- STATED BLOCKER: README and PROJECT_STATUS both admit the Repliers API key only returns US MLS data, so the live-listing path cannot actually retrieve Toronto rentals; only the --file CSV path works today.
- GRAPHIFY ARTIFACTS COMMITTED: .graphify_analysis.json, .graphify_extract.json, .graphify_labels.json and graphify-out/ (incl. a generated graph.html) are tracked — tooling output living in the repo.

</details>

### `iroh`

**A private reflective-journaling PWA ('Thread') where each entry is sent to Gemini through an authenticated Express API that returns a structured analysis, then aggregates entries into periodic syntheses and long-horizon insight views over Firestore.**

| | |
|---|---|
| Recommendation | **`link`** (high confidence) |
| Demo mode | **`none`** |
| Triggers | `no mode=demo / demo=1 / ?preview / isDemo / demoMode / VITE_*_MODE trigger anywhere in src, app, lib, server or .env.example`; `the only sample-ish thing is a single hardcoded sentence used by a dev-only test button` |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Vite 7 + React 19 + TypeScript, React Router 7, Tailwind CSS 4, Express 5 API (tsx runtime, no compile step), Firebase Auth (Google) + Firestore + firebase-admin 12, @google/genai (Gemini 2.5 Flash) |
| Build | `npm run build (vite build); npm run start for the production API+static server` |
| Deployed | True  (firebase-app-hosting (Vite frontend + Express API on one runtime) + firestore rules) |
| Git | `dev` @ 2026-02-13 · 1 uncommitted · 0 unpushed |
| Screenshots in repo | `public/thread.png`, `public/thread_original.png`, `public/thread_vector.png` |

A real, deployed, non-trivial product (auth, LLM analysis, synthesis pipeline, PWA) and the most substantial app in this batch, but it is a private journal with anonymous access explicitly disabled and no unauthenticated surface, so it can never be iframed as-is. Card with a link plus screenshots; note that no live URL is recorded anywhere, so that would need to be recovered before linking.

<details><summary>Demo-mode evidence</summary>

- `src/App.tsx:79 ("Sign in with Google to access your journal. Anonymous access is disabled.") — the app renders nothing but a sign-in card without a Google session`
- `src/views/HomeView.tsx:34-35 (devSample: one hardcoded reflection sentence)`
- `src/views/HomeView.tsx:38,106 (setShowDevTest(!import.meta.env.PROD) — the sample is hidden in production builds and, when used, writes a REAL entry via submitReflection)`
- `server/src/routes/api.ts:22 (router.use(requireAuth) — every API route requires a verified Firebase ID token)`
- `server/src/middleware.ts:34 (adminAuth.verifyIdToken)`
- `firebase/firestore.rules:4-9 (allow read, write: if false for all documents; all access is via the Admin-SDK server)`
- `.env.example (VITE_FIREBASE_* + GEMINI_API_KEY only — no mode flag)`

Not just absent but deliberately closed: anonymous access is explicitly disabled and there is no unauthenticated render path. The devSample string is a developer convenience that submits a genuine entry to the real backend and is stripped in production, so it is not a demo affordance. A demo would require building an unauthenticated read-only route plus fixture entries and a Gemini-call stub — this is the most expensive demo retrofit in the batch.

</details>

<details><summary>Drift findings</summary>

- LOCAL SERVICE ACCOUNT KEY ON DISK: .secrets/firebase-adminsdk.json (2,376 bytes, dated 2026-02-06) sits in the working tree. It is correctly gitignored (.gitignore:27) and confirmed NOT tracked and NOT present anywhere in the 123-commit history (git log --diff-filter=A over '*.secrets*'/'*adminsdk*'/'.env*' returns nothing). So: not a committed-secret incident, but a live admin private key for project thread-40646 is sitting in a working directory — rotate/relocate if this folder is ever zipped or shared. .env.local is likewise present and ignored (.gitignore:36).
- DUPLICATE DEAD FRONTEND: README.md:15 says 'Legacy Next app/ code has been removed to keep a single frontend path', but app/ is still fully tracked (8 components/views + globals.css + favicon) and its files DIFFER from their src/ twins (diff on HomeView.tsx shows they have drifted apart). Two copies of the UI, one of them stale and unreachable.
- STALE ASSESSMENT DOC: ASSESSMENT.md (2026-02-05) reviews a Next.js app with app/api/* route handlers, unauthenticated /api/clear, /api/import and /api/export, and permissive Firestore rules. None of that matches HEAD: the API is now Express under server/src with router.use(requireAuth), and firestore.rules is now a blanket deny. The document reads as current findings but describes an architecture that no longer exists.
- NODE_MODULES IN HISTORY: server/node_modules was committed at some point (found via git grep over history at ac52128) — history is bloated even though the tree is clean now.
- UNCOMMITTED WORK: SPRINTS.md has 206 uncommitted added lines in the working tree.
- UNMERGED BRANCHES / dev IS THE TRUTH: HEAD is on dev with origin/main behind it; archive-vercel-app and feature/vite-react-port remain as remote branches. The last commit is a 'Merge main into dev' conflict resolution.
- NO DEPLOYED URL RECORDED: App Hosting config is complete and points at project thread-40646, but nothing in the repo states the live URL, and there is no CI workflow — deploys are manual and undocumented apart from FIREBASE_SETUP_CHECKLIST.md.
- LOCAL-ONLY ARTIFACT CLUTTER: project_snapshot_2026-02-12/ plus project_snapshot_2026-02-12.zip and an empty exports/ dir sit in the working tree (all gitignored).
- SENSITIVE DOMAIN: this is a personal journal containing the author's own reflections; the production Firestore holds real diary entries. Nothing personal is committed, but any demo must not touch the real project.

</details>

### `Janus`

> **⚠ Action needed:** .env tracked with no .gitignore rule

**A Python CLI text RPG across three acts (Mirrors/Beasts/Whispers) whose branching choices carry weighted tags across a 12-category 'hamartia' trait taxonomy, resolving at the end into a dual-trait archetype delivered as a personalized 'Hero's Chronicle', with a Dash dashboard for running simulated policy-persona playthroughs and calibrating the scoring multipliers.**

| | |
|---|---|
| Recommendation | **`link`** (high confidence) |
| Demo mode | **`partial`** |
| Seed data / blocks writes / auth isolated | True / True / True |
| Stack | Python 3 (stdlib), Dash, Plotly, pytest, vanilla JS ES modules, HTML/CSS (prototype frontend) |
| Build | `python src/main.py  (no pip install target; deployment/build_alpha.py builds a zip)` |
| Deployed | False   |
| Git | `main` @ 2025-08-15 · 1 uncommitted · 0 unpushed |

The shippable artifact is a Python CLI game with no web deploy path, so it cannot be embedded as-is; but pilot_humility_hubris/frontend/ is a genuinely self-contained static prototype that could be dropped onto GitHub Pages in an afternoon and then embedded. Until that is actually built and deployed, a card that links to the repo is the honest treatment.

<details><summary>Demo-mode evidence</summary>

- `pilot_humility_hubris/frontend/data.js:5`
- `pilot_humility_hubris/frontend/index.html:1`
- `pilot_humility_hubris/frontend/app.js:133`
- `pilot_humility_hubris/frontend/app.js:53`
- `docs/development/dashboards/gemini_dashboard_files.md:355`

No mode gate anywhere. What exists instead is a fully self-contained static browser prototype at pilot_humility_hubris/frontend/ (index.html + app.js + data.js + style.css + 8 SVG portraits) whose entire narrative corpus is hardcoded in data.js (`export const scenes = [...]`, 221 lines, deterministic). It makes zero network calls; the only persistence is the visitor's own localStorage keys `janusState` and `janusTelemetry` (app.js:133, app.js:53), so there is no durable shared write and no auth at all. Per the spec this is 'hardcoded sample content with no switch' = partial. Separately, docs/development/dashboards/gemini_dashboard_files.md:355-358 specs an `AdapterMode = 'fixtures' | 'api' | 'file'` with fixtures as the default for the Dash dashboard, but that is a design document only -- no `src/dashboard/` code implements it and there is no `public/fixtures/` directory in the repo. The main product (src/main.py) is a Python CLI RPG with no web surface and therefore no demo mode.

</details>

<details><summary>Drift findings</summary>

- The README on disk is UNCOMMITTED: `git status` shows ` M README.md` and `git diff --stat` reports 131 insertions / 96 deletions. Everything quoted above (the INDEX block, 'What works', 'What's missing', 'Overlap / merge candidates') exists only in the working tree, not in origin/main. The public GitHub README is the older, much thinner version.
- `.env` is tracked in git (`git ls-files .env` returns it) and `.gitignore` contains no `.env` rule. Content is benign here (`PYTHONPATH=.`) but the pattern means any future secret added to that file commits silently.
- README documents modules that do not exist: it states the `src/modules/` files specced in docs/design/psychology_profiling_module.md (traits.py, scoring_engine.py, profile_generator.py, behavioral_analyzer.py, chronicle_writer.py) 'are not yet separate modules'. The design doc still describes them as the architecture.
- No dependency manifest at root (no requirements.txt, no pyproject.toml). Dash/Plotly deps live only in src/dashboard/requirements.txt; everything else is implicit. A clean clone cannot be reproducibly installed.
- Stale remote branch `origin/codex/update-documentation-for-dashboard-upgrade` with no local counterpart.
- data/playtests/logs.json and data/playtests/survey_results.json contain playtest session records; the README itself flags 'verify before sharing'. Not audited for PII in this pass.
- HEAD is 2025-08-15 -- over a year stale relative to every other repo in this batch.

</details>

### `liebestraum`

> **⚠ Action needed:** committed Firebase admin private key (verified) + plaintext API keys

**A pair-scoped PWA where two people log shared memories — title, date, geocoded location, photos — and browse them as a timeline, a clustered Mapbox map with temporal filtering, travel stats and flag collections, plus an AI-summarised 'possibilities' list of places to go and an annual recap.**

| | |
|---|---|
| Recommendation | **`link`** (high confidence) |
| Demo mode | **`none`** |
| Triggers | `?recap=force`; `?recap=reset` |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | React 19, Vite 7, Tailwind CSS 3 + typography, Firebase (Auth/Firestore/Storage) + firebase-admin, Express 5 (server.mjs), Mapbox GL + react-map-gl |
| Build | `npm run build (or npm run build:release for version/commit metadata)` |
| Deployed | True — https://liebestraum--liebestraum-597db.us-east5.hosted.app (firebase app hosting (auto-rollout from main) + firestore/storage rules) |
| Git | `main` @ 2026-08-15 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `liebestraum/20251006_124021-COLLAGE.jpg`, `liebestraum/public/possibilities/banners/trip.png`, `liebestraum/public/possibilities/banners/outdoor.png` |

By far the most substantial engineering here (369 commits, 208 tracked files, React 19 + Firebase + Mapbox + Gemini, real tests and an offline outbox), but it is a private two-person app behind a Google sign-in wall — a visitor hits an auth gate, so it cannot be embedded, and a demo mode would be a project in itself. Worth a card that links to the repo/case study rather than the live URL. Fix the committed admin key before pointing any public attention at this repo.

<details><summary>Demo-mode evidence</summary>

- `src/hooks/useFirebaseAuth.js:3`
- `src/lib/firebase.js`
- `firestore.rules:5`
- `firestore.rules:9`
- `firestore.rules:26`
- `.env.example:1`
- `README.md:129`

No demo affordance. Grep across src/, server.mjs and vite.config.js for isDemo, demoMode, DEMO, mode=demo, guest, signInAnonymously, readOnly returns only false positives (crossOrigin="anonymous" in DetailView.jsx:183, an IndexedDB 'readonly' transaction in src/lib/outbox/db.js:120). Auth is Google-popup-only (useFirebaseAuth.js -> signInWithGoogle in src/lib/firebase.js); there is no anonymous path. firestore.rules gates every collection behind isSignedIn() plus pair membership (isPairMember/isPairOwner), and src/lib/firebase.js throws at boot if the Firebase env vars are absent, so the app cannot even start without a real project. The only URL-triggered state overrides that exist are ?recap=force and ?recap=reset (documented README.md:129), which replay the annual-recap cover for an already-signed-in user — not a data mode. Adding a real demo mode would be expensive: every view is driven by live onSnapshot reads through src/hooks/useAdventures.js, so it needs a fixture layer plus a write guard on the outbox/Storage upload paths.

</details>

<details><summary>Drift findings</summary>

- CRITICAL — a Firebase admin service-account private key is committed and tracked: liebestraum-597db-firebase-adminsdk-fbsvc-96dddc02da.json contains private_key and is listed by `git ls-files` (entered history in commit 1c57b2f). This grants full admin access to the liebestraum-597db project, bypassing all firestore.rules. It needs key revocation in GCP plus history scrubbing, not just a .gitignore entry.
- CRITICAL — apphosting.yaml and apphosting.production.yaml commit server-private API keys as plaintext `value:` entries: GOOGLE_PLACES_API_KEY, MAPBOX_GEOCODING_TOKEN and GEMINI_API_KEY (all three appear literally in both files).
- Direct README contradiction: README.md instructs 'Use `secret:` references only for server-private credentials (for this app: GOOGLE_PLACES_API_KEY, MAPBOX_GEOCODING_TOKEN, and GEMINI_API_KEY)' — the checked-in apphosting files do the exact opposite for all three.
- apphosting.yaml and apphosting.production.yaml are byte-identical duplicates maintained by hand (README explains the CLI requires both), so they will drift the moment one is edited alone; the header comment in apphosting.yaml also misdescribes it as the 'production' environment file.
- graphify-out/ (GRAPH_REPORT.md, graph.html, graph.json) is committed tooling output, and 20251006_124021-COLLAGE.jpg sits untracked-looking at the repo root — both are workspace debris in an otherwise disciplined repo.
- Three stale remote claude/* branches (fix-city-counting-ArpQ3, fix-memory-save-issue-D5jWq, open-issues-ldpjmz) left open on the remote.

</details>

### `morpheus-dream-archive`

> **⚠ Action needed:** Pages build hard-fails without Firebase secrets; index.json empty

**A private, install-as-PWA glassmorphic archive where the owner pastes AI-structured JSON of a recorded dream, attaches scene images, and browses the resulting entries in a card gallery backed by per-user Firestore and Storage.**

| | |
|---|---|
| Recommendation | **`link`** (high confidence) |
| Demo mode | **`none`** |
| Triggers | `VITE_SHOW_DEMO=true — but this only reveals a GlassSurface component showcase page, NOT a seeded-data mode` |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | React 18, Vite 5, Tailwind CSS 3, Firebase 12 (Auth + Firestore + Storage), vite-plugin-pwa, lucide-react |
| Build | `npm run build (vite build -> docs/); npm run check = lint + build` |
| Deployed | True — https://benwassa.github.io/morpheus-dream-archive/ (Pages) and the morpheus-240dc Firebase Hosting site (dual — GitHub Pages (Actions) + Firebase Hosting) |
| Git | `main` @ 2026-07-17 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `src/assets/app-icon-source.png (app icon only)`, `public/icons/icon-512x512.png (app icon only)` |

This is the real, actively-released product (v1.7.6, HEAD 2026-07-17) and is clearly the strongest of the Morpheus pair, but it cannot be iframed: every render path is gated behind Google sign-in plus a hardcoded single-UID whitelist, there is zero seed data, and the build refuses to run without Firebase credentials. It deserves a portfolio card that links out (or, better, a small demo-mode investment described below) rather than a live embed.

<details><summary>Demo-mode evidence</summary>

- `src/App.jsx:40-42 — const SHOW_DEMO = import.meta.env.VITE_SHOW_DEMO === 'true'`
- `src/App.jsx:1756 — {SHOW_DEMO && currentView === 'demo' && <GlassSurfaceDemo />} (UI component gallery only)`
- `src/component/GlassSurfaceDemo.jsx:27 — renders glass-surface design samples, no dream entries`
- `src/App.jsx:1693 — if (!isConfigured) return <AuthConfigurationRequired /> (hard stop)`
- `src/App.jsx:1717 — if (!user) return <AuthGate /> (hard stop, Google sign-in required)`
- `src/App.jsx:1720 — if (!isAllowed) return <AccessDenied user={user} /> (hard stop)`
- `src/config/whitelist.js:1-3 — ALLOWED_UIDS = [BEN_UID] — single hardcoded UID, no guest/anon path`
- `src/App.jsx:491-517 — loadStaticEntries() fetches public/index.json + public/entries/<id>.json`
- `public/index.json:1-3 — {"entries": []} — the static path exists but has zero seed content`
- `vite.config.js:15-26 — build THROWS if Firebase env keys are missing, so no credential-free build is possible`

The word 'demo' in this repo is a false positive: VITE_SHOW_DEMO gates a glassmorphism component showcase, not seeded product content. There IS a genuine static-entry rendering path (loadStaticEntries reading public/index.json + public/entries/*.json) — the exact machinery a demo mode would need — but it is unreachable: it only runs after the three auth gates pass (configured -> signed in -> UID whitelisted), it is only used as a Firestore-failure fallback, and public/index.json is empty. There is no mode gate, no anonymous/guest user, and no write-blocking (an authed user can always write to Firestore and upload to Storage). Additionally vite.config.js:15-26 makes the build fail outright without Firebase credentials, so even a static-only build is impossible today.

</details>

<details><summary>Drift findings</summary>

- README claims 'deployed to GitHub Pages + Firebase' and 'Full gallery view fetching entries from Firestore', but the app is unreachable to any visitor: three sequential auth gates end in a single-UID whitelist (src/config/whitelist.js). The public deployment can only ever show a sign-in wall.
- README version says v1.7.5 while package.json says 1.7.6 and HEAD is 'release: v1.7.6' — README status line is one release stale.
- vite.config.js sets base:'/' but the GitHub Pages deploy serves from a /morpheus-dream-archive/ project path; asset URLs will 404 on Pages unless a custom domain is in play (no CNAME file exists). The Firebase Hosting deploy is the one that actually works.
- README 'What's missing' admits public/index.json is empty and Firebase secrets may not be in CI — the Pages build will hard-fail (vite.config.js throws) if the secrets are absent.
- The static-entry loader (src/App.jsx:491) is dead code in production: no entries exist in public/entries/ and it only fires as a Firestore fallback behind auth.
- Two competing deploy targets (Pages workflow + Firebase Hosting workflows) with no README statement of which is canonical.
- Working tree carries build/tool debris at repo root (.graphify_*.json, firebase-debug.log, graphify-out/, committed docs/ build output).

</details>

### `Narrative`

**A keyboard-first, local-only travel-photo curation tool that reads a trip folder straight off disk, lets you tag every shot with a single-letter story role, and emits a copy-based bash rename script that reorganises the trip into day folders without ever touching the originals.**

| | |
|---|---|
| Recommendation | **`link`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | React 18, Vite, TypeScript, Tailwind CSS 3, idb (IndexedDB), heic2any |
| Build | `npm run build  (format + lint + test + vite build into docs/)` |
| Deployed | True — https://benwassa.github.io/Narrative/ (github-pages) |
| Git | `main` @ 2026-07-21 · 1 uncommitted · 0 unpushed |
| Screenshots in repo | `public/assets/Narrative_icon.png`, `public/assets/Narrative_old.png` |

Genuinely substantial, well-tested work with CI and a real README, but it is structurally unembeddable: it needs the visitor's own photo folder via a Chromium-only filesystem API, so an iframe shows an empty picker. Best served by a card that links to the repo or a recorded walkthrough.

<details><summary>Demo-mode evidence</summary>

- `grep -rni 'demo' over src/, README.md and index.html returns zero hits`
- `No .env.example file exists in the repo`
- `Every 'mock*' hit is inside src/features/photo-organizer/utils/__tests__/*.test.ts (vitest fixtures, not app seed data)`
- `'template' hits are unrelated: src/features/photo-organizer/utils/videoTimeline.ts:42,194,266 (render template id 'recap-v1') and CSS grid-template rules`
- `README.md:23 — "Local-only storage: Project state stored in localStorage + IndexedDB handles"`
- `README.md:40 — requires a "Chromium-based browser (File System Access API)"`

No demo affordance at all, and adding one would not be cheap. The app's first action is a File System Access API directory picker against the user's own photo library; there is no data path that does not start from a real local folder, and IndexedDB stores origin-scoped directory handles. A deployed visitor lands on an empty project picker. Seeding it would mean building a whole alternate in-memory photo source plus bundling sample images — not a config flag.

</details>

<details><summary>Drift findings</summary>

- The Pages deploy workflow is `on: workflow_dispatch` only — docs/ is committed as build output, so the live site reflects whatever was last built and committed by hand, not main. Deployment freshness is not automated despite the workflow existing.
- docs/ is both a committed build output directory and the documentation directory (ARCHITECTURE.md, SPRINT_10_*.md etc. live alongside built assets), with emptyOutDir:false to avoid clobbering them. Fragile arrangement.
- A .venv/ with scipy and scikit-learn is present in the working tree of a TypeScript repo (Python tooling under tools/), plus coverage/ and node_modules/ on disk. Untracked `music/` directory is the one uncommitted item.
- 4 archive/* branches locally and on origin (archive/dev, archive/chore/ui-consolidation, archive/feature/apply-organization, archive/feature/recap-v1-motion) plus an origin/fix-inspect-ux — explicitly abandoned WIP retained on the remote.
- README documents a long feature list (dashboard, year grouping, resume-last-project, breadcrumb) that could not be verified against a running app in a read-only audit; no screenshots in-repo to corroborate the UI.
- Only functional in Chromium browsers — a portfolio iframe would silently fail for Safari/Firefox visitors.
- README has no live demo link, which is at least consistent with the app being unusable without a local folder.
- Second-oldest app repo (HEAD 2026-07-21, ~2 months stale).

</details>

### `Telos`

**A deliberately minimal personal PWA for closing the gap between stated and enacted values: each night you tap one binary button per life-domain and leave a single shared note, and each Sunday it copies a markdown debrief -- horizon statement, days-vs-target per domain, daily notes, last week's commitments -- to the clipboard to paste into Claude, which supplies all the interpretation the app deliberately refuses to.**

| | |
|---|---|
| Recommendation | **`link`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Vite 6, React 18 (JSX, no TypeScript), Firebase 12 (Auth + Firestore Enterprise), framer-motion, lucide-react, vite-plugin-pwa |
| Build | `npm run build` |
| Deployed | True — https://telos-2f6ba.web.app (firebase-hosting) |
| Git | `main` @ 2026-07-22 · 0 uncommitted · 0 unpushed |

Today it is unembeddable: a hard Google sign-in wall in front of a single-UID Firestore allowlist over the owner's real journal, so there is nothing a visitor could ever be shown. It is nonetheless the most polished and most recent app in this batch, and the state layer is unusually demo-friendly (writes already no-op without a user), so it is the single best candidate to promote from `link` to `demo` with roughly a day's work.

<details><summary>Demo-mode evidence</summary>

- `src/App.jsx:34`
- `firestore.rules:23`
- `firestore.rules:25`
- `firestore.rules:29`
- `src/state.jsx:229`
- `src/state.jsx:114`
- `src/state.jsx:31`
- `src/firebase.js:14`

Zero demo affordance. A grep for mode=demo / mode=template / demo=1 / ?preview / isDemo / demoMode / resolveMode / getAppState / seed* / fixtures / mock* / sample-data across all of src/ returns nothing. There is no .env.example at all. src/App.jsx:34 is an unconditional auth wall -- `if (!user) return <main className="auth-gate">...Continue with Google...` -- so an unauthenticated visitor sees only a sign-in button and never reaches the four surfaces (Tonight/Week/Trends/Setup). Firestore access is hard-whitelisted to one literal UID: firestore.rules:23-29, `isWhitelisted() { return request.auth != null && request.auth.uid == 'gGSqYrLBr4QUQ00R9tSOTrtplc23'; }` with `isAuthenticated()` defined as exactly that check, so even another signed-in Google account is denied every read and write. FEASIBILITY OF ADDING ONE (the specific question asked): high, and cheaper than it looks. The state layer already has a complete backend-free path -- `freshDb()` (src/state.jsx:31) builds a valid v1 record with five seeded domains, `loadLocalSeed()` (src/state.jsx:114) hydrates React state from localStorage BEFORE auth resolves, and critically `saveChanges` (src/state.jsx:229) opens with `if (!user) return;`, so every durable write is already a no-op without a signed-in user. A `?demo=1` branch would therefore need only two changes: bypass the `if (!user)` gate in App.jsx and swap `loadLocalSeed()` for a generator that fills `checkins` with ~28 days of plausible binary taps plus a horizon statement and a couple of week commitments. No Firestore rule change is needed and no real data can leak, because the demo user never authenticates and so never matches the whitelisted UID. The one thing to also stub is the Week tab's clipboard debrief export (src/lib/exportDebrief.js), which would otherwise emit the fabricated data as if real. Deterministic seeding (fixed dates relative to 'today') is required or the Trends 14-day bars will differ per visit.

</details>

<details><summary>Drift findings</summary>

- firestore.rules is whitelisted to a single hardcoded UID ('gGSqYrLBr4QUQ00R9tSOTrtplc23', firestore.rules:23-25). The README says only 'Sign in with Google to keep one private record across devices' and the rules' own header comment describes a generic per-UID model -- neither discloses that the app is a one-person allowlist. Anyone else who signs in reaches the auth gate, passes it, and then hits a permission-denied backend error.
- The deployed Firebase Hosting site (telos-2f6ba.web.app) is presumably live and publicly reachable, but the only thing a visitor can see is the sign-in screen. Any portfolio link to it shows a dead end, not the product.
- README advertises v1.1 push notifications 'via Firebase Cloud Messaging and a scheduled Cloud Function' on the roadmap; there is no functions/ directory and no FCM code in src/ -- correctly marked roadmap, but there is no messaging groundwork at all.
- docs/telos-prd.md is named the 'full specification' and single source of truth; not cross-checked against the shipped four surfaces in this pass.
- Local branch `domains-binary-overhaul` still exists (and on origin) alongside main -- likely a merged-and-abandoned lane.
- `dist/` and `node_modules/` are present in the working tree; dist/ contains a built bundle whose freshness relative to v0.5.0 was not verified.
- firestore-rules-analysis.md sits at repo root as a loose working artifact rather than under docs/.

</details>


---

## Recommended `index` (6)

### `ancestral-dream`

**A production pipeline repo for an AI-assisted graphic-novel adaptation of one vignette — locked character/vehicle/location reference art, a continuity bible, per-panel commission prompts, and a rubric-gated review workflow that forbids generating whole pages.**

| | |
|---|---|
| Recommendation | **`index`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Markdown, AI image generation workflow (ChatGPT Projects), no code |
| Deployed | False   |
| Git | `main` @ 2026-07-18 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `assets/references/art-direction-board.png`, `assets/references/ben-locked-v1.png`, `assets/references/truck-locked-v1.png` |

Real, well-structured creative process work with a genuinely interesting methodology, but there is no artifact to show — no finished panel, no page, no code, no deploy. It merits a line in a text listing of ongoing work, not a card, until at least one assembled page exists.

<details><summary>Drift findings</summary>

- README and production/status.csv describe an in-flight production, but nothing has actually been produced: assets/panels/ holds only a .DS_Store, assets/pages/ and exports/ are empty, and every row in status.csv is 'ready'/'in_progress'/'not_started' with zero locked panels. The four reference PNGs and a folder of throwaway raw-experiment page renders are the entire visual output.
- The four locked references are the only approved art, yet the workflow's step 0 ('lock references first') is the sole completed step of an 8-step golden workflow.
- scripts/ contains only a README — the 'future assembly or utility scripts' do not exist.
- An unmerged local branch docs/chatgpt-image-workflow sits alongside main.
- Content overlap: the sibling repo `static` has an unpushed commit adding ComicBook/MD_Drafts/the-ancestral-dream-thread.md and ~43MB of Vignette 1 art exploration — this project's material is accumulating in the wrong repository.

</details>

### `great-decoupling`

> **⚠ Action needed:** deliverable untracked; docs/*.html committed at 0 bytes

**A research-and-publishing project documenting the post-1973 divergence of US worker productivity from wages and how it dismantled the single-income household, designed as three epistemically-linked layers — a scrolling visual infographic, a narrative essay, and a sourced analytic brief — of which only the infographic exists.**

| | |
|---|---|
| Recommendation | **`index`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Static HTML (single self-contained Google AI Studio export), Markdown research documents, no build tooling, no package manager |
| Deployed | False — https://benwassa.github.io/great-decoupling/ (would serve a blank page) (github-pages (intended, non-functional)) |
| Git | `main` @ 2026-01-13 · 3 uncommitted · 0 unpushed |
| Screenshots in repo | `visuals/components/infographi_v1.png (6.5 MB screenshot of the infographic)` |

Real research with a genuinely striking finished infographic, but nothing is deployed, the Pages site is four empty files, and the single artifact worth showing is not even committed. A text listing is honest today; committing assets/the-great-decoupling.html as docs/index.html is a one-commit change that would promote it to `demo`.

<details><summary>Demo-mode evidence</summary>

- `No package.json, no src/, no application code of any kind — the repo is markdown, PDFs, one PNG and HTML files`
- `grep for demo/template/isDemo/mode= triggers across the repo returns nothing relevant`
- `docs/index.html, docs/visual.html, docs/narrative.html, docs/brief.html are all 0 bytes (verified with ls -l)`

Not an application — a research and publishing project. Demo mode is not a meaningful axis here. The question that matters instead is whether anything renders, and the answer is: exactly one untracked 126 KB standalone HTML infographic.

</details>

<details><summary>Drift findings</summary>

- THE ONLY REAL DELIVERABLE IS NOT IN GIT. `git status` shows `?? assets/` — assets/the-great-decoupling.html (126,707 bytes, the complete scrolling infographic) is untracked and has never been pushed. `git ls-files` confirms assets/ contains no tracked file. Anyone cloning this repo gets nothing renderable.
- The commit titled "feat: add infographic" (1df897c) actually added only research/.DS_Store and a 6.5 MB PNG screenshot — not the infographic HTML. The commit message misdescribes its own contents.
- All four docs/*.html Pages files are committed at 0 bytes; the GitHub Pages site, if enabled, serves blank pages.
- analysis/brief.md, analysis/narrative.md, analysis/notes.md, data/methodology.md and visuals/README.md are all empty stubs. data/raw/ and data/processed/ are empty directories.
- The README's substantive 74-line rewrite is uncommitted (+57/-49 in the working tree); the pushed README is a different document.
- .DS_Store files are tracked in git (root and research/) and .DS_Store shows as modified — no .gitignore exists.
- The infographic embeds AI-generated images from external lh3.googleusercontent.com URLs, which are ephemeral — the one working artifact may already be partially broken.
- README's own methodology declares a claim ledger as the prerequisite for all synthesis; no claim ledger exists. Stalest repo of the six (HEAD 2026-01-13, ~8 months).

</details>

### `mirror-laws`

**A complete ~102,000-word nonfiction manuscript that answers each of Robert Greene's 48 Laws of Power with a 'mirror law' arguing that distributed power outlasts concentrated power — 48 one-file-per-law chapters organised into five Books, voiced through six recurring archetypes, with preface, two front essays, six interludes and a closing essay, plus a Python compiler that assembles the whole thing into a revision document.**

| | |
|---|---|
| Recommendation | **`index`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Markdown manuscript (one file per law), Python + python-docx (docs/build-draft.py) for the revision .docx, EPUB output (Mirror-Laws.epub, committed), A committed Claude skill: .claude/skills/mirror-laws-editorial-guardian/ (SKILL.md + style card, edit taxonomy, pass checklists, active-doc authority) |
| Build | `python docs/build-draft.py (requires python-docx; a local venv/ exists, self-ignored)` |
| Deployed | False   |
| Git | `main` @ 2026-06-27 · 0 uncommitted · 0 unpushed |

Real, finished, substantial work — a complete manuscript with genuine editorial infrastructure — but it is prose, not software: there is nothing to embed, no deploy target, and no product surface a portfolio card could show beyond a cover and a blurb. List it as a writing project with a one-paragraph description; it only graduates to a linked card if a sample chapter or the EPUB is deliberately published somewhere.

<details><summary>Demo-mode evidence</summary>

- `git ls-files: the tree is 100% Markdown manuscript, plus docs/build-draft.py and a committed Mirror-Laws.epub — there is no application, no package.json, no web surface and therefore nothing a demo mode could gate`
- `docs/build-draft.py:1-30 (python-docx compiler: Markdown chapters -> Mirror-Laws-Draft.docx)`

Not applicable by category: this is a book manuscript repository, not software. The 'demo' analogue would be publishing sample chapters as a static site, which nothing here is set up to do.

</details>

<details><summary>Drift findings</summary>

- NO SECRETS, NO PERSONAL DATA: nothing sensitive found — the repo is prose plus a build script. Clean.
- SELF-DOCUMENTED PROVENANCE DRIFT (already handled): docs/status.md:3-5 explicitly warns that 'celebratory subtitles inside the draft files (several of which claim "All 48 Complete") are inaccurate' and names itself the source of truth. The stale claims live in archive/original-drafts/ filenames. This is drift that has been identified and quarantined rather than left to mislead — unusually disciplined.
- README NEXT-STEP IS STALE: README's 'Next Practical Step' says to consolidate the manuscript into a single revision document, but that has since happened twice — Mirror-Laws-Draft.docx (2026-06-13, gitignored) and Mirror-Laws.epub (committed 2026-06-27 in commit 142b9ca 'epub'). docs/status.md is likewise stamped 2026-06-12, before both artifacts.
- INCONSISTENT ARTIFACT POLICY: .gitignore excludes Mirror-Laws-Draft.docx but Mirror-Laws.epub (294 KB binary) is tracked — two generated outputs of the same manuscript treated opposite ways.
- TWO REMOTE BRANCHES ALREADY MERGED: origin/claude/editorial-cleanup-draft-8aq1f0 and origin/claude/mirror-laws-editorial-sprint-6bkcg4 are both 0 commits ahead of main — leftover branch clutter, not lost work.
- DORMANT: last activity 2026-06-27, roughly three months before this audit, and the previous burst of 8 commits all landed on 2026-06-13. 39 commits total.
- IP / PUBLISHING SENSITIVITY: the work is explicitly framed as a chapter-by-chapter response to Robert Greene's 48 Laws of Power. Nothing here is infringing on its face, but publishing the full text on a portfolio site is a publishing decision (rights, prior-publication, and how much to give away) rather than a curation decision.

</details>

### `personal-history-compiler`

**A deterministic Node CLI that parses Google Calendar .ics exports into private month-by-month evidence files, paired with a repo-local agent skill that walks an AI through reconstructing one month of personal history at a time from that evidence.**

| | |
|---|---|
| Recommendation | **`index`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Node.js ESM CLI, node-ical, node:test, Markdown, Claude Code / Codex agent skill (.agents + .claude/skills/reconstruct-month) |
| Build | `npm run compile -- --input ./your-google-calendar-export --calendars "..."` |
| Deployed | False   |
| Git | `main` @ 2026-07-18 · 0 uncommitted · 0 unpushed |

Genuine, well-scoped work with a clear idea, but it is a local CLI over intensely private calendar data: there is nothing to embed, nothing to link to, and no runnable example a visitor could try. It merits a text listing describing the approach rather than a card.

<details><summary>Demo-mode evidence</summary>

- `.gitignore:14`
- `.gitignore:16`
- `.gitignore:17`
- `scripts/compile.mjs`
- `lib/compiler.mjs`

No demo affordance, and there is no UI to host one — the active product is a Node CLI (npm run compile -> scripts/compile.mjs -> lib/compiler.mjs, 256 lines total) plus a repo-local agent skill under .agents/skills/reconstruct-month/. Grep for demo, sample, fixture, seed and mock across lib/, scripts/, test/ and the archived web-app source returns zero hits. The design is deliberately the opposite of a demo: .gitignore excludes *.ics, *.ical/, generated/ and private/, so every input and output is local-only by construction (verified with git check-ignore — the real calendar export, generated/LIFE_CONTEXT.md and private/KNOWLEDGE.md are all correctly ignored and untracked).

</details>

<details><summary>Drift findings</summary>

- Substantial pivot debris: archive/web-app/ still carries a complete Fastify + React + TypeScript + Docker implementation (~40 tracked files) alongside archive/project_state_web_app/'s 10-file snapshot, for a product direction the repo abandoned. The dead archive is several times the size of the 256-line live compiler, so the repo looks larger and more built-out than the active work is.
- README's 'Start here' block tells the user to run --list-calendars then --calendars with exact names, but the repo ships no example export and no fixture, so nothing in the repo is runnable end-to-end by a reader — there is nothing to try.
- generated/ holds 31 year files (1996-2026) plus LIFE_CONTEXT.md and INDEX.md that exist locally but are gitignored; the remote repo therefore shows a tool with no evidence it has ever been run.
- The user's real calendar export (<REDACTED_EMAIL@googlemail.com.ical>/, two .ics files including a family calendar) sits in the working directory — correctly gitignored, but it is live personal data in a repo folder, one .gitignore edit away from exposure.
- Only one test file (test/compiler.test.mjs, 73 lines) for the whole compiler, and the docs/ directory carries six planning documents (VISION, PLAN, APPROACH, two research commissions, SOURCE_DECISIONS) against that 256 lines of implementation — heavily plan-weighted.

</details>

### `Psi`

**A production repo for an unmade narrative audio series on the history of psychology, containing a finished 231-line Episode 1 script, a five-prompt multi-AI research corpus, and a small dependency-free companion website that lets you browse four pre-modern eras either chronologically (Timeline mode) or by recurring concept across cultures (Theme mode).**

| | |
|---|---|
| Recommendation | **`index`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Vanilla HTML/CSS/JS, no framework, no build step, no dependencies, Single JSON content store (docs/assets/data.json) fetched at runtime, Hash-based client-side routing with a GitHub Pages 404.html fallback, Markdown for scripts, research and planning; PDFs for research summaries |
| Build | `None - no package.json and no build. Served statically: `npx serve docs` or `python3 -m http.server --directory docs 5173` (file:// breaks the data.json fetch).` |
| Deployed | False — https://benwassa.github.io/Psi/ (implied, unverified) (github-pages (prepared, not wired)) |
| Git | `main` @ 2025-08-08 · 1 uncommitted · 0 unpushed |
| Screenshots in repo | `content/images/20250807_1110_Symbolic Still Life_simple_compose_01k22h6va0e5frjxdpknhsy6d8.png`, `content/images/20250807_1111_Ethereal Psi Symbol_simple_compose_01k22hampaegkbh9ewah2tgadc.png`, `content/images/20250807_1112_Luminous Psi Symbol_simple_compose_01k22hbz3ees1vy3600kv8y80e.png` |

Honestly assessed, this is abandoned mid-production rather than finished-but-unpublished: the research corpus and the Episode 1 script are genuinely complete, but the thing they were for - the audio - was never started, and the website is a self-declared four-card mockup that tells its own visitors it is under construction. The site would be trivial to host (static, no data, no build), so if it earns a portfolio slot it should be a text listing pointing at the writing, not an embedded iframe whose primary click-through lands on an 'under construction' page; promote it to `demo` only after the placeholder copy and the broken 404 redirect are fixed and there is something behind the episode links.

<details><summary>Demo-mode evidence</summary>

- `docs/index.html:6`
- `docs/index.html:104`
- `docs/index.html:140`
- `docs/assets/app.js:123`
- `docs/assets/data.json:1`

Not applicable rather than missing, and deliberately so. Psi's deployable artefact is a static site with no accounts, no backend, no persistence, no localStorage and no writes of any kind - docs/assets/app.js does exactly two fetches, one for ./assets/data.json (app.js:123) and one for the per-episode HTML fragment (app.js:100), and renders them. There is no real-vs-demo distinction to gate because there is no user state. A case could be made for 'partial' since the whole site openly declares itself provisional - the <title> is 'The Mind Unfolding - Dual-Mode Mockup' (docs/index.html:6), the About modal says 'This prototype demonstrates the UX and interaction model' (docs/index.html:140), and the episode view ships the hardcoded string 'This page is under construction' (docs/index.html:104) - but that is placeholder copy, not a demo affordance. No mode resolver, no fixtures directory, no env trigger, no seed/mock/demo identifier appears anywhere in the repo. The content in data.json (4 timeline eras, 3 themes) is intended final content that is merely thin, not seed data standing in for real data.

</details>

<details><summary>Drift findings</summary>

- The README in the working tree is an uncommitted full rewrite (73 insertions / 169 deletions) never committed or pushed - the README on GitHub is a different, older document. Same pattern as Iris and Ares.
- It is an audio series with no audio. audio/ contains only a README and seven competing markdown drafts of the same Episode 1 script; .gitignore excludes audio/raw/ and audio/processed/ and neither directory exists. Nothing was ever recorded. This is the project's stated core deliverable.
- docs/404.html hard-codes its redirect target as '/Psi/docs/index.html' (both in the meta refresh and in the JS location.replace). If Pages is deployed the documented way - source = branch main, folder = /docs - then docs/ IS the site root and the live index lives at /Psi/index.html, so every 404 would redirect to a second 404. The fallback is broken for the only deployment mode the README describes.
- Seven overlapping Episode 1 drafts (Ep1 v3.1, Ep1 v3, Claude v1, Claude v2, Gemini v1, v2.1, v2) are all committed with no marker of which is canonical except a README sentence; scripts/001-first-episode.md and scripts/002-second-episode.md are 3-line stubs reading '*Dual-narrator script goes here.*' while the real 231-line script sits in audio/drafting/. The README flags this as needing reconciliation and it was never reconciled.
- The site's own copy contradicts any claim that it is finished: title 'Dual-Mode Mockup', About text 'This prototype demonstrates the UX and interaction model', and a literal 'This page is under construction' banner above every episode page.
- Footer reads '(c) 2024 The Mind Unfolding' while all repo activity is 2025 - a copied-template year that was never corrected.
- docs/assets/og-placeholder.png is still the social preview image, so any shared link renders a placeholder card.
- The four docs/content/*.html fragments are genuine 7-9 line summaries, not the episode script - the site and the finished Ep1 script share subject matter but are not connected by any pipeline; data.json and the script would drift independently.
- 10.6 MB of the 21 MB repo is source research material (7.5 MB of AI-generated PNGs in content/images, 3.1 MB of research PDFs) committed directly, with no LFS.
- Two stale remote branches never deleted after merge: origin/codex/add-content-from-research-reports-to-sites and origin/codex/redesign-layout-and-ui-for-index.html (the latter now 0 commits ahead of main).
- Dormant 406 days (HEAD 2025-08-08, today 2026-09-18).

</details>

### `ZEIT`

> **⚠ Action needed:** allowlist is client-side only but documented as access restriction

**A private single-user 'identity operating system' web app: you rank a fixed set of core values, track which life roles are active/partial/emerging/dormant, declare a current season with a theme, plan and review weeks against it, log where you are drifting from your values, and hold long-range desires on a horizon - all synced per-user to Firestore.**

| | |
|---|---|
| Recommendation | **`index`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Vite 5, React 18 (JSX, no TypeScript), Tailwind CSS 3, Firebase 10 (Auth + Firestore + Hosting), vite-plugin-pwa, standard-version |
| Build | `npm run build` |
| Deployed | True — https://zeit-fdbfb.web.app (implied by .firebaserc default project zeit-fdbfb; no custom domain or CNAME in repo) (firebase-hosting) |
| Git | `main` @ 2026-04-22 · 1 uncommitted · 2 unpushed |
| Screenshots in repo | `public/ZEIT.png`, `public/ZEIT_v2.png` |

It is genuinely private single-user software - a hardcoded one-UID gate, Firestore-only persistence, and default content that is the owner's own identity model - so it can neither be embedded nor usefully linked; a visitor sees a sign-in wall and then a rejection screen. It is real, shipped work (v1.1.3, PWA, conventional releases) and deserves a text listing with a screenshot at most.

<details><summary>Demo-mode evidence</summary>

- `src/constants.js:11`
- `src/constants.js:37`
- `src/constants.js:71`
- `src/constants.js:104`
- `src/components/Onboarding.jsx:6`
- `src/IdentityOS.jsx:21`
- `src/IdentityOS.jsx:89`
- `src/firebase.js:29`
- `src/storage.js:4`
- `src/storage.js:11`

No demo, preview or mock mode of any kind. The grep hits on 'seed' are SEED_VALUES / SEED_ROLES / SEED_DESIRES in src/constants.js, which are the DEFAULT_IDENTITY template a real first-time user is initialised from (Onboarding.jsx:6: 'No generic wizard. Identity is seeded from DEFAULT_IDENTITY on first load.') - not demo fixtures, and they are the owner's own value/role taxonomy rather than neutral sample content. Every read and write goes straight to Firestore at users/{uid}/data/{key} behind an awaited ensureAuth() (src/storage.js:4,11), so nothing renders without a real Google sign-in. src/IdentityOS.jsx:21 hardcodes a single-UID allowlist, so no one but the owner can get past the gate at all.

</details>

<details><summary>Drift findings</summary>

- README says 'Access is restricted to an allowlisted set of users', but the allowlist is client-side only: ALLOWED_UIDS in src/IdentityOS.jsx:21 contains exactly one hardcoded UID, while firestore.rules only enforces request.auth.uid == userId. Any Google account can authenticate and write its own users/{uid} subtree; the allowlist is a UI gate, not a security boundary.
- README documents five surfaces (Identity, Season, This Week, Drift, Horizons) but src/views contains six - TodayView.jsx is undocumented.
- 2 unpushed commits on main, one of which is exactly that undocumented feature: 23b7578 'feat: add Today landing surface' plus 9846518 'feat: add UX review document'. Local HEAD is ahead of what is deployed/published.
- 1 untracked file: archive/make-a-plan-to-snug-hejlsberg.md.
- No CI at all - .github contains only copilot-instructions.md. Deploy is a manual `npm run deploy` from a laptop, so the live site's contents are unverifiable from the repo.
- The app's default content is the owner's personal identity model (roles including Partner/Consultant/Son, a personal values ranking); ben-identity-gather.md at the repo root is raw personal material. Anything embedded publicly would display the owner's private self-assessment framework.
- An uncommitted stale remote branch exists: origin/copilot/run-release-patch-and-deploy.

</details>


---

## Recommended `skip` (7)

### `Arbeit_2025`

> **⚠ Action needed:** employer/personal documents; README falsely claims de-identified

**A personal backup of occupational-health research work done at Ontario Health in 2025 (beard/respirator fit studies, a VAC systematic-review screening pilot, WSIB exposure data-cleaning sub-projects) plus the author's internal HR performance-development file.**

| | |
|---|---|
| Recommendation | **`skip`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | R, Markdown, Office documents (PDF/DOCX/XLSX/PPTX) |
| Deployed | False   |
| Git | `main` @ 2025-12-09 · 2 uncommitted · 0 unpushed |
| Screenshots in repo | `Arbeit_2025/Veterans_Administration_Centre_VAC/documentation/VAC_Process Flow_TitleAbstractScreening_horizontal.png`, `Arbeit_2025/WSIB_Exposure_Study/documentation/Consolidated Data Cleaning Process Flow.docx`, `Arbeit_2025/Beard_Study_STT/reports/BPH_STT_ConciseResults.html` |

This is a work/consulting document archive with no runnable artefact, no deploy path and no README-facing narrative; it also carries personal and employer-confidential documents. It is not portfolio material and should arguably be made private rather than indexed.

<details><summary>Drift findings</summary>

- README documents a 'Respirator_Fit_Test_Study_RFS' folder that does not exist in the tree.
- README claims 'All content has been de-identified', but the repo contains signed employer forms, a health-and-safety certificate, an oath of office naming a third party ('MK signed'), insurance/elections confirmations and ID screenshots under Reference_OH/ and Reference_OH/Personal/ — plus named PDP goal documents ('Haddon, Benjamin Peter 2025-26 Goal Setting'). If the GitHub remote is public this is a live privacy exposure.
- Local clone is 3 commits behind origin/main (stale ref, no fetch performed) and has 2 untracked .DS_Store files.
- Employer-owned work product (Ontario Health / WSIB / VAC project material) stored in a personal repo raises an IP/confidentiality question independent of portfolio use.

</details>

### `coffee-chat-os`

> **⚠ Action needed:** .env.local tracked; 14 named third-party personal notes committed

**A deliberately anti-CRM networking tracker for a consulting job hunt: every contact is one glassmorphic card carrying exactly one Next Action (outreach / schedule / prep / follow-up / ask for referral / wait), open job roles are tracked once per company and inherited by all contacts there, and the default view shows only the people who currently have something to do.**

| | |
|---|---|
| Recommendation | **`skip`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `"Load Sample Data" button in the UI (no URL or env trigger)` |
| Seed data / blocks writes / auth isolated | True / False / True |
| Stack | Vite 5, React 18, Tailwind CSS 3 (custom glassmorphism utilities), Firebase 12 (anonymous Auth + Firestore), lucide-react, ESLint + Prettier |
| Build | `npm run build` |
| Deployed | False   |
| Git | `main` @ 2026-02-09 · 0 uncommitted · 0 unpushed |

This is an active personal job-search tool whose repository contains real named third parties' contact details and private conversation notes plus a tracked .env.local, so it must not be embedded, linked, or indexed from a public portfolio; the immediate action is remediation (purge coffeechats/, both CSVs and .env.local from history, add a .gitignore, add firestore.rules), not curation. If the concept is wanted on the portfolio at all, feature coffee-chat-os-v2 instead.

<details><summary>Demo-mode evidence</summary>

- `src/utils/seedData.js:8`
- `src/utils/seedData.js:191`
- `src/components/SeedDataLoader.jsx:5`
- `src/components/SeedDataLoader.jsx:36`
- `src/components/SeedDataLoader.jsx:45`
- `src/App.jsx:138`
- `src/App.jsx:347`
- `src/utils/firebase.js:35`
- `src/components/AuthUI.jsx:5`

There is seed data and a loader button, but no mode gate and no write guard -- so this is partial, and in the worst direction. `SEED_DATA` (src/utils/seedData.js:8) is a hand-converted dump of the owner's OWN 'Job Applications Tracker.csv' -- the file comment says so verbatim: 'Sample seed data converted from Job Applications Tracker.csv / Only includes active/useful statuses (excludes Rejected)'. It carries real employers, real job-posting URLs (blacklineconsulting.ca, ravljobs.applytojobs.ca, shn.wd10.myworkdayjobs.com) and real application dates. The SeedDataLoader button's own subtitle reads 'Has 6 active jobs from your tracker' (SeedDataLoader.jsx:45). So the 'sample' data is not synthetic -- it is the user's live job search. Worse, pressing it does not enter any demo state: `handleLoadSeedData` calls `onLoadSeedData` -> App.jsx:138 `loadSeedData`, which writes straight through to the real Firestore store; there is no isDemo flag, no mode query param, no *_DEMO env var (`.env.example` contains only the six VITE_FIREBASE_* keys), and nothing disables export/import/save. `getSeedData()` (seedData.js:191) returns `people: []` and only the extracted company/role rows, so the button seeds roles but never contacts -- the contact side has no seed at all. Auth is marked isolated only in the narrow sense that src/utils/firebase.js:35 uses `signInAnonymously` and AuthUI.jsx is a stub returning null ('Removed for anonymous auth - no UI needed'); that is anonymity of convenience, not a demo sandbox.

</details>

<details><summary>Drift findings</summary>

- SEVERE PRIVACY EXPOSURE -- 14 files under coffeechats/ are committed to the public repo and are real, named third-party coffee-chat notes exported from Notion: 'Aaron Doerfler', 'Alana Morrone', 'Brianna Forbes-Crowe', 'Jake Janicki', 'Jennifer Wittig', 'Jimmy Yang', 'Kiel Delmundo', 'Nick Patel', 'Nikola Lapenna', 'Robert "Berto" Mill', 'Sarah Sunderji', 'Sunil Verma', 'Will Fu'. Confirmed tracked via `git ls-files`.
- 'Networking & Coffee Chat Tracker.csv' is likewise tracked and contains real names mapped to employers, chat dates and private notes -- e.g. row 2: 'Kiel Delmundo,EY,Ivey Peer,October 23 2025,...,Senior Tech Consultant,,Completed'. 'Job Applications Tracker.csv' is also tracked. These are third parties' data, not just the owner's.
- SECRET LEAK -- `.env.local` is TRACKED in git (`git ls-files` returns it) and holds populated VITE_FIREBASE_* values. Its own first line reads '# Firebase Configuration (DO NOT COMMIT - This file is in .gitignore)' -- but .gitignore contains only `node_modules`, `dist`, `.DS_Store`. The file asserts a protection that does not exist. (Firebase web config is low-sensitivity by design, but the project is thereby identified and, with no firestore.rules in the repo, may be writable by any anonymous client.)
- README says 'LocalStorage for persistence / No backend required' under Tech Stack, and its Project Structure tree lists only main.jsx / App.jsx / index.css. The actual app has 13 components, a Firebase anonymous-auth context, firestoreHooks, and `firebase: ^12.8.0` as a dependency. The README describes a previous architecture.
- FIREBASE_SETUP.md says the app 'uses Firebase Firestore for secure cloud data storage with GitHub authentication'; the code uses anonymous auth (src/utils/firebase.js:35) and AuthUI.jsx is an empty stub. Three documents describe three different auth models.
- src/utils/firebase.js:18 still carries 'TODO: Replace with your Firebase config from Firebase Console' above code that already reads from env.
- A successor repo `coffee-chat-os-v2` exists alongside this one under ~/Github Repos/, which suggests this clone is the superseded generation.
- HEAD is 2026-02-09 -- seven months stale.

</details>

### `CV-Updates`

> **⚠ Action needed:** client-confidential named pursuits in repo

**A private, schema-driven evidence system that consolidates scattered worklogs, ChatGPT-project exports and resume versions into verifiable per-employer/per-project records, from which resumes, interview stories and proposal credentials are derived with traceability back to source.**

| | |
|---|---|
| Recommendation | **`skip`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | Markdown records with a documented schema, Word/PDF resume artifacts, VS Code workspace file |
| Deployed | False   |
| Git | `main` @ 2026-08-14 · 0 uncommitted · 0 unpushed |

A private career and consulting evidence archive holding resumes, a transcript, LinkedIn captures and named client engagements — no code, no deployable artifact, and content that should not be publicly referenced at all.

<details><summary>Demo-mode evidence</summary>

- `No package.json, no source code, no HTML — the repo is 604 tracked files of .md, .docx and .pdf`
- `grep for demo/template/mode= triggers across the repo returns nothing relevant`
- `Top-level layout is README.md, Resume/, records/, profile-snapshots/, documents/, archive/ — a document store, not an application`

Not software. Demo mode does not apply.

</details>

<details><summary>Drift findings</summary>

- Contains identifiable personal and client-confidential material: named consulting engagements at Blackline (municipal IT master plans, child & youth mental-health strategy, disability services strategic planning, FOI modernization), an Ivey academic transcript under documents/education/, LinkedIn profile PDF captures, and dozens of employer-targeted resumes and cover letters (Accenture, Deloitte, EY, IBM, CIBC, Mastercard, AstraZeneca, City of Toronto, Lifemark, Ontario Health). Must never be surfaced on a public portfolio.
- ~17 stale remote branches, mostly `intake/blackline-*` pursuit branches from Aug 2026 plus three `claude/*` agent branches, none merged or cleaned up.
- Contains client pursuit material named by prospect — a confidentiality concern independent of the portfolio question. Worth confirming the GitHub repo is private.
- Local clone is fully clean and in sync (0 uncommitted, 0 unpushed) — no freshness problem, just not portfolio material.

</details>

### `odysseus`

**A self-hosted, local-first AI workspace — a ChatGPT/Claude-style UI you run on your own hardware — bundling chat against local or API models, a tool-using agent, hardware-aware model recommendation and serving, multi-step deep research, blind model comparison, a document editor, vector memory and skills, an IMAP/SMTP inbox with AI triage, notes/tasks and a CalDAV calendar.**

| | |
|---|---|
| Recommendation | **`skip`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `scripts/demo_email/seed_demo_emails.py --reset (idempotent fake mailbox seeding)`; `demo@odysseus.local Dovecot account deliberately has no mbsync channel`; `docs/index.html hover-to-play tour landing page with recorded GIFs` |
| Seed data / blocks writes / auth isolated | True / False / True |
| Stack | Python (app.py, pyproject.toml), @anthropic-ai/sdk, opencode agent runtime, MCP servers, ChromaDB + fastembed, Docker |
| Build | `docker compose up (recommended); python app.py` |
| Deployed | True — none — it is self-hosted software, not a hosted site (self-hosted (Docker Compose / systemd unit / macOS app bundle); docs/ is a marketing landing page) |
| Git | `dev` @ 2026-06-05 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `docs/odysseus.jpg`, `docs/chat.gif`, `docs/research.gif` |

This is somebody else's open-source project cloned to run locally — 905 commits, none by the user — so presenting it as portfolio work would misrepresent authorship. The only honest use would be a 'tools I self-host' note, which is not portfolio material.

<details><summary>Demo-mode evidence</summary>

- `scripts/demo_email/seed_demo_emails.py:1-22`
- `tests/test_companion_pairing.py`
- `docs/index.html`
- `docs/chat.gif`
- `docs/research.gif`
- `docs/compare.gif`
- `README.md:32-33`

Recorded for completeness, but this is upstream's demo tooling, not the user's. seed_demo_emails.py populates a throwaway local-only mailbox with obviously-fake-but-realistic messages (unread/flagged mix, a reply thread, an attachment, a newsletter, a calendar invite, a spammy one) so the email-assistant features can be shown without exposing real mail; --reset makes it deterministic. That plus the GIF-tour landing page is real demo craft, but there is no in-app runtime demo gate and nothing blocks writes, so: partial.

</details>

<details><summary>Drift findings</summary>

- NOT THE USER'S PROJECT. origin is https://github.com/pewdiepie-archdaemon/odysseus.git, not BenWassa. Across 905 commits there are zero authored by this user — `git log --author=haddon` and `--author=BenWassa` both return nothing. Top authors are pewdiepie-archdaemon (125), Afonso Coutinho (110), 'red person' (77). This is a third-party MIT-licensed OSS project cloned for local use.
- An untracked .env (7KB, gitignored) sits in the working tree — a local runtime config for the user's own instance, further evidence this is a deployment, not a contribution.
- Working tree is 3+ months stale (2026-06-05) against an upstream that merges PRs numbered in the 2900s, so the local clone is far behind.

</details>

### `Orion`

**An intended navigation portal for the author's whole project universe - a 'where are you, here is what to read next' router - which currently exists as a single-screen React prototype: five mythic Gate nodes (Skywalker, Sankofa, Agoge, Ares, Orpheus) arranged on a circle, each opening a side panel with a paragraph of flavour text.**

| | |
|---|---|
| Recommendation | **`skip`** (high confidence) |
| Demo mode | **`none`** |
| Seed data / blocks writes / auth isolated | False / False / False |
| Stack | React 18 + TypeScript 5 + Vite 5 (@vitejs/plugin-react), Plain CSS (135 lines across 3 files) - no Tailwind config despite tailwind-merge being a dependency, Declared but entirely unused: react-router-dom 7, lucide-react, clsx, tailwind-merge, Google Fonts (Merriweather, Open Sans) |
| Build | `npm install && npm run build (vite build); also npm run dev, npm run typecheck (tsc --noEmit), npm run preview` |
| Deployed | False   |
| Git | `main` @ 2026-06-12 · 0 uncommitted · 0 unpushed |

As a portfolio artefact this is a scaffold, not a project: one screen, five hardcoded nodes, an alert() where the core feature should be, an orphaned registry, four unused dependencies and no deploy path - there is nothing here a visitor could use and nothing that would survive being embedded. Its actual value is as an input to the Portfolio repo rather than an entry in it: src/data/projects.ts is a curated, typed inventory of 20 projects with status, maturity, medium and audience already modelled, and docs/commission-pack/02_ORION_PROJECT_REGISTRY_DRAFT.md is the prose behind it - worth harvesting for the portfolio's own project metadata even though Orion itself should not get a card.

<details><summary>Demo-mode evidence</summary>

- `src/App.tsx:1`
- `src/components/CoreMap/CoreMap.tsx:6`
- `src/components/CoreMap/CoreMap.tsx:34`
- `src/data/projects.ts:3`

Grepping src/, index.html and vite.config.mts for mode=demo, demoMode, isDemo, _DEMO, mock, fixture, seed, sample-data and localStorage returns zero hits. There is no env file, no .env.example, no mode resolver and no persistence layer of any kind - the only state in the entire app is one React useState holding the currently selected gate (CoreMap.tsx:17). A demo mode would be meaningless here because the app has no real mode to contrast with: everything on screen is hardcoded literals. src/data/projects.ts does look like a seed file - 313 lines, 20 project records with status/maturity/medium/audience fields - but it is NOT seed data for a demo mode, and more importantly it is imported by nothing: grepping src/ for 'ORION_PROJECTS' outside its own definition returns no results. The visible UI is driven instead by a separate 5-element hardcoded `gates` array literal at CoreMap.tsx:6. Recorded 'none' rather than 'partial' because nothing in the repo attempts a real-vs-demo distinction.

</details>

<details><summary>Drift findings</summary>

- The central claim of the architecture is untrue in the code: src/data/projects.ts defines a 20-project registry and README says it 'should be the source of truth for cards, filters, guide results, and future detail pages', but no file imports it. The rendered map reads from a hardcoded 5-element array in CoreMap.tsx:6. TODO.md is honest about this ('The current visible Core Map is still hardcoded and does not consume the registry') - the README is not.
- 1,825 lines of planning documentation in docs/commission-pack/ (8 files: product commission, information architecture, registry draft, sprint plan, design-system brief, build prompt, upgrade review) against 147 lines of live application code once the orphaned registry is excluded. A ~12:1 planning-to-code ratio.
- All four runtime dependencies are unused. react-router-dom 7 is installed but there is no router - TODO.md Phase 3 defers routing. lucide-react, clsx and tailwind-merge appear in no source file, and there is no tailwind.config or postcss.config at all, so tailwind-merge is dependency cargo from a template.
- The two interactive affordances are both non-functional. The centre 'Where Are You?' button - the product's headline feature, the psychological router the whole commission pack is about - fires `alert('Psychological Profiling Quiz initializing...')` (CoreMap.tsx:34). The 'Enter Gate' button in InfoPanel has no onClick handler at all, only a disabled attribute.
- The five Gates displayed and the 20 projects in the registry are different sets with different semantics, and nothing reconciles them - so the visible map is not a view of the inventory it claims to map.
- Registry records have no URL field: grepping projects.ts for liveUrl/repoUrl/url returns nothing, and TODO.md confirms 'Project URLs are not yet audited or present in the registry.' A portal with no links out.
- Two full generations of the same app are kept alongside the third: archive/legacy-static/ (277 lines) and archive/original-scaffold/ (376 lines plus Windows .bat helpers and Python status-generator scripts that will not run on macOS).
- TODO.md records 'npm install --package-lock-only previously reported two npm audit findings' as a deferred item; the lockfile is unaudited and node_modules is present from an install made on or before 2026-06-12.
- vite.config.mts has no `base`, which silently breaks the GitHub Pages deployment the README and TODO both name as the target.
- Phase 0's last unchecked box is 'Create initial GitHub issues from this backlog' - the backlog was never converted into tracked work, and the repo stopped four commits later.
- NOT long-dormant, contrary to the batch premise: HEAD is 2026-06-12, i.e. 98 days idle as of 2026-09-18 - by a wide margin the freshest of the four 'dormant' repos, and the working tree is completely clean.

</details>

### `template-hearth`

**A calm shared watchlist for couples: a pre-seeded shelf of 45 films and shows with posters, a nightly 'Tonight' tray, vibe/energy tagging, and a decision helper that picks something to watch for you.**

| | |
|---|---|
| Recommendation | **`skip`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `none — there is no runtime trigger. The whole repo IS the demo: it is a permanently-forked local-only build with no switch back to a real mode.` |
| Seed data / blocks writes / auth isolated | True / True / True |
| Stack | React 18, Create React App / react-scripts 5 (NOT Vite), Tailwind CSS 3, lucide-react, three.js 0.167, clsx + tailwind-merge |
| Build | `npm run build (DISABLE_ESLINT_PLUGIN=true BUILD_PATH=docs react-scripts build)` |
| Deployed | True — https://benwassa.github.io/template-hearth (GitHub Pages from committed docs/ build output (no Actions workflow — manual build+commit)) |
| Git | `main` @ 2026-01-30 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `public/posters/*.jpg (45 real poster images — good visual material for a card)`, `public/backdrops/`, `hearth_nobg.png (logo, repo root)` |

The demo experience it provides is real and embeddable, but it is now strictly dominated: hearth_v2 (HEAD 2026-08-15) implements the same experience as a proper mode of the live product, with a mode gate, ephemeral state, and auth isolation. Keeping this fork means maintaining a 6.5-month-stale CRA copy of a Vite product to get something the product already does.

<details><summary>Demo-mode evidence</summary>

- `src/app/useAppState.js:99-121 — buildSeedItems() maps every entry of media-map.json into shelf items with stable slug IDs`
- `media-map.json / poster-map.json — 45 seeded titles with local posters under public/posters`
- `src/app/useAppState.js:124-141 — loadItems() re-seeds whenever localStorage key hearth_template_items_v1 is absent or empty`
- `src/app/useAppState.js:241-243 — handleAddItem: notifyUpdate('Adding items is disabled in the template.')`
- `src/app/useAppState.js:246-249 — handleImportItems: 'Importing is disabled in the template.'`
- `src/app/useAppState.js:251-257 — handleExportItems: 'Exporting is disabled in the template.'`
- `src/app/useAppState.js:259-261 — handleSignOut: 'Sign-out is disabled in the template.'`
- `src/views/TonightView.js:598-603 — in-app About copy: 'This is a local-only template build... Add, import, and export are intentionally disabled here.'`
- `grep for 'firebase' across src/ and package.json returns nothing — no auth, no network backend at all`
- `README.md:5-25 — documents local-only, pre-seeded shelf and the three dummy features`

This meets two of the three playbook criteria fully (deterministic-ish seeds, explicit blocking of durable writes) and sidesteps auth entirely by having no Firebase, but it has NO mode gate — the criterion the playbook lists first. It is a hard fork frozen in demo state rather than a mode of a product, so it cannot be flipped back to real behaviour and cannot receive upstream fixes. Seeds are only semi-deterministic: IDs are stable slugs but createdAt/updatedAt are computed from Date.now() at boot (src/app/useAppState.js:100,116-117). Mutations DO persist: the shelf is written to localStorage (hearth_template_items_v1), so a visitor's marks/vibes survive reload and there is no reset-to-seed affordance — unlike hearth_v2 template mode, which is in-memory and resets on refresh.

</details>

<details><summary>Drift findings</summary>

- package.json name is 'hearth' and version 3.7.1 — inherited from the upstream product, so the fork advertises a version number it does not actually track. Upstream hearth_v2 has moved to HEAD 2026-08-15, roughly 6.5 months ahead of this fork's 2026-01-30.
- README calls add/import/export 'dummy features' but the UI still renders full working Add and Import forms (src/views/AddView.js, src/views/ImportModal.js) that only fail at submit time with a toast — a visitor can fill in a whole form before being told it does nothing.
- Dependencies express, cors, dotenv and the DISABLE_ESLINT_PLUGIN build flag are leftovers from the server-backed original; there is no server in this repo.
- Deploy is manual (committed docs/ output, no CI). Three of the five most recent commits are 'Re-add .nojekyll' — the Pages setup was fought with rather than automated.
- Built on react-scripts (CRA), which upstream hearth_v2 has left behind for Vite (hearth_v2 uses import.meta.env / VITE_HEARTH_MODE) — the two codebases can no longer share code without a port.
- Mutations persist to localStorage with no reset control, so a visitor can permanently scramble the demo shelf in their own browser.

</details>

### `template-pushup`

> **⚠ Action needed:** zero seed data — demo renders an empty tracker

**A push-up rep tracker with one-tap logging (+1/+10/+20/+25), undo, a GitHub-style monthly contribution calendar, streak and average stats, and a leaderboard across the usernames stored in your browser.**

| | |
|---|---|
| Recommendation | **`skip`** (high confidence) |
| Demo mode | **`partial`** |
| Triggers | `none — no URL, env, or runtime trigger exists. The fork is permanently and only the local-storage build.` |
| Seed data / blocks writes / auth isolated | False / True / True |
| Stack | React 19, Vite 7, Tailwind CSS 4 (@tailwindcss/postcss), lucide-react, JavaScript (JSX), localStorage persistence, PWA manifest + service worker in public/ |
| Build | `npm run build (lint + vite build); npm run build:pages for the docs/ Pages output` |
| Deployed | True — https://benwassa.github.io/template-pushup/ (GitHub Pages from committed docs/ build output (manual, no Actions workflow)) |
| Git | `main` @ 2026-02-07 · 0 uncommitted · 0 unpushed |
| Screenshots in repo | `public/icon-512.png, public/icon-192.png, public/apple-touch-icon.png (app icons only — no UI screenshots in repo)` |

Upstream the-pushup-challenge-2025 shipped an equivalent demo mode as a real gated mode on 2026-02-07 (src/utils/mode.js), so this fork provides nothing the product does not. And neither build seeds data, so as a portfolio embed it shows an empty tracker either way.

<details><summary>Demo-mode evidence</summary>

- `src/hooks/useAuth.js:1-9 — the entire auth hook is a stub: useState({ uid: 'local-user' }), db: null, loading: false. No Firebase, no sign-in.`
- `src/utils/localStore.js:1 — const STORAGE_KEY = 'pushup_users_v1'; all reads/writes go to localStorage only`
- `src/utils/localStore.js:17-25 — writeUsers() persists to localStorage and dispatches a same-tab event; there is no network write path anywhere in src/`
- `package.json dependencies — only lucide-react, react, react-dom. Firebase is absent, so durable/remote writes are structurally impossible.`
- `grep -riE 'seed|demo|sample|mock' across src/ returns ZERO matches — there is no seeded content of any kind`
- `README.md:1-4 — 'a template version of the PushUp Challenge app that uses browser local storage only. No Firebase, no accounts, no backend.'`
- `README.md:20-22 — documents pushup_users_v1 as the storage key and tells the user to clear it to reset`

Writes are 'blocked' only in the sense that there is no backend to write to — mutations still persist per-browser in localStorage with no reset control in the UI. Critically there is NO seed data: a visitor lands on an empty app, must invent a username, and must tap rep buttons themselves before anything appears. The contribution calendar, streak stats, and leaderboard all render empty on first load, which is close to the worst case for an iframe embed. It is auth-isolated (fake local-user) and has no mode gate.

</details>

<details><summary>Drift findings</summary>

- README advertises a 'Local leaderboard' and 'Monthly contribution calendar' as features, but with zero seed data every one of those surfaces renders empty until the visitor manually logs reps — the README describes the shape of the app, not what a visitor actually sees.
- package.json version is 0.0.0 and name 'template-pushup' while the upstream the-pushup-challenge-2025 is at 1.12.0 — no version relationship is tracked between fork and origin.
- HEAD (2026-02-07) is the same day upstream committed 'Add demo local mode and email-only sign-in flow'. The fork was superseded on the day of its last commit and has received nothing since.
- Deploy is manual committed build output with no CI, so docs/ can silently drift from src/.
- A service worker is shipped (public/sw.js, docs/sw.js) for a build with no offline data story beyond localStorage; combined with committed docs/ this makes stale-cache confusion likely on the Pages URL.

</details>
