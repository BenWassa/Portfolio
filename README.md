# Portfolio - Benjamin P. Haddon

Portfolio showcasing three throughlines: **Narrative** (mythic frameworks), **Systems** (Progressive Web Apps), and **Psyche** (psychological interfaces).

## Live Site

https://benwassa.github.io/Portfolio/

Built with React, TypeScript, Vite, and Tailwind CSS.

## Project Structure

```
src/
├── index.html                   # Vite HTML entry (Vite root is src/)
├── main.tsx                     # React entry
├── App.tsx                      # App shell and pillars
├── components/                  # Pillar, ProjectCard, ProjectModal, ProjectIndex, ...
├── css/input.css                # Tailwind input CSS
├── data/projects.ts             # Typed data helpers
├── hooks/                       # Custom hooks
├── js/project-descriptions.ts   # Project data & descriptions (single source of truth)
├── types.ts                     # Shared types
└── public/                      # Static assets (project images, icons)

scripts/                         # Build helpers, health check, generators
docs/                            # Agent-facing plans (docs/open, docs/closed) and demo standards
dist/                            # Build output (git-ignored, deployed by Actions)
```

## Setup & Development

### Install Dependencies

```bash
npm install
```

### Development Mode

Watch for changes and serve locally:

```bash
npm run dev
```

- Vite dev server runs on `http://localhost:5173`
- Changes rebuild automatically

### Production Build

Generate optimized assets:

```bash
npm run build
```

- Optimizes project images, regenerates the project docs, then runs `vite build`
- Emits to `dist/` (git-ignored)
- Preview the result with `npm run preview`

### Deploy

There is no manual deploy step. Merging to `main` runs
`.github/workflows/deploy-pages.yml`, which runs `npm ci`, `npm run lint` and
`npm run build`, uploads `dist/` as the Pages artifact, and deploys it to
https://benwassa.github.io/Portfolio/. `main` is protected: work lands through a pull request
(see `CLAUDE.md`). Do not commit build output to the repository.

## Features

✨ **Three-Pillar Interface**
- Narrative (mythic storytelling projects)
- Systems (digital tools & PWAs)
- Psyche (psychological explorations)

🎨 **Premium Design**
- Dark theme with accent colors per project
- Responsive (mobile → desktop)
- Smooth animations & transitions
- Modal detail views

⌨️ **Interactions**
- Click pillars to expand and explore
- ESC to close modal or reset view
- Keyboard support throughout
- Print-friendly export

🔧 **Developer-Friendly**
- Centralized project data layer
- Typed project metadata and props
- React components with reusable structure
- Utility-first CSS (Tailwind)

🚀 **Performance Optimized**
- Lazy loading for below-the-fold images
- Eager loading for above-the-fold content (modals)
- Progressive skeleton loaders with shimmer effects
- Async image decoding (non-blocking)
- Blur-up placeholder transitions
- Infrastructure ready for responsive images (srcset/sizes)

## Projects

`src/js/project-descriptions.ts` is the single source of truth. Each entry has a `type`
(`narrative`, `app` or `psychology`) that decides its pillar, and a `tier`:

- `featured`: a card in the pillar grid, with an image, a detail modal and, where it qualifies,
  an embedded live demo.
- `index`: a text-only entry for the pillar's index list. The index list is currently hidden on
  the site (`ProjectIndex` is kept for reinstatement), so these entries are data only.

For the current card list and what each links to, see
`llm-project-contexts/portfolio-project-docs/INDEX.md` (regenerated on every build) and
`docs/open/INCLUSION-AND-DEMO-WORKPLAN.md` for why each project is in or out.

## Technology

- **HTML5** - Semantic structure
- **Tailwind CSS** - Utility-first, compiled to production-optimized CSS
- **React + TypeScript** - Component-based UI with type safety
- **PostCSS** - Autoprefixing & processing
- **GitHub Pages** - Static hosting, deployed from `dist/` by GitHub Actions

### Image Optimization

- **Build step**: `scripts/optimize-project-images.mjs` runs before `dev` and `build` and writes
  400, 800 and 1200 px WebP variants next to each project image in
  `src/public/assets/projects/` (the `*w.webp` files are git-ignored).
