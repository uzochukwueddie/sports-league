import type { FC, ReactElement } from "react";
import LeaguesProvider from "./features/leagues/components/LeaguesProvider";
import Leagues from "./features/leagues/components/Leagues";
import { SeasonProvider } from "./features/leagues/components/SeasonsProvider";

const App: FC = (): ReactElement => {
  return (
    <LeaguesProvider>
      <SeasonProvider>
        <div className="min-h-screen py-4">
          <Leagues />
        </div>
      </SeasonProvider>
    </LeaguesProvider>
  );
}

export default App;
