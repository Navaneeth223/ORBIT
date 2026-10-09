import pino from 'pino';
import { config } from '../config/env.js';

/**
 * Pino logger with secret redaction and pretty printing in development
 */
export const logger = pino({
  level: config.NODE_ENV === 'test' ? 'silent' : 'info',
  redact: {
    paths: [
      'config.jwtAccessSecret',
      'config.jwtRefreshSecret',
      'config.cookieSecret',
      'JWT_ACCESS_SECRET',
      'JWT_REFRESH_SECRET',
      'COOKIE_SECRET',
    ],
    remove: true,
  },
  transport:
    config.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
});
