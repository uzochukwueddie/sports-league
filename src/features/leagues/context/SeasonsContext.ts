import { createContext, useContext } from 'react';
import {
  initialSeasonState,
  type SeasonContextType,
  type SeasonState,
  type SeasonType,
  type SeasonBadgeUrl,
  type SeasonBadgeError
} from '../interfaces/season.interface';

export const SeasonsContext = createContext<SeasonContextType>({
  state: initialSeasonState,
  dispatch: () => null,
  fetchSeasonBadge: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBadgeStatus: (_leagueId: string) => ({
    badgeUrl: null,
    loading: false,
    error: null
  })
});

export const seasonsMainReducer = (state: SeasonState, action: SeasonType): SeasonState => ({
  seasonBadges: seasonReducer(state, action).seasonBadges,
  loading: seasonReducer(state, action).loading,
  errors: seasonReducer(state, action).errors
});

export const seasonReducer = (state: SeasonState, action: SeasonType): SeasonState => {
  switch (action.type) {
    case 'FETCH_BADGE_START':
      return {
        ...state,
        loading: { ...state.loading, [action.payload as string]: true },
        errors: { ...state.errors, [action.payload as string]: null }
      };
    case 'FETCH_BADGE_SUCCESS':
      return {
        ...state,
        seasonBadges: {
          ...state.seasonBadges,
          [(action.payload as SeasonBadgeUrl).leagueId]: (action.payload as SeasonBadgeUrl).badgeUrl
        },
        loading: { ...state.loading, [(action.payload as SeasonBadgeUrl).leagueId]: false }
      };
    case 'FETCH_BADGE_ERROR':
      return {
        ...state,
        loading: { ...state.loading, [(action.payload as SeasonBadgeError).leagueId]: false },
        errors: {
          ...state.errors,
          [(action.payload as SeasonBadgeError).leagueId]: (action.payload as SeasonBadgeError).error
        }
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
