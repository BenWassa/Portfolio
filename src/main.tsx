import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/input.css';
import App from './App';
import Onboarding from './Onboarding';

// Check if we should show onboarding (for testing)
const urlParams = new URLSearchParams(window.location.search);
const showOnboarding = urlParams.get('onboarding') === 'true';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {showOnboarding ? <Onboarding /> : <App />}
  </React.StrictMode>,
);
