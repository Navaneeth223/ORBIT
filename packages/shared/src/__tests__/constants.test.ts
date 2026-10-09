import { describe, it, expect } from 'vitest';
import { APP_NAME } from '../constants';

describe('constants', () => {
  it('APP_NAME should equal ORBIT', () => {
    expect(APP_NAME).toBe('ORBIT');
  });

  it('APP_NAME should be a string literal type', () => {
    const name: 'ORBIT' = APP_NAME;
    expect(name).toBe('ORBIT');
  });
});
