type RateLimitData = {
  count: number;
  resetTime: number;
};

const store = new Map<string, RateLimitData>();

export function getRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const data = store.get(key);

  if (!data || now > data.resetTime) {
    const newData = { count: 1, resetTime: now + windowMs };
    store.set(key, newData);
    return {
      success: true,
      remaining: limit - 1,
      reset: newData.resetTime,
    };
  }

  if (data.count >= limit) {
    return {
      success: false,
      remaining: 0,
      reset: data.resetTime,
    };
  }

  data.count += 1;
  return {
    success: true,
    remaining: limit - data.count,
    reset: data.resetTime,
  };
}
