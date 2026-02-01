export type ProjectStatus = 'active' | 'draft' | 'prototype';
export type ProjectType = 'narrative' | 'app' | 'psychology';

export type ProjectTheme = {
  primary: string;
  secondary: string;
  tertiary: string;
  bg: string;
};

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
};

export type ProjectDescription = {
  portfolio: string;
  full: string;
};

export type ProjectDescriptions = Record<string, ProjectDescription>;
