import { createContext, useContext } from "react";
import type { LeaguesState, League } from "../interfaces/league.interface";

type LeaguesAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: League[] }
  | { type: 'FETCH_ERROR'; payload: Error }
  | { type: 'SET_SELECTED_SPORT'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string };

interface LeaguesContextType {
  state: LeaguesState;
  dispatch: React.Dispatch<LeaguesAction>;
  fetchLeagues: () => Promise<void>;
  getFilteredLeagues: () => League[];
  getSportTypes: () => string[];
}

export const LeaguesContext = createContext<LeaguesContextType | undefined>(undefined);

export const leaguesReducer = (state: LeaguesState, action: LeaguesAction): LeaguesState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, leagues: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_SELECTED_SPORT':
      return { ...state, selectedSport: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
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
