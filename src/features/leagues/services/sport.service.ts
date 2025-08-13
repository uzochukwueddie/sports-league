import type { CacheResult } from '../interfaces/cache.interface';
import type { LeaguesResponse } from '../interfaces/league.interface';
import type { SeasonsResponse } from '../interfaces/season.interface';
import { CacheManager } from './cache.service';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const LEAGUES_CACHE_KEY = 'leagues';

class SportService {
  private cacheManager: CacheManager;
  private imagesCacheManager: CacheManager;

  constructor() {
    this.cacheManager = new CacheManager();
    this.imagesCacheManager = new CacheManager('sports-images-cache');
  }

  async getAllLeagues(skipCache = false): Promise<LeaguesResponse> {
    const url: string = `${BASE_URL}/all_leagues.php`;
    if (skipCache) {
      return this.fetchFromNetwork(url, LEAGUES_CACHE_KEY);
    }
    // Try to get data from cache
    try {
      if ('caches' in window) {
        const response = (await this.cacheManager.get(LEAGUES_CACHE_KEY)) as CacheResult;
        if (response) {
          return response.data as LeaguesResponse;
        }
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
    // Fallback if no cache data
    return this.fetchFromNetwork(url, LEAGUES_CACHE_KEY);
  }

  async getLeagueSeasons(leagueId: string, skipCache = false): Promise<SeasonsResponse> {
    const url: string = `${BASE_URL}/search_all_seasons.php?badge=1&id=${leagueId}`;
    if (skipCache) {
      return this.fetchFromNetwork<SeasonsResponse>(url, url);
    }
    // Try to get data from cache
    try {
      if ('caches' in window) {
        const response = (await this.cacheManager.get(url)) as CacheResult;
        if (response) {
          return response.data as SeasonsResponse;
        }
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
    // Fallback if no cache data
    return this.fetchFromNetwork<SeasonsResponse>(url, url);
  }

  async cacheImage(imageUrl: string): Promise<boolean> {
    if (!imageUrl || !('caches' in window)) {
      return false;
    }

    try {
      await this.imagesCacheManager.set(imageUrl, imageUrl);
      return true;
    } catch (error) {
      console.warn(`Failed to cache image ${imageUrl}:`, error);
      return false;
    }
  }

  async getCachedLeagueBadge(leagueId: string): Promise<string | null> {
    if (!('caches' in window)) {
      return null;
    }

    try {
      const url: string = `${BASE_URL}/search_all_seasons.php?badge=1&id=${leagueId}`;

      const cachedSeasonData = (await this.cacheManager.get(url)) as CacheResult;
      if (!cachedSeasonData) {
        return null;
      }

      const seasonsData = cachedSeasonData.data as SeasonsResponse;
      if (!seasonsData.seasons || seasonsData.seasons.length === 0) {
        return null;
      }

      const seasonWithBadge = seasonsData.seasons.find((season) => season.strBadge);
      if (!seasonWithBadge) {
        return null;
      }

      const cachedImage = await this.imagesCacheManager.get(seasonWithBadge.strBadge);
      if (cachedImage) {
        return seasonWithBadge.strBadge;
      }

      return null;
    } catch (error) {
      console.warn('Error checking cached league badge:', error);
      return null;
    }
  }

  private async fetchFromNetwork<T>(url: string, cacheKey: string): Promise<T> {
    try {
      const response: Response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Cache the response if Cache API is available
      if ('caches' in window) {
        this.cacheManager.set(cacheKey, data);
      }
      return data as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}
export const sportService: SportService = new SportService();
