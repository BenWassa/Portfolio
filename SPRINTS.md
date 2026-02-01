# Sprints Plan: React + TypeScript Migration

Goal: Migrate the current Vite + vanilla JS portfolio to a component-based React + TypeScript app to improve maintainability, type safety, consistent card behavior, and future iteration speed.

## Current State (v1.2.0)
- ✅ Vite build system already in place
- ✅ Tailwind CSS configured and working
- ✅ ES6 modules with centralized project data
- ✅ Build output deploys to `docs/`
- ✅ Status system refactored (active, draft, prototype)
- ✅ Linting and formatting tools configured (ESLint, Prettier)

## Assumptions
- Keep existing Vite configuration as foundation.
- Keep Tailwind as the styling system.
- Maintain current visual design as baseline, then iterate.
- Build output still deploys to `docs/` for GitHub Pages.
- Migrate to React + TypeScript (TSX).

## Non-Goals (for refactor phase)
- No full redesign of typography/colors.
- No new content; reuse existing project data and assets.
- No CMS or backend.
- No routing (single-page app preserved).

## Risks
- Visual regressions during layout migration.
- Time cost of reimplementing modal + card interactions.
- Type definition overhead for project data model.
- Potential asset path changes during component migration.

## Sprint 0: TypeScript Foundation (3-5 days)
**Goal:** Set up TypeScript infrastructure without breaking current build.

**Tasks:**
- [x] Install React, ReactDOM, and TypeScript dependencies
- [x] Install type definitions (@types/react, @types/react-dom)
- [x] Configure `tsconfig.json` with strict mode
- [x] Update Vite config for React + TypeScript
- [x] Create type definitions for project data model
- [x] Migrate `project-descriptions.js` to `project-descriptions.ts` with full types
- [ ] Verify build still outputs to `docs/` correctly

**Acceptance Criteria:**
- TypeScript compiles without errors
- Existing vanilla JS still works during migration
- Build output remains compatible with GitHub Pages

---

## Sprint 1: Core Component Migration (1 week)
**Goal:** Convert main app structure to React components.

**Tasks:**
- [ ] Create React app shell (`App.tsx`, `main.tsx`)
- [ ] Port HTML structure to JSX layout components
- [ ] Build `ProjectCard` component with typed props
- [ ] Implement status badge logic in component
- [ ] Preserve existing Tailwind classes and styles
- [ ] Set up proper prop drilling or context for project data

**Acceptance Criteria:**
- All projects render in cards with correct layout
- Status badges (active/draft/prototype) display correctly
- Hover effects and accent colors work as before
- No visual regressions from current version

---

## Sprint 2: Interactive Features (1 week)
**Goal:** Rebuild modal and interaction patterns in React.

**Tasks:**
- [ ] Build `ProjectModal` component with TypeScript props
- [ ] Implement modal state management (useState or context)
- [ ] Add keyboard navigation (ESC key, tab focus)
- [ ] Implement click-away to close behavior
- [ ] Add focus trapping and scroll lock
- [ ] Connect card clicks to modal state
- [ ] Port pillar expansion/collapse logic to React state

**Acceptance Criteria:**
- Modal opens/closes smoothly with animations
- Keyboard navigation works (ESC, focus trap)
- Accessibility attributes preserved (ARIA roles, labels)
- No layout shift or scroll bugs

---

## Sprint 3: Data Layer & Sorting (3-5 days)
**Goal:** Centralize project filtering, sorting, and type organization.

**Tasks:**
- [ ] Create typed utilities for project filtering by type
- [ ] Implement status-based sorting logic
- [ ] Add project grouping by pillar (narrative/systems/psyche)
- [ ] Create custom hooks for project data access
- [ ] Verify sorting order: active → draft → prototype

**Acceptance Criteria:**
- Projects sort correctly by status
- Type filtering works (narrative, app, psychology)
- Data layer is fully typed with TypeScript
- No runtime errors from type mismatches

---

## Sprint 4: Polish & Performance (1 week)
**Goal:** Visual QA, optimization, and production readiness.

