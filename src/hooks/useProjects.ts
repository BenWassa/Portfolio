import { useMemo } from 'react';
import { getIndexProjects, getSortedProjects } from '../data/projects';
import type { FeaturedProject, IndexProject, ProjectType } from '../types';

export type PillarProjects = {
  featured: FeaturedProject[];
  index: IndexProject[];
};

const forType = (type: ProjectType): PillarProjects => ({
  featured: getSortedProjects(type),
  index: getIndexProjects(type),
});

export const useProjects = (): Record<ProjectType, PillarProjects> =>
  useMemo(
    () => ({
      narrative: forType('narrative'),
      app: forType('app'),
      psychology: forType('psychology'),
    }),
    []
  );
