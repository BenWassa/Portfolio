import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import LightPillar from './components/LightPillar';
import GlassSurface from './components/GlassSurface';

/* Custom CSS for directional animations */
const styleTag = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes fade-in-left {
    from { opacity: 0; transform: translateX(-40px); filter: blur(10px); }
    to { opacity: 1; transform: translateX(0); filter: blur(0); }
  }
  @keyframes fade-in-right {
    from { opacity: 0; transform: translateX(40px); filter: blur(10px); }
    to { opacity: 1; transform: translateX(0); filter: blur(0); }
  }

  /* Animations - slower, more cinematic */
  .animate-enter-title { animation: fade-in-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards; opacity: 0; }
  .animate-enter-sub { animation: fade-in-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards; opacity: 0; }
  .animate-enter-left { animation: fade-in-left 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s forwards; opacity: 0; }
  .animate-enter-right { animation: fade-in-right 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s forwards; opacity: 0; }
  
  /* Mobile override */
  @media (max-width: 768px) {
    .animate-enter-left, .animate-enter-right { animation-name: fade-in-up; }
  }
`;

const Onboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const leaveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('portfolio_visited');
    if (hasVisited === 'true') {
      setShowOnboarding(false);
    }

    return () => {
      if (leaveTimeoutRef.current !== null) {
        window.clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
    };
  }, []);

  const handleEnter = () => {
    setIsLeaving(true);
    if (leaveTimeoutRef.current !== null) {
      window.clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = window.setTimeout(() => {
      localStorage.setItem('portfolio_visited', 'true');
      setShowOnboarding(false);
      setIsLeaving(false);
      leaveTimeoutRef.current = null;
    }, 800);
  };

  const resetExperience = () => {
    localStorage.removeItem('portfolio_visited');
    setShowOnboarding(true);
  };

  if (!showOnboarding) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center p-8 font-sans antialiased">
        <h1 className="text-4xl font-serif italic tracking-tight mb-6 text-white">Main Portfolio View</h1>
        <button onClick={resetExperience} className="px-6 py-2 text-sm border border-zinc-800 hover:bg-zinc-900 rounded-full transition-colors">
          Reset Onboarding Experience
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 overflow-hidden font-sans antialiased selection:bg-cyan-500/30">
      <style>{styleTag}</style>

      {/* 1. Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black z-0 pointer-events-none"></div>

      {/* 2. The Visual: Slanted Light Pillar */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="relative w-full h-screen">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>
      </div>

      {/* 3. Main Content Layer - Minimal & Floating */}
      <main className={`relative z-10 w-full min-h-screen max-w-7xl mx-auto px-6 py-12 flex flex-col justify-between transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLeaving ? 'opacity-0 scale-95 blur-xl' : 'opacity-100 scale-100 blur-0'}`}>
        
        {/* HEADER: Floating Top Left */}
        <div className="w-full flex justify-between items-start animate-enter-left">
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mix-blend-difference">
            Benjamin P. Haddon
          </div>
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mix-blend-difference hidden md:block">
            System Status: Online
          </div>
        </div>

        {/* CENTER: The Narrative Title */}
        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-20">
          <div className="animate-enter-title mix-blend-difference">
             {/* Switched from font-display to font-sans + serif combo */}
            <h1 className="text-4xl md:text-7xl font-sans font-light tracking-tight text-white leading-[1.1]">
              A portfolio built by AI,<br />
              <span className="font-serif italic text-white/90">directed by intention.</span>
            </h1>
          </div>
          
          <div className="mt-12 animate-enter-sub">
            <GlassSurface
              width="fit-content"
              height="fit-content"
              borderRadius={999}
              displace={0.5}
              distortionScale={-180}
              redOffset={0}
              greenOffset={10}
              blueOffset={20}
              backgroundOpacity={0.1}
              saturation={1}
              brightness={50}
              opacity={0.93}
              mixBlendMode="screen"
              className="inline-flex"
            >
              <div className="flex items-center gap-4 pl-1 pr-1 py-1">
                 <button
                    onClick={handleEnter}
                    className="group relative flex items-center gap-3 px-8 py-3 bg-transparent text-white rounded-full transition-all duration-500 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] hover:scale-[1.02]"
                  >
                    <span className="text-xs font-bold tracking-[0.15em] uppercase">Enter System</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
            </GlassSurface>
          </div>
        </div>

        {/* FOOTER: Minimal Text Columns */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 items-end">
          
          {/* Left Column: What This Is */}
          <div className="md:col-span-3 animate-enter-left">
             <div className="mb-4 flex items-center gap-2">
                <div className="h-[1px] w-8 bg-white/20"></div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Context</span>
             </div>
             <p className="text-sm text-zinc-400 font-light leading-relaxed">
               Mythic frameworks as tools for meaning-making. Progressive web apps that respect attention. Psychological concepts as navigable experiences.
             </p>
          </div>

          {/* Center Space (Empty for Pillar) */}
          <div className="hidden md:block md:col-span-6"></div>

          {/* Right Column: How It Was Made */}
          <div className="md:col-span-3 animate-enter-right text-left md:text-right">
             <div className="mb-4 flex items-center gap-2 md:justify-end">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Protocol</span>
                <div className="h-[1px] w-8 bg-white/20"></div>
             </div>
             <p className="text-sm text-zinc-400 font-light leading-relaxed">
               AI-scaffolded, human-directed. I designed the architecture and defined the constraints. Acceleration without abdication.
             </p>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Onboarding;
