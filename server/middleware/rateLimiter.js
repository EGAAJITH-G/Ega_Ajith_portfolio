const rateLimitMap = new Map();

export const rateLimiter = (windowMs, max) => {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
    const now = Date.now();
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, []);
    }
    
    const timestamps = rateLimitMap.get(ip).filter(ts => now - ts < windowMs);
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    
    if (timestamps.length > max) {
      return res.status(429).json({
        error: 'TOO_MANY_REQUESTS',
        message: 'Too many requests from this device. Please try again later.'
      });
    }
    next();
  };
};
