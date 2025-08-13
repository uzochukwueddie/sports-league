import type { CacheResult } from '../interfaces/cache.interface';
import type { LeaguesResponse } from '../interfaces/league.interface';
import type { SeasonsResponse } from '../interfaces/season.interface';
import { CacheManager } from './cache.service';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const LEAGUES_CACHE_KEY = 'leagues';
// const SEASONS_CACHE_KEY = 'seasons';

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

  /**
   * Cache a single image URL
   */
  async cacheImage(imageUrl: string): Promise<boolean> {
    if (!imageUrl || !('caches' in window)) {
      return false;
    }

    try {
      // Check if image is already cached
      // const cachedImage = await this.imagesCacheManager.get(imageUrl);
      // if (cachedImage) {
      //   return true; // Already cached
      // }

      // // Fetch and cache the image
      // const response = await fetch(imageUrl);
      // if (!response.ok) {
      //   throw new Error(`Failed to fetch image: ${response.status}`);
      // }

      // Store the image response in cache
      await this.imagesCacheManager.set(imageUrl, imageUrl); // Cache for 24 hours

      return true;
    } catch (error) {
      console.warn(`Failed to cache image ${imageUrl}:`, error);
      return false;
    }
  }

  /**
   * Get cached image URL or fetch from network if not cached
   */
  // async getCachedImageUrl(imageUrl: string): Promise<string> {
  //   if (!imageUrl || !('caches' in window)) {
  //     return imageUrl;
  //   }

  //   try {
  //     const cachedImage = await this.imagesCacheManager.get(imageUrl);
  //     if (cachedImage) {
  //       return imageUrl; // Return original URL, browser will use cached version
  //     }

  //     // If not cached, cache it in background and return original URL
  //     this.cacheImage(imageUrl).catch(error =>
  //       console.warn('Background image caching failed:', error)
  //     );

  //     return imageUrl;
  //   } catch (error) {
  //     console.warn('Error checking image cache:', error);
  //     return imageUrl;
  //   }
  // }

  /**
   * Check if league has cached season data and if the badge image is cached
   * Returns the cached badge URL if both season data and image are cached, null otherwise
   */
  async getCachedLeagueBadge(leagueId: string): Promise<string | null> {
    if (!('caches' in window)) {
      return null;
    }

    try {
      const url: string = `${BASE_URL}/search_all_seasons.php?badge=1&id=${leagueId}`;

      // Check if season data is cached
      const cachedSeasonData = (await this.cacheManager.get(url)) as CacheResult;
      if (!cachedSeasonData) {
        return null; // No cached season data
      }

      const seasonsData = cachedSeasonData.data as SeasonsResponse;
      if (!seasonsData.seasons || seasonsData.seasons.length === 0) {
        return null;
      }

      // Find the first season with a badge
      const seasonWithBadge = seasonsData.seasons.find((season) => season.strBadge);
      if (!seasonWithBadge) {
        return null;
      }

      // Check if the image is cached
      const cachedImage = await this.imagesCacheManager.get(seasonWithBadge.strBadge);
      if (cachedImage) {
        return seasonWithBadge.strBadge; // Both season data and image are cached
      }

      return null; // Season data cached but image not cached
    } catch (error) {
      console.warn('Error checking cached league badge:', error);
      return null;
    }
  }
}
export const sportService: SportService = new SportService();
