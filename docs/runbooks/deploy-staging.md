# Deploy to Staging (Singapore Region)

> Instructions for deploying ORBIT to staging environment in ap-southeast-1

---

## Prerequisites

- [ ] Node.js LTS installed
- [ ] pnpm 9+ installed
- [ ] Git repository pushed to GitHub
- [ ] Accounts created:
  - MongoDB Atlas (free tier)
  - Cloudflare account (or Vercel free tier)
  - Fly.io account (or Render/Railway)
  - Upstash account (free Redis tier) - optional for Milestone 0

---

## Part 1: Database Setup (MongoDB Atlas)

### Create Cluster

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new project: "ORBIT"
3. Build a Database → Shared (Free M0)
4. **Region**: Singapore (`ap-southeast-1`)
5. Cluster name: `orbit-staging`
6. Create cluster (takes 1-3 minutes)

### Configure Access

1. Database Access → Add New Database User
   - Username: `orbit-api-staging`
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"

2. Network Access → Add IP Address
   - For now: "Allow Access from Anywhere" (0.0.0.0/0)
   - Later: restrict to Fly.io/Render outbound IPs

3. Get Connection String
   - Connect → Drivers → Node.js
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `/myFirstDatabase` with `/orbit-staging`
   - Example: `mongodb+srv://orbit-api-staging:PASSWORD@orbit-staging.xxxxx.mongodb.net/orbit-staging?retryWrites=true&w=majority`

---

## Part 2: Web App Deployment (Cloudflare Pages)

### Option A: Cloudflare Pages (Recommended)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Pages → Create a project → Connect to Git
3. Select your GitHub repository
4. Build settings:
   - **Framework preset**: Vite
   - **Build command**: `cd apps/web && pnpm install && pnpm build`
   - **Build output directory**: `apps/web/dist`
   - **Root directory**: `/` (leave empty)
   - **Node version**: 22

5. Environment variables:

   ```
   VITE_API_BASE_URL=https://orbit-api-staging.fly.dev
   VITE_WS_URL=wss://orbit-api-staging.fly.dev
   VITE_APP_NAME=ORBIT
   NODE_VERSION=22
   ```

6. Save and Deploy
7. Custom domain (optional): `staging.yourdomain.com`

### Option B: Vercel

1. Import project from GitHub
2. Framework: Vite
3. Root directory: `apps/web`
4. Build command: `pnpm build`
5. Output directory: `dist`
6. Environment variables (same as above)

---

## Part 3: API Deployment (Fly.io)

### Install Fly CLI

```powershell
# Windows
iwr https://fly.io/install.ps1 -useb | iex

# Verify
fly version
```

### Login and Initialize

```powershell
fly auth login
cd apps/api
fly launch --no-deploy
```

Answer prompts:

