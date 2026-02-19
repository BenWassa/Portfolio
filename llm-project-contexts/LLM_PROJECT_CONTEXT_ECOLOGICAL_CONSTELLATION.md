# Ecological Constellation LLM Project Context (ecological-constellation)

Use this as `LLM_CONTEXT.md` when handing Ecological Constellation to another LLM.

## 1) Project Snapshot
- Project name: Ecological Constellation
- One-line description: An interactive personality framework mapping Big Five traits to adaptive ecological strategies.
- Current status: `active`
- Primary owner: Benjamin Haddon
- Last updated (YYYY-MM-DD): 2026-02-18

## 2) Purpose and Scope
- Problem this project solves: Static personality labels flatten context; people need models that capture adaptation across environments.
- Target users: Psychology-curious users, coaches, and learners exploring trait dynamics.
- Core outcomes / success criteria:
  - Translate abstract traits into intuitive strategy maps.
  - Show context-dependent strengths and tradeoffs.
  - Encourage growth over fixed typing.
- In scope:
  - Interactive visualization and explanatory narrative.
  - Trait-to-strategy mapping logic.
  - Readable conceptual onboarding.
- Out of scope:
  - Clinical diagnosis.
  - Rigid personality typing systems.

## 3) Links (Use Full URLs)
- Production app: https://benwassa.github.io/ecological-constellation/
- Staging app: N/A
- Repository: https://github.com/BenWassa/ecological-constellation
- Main branch: https://github.com/BenWassa/ecological-constellation/tree/main
- Active working branch: https://github.com/BenWassa/ecological-constellation/tree/main
- Docs: https://github.com/BenWassa/ecological-constellation/blob/main/README.md
- Design files: N/A
- Issue tracker / board: https://github.com/BenWassa/ecological-constellation/issues

## 4) Tech Stack
### Frontend
- Framework: React
- Language: TypeScript
- Styling: Tailwind CSS
- State management: Project-specific hooks/state patterns

### Backend
- Runtime/framework: N/A (client-first project)
- API style (`REST | GraphQL | RPC`): N/A
- Auth: N/A

### Data
- Primary database: Local-first/browser storage or project-specific backend
- Caching: Browser/runtime caching patterns as implemented
- File storage: Repository assets and static files

### Tooling
- Package manager: npm
- Build tool: Vite
- Test frameworks: N/A
- Lint/format: ESLint
- CI/CD: GitHub + project-specific deploy workflow

## 5) Architecture Overview
- High-level architecture (2-5 bullets):
  - Frontend-driven product with project-specific domain logic.
  - Content and behavior optimized for focused, intentional use.
  - Deployment and runtime simplicity prioritized over infrastructure complexity.
- Key folders and purpose:
  - `src/`: application source, views/components, and domain logic
  - `public/` or assets: static media, icons, and runtime artifacts
- Entry points:
  - App entry: project-specific frontend entry (commonly `src/main.*`, `src/index.*`, or static `index.html`)
  - API entry: N/A unless explicitly present in repo
- Important services/modules:
  - Module name: Core app state and domain modules
  - Responsibility: Encapsulate business logic and user flow transitions

## 6) Local Development
- Prerequisites:
  - Node.js (if JavaScript/TypeScript project)
  - Git
- Install:
  - `npm ci`
- Run:
  - `npm run dev`
- Build:
  - `npm run build`
- Test:
  - `N/A`

## 7) Environment and Secrets
- Required env vars:
  - `KEY_NAME`: project-specific, document once confirmed
- Secret management approach:
  - Local env files + host provider secret controls
- Safe local defaults:
  - Keep dev values non-sensitive and scoped per environment

## 8) External Dependencies
- Third-party APIs/services:
  - Service: Project-specific (if applicable)
  - Why used: Extend metadata, auth, or runtime capabilities
  - Rate limits/constraints: Respect provider limits and fallback behavior
- Vendor SDKs with pinned versions:
  - Maintain current versions as declared in lockfiles/manifests

## 9) Data Contracts
- Main domain entities:
  - Project-specific entities and storage records
- API endpoints/events used most:
  - Project-specific; define once stabilized
- Validation rules:
  - Validate user inputs and persisted object shape before writes
- Migration notes (if any):
  - Track schema changes explicitly when data models evolve

## 10) Product and UX Notes
- Main user flows:
  - Core interaction loop for the project's primary use case
- Critical screens/components:
  - Main landing/interaction surfaces and key detail views
- Accessibility requirements:
  - Keyboard usability, clear contrast, and resilient focus handling
- Performance requirements:
  - Fast startup, responsive interactions, and lightweight rendering paths

## 11) Quality and Testing
- Test strategy:
  - Use existing unit/integration checks where available; add focused regression tests for changed behavior
- Current coverage gaps:
  - End-to-end narrative/user-flow tests may be limited
- High-risk areas:
  - Data persistence pathways, migration logic, and major UX flow transitions
- How to verify a change manually:
  - Run primary user flow end-to-end and confirm no regressions in core screens

## 12) Current Priorities
- Active tasks:
  1. Keep documentation current with actual architecture and runtime behavior.
  2. Preserve project intent while improving maintainability.
  3. Reduce friction for future contributors and LLM agents.
- Known bugs:
  - Track in repo issues as discovered
- Blockers:
  - Primary first-pass portfolio repository.

## 13) Constraints for the LLM
- Do not change:
  - Public contract behaviors, key URLs, or data shapes without explicit migration notes
- Preferred patterns/conventions:
  - Minimal, targeted edits that follow existing structure
- Code style rules:
  - Use the repo's lint/format conventions
- Definition of done for PRs:
  - Relevant checks pass, manual flow verified, and context docs updated

## 14) Suggested Prompt for Another LLM
```text
You are helping on Ecological Constellation (ecological-constellation).

Goals:
1) Preserve architecture and product intent.
2) Make the smallest safe change possible.
3) Validate risk before finalizing.

Project context:
[Paste this file]

Task:
[Describe the specific task]
```

## 15) Optional: Portfolio Metadata
- Public tagline: Personality as adaptation, not a box.
- Demo-ready features: Core flow, stable primary UI, and representative sample data
- Screenshot/GIF links: Add when curated media set is finalized
- Resume bullet: Built and iterated Ecological Constellation as a focused product with strong UX intent and technical clarity
