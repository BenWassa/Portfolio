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

export type Project = {
  title: string;
  tag: string;
  desc: string;
  fullDesc?: string;
  href: string | null;
  img: string;
  alt: string;
  theme: ProjectTheme;
  status: ProjectStatus;
  type: ProjectType;
  orientation: ProjectOrientation;

  // REPLACED: techStack: string[] -> techSpecs: TechSpecs
  techSpecs: TechSpecs;
};

export type ProjectDescription = {
  portfolio: string;
  full: string;
};

export type ProjectDescriptions = Record<string, ProjectDescription>;
