# ORBIT — Progress Tracker

## Current Milestone: Milestone 0 — Foundations

**Goal**: A running monorepo with CI and a hello-world deployed.

**Status**: Completed

**Completion Date**: 2025-01-19

---

## Understanding Summary

### Product Vision

- Private two-person long-distance relationship game
- Daily 10-minute ritual with reveals, slow letters, cooperative games
- Journey toward "Meet in the Middle" and real-world meeting
- Emotional warmth, zero guilt mechanics, absolute privacy

### The Two Users

- **Navi**: Developer in Kerala, India (Asia/Kolkata, UTC+5:30)
- **Raya**: Non-developer in Thailand (Asia/Bangkok, UTC+7)
- 1.5 hour time difference, both use mixed devices
- Thai UI must be fully functional; English fallback

### Platform Strategy

- PWA-first (responsive web app, installable)
- Capacitor native shells for iOS/Android (push, haptics)
- Optional Tauri for desktop
- One codebase, all platforms, shared account

### Tech Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Frontend**: Vite + React 18 + React Router + Tailwind CSS + i18next
- **Backend**: Fastify + TypeScript + Zod validation + Socket.IO
- **Database**: MongoDB (Mongoose) + Redis (presence/jobs)
- **Deployment**: Singapore region (Cloudflare Pages, Fly.io, MongoDB Atlas)

### Key Technical Principles

- Server-authoritative reveal gating (partner content hidden until both lock)
- Pure game engine (deterministic functions)
- Idempotent operations (opId on mutations)
- Time zone injection (IANA IDs, never hardcoded offsets)
- E2EE for personal content (libsodium, Milestone 5)

### No Contradictions Found

The document is comprehensive and internally consistent. One clarification assumed:

- "Working title: ORBIT" stored in ONE config constant (using `packages/shared/src/constants.ts`)

---

## Milestone 0 Tasks

- [x] Create monorepo structure (pnpm + Turborepo)
- [x] Setup TypeScript strict, ESLint, Prettier, Husky, commitlint
- [x] Vite React app with Tailwind, router, i18n (en/th), theme tokens, PWA manifest
- [x] Fastify API with /health, config validation, logging
- [x] MongoDB connection, Docker Compose for local dev
- [x] GitHub Actions CI (lint, type-check, test, build)
- [x] Deploy instructions for staging (Singapore region)
- [x] README with setup steps, .env.example
- [x] All tests passing

---

## Decisions Log

See DECISIONS.md for all architectural choices.

---

## Next Steps

After Milestone 0 approval:

- Milestone 1: Authentication, pairing, presence, first pings
