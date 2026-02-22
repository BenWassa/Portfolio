import React from 'react';
import PhoneFrame from './components/PhoneFrame';

const EmbedDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">Live App Embeds</h1>
          <p className="text-slate-400 text-lg">
            Experience these apps directly in a mobile frame without leaving the portfolio.
          </p>
        </header>

        <div className="space-y-20">
          <PhoneFrame
            url="https://benwassa.github.io/punchbuggy/"
            title="Punchbuggy"
            appName="Punchbuggy"
            description="Minimalist game for pure play. No accounts, no gamification—just instant, honest fun."
          />

          <div className="my-20 border-t border-slate-700" />

          <PhoneFrame
            url="https://hearthv2--hearthv2.us-east4.hosted.app/?mode=demo"
            title="Hearth"
            appName="Hearth"
            description="Shared watchlist app. Reduce decision fatigue when choosing what to watch together."
          />
        </div>

        <div className="mt-20 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300 text-sm font-medium uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmbedDemo;
