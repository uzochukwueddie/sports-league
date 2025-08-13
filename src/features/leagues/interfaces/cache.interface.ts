export interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
  ttl: number;
  expires: number;
}

export interface CacheResult<T = unknown> {
  data: T;
  isStale: boolean;
  age: number;
  expires: number;
}
