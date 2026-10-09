# Implementation Plan: Milestone 0 — Foundations

> This plan creates the complete monorepo structure for ORBIT with pnpm workspaces, Turborepo, React PWA, Fastify API, shared packages, design tokens, CI/CD, and local development environment.

**Workspace**: d:/Portfolio_Projects/testing_kiro/ORBIT

**Existing state**: Empty workspace with tracking files (CHANGELOG.md, DECISIONS.md, PROGRESS.md, TODO.md) and docs/ directory already created.

---

## Overview

This milestone establishes the foundational monorepo structure with:

- **Tooling**: pnpm workspaces + Turborepo, TypeScript strict mode, ESLint, Prettier, Husky hooks, commitlint
- **Frontend**: Vite + React 18 PWA with Tailwind CSS, design tokens, i18next (en/th), React Router
- **Backend**: Fastify 4 TypeScript API with Zod validation, Pino logging, MongoDB connection
- **Packages**: shared (types/schemas/constants), content (seed data stub), game-engine (logic stub), config (shared tooling configs)
- **Infrastructure**: Docker Compose (MongoDB, Redis, MailHog), GitHub Actions CI
- **Documentation**: README, runbooks, ADR structure

All work is organized into 6 sequential features (FEATs) that build on each other. Each FEAT leaves the codebase in a working, testable state.

---

## Feature Breakdown

### FEAT-001: Monorepo Tooling Setup

Initialize Git, configure pnpm workspaces, Turborepo, shared ESLint/Prettier/TypeScript configs, Git hooks.

### FEAT-002: Shared Package

Create packages/shared with APP_NAME constant, Zod schemas, and common types.

### FEAT-003: Content and Game Engine Stubs

Create placeholder packages for content (seed data) and game-engine (pure logic).

### FEAT-004: React PWA (apps/web)

Vite + React app with Tailwind, design tokens as CSS variables, i18next, routing, PWA manifest.

### FEAT-005: Fastify API (apps/api)

TypeScript API with /health endpoint, env validation, logging, MongoDB connection.

### FEAT-006: Infrastructure and Documentation

Docker Compose, GitHub Actions CI, README, runbooks, final integration verification.

---

## Detailed Steps

### FEAT-001: Monorepo Tooling Setup

**Dependencies**: None (foundation feature)

**Files to create**:

- `.gitignore`
- `pnpm-workspace.yaml`
- `package.json` (root)
- `turbo.json`
- `packages/config/package.json`
- `packages/config/tsconfig.base.json`
- `packages/config/eslint.config.js`
- `packages/config/.prettierrc.json`
- `.eslintrc.json` (root)
- `.prettierrc.json` (root)
- `tsconfig.json` (root)
- `.husky/pre-commit`
- `.husky/commit-msg`
- `.lintstagedrc.json`
- `commitlint.config.js`

**Key content**:

1. **pnpm-workspace.yaml**: Define workspace patterns `apps/*` and `packages/*`

2. **Root package.json**:
   - Scripts: `dev`, `build`, `test`, `lint`, `type-check`, `format`, `format:check`
   - DevDependencies: `turbo`, `typescript@^5`, `prettier@^3`, `eslint@^9`, `husky@^9`, `lint-staged@^15`, `@commitlint/cli`, `@commitlint/config-conventional`
   - Use `workspace:*` protocol for internal dependencies

3. **turbo.json**: Define pipelines for all scripts with proper dependency chains:
   - `build` depends on `^build` (build dependencies first)
   - `test` depends on `build`
   - `lint`, `type-check` can run in parallel

