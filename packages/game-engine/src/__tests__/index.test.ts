import { describe, it, expect } from 'vitest';
import { Clock, GameEngine, GAME_ENGINE_VERSION } from '../index';

describe('@orbit/game-engine', () => {
  it('should export GAME_ENGINE_VERSION constant', () => {
    expect(GAME_ENGINE_VERSION).toBe('0.1.0');
  });

  it('should export Clock interface', () => {
    // Verify Clock interface works as expected
    const frozenTime = new Date('2024-01-15T12:00:00Z');
    const testClock: Clock = {
      now: () => frozenTime,
    };

    expect(testClock.now()).toEqual(frozenTime);
    expect(testClock.now()).toEqual(testClock.now()); // Deterministic
  });

  it('should export GameEngine interface', () => {
    // Verify GameEngine interface is exported (structural check)
    const stubEngine: GameEngine = {};
    expect(stubEngine).toBeDefined();
  });

  it('should load the package without errors', () => {
    expect(() => {
      const version = GAME_ENGINE_VERSION;
      expect(typeof version).toBe('string');
    }).not.toThrow();
  });

  it('should demonstrate injectable clock pattern', () => {
    const timestamps: Date[] = [];
    const clock: Clock = {
      now: () => {
        const t = new Date('2024-01-01T00:00:00Z');
        timestamps.push(t);
        return t;
      },
    };

    // Simulate calling clock multiple times
    clock.now();
    clock.now();

    expect(timestamps).toHaveLength(2);
    expect(timestamps[0]).toEqual(timestamps[1]); // Frozen time
  });
});
