import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import LightPillar from './components/LightPillar';

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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15 mix-blend-soft-light"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black" />
      </div>

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
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 mix-blend-difference">
            Benjamin P. Haddon
          </div>
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 mix-blend-difference hidden md:block">
            System Status: <span className="text-zinc-200">Online</span>
          </div>
        </div>

        {/* CENTER: The Narrative Title */}
        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-12">
          <div className="animate-enter-title relative z-20">
            <h1 className="text-4xl md:text-7xl font-sans font-light tracking-tight text-white leading-[1.1] drop-shadow-2xl">
              A portfolio built by AI,<br />
              <span className="font-serif italic text-white/80">directed by intention.</span>
            </h1>
          </div>
          
          {/* UPDATED: Premium Glassmorphism Button */}
          <div className="mt-16 animate-enter-sub flex items-center justify-center">
            <button
              onClick={handleEnter}
              className="group relative px-12 py-6 rounded-full overflow-hidden
                         bg-gradient-to-br from-white/[0.08] to-white/[0.03]
                         hover:from-white/[0.15] hover:to-white/[0.08]
                         backdrop-blur-2xl hover:backdrop-blur-3xl
                         border border-white/20 hover:border-white/30
                         shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                         hover:shadow-[0_8px_48px_0_rgba(255,255,255,0.15),inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_80px_-10px_rgba(255,255,255,0.2)]
                         transition-all duration-700 ease-out transform hover:scale-[1.02] hover:-translate-y-0.5
                         before:absolute before:inset-0 before:rounded-full 
                         before:bg-gradient-to-br before:from-white/[0.15] before:to-transparent 
                         before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700"
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-white drop-shadow-lg">
                  Enter System
                </span>
                <ArrowRight className="w-4 h-4 text-white drop-shadow-lg group-hover:translate-x-1.5 transition-all duration-500" />
              </div>
              
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              {/* Inner glow ring */}
              <div className="absolute inset-[1px] rounded-full opacity-0 group-hover:opacity-100 
                            bg-gradient-to-br from-white/5 to-transparent transition-opacity duration-700 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* FOOTER: Minimal Text Columns */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-end">
          
          {/* Left Column: What This Is */}
          <div className="md:col-span-3 animate-enter-left">
             <div className="mb-3 flex items-center gap-3">
                <div className="h-[1px] w-6 bg-zinc-600"></div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">Context</span>
             </div>
             <p className="text-sm text-zinc-200 font-light leading-relaxed">
               Mythic frameworks as tools for meaning-making. Progressive web apps that respect attention. Psychological concepts as navigable experiences.
             </p>
          </div>

          {/* Center Space (Empty for Pillar) */}
          <div className="hidden md:block md:col-span-6"></div>

          {/* Right Column: How It Was Made */}
          <div className="md:col-span-3 animate-enter-right text-left md:text-right">
             <div className="mb-3 flex items-center gap-3 md:justify-end">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">Protocol</span>
                <div className="h-[1px] w-6 bg-zinc-600"></div>
             </div>
             <p className="text-sm text-zinc-200 font-light leading-relaxed">
               AI-scaffolded, human-directed. I designed the architecture and defined the constraints. Acceleration without abdication.
             </p>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Onboarding;
