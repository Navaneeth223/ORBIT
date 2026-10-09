import { FastifyPluginAsync } from 'fastify';
import { HealthResponseSchema } from '@orbit/shared';
import type { HealthResponse } from '@orbit/shared';

/**
 * Health check route
 */
export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Reply: HealthResponse }>('/health', async (_request, reply) => {
    const response: HealthResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? '0.1.0',
    };

    // Validate response with Zod schema
    const validated = HealthResponseSchema.parse(response);

    return reply.status(200).send(validated);
  });
};
