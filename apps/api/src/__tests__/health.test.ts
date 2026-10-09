import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../app.js';
import type { FastifyInstance } from 'fastify';
import { HealthResponseSchema } from '@orbit/shared';

describe('Health Check Endpoint', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 with correct health response shape', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);

    // Validate response matches the schema
    const result = HealthResponseSchema.safeParse(body);
    expect(result.success).toBe(true);

    // Check specific fields
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeDefined();
    expect(typeof body.timestamp).toBe('string');
    expect(body.version).toBeDefined();
    expect(typeof body.version).toBe('string');

    // Verify timestamp is valid ISO 8601
    const timestamp = new Date(body.timestamp);
    expect(timestamp.toString()).not.toBe('Invalid Date');
  });
});
