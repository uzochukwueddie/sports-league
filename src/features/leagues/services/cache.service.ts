import type { CacheEntry, CacheResult } from "../interfaces/cache.interface";

export class CacheManager {
  private cacheName: string;
  private cache: Cache | null = null;

  constructor(cacheName = 'sports-leagues-cache') {
    this.cacheName = cacheName;
    this.init();
  }

  private async init(): Promise<void> {
    if ('caches' in window) {
      this.cache = await caches.open(this.cacheName);
    }
  }

  // Create cache entry with TTL metadata
  async set<T>(key: string, data: T, ttlSeconds = 300): Promise<boolean> {
    if (!this.cache) return false;

    const cacheEntry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
      expires: Date.now() + (ttlSeconds * 1000)
    };

    const response = new Response(JSON.stringify(cacheEntry), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `max-age=${ttlSeconds}`
      }
    });

    try {
      await this.cache.put(key, response);
      return true;
    } catch (error) {
      console.warn('Cache write failed:', error);
      return false;
    }
  }

  // Get cache entry and check TTL
  async get<T>(key: string): Promise<CacheResult<T> | null> {
    if (!this.cache) return null;

    try {
      const response = await this.cache.match(key);
      if (!response) return null;

      const cacheEntry: CacheEntry<T> = await response.json();
      const now = Date.now();

      // Check if entry has expired
      if (now > cacheEntry.expires) {
        await this.delete(key);
        return null;
      }

      return {
        data: cacheEntry.data,
        isStale: now > (cacheEntry.timestamp + (cacheEntry.ttl * 0.8)), // 80% of TTL
        age: now - cacheEntry.timestamp,
        expires: cacheEntry.expires
      };
    } catch (error) {
      console.warn('Cache read failed:', error);
      return null;
    }
  }

  // Delete specific cache entry
  async delete(key: string): Promise<boolean> {
    if (!this.cache) return false;
    try {
      return await this.cache.delete(key);
    } catch (error) {
      console.warn('Cache delete failed:', error);
      return false;
    }
  }

  // Clear all cache
  async clear(): Promise<boolean>  {
    if (!this.cache) return false;
    try {
      const keys = await this.cache.keys();
      const deletePromises = keys.map(request => this.cache?.delete(request));
      await Promise.all(deletePromises);
      return true;
    } catch (error) {
      console.warn('Cache clear failed:', error);
      return false;
    }
  }
}
