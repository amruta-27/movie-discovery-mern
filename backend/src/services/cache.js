const cache = new Map();

export function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    cache.delete(key);
    return null;
  }
  return item.value;
}

export function setCached(key, value, ttl) {
  cache.set(key, { value, expiresAt: Date.now() + ttl });
}
