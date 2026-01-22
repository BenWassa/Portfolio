# Projects Database – Data Dictionary

This document defines the schema, intent, and governance rules for the Projects database. It is the single source of truth for how fields are used and how meaning is encoded.

---

## 1. Name
	-	Type: Title
	-	Role: Primary key (conceptual)
	-	Description:
The unique identifier for each project. In practice, this functions as the database key.
	-	Rules:
	-	Required
	-	Should exactly match the repo slug when a GitHub repository exists
	-	Never duplicated or repurposed

---

## 2. Live site
	-	Type: URL
	-	Role: Runtime / deployed experience
	-	Description:
A link to the live, deployed version of the project (e.g., GitHub Pages, custom domain, StackBlitz).
	-	Rules:
	-	Empty means the project is not currently deployed
	-	Presence is the strongest signal that a project is live

---

## 3. Primary through-line
	-	Type: Select
	-	Role: Conceptual spine
	-	Allowed values:
	-	PWA
	-	Structure over Overwhelm
	-	Psychology into Experience
	-	Narrative as Interface
	-	Rules:
	-	Exactly one value per project
	-	No secondary through-lines
	-	New through-lines should not be added; projects should be reinterpreted instead

---

## 4. Domain
	-	Type: Select
	-	Role: Functional or topical category
	-	Description:
Broad classification of what the project is about or what space it operates in.
	-	Notes:
	-	This field is intentionally flexible and expected to evolve
	-	Currently the most prone to sprawl
	-	Governance:
	-	Add new domains reluctantly
	-	If unsure, do not add a new value yet
	-	Domain should not compete with the Primary through-line in meaning

---

## 5. Status
	-	Type: Select
	-	Role: Lifecycle state
	-	Description:
Indicates where the project sits in its lifecycle. This is a workflow signal, not a quality judgment.

## Allowed values

### To do
-	Reference
-	Template
-	Concept

### In progress
-	Prototype
-	In progress

### Complete
-	Draft
-	Active
-	Archive

---

## 6. Visibility
	-	Type: Select
	-	Role: Audience gate
	-	Allowed values:
	-	Portfolio
	-	Internal
	-	Archive
	-	Description:
Controls whether a project is meant to be surfaced publicly, kept internal, or hidden from most views.
	-	Notes:
	-	Portfolio does not necessarily mean Live, though they often overlap
	-	Archive here means hidden from views, not deleted

---

## 7. Project essence
	-	Type: Text
	-	Role: Semantic anchor
	-	Description:
A short description capturing what the project really is.
	-	Guidelines:
	-	One or two sentences maximum
	-	Written for future reference, not marketing
	-	Should answer: “What is this, really?”

---

## 8. Repo link
	-	Type: URL
	-	Role: Source of truth for code
	-	Description:
Link to the project’s GitHub repository.
	-	Rules:
	-	Present even if no Live site exists
	-	Internal projects still retain a repo link

---

## Structural Summary
	-	Primary through-line encodes meaning
	-	Domain encodes category
	-	Status encodes time and progress
	-	Visibility encodes audience
	-	Live site encodes reality (deployment)
	-	Repo link encodes provenance

Together, these fields separate concerns cleanly and prevent conceptual overlap.

---

## Governance Principles
	1.	Do not add new Primary through-lines.
	2.	Treat Domain as provisional and iterative.
	3.	Archive projects by Status and Visibility, not deletion.
	4.	Any project marked Portfolio should have a clear Project essence.

This schema prioritizes clarity, durability, and intentional curation over exhaustiveness.