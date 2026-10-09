# ORBIT — Architectural Decisions

> This file records all significant technical and design decisions made during development.
> Format: Date | Decision | Reasoning | Alternatives Considered

---

## 2026-10-09 | Monorepo with pnpm + Turborepo

**Reasoning**: Single source of truth, shared types/validation, easier local dev, fast builds with caching.
**Alternatives**: Separate repos (rejected: synchronization overhead), Nx (rejected: team is one person, simpler is better)

---

## 2026-10-09 | PWA-first with Capacitor wrappers

**Reasoning**: One codebase reaches all devices immediately; web URL for instant start; Capacitor adds native push/haptics without duplication.
**Alternatives**: React Native (rejected: Navi's skillset is React web), Flutter (rejected: learning curve), Native per platform (rejected: 3x effort)

---

## 2026-10-09 | Fastify over Express

**Reasoning**: Modern, TypeScript-first, fast, good validation/serialization story, excellent docs.
**Alternatives**: Express (acceptable if Navi prefers; switching cost is low)

---

## 2026-10-09 | MongoDB over PostgreSQL

**Reasoning**: Navi knows it; document model fits journals/letters/game states naturally; free Atlas tier sufficient.
**Alternatives**: PostgreSQL (considered; JSON columns would work but Mongoose is in Navi's comfort zone)

---

## 2026-10-09 | Singapore region for all infrastructure

**Reasoning**: Roughly equidistant between Kerala and Bangkok; low latency for both users; MongoDB Atlas, Fly.io, and Cloudflare all support ap-southeast-1.
**Alternatives**: Mumbai (closer to Navi but farther from Raya), Bangkok (reverse problem)

---

## 2026-10-09 | Orbit Day boundary at 04:00 Bangkok time

**Reasoning**: Both users most likely asleep; maps to 02:30 IST; allows late-night completion before rollover.
**Alternatives**: Midnight (rejected: one may complete after midnight before sleep), 06:00 (rejected: early risers penalized)

---

## 2026-10-09 | i18next for internationalization

**Reasoning**: Battle-tested, React integration, ICU MessageFormat support for plurals, namespace organization.
**Alternatives**: Lingui (considered; slightly more modern but i18next has broader ecosystem)

---

## 2026-10-09 | Zustand for client state, TanStack Query for server state

**Reasoning**: Zustand is simple and lightweight for UI toggles; TanStack Query handles caching/sync/optimistic updates with minimal boilerplate.
**Alternatives**: Redux (rejected: overkill), Context only (rejected: re-render issues)

---

## 2026-10-09 | Tailwind CSS with design tokens as CSS variables

**Reasoning**: Rapid development, consistent spacing/colors, purged output is tiny; CSS vars allow dynamic theming.
**Alternatives**: Styled-components (rejected: runtime cost), vanilla CSS (rejected: maintainability at scale)

---

## 2026-10-09 | Vitest over Jest

**Reasoning**: Vite-native, faster, same API as Jest, better ESM support.
**Alternatives**: Jest (works but requires transform config)

---

## 2026-10-09 | Conventional Commits enforced

**Reasoning**: Clean history, automated changelogs, clear intent per commit.
**Format**: `type(scope): description` where type = feat|fix|chore|docs|test|refactor

---

## 2026-10-09 | Hard cap: exactly 2 users (MAX_USERS=2)

**Reasoning**: Eliminates scaling concerns, abuse vectors, moderation needs; aligns with product vision.
**Implementation**: First registration creates couple; second must have invite code; third attempt returns 403.

---

## 2026-10-09 | APP_NAME stored in packages/shared/src/constants.ts

**Reasoning**: Master prompt specifies "ONE config constant"; shared package makes it available everywhere.
**Current value**: "ORBIT" (placeholder as specified)

---

## 2026-10-09 | Docker Compose for local development

**Reasoning**: Consistent environment across machines; MongoDB + Redis + MailHog in one command.
**Alternatives**: Localhost services (rejected: harder onboarding), cloud dev DB (rejected: network dependency)

---

## 2026-10-09 | GitHub Actions for CI/CD

**Reasoning**: Free for public/private repos, excellent ecosystem, easy secrets management.
**Alternatives**: GitLab CI (would work but GitHub is more common), CircleCI (overkill)

---

## To Be Decided

- [ ] Actual domain name (e.g., ourorbit.app)
- [ ] Exact stationery designs (deferred to content milestone)
- [ ] Companion species illustrations (deferred to delight milestone)
- [ ] Whether to use Render, Railway, or Fly.io for API (all work; will try Fly.io first for Singapore region)

---

## User Preferences (To Be Filled In)

From PART 3.2 - these will become editable settings:

- [ ] Anniversary date
- [ ] Exact cities (for distance calculation)
- [ ] Navi's preferred politeness (none/default for English)
- [ ] Raya's Thai politeness particle (ครับ / ค่ะ)
- [ ] Favorite foods, colors, songs (for personalization)
- [ ] Soft-no topics
- [ ] Sleep schedules
- [ ] Preferred call app (LINE, WhatsApp, FaceTime, etc.)

---

_This file grows as decisions are made. Every choice logged here avoids re-litigation later._
