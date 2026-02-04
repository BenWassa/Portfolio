import React from 'react';
import ReactDOM from 'react-dom/client';
// Tailwind/base styles are required for all routes (including glass demo)
import './css/input.css';

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

function updateLastVisitTimestamp(): void {
  localStorage.setItem(VISIT_TIMESTAMP_KEY, new Date().toISOString());
}

async function renderApp() {
  const showOnboarding = shouldShowOnboarding();
  let component;

  if (showOnboarding) {
    const { default: Onboarding } = await import('./Onboarding');
    component = <Onboarding />;
  } else {
    // Update timestamp when entering main app (not on refresh)
    updateLastVisitTimestamp();
    const { default: App } = await import('./App');
    component = <App />;
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      {component}
    </React.StrictMode>,
  );
}

renderApp();
