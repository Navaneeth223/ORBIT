# ORBIT

> **Two worlds. One orbit.**

A cozy, daily-connection game for two people in a long-distance relationship. Built with warmth, privacy, and care.

## About

ORBIT is a private, two-person application designed to help long-distance partners stay connected through daily rituals, shared moments, and playful interactions. It's not a social network — it's a love letter written in code.

**Key Principles:**

- Privacy is absolute (max 2 users, no analytics, no trackers)
- Emotional warmth is the primary feature
- No guilt mechanics, no streak anxiety
- Time-zone aware (Asia/Kolkata UTC+5:30 and Asia/Bangkok UTC+7)
- Works everywhere (iPhone, Android, desktop, any modern browser)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20 LTS or higher ([download](https://nodejs.org/))
- **pnpm** 9+ (`npm install -g pnpm`)
- **Docker Desktop** for local development services ([download](https://www.docker.com/products/docker-desktop/))
- **Git** for version control

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd ORBIT

# Install dependencies
pnpm install

# Start Docker services (MongoDB, Redis, MailHog)
docker compose up -d

# Copy environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Start development servers (web + api)
pnpm dev

# Run tests
pnpm test
```

Visit:

- **Web app:** http://localhost:5173
- **API health:** http://localhost:4000/health
- **MailHog UI:** http://localhost:8025 (email testing)

## Project Structure

This is a **pnpm monorepo** managed with **Turborepo**.

```
ORBIT/
├── apps/
│   ├── web/              # Vite + React 18 PWA with Tailwind CSS
│   └── api/              # Fastify 4 TypeScript server with MongoDB
├── packages/
│   ├── shared/           # Common types, Zod schemas, constants
│   ├── content/          # Seed data (questions, stationery, etc.)
│   ├── game-engine/      # Pure game logic (scoring, gating, etc.)
│   └── config/           # Shared ESLint, Prettier, TypeScript configs
├── docs/
│   ├── features/         # Feature documentation
│   ├── adr/              # Architecture Decision Records
│   └── runbooks/         # Deployment and operational guides
├── .github/
│   └── workflows/        # GitHub Actions CI pipeline
└── docker-compose.yml    # Local development services
```

## Available Scripts

Run these from the repository root:

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Start both web and API in development mode |
| `pnpm build`        | Build all packages and apps                |
| `pnpm test`         | Run all tests across the monorepo          |
| `pnpm lint`         | Lint all TypeScript and config files       |
| `pnpm type-check`   | Type-check all TypeScript files            |
| `pnpm format`       | Format code with Prettier                  |
| `pnpm format:check` | Check code formatting                      |
| `pnpm docker:up`    | Start Docker services in detached mode     |
| `pnpm docker:down`  | Stop and remove Docker services            |
| `pnpm docker:logs`  | Follow logs from all Docker services       |

### Workspace-Specific Scripts

Run scripts in a specific package:

```bash
# Run web app only
pnpm --filter @orbit/web dev

# Test API only
pnpm --filter @orbit/api test

# Build shared package
pnpm --filter @orbit/shared build
```

## Environment Variables

Both `apps/web` and `apps/api` require environment variables:

1. Copy `.env.example` to `.env` in each app directory
2. Update values as needed for your local setup
3. **Never commit `.env` files** — they contain secrets

See each app's `.env.example` for required variables and descriptions.

## Docker Services

Local development uses three Docker services:

- **MongoDB 7** on port `27017` — primary database
- **Redis 7** on port `6379` — session storage and caching
- **MailHog** on ports `1025` (SMTP) and `8025` (web UI) — email testing

Start all services:

```bash
pnpm docker:up
```

Stop all services:

```bash
pnpm docker:down
```

Check service health:

```bash
docker compose ps
```

## Development Workflow

1. **Create a feature branch** from `main`

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make changes** and verify locally

   ```bash
   pnpm dev       # Start dev servers
   pnpm test      # Run tests
   pnpm lint      # Check code quality
   ```

3. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/)

   ```bash
   git commit -m "feat: add new feature"
   # Types: feat, fix, chore, docs, test, refactor
   ```

4. **Pre-commit hooks** will automatically:
   - Lint and format staged files
   - Validate commit message format

5. **Push and create a pull request**

## Documentation

- **[ORBIT_MASTER_PROMPT.md](./ORBIT_MASTER_PROMPT.md)** — Complete product specification
- **[docs/runbooks/local-development.md](./docs/runbooks/local-development.md)** — Step-by-step local setup
- **[docs/runbooks/deployment.md](./docs/runbooks/deployment.md)** — Deployment procedures
- **[DECISIONS.md](./DECISIONS.md)** — Architecture decisions log
- **[PROGRESS.md](./PROGRESS.md)** — Milestone tracker
- **[TODO.md](./TODO.md)** — Task checklist

## Tech Stack

### Web App

- **Vite** — Fast build tool
- **React 18** — UI framework
- **TypeScript** (strict mode)
- **Tailwind CSS** with custom design tokens
- **i18next** — Internationalization (English, Thai, Malayalam)
- **PWA** — Offline-capable Progressive Web App

### API

- **Fastify 4** — High-performance Node.js framework
- **MongoDB** + Mongoose — Primary database
- **Redis** — Session storage
- **Pino** — Structured logging with secret redaction
- **Zod** — Runtime validation

### Tooling

- **pnpm workspaces** — Monorepo package management
- **Turborepo** — Build system orchestration
- **Vitest** — Unit testing
- **ESLint** + **Prettier** — Code quality
- **Husky** — Git hooks
- **commitlint** — Conventional commit enforcement

## Contributing

This is a private project for two people (Navi and Raya). If you're reading this, you're probably Navi setting it up, or Raya checking it out. 👋

## License

Private repository. All rights reserved.

---

Built with love 💜 for long-distance love.
