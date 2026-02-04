import React from 'react';
import ReactDOM from 'react-dom/client';
// Tailwind/base styles are required for all routes (including glass demo)
import './css/input.css';
import App from './App';
import Onboarding from './Onboarding';

// Log app version
console.log(
  '%c Benjamin P. Haddon Portfolio',
  'font-size: 14px; font-weight: bold; color: #d4af37;'
);
console.log('%c v3.6.0', 'font-size: 12px; color: #888; margin-bottom: 10px;');

// Onboarding logic with proper session management
const ONBOARDING_EXPIRY_DAYS = 7; // Show onboarding again after 7 days
const VISIT_TIMESTAMP_KEY = 'portfolio_last_visit';

function shouldShowOnboarding(): boolean {
  // Always show onboarding if explicitly requested via URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('onboarding') === 'true') {
    return true;
  }

  // Check localStorage for last visit timestamp
  const lastVisitStr = localStorage.getItem(VISIT_TIMESTAMP_KEY);
  if (!lastVisitStr) {
    // First visit - show onboarding
    return true;
  }

  try {
    const lastVisit = new Date(lastVisitStr);
    const now = new Date();
    const daysSinceLastVisit = (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24);

    // Show onboarding if it's been more than ONBOARDING_EXPIRY_DAYS days
    return daysSinceLastVisit > ONBOARDING_EXPIRY_DAYS;
  } catch (error) {
    // If there's an error parsing the date, show onboarding to be safe
    console.warn('Error parsing last visit timestamp:', error);
    return true;
  }
}

async function renderApp() {
  const showOnboarding = shouldShowOnboarding();
  if (!showOnboarding) {
    localStorage.setItem(VISIT_TIMESTAMP_KEY, new Date().toISOString());
  }

  const component = showOnboarding ? (
    <OnboardingGate />
  ) : (
    <div className="min-h-screen opacity-100">
      <App />
    </div>
  );

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>{component}</React.StrictMode>
  );
}

renderApp();

function OnboardingGate() {
  const [showApp, setShowApp] = React.useState(false);
  const [appVisible, setAppVisible] = React.useState(false);

  const handleExitComplete = () => {
    setShowApp(true);
    requestAnimationFrame(() => setAppVisible(true));
  };

  return (
    <div className="min-h-screen">
      {!showApp && <Onboarding onExitComplete={handleExitComplete} />}
      {showApp ? (
        <div
          className={`min-h-screen transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            appVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <App />
        </div>
      ) : null}
    </div>
  );
}
