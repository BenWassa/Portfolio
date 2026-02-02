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

  const linkLabel = project.type === 'app' ? 'Open App' : 'Open Narrative';

  return (
    <div
      id="modal"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 opacity-0 invisible transition-all duration-500 ${
        isOpen ? 'open' : ''
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-lg"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        id="modal-content"
        className={`relative w-full max-w-5xl bg-[#121212] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] rounded-xl transform translate-y-20 transition-transform duration-500 ${
          isOpen ? 'translate-y-0' : 'translate-y-20'
        }`}
        data-type={project.type}
      >
        <button
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full hover:bg-white/20 text-white transition-colors focus:ring-2 focus:ring-white flex items-center justify-center"
          onClick={onClose}
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="w-full md:w-5/12 relative h-48 md:h-auto shrink-0 bg-black" id="m-media">
          <img
            className="w-full h-full object-cover opacity-90"
            id="m-img"
            src={project.img}
            alt={project.alt}
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent md:bg-gradient-to-r"
            id="m-overlay"
          ></div>
        </div>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto min-h-0" id="modal-content-scroll">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs font-mono uppercase tracking-widest px-2 py-1 border border-white/20 rounded text-white/60"
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
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6" id="modal-title">
            {project.title}
          </h2>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-300 font-light leading-relaxed" id="m-desc">
              {project.fullDesc || project.desc}
            </p>
          </div>

          {project.href && (
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4">
              <a
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                id="m-link"
              >
                <span id="m-link-text">{linkLabel}</span>
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
