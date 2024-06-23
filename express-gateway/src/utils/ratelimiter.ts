import rateLimit from "express-rate-limit";

// Adding a rate-limiter
export const defaultRateLimiter = rateLimit({
  windowMs: 20 * 1000, // 10 seconds
  limit: 10,
  validate: {
		xForwardedForHeader: false,
		default: true,
	},
})