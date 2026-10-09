/**
 * @orbit/game-engine
 *
 * Pure, testable game logic for ORBIT.
 *
 * Design principles:
 * - Deterministic: same inputs → same outputs
 * - Injectable clock: never use Date.now() directly
 * - No side effects: no DB writes, no HTTP, no console logs (production)
 * - Time-zone aware: respect IANA zones for all date math
 * - Exhaustively tested: aim for 100% branch coverage
 * - No guilt mechanics: never punish missing a day
 * - Small, composable functions: do one thing well
 *
 * Future exports:
 * - Scoring: XP, levels, achievements
 * - Reveal gating: when letters/photos unlock
 * - Question selection: daily question rotation
 * - Companion logic: mood and trait evolution
 * - Streak calculation: graceful, time-zone-aware counting
 * - Notification scheduling: when to remind (not how)
 *
 * This package will be populated in Milestone 3.
 */

/**
 * Injectable clock for testable time-dependent logic.
 *
 * Never use Date.now() or new Date() directly in game logic.
 * Always accept a Clock and call clock.now().
 *
 * @example
 * ```typescript
 * const systemClock: Clock = { now: () => new Date() };
 * const frozenClock: Clock = { now: () => new Date('2024-01-01T00:00:00Z') };
 * ```
 */
export interface Clock {
  now: () => Date;
}

/**
 * GameEngine interface (placeholder).
 *
 * Future: This will be the main API surface for game logic.
 * All game mechanics will be pure functions operating on this interface.
 */
export interface GameEngine {
  // Future: scoring, reveal logic, question selection, etc.
  _placeholder?: never; // Prevents empty interface error
}

/**
 * Package version constant for verification.
 */
export const GAME_ENGINE_VERSION = '0.1.0' as const;
