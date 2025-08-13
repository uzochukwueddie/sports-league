export interface CacheEntry<T = unknown> {
  data: T;
  ttl: number;
  expires: number;
}

export interface CacheResult<T = unknown> {
  data: T;
}
