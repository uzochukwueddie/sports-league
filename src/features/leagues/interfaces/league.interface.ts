import type { Dispatch } from 'react';

export interface LeagueType {
  type: string;
  payload?: string | League[] | Error;
}

export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
}

export interface LeaguesResponse {
  leagues: League[];
}

export interface LeaguesState {
  leagues: League[];
  loading: boolean;
  error: Error | null;
  selectedSport: string;
  searchTerm: string;
}

export interface LeaguesContextType {
  state: LeaguesState;
  dispatch: Dispatch<LeagueType>;
  fetchLeagues: () => Promise<void>;
  getFilteredLeagues: () => League[];
  getSportTypes: () => string[];
}

export const initialLeagueState: LeaguesState = {
  leagues: [],
  loading: false,
  error: null,
  selectedSport: 'all sports',
  searchTerm: ''
};
