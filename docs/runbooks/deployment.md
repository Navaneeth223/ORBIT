# Deployment Guide

> **Status:** Placeholder — Staging deployment will be documented after Milestone 0 verification.

## Overview

ORBIT will be deployed to:

- **API:** Fly.io (Singapore region) — Fastify server, MongoDB Atlas, Redis (Upstash or Fly.io Redis)
- **Web:** Cloudflare Pages — Static PWA served globally via CDN

## Deployment Strategy

1. **Milestone 0 (Current):** Local development only
2. **Milestone 1+:** Staging environment in Singapore region
3. **Post-launch:** Production environment with monitoring and backups

## Planned Architecture

### API (Fly.io)

- Region: Singapore (sin)
- MongoDB: MongoDB Atlas (Singapore cluster)
- Redis: Upstash Redis or Fly.io Redis
- Secrets: Fly.io secrets management
- Health checks: /health endpoint
- Auto-scaling: Disabled (single instance sufficient for 2 users)

### Web (Cloudflare Pages)

- Static build deployed via GitHub integration
- Global CDN distribution
- Environment variables via Cloudflare dashboard
- Preview deployments for PRs

### CI/CD Pipeline

- GitHub Actions runs tests on all pushes/PRs
- Merges to `main` trigger automatic deployments (staging only, not production)
- Production deployments are manual (via Git tag or manual trigger)

## Environment Variables

### Production API Environment

```bash
NODE_ENV=production
PORT=8080
PUBLIC_WEB_ORIGIN=https://orbit.pages.dev
MONGODB_URI=mongodb+srv://...
REDIS_URL=redis://...
JWT_ACCESS_SECRET=<generated>
JWT_REFRESH_SECRET=<generated>
COOKIE_SECRET=<generated>
MAX_USERS=2
```

### Production Web Environment

```bash
VITE_API_BASE_URL=https://orbit-api.fly.dev
VITE_WS_URL=wss://orbit-api.fly.dev
VITE_APP_NAME=ORBIT
```

## Deployment Steps (Coming Soon)

Detailed deployment steps for:

1. Setting up Fly.io app
2. Configuring MongoDB Atlas
3. Setting up Redis
4. Configuring Cloudflare Pages
5. Managing secrets
6. Database migrations
7. Rollback procedures
8. Monitoring and logs

---

This document will be populated after Milestone 0 is complete and verified locally.
