import Fastify from 'fastify';
import { logger } from './utils/logger.js';
import { corsPlugin } from './plugins/cors.js';
import { errorHandlerPlugin } from './plugins/error-handler.js';
import { healthRoutes } from './routes/health.js';

/**
 * Build and configure Fastify application
 */
export async function buildApp() {
  const app = Fastify({
    logger,
    // Generate request IDs for tracing
    requestIdLogLabel: 'requestId',
    disableRequestLogging: false,
  });

  // Register plugins
  await app.register(corsPlugin);
  await app.register(errorHandlerPlugin);

  // Register routes
  await app.register(healthRoutes);

  return app;
}
