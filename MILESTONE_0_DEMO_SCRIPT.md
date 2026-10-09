# Milestone 0 Demo Script

> **Goal**: Verify that the foundational monorepo, web app, API, and CI/CD are working correctly.
>
> **Time**: 5 minutes
>
> **Prerequisites**: Docker Desktop running, Node.js 18+ installed, pnpm installed

---

## Step 1: Start Docker Services (30 seconds)

```bash
cd d:/Portfolio_Projects/testing_kiro/ORBIT
docker-compose up -d
```

**Expected**: Three containers start: `orbit-mongodb`, `orbit-redis`, `orbit-mailhog`

**Verify**:

```bash
docker ps
```

You should see all three containers with status "Up".

---

## Step 2: Install Dependencies (30 seconds, first time only)

```bash
pnpm install
```

**Expected**: Dependencies installed for all workspaces (2 apps, 4 packages).

---

## Step 3: Start Development Servers (30 seconds)

Open two terminal windows:

**Terminal 1 — API Server**:

```bash
pnpm --filter @orbit/api dev
```

**Expected**: Server starts at `http://localhost:3000` with log:

```
Server listening at http://localhost:3000
```

**Terminal 2 — Web App**:

```bash
pnpm --filter @orbit/web dev
```

**Expected**: Vite dev server starts at `http://localhost:5173` with log:

```
VITE ready in XXX ms
Local: http://localhost:5173/
```

---

## Step 4: Visit Web App Splash Page (1 minute)

1. Open browser to `http://localhost:5173`
2. **Expected**: Splash page with "ORBIT" title and subtitle "Two worlds, one orbit."
3. Verify the design:
   - Clean, centered layout
   - "Get Started" button visible
   - Dark/light theme toggle button in top-right (sun/moon icon)

**Test theme toggle**:

- Click the theme button
- Page should smoothly transition between light and dark mode
- All colors should remain readable

**Test language toggle**:

- Click "ไทย" in the top-right corner
- Page content should switch to Thai:
  - Title: "ORBIT"
  - Subtitle: "สองโลก โคจรเดียวกัน"
  - Button: "เริ่มต้น"
- Click "English" to switch back

---

## Step 5: Navigate to Health Check Page (30 seconds)

1. Click "Get Started" button
2. **Expected**: Navigate to `/health-check` page
3. Verify the page shows:
   - "Health Check" heading
   - "Web App Status: ✅ Running"
   - "API Status: ✅ Healthy" (with API version)
   - "MongoDB Status: ✅ Connected"
4. All three status indicators should show green checkmarks

**If any status shows an error**:

- API: Check Terminal 1 for errors, verify port 3000 not in use
- MongoDB: Run `docker ps` to confirm `orbit-mongodb` is running

---

## Step 6: Verify API Health Endpoint Directly (30 seconds)

Open a new browser tab or use curl:

```bash
curl http://localhost:3000/health
```

**Expected JSON response**:

```json
{
  "status": "ok",
  "timestamp": "2025-01-19T...",
  "uptime": 123.456,
  "environment": "development",
  "version": "0.1.0",
  "services": {
    "database": "connected"
  }
}
```

---

## Step 7: Run Full Test Suite (1 minute)

Stop both dev servers (Ctrl+C in both terminals), then run:

```bash
pnpm test
```

**Expected**: All tests pass across all workspaces.

**Sample output**:

```
@orbit/shared: 6 tests passed
@orbit/web: 3 tests passed (components, pages, i18n)
@orbit/api: 9 tests passed (health, config, logger, db)

Test run: 18 passed, 0 failed
```

---

## Step 8: Run Production Build (1 minute)

```bash
pnpm build
```

**Expected**: Clean build with no TypeScript errors, ESLint warnings, or build failures.

**Sample output**:

```
@orbit/shared: Build complete
@orbit/web: Build complete (dist/)
@orbit/api: Build complete (dist/)

Build: 3/3 succeeded
```

---

## Success Criteria

✅ All Docker services running  
✅ Web app loads at localhost:5173  
✅ Theme toggle works (light/dark)  
✅ Language toggle works (English/Thai)  
✅ Health check page shows all systems green  
✅ API /health endpoint returns valid JSON  
✅ All 18 tests pass  
✅ Production build succeeds with no errors

---

## Cleanup (Optional)

When done testing, stop Docker services:

```bash
docker-compose down
```

---

## What to Test Next

1. **Mobile responsiveness**: Resize browser to 390px width, verify layout adapts
2. **Tablet view**: Resize to 820px width (iPad portrait)
3. **Dark mode across pages**: Navigate to health check in dark mode
4. **Thai language across pages**: Switch to Thai, then navigate to health check

---

## Troubleshooting

**Issue**: Docker containers won't start

- Solution: Ensure Docker Desktop is running, check ports 27017, 6379, 8025 are free

**Issue**: API shows "MongoDB: disconnected"

- Solution: Wait 5-10 seconds for MongoDB to initialize, refresh page

**Issue**: Vite dev server won't start

- Solution: Check if port 5173 is in use, try `pnpm --filter @orbit/web dev --port 5174`

**Issue**: Tests fail with "Cannot find module"

- Solution: Run `pnpm install` again, ensure all dependencies installed

---

## Next Steps After Demo

1. Send Raya the deployed link (after deploying to staging)
2. Get her feedback on Thai translations and overall feel
3. Proceed to **Milestone 1**: Authentication, pairing, presence, and first pings

---

_Demo script for Milestone 0 | Last updated: 2025-01-19_
