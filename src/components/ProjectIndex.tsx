import React from 'react';
import type { IndexProject } from '../types';

interface ProjectIndexProps {
  pillarId: string;
  projects: IndexProject[];
  accentColor: string;
}

const IndexRowContent: React.FC<{ project: IndexProject; linked: boolean }> = ({
  project,
  linked,
}) => (
  <>
    <span className="project-index__title">{project.title}</span>
    <span className="project-index__meta">
      <span className="tabular-nums">{project.year}</span>
      {linked && (
        <span className="material-symbols-outlined project-index__arrow" aria-hidden="true">
          arrow_outward
        </span>
      )}
    </span>
    <span className="project-index__desc">{project.desc}</span>
  </>
);

/**
 * Index tier: a compact, text-only list of a pillar's `tier: 'index'` entries, shown below its
 * featured cards. Renders nothing when the pillar has no index entries.
 */
export const ProjectIndex: React.FC<ProjectIndexProps> = ({ pillarId, projects, accentColor }) => {
  if (projects.length === 0) return null;

  const headingId = `pillar-${pillarId}-index-heading`;

  return (
    <section
      className="project-index"
      aria-labelledby={headingId}
      data-project-index
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
        <h4
          id={headingId}
          className="text-xs font-mono uppercase tracking-wider font-bold text-white/50"
        >
          Index <span className="font-normal text-white/30">· {projects.length}</span>
        </h4>
        <div className="h-px flex-1 bg-gradient-to-l from-white/20 to-transparent"></div>
      </div>

      <ul className="project-index__list">
        {projects.map((project) => (
          <li key={project.title}>
            {project.href ? (
              <a
                className="project-index__row group"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <IndexRowContent project={project} linked />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <div className="project-index__row">
                <IndexRowContent project={project} linked={false} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
