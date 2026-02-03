import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import LightPillar from './components/LightPillar';

/* Custom CSS for animations and noise texture */
const styleTag = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  /* Staggered entrance animations */
  .animate-fade-in-delay-1 { animation: fade-in-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards; opacity: 0; }
  .animate-fade-in-delay-2 { animation: fade-in-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards; opacity: 0; }
  .animate-fade-in-delay-3 { animation: fade-in-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s forwards; opacity: 0; }
  .animate-fade-in-delay-4 { animation: fade-in-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.7s forwards; opacity: 0; }

  .bg-noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
  }
`;

// --- Components ---

/**
 * GlassSurface: The container for content.
 * Modern Apple-style: Higher blur, smoother rounding, thinner borders.
 */
const GlassSurface = ({ children, className = "" }) => (
  <div className={`relative backdrop-blur-3xl bg-black/20 border border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden ${className}`}>
    {/* Inner subtle noise texture overlay */}
    <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none mix-blend-overlay"></div>

    {/* Top gloss highlight */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>

    {/* Content Wrapper */}
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
);

/**
 * Main Application Component
 */
const Onboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('portfolio_visited');
    if (hasVisited === 'true') {
      setShowOnboarding(false);
    }
  }, []);

  const handleEnter = () => {
    setIsLeaving(true);
    setTimeout(() => {
      localStorage.setItem('portfolio_visited', 'true');
      setShowOnboarding(false);
      setIsLeaving(false);
    }, 800);
  };

  const handleSkip = () => {
    localStorage.setItem('portfolio_visited', 'true');
    setShowOnboarding(false);
  };

  const resetExperience = () => {
    localStorage.removeItem('portfolio_visited');
    setShowOnboarding(true);
  };

  if (!showOnboarding) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center p-8 font-sans antialiased selection:bg-cyan-500/30">
        <h1 className="text-4xl font-light tracking-tight mb-6 text-white">Main Portfolio View</h1>
        <p className="max-w-md text-center text-zinc-500 mb-8">
          The threshold has been crossed. This is where the main navigation or content grid would reside.
        </p>
        <button
          onClick={resetExperience}
          className="px-6 py-2 text-sm border border-zinc-800 hover:bg-zinc-900 hover:text-white transition-colors duration-300 rounded-full"
        >
          Reset Onboarding Experience
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 overflow-hidden font-sans antialiased selection:bg-cyan-500/30">
      <style>{styleTag}</style>

      {/* Ambient Background - Deep Dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black z-0 pointer-events-none"></div>

      {/* The Axis - Front and Center */}
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

      {/* Main Content Area */}
      <main className={`relative z-10 flex flex-col items-center justify-center min-h-screen p-6 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLeaving ? 'opacity-0 scale-95 blur-lg' : 'opacity-100 scale-100 blur-0'}`}>

        {/* Container: Transparent enough to see the pillar, blurred enough to read text */}
        <GlassSurface className="w-full max-w-xl p-8 md:p-12 text-center">

          {/* 1. Opening Statement */}
          <div className="mb-10 animate-fade-in-delay-1 flex flex-col items-center">
            <span className="inline-block px-3 py-1 mb-6 text-[10px] font-medium tracking-[0.2em] uppercase text-cyan-100/70 bg-cyan-500/10 rounded-full border border-cyan-500/10 backdrop-blur-md">
              Opening
            </span>
            <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-white leading-tight">
              A portfolio built by AI, directed by intention.
            </h1>
          </div>

          {/* 2. What This Is */}
          <div className="mb-10 animate-fade-in-delay-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
              What This Is
            </div>
            <div className="space-y-3 text-sm md:text-base text-zinc-300">
              <div>
                <span className="text-white/80 font-medium">Narrative</span>{' '}
                <span className="text-white/50">— Mythic frameworks as tools for meaning-making</span>
              </div>
              <div>
                <span className="text-white/80 font-medium">Systems</span>{' '}
                <span className="text-white/50">— Progressive web apps that respect attention</span>
              </div>
              <div>
                <span className="text-white/80 font-medium">Psyche</span>{' '}
                <span className="text-white/50">— Psychological concepts as navigable experiences</span>
              </div>
            </div>
            <p className="mt-5 text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
              Each project explores how structure serves depth. How ancient patterns solve modern problems. How tools can dignify rather than distract.
            </p>
          </div>

          {/* 3. How It Was Made */}
          <div className="mb-10 animate-fade-in-delay-3">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
              How It Was Made
            </div>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-md mx-auto">
              This portfolio was AI-scaffolded and human-directed. I designed the architecture. I defined the constraints. I wrote the concepts.
              AI built the code to spec—faster than I could alone, but never unsupervised.
              Every creative decision is mine. Every line was reviewed. The vision is human. The execution is collaborative.
              This is intentional AI partnership: acceleration without abdication.
            </p>
          </div>

          {/* 4. What You'll Find & Action */}
          <div className="flex flex-col items-center gap-6 animate-fade-in-delay-4">

            <div className="w-full max-w-md text-left">
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3 text-center">
                What You'll Find
              </div>
              <ul className="text-sm text-zinc-400 leading-relaxed space-y-2">
                <li>• Narrative systems using mythology as interface design</li>
                <li>• Privacy-first PWAs prioritizing progress over metrics</li>
                <li>• Experimental tools making psychological concepts tangible</li>
              </ul>
              <p className="mt-4 text-sm text-zinc-500 text-center">
                Some projects are live. Some are prototypes. All are honest attempts to build things worth keeping.
              </p>
            </div>

            {/* Primary Action - Apple Style Pill Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleEnter}
                className="group relative flex items-center gap-2 pl-6 pr-5 py-3.5 bg-white text-black rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              >
                <span className="text-sm font-semibold tracking-tight">Enter Portfolio</span>
                <div className="bg-black/10 rounded-full p-1 group-hover:translate-x-0.5 transition-transform duration-300">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
              <button
                onClick={handleSkip}
                className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white/80 transition-colors"
              >
                Skip Intro
              </button>
            </div>

          </div>
        </GlassSurface>

        {/* Footer */}
        <div className="absolute bottom-8 text-[10px] text-white/20 tracking-widest uppercase font-medium animate-fade-in-delay-4 mix-blend-plus-lighter">
          System / Narrative © {new Date().getFullYear()}
        </div>

      </main>
    </div>
  );
};

export default Onboarding;
