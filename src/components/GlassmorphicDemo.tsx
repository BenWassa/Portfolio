import React, { useEffect } from 'react';
import GlassSurface from './GlassSurface';

const GlassmorphicDemo: React.FC = () => {
  useEffect(() => {
    // Override body overflow for this demo page
    document.body.style.overflow = 'auto';
    return () => {
      // Restore original overflow when component unmounts
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-neutral-900 text-white p-8 pb-16 space-y-12">
      <header className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold">Glass Surface</h1>
        <p className="text-gray-400">Proof of Concept over Real Imagery</p>
      </header>

      {/* Scenario 1: City Lights - Great for Refraction */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 ml-2">
          High Contrast Background
        </h3>
        <section className="relative w-full rounded-3xl overflow-hidden h-[400px] flex items-center justify-center shadow-2xl border border-white/10 group">
          {/* Background Image: Tokyo Night */}
          <img
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop"
            alt="City Background"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Standard Usage */}
          <GlassSurface
            width={300}
            height={200}
            borderRadius={24}
            className="shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
              Night City
            </h2>
          </GlassSurface>
        </section>
      </div>

      {/* Scenario 2: Abstract Texture - Great for Chromatic Aberration */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 ml-2">
          Textured Background
        </h3>
        <section className="relative w-full rounded-3xl overflow-hidden h-[400px] flex items-center justify-center shadow-2xl border border-white/10 group">
          {/* Background Image: Abstract Fluid */}
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
            alt="Abstract Background"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
          />

          {/* Exact Config Usage (Wide Pill) */}
          <GlassSurface
            width={500}
            height={120}
            borderRadius={50}
            backgroundOpacity={0.1}
            saturation={1}
            borderWidth={0.07}
            brightness={50}
            opacity={0.93}
            blur={11}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            className="shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-8 px-10 w-full justify-between">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1">
                  Project
                </span>
                <span className="text-3xl font-bold text-white drop-shadow-sm">Aurora</span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center rounded-full bg-green-400/20 px-3 py-1 text-xs font-medium text-green-300 ring-1 ring-inset ring-green-400/30 backdrop-blur-sm">
                  Active
                </span>
              </div>
            </div>
          </GlassSurface>
        </section>
      </div>

      <footer className="text-center text-gray-500 text-xs max-w-md mx-auto pt-8">
        Images via Unsplash. Note: Use Chrome/Edge for full SVG displacement effects.
      </footer>
    </div>
  );
};

export default GlassmorphicDemo;