4. **packages/config/tsconfig.base.json**:

   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noUncheckedIndexedAccess": true,
       "module": "ESNext",
       "moduleResolution": "bundler",
       "target": "ES2022",
       "esModuleInterop": true,
       "skipLibCheck": true,
       "resolveJsonModule": true
     }
   }
   ```

5. **packages/config/eslint.config.js**: Flat config with TypeScript + React rules, custom rules:
   - `no-console`: error in production
   - `@typescript-eslint/no-explicit-any`: warn (require comment explaining why)

6. **Git hooks**:
   - `.husky/pre-commit`: `pnpm lint-staged`
   - `.husky/commit-msg`: `pnpm commitlint --edit $1`

**Verification**:

```bash
pnpm install
pnpm lint        # Should pass (no files yet)
pnpm format:check # Should pass
git add .
git commit -m "test: verify commitlint" # Should succeed
git commit -m "bad message" # Should fail
```

---

### FEAT-002: Shared Package

**Dependencies**: FEAT-001 (requires monorepo tooling)

**Files to create**:

- `packages/shared/package.json`
- `packages/shared/tsconfig.json`
- `packages/shared/src/constants.ts`
- `packages/shared/src/schemas/health.schema.ts`
- `packages/shared/src/types/index.ts`
- `packages/shared/src/index.ts`
- `packages/shared/vitest.config.ts`
- `packages/shared/src/__tests__/constants.test.ts`
- `packages/shared/src/__tests__/schemas.test.ts`

**Key content**:

1. **package.json**:

   ```json
   {
     "name": "@orbit/shared",
     "type": "module",
     "main": "./dist/index.js",
     "exports": { ".": "./dist/index.js" },
     "scripts": {
       "build": "tsc",
       "test": "vitest"
     },
     "dependencies": {
       "zod": "^3.23.0"
     },
     "devDependencies": {
       "typescript": "^5.0.0",
       "vitest": "^1.0.0"
     }
   }
   ```

2. **src/constants.ts**:

   ```typescript
   export const APP_NAME = 'ORBIT' as const;
   ```

3. **src/schemas/health.schema.ts**:

   ```typescript
   import { z } from 'zod';

   export const HealthResponseSchema = z.object({
     status: z.literal('ok'),
     timestamp: z.string(),
     version: z.string(),
   });

   export type HealthResponse = z.infer<typeof HealthResponseSchema>;
   ```

4. **Tests**: Verify APP_NAME value, HealthResponseSchema validation (valid input passes, invalid fails)

**Verification**:

```bash
pnpm --filter @orbit/shared build
pnpm --filter @orbit/shared test
# Confirm dist/ directory exists with index.js and index.d.ts
```

---

### FEAT-003: Content and Game Engine Stubs

**Dependencies**: FEAT-001 (requires monorepo tooling)

**Files to create**:

- `packages/content/package.json`
- `packages/content/tsconfig.json`
- `packages/content/README.md`
- `packages/content/src/index.ts`
- `packages/content/src/__tests__/index.test.ts`
- `packages/game-engine/package.json`
- `packages/game-engine/tsconfig.json`
- `packages/game-engine/README.md`
- `packages/game-engine/src/index.ts`
- `packages/game-engine/src/__tests__/index.test.ts`

**Key content**:

1. **packages/content/README.md**: Explain versioned seed-data approach — daily questions, stationery, companion species, game content stored as typed JSON with schemas

2. **packages/content/src/index.ts**: Comment placeholder for future exports

3. **packages/game-engine/README.md**: Document GameEngine interface contract:
   - Deterministic pure functions
   - Injectable clock (never `Date.now()`)
   - No side effects
   - All logic testable in isolation

4. **packages/game-engine/src/index.ts**:
   ```typescript
   // Future: scoring, reveal gating, orbit day calculations
   export interface GameEngine {
     // Placeholder for game logic
   }
   ```

**Verification**:

```bash
pnpm --filter @orbit/content build && pnpm --filter @orbit/game-engine build
pnpm --filter @orbit/content test && pnpm --filter @orbit/game-engine test
```

---

### FEAT-004: React PWA (apps/web)

**Dependencies**: FEAT-002 (imports @orbit/shared)

**Files to create**:

- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/vite.config.ts`
- `apps/web/tailwind.config.js`
- `apps/web/postcss.config.js`
- `apps/web/.env.example`
- `apps/web/index.html`
- `apps/web/src/main.tsx`
- `apps/web/src/App.tsx`
- `apps/web/src/index.css`
- `apps/web/src/styles/tokens.css`
- `apps/web/src/i18n/config.ts`
- `apps/web/src/i18n/locales/en.json`
- `apps/web/src/i18n/locales/th.json`
- `apps/web/src/pages/Splash.tsx`
- `apps/web/src/pages/Home.tsx`
- `apps/web/src/pages/HealthCheck.tsx`
- `apps/web/vitest.config.ts`
- `apps/web/src/__tests__/App.test.tsx`
- `apps/web/public/icons/192x192.png`
- `apps/web/public/icons/512x512.png`

**Key content**:

1. **package.json**:
   - Dependencies: `react@^18`, `react-dom@^18`, `react-router-dom@^6`, `i18next@^23`, `react-i18next@^14`, `tailwindcss@^3`, `@orbit/shared: workspace:*`
   - DevDependencies: `vite@^5`, `@vitejs/plugin-react@^4`, `vite-plugin-pwa@^0.19`, `vitest@^1`, `@testing-library/react@^14`, `jsdom@^24`

