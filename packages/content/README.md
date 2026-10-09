# @orbit/content

> Versioned seed data and game content for ORBIT

## Purpose

This package contains all game content as typed, versioned JSON with Zod schemas:

- **Daily questions**: Conversation starters for the daily Question Exchange
- **Letter stationery**: Themed templates (colors, textures, borders) for written letters
- **Companion species**: Character options with personality traits and visual assets
- **Achievement definitions**: Unlock conditions and celebratory copy
- **Microcopy**: In-game flavor text, tooltips, encouragement messages
- **Seasonal events**: Holiday-specific content and time-limited prompts

## Design Principles

### 1. **Versioned and immutable**

Each content release is versioned (e.g., `v1.0.0`). Once published, content is immutable. New versions are added alongside old ones to support graceful rollouts and A/B testing.

```typescript
// Future structure
export const dailyQuestions = {
  v1: [...],
  v2: [...],
};
```

### 2. **Schema-validated**

Every content type has a Zod schema. Invalid content fails at build time, never at runtime.

```typescript
// Future example
const QuestionSchema = z.object({
  id: z.string(),
  en: z.string(),
  th: z.string(),
  tags: z.array(z.enum(['playful', 'deep', 'nostalgic', 'silly'])),
  minRelationshipDays: z.number().optional(),
});
```

### 3. **Localized at the source**

Content is authored with English and Thai strings inline, not via translation files. This ensures complete coverage and prevents missing translations.

```typescript
// Future example
{
  id: 'question-42',
  en: 'What's a song that always makes you think of me?',
  th: 'เพลงไหนที่ทำให้คุณนึกถึงฉันเสมอ?',
  tags: ['nostalgic'],
}
```

### 4. **Emotionally curated**

Content is hand-written, not generated. Every question, every piece of stationery, every companion trait is chosen to foster warmth, playfulness, and genuine connection. Tone matters as much as mechanics.

### 5. **No third-party assets without license verification**

All visual assets (stationery textures, companion illustrations) must either be:

- Original work
- CC0 / public domain
- Licensed with explicit attribution in `LICENSES.md`

## Current Status

This package is a placeholder stub. It will be populated in Milestone 2 (Game Content).

## Future Exports

```typescript
// Coming soon
export { dailyQuestions } from './questions';
export { stationery } from './stationery';
export { companions } from './companions';
export { achievements } from './achievements';
export { microcopy } from './microcopy';
```

## Testing Strategy

Content will be tested for:

- Schema validity (all items conform to their Zod schema)
- Completeness (no missing localizations)
- Uniqueness (no duplicate IDs)
- Tag consistency (all tags are from allowed enums)
- Relationship-awareness (questions gated by relationship duration reference realistic timelines)

## See Also

- `packages/game-engine`: Uses this content in game logic
- `packages/shared/src/schemas`: Shared validation schemas
- `docs/content-guidelines.md`: Writing guidelines for contributors (future)
