import React, { useEffect, useRef, useState } from 'react';
import App from './App';
import Onboarding from './Onboarding';
import LightPillar from './components/LightPillar';

type Phase = 'onboarding' | 'bridge' | 'app';

const ONBOARDING_FADE_MS = 1500;
const ICON_ENTER_MS = 500;
const ICON_GROW_MS = 2000;
const TOTAL_BRIDGE_MS = 4000; // Total time from CTA click to main page
const VISIT_TIMESTAMP_KEY = 'portfolio_last_visit';

type ExperienceShellProps = {
  showOnboarding: boolean;
};

const ExperienceShell: React.FC<ExperienceShellProps> = ({ showOnboarding }) => {
  const [phase, setPhase] = useState<Phase>(showOnboarding ? 'onboarding' : 'app');
  const bridgeTimeoutRef = useRef<number | null>(null);
  const revealTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!showOnboarding) {
      localStorage.setItem(VISIT_TIMESTAMP_KEY, new Date().toISOString());
    }

    return () => {
      if (bridgeTimeoutRef.current !== null) {
        window.clearTimeout(bridgeTimeoutRef.current);
        bridgeTimeoutRef.current = null;
      }
      if (revealTimeoutRef.current !== null) {
        window.clearTimeout(revealTimeoutRef.current);
        revealTimeoutRef.current = null;
      }
    };
  }, [showOnboarding]);

  const handleEnter = () => {
    if (phase !== 'onboarding') return;

    // Clear any existing timeouts
    if (bridgeTimeoutRef.current !== null) window.clearTimeout(bridgeTimeoutRef.current);
    if (revealTimeoutRef.current !== null) window.clearTimeout(revealTimeoutRef.current);

    // Move to bridge phase immediately
    setPhase('bridge');

    // Then transition to app after total bridge time
    revealTimeoutRef.current = window.setTimeout(() => {
      localStorage.setItem(VISIT_TIMESTAMP_KEY, new Date().toISOString());
      setPhase('app');
    }, TOTAL_BRIDGE_MS);
  };

  const onboardingVisible = phase === 'onboarding' || phase === 'bridge';
  const bridgeVisible = phase === 'bridge';
  // Only show the app when we've reached the 'app' phase
  const appVisible = phase === 'app';

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 overflow-hidden font-sans antialiased selection:bg-cyan-500/30">
      {/* Background - fades out during bridge */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity ease-out`}
        style={{
          opacity: phase === 'onboarding' ? 1 : 0,
          transitionDuration: `${ONBOARDING_FADE_MS}ms`,
        }}
      >
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

      {/* LightPillar - fades out during bridge */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity ease-out overflow-visible`}
        style={{
          opacity: phase === 'onboarding' ? 1 : 0,
          transitionDuration: `${ONBOARDING_FADE_MS}ms`,
        }}
      >
        <div className="relative w-screen h-screen overflow-visible">
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
        {/* ONBOARDING LAYER */}
        {onboardingVisible ? (
          <div
            className={`absolute inset-0 transition-all ease-out motion-reduce:transition-none ${
              phase === 'onboarding'
                ? 'opacity-100 scale-100 blur-0'
                : 'opacity-0 scale-[0.98] blur-md pointer-events-none'
            }`}
            style={{
              transitionDuration: `${ONBOARDING_FADE_MS}ms`,
            }}
          >
            <Onboarding onEnter={handleEnter} />
          </div>
        ) : null}

        {/* BRIDGE MOMENT LAYER - Pure black background with icon fade in and grow */}
        {bridgeVisible ? (
          <div
            className="absolute inset-0 bg-black flex items-center justify-center transition-opacity ease-out"
            style={{
              opacity: phase === 'bridge' ? 1 : 0,
              transitionDuration: `${ONBOARDING_FADE_MS}ms`,
            }}
          >
            {/* Icon fades in small and grows large */}
            <div
              className="transition-all"
              style={{
                opacity: phase === 'bridge' ? 1 : 0,
                transform: phase === 'bridge' ? 'scale(1)' : 'scale(0.3)',
                transitionDuration: `${ICON_ENTER_MS + ICON_GROW_MS}ms`,
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <img
                src="/public/icon.png"
                alt="Portfolio Icon"
                className="w-32 h-32 md:w-64 md:h-64"
              />
            </div>
          </div>
        ) : null}

        {/* APP LAYER (Three Pillars) */}
        <div
          className={`relative min-h-screen transition-opacity duration-1000 ease-out motion-reduce:transition-none ${
            appVisible ? 'opacity-100' : 'opacity-0'
          } ${phase !== 'app' ? 'pointer-events-none' : ''}`}
        >
          <App />
        </div>
      </div>
    </div>
  );
};

export default ExperienceShell;
