import { lazy } from 'react';

// Feature-level lazy loading
export const LazyLeagues = lazy(() => import('./Leagues'));

// UI Component lazy loading
export const LazyLeagueCard = lazy(() => import('./ui/LeagueCard'));
export const LazySearchBar = lazy(() => import('./ui/SearchBar'));
export const LazyDropdown = lazy(() => import('./ui/Dropdown'));
export const LazyPagination = lazy(() => import('./ui/Pagination'));
export const LazyEmptyLeagues = lazy(() => import('./ui/EmptyLeagues'));

// Provider lazy loading
export const LazyLeaguesProvider = lazy(() => import('./providers/LeaguesProvider'));
export const LazySeasonProvider = lazy(() => import('./providers/SeasonsProvider'));
