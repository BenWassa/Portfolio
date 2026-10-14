# Hermes - Portfolio Project Record

Generated: 2026-10-14T01:40:20.001Z
Source: `src/js/project-descriptions.ts`
Branch: content/link-cards-batch-2
Commit: 28ba5f1
Project slug: `hermes`

## Snapshot
- Title: Hermes
- Tier: `featured`
- Tag: Morning Newspaper
- Status: `active`
- Type: `app`
- Orientation: `square`
- Year: (not set)
- Live URL: https://benwassa.github.io/Hermes/
- Demo URL: (not set)
- Demo mode: `none`
- Repo URL: https://github.com/BenWassa/Hermes
- Last verified: 2026-10-13
- Image path: `assets/projects/hermes.png`
- Image alt: Hermes - The Daily morning newspaper

## Core Description
- Card description: An overnight pipeline that publishes a finite Toronto morning newspaper and sends one push.
- Portfolio summary: An autonomous pipeline that assembles a personalized Toronto morning newspaper overnight, publishes it as one static page and pushes a single notification.
- Full description: Hermes publishes The Daily, a finished morning paper for one reader in Toronto. Overnight, a GitHub Actions job pulls world and business stories from the Guardian, NYT and Perigon APIs, adds Toronto local news from RSS, and makes one Gemini call to dedupe, section, rank and summarise them. The result is injected into a single static HTML page, deployed to GitHub Pages and announced with one ntfy push. It is built to be finite - a front page, five desks and a short list of followed writers called Voices - and a weekly job screens their new writing into a digest of at most three pieces. The page is an installable shell with a service worker, and a deterministic test suite runs against recorded fixtures rather than the live network. The published page is the live product, so the card links out instead of embedding a demo.

## Technical Profile
- Model: Autonomous Overnight Pipeline
- Stack: `Python`, `Gemini`, `GitHub Actions`, `Vanilla JS`
- Key features:
- Daily Static Edition
- Weekly Voices Digest
- Installable Offline Shell

## Theme
- Primary: `#c8493c`
- Secondary: `#1a2744`
- Tertiary: `#121c33`
- Background: `#0b1222`