- **Responsive delivery**: cards use `srcset` and `sizes` with the generated variants.
- **Hooks and helpers**: `useImageLoading` handles intersection-observer lazy loading and loading
  state; `src/utils/` provides responsive image props and preloading.
- **Loading UX**: skeleton shimmer, lazy loading for cards, eager loading for modals, and
  `decoding="async"`.

## Configuration

### Update Projects

Edit `src/js/project-descriptions.ts`:

The entry shape and every allowed value (`status`, `type`, `tier`, `demoMode`, `orientation`)
are defined in `src/types.ts`. Copy an existing entry of the same `type` and `tier` as a
starting point rather than writing one from memory. Keep the `export const projectsData` and
`export const projectDescriptions` markers and the literal shape intact, because
`scripts/generate-portfolio-project-docs.mjs` parses the file.

After changing project data, run:

```bash
npm run portfolio:project-docs && npm run portfolio:project-docs:compile
```

Before opening a pull request, `npm run lint`, `npm run format:check` and `npm run build` should
pass (see `CLAUDE.md` section 6).

### Keep Portfolio + LLM Contexts In Sync

Store project context files in `llm-project-contexts/` using the template:
- `llm-project-contexts/LLM_PROJECT_CONTEXT_TEMPLATE.md`

Run sync checks after updating projects or context docs:

```bash
npm run context:check
```

Strict mode (requires a context file for every portfolio project):

```bash
npm run context:check:all
```

The check validates:
- Context project names map to real portfolio projects.
- `Production app` links in context files match `href` in `src/js/project-descriptions.ts`.
- Required context sections exist.

### Auto-Generated Project MD Records

On every `npm run build`, timestamped Markdown records are regenerated for each portfolio project from `src/js/project-descriptions.ts`:

- Folder: `llm-project-contexts/portfolio-project-docs/`
- Index: `llm-project-contexts/portfolio-project-docs/INDEX.md`

Run manually anytime:

```bash
npm run portfolio:project-docs
```

### Multi-Repo LLM Context Rollout

Inventory file:
- `llm-project-contexts/repo-rollout.csv`

First pass dry run:

```bash
npm run context:rollout:dry
```

Execute first pass (clone missing repos, prefill `LLM_CONTEXT.md`, commit/push enabled where `commit_enabled=yes`):

```bash
npm run context:rollout:first
```

Validate first pass repos:

```bash
npm run context:validate:first
```

Optional edge-case generation pass (no commit by default):

```bash
npm run context:rollout:edge
```

### Project Statuses

Projects are categorized by development status, displayed as colored badges in the portfolio:

- **Active** (green): Fully developed, live projects with complete functionality
- **Draft** (yellow): Narrative projects in draft or development phase
- **Prototype** (red): Application/system projects in prototype or development phase

Status affects sorting order (Active first, then Draft, then Prototype) and visual presentation.

For commission/project management (in `commissions/` folder), separate statuses are used:

- **Not started**: Project planning phase, no assets verified
- **In progress**: Assets being audited or generated
- **Completed**: All required assets present and verified

Edit `tailwind.config.cjs`:
- Font families (Space Grotesk, Inter, Cormorant Garamond)
- Colors & spacing
- Animation timings

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Contact

Benjamin P. Haddon - https://benwassa.github.io/
- Reuse or redistribution requires prior written permission. See `docs/LICENSE.md` for details and the permission request process.

## Portfolio health

Run `npm run health` to check every project link and compare source-repo activity
with `lastVerified`. Broken links fail the run. Stale cards (repo pushed after
`lastVerified`), unverified entries, and separate demo templates lagging production by
more than 30 days produce warnings locally.

The scheduled workflow (Mondays 06:17 UTC, or manual dispatch) runs with `--strict`: any
stale card turns the run red and opens or updates one tracking issue titled
"Portfolio health: drift detected" (label `portfolio-health`). The issue closes itself on
the next clean run. Template lag is reported but never gates, because Narrative and
Morpheus are documented sample-demo exceptions. The workflow does not deploy the site.
Private source repositories are reported as not checkable unless a read-only
`PORTFOLIO_HEALTH_TOKEN` is configured; adding a token is optional.

Use `npm run health -- --skip-stale` for link-only checks or
`npm run health -- --threshold-days=60` to change the template warning threshold.
