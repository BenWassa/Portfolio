import React, { useState, useEffect, useRef } from 'react';
import type { Project, ProjectStatus } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const getStatusClasses = (status: ProjectStatus) => {
  switch (status) {
    case 'active':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'draft':
      return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    case 'prototype':
      return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    default:
      return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  }
};

const getStatusLabel = (status: ProjectStatus) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'draft':
      return 'Draft';
    case 'prototype':
      return 'Prototype';
    default:
      return 'Unknown';
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [showFallback, setShowFallback] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card group"
      data-type={project.type}
      style={{ '--accent-color': project.theme.primary } as React.CSSProperties}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        event.currentTarget.style.setProperty('--mouse-x', `${x}px`);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onClick(project);
      }}
    >
      <div className="project-card__media relative">
        {/* Skeleton loader placeholder */}
        {!imageLoaded && !showFallback && (
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse border-b border-white/5 z-10" />
        )}

        {/* Lazy loaded image */}
        {isInView && !showFallback && (
          <img
            src={project.img}
            alt={project.alt}
            className={`project-card__img transition-opacity duration-300 relative z-20 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setShowFallback(true);
              setImageLoaded(true);
            }}
          />
        )}

        {/* Fallback text display */}
        <div
          className={`absolute inset-0 items-center justify-center bg-zinc-900 border-b border-white/5 z-30 ${
            showFallback ? 'flex' : 'hidden'
          }`}
        >
          <span className="text-white/20 font-display font-bold uppercase tracking-widest text-lg">
            {project.title}
          </span>
        </div>
      </div>

      <div className="project-card__content">
        <div className="project-card__meta">
          <span className="project-card__tag">{project.tag}</span>
          <div
            className={`flex items-center gap-2 px-2 py-1 rounded-sm border ${getStatusClasses(
              project.status,
            )}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]"></div>
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
              {getStatusLabel(project.status)}
            </span>
          </div>
        </div>

        <h4 className="project-card__title">{project.title}</h4>
        <p className="project-card__desc">{project.desc}</p>

        <div className="project-card__cta">
          <span className="mr-2">View Details</span>
          <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
};
