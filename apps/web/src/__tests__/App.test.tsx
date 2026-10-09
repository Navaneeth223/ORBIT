import { describe, it, expect } from 'vitest';

describe('Web App', () => {
  it('smoke test: math works', () => {
    expect(2 + 2).toBe(4);
  });

  it('APP_NAME constant is available from shared package', async () => {
    const { APP_NAME } = await import('@orbit/shared');
    expect(APP_NAME).toBe('ORBIT');
  });
});
