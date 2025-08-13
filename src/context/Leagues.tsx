import { useReducer, useCallback, type FC, type ReactNode, type ReactElement } from 'react';
import { LeaguesContext, leaguesReducer } from '../features/leagues/context/LeaguesContext';
import type { League, LeaguesState } from '../features/leagues/interfaces/league.interface';
import { sportService } from '../features/leagues/services/sport.service';

const initialState: LeaguesState = {
  leagues: [],
  loading: false,
  error: null,
  selectedSport: 'all',
  searchTerm: '',
};

const LeaguesProvider: FC<{ children: ReactNode }> = ({ children }): ReactElement => {
  const [state, dispatch] = useReducer(leaguesReducer, initialState);

  // Memoize fetchLeagues to prevent infinite API calls
  const fetchLeagues = useCallback(async () => {
    // dispatch({ type: 'FETCH_START' });
    try {
      const response = await sportService.getAllLeagues();
      dispatch({ type: 'FETCH_SUCCESS', payload: response.leagues });
    } catch (err) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: err instanceof Error ? err : new Error('Failed to fetch leagues'),
      });
    }
  }, []);

  // Memoize getFilteredLeagues to prevent infinite updates
  const getFilteredLeagues = useCallback(() => {
    let filtered = [...state.leagues];

    if (state.selectedSport !== 'all') {
      filtered = filtered.filter((league) => league.strSport === state.selectedSport);
    }

    if (state.searchTerm) {
      filtered = filtered.filter((league) =>
        league.strLeague.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [state.leagues, state.selectedSport, state.searchTerm]);

  // Memoize getSportTypes to prevent infinite updates
  const getSportTypes = useCallback(() => {
    return [...new Set(state.leagues.map((league: League) => league.strSport))];
  }, [state.leagues]);

  return (
    <LeaguesContext.Provider
      value={{
        state,
        dispatch,
        fetchLeagues,
        getFilteredLeagues,
        getSportTypes,
      }}
    >
      {children}
    </LeaguesContext.Provider>
  );
};

export default LeaguesProvider;


