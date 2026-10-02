import { projectsData, projectDescriptions } from '../js/project-descriptions';
import type { FeaturedProject, IndexProject, Project } from '../types';

const normalizeKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '');

export const allProjects: Project[] = projectsData.map((project) => {
  if (project.tier !== 'featured') return project;
  const key = normalizeKey(project.title);
  const fullDesc = projectDescriptions[key]?.full;
  return fullDesc ? { ...project, fullDesc } : project;
});

const statusPriority: Record<FeaturedProject['status'], number> = {
  active: 1,
  draft: 2,
  prototype: 3,
};

/** Featured cards for one pillar: by status, then title. */
export const getSortedProjects = (type: Project['type']): FeaturedProject[] =>
  allProjects
    .filter((project): project is FeaturedProject => project.tier === 'featured')
    .filter((project) => project.type === type)
    .sort((a, b) => {
      const statusDiff = statusPriority[a.status] - statusPriority[b.status];
      if (statusDiff !== 0) return statusDiff;
      return a.title.localeCompare(b.title);
    });

/** Index lines for one pillar: newest year first, then title. */
export const getIndexProjects = (type: Project['type']): IndexProject[] =>
  allProjects
    .filter((project): project is IndexProject => project.tier === 'index')
    .filter((project) => project.type === type)
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
