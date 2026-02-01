import React, { useState, useEffect, useRef } from 'react';
import { Pillar } from './components/Pillar';
import { ProjectModal } from './components/ProjectModal';
import type { Project } from './types';
import { useProjects } from './hooks/useProjects';

const App: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const projectsByType = useProjects();

  const handlePillarActivate = (id: string) => {
    if (activePillar === id) return;
    setActivePillar(id);
  };

  const handleResetView = () => {
    setActivePillar(null);
  };

  const handleProjectClick = (project: Project) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setModalProject(project);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setModalProject(null);
      closeTimerRef.current = null;
    }, 500);
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (isModalOpen) {
        handleModalClose();
        return;
      }
      if (activePillar) setActivePillar(null);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [activePillar, isModalOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <div className="antialiased h-screen w-screen flex flex-col font-sans selection:bg-white/20">
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="font-display font-bold tracking-tight text-lg">BENJAMIN P. HADDON</div>
          <div className="hidden md:block h-4 w-[1px] bg-white/40"></div>
          <div className="hidden md:block text-xs font-mono opacity-80">PORTFOLIO</div>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium pointer-events-auto">
          <button
            onClick={handleResetView}
            className={`transition-all duration-300 flex items-center gap-2 hover:text-red-400 uppercase tracking-widest text-xs ${
              activePillar ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <span className="material-symbols-outlined text-sm">close</span> Close View
          </button>
        </div>
      </nav>

      <main
        className={`pillar-container flex-1 flex flex-col md:flex-row h-full w-full relative ${
          activePillar ? 'has-active' : ''
        }`}
      >
        <Pillar
          id="narrative"
          title="Narrative"
          subtitle="As Interface"
          bgImage="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop"
          baseColor="#d4af37"
          throughline="Throughline 01"
          heading="Narrative as Interface"
          description="Prototyping mythic frameworks. These projects explore how ancient storytelling structures can solve modern meaning crises by becoming the very interface through which we engage with reality."
          titleClassName="font-serif text-4xl md:text-6xl italic mb-2"
          headingClassName="text-4xl md:text-5xl font-serif text-white italic"
          className="bg-[#0c0a09]"
          projects={projectsByType.narrative}
          isActive={activePillar === 'narrative'}
          isInactive={activePillar !== null && activePillar !== 'narrative'}
          onActivate={handlePillarActivate}
          onProjectClick={handleProjectClick}
        />

        <Pillar
          id="pwa"
          title="Systems"
          subtitle="Progressive Web Apps"
          bgImage="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
          baseColor="#3b82f6"
          throughline="Throughline 02"
          heading="Progressive Systems"
          description="Building digital companions that respect attention. These offline-first, privacy-focused PWAs prioritize consistency over perfection and tools over traps."
          titleClassName="font-display text-4xl md:text-6xl font-bold mb-2"
          headingClassName="text-4xl md:text-5xl font-display font-bold text-white"
          className="bg-[#0f172a]"
          projects={projectsByType.app}
          isActive={activePillar === 'pwa'}
          isInactive={activePillar !== null && activePillar !== 'pwa'}
          onActivate={handlePillarActivate}
          onProjectClick={handleProjectClick}
        />

        <Pillar
          id="psych"
          title="Psyche"
          subtitle="Into Experience"
          bgImage="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop"
          baseColor="#8b5cf6"
          throughline="Throughline 03"
          heading="Psychology into Experience"
          description="Translating abstract psychological concepts—dopamine, grief, memory—into tangible, navigable digital landscapes. Making the invisible visible."
          titleClassName="font-display text-4xl md:text-6xl font-light mb-2"
          headingClassName="text-4xl md:text-5xl font-display font-light text-white"
          className="bg-[#0f0f23] border-r-0"
          projects={projectsByType.psychology}
          isActive={activePillar === 'psych'}
          isInactive={activePillar !== null && activePillar !== 'psych'}
          onActivate={handlePillarActivate}
          onProjectClick={handleProjectClick}
        />
      </main>

      <ProjectModal project={modalProject} isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default App;
