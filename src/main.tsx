import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LazyLeaguesProvider, LazySeasonProvider } from './features/leagues/components/LazyComponents.tsx';
import { LoadingSpinner } from './features/leagues/components/ui/LoadingComponents.tsx';
import { ErrorBoundary } from './features/leagues/components/ui/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner size="lg" text="Initializing application..." />}>
        <LazyLeaguesProvider>
          <Suspense fallback={<LoadingSpinner size="md" text="Loading seasons..." />}>
            <LazySeasonProvider>
              <App />
            </LazySeasonProvider>
          </Suspense>
        </LazyLeaguesProvider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
