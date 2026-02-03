import React, { useEffect, useRef } from 'react';
import type { Project, ProjectStatus } from '../types';
import { useScrollLock } from '../hooks/useScrollLock';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const getStatusDotClass = (status: ProjectStatus) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-500 animate-pulse';
    case 'draft':
      return 'bg-amber-500';
    case 'prototype':
      return 'bg-rose-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusTextClass = (status: ProjectStatus) => {
  switch (status) {
    case 'active':
      return 'text-emerald-400';
    case 'draft':
      return 'text-amber-400';
    case 'prototype':
      return 'text-rose-400';
    default:
      return 'text-gray-400';
  }
};

type TechIconData = {
  short: string;
  bg: string;
  fg: string;
  border: string;
};

const TECH_ICON_MAP: Record<string, TechIconData> = {
  HTML: { short: 'HTML', bg: 'linear-gradient(135deg, #f97316, #ef4444)', fg: '#0b0b0f', border: '#fca5a5' },
  CSS: { short: 'CSS', bg: 'linear-gradient(135deg, #38bdf8, #2563eb)', fg: '#0b0b0f', border: '#93c5fd' },
  JavaScript: { short: 'JS', bg: 'linear-gradient(135deg, #facc15, #f59e0b)', fg: '#1f1300', border: '#fde047' },
  'Web Audio': { short: 'AUD', bg: 'linear-gradient(135deg, #a855f7, #ec4899)', fg: '#0b0b0f', border: '#f0abfc' },
  Responsive: { short: 'RWD', bg: 'linear-gradient(135deg, #22d3ee, #14b8a6)', fg: '#0b0b0f', border: '#5eead4' },
  Python: { short: 'PY', bg: 'linear-gradient(135deg, #38bdf8, #facc15)', fg: '#0b0b0f', border: '#fde047' },
  Markdown: { short: 'MD', bg: 'linear-gradient(135deg, #94a3b8, #475569)', fg: '#0b0b0f', border: '#cbd5e1' },
  YAML: { short: 'YML', bg: 'linear-gradient(135deg, #f97316, #f43f5e)', fg: '#0b0b0f', border: '#fdba74' },
  pandas: { short: 'PD', bg: 'linear-gradient(135deg, #22c55e, #16a34a)', fg: '#0b0b0f', border: '#86efac' },
  NumPy: { short: 'NP', bg: 'linear-gradient(135deg, #38bdf8, #0ea5e9)', fg: '#0b0b0f', border: '#7dd3fc' },
  'scikit-learn': { short: 'SK', bg: 'linear-gradient(135deg, #f97316, #facc15)', fg: '#0b0b0f', border: '#fde047' },
  Streamlit: { short: 'ST', bg: 'linear-gradient(135deg, #ef4444, #fb7185)', fg: '#0b0b0f', border: '#fecdd3' },
  plotly: { short: 'PL', bg: 'linear-gradient(135deg, #60a5fa, #a78bfa)', fg: '#0b0b0f', border: '#c4b5fd' },
  PWA: { short: 'PWA', bg: 'linear-gradient(135deg, #38bdf8, #6366f1)', fg: '#0b0b0f', border: '#a5b4fc' },
  IndexedDB: { short: 'IDB', bg: 'linear-gradient(135deg, #0ea5e9, #0284c7)', fg: '#0b0b0f', border: '#7dd3fc' },
  'Service Worker': { short: 'SW', bg: 'linear-gradient(135deg, #10b981, #059669)', fg: '#0b0b0f', border: '#6ee7b7' },
  React: { short: 'RE', bg: 'linear-gradient(135deg, #22d3ee, #0ea5e9)', fg: '#0b0b0f', border: '#7dd3fc' },
  TypeScript: { short: 'TS', bg: 'linear-gradient(135deg, #60a5fa, #2563eb)', fg: '#0b0b0f', border: '#93c5fd' },
  Vite: { short: 'VT', bg: 'linear-gradient(135deg, #facc15, #a855f7)', fg: '#0b0b0f', border: '#f5d0fe' },
  Tailwind: { short: 'TW', bg: 'linear-gradient(135deg, #22d3ee, #38bdf8)', fg: '#0b0b0f', border: '#67e8f9' },
  'Framer Motion': { short: 'FM', bg: 'linear-gradient(135deg, #f472b6, #a855f7)', fg: '#0b0b0f', border: '#fbcfe8' },
  CSV: { short: 'CSV', bg: 'linear-gradient(135deg, #22c55e, #16a34a)', fg: '#0b0b0f', border: '#86efac' },
  Node: { short: 'ND', bg: 'linear-gradient(135deg, #4ade80, #16a34a)', fg: '#0b0b0f', border: '#86efac' },
  Express: { short: 'EX', bg: 'linear-gradient(135deg, #94a3b8, #64748b)', fg: '#0b0b0f', border: '#cbd5f5' },
  Firebase: { short: 'FB', bg: 'linear-gradient(135deg, #f59e0b, #f97316)', fg: '#0b0b0f', border: '#fdba74' },
  Firestore: { short: 'FS', bg: 'linear-gradient(135deg, #fbbf24, #f97316)', fg: '#0b0b0f', border: '#fed7aa' },
  'Three.js': { short: '3J', bg: 'linear-gradient(135deg, #d4d4d8, #3f3f46)', fg: '#0b0b0f', border: '#e4e4e7' },
  'Chart.js': { short: 'CJ', bg: 'linear-gradient(135deg, #f472b6, #fb7185)', fg: '#0b0b0f', border: '#fecdd3' },
  'File System Access': { short: 'FSA', bg: 'linear-gradient(135deg, #a78bfa, #6366f1)', fg: '#0b0b0f', border: '#c4b5fd' },
  JSZip: { short: 'JZ', bg: 'linear-gradient(135deg, #22c55e, #15803d)', fg: '#0b0b0f', border: '#86efac' },
  FileSaver: { short: 'FLS', bg: 'linear-gradient(135deg, #38bdf8, #0ea5e9)', fg: '#0b0b0f', border: '#7dd3fc' },
  'GitHub Pages': { short: 'GH', bg: 'linear-gradient(135deg, #e2e8f0, #94a3b8)', fg: '#0b0b0f', border: '#cbd5e1' },
  OGL: { short: 'OGL', bg: 'linear-gradient(135deg, #0f172a, #1f2937)', fg: '#f8fafc', border: '#475569' },
};

