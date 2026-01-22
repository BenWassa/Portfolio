# Projects Database – Data Dictionary (Revised)

This document defines the current, authoritative schema for the Projects database after inventory completion and domain normalization. It supersedes earlier drafts.

The goal of this schema is clarity, durability, and separation of concerns: each column answers exactly one question.

---

## 1. Name

- **Type:** Title
- **Role:** Primary identifier
- **Description:** The unique name of the project. In practice, this functions as the database key.
- **Rules:**
  - Required
  - Should match the GitHub repo name exactly when a repo exists
  - Never duplicated or repurposed

---

## 2. Live Site

- **Type:** URL
- **Role:** Runtime reality
- **Description:** A link to a live, deployed version of the project (GitHub Pages, custom domain, StackBlitz, etc.).
- **Rules:**
  - Empty means the project is not currently deployed
  - Presence is the strongest signal that the project is live

---

## 3. Primary Through-line

- **Type:** Select
- **Role:** Conceptual spine
- **Description:** The core philosophical or experiential idea that the project expresses.
- **Allowed values (as used in the CSV):** `PWA`, `Structure over overwhelm`, `Psychology into Experience`, `Narrative as interface`
- **Rules:**
  - Zero or one value per project (projects may leave this blank when no single through-line applies)
  - No secondary through-lines
  - New through-lines should not be added without a clear, documented reason; projects are typically reinterpreted instead

---

## 4. Domain

- **Type:** Select
- **Role:** Structural category
- **Description:** Indicates what kind of project this is at a structural level. Domain is intentionally boring and stable.
- **Authoritative values (observed in the CSV):**
  - `Career systems`
  - `Psychology & behavior`
  - `Narrative & meaning`
  - `Tools & PWAs`
  - `Research & analysis`
  - `Archives`
  - `Templates & infrastructure`
  - `Portfolio & identity`
- **Rules:**
  - Domain does not encode philosophy, audience, lifecycle, or polish
  - New Domain values should not be added without removing or merging an existing one

---

## 5. Status

- **Type:** Select
- **Role:** Lifecycle state
- **Description:** Indicates where the project sits in its lifecycle. This is a workflow signal, not a quality judgment.

**Allowed values (observed in the CSV):**

- **To do:** `Reference`, `Template`, `Concept`
- **In progress:** `Prototype`, `In progress`
- **Complete:** `Draft`, `Active`, `Archive`

**Notes:**
- Observed status values in the CSV include: `Active`, `Concept`, `Draft`, `Prototype`, `Reference`, `Template`, `In progress`, `Archive`.
- Occasional malformed values (e.g., a URL accidentally placed in the Status or Repo Link column) have been observed in the CSV and should be corrected at source.

---

## 6. Visibility

- **Type:** Select
- **Role:** Audience gate
- **Description:** Controls whether the project is intended for public portfolio display, internal tracking, or full archival.
- **Allowed values:** `Portfolio`, `Internal`, `Archive`
- **Rules:**
  - `Portfolio` indicates intentional public-facing relevance
  - `Archive` means hidden from views, not deleted

---

## 7. Project Essence

- **Type:** Text
- **Role:** Semantic anchor
- **Description:** A concise description of what the project really is.
- **Guidelines:**
  - One or two sentences maximum
  - Written for future reference, not marketing
  - Answers: “What is this, really?”

---

## 8. Repo Link

- **Type:** URL
- **Role:** Source of truth for code
- **Description:** Link to the project’s GitHub repository.
- **Rules:**
  - Present whenever a repo exists and should be a valid URL (preferably a GitHub repo URL)
  - Independent of Live Site status
  - Malformed or placeholder values (for example, `https://Reference`) are errors to be fixed in the CSV

---

## Structural Summary

- **Primary Through-line** encodes meaning
- **Domain** encodes structure
- **Status** encodes time and progress
- **Visibility** encodes audience
- **Live Site** encodes deployment reality
- **Repo Link** encodes provenance

Each column has a single responsibility. Overlap is intentionally avoided.

---

## Governance Principles

1. Do not add new Primary Through-lines without a documented, cross-cutting reason; prefer reinterpreting projects. Note: Primary Through-line may be blank for some projects.
2. Treat Domain as a closed set; consolidate rather than expand. Additions (e.g., `Portfolio & identity`) should be deliberate and backward-compatible.
3. Archive projects via Status and Visibility, not deletion.
4. Any project marked `Portfolio` should have a clear Project Essence.
5. Large-scale edits are performed in CSV; Notion is the presentation layer.
6. Fix malformed or misplaced values in the CSV (URLs in non-URL fields, typos in select values) before importing or applying bulk changes.

