import { useReducer, useCallback, type FC, type ReactNode, type ReactElement } from 'react';
import { leaguesReducer, LeaguesContext } from '../../context/LeaguesContext';
import type { LeaguesState, League } from '../../interfaces/league.interface';
import { sportService } from '../../services/sport.service';

const initialState: LeaguesState = {
  leagues: [],
  loading: false,
  error: null,
  selectedSport: 'all sports',
  searchTerm: '',
};

const LeaguesProvider: FC<{ children: ReactNode }> = ({ children }): ReactElement => {
  const [state, dispatch] = useReducer(leaguesReducer, initialState);

  // Memoize fetchLeagues to prevent infinite API calls
  const fetchLeagues = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
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

    if (state.selectedSport !== 'all sports') {
      filtered = filtered.filter((league) => {
        return league.strSport.toLowerCase() === state.selectedSport.toLowerCase()
      });
    }

    if (state.searchTerm) {
      filtered = filtered.filter((league) =>
        league.strLeague.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        (league.strLeagueAlternate &&
          league.strLeagueAlternate.toLowerCase().includes(state.searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [state.leagues, state.selectedSport, state.searchTerm]);

  // Memoize getSportTypes to prevent infinite updates
  const getSportTypes = useCallback(() => {
    const sports = [...new Set(state.leagues.map((league: League) => league.strSport))];
    const data: string[] = sports.filter((sport) => sport).sort();
    return ['All Sports', ...data];
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


