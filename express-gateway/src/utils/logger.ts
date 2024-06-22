import pino from "pino"
// Create a Pino logger instance
export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:standard',
      ignore: "pid,hostname",
      colorize: true
    }
  }
});