This schema is designed to remain stable as the project set grows and evolves.
Projects Database – Data Dictionary (Revised)

This document defines the current, authoritative schema for the Projects database after inventory completion and domain normalization. It supersedes earlier drafts.

The goal of this schema is clarity, durability, and separation of concerns: each column answers exactly one question.

⸻

1. Name
	•	Type: Title
	•	Role: Primary identifier
	•	Description:
The unique name of the project. In practice, this functions as the database key.
	•	Rules:
	•	Required
	•	Should match the GitHub repo name exactly when a repo exists
	•	Never duplicated or repurposed

⸻

2. Live Site
	•	Type: URL
	•	Role: Runtime reality
	•	Description:
A link to a live, deployed version of the project (GitHub Pages, custom domain, StackBlitz, etc.).
	•	Rules:
	•	Empty means the project is not currently deployed
	•	Presence is the strongest signal that the project is live

⸻

3. Primary Through-line
	•	Type: Select
	•	Role: Conceptual spine
	•	Description:
The core philosophical or experiential idea that the project expresses.
	•	Allowed values (as used in the CSV):
	•	PWA
	•	Structure over overwhelm
	•	Psychology into Experience
	•	Narrative as interface
	•	Rules:
	•	Zero or one value per project (projects may leave this blank when no single through-line applies)
	•	No secondary through-lines
	•	New through-lines should not be added without a clear, documented reason; projects are typically reinterpreted instead

⸻

4. Domain
	•	Type: Select
	•	Role: Structural category
	•	Description:
Indicates what kind of project this is at a structural level. Domain is intentionally boring and stable.
	•	Authoritative values (observed in the CSV):
	•	Career systems
	•	Psychology & behavior
	•	Narrative & meaning
	•	Tools & PWAs
	•	Research & analysis
	•	Archives
	•	Templates & infrastructure
	•	Portfolio & identity
	•	Rules:
	•	Domain does not encode philosophy, audience, lifecycle, or polish
	•	New Domain values should not be added without removing or merging an existing one

⸻

5. Status
	•	Type: Select
	•	Role: Lifecycle state
	•	Description:
Indicates where the project sits in its lifecycle. This is a workflow signal, not a quality judgment.

Allowed values (observed in the CSV)

To do
	•	Reference
	•	Template
	•	Concept

In progress
	•	Prototype
	•	In progress

Complete
	•	Draft
	•	Active
	•	Archive

Notes:
	•	Observed status values in the CSV include: Active, Concept, Draft, Prototype, Reference, Template, In progress, Archive.
	•	Occasional malformed values (e.g., a URL accidentally placed in the Status or Repo Link column) have been observed in the CSV and should be corrected at source.

⸻

6. Visibility
	•	Type: Select
	•	Role: Audience gate
	•	Description:
Controls whether the project is intended for public portfolio display, internal tracking, or full archival.
	•	Allowed values:
	•	Portfolio
	•	Internal
	•	Archive
	•	Rules:
	•	Portfolio indicates intentional public-facing relevance
	•	Archive means hidden from views, not deleted

⸻

7. Project Essence
	•	Type: Text
	•	Role: Semantic anchor
	•	Description:
A concise description of what the project really is.
	•	Guidelines:
	•	One or two sentences maximum
	•	Written for future reference, not marketing
	•	Answers: “What is this, really?”

⸻

8. Repo Link
	•	Type: URL
	•	Role: Source of truth for code
	•	Description:
Link to the project’s GitHub repository.
	•	Rules:
	•	Present whenever a repo exists and should be a valid URL (preferably a GitHub repo URL)
	•	Independent of Live Site status
	•	Malformed or placeholder values (for example, "https://Reference") are errors to be fixed in the CSV

⸻

Structural Summary
	•	Primary Through-line encodes meaning
	•	Domain encodes structure
	•	Status encodes time and progress
	•	Visibility encodes audience
	•	Live Site encodes deployment reality
	•	Repo Link encodes provenance

Each column has a single responsibility. Overlap is intentional avoided.

⸻

Governance Principles
	1.	Do not add new Primary Through-lines without a documented, cross-cutting reason; prefer reinterpreting projects. Note: Primary Through-line may be blank for some projects.
	2.	Treat Domain as a closed set; consolidate rather than expand. Additions (e.g., "Portfolio & identity") should be deliberate and backward-compatible.
	3.	Archive projects via Status and Visibility, not deletion.
	4.	Any project marked Portfolio should have a clear Project Essence.
	5.	Large-scale edits are performed in CSV; Notion is the presentation layer.
	6.	Fix malformed or misplaced values in the CSV (URLs in non-URL fields, typos in select values) before importing or applying bulk changes.

This schema is designed to remain stable as the project set grows and evolves.