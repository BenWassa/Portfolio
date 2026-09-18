---
status: open
lane: human
updated: 2026-09-18
---

# Security & privacy actions — audit 2026-09-18

Found incidentally while auditing for demo-mode readiness. **Independent of the portfolio
work** — these need handling regardless of what gets displayed.

Ordered by exposure, not by effort.

## 1. `FamilyPlan` — real income figures on the public internet

**Verified directly.** `https://benwassa.github.io/FamilyPlan/assets/strategyDerivations-bXet6h5F.js`
is publicly served and contains `grossIncome:<REDACTED>`, compiled into the bundle at build
time. Cross-checked against `data/output/generated_familyplan.json`, which holds real
6-digit `grossIncome`/`netIncome` and 5-digit `monthlyBurn`/`liquidAssets`.

**The repo being private does not help — GitHub Pages sites are public regardless of
repository visibility.** No credentials needed; anyone with the URL can read it.

- [ ] **Now:** repo Settings → Pages → Source: **None**
- [ ] Then decide: rebuild with synthetic figures (this is exactly what archetype-2 demo
      seeding solves), or keep it permanently unpublished

## 2. `liebestraum` — Firebase admin private key committed

**Verified directly.** `liebestraum-597db-firebase-adminsdk-fbsvc-96dddc02da.json` is
tracked and in history (entered at `1c57b2f`). A real `service_account` credential:
1704-char RSA private key, `<REDACTED_EMAIL@liebestraum-597db.iam.gserviceaccount.com>`.
**Admin SDK credentials bypass `firestore.rules` entirely** — full read/write on that project.

Repo is private, which limits but does not remove exposure.

- [ ] **First: rotate.** Google Cloud Console → IAM → Service Accounts → Keys → delete
      key `96dddc02da`. Scrubbing history while the key is still valid fixes nothing.
- [ ] Then purge from history (`git filter-repo --path <file> --invert-paths`, force-push);
      treat every existing clone as compromised
- [ ] Also rotate `GEMINI_API_KEY`, `GOOGLE_PLACES_API_KEY`, `MAPBOX_GEOCODING_TOKEN` —
      committed as plaintext `value:` entries in `apphosting.yaml` / `apphosting.production.yaml`,
      contradicting the repo's own README instruction to use `secret:` refs

## 3. `coffee-chat-os` — tracked `.env.local` and named third-party notes

**Verified directly. Repo is private** — an audit agent called it public; that was wrong
and is corrected here.

- `.env.local` **is tracked** despite its own first line reading
  "DO NOT COMMIT - This file is in .gitignore". Holds populated `VITE_FIREBASE_*` values
  (web config — public-by-design, but should not be committed).
- 14 files under `coffeechats/` are real, named third-party contact notes exported from
  Notion (personal names in filenames).

- [ ] `git rm --cached .env.local`, add a `.gitignore` rule
- [ ] Decide whether third-party notes belong in a git repo at all
- [ ] Keep private. Hard `skip` for the portfolio.

## 4. Lower severity — worth fixing, not urgent

| Repo | Finding |
|---|---|
| `hestia` | `firestore.rules:47-56` hardcodes three emails including **a second person's Gmail** |
| `Janus` | `.env` is tracked and `.gitignore` has no `.env` rule. Contents benign (`PYTHONPATH=.`) — the *pattern* is the risk |
| `vox-v2` | `vite.config.ts:32` inlines `process.env.GEMINI_API_KEY` into the public bundle via `define`. Nothing reads it and built `dist/` has no `AIza` strings — latent, not live |
| `Arbeit_2025` | README claims "all content has been de-identified"; repo holds signed employer forms, an oath of office naming a third party, insurance/ID scans. Private. Employer-owned work product in a personal repo |
| `CV-Updates` | Client-confidential named pursuits (~17 `intake/blackline-*` branches). Private |
| `static` | `pages.yml` uploads `path: .` — deploying today would publish research PDFs and manuscript drafts alongside the site |

## Confirmed clean

`iroh` (admin key present on disk but correctly gitignored, absent from all 123 commits),
`mirror-laws`, `jarvis-core`, `chefs-journal` (committed Firebase key is web config,
public-by-design).
