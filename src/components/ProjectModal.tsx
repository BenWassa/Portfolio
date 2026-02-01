import React, { useEffect } from 'react';
import type { Project, ProjectStatus } from '../types';

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
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!project) return null;

  const linkLabel = project.type === 'app' ? 'Open App' : 'Open Narrative';

  return (
    <div
      id="modal"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 opacity-0 invisible transition-all duration-500 ${
        isOpen ? 'open' : ''
      }`}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" onClick={onClose} />

      <div
        id="modal-content"
        className={`relative w-full max-w-5xl bg-[#121212] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] rounded-xl transform translate-y-20 transition-transform duration-500 ${
          isOpen ? 'translate-y-0' : 'translate-y-20'
        }`}
        data-type={project.type}
      >
        <button
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full hover:bg-white/20 text-white transition-colors"
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
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent md:bg-gradient-to-r"
            id="m-overlay"
          ></div>
        </div>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest px-2 py-1 border border-white/20 rounded text-white/60" id="m-tag">
              {project.tag}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono" id="m-status-wrap">
              <span className={`w-2 h-2 rounded-full ${getStatusDotClass(project.status)}`} id="m-status-dot"></span>
              <span className={getStatusTextClass(project.status)} id="m-status-text">
                {project.status.toUpperCase()}
              </span>
            </div>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6" id="m-title">
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
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
