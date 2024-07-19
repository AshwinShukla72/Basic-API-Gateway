import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { logger } from './utils/logger';
import type { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { defaultRateLimiter } from './utils/ratelimiter';
import morgan from 'morgan';
// Imports ⬆️
const app: Express = express();
app.use(express.json());
app.use(helmet());

// setup the logger
app.use(morgan('dev'));

app.use(defaultRateLimiter);
app.use(
	'/blogs',
	createProxyMiddleware({
		target: Bun.env.BLOG_SERVICE_ENDPOINT,
		changeOrigin: false, // Change the origin header to match the target
		pathRewrite: {
			'^/blogs': '',
		},
	}),
);
// Add Routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
	return res.status(200).json({ message: 'Hello from API Gateway' });
});

// Default error logging
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	logger.error(error); // Log the error for debugging
	return res.status(500).json({ error: 'Something went wrong!' }); // Send a generic error response
});

app.listen(Bun.env.PORT, () => {
	logger.info(`API Gateway Server Started on PORT: ${Bun.env.PORT}`);
});
