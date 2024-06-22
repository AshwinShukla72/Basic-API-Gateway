import express from "express"
import { createProxyMiddleware } from 'http-proxy-middleware'
import { logger } from "./utils/logger"
import type { Express, Request, Response, NextFunction } from "express"
import helmet from "helmet"
// Imports ⬆️
const app: Express = express()
app.use(express.json());
app.use(helmet())
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    headers: req.headers,
    query: req.query,
    body: req.body
  }, "Incoming Request");
  next();
});

app.use('/blogs', createProxyMiddleware({
  target: `http://${Bun.env.BLOG_SERVICE_ENDPOINT}:3001/api/blogs`,
  changeOrigin: true, // Change the origin header to match the target
  pathRewrite: {
    '^/blogs': ''
  }
}))
// Add Routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Hello from API Gateway" })
})

// Default error logging
app.use((error: Error, req: Request, res:Response, next:NextFunction) => {
  logger.error(error); // Log the error for debugging
  return res.status(500).json({ error: 'Something went wrong!' }); // Send a generic error response
});

app.listen(Bun.env.PORT, () => {
  logger.info(`API Gateway Server Started on PORT: ${Bun.env.PORT}`)
})