2. **vite.config.ts**: Configure Vite with React plugin and PWA plugin:

   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import { VitePWA } from 'vite-plugin-pwa';

   export default defineConfig({
     plugins: [
       react(),
       VitePWA({
         manifest: {
           name: 'ORBIT',
           short_name: 'ORBIT',
           theme_color: '#7c6af7',
           icons: [
             { src: '/icons/192x192.png', sizes: '192x192', type: 'image/png' },
             { src: '/icons/512x512.png', sizes: '512x512', type: 'image/png' },
           ],
         },
         registerType: 'autoUpdate',
         workbox: {
           globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
         },
       }),
     ],
   });
   ```

3. **src/styles/tokens.css**: Exact CSS variables from spec (see original task for full list):
   - Backgrounds: `--color-bg: #0f0f1a`, `--color-bg-elev: #1a1a2e`, etc.
   - Ink: `--color-ink: #f0eff4`, `--color-ink-soft: #a09eb8`, etc.
   - Brand: `--color-navi: #7c6af7`, `--color-raya: #f76aac`, etc.
   - Typography, spacing, radius tokens
   - Light theme overrides in `@media (prefers-color-scheme: light)`

4. **src/i18n/locales/en.json**:

   ```json
   {
     "app": { "name": "ORBIT", "tagline": "Two worlds. One orbit." },
     "splash": { "loading": "Finding your person…" },
     "nav": { "home": "Home" }
   }
   ```

5. **src/i18n/locales/th.json**: Thai translations with `_meta.reviewed: false`

6. **src/App.tsx**: React Router with routes: `/` (Splash), `/home` (Home), `/health-check` (HealthCheck)

7. **src/pages/Splash.tsx**: Display `app.name` and `app.tagline` from i18n, centered with design tokens

8. **Test**: Render Splash and verify tagline appears

**Gotchas**:

- Vite PWA plugin config syntax varies by version; use latest docs
- i18next initialization must complete before React renders (use Suspense)
- Design tokens must be imported before Tailwind base styles

**Verification**:

```bash
pnpm --filter @orbit/web dev
# Visit http://localhost:5173 - Splash page renders
# DevTools > Application > Manifest - verify manifest.json
pnpm --filter @orbit/web test # Tests pass
pnpm --filter @orbit/web build # Build succeeds
```

---

### FEAT-005: Fastify API (apps/api)

**Dependencies**: FEAT-002 (imports @orbit/shared)

**Files to create**:

- `apps/api/package.json`
- `apps/api/tsconfig.json`
- `apps/api/.env.example`
- `apps/api/src/config/env.ts`
- `apps/api/src/utils/logger.ts`
- `apps/api/src/db/mongoose.ts`
- `apps/api/src/routes/health.ts`
- `apps/api/src/plugins/cors.ts`
- `apps/api/src/plugins/error-handler.ts`
- `apps/api/src/app.ts`
- `apps/api/src/index.ts`
- `apps/api/vitest.config.ts`
- `apps/api/src/__tests__/health.test.ts`

**Key content**:

1. **package.json**:
   - Dependencies: `fastify@^4`, `@fastify/cors@^9`, `@fastify/cookie@^9`, `mongoose@^8`, `pino@^8`, `pino-pretty@^11`, `zod@^3`, `dotenv@^16`, `@orbit/shared: workspace:*`
   - DevDependencies: `tsx@^4`, `typescript@^5`, `vitest@^1`, `@types/node@^20`
   - Scripts: `dev` (tsx watch src/index.ts), `build` (tsc), `start` (node dist/index.js), `test` (vitest)

2. **tsconfig.json**: Extend base config with Node-specific settings:

   ```json
   {
     "extends": "../../packages/config/tsconfig.base.json",
     "compilerOptions": {
       "module": "NodeNext",
       "moduleResolution": "NodeNext",
       "outDir": "./dist",
       "rootDir": "./src"
     }
   }
   ```

3. **.env.example**: All required variables with explanations:
   - `NODE_ENV=development`
   - `PORT=4000`
   - `PUBLIC_WEB_ORIGIN=http://localhost:5173`
   - `MONGODB_URI=mongodb://localhost:27017/orbit`
   - `REDIS_URL=redis://localhost:6379`
   - `JWT_ACCESS_SECRET=change-me-in-production`
   - `JWT_REFRESH_SECRET=change-me-in-production`
   - `COOKIE_SECRET=change-me-in-production`
   - `MAX_USERS=2`

