import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n/config';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-bg-primary">
          <p className="text-ink-secondary">Loading...</p>
        </div>
      }
    >
      <App />
    </Suspense>
  </React.StrictMode>
);
