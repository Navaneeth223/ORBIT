import { FastifyPluginAsync, FastifyError } from 'fastify';

/**
 * Global error handler plugin
 */
export const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    // Log the error with context
    request.log.error(
      {
        error: {
          message: error.message,
          stack: error.stack,
          statusCode: error.statusCode,
        },
        url: request.url,
        method: request.method,
      },
      'Request error'
    );

    // Determine status code
    const statusCode = error.statusCode ?? 500;

    // Send standardized error response
    reply.status(statusCode).send({
      error: {
        message: statusCode >= 500 ? 'Internal Server Error' : error.message,
        statusCode,
      },
    });
  });
};
