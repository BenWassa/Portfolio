import React, { useEffect, useRef } from 'react';
import type { Project, ProjectStatus } from '../types';
import { useScrollLock } from '../hooks/useScrollLock';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// --- Helper: Status Styles ---
const getStatusDotClass = (status: ProjectStatus) => {
  switch (status) {
    case 'active': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]';
    case 'draft': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]';
    case 'prototype': return 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]';
    default: return 'bg-gray-500';
  }
};

const getStatusTextClass = (status: ProjectStatus) => {
  switch (status) {
    case 'active': return 'text-emerald-400';
    case 'draft': return 'text-amber-400';
    case 'prototype': return 'text-rose-400';
    default: return 'text-gray-400';
  }
};

// --- Helper: Tech Icons ---
type TechIconData = { short: string; color: string };

const TECH_ICON_MAP: Record<string, TechIconData> = {
  HTML: { short: 'HTML', color: '#f97316' },
  CSS: { short: 'CSS', color: '#38bdf8' },
  JavaScript: { short: 'JS', color: '#facc15' },
  'Web Audio': { short: 'AUD', color: '#ec4899' },
  Responsive: { short: 'RWD', color: '#22d3ee' },
  Python: { short: 'PY', color: '#38bdf8' },
  Markdown: { short: 'MD', color: '#94a3b8' },
  React: { short: 'RE', color: '#22d3ee' },
  TypeScript: { short: 'TS', color: '#60a5fa' },
  Vite: { short: 'VT', color: '#a855f7' },
  Tailwind: { short: 'TW', color: '#38bdf8' },
  Firebase: { short: 'FB', color: '#f59e0b' },
  // ... (Add others as needed, default fallback exists)
};

const getTechData = (tech: string): TechIconData => {
  if (TECH_ICON_MAP[tech]) return TECH_ICON_MAP[tech];
  return {
    short: tech.substring(0, 2).toUpperCase(),
    color: '#94a3b8', // Slate-400 default
  };
};

// --- Component: Tech Stack (New Minimal Design) ---
const TechStack: React.FC<{ techStack?: string[] }> = ({ techStack }) => {
  if (!techStack?.length) return null;

  return (
    <div className="mt-auto pt-6 border-t border-white/5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3">
        Technologies
      </div>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => {
          const data = getTechData(tech);
          return (
            <div
              key={tech}
              className="group flex items-center gap-2 px-2.5 py-1.5 rounded bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: data.color, boxShadow: `0 0 6px ${data.color}40` }}
              />
              <span className="text-[11px] font-medium text-zinc-300 group-hover:text-white transition-colors">
                {tech}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Component: Text Formatter ---
const FormattedDescription: React.FC<{ text: string }> = ({ text }) => {
  // Split by double newline to create paragraphs
  const paragraphs = text.split('\n\n').filter(Boolean);

  return (
    <div className="space-y-4 text-zinc-300 text-[15px] leading-relaxed font-light">
      {paragraphs.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
};

// --- Component: Landscape Modal (Narrative) ---
const LandscapeModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const linkLabel = project.type === 'app' ? 'Open App' : 'Open Narrative';

  return (
    <>
      {/* Left: Image (Bleed, no padding) */}
      <div className="relative w-full h-full min-h-[300px] md:min-h-0 overflow-hidden bg-black group">
         {/* Subtle overlay gradient to blend image into background if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-20 z-10 pointer-events-none" />
        
        <img
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          src={project.img}
          alt={project.alt}
          loading="lazy"
        />
      </div>

      {/* Right: Content */}
      <div className="w-full h-full p-8 md:p-10 flex flex-col overflow-y-auto">
        
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            {project.title}
          </h2>
          
          <div className="flex items-center flex-wrap gap-3">
             {/* Tag */}
            <span 
              className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border bg-white/[0.02]"
              style={{ borderColor: `${project.theme.primary}40`, color: project.theme.primary }}
            >
              {project.tag}
            </span>

            {/* Separator dot */}
            <span className="w-0.5 h-0.5 bg-zinc-600 rounded-full" />

            {/* Status */}
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotClass(project.status)}`} />
              <span className={`text-[10px] font-bold tracking-wider uppercase ${getStatusTextClass(project.status)}`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <FormattedDescription text={project.fullDesc || project.desc} />
        </div>

        {/* Tech Stack (Pushed to bottom via mt-auto in component) */}
        <TechStack techStack={project.techStack} />

        {/* Footer Actions */}
        {project.href && (
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
             <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-400 transition-colors group"
            >
              {linkLabel}
              <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">
                arrow_outward
              </span>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

// --- Component: Square Modal (App) ---
const SquareModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const linkLabel = 'Open App';

  return (
    <>
      <div className="w-full md:w-[45%] bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center p-12 relative overflow-hidden">
        {/* Ambient background glow based on theme */}
        <div 
            className="absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(circle at center, ${project.theme.primary}20 0%, transparent 70%)` }}
        />
        <img
          className="w-full h-auto max-w-[280px] relative z-10 drop-shadow-2xl transform transition-transform duration-500 hover:scale-105"
          src={project.img}
          alt={project.alt}
          loading="lazy"
        />
      </div>

      <div className="flex-1 p-8 md:p-10 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            {project.title}
          </h2>
          <div className="flex items-center gap-3">
             <span 
              className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border bg-white/[0.02]"
              style={{ borderColor: `${project.theme.primary}40`, color: project.theme.primary }}
            >
              {project.tag}
            </span>
             <span className="w-0.5 h-0.5 bg-zinc-600 rounded-full" />
             <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotClass(project.status)}`} />
              <span className={`text-[10px] font-bold tracking-wider uppercase ${getStatusTextClass(project.status)}`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
            <FormattedDescription text={project.fullDesc || project.desc} />
        </div>

        <TechStack techStack={project.techStack} />

        {project.href && (
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <a
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-zinc-200 transition-colors"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{linkLabel}</span>
              <span className="material-symbols-outlined text-base">arrow_outward</span>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  const isLandscape = project.orientation === 'landscape';

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div
        ref={modalRef}
        id="modal-content"
        className={`
            relative w-full bg-[#121212] border border-white/10 shadow-2xl overflow-hidden
            transform transition-all duration-500 ease-out
            ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
            ${isLandscape 
                ? 'max-w-6xl h-full md:h-auto md:max-h-[85vh] flex flex-col md:grid md:grid-cols-[1.2fr_1fr] rounded-none md:rounded-2xl' 
                : 'max-w-4xl h-full md:h-auto md:max-h-[85vh] flex flex-col md:flex-row rounded-none md:rounded-2xl'
            }
        `}
      >
        <button
          className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-sm"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {isLandscape ? (
          <LandscapeModal project={project} onClose={onClose} />
        ) : (
          <SquareModal project={project} onClose={onClose} />
        )}
      </div>
    </div>
  );
};
