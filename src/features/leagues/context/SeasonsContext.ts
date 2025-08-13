import { createContext, useContext, type Dispatch } from "react";
import type { SeasonState } from "../interfaces/season.interface";

type SeasonAction =
  | { type: 'FETCH_BADGE_START'; payload: string }
  | { type: 'FETCH_BADGE_SUCCESS'; payload: { leagueId: string; badgeUrl: string } }
  | { type: 'FETCH_BADGE_ERROR'; payload: { leagueId: string; error: string } }

interface SeasonContextType {
  state: SeasonState;
  dispatch: Dispatch<SeasonAction>;
  fetchSeasonBadge: (leagueId: string) => Promise<void>;
  getBadgeStatus: (leagueId: string) => {
    badgeUrl: string | null;
    loading: boolean;
    error: string | null;
  };
}

export const SeasonsContext = createContext<SeasonContextType | undefined>(undefined);

export const seasonReducer = (state: SeasonState, action: SeasonAction): SeasonState => {
  switch (action.type) {
    case 'FETCH_BADGE_START':
      return {
        ...state,
        loading: { ...state.loading, [action.payload]: true },
        errors: { ...state.errors, [action.payload]: null },
      };
    case 'FETCH_BADGE_SUCCESS':
      return {
        ...state,
        seasonBadges: { ...state.seasonBadges, [action.payload.leagueId]: action.payload.badgeUrl },
        loading: { ...state.loading, [action.payload.leagueId]: false },
      };
    case 'FETCH_BADGE_ERROR':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.leagueId]: false },
        errors: { ...state.errors, [action.payload.leagueId]: action.payload.error },
      };
    default:
      return state;
  }
};

export const useSeasonContext = () => {
  const context = useContext(SeasonsContext);
  if (context === undefined) {
    throw new Error('useSeasonContext must be used within a SeasonProvider');
  }
  return context;
};
