import { createContext, useContext } from 'react';
import {
  type LeaguesState,
  type League,
  type LeagueType,
  type LeaguesContextType,
  initialLeagueState
} from '../interfaces/league.interface';

export const LeaguesContext = createContext<LeaguesContextType>({
  state: initialLeagueState,
  dispatch: () => null,
  fetchLeagues: async () => {},
  getFilteredLeagues: () => [],
  getSportTypes: () => []
});

export const leaguesMainReducer = (state: LeaguesState, action: LeagueType): LeaguesState => ({
  leagues: leaguesReducer(state, action).leagues,
  loading: leaguesReducer(state, action).loading,
  error: leaguesReducer(state, action).error,
  selectedSport: leaguesReducer(state, action).selectedSport,
  searchTerm: leaguesReducer(state, action).searchTerm
});

export const leaguesReducer = (state: LeaguesState, action: LeagueType): LeaguesState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, leagues: action.payload as League[] };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload as Error };
    case 'SET_SELECTED_SPORT':
      return { ...state, selectedSport: action.payload as string };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload as string };
    default:
      return state;
  }
};

export const useLeaguesContext = () => {
  const context = useContext(LeaguesContext);
  if (context === undefined) {
    throw new Error('useLeaguesContext must be used within a LeaguesProvider');
  }
  return context;
};
