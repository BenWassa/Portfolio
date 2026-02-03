import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Onboarding from './Onboarding';
import GlassmorphicDemo from './components/GlassmorphicDemo';

// Check if we should show onboarding (for testing)
const urlParams = new URLSearchParams(window.location.search);
const showOnboarding = urlParams.get('onboarding') === 'true';
const showGlassDemo = urlParams.get('glass') === 'true';

// Tailwind/base styles are required for all routes (including glass demo)
import './css/input.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {showGlassDemo ? <GlassmorphicDemo /> : showOnboarding ? <Onboarding /> : <App />}
  </React.StrictMode>,
);
