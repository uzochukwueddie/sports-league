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
