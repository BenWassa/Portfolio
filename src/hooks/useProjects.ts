import { useMemo } from 'react';
import { getSortedProjects } from '../data/projects';
import type { Project } from '../types';

export const useProjects = (): {
  narrative: Project[];
  app: Project[];
  psychology: Project[];
} =>
  useMemo(
    () => ({
      narrative: getSortedProjects('narrative'),
      app: getSortedProjects('app'),
      psychology: getSortedProjects('psychology'),
    }),
    [],
  );
