import React, { useEffect, useRef, useState } from 'react';
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

type OnboardingProps = {
  onExitComplete: () => void;
};

const pillClassName =
  'text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-200 bg-black/40 px-2 py-1 rounded-full border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm';
const dividerClassName = 'h-px w-6 bg-white/10';

const Onboarding: React.FC<OnboardingProps> = ({ onExitComplete }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const leaveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
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
      localStorage.setItem('portfolio_last_visit', new Date().toISOString());
      onExitComplete();
    }, 800);
  };
  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 overflow-hidden font-sans antialiased selection:bg-cyan-500/30">
      <style>{styleTag}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15 mix-blend-soft-light"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black" />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
        <div className="relative w-screen h-screen overflow-visible">
          <LightPillar
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.25}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>
      </div>

      <main
        className={`relative z-10 w-full min-h-screen max-w-7xl mx-auto px-6 py-12 flex flex-col justify-between 
        transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] 
        ${isLeaving ? 'opacity-0 scale-95 blur-xl' : 'opacity-100 scale-100 blur-0'}`}
      >
        {/* HEADER: Floating Top Left */}
        <div className="w-full flex justify-between items-start animate-enter-left">
          <div className={pillClassName}>Benjamin P. Haddon</div>
          <div className={`${pillClassName} hidden md:block`}>
            System Status:{' '}
            <span className="text-zinc-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.35)]">
              Online
            </span>
          </div>
        </div>

        {/* CENTER: The Narrative Title */}
        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-12">
          <div className="animate-enter-title relative z-20">
            <h1 className="text-4xl md:text-7xl font-sans font-light tracking-tight text-white leading-[1.1] drop-shadow-2xl">
              An interactive portfolio,
              <br />
              <span className="font-serif italic text-white/80">searching for meaning.</span>
            </h1>
          </div>

          {/* UPDATED: High-Polish Glass Button */}
          <div className="mt-16 animate-enter-sub flex items-center justify-center">
            <button
              onClick={handleEnter}
              className="group relative px-10 py-5 rounded-full 
                         bg-white/5 hover:bg-white/10 
                         backdrop-blur-xl hover:backdrop-blur-2xl
                         border border-white/10 hover:border-white/20
                         shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_8px_40px_-10px_rgba(0,0,0,0.5)]
                         hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_40px_-5px_rgba(255,255,255,0.1)]
                         transition-all duration-500 ease-out transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center gap-4">
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-zinc-200 group-hover:text-white transition-colors">
                  View Portfolio
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>

              {/* Inner shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* FOOTER: Minimal Text Columns */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-end">
          {/* Left Column: What This Is */}
          <div className="md:col-span-3 animate-enter-left flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className={dividerClassName} />
              <span className={pillClassName}>Context</span>
            </div>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Mythic frameworks for meaning-making. <br /> Progressive web apps that respect
              attention. <br /> Psychological lenses distilling experience.
            </p>
          </div>

          {/* Center Space (Empty for Pillar) */}
          <div className="hidden md:block md:col-span-6"></div>

          {/* Right Column: How It Was Made */}
          <div className="md:col-span-3 animate-enter-right flex flex-col gap-3 text-left md:text-right md:items-end">
            <div className="flex items-center gap-3 md:flex-row-reverse">
              <div className={dividerClassName} />
              <span className={pillClassName}>Protocol</span>
            </div>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              AI-scaffolded, human-directed. <br /> Idea · Vision · Prototype · Portfolio-piece{' '}
              <br /> Acceleration without abdication.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
