import { projectsData, projectDescriptions } from '../js/project-descriptions';
import type { Project } from '../types';

const normalizeKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '');

export const allProjects: Project[] = projectsData.map((project) => {
  const key = normalizeKey(project.title);
  const fullDesc = projectDescriptions[key]?.full;
  return fullDesc ? { ...project, fullDesc } : project;
});

const statusPriority: Record<Project['status'], number> = {
  active: 1,
  draft: 2,
  prototype: 3,
};

export const getSortedProjects = (type: Project['type']) =>
  allProjects
    .filter((project) => project.type === type)
    .sort((a, b) => {
      const statusDiff = statusPriority[a.status] - statusPriority[b.status];
      if (statusDiff !== 0) return statusDiff;
      return a.title.localeCompare(b.title);
    });