4. **src/config/env.ts**: Zod schema validating all env vars, parse on import, export typed config object:

   ```typescript
   import { z } from 'zod';

   const envSchema = z.object({
     NODE_ENV: z.enum(['development', 'production', 'test']),
     PORT: z.coerce.number().int().positive(),
     PUBLIC_WEB_ORIGIN: z.string().url(),
     MONGODB_URI: z.string(),
     REDIS_URL: z.string(),
     JWT_ACCESS_SECRET: z.string().min(32),
     JWT_REFRESH_SECRET: z.string().min(32),
     COOKIE_SECRET: z.string().min(32),
     MAX_USERS: z.coerce.number().int().min(2).max(2),
   });

   export const config = envSchema.parse(process.env);
   ```

5. **src/utils/logger.ts**: Pino with secret redaction:

   ```typescript
   import pino from 'pino';
   import { config } from '../config/env.js';

   export const logger = pino({
     level: config.NODE_ENV === 'production' ? 'info' : 'debug',
     redact: [
       'config.jwtAccessSecret',
       'config.jwtRefreshSecret',
       'config.cookieSecret',
     ],
     transport:
       config.NODE_ENV !== 'production'
         ? {
             target: 'pino-pretty',
             options: { colorize: true },
           }
         : undefined,
   });
   ```

6. **src/db/mongoose.ts**: MongoDB connection with error handling:

   ```typescript
   import mongoose from 'mongoose';
   import { config } from '../config/env.js';
   import { logger } from '../utils/logger.js';

   export async function connectDB() {
     try {
       await mongoose.connect(config.MONGODB_URI);
       logger.info('MongoDB connected successfully');
     } catch (error) {
       logger.error({ error }, 'MongoDB connection failed');
       process.exit(1);
     }
   }
   ```

7. **src/routes/health.ts**: GET /health endpoint:

   ```typescript
   import { FastifyPluginAsync } from 'fastify';
   import { HealthResponseSchema } from '@orbit/shared';

   export const healthRoutes: FastifyPluginAsync = async (fastify) => {
     fastify.get('/health', async () => {
       const response = {
         status: 'ok' as const,
         timestamp: new Date().toISOString(),
         version: process.env.npm_package_version || '0.1.0',
       };
       return HealthResponseSchema.parse(response); // Validate before returning
     });
   };
   ```

8. **src/app.ts**: Build Fastify app with plugins and routes

9. **src/index.ts**: Entry point: load env, connect DB, start server

10. **Test**: Verify GET /health returns 200 with correct shape

**Gotchas**:

- Fastify + TypeScript + ESM requires careful tsconfig (module: NodeNext)
- Mongoose connection must be awaited before starting server
- Environment validation should fail fast on startup

**Verification**:

```bash
# Start MongoDB (see FEAT-006 for Docker Compose)
docker run -d -p 27017:27017 mongo:7
pnpm --filter @orbit/api dev
# Visit http://localhost:4000/health - returns { status: "ok", timestamp, version }
curl http://localhost:4000/health
pnpm --filter @orbit/api test # Tests pass
pnpm --filter @orbit/api build # Compiles successfully
```

---

### FEAT-006: Infrastructure and Documentation

**Dependencies**: FEAT-001 through FEAT-005 (integrates everything)

**Files to create**:

- `docker-compose.yml` (root)
- `.github/workflows/ci.yml`
- `README.md` (root)
- `docs/features/.gitkeep`
- `docs/adr/.gitkeep`
- `docs/runbooks/local-development.md`
- `docs/runbooks/deployment.md`

**Key content**:

1. **docker-compose.yml**:

   ```yaml
   version: '3.9'

   services:
     mongo:
       image: mongo:7
       ports:
         - '27017:27017'
       volumes:
         - orbit-mongo-data:/data/db
       healthcheck:
         test: mongosh --eval 'db.adminCommand({ ping: 1 })'
         interval: 10s
         timeout: 5s
         retries: 3

     redis:
       image: redis:7-alpine
       ports:
         - '6379:6379'
       volumes:
         - orbit-redis-data:/data
       healthcheck:
         test: redis-cli ping
         interval: 10s
         timeout: 3s
         retries: 3

     mailhog:
       image: mailhog/mailhog
       ports:
         - '1025:1025'  # SMTP
         - '8025:8025'  # Web UI

   volumes:
     orbit-mongo-data:
     orbit-redis-data:
   ```

