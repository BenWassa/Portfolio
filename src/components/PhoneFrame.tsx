import React from 'react';

interface PhoneFrameProps {
  url: string;
  title: string;
  appName: string;
  description?: string;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ url, title, appName, description }) => {
  return (
    <div className="flex flex-col items-center gap-6 mb-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {description && <p className="text-sm text-slate-400">{description}</p>}
      </div>

      <div className="phone-stage">
        <div className="phone-frame">
          <iframe
            src={url}
            title={appName}
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
          />
        </div>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300 text-sm font-medium uppercase tracking-wider"
      >
        <span>Open {appName}</span>
        <span className="material-symbols-outlined text-base">open_in_new</span>
      </a>
    </div>
  );
};

export default PhoneFrame;
