import React, { useState, useEffect, useRef } from 'react';
import type { Project, ProjectStatus } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

// Keep helper for Square cards only
const getStatusClasses = (status: ProjectStatus) => {
  switch (status) {
    case 'active': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'draft': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    case 'prototype': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  }
};

const getStatusLabel = (status: ProjectStatus) => {
  switch (status) {
    case 'active': return 'Active';
    case 'draft': return 'Draft';
    case 'prototype': return 'Prototype';
    default: return 'Unknown';
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [showFallback, setShowFallback] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    event.currentTarget.style.setProperty('--mouse-x', `${x}px`);
  };

  // --- RENDER LOGIC ---

  // 1. THE "GOLD" STANDARD (Square/Systems) - UNTOUCHED LAYOUT
  if (project.orientation === 'square') {
    return (
      <div
        ref={cardRef}
        className="project-card group"
        data-type={project.type}
        data-orientation="square"
        style={{ '--accent-color': project.theme.primary } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onClick={(e) => { e.stopPropagation(); onClick(project); }}
      >
        <div className="project-card__media relative">
          {isInView && (
            <img
              src={project.img}
              alt={project.alt}
              className="project-card__img"
              loading="lazy"
            />
          )}
        </div>

        <div className="project-card__content">
            {/* Meta, Title, Desc, CTA - All preserved for Systems */}
            <div className="project-card__meta">
                <span className="project-card__tag">{project.tag}</span>
                <div className={`flex items-center gap-2 px-2 py-1 rounded-sm border ${getStatusClasses(project.status)}`}>
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
  }

  // 2. THE CINEMATIC MINIMALIST (Landscape/Narrative) - REDESIGNED
  return (
    <div
      ref={cardRef}
      className="group relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-white/20"
      onClick={(e) => { e.stopPropagation(); onClick(project); }}
    >
        {/* Image Layer - Full Bleed */}
        <div className="absolute inset-0 w-full h-full">
            {!imageLoaded && !showFallback && (
                <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
            )}
            {isInView && (
                <img
                    src={project.img}
                    alt={project.alt}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setShowFallback(true)}
                />
            )}
        </div>

        {/* Cinematic Gradient Overlay - Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

        {/* Content Layer - Bottom Aligned */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start justify-end translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
            <span 
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 mb-2 border-l-2 pl-2 transition-colors duration-300 group-hover:text-white group-hover:border-[var(--accent-color)]"
                style={{ '--accent-color': project.theme.primary } as React.CSSProperties}
            >
                {project.tag}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-lg">
                {project.title}
            </h3>
        </div>

        {/* Hover Hint (Subtle Glow on edges) */}
        <div 
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none mix-blend-overlay"
            style={{ boxShadow: `inset 0 0 100px ${project.theme.primary}40` }} 
        />
    </div>
  );
};