**Tasks:**
- [ ] Visual parity check against current v1.2.0
- [ ] Optimize image loading (lazy loading, suspense)
- [ ] Add loading states for async operations
- [ ] Run Lighthouse audit and address issues
- [ ] ESLint + Prettier pass on all TypeScript files
- [ ] Update README with new tech stack details
- [ ] Test deploy to GitHub Pages

**Acceptance Criteria:**
- No visual regressions
- Lighthouse score ≥90 for performance, accessibility
- All linting rules pass
- Build size comparable or smaller than v1.2.0
- Successful deployment to GitHub Pages

---

## Deliverables
- ✅ Componentized card + modal system in React + TypeScript
- ✅ Fully typed project data model with interfaces
- ✅ Preserved Vite build/deploy flow to `docs/`
- ✅ Maintained visual parity with v1.2.0
- ✅ Improved maintainability and type safety
- ✅ Documentation for component architecture

---

## Post-Migration Enhancements (Future Sprints)
After successful TypeScript migration, consider:

1. **Component Library Extraction**
   - Extract reusable components (Card, Modal, Badge)
   - Create Storybook for component documentation
   - Build design system documentation

2. **Enhanced Interactivity**
   - Add filtering by status or type
   - Implement search functionality
   - Add project comparison view

3. **Performance Optimization**
   - Image optimization pipeline
   - Progressive image loading
   - Code splitting by route (if routing added)

4. **Analytics & Insights**
   - Add privacy-respecting analytics
   - Track project interaction patterns
   - A/B test card layouts

---

## Migration Checklist

### Pre-Migration
- [x] Current version (v1.2.0) stable and deployed
- [x] Status system updated (active/draft/prototype)
- [x] ESLint and Prettier configured
- [x] Vite build pipeline working

### During Migration
- [ ] Create feature branch for TypeScript migration
- [ ] Incremental commits for each sprint
- [ ] Regular visual regression testing
- [ ] Maintain working vanilla JS version until React version complete

### Post-Migration
- [ ] Merge to main branch
- [ ] Update version to v2.0.0
- [ ] Deploy to GitHub Pages
- [ ] Archive vanilla JS version in `archive/v1.2.0/`
- [ ] Update README and documentation

---

## Decision Log

**React + TypeScript: Why?**
- Type safety prevents runtime errors with project data
- Component reusability for future iterations
- Better developer experience with autocomplete
- Industry standard for maintainable web apps
- Existing Vite setup makes migration smooth

**Keep Tailwind: Why?**
- Already configured and working well
- Utility-first approach proven effective
- No need to rebuild styling system
- Easy to maintain responsive design

---

## Sprint 0 Notes (Pre-Migration Assessment)

### CSS Strategy (Cinematic Feel)
- Keep `input.css` largely as-is for now.
- Avoid converting existing transitions to Framer Motion during Sprint 1.
- In React, toggle `.active` / `.inactive` class names to trigger existing CSS.

### State Management
- Use `useState` (or a small context) for active pillar + modal state.
- No Redux/Zustand needed.

### Data Structure
- Keep `Project` interfaces in TypeScript.
- Optionally merge `projectsData` + `projectDescriptions` later, or hydrate on demand.

### Open Questions (Refined)
- Animation library: no (for now).
- State management library: no.
- Markdown modal content: yes, but defer to Sprint 4.

**Single-Page App: Why?**
- Current design works well as SPA
- GitHub Pages deployment simpler
- No routing complexity needed yet
- Fast user experience without page loads

**Status System Design:**
- `active`: Live, production-ready projects
- `draft`: Narrative/psychology projects in development
- `prototype`: App/system projects in prototype phase
- Sorting priority ensures best work shown first

---

## Open Questions
- ~~React + TSX vs React + JSX?~~ **Decision: React + TypeScript (TSX)**
- ~~Keep Tailwind or move to CSS modules?~~ **Decision: Keep Tailwind**
- ~~Any desire to split into multiple pages or keep single view?~~ **Decision: Keep SPA**
- Should we add animation library (Framer Motion) or keep custom CSS?
- Do we need state management library (Zustand, Redux) or just React hooks?
- Should modal content be markdown-based for easier content updates?
