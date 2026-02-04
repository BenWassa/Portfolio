import React from 'react';
import ReactDOM from 'react-dom/client';
// Check if we should show onboarding (for testing)
const urlParams = new URLSearchParams(window.location.search);
const showOnboarding = urlParams.get('onboarding') === 'true';

// Tailwind/base styles are required for all routes (including glass demo)
import './css/input.css';

async function renderApp() {
  let component;

  if (showOnboarding) {
    const { default: Onboarding } = await import('./Onboarding');
    component = <Onboarding />;
  } else {
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
