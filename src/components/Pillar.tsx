import React from 'react';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';

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
  projects: Project[];
  isActive: boolean;
  isInactive: boolean;
  onActivate: (id: string) => void;
  onProjectClick: (project: Project) => void;
}

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
  const secondaryStatus = projects.some((p) => p.status === 'prototype') ? 'prototype' : 'draft';
  const secondaryLabel = secondaryStatus === 'prototype' ? 'Prototype' : 'Draft';
  const gridClassName = hasSquareProjects
    ? 'flex-1 overflow-y-auto overflow-x-hidden no-scrollbar grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 pb-8 w-full pr-6 items-start content-start auto-rows-max'
    : 'flex-1 overflow-y-auto overflow-x-hidden no-scrollbar grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8 w-full pr-6 items-start content-start auto-rows-max';

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

          <div className={gridClassName}>
            {(() => {
              const activeProjects = projects.filter((p) => p.status === 'active');
              const secondaryProjects = projects.filter((p) => p.status === secondaryStatus);

              return (
                <>
                  {activeProjects.length > 0 && (
                    <>
                      <div className="col-span-full">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                          <span className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-400">
                            Active
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-l from-emerald-500/50 to-transparent"></div>
                        </div>
                      </div>
                      {activeProjects.map((project) => (
                        <ProjectCard
                          key={project.title}
                          project={project}
                          onClick={onProjectClick}
                        />
                      ))}
                    </>
                  )}

                  {secondaryProjects.length > 0 && (
                    <>
                      <div className="col-span-full">
                        <div className={`flex items-center gap-2 mb-3 ${activeProjects.length ? 'mt-6' : ''}`}>
                          <div className={`h-px flex-1 bg-gradient-to-r ${
                            secondaryStatus === 'prototype' ? 'from-amber-600/50' : 'from-amber-500/50'
                          } to-transparent`}></div>
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              secondaryStatus === 'prototype' ? 'bg-amber-600 shadow-[0_0_8px_#d97706]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'
                            }`}
                          ></div>
                          <span
                            className={`text-xs font-mono uppercase tracking-wider font-bold ${
                              secondaryStatus === 'prototype' ? 'text-amber-500' : 'text-amber-400'
                            }`}
                          >
                            {secondaryLabel}
                          </span>
                          <div className={`h-px flex-1 bg-gradient-to-l ${
                            secondaryStatus === 'prototype' ? 'from-amber-600/50' : 'from-amber-500/50'
                          } to-transparent`}></div>
                        </div>
                      </div>
                      {secondaryProjects.map((project) => (
                        <ProjectCard
                          key={project.title}
                          project={project}
                          onClick={onProjectClick}
                        />
                      ))}
                    </>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};
