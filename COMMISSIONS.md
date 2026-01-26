# COMMISSION 01

## Portfolio Visual Unification & Asset Audit

### Status: Deferred
### Execution Mode: Manual-first, AI-assisted where useful
### Estimated Effort: 6–10 focused hours across sessions

## Objective

Create a fully unified visual asset system across all portfolio projects, ensuring every project has the correct imagery for its role in the portfolio, while preserving conceptual integrity and avoiding AI hallucination or asset misclassification.

---

## Scope

### 1. Visual Asset Audit (Manual)
    For each project, manually verify and check off:
    - Hero image (3:2 landscape)
    - App / project icon (1:1)
    - Screenshot availability (desktop / mobile)
    - Conceptual vs literal imagery alignment

    You will be the source of truth. AI does not decide asset presence.

---

### 2. Hero Image Normalization
    - Rename and standardize existing landscape images as _hero
    - Identify projects missing heroes
    - Flag hero type needed:
    - Bespoke (narrative)
    - Template-generated (systems / utilities)
    - Placeholder (concept-stage)

---

### 3. Hero Generation (Selective AI Use)
    - Use AI or design tools only for:
    - Template-based heroes
    - Background textures
    - Abstract system visuals
    - No automated bulk generation without review
    - Each generated hero manually approved or rejected

---

### 4. Screenshot Curation
    - Capture or select 1–2 screenshots max per applicable project
    - Screenshots live only in modal
    - Clearly label:
    - Desktop
    - Mobile
    - Demo version (if applicable)

---

### 5. Asset Folder Unification
    Standardize structure per project:

    ```
    /assets/projects/{project}/
      hero.png
      icon.png
      screen_01.png
      screen_02.png
    ```

---

## Explicit Non-Goals
- No automated repo scanning for assets
- No AI "guessing" what exists
- No visual redesign of the portfolio layout
- No new project branding work beyond required heroes

---

## Success Criteria
- Every project visually conforms to the same contract
- Cards feel unified without flattening identity
- Narrative, system, and utility projects read correctly at a glance
- No ambiguity about what is missing or placeholder

---

# COMMISSION 02

## Tech Stack Inventory & Visual Encoding

### Status: Deferred
### Execution Mode: Manual research, AI summarization allowed
### Estimated Effort: 4–6 focused hours

## Objective

Build a trustworthy, minimal, and visually legible tech stack layer for each portfolio project that reflects real implementation details and technical evolution across repos.

---

## Scope

### 1. Repo-Level Tech Stack Audit (Manual)
    For each project:
    - Review repo structure
    - Identify:
    - Frameworks
    - Styling approach
    - State / storage method
    - Platform assumptions
    - Cross-check against actual code, not memory

    AI may assist summarizing once facts are confirmed.

---

### 2. Stack Normalization
    Reduce each project's stack to 3–5 dominant technologies max.

    Rules:
    - No dependency dumping
    - No aspirational tools
    - No "used once" libraries
    - No cloud services unless architecturally essential

---

### 3. Stack Taxonomy
    Standardize naming across projects:
    - "Vanilla JavaScript" vs "JavaScript"
    - "IndexedDB" vs "Local Storage"
    - "Static Site" vs "PWA"

    This avoids visual noise and inconsistency.

---

### 4. Visual Encoding
    - Select or curate SVG / vector PNG icons
    - Single-color, neutral style
    - Tooltips only for labels
    - Modal-only placement

    No stack icons on cards.

---

### 5. Data Integration
    Add to project metadata:

    ```
    stack: ["JavaScript", "React", "Tailwind", "IndexedDB"]
    ```

    Icons resolved at render time, not hardcoded.

---

## Explicit Non-Goals
- No skill ratings
- No "AI-powered" labels
- No version numbers
- No performance claims
- No cloud logos unless unavoidable

---

## Success Criteria
- Tech stack is accurate and defensible in interviews
- Stack visuals reinforce evolution, not overwhelm
- Older projects read as era-appropriate, not incomplete
- Modal remains clean and scannable

---