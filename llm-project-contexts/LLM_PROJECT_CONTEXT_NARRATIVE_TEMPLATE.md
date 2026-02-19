# Narrative LLM Project Context (narrative-template)

Use this as `LLM_CONTEXT.md` when handing Narrative to another LLM.

## 1) Project Snapshot
- Project name: Narrative
- One-line description: Template variant for experimenting with story-role media organization patterns and UX before portfolio-facing release.
- Current status: `prototype`
- Primary owner: Benjamin Haddon
- Public access mode: `public_template` (template variant used to safely stage public-facing changes)
- Last updated (YYYY-MM-DD): 2026-02-19

## 2) Purpose and Scope
- Problem this project solves: Allows rapid design and interaction experiments for Narrative without risking the stable portfolio implementation.
- Target users: Maintainers prototyping alternate flows, information architecture, and interaction models.
- Core outcomes / success criteria:
  - Validate template architecture changes against real workflows.
  - Preserve migration path into canonical repo where appropriate.
  - Keep experiments documented for future consolidation.
- In scope:
  - Experimental architecture and UI/UX patterns.
  - Fast iteration with clear rollback boundaries.
  - Documentation of deltas from canonical implementation.
- Out of scope:
  - Canonical production ownership without explicit promotion decision.
  - Untracked divergence from source project intent.

## 3) Links (Use Full URLs)
- Production app: 
- Staging app: N/A
- Repository: https://github.com/BenWassa/narrative-template
- Main branch: https://github.com/BenWassa/narrative-template/tree/main
- Active working branch: https://github.com/BenWassa/narrative-template/tree/main
- Docs: https://github.com/BenWassa/narrative-template/blob/main/README.md
- Design files: N/A
- Issue tracker / board: https://github.com/BenWassa/narrative-template/issues

## 4) Tech Stack
### Frontend
- Framework: Project-specific (template variant)
- Language: Project-specific
- Styling: Project-specific
- State management: Project-specific

### Backend
- Runtime/framework: As implemented in template repo
- API style (`REST | GraphQL | RPC`): N/A unless explicitly present
- Auth: N/A unless explicitly present

### Data
- Primary database: Local/test data patterns by design
- Caching: Browser/runtime caching as implemented
- File storage: Repository assets and static files

### Tooling
- Package manager: Repo-dependent
- Build tool: Repo-dependent
- Test frameworks: Repo-dependent
- Lint/format: Repo-dependent
- CI/CD: GitHub workflow where configured

## 5) Architecture Overview
- High-level architecture (2-5 bullets):
  - Template-focused branch to de-risk changes before promotion.
  - Modular experimentation around core project workflows.
  - Documentation-first approach to preserve decision history.
- Key folders and purpose:
  - `src/`: experimental app logic and UI
  - `public/` or assets: static resources for preview/testing
- Entry points:
  - App entry: repo-specific frontend entry
  - API entry: repo-specific (if any)
- Important services/modules:
  - Module name: Template adaptation layer
  - Responsibility: Capture variant behaviors intended for later merge/review

## 6) Local Development
- Prerequisites:
  - Node.js and Git (if JS project)
- Install:
  - `npm ci` (or repo equivalent)
- Run:
  - `npm run dev` (or repo equivalent)
- Build:
  - `npm run build` (or repo equivalent)
- Test:
  - `npm test` (or repo equivalent)

## 7) Environment and Secrets
- Required env vars:
  - `KEY_NAME`: document once validated in this variant
- Secret management approach:
  - Local env files + host provider secret controls
- Safe local defaults:
  - Non-sensitive local test values

## 8) External Dependencies
- Third-party APIs/services:
  - Service: project-dependent
  - Why used: metadata/auth/runtime capabilities
  - Rate limits/constraints: follow provider limits
- Vendor SDKs with pinned versions:
  - Track from lockfiles/manifests

## 9) Data Contracts
- Main domain entities:
  - Mirror canonical entities where possible
- API endpoints/events used most:
  - Document divergences from canonical version explicitly
- Validation rules:
  - Keep schema compatibility visible
- Migration notes (if any):
  - Required before promotion into canonical repo

## 10) Product and UX Notes
- Main user flows:
  - Template testing flows for core product behavior
- Critical screens/components:
  - Variant surfaces under active evaluation
- Accessibility requirements:
  - Preserve baseline keyboard/focus/contrast quality
- Performance requirements:
  - Keep experiments representative of production constraints

## 11) Quality and Testing
- Test strategy:
  - Focus regression checks on changed template behaviors
- Current coverage gaps:
  - Template variants may lag canonical coverage
- High-risk areas:
  - Divergence from canonical data contracts and user flow assumptions
- How to verify a change manually:
  - Validate primary flow in template and compare against canonical behavior

## 12) Current Priorities
- Active tasks:
  1. Validate template changes against real user workflows.
  2. Document merge-ready improvements for canonical repo.
  3. Prevent drift between template and production intent.
- Known bugs:
  - Track in repo issues
- Blockers:
  - Canonical selection and merge timing decisions

## 13) Constraints for the LLM
- Do not change:
  - Canonical assumptions without explicit migration plan
- Preferred patterns/conventions:
  - Keep edits minimal, testable, and clearly documented
- Code style rules:
  - Follow repo-local lint and formatting
- Definition of done for PRs:
  - Checks pass and canonical impact is clearly stated

## 14) Suggested Prompt for Another LLM
```text
You are helping on Narrative template repo (narrative-template).

Goals:
1) Preserve compatibility with canonical project behavior.
2) Keep experimental changes isolated and reversible.
3) Document any migration implications clearly.

Project context:
[Paste this file]

Task:
[Describe the specific task]
```

## 15) Optional: Portfolio Metadata
- Public tagline: Experiment first, promote when proven.
- Demo-ready features: Template-specific flow coverage
- Screenshot/GIF links: Add if this variant is showcased
- Resume bullet: Maintained template variant to de-risk architectural evolution