const getTechIconData = (tech: string): TechIconData => {
  const match = TECH_ICON_MAP[tech];
  if (match) return match;

  const initials = tech
    .split(/[\s./-]+/)
    .filter(Boolean)
    .map((chunk) => chunk[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return {
    short: initials || 'TECH',
    bg: 'linear-gradient(135deg, #1f2937, #0f172a)',
    fg: '#e2e8f0',
    border: '#475569',
  };
};

const TechStack: React.FC<{ techStack?: string[] }> = ({ techStack }) => {
  if (!techStack?.length) return null;

  return (
    <div className="mb-6 rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/50">Tech Stack</div>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">
          {techStack.length} items
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {techStack.map((tech) => {
          const icon = getTechIconData(tech);
          return (
            <div
              key={tech}
              className="group flex items-center gap-2 rounded-xl border border-white/15 bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-white/[0.02] px-3 py-2 text-[11px] text-white/85 backdrop-blur-xl shadow-[0_12px_28px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-[1px] hover:border-white/25 hover:shadow-[0_18px_35px_rgba(0,0,0,0.35)]"
              title={tech}
            >
              <span
                className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg border text-[9px] font-semibold tracking-[0.12em] uppercase shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35),_0_12px_20px_rgba(0,0,0,0.35)]"
                style={{ background: icon.bg, color: icon.fg, borderColor: icon.border }}
                aria-hidden="true"
              >
                {icon.short}
                <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </span>
              <span className="text-[11px] font-medium text-white/90">{tech}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Landscape Modal Component (for narrative projects)
const LandscapeModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const linkLabel = project.type === 'app' ? 'Open App' : 'Open Narrative';

  return (
    <>
      {/* Landscape layout - image left, details right */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center min-w-0"
        id="m-media"
      >
        <img
          className="w-full h-full"
          id="m-img"
          src={project.img}
          alt={project.alt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="w-full p-8 flex flex-col min-w-0" id="modal-body">
        <h2 className="font-display text-[28px] font-bold uppercase tracking-[0.05em] text-white mb-2 flex items-center gap-3.5" id="modal-title">
          {project.title}
        </h2>

        <p className="text-gray-400 text-[15px] leading-[1.7] mb-6" id="m-desc">
          {project.fullDesc || project.desc}
        </p>

        <TechStack techStack={project.techStack} />

        <div className="flex items-center gap-3 pt-6 border-t border-white/[0.08] flex-wrap">
          <span
            className="text-xs font-mono uppercase tracking-widest px-2 py-1 border rounded text-white/60"
            style={{ borderColor: project.theme.primary, color: project.theme.primary }}
            id="m-tag"
          >
            {project.tag}
          </span>
          <div className="flex items-center gap-2 text-xs font-mono" id="m-status-wrap">
            <span
              className={`w-2 h-2 rounded-full ${getStatusDotClass(project.status)}`}
              id="m-status-dot"
            ></span>
            <span className={getStatusTextClass(project.status)} id="m-status-text">
              {project.status.toUpperCase()}
            </span>
          </div>

          {project.href && (
            <a
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold text-sm rounded hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              id="m-link"
            >
              <span id="m-link-text">{linkLabel}</span>
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

// Square Modal Component (for app projects)
const SquareModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const linkLabel = project.type === 'app' ? 'Open App' : 'Open Narrative';

  return (
    <>
      {/* Square layout - enhanced for square PNGs */}
      <div className="w-full md:w-2/5 relative shrink-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center p-8 md:p-12">
        <img
          className="w-full h-auto max-w-[320px] rounded-[32px] shadow-2xl"
          id="m-img"
          src={project.img}
          alt={project.alt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex-1 p-8 md:p-10 overflow-y-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3" id="modal-title">
          {project.title}
        </h2>

        <div className="flex items-center gap-2.5 mb-6">
          <span
            className="text-[11px] font-mono uppercase tracking-wider px-2 py-1 border rounded"
            style={{ borderColor: project.theme.primary, color: project.theme.primary }}
            id="m-tag"
          >
            {project.tag}
          </span>
          <div className="flex items-center gap-1.5 text-[11px] font-mono" id="m-status-wrap">
            <span
              className={`w-1.5 h-1.5 rounded-full ${getStatusDotClass(project.status)}`}
              id="m-status-dot"
            ></span>
            <span className={getStatusTextClass(project.status)} id="m-status-text">
              {project.status.toUpperCase()}
            </span>
          </div>
        </div>

        <p className="text-gray-300 text-base leading-relaxed mb-8" id="m-desc">
          {project.fullDesc || project.desc}
        </p>

        <TechStack techStack={project.techStack} />

        {project.href && (
          <a
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            id="m-link"
          >
            <span id="m-link-text">{linkLabel}</span>
            <span className="material-symbols-outlined text-base">arrow_outward</span>
          </a>
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
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const isLandscape = project.orientation === 'landscape';

  return (
    <div
      id="modal"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-400 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-[10px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        id="modal-content"
        className={`relative w-full ${isLandscape ? 'max-w-5xl' : 'max-w-5xl'} bg-[#1a1a1a] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-y-auto md:overflow-hidden max-h-[90vh] rounded-xl transform transition-transform duration-400 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-5'
        } ${isLandscape ? 'flex flex-col md:flex-row' : 'flex flex-col md:flex-row'}`}
        data-type={project.type}
      >
        <button
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 hover:bg-white/10 hover:rotate-90 text-white transition-all duration-300 flex items-center justify-center focus:ring-2 focus:ring-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
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
