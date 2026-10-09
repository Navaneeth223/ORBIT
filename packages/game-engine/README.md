# @orbit/game-engine

> Pure, testable game logic for ORBIT

## Purpose

This package contains all game mechanics as deterministic, side-effect-free functions:

- **Scoring logic**: XP calculation, level-up thresholds, achievement unlocks
- **Reveal gating**: When letters/photos become readable based on response state
- **Question selection**: Daily question rotation with smart history avoidance
- **Companion evolution**: Trait changes based on interaction patterns
- **Streak calculation**: Graceful streak counting with time-zone awareness
- **Notification scheduling**: When to send reminders (no actual sending; that's API's job)

## Design Principles

### 1. **Deterministic and pure**

Every function is a pure function: same inputs → same output, every time. No hidden state, no randomness without a seed, no side effects.

```typescript
// ✅ Good: deterministic with injected seed
function selectDailyQuestion(date: Date, seed: number): Question { ... }

// ❌ Bad: non-deterministic
function selectDailyQuestion(date: Date): Question {
  const random = Math.random(); // Non-deterministic!
  ...
}
```

### 2. **Injectable clock**

Never use `Date.now()`, `new Date()`, or any time function directly. Always inject a clock.

```typescript
// ✅ Good: testable
interface Clock {
  now: () => Date;
}

function calculateStreak(clock: Clock, history: Response[]): number { ... }

// ❌ Bad: hardcoded time
function calculateStreak(history: Response[]): number {
  const now = new Date(); // Untestable!
  ...
}
```

This allows tests to freeze time and verify behavior across days, months, and time zones.

### 3. **No side effects**

The engine never:

- Writes to a database
- Makes HTTP requests
- Logs to console (except in test/debug builds)
- Mutates input arguments
- Reads from environment variables
- Generates UUIDs (accept them as input or use a seeded generator)

The engine is a **calculator**. It takes data in, returns data out. The API layer handles all I/O.

### 4. **Time-zone aware**

All date math respects IANA time zones (`Asia/Kolkata`, `Asia/Bangkok`). A "day" is not 86400 seconds—it's midnight-to-midnight in the user's zone.

Use libraries like `date-fns-tz` or `Temporal` (when stable) for reliable time-zone arithmetic.

```typescript
// ✅ Good: respects user time zone
function isSameGameDay(date1: Date, date2: Date, timeZone: string): boolean {
  const day1 = toZonedTime(date1, timeZone);
  const day2 = toZonedTime(date2, timeZone);
  return isSameDay(day1, day2);
}

// ❌ Bad: assumes UTC
function isSameGameDay(date1: Date, date2: Date): boolean {
  return date1.getUTCDate() === date2.getUTCDate(); // Time zone bugs!
}
```

### 5. **Tested to exhaustion**

Game logic is deterministic, which means it can be tested exhaustively. Every edge case, every time-zone boundary, every leap year quirk—test it all.

Aim for 100% branch coverage. If a branch is hard to test, the design is wrong.

### 6. **No guilt mechanics**

The engine never penalizes missing a day. Streaks are celebrated when they happen; broken streaks are acknowledged gently, never punished.

```typescript
// ✅ Good: streak breaks are just a number reset, no punishment
function calculateStreak(history: Response[]): number { ... }

// ❌ Bad: penalties for missing days
function calculateXP(history: Response[], missedDays: number): number {
  return baseXP - (missedDays * penaltyAmount); // No!
}
```

### 7. **Small, composable functions**

Every function does one thing. Compose small functions into larger ones. No 200-line mega-functions.

```typescript
// ✅ Good: small, composable
function calculateXP(response: Response): number { ... }
function applyStreak
(xp: number, streak: number): number { ... }
function calculateTotalXP(response: Response, streak: number): number {
  return applyStreakBonus(calculateXP(response), streak);
}

// ❌ Bad: giant function doing everything
function processResponse(response: Response, history: Response[], ...): ComplexResult {
  // 200 lines of spaghetti
}
```

## Current Status

This package is a placeholder stub. It will be populated in Milestone 3 (Core Game Loops).

## Future Exports

```typescript
// Coming soon
export { calculateXP, calculateLevel, checkAchievements } from './scoring';
export { shouldRevealLetter, shouldRevealPhoto } from './reveal';
export { selectDailyQuestion } from './questions';
export { calculateStreak, calculateEngagementMetrics } from './streaks';
export { getCompanionMood, evolveCompanionTraits } from './companion';
export type { GameEngine, Clock, ScoringConfig } from './types';
```

## Testing Strategy

Game logic will be tested with:

- **Property-based testing**: Generate thousands of random inputs, verify invariants hold
- **Time-travel testing**: Freeze clock, advance day-by-day, verify state transitions
- **Time-zone testing**: Run same scenarios in `Asia/Kolkata` and `Asia/Bangkok`, verify correctness
- **Edge-case testing**: Leap years, DST transitions, month boundaries, year boundaries
- **Regression testing**: Once a bug is found, add a test so it never returns

## Dependencies

This package should have minimal dependencies:

- `date-fns` or `date-fns-tz` for time-zone-aware date math
- `zod` for input validation schemas
- No framework dependencies (React, Fastify, etc.)
- No I/O dependencies (no database clients, no HTTP clients)

## See Also

- `packages/content`: Provides game content consumed by this engine
- `packages/shared`: Provides shared types and schemas
- `apps/api`: Uses this engine to implement game endpoints
- `docs/game-mechanics.md`: High-level game design document (future)
