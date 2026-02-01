# Sprints Plan: Vite + Components Refactor

Goal: migrate the current HTML/CSS/JS portfolio to a component-based Vite app using JSX or TSX to improve maintainability, consistent card behavior, and future iteration speed.

Assumptions
- Keep Tailwind as the styling system.
- Maintain current visual design as baseline, then iterate.
- Build output still deploys to `docs/`.
- Prefer React + Vite unless otherwise specified.

Non-Goals (for refactor phase)
- No full redesign of typography/colors.
- No new content; reuse existing project data and assets.
- No CMS or backend.

Risks
- Visual regressions during layout migration.
- Time cost of reimplementing modal + card interactions.
- Asset path and deploy pipeline changes.

Sprint 0: Discovery + Architecture (1 week)
- Inventory current UI surfaces (cards, modal, pillars, animations).
- Decide stack: React + Vite + TSX (or JSX).
- Define component boundaries and prop interfaces.
- Define data model for projects and modal content.
- Draft acceptance criteria for card layout and modal behavior.

Sprint 1: Scaffold + Data Layer (1 week)
- Create Vite React app (TSX preferred).
- Set up Tailwind and existing typography/fonts.
- Port `project-descriptions.js` into a typed data module.
- Establish routing (if needed) and layout shell.
- Configure build output to `docs/` and verify deploy.

Sprint 2: Card System v2 (1–2 weeks)
- Build `ProjectCard` component with type-driven variants.
- Encode clamp rules, media aspect logic, and CTA positioning.
- Add hover/ambient effects in component-scoped styles.
- Add responsive grid with consistent row behavior.
- Validate across target breakpoints (mobile, 15" laptop, desktop).

Sprint 3: Modal + Interactions (1 week)
- Build `ProjectModal` component with type-based layout.
- Preserve escape key + click-away behavior.
- Ensure a11y roles, focus trapping, and scroll lock.
- Connect card clicks to modal state.

Sprint 4: Polish + Regression Hardening (1 week)
- Visual QA and parity with current UI.
- Tune performance (image loading, suspense if needed).
- Lint, format, and type checks.
- Write a simple visual QA checklist in docs.

Deliverables
- Componentized card + modal system in React (TSX or JSX).
- Project data centralized in typed module.
- Updated build/deploy flow.
- Documented breakpoints and acceptance criteria.

Open Questions
- React + TSX vs React + JSX?
- Keep Tailwind or move to CSS modules?
- Any desire to split into multiple pages or keep single view?