2. **.github/workflows/ci.yml**:

   ```yaml
   name: CI

   on:
     push:
       branches: [main]
     pull_request:
       branches: [main]

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
         - uses: pnpm/action-setup@v2
           with:
             version: 9
         - name: Install dependencies
           run: pnpm install --frozen-lockfile
         - name: Lint
           run: pnpm lint
         - name: Type check
           run: pnpm type-check
         - name: Test
           run: pnpm test
         - name: Build
           run: pnpm build
   ```

3. **README.md**:
   - Project description (ORBIT - cozy daily-connection game for two people in long-distance relationship)
   - Prerequisites: Node 20 LTS, pnpm 9+, Docker Desktop
   - Quick Start:
     ```bash
     git clone <repo>
     pnpm install
     docker compose up -d
     # Copy .env.example to .env in apps/api and apps/web
     pnpm dev
     # Visit http://localhost:5173 (web) and http://localhost:4000/health (API)
     ```
   - Project Structure: one-line descriptions of each app and package
   - Available Scripts: dev, build, test, lint, type-check, format
   - Link to ORBIT_MASTER_PROMPT.md for full specification

4. **docs/runbooks/local-development.md**: Step-by-step guide for new developers

5. **docs/runbooks/deployment.md**: Placeholder noting staging deployment docs coming after Milestone 0

6. **Update root package.json** with Docker scripts:
   - `docker:up`: `docker compose up -d`
   - `docker:down`: `docker compose down`
   - `docker:logs`: `docker compose logs -f`

**Verification**:

```bash
docker compose up -d
docker compose ps # All services healthy
pnpm install
pnpm lint
pnpm type-check
pnpm test # All tests pass
pnpm build # All packages build
pnpm dev # Start both web and api
# Visit http://localhost:5173 - Splash page
# Visit http://localhost:4000/health - Returns ok
# Visit http://localhost:8025 - MailHog UI
```

---

## Final Integration Checklist

After all FEATs complete:

- [ ] Git repository initialized
- [ ] All workspace packages install without errors
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes
- [ ] `pnpm test` passes (all tests green)
- [ ] `pnpm build` succeeds (all packages compile)
- [ ] Docker Compose starts MongoDB, Redis, MailHog
- [ ] `pnpm dev` starts both web (5173) and API (4000)
- [ ] Web app displays Splash page with "ORBIT" and tagline
- [ ] API /health endpoint returns 200 with correct JSON
- [ ] Language switching works (English ↔ Thai)
- [ ] Design tokens apply correctly (dark theme by default)
- [ ] Git hooks enforce conventional commits
- [ ] GitHub Actions CI workflow is valid YAML
- [ ] README provides clear onboarding
- [ ] All .env.example files documented

---

## Notes for Implementation

1. **Order matters**: FEATs must be completed sequentially as later FEATs depend on earlier ones.

2. **Commit frequently**: Use conventional commits after each logical unit of work within a FEAT.

3. **Verify incrementally**: Run tests and type-check after each file creation to catch errors early.

4. **Windows paths**: Use double quotes for paths with spaces in PowerShell commands.

5. **ESM gotchas**: All packages use `type: "module"` — file extensions in imports required (.js not .ts in compiled output).

6. **Vite PWA**: Icon files can be simple colored rectangles for Milestone 0; real icons come later.

7. **Thai translations**: Mark with `_meta.reviewed: false` — Raya will review in a future step.

8. **MongoDB connection**: Must succeed before API starts; fail fast if connection error.

9. **Secrets in logs**: Verify Pino redaction works by inspecting logs for JWT secrets.

10. **CI will fail initially**: GitHub Actions workflow is valid but tests must pass locally first.

---

## Success Criteria

Milestone 0 is complete when:

1. A new developer can clone the repo, run `pnpm install && docker compose up -d && pnpm dev`, and see the working app in under 5 minutes.

2. All tests pass (`pnpm test`) across all packages.

3. The web app is installable as a PWA (manifest.json serves correctly).

4. The API connects to MongoDB and responds to /health requests.

5. Conventional commits are enforced by Git hooks.

6. Both Navi and Raya can navigate to http://localhost:5173 on their respective machines and see "ORBIT — Two worlds. One orbit."

7. Documentation (README, runbooks) accurately describes the setup process.

This foundation supports all future milestones: authentication, daily rituals, games, encryption, and native shells.

---

**End of Plan**
