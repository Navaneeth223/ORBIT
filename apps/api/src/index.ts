import { config } from './config/env.js';
import { logger } from './utils/logger.js';
import { connectDB, disconnectDB } from './db/mongoose.js';
import { buildApp } from './app.js';

/**
 * Start the server
 */
async function start() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Build Fastify app
    const app = await buildApp();

    // Start listening
    await app.listen({
      port: config.PORT,
      host: '0.0.0.0',
    });

    logger.info(`🚀 ORBIT API server ready at http://localhost:${config.PORT}`);

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      logger.info(`${signal} received, shutting down gracefully...`);
      try {
        await app.close();
        await disconnectDB();
        process.exit(0);
      } catch (error) {
        logger.error({ error }, 'Error during shutdown');
        process.exit(1);
      }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error({ error }, '❌ Failed to start server');
    process.exit(1);
  }
}

// Start the server
start();
