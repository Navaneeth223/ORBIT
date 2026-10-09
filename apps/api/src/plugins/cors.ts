import { FastifyPluginAsync } from 'fastify';
import fastifyCors from '@fastify/cors';
import { config } from '../config/env.js';

/**
 * CORS plugin configured for the web app origin
 */
export const corsPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyCors, {
    origin: config.PUBLIC_WEB_ORIGIN,
    credentials: true,
  });
};
