import express from "express"
import { createProxyMiddleware } from 'http-proxy-middleware'
import { logger } from "./utils/logger"
import type { Express, Request, Response, NextFunction } from "express"
// Imports ⬆️
const app: Express = express()
app.use(express.json());

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
// Add Routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Hello from server" })
})

app.listen(Bun.env.PORT, () => {
  logger.info(`Server Started on PORT: ${Bun.env.PORT}`)
})

