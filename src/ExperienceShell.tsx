import React, { useEffect, useRef, useState } from 'react';
import App from './App';
import Onboarding from './Onboarding';
import LightPillar from './components/LightPillar';

type Phase = 'onboarding' | 'transitioning' | 'app';

const TRANSITION_MS = 900;
const VISIT_TIMESTAMP_KEY = 'portfolio_last_visit';

type ExperienceShellProps = {
  showOnboarding: boolean;
};

const ExperienceShell: React.FC<ExperienceShellProps> = ({ showOnboarding }) => {
  const [phase, setPhase] = useState<Phase>(showOnboarding ? 'onboarding' : 'app');
  const transitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!showOnboarding) {
      localStorage.setItem(VISIT_TIMESTAMP_KEY, new Date().toISOString());
    }

    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
    };
  }, [showOnboarding]);

  const handleEnter = () => {
    if (phase !== 'onboarding') return;
    setPhase('transitioning');
    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = window.setTimeout(() => {
      localStorage.setItem(VISIT_TIMESTAMP_KEY, new Date().toISOString());
      setPhase('app');
    }, TRANSITION_MS);
  };

  const onboardingVisible = phase !== 'app';
  const appVisible = phase !== 'onboarding';

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 overflow-hidden font-sans antialiased selection:bg-cyan-500/30">
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

      <div className="relative z-10 min-h-screen">
        {onboardingVisible ? (
          <div
            className={`absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:filter-none ${
              phase === 'transitioning'
                ? 'opacity-0 scale-[0.985] blur-xl'
                : 'opacity-100 scale-100 blur-0'
            }`}
          >
            <Onboarding onEnter={handleEnter} />
          </div>
        ) : null}

        <div
          className={`relative min-h-screen transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none ${
            appVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${phase === 'onboarding' ? 'pointer-events-none' : ''}`}
        >
          <App />
        </div>
      </div>
    </div>
  );
};

export default ExperienceShell;
