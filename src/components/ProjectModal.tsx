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

// Landscape Modal Component (for narrative projects)
const LandscapeModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const linkLabel = project.type === 'app' ? 'Open App' : 'Open Narrative';

  return (
    <>
      {/* Landscape layout - single column */}
      <div className="relative max-h-[70vh] overflow-hidden rounded-t-xl bg-[#0a0a0a]">
        <img
          className="w-full h-full object-contain"
          id="m-img"
          src={project.img}
          alt={project.alt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="p-8" id="modal-body">
        <h2 className="font-display text-[28px] font-bold uppercase tracking-[0.05em] text-white mb-2 flex items-center gap-3.5" id="modal-title">
          {project.title}
        </h2>

        <p className="text-gray-400 text-[15px] leading-[1.7] mb-6" id="m-desc">
          {project.fullDesc || project.desc}
        </p>

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
        className={`relative w-full ${isLandscape ? 'max-w-[800px]' : 'max-w-5xl'} bg-[#1a1a1a] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden max-h-[90vh] rounded-xl transform transition-transform duration-400 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-5'
        } ${isLandscape ? '' : 'flex flex-col md:flex-row'}`}
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