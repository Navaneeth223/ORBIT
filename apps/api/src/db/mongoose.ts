import mongoose from 'mongoose';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/**
 * Connect to MongoDB using Mongoose
 */
export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info('✅ MongoDB connected successfully');

    // Handle connection events
    mongoose.connection.on('error', (error) => {
      logger.error({ error }, '❌ MongoDB connection error');
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('✅ MongoDB reconnected');
    });
  } catch (error) {
    logger.error({ error }, '❌ Failed to connect to MongoDB');
    throw error;
  }
}

/**
 * Gracefully close MongoDB connection
 */
export async function disconnectDB(): Promise<void> {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
  } catch (error) {
    logger.error({ error }, 'Error closing MongoDB connection');
    throw error;
  }
}
