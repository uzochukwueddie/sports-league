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
