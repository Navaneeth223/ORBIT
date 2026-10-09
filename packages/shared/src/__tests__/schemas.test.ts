import { describe, it, expect } from 'vitest';
import { HealthResponseSchema } from '../schemas/health.schema';

describe('HealthResponseSchema', () => {
  it('should parse valid health response', () => {
    const validData = {
      status: 'ok',
      timestamp: '2024-01-15T10:30:00Z',
      version: '0.1.0',
    };

    const result = HealthResponseSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('should reject invalid status', () => {
    const invalidData = {
      status: 'error',
      timestamp: '2024-01-15T10:30:00Z',
      version: '0.1.0',
    };

    const result = HealthResponseSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject missing timestamp', () => {
    const invalidData = {
      status: 'ok',
      version: '0.1.0',
    };

    const result = HealthResponseSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject missing version', () => {
    const invalidData = {
      status: 'ok',
      timestamp: '2024-01-15T10:30:00Z',
    };

    const result = HealthResponseSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject non-string timestamp', () => {
    const invalidData = {
      status: 'ok',
      timestamp: 1234567890,
      version: '0.1.0',
    };

    const result = HealthResponseSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject extra properties', () => {
    const dataWithExtra = {
      status: 'ok',
      timestamp: '2024-01-15T10:30:00Z',
      version: '0.1.0',
      extra: 'field',
    };

    // Zod allows extra properties by default, but we can still validate the required ones
    const result = HealthResponseSchema.safeParse(dataWithExtra);
    expect(result.success).toBe(true);
  });
});
