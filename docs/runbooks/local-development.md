# Local Development Setup

Step-by-step guide for setting up ORBIT on your local machine.

## Prerequisites

Before you begin, install the following:

1. **Node.js 20 LTS** or higher
   - Download from https://nodejs.org/
   - Verify: `node --version` (should be v20.x.x or higher)

2. **pnpm 9+**
   - Install: `npm install -g pnpm`
   - Verify: `pnpm --version`

3. **Docker Desktop**
   - Download from https://www.docker.com/products/docker-desktop/
   - Start Docker Desktop and ensure it's running
   - Verify: `docker --version` and `docker compose version`

4. **Git**
   - Download from https://git-scm.com/
   - Verify: `git --version`

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd ORBIT
```

## Step 2: Install Dependencies

```bash
pnpm install
```

This will:

- Install all workspace dependencies
- Set up Git hooks (Husky)
- Generate `pnpm-lock.yaml`

Expected output: No errors, dependencies installed successfully.

## Step 3: Start Docker Services

```bash
pnpm docker:up
```

Or directly:

```bash
docker compose up -d
```

This starts three services:

- **MongoDB 7** on port 27017
- **Redis 7** on port 6379
- **MailHog** on ports 1025 (SMTP) and 8025 (web UI)

Verify all services are healthy:

```bash
docker compose ps
```

All services should show `healthy` status.

## Step 4: Configure Environment Variables

### API Environment Variables

```bash
cd apps/api
cp .env.example .env
```

Edit `apps/api/.env` if needed (defaults should work for local development).

Key variables:

- `PORT=4000` — API server port
- `MONGODB_URI=mongodb://localhost:27017/orbit` — MongoDB connection
- `REDIS_URL=redis://localhost:6379` — Redis connection
- `PUBLIC_WEB_ORIGIN=http://localhost:5173` — CORS origin

**Important:** Generate secure secrets for production:

- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `COOKIE_SECRET`

### Web Environment Variables

```bash
cd apps/web
cp .env.example .env
```

Edit `apps/web/.env` if needed.

Key variables:

- `VITE_API_BASE_URL=http://localhost:4000` — API endpoint
- `VITE_WS_URL=ws://localhost:4000` — WebSocket endpoint (future)
- `VITE_APP_NAME=ORBIT` — App name constant

## Step 5: Start Development Servers

From the repository root:

```bash
pnpm dev
```

This starts both:

- **Web app** on http://localhost:5173
- **API server** on http://localhost:4000

Expected output:

```
@orbit/web:dev: VITE vX.X.X ready in XXX ms
@orbit/web:dev: ➜ Local:   http://localhost:5173/
@orbit/api:dev: Server listening at http://0.0.0.0:4000
@orbit/api:dev: MongoDB connected successfully
```

## Step 6: Verify Everything Works

### Check Web App

1. Open http://localhost:5173 in your browser
2. You should see the ORBIT splash page with "Two worlds. One orbit."
3. Check browser console — no errors

### Check API Health

```bash
curl http://localhost:4000/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "0.1.0"
}
```

### Check MailHog

1. Open http://localhost:8025 in your browser
2. You should see the MailHog inbox interface (empty initially)

### Check MongoDB Connection

```bash
docker exec -it orbit-mongo mongosh --eval "db.adminCommand('ping')"
```

Expected: `{ ok: 1 }`

### Check Redis Connection

```bash
docker exec -it orbit-redis redis-cli ping
```

Expected: `PONG`

## Step 7: Run Tests

```bash
pnpm test
```

All tests should pass.

## Step 8: Verify Build

```bash
pnpm build
```

Expected output:

- All packages build successfully
- No TypeScript errors
- Build artifacts in `dist/` directories

## Troubleshooting

### Docker services won't start

- Ensure Docker Desktop is running
- Check for port conflicts (27017, 6379, 1025, 8025)
- Try: `docker compose down` then `docker compose up -d`

### MongoDB connection failed

- Verify MongoDB is running: `docker compose ps`
- Check MongoDB logs: `docker compose logs mongo`
- Ensure `MONGODB_URI` in `apps/api/.env` matches Docker service

### Port already in use

- Web (5173): Check for other Vite dev servers
- API (4000): Check for other Node.js processes
- Kill conflicting process or change port in `.env` files

### pnpm install fails

- Clear pnpm cache: `pnpm store prune`
- Delete `node_modules` and `pnpm-lock.yaml`, then retry
- Ensure Node.js version is 20+ (check with `node --version`)

### Pre-commit hooks not working

- Reinitialize hooks: `pnpm prepare`
- Check `.husky/` directory exists and has executable files

### Tests fail

- Ensure all dependencies are installed: `pnpm install`
- Try building first: `pnpm build`
- Run tests for specific package: `pnpm --filter @orbit/api test`

## Development Workflow

1. **Start Docker services** (only needed once per session)

   ```bash
   pnpm docker:up
   ```

2. **Start dev servers**

   ```bash
   pnpm dev
   ```

3. **Make changes** to code
   - Files auto-reload thanks to Vite (web) and tsx watch (API)

4. **Run tests** before committing

   ```bash
   pnpm test
   ```

5. **Commit with conventional commit format**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```
   - Pre-commit hooks will lint and format your code
   - Commit message format is validated

6. **Stop dev servers** (Ctrl+C)

7. **Stop Docker services** (when done for the day)
   ```bash
   pnpm docker:down
   ```

## Useful Commands

| Command                        | Description                        |
| ------------------------------ | ---------------------------------- |
| `pnpm dev`                     | Start both web and API dev servers |
| `pnpm build`                   | Build all packages                 |
| `pnpm test`                    | Run all tests                      |
| `pnpm lint`                    | Lint all code                      |
| `pnpm type-check`              | Type-check TypeScript              |
| `pnpm format`                  | Format code with Prettier          |
| `pnpm docker:up`               | Start Docker services              |
| `pnpm docker:down`             | Stop Docker services               |
| `pnpm docker:logs`             | Follow Docker logs                 |
| `pnpm --filter @orbit/web dev` | Start web app only                 |
| `pnpm --filter @orbit/api dev` | Start API only                     |
| `docker compose ps`            | Check Docker service status        |
| `docker compose logs -f mongo` | Follow MongoDB logs                |

## Next Steps

Once your local environment is working:

1. Read [ORBIT_MASTER_PROMPT.md](../../ORBIT_MASTER_PROMPT.md) for full product spec
2. Check [PROGRESS.md](../../PROGRESS.md) for current milestone
3. Review [DECISIONS.md](../../DECISIONS.md) for architectural decisions
4. Explore the codebase starting with `apps/web/src/App.tsx` and `apps/api/src/index.ts`

---

Need help? Check existing issues or ask Navi.
