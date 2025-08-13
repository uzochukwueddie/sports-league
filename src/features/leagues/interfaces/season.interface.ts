import type { Dispatch } from 'react';

export interface SeasonBadgeUrl {
  leagueId: string;
  badgeUrl: string;
}

export interface SeasonBadgeError {
  leagueId: string;
  error: string;
}

export interface SeasonType {
  type: string;
  payload?: string | SeasonBadgeUrl | SeasonBadgeError;
}

export interface SeasonState {
  seasonBadges: Record<string, string | null>;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
}

export interface Season {
  strBadge: string;
  strSeason: string;
}

export interface SeasonsResponse {
  seasons: Season[];
}

export const initialSeasonState: SeasonState = {
  seasonBadges: {},
  loading: {},
  errors: {}
};

export interface SeasonContextType {
  state: SeasonState;
  dispatch: Dispatch<SeasonType>;
  fetchSeasonBadge: (leagueId: string) => Promise<void>;
  getBadgeStatus: (leagueId: string) => {
    badgeUrl: string | null;
    loading: boolean;
    error: string | null;
  };
}