- App name: `orbit-api-staging`
- Region: **Singapore (sin)**
- Postgres: No (we're using MongoDB)
- Redis: No (we'll use Upstash free tier later)

### Configure fly.toml

Edit `apps/api/fly.toml`:

```toml
app = "orbit-api-staging"
primary_region = "sin"

[build]
  [build.args]
    NODE_VERSION = "22"

[env]
  NODE_ENV = "production"
  PORT = "8080"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = false
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

  [http_service.concurrency]
    type = "requests"
    hard_limit = 250
    soft_limit = 200

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256
```

### Set Secrets

```powershell
fly secrets set `
  MONGODB_URI="mongodb+srv://..." `
  JWT_ACCESS_SECRET="$(openssl rand -base64 32)" `
  JWT_REFRESH_SECRET="$(openssl rand -base64 32)" `
  COOKIE_SECRET="$(openssl rand -base64 32)" `
  PUBLIC_WEB_ORIGIN="https://your-staging.pages.dev" `
  MAX_USERS="2"
```

### Create Dockerfile (if not exists)

`apps/api/Dockerfile`:

```dockerfile
# syntax = docker/dockerfile:1

FROM node:22-slim AS base
LABEL fly_launch_runtime="Node.js"
WORKDIR /app
ENV NODE_ENV="production"
RUN npm install -g pnpm@9

# Build stage
FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps/api ./apps/api
RUN pnpm install --frozen-lockfile --prod=false
RUN pnpm turbo run build --filter=api

# Production stage
FROM base
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/package.json ./apps/api/
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
EXPOSE 8080
CMD ["node", "apps/api/dist/index.js"]
```

### Deploy

```powershell
fly deploy
```

### Verify

```powershell
fly status
fly logs
curl https://orbit-api-staging.fly.dev/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2026-10-09T...",
  "version": "0.1.0"
}
```

---

## Part 4: Redis (Upstash) - Optional for Milestone 0

1. Sign up at [Upstash](https://upstash.com/)
2. Create Redis database
   - Region: **ap-southeast-1 (Singapore)**
   - Type: Regional
   - Eviction: No eviction
3. Copy connection string (TLS URL)
4. Add to Fly secrets:
   ```powershell
   fly secrets set REDIS_URL="rediss://..."
   ```

---

## Part 5: Update Web Environment

Update the web app's environment variables to point to your deployed API:

**Cloudflare Pages**:

1. Settings → Environment variables
2. Update `VITE_API_BASE_URL` to `https://orbit-api-staging.fly.dev`
3. Update `VITE_WS_URL` to `wss://orbit-api-staging.fly.dev`
4. Redeploy

---

## Part 6: Verification Checklist

- [ ] MongoDB Atlas cluster running in Singapore
- [ ] Web app deployed and accessible (https://your-app.pages.dev)
- [ ] API deployed and accessible
- [ ] `/health` endpoint returns 200
- [ ] Web app loads on mobile phone
- [ ] No console errors
- [ ] Service worker registers (check DevTools → Application)
- [ ] PWA install prompt appears (mobile)

---

## Part 7: DNS and Custom Domain (Optional)

### If using a custom domain (e.g., staging.ourorbit.app):

1. **Cloudflare Pages**:
   - Pages → Custom domains → Add domain
   - Follow DNS instructions

2. **Fly.io API**:

   ```powershell
   fly certs add api-staging.ourorbit.app
   fly ips list  # Get IPv4 and IPv6
   ```
   - Add A and AAAA records in your DNS

3. **Update environment variables**:
   - Update `PUBLIC_WEB_ORIGIN` in Fly secrets
   - Update `VITE_API_BASE_URL` in web environment variables

---

## Troubleshooting

### API won't start

```powershell
fly logs --app orbit-api-staging
```

Check for:

- MongoDB connection errors (check connection string, IP whitelist)
- Missing environment variables
- Port binding issues

### Web app can't reach API

- Check CORS configuration in API
- Verify `PUBLIC_WEB_ORIGIN` matches your web domain exactly
- Check browser console for CORS errors
- Verify API is accessible: `curl https://your-api.fly.dev/health`

### MongoDB connection refused

- Check Network Access IP whitelist (must include `0.0.0.0/0` or Fly.io IPs)
- Verify connection string format
- Check database user credentials

---

## Costs (as of 2026-10)

- **MongoDB Atlas M0**: Free forever
- **Cloudflare Pages**: Free (500 builds/month)
- **Fly.io**: Free tier includes 3 shared-cpu VMs with 256MB RAM (sufficient for staging)
- **Upstash Redis**: Free tier 10K commands/day (sufficient for staging)
- **Custom domain**: ~$10-15/year (optional)

**Total for staging: $0/month** (with free tiers)

---

## Next Steps After Staging Works

1. Set up production environment (separate MongoDB cluster, separate apps)
2. Configure CI/CD to auto-deploy main branch to staging
3. Add monitoring (UptimeRobot, Sentry)
4. Test on Navi's and Raya's actual devices
5. Set up proper DNS with your chosen domain

---

## Alternative: Railway (Simpler but may have cost)

If Fly.io is complex, Railway offers a simpler deployment:

1. Import GitHub repo
2. Railway will detect Node.js and build automatically
3. Add environment variables
4. Generates public URL automatically
5. Slightly higher cost but dead simple

---

_For production deployment, see `deploy-production.md` (to be created before Milestone 8)_
