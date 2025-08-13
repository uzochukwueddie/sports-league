import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import LeaguesProvider from './features/leagues/components/providers/LeaguesProvider.tsx';
import SeasonProvider from './features/leagues/components/providers/SeasonsProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LeaguesProvider>
      <SeasonProvider>
        <App />
      </SeasonProvider>
    </LeaguesProvider>
  </StrictMode>,
)
