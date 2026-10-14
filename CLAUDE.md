# CLAUDE.md — Portfolio

Operating rules for agents working in this repository.

## 1. `main` is protected — this is the hard rule

`main` is the published source of truth for https://benwassa.github.io/Portfolio/.

- **Never commit directly to `main`.** No exceptions, including "trivial" doc or typo fixes.
- **Never force-push `main`**, never rewrite its history, never `git reset --hard` a branch that tracks it.
- All work happens on a branch and lands through a **pull request**.
- Do not merge your own PR unless Ben has explicitly approved that specific PR.
- If you find yourself on `main` with uncommitted work: `git checkout -b <branch>` first, then commit.

Branch naming: `feat/…`, `fix/…`, `chore/…`, `content/…`, `infra/…`.

## 2. Work lanes: `docs/open` and `docs/closed`

Agent-facing planning and tracking documents live here.

- `docs/open/` — active plans, audits, decision docs, in-flight work.
- `docs/closed/` — completed work, archived for provenance. Move, don't delete.

One document per workstream. Each carries a front-matter block with `status`, `lane`, `issues`, `owner`.

> **Note:** `docs/` was previously the Vite build output directory. The build now emits to
> `dist/` (git-ignored) and Pages deploys via GitHub Actions. Do not reintroduce build
> artifacts under `docs/`.

## 3. Agent tiers

Work is labelled for one of two lanes. Respect the label.

**`lane:opus` — high-intelligence.** Judgment, taste, architecture, irreversible decisions:
- Which projects appear in the portfolio and how they are positioned.
- Copy, descriptions, pillar taxonomy, information architecture.
- Demo-mode architecture for a given app (state contract parity, seed design, safety guardrails).
- Anything changing the *meaning* of `src/js/project-descriptions.ts`.
- CI/CD, Pages, and branch-protection changes.

**`lane:standard` — regular agent.** Mechanical, specified, verifiable:
- Adding a card once the entry spec is written and approved.
- Screenshot capture, image normalization and optimization.
- Link checking, staleness scans, running generators.
- Doc regeneration, dependency bumps, lint/format fixes.
- Retiring a template repo once its demo mode already exists and is verified.

If a `lane:standard` task requires a judgment call, stop and escalate — do not decide.

## 4. Project data

`src/js/project-descriptions.ts` is the single source of truth for displayed projects.
`scripts/generate-portfolio-project-docs.mjs` parses it; keep the section markers
(`export const projectsData`, `export const projectDescriptions`) intact and the
literal shape parseable.

After changing project data, run:

```bash
npm run portfolio:project-docs && npm run portfolio:project-docs:compile
```

## 5. Demo mode over template repos

Live demos are preferred to forked template repos, because templates drift.
The canonical standard is `docs/DEMO_STATE_PLAYBOOK.md` (imported from `hearth_v2`).
A project qualifies for an iframe `demoUrl` only when it meets that playbook's
acceptance checklist.

Ben approved two existing separate sample-demo exceptions: Narrative uses
`narrative-template`, and Morpheus uses `template-morpheus` (2026-10-02). Their cards
must identify the demos as older sample snapshots; keep `demoMode: 'template'` and
track upstream drift with the health check. This does not authorize new demo forks.

## 6. Before you finish

- `npm run lint` and `npm run format:check` pass.
- `npm run build` succeeds.
- Live URLs you added or changed return HTTP 200.
- Your work lane doc in `docs/open/` is updated to reflect what you actually did.

## 7. Knowledge graph

See `AGENTS.md` for the graphify conventions (`graphify-out/`).

## 8. Brag videos

This repo is the home for `/brag` launch videos across all projects. Output is split per project, and every iteration is kept as a numbered version.

- **Output directory (overrides the skill's default `brag-output/`):** `brag/<project>/v<N>/`, where `<project>` is the lowercase repo or card slug (`hearth`, `hermes`) and `<N>` is the next unused version number (a project's first run is `v1`). Pass it as the output dir when running `/brag`. Never create `brag-output/` or timestamped `brag-output-*` dirs here.
- **Never overwrite or delete a past version.** Any change that produces a new `brag.mp4` (re-roll, new angle, re-cut, re-render) goes in a new `v<N+1>/`. To build on an earlier version, copy what you reuse (scripts, composition) into the new folder and edit the copy; earlier versions stay frozen as rendered.
- From `v2` on, each version's `brag-plan.md` opens with what changed from the previous version and why.
- Each version folder follows the layout in `brag/README.md`: `brag.mp4`, `brag.jpg`, `share-copy.txt`, `brag-plan.md`, `composition-brief.md`, `composition/`, `work/`.
- **Every version gets a row in the table in `brag/README.md`** (version, one-line angle, video, poster, share copy), newest first within each project.
- Keep the bundled music track out of git (`composition/assets/music/` is gitignored for every version; its licence is undocumented). Likewise `work/` intermediates: states, fragments, wavs, raw renders.
- Source projects live in sibling repos (`../hearth_v2`, `../Hermes`). Brag work is read-only against them.
- Normal branch rules apply: `content/…` branch, commit only when asked, never on `main`.
