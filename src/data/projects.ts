import { projectsData, projectDescriptions } from '../js/project-descriptions';
import type { Project } from '../types';

const normalizeKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '');

export const allProjects: Project[] = projectsData.map((project) => {
  const key = normalizeKey(project.title);
  const fullDesc = projectDescriptions[key]?.full;
  return fullDesc ? { ...project, fullDesc } : project;
});
