import React from 'react';
import type { FeaturedProject, IndexProject, ProjectStatus } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectIndex } from './ProjectIndex';

interface PillarProps {
  id: string;
  title: string;
  subtitle: string;
  bgImage: string;
  baseColor: string;
  throughline: string;
  heading: string;
  description: string;
  titleClassName?: string;
  headingClassName?: string;
  className?: string;
  projects: FeaturedProject[];
  indexProjects?: IndexProject[];
  isActive: boolean;
  isInactive: boolean;
  onActivate: (id: string) => void;
  onProjectClick: (project: FeaturedProject) => void;
}

// Featured cards are grouped by status, in this order. Every non-empty group gets its own
// divider, so a pillar holding both draft and prototype cards shows both.
const STATUS_GROUPS: {
  status: ProjectStatus;
  label: string;
  line: string;
  text: string;
}[] = [
  { status: 'active', label: 'Active', line: 'from-emerald-500/50', text: 'text-emerald-400' },
  { status: 'draft', label: 'Draft', line: 'from-amber-500/50', text: 'text-amber-400' },
  { status: 'prototype', label: 'Prototype', line: 'from-amber-600/50', text: 'text-amber-500' },
];

export const Pillar: React.FC<PillarProps> = ({
  id,
  title,
  subtitle,
  bgImage,
  baseColor,
  throughline,
  heading,
  description,
  titleClassName,
  headingClassName,
  className,
  projects,
  indexProjects = [],
  isActive,
  isInactive,
  onActivate,
  onProjectClick,
}) => {
  let pillarClasses = `pillar group border-r border-white/5 relative overflow-hidden ${
    className || ''
  }`;
  if (isActive) pillarClasses += ' active';
  if (isInactive) pillarClasses += ' inactive';
  const hasSquareProjects = projects.some((p) => p.orientation === 'square');
  const gridClassName = hasSquareProjects
    ? 'grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 w-full items-start content-start auto-rows-max'
    : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full items-start content-start auto-rows-max';
  const groups = STATUS_GROUPS.map((group) => ({
    ...group,
    projects: projects.filter((p) => p.status === group.status),
  })).filter((group) => group.projects.length > 0);

  return (
    <section
      id={`pillar-${id}`}
      className={pillarClasses}
      onClick={() => onActivate(id)}
      tabIndex={0}
    >
      <div className="absolute inset-0 pointer-events-none">
        <img
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
          src={bgImage}
          alt={`Abstract ${title}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
      </div>

      <div className="pillar-title text-center z-10 pointer-events-none">
        <h2 className={titleClassName} style={{ color: baseColor }}>
          {title}
        </h2>
        <span className="font-display text-xs uppercase tracking-[0.3em] text-white/70">
          {subtitle}
        </span>
      </div>

      <div className="track-content absolute inset-0 flex flex-col z-20 pt-24 pb-10 px-4 md:px-12 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
          <header className="mb-8 shrink-0 animate-fade-in-up">
            <div
              className="text-sm font-mono uppercase tracking-widest mb-2"
              style={{ color: baseColor }}
            >
              {throughline}
            </div>
            <h3 className={headingClassName}>{heading}</h3>
            <p className="mt-4 max-w-xl text-white/60 font-light leading-relaxed">{description}</p>
          </header>

          {/* One scroll area: featured grid, then the index tier (if any).
              -ml-2/pl-2 leaves room for index-row hover/focus rings without moving content. */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-8 pr-6 -ml-2 pl-2">
            <div className={gridClassName}>
              {groups.map((group, groupIndex) => (
                <React.Fragment key={group.status}>
                  <div className="col-span-full">
                    <div className={`flex items-center gap-2 mb-3 ${groupIndex > 0 ? 'mt-6' : ''}`}>
                      <div
                        className={`h-px flex-1 bg-gradient-to-r ${group.line} to-transparent`}
                      ></div>
                      <span
                        className={`text-xs font-mono uppercase tracking-wider font-bold ${group.text}`}
                      >
                        {group.label}
                      </span>
                      <div
                        className={`h-px flex-1 bg-gradient-to-l ${group.line} to-transparent`}
                      ></div>
                    </div>
                  </div>
                  {group.projects.map((project) => (
                    <ProjectCard key={project.title} project={project} onClick={onProjectClick} />
                  ))}
                </React.Fragment>
              ))}
            </div>

            <ProjectIndex pillarId={id} projects={indexProjects} accentColor={baseColor} />
          </div>
        </div>
      </div>
    </section>
  );
};
