# LLM Project Context Template

Use this file as `LLM_CONTEXT.md` in any repo before asking another LLM to work on it.

## 1) Project Snapshot
- Project name:
- One-line description:
- Current status: `active | prototype | draft | archived`
- Primary owner:
- Last updated (YYYY-MM-DD):

## 2) Purpose and Scope
- Problem this project solves:
- Target users:
- Core outcomes / success criteria:
- In scope:
- Out of scope:

## 3) Links (Use Full URLs)
- Production app:
- Staging app:
- Repository:
- Main branch:
- Active working branch:
- Docs:
- Design files:
- Issue tracker / board:

## 4) Tech Stack
### Frontend
- Framework:
- Language:
- Styling:
- State management:

### Backend
- Runtime/framework:
- API style (`REST | GraphQL | RPC`):
- Auth:

### Data
- Primary database:
- Caching:
- File storage:

### Tooling
- Package manager:
- Build tool:
- Test frameworks:
- Lint/format:
- CI/CD:

## 5) Architecture Overview
- High-level architecture (2-5 bullets):
- Key folders and purpose:
  - `src/...`:
  - `...`:
- Entry points:
  - App entry:
  - API entry:
- Important services/modules:
  - Module name:
  - Responsibility:

## 6) Local Development
- Prerequisites:
- Install:
  - `npm ci` (or equivalent)
- Run:
  - `npm run dev` (or equivalent)
- Build:
  - `npm run build` (or equivalent)
- Test:
  - `npm test` (or equivalent)

## 7) Environment and Secrets
- Required env vars:
  - `KEY_NAME`: purpose, example format, required/optional
- Secret management approach:
- Safe local defaults:

## 8) External Dependencies
- Third-party APIs/services:
  - Service:
  - Why used:
  - Rate limits/constraints:
- Vendor SDKs with pinned versions:

## 9) Data Contracts
- Main domain entities:
- API endpoints/events used most:
- Validation rules:
- Migration notes (if any):

## 10) Product and UX Notes
- Main user flows:
- Critical screens/components:
- Accessibility requirements:
- Performance requirements:

## 11) Quality and Testing
- Test strategy:
- Current coverage gaps:
- High-risk areas:
- How to verify a change manually:

## 12) Current Priorities
- Active tasks:
  1.
  2.
  3.
- Known bugs:
- Blockers:

## 13) Constraints for the LLM
- Do not change:
- Preferred patterns/conventions:
- Code style rules:
- Definition of done for PRs:

## 14) Suggested Prompt for Another LLM
```text
You are helping on the project described below.

Goals:
1) Preserve existing architecture and conventions.
2) Prefer minimal, safe changes.
3) Run relevant tests and explain risk.

Project context:
[Paste completed sections from this file]

Task:
[Describe the specific task]
```

## 15) Optional: Portfolio Metadata
- Public tagline:
- Demo-ready features:
- Screenshot/GIF links:
- Resume bullet:
