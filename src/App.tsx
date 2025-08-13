import type { FC, ReactElement } from 'react';
import Leagues from './features/leagues/components/Leagues';

const App: FC = (): ReactElement => {
  return (
    <div className="min-h-screen py-4">
      <Leagues />
    </div>
  );
};

export default App;
