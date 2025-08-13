import { Suspense, type FC, type ReactElement } from 'react';
import { FeatureLoading } from './features/leagues/components/ui/LoadingComponents';
import { LazyLeagues } from './features/leagues/components/LazyComponents';

const App: FC = (): ReactElement => {
  return (
    <div className="min-h-screen py-4">
      <Suspense fallback={<FeatureLoading />}>
        <LazyLeagues />
      </Suspense>
    </div>
  );
};

export default App;
