# ORBIT — Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Milestone 0 — Foundations

#### Added

- **FEAT-001**: Monorepo structure with pnpm workspaces and Turborepo for efficient multi-package builds
- **FEAT-002**: Web app (`apps/web`) with Vite, React 18, React Router, Tailwind CSS, i18next (English/Thai), PWA manifest, and design system tokens
- **FEAT-003**: API server (`apps/api`) with Fastify, Zod validation, Pino structured logging with secret redaction, MongoDB connection, and health check endpoint
- **FEAT-004**: Shared packages for TypeScript types, Zod schemas, constants, and UI components
- **FEAT-005**: Development environment with Docker Compose (MongoDB, Redis, MailHog), ESLint, Prettier, Husky pre-commit hooks, and commitlint
- **FEAT-006**: GitHub Actions CI pipeline for linting, type-checking, testing, and building across all workspaces
- Initial project documentation: README.md, PROGRESS.md, DECISIONS.md, TODO.md, CHANGELOG.md, .env.example

---

## Version History

Versions will be tagged as milestones complete:

- 0.1.0 — Milestone 0 (Foundations)
- 0.2.0 — Milestone 1 (Two People, One Thread)
- 0.3.0 — Milestone 2 (Daily Orbit)
- ... continuing through to 1.0.0 (The Day We Meet)

---

_Last updated: 2025-01-19_
