export type ProjectStatus = 'active' | 'draft' | 'prototype';
export type ProjectType = 'narrative' | 'app' | 'psychology';
export type ProjectOrientation = 'landscape' | 'square';

export type ProjectTheme = {
  primary: string;
  secondary: string;
  tertiary: string;
  bg: string;
};

// NEW: The Structured Tech Taxonomy
export interface TechSpecs {
  model: string; // e.g., "Offline-First PWA", "Static Narrative"
  stack: string[]; // The core languages/frameworks (React, TS, Python)
  features: string[]; // The key technical capabilities (IndexedDB, WebGL)
}

/**
 * Where a project is shown.
 * - `featured`: a card in its pillar's grid (image, modal, optional live demo).
 * - `index`: a text-only line in its pillar's index list (name, one line, year, optional link).
 */
export type ProjectTier = 'featured' | 'index';

/**
 * What the card's demo / link actually serves today.
 * - `playbook`: the real product in demo mode per docs/DEMO_STATE_PLAYBOOK.md (e.g. `?mode=demo`).
 * - `live`: `demoUrl` embeds the real production deployment as-is (no auth, no demo layer).
 * - `template`: `demoUrl` or `href` points at a separate template/showcase repo standing in for
 *   the real product in `repoUrl` (drift risk — see docs/DEMO-MODE-METHODS.md).
 * - `none`: no embedded demo — the card links out to the real site, or nowhere.
 */
export type DemoMode = 'playbook' | 'live' | 'template' | 'none';

/** Fields every entry carries, whichever tier it is shown in. */
type ProjectBase = {
  title: string;
  /** Card / index one-liner. */
  desc: string;
  href: string | null;
  /** Pillar the entry belongs to. */
  type: ProjectType;

  // --- Schema v2: freshness metadata (not rendered) ---
  /** Canonical repo of the product the entry represents — not a template or showcase fork. */
  repoUrl?: string;
  /** ISO date (YYYY-MM-DD) the link was loaded and its content confirmed against `repoUrl`. */
  lastVerified?: string;
  demoMode?: DemoMode;
  /** Display year. Required for index entries; optional on cards. */
  year?: number;
};

export type FeaturedProject = ProjectBase & {
  tier: 'featured';
  tag: string;
  fullDesc?: string;
  demoUrl?: string; // Optional: renders a live iframe embed inside the modal instead of the static screenshot
  img: string;
  alt: string;
  theme: ProjectTheme;
  status: ProjectStatus;
  orientation: ProjectOrientation;

  // REPLACED: techStack: string[] -> techSpecs: TechSpecs
  techSpecs: TechSpecs;
};

export type IndexProject = ProjectBase & {
  tier: 'index';
  year: number;
};

/** One entry in `projectsData`. Discriminate on `tier`. */
export type Project = FeaturedProject | IndexProject;

export type ProjectDescription = {
  portfolio: string;
  full: string;
};

export type ProjectDescriptions = Record<string, ProjectDescription>;
