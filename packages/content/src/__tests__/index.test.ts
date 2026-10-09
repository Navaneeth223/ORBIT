import { describe, it, expect } from 'vitest';
import { CONTENT_PACKAGE_VERSION } from '../index';

describe('@orbit/content', () => {
  it('should export CONTENT_PACKAGE_VERSION constant', () => {
    expect(CONTENT_PACKAGE_VERSION).toBe('0.1.0');
  });

  it('should load the package without errors', () => {
    expect(() => {
      // Import succeeds if we reach this point
      const version = CONTENT_PACKAGE_VERSION;
      expect(typeof version).toBe('string');
    }).not.toThrow();
  });
});
