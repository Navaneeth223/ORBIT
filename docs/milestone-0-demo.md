# Milestone 0 Demo Script

> Verify the foundation works in under 5 minutes

---

## Prerequisites

- Windows with PowerShell
- Node.js LTS installed
- pnpm 9+ installed (`npm install -g pnpm`)
- Docker Desktop installed and running (for MongoDB + Redis)

---

## Demo Steps (5 minutes)

### 1. Clone and Install (1 min)

```powershell
# If not already in the directory
cd d:\Portfolio_Projects\testing_kiro\ORBIT

# Install all dependencies
pnpm install

# Verify workspace structure
ls apps
ls packages
```

**Expected**: You should see `apps/web`, `apps/api`, and multiple packages. No errors during install.

---

### 2. Start Local Services (30 seconds)

```powershell
# Start MongoDB and Redis via Docker Compose
docker-compose up -d

# Verify services are running
docker ps
```

**Expected**: You should see containers for `mongo`, `redis`, and `mailhog` running.

---

### 3. Start Development Servers (30 seconds)

```powershell
# Start all dev servers
pnpm dev
```

**Expected**:

- Web dev server starts on http://localhost:5173
- API dev server starts on http://localhost:4000
- Terminal shows both running with Turbo output
- No compilation errors

---

### 4. Test the Web App (1 min)

**Desktop Browser**:

1. Open http://localhost:5173
2. You should see the ORBIT splash screen
3. Text: "Two worlds. One orbit." with "Finding your person…"
4. Check browser console: no errors
5. Check Network tab: service worker registered

**Mobile Phone**:

1. Get your local IP: `ipconfig` (look for IPv4)
2. Open `http://YOUR_IP:5173` on your phone (same WiFi)
3. Splash screen should load
4. Try adding to home screen

---

### 5. Test the API (30 seconds)

```powershell
# Test health endpoint
curl http://localhost:4000/health
```

**Expected Response**:

```json
{
  "status": "ok",
  "timestamp": "2026-10-09T...",
  "version": "0.1.0"
}
```

Or open in browser: http://localhost:4000/health

---

### 6. Run Tests (1 min)

```powershell
# Stop dev servers (Ctrl+C)

# Run all tests
pnpm test
```

**Expected**: All tests pass (at least 3-4 basic tests across packages)

---

### 7. Run Linting and Type Checks (30 seconds)

```powershell
# Lint all code
pnpm lint

# Type-check all code
pnpm type-check
```

**Expected**: Both commands pass with no errors

---

### 8. Build for Production (30 seconds)

```powershell
# Build all apps and packages
pnpm build
```

**Expected**:

- Builds complete successfully
- `apps/web/dist` directory created
- `apps/api/dist` directory created
- No build errors

---

### 9. Check PWA Manifest (30 seconds)

**In browser (http://localhost:5173)**:

1. Open DevTools → Application tab
2. Manifest section should show:
   - Name: "ORBIT"
   - Short name: "ORBIT"
   - Theme color: (from design tokens)
   - Icons: 192x192, 512x512
3. Service Worker section should show registered worker

---

### 10. Test Internationalization (30 seconds)

**In the web app**:

1. If there's a language switcher, change from English to Thai
2. Text should change to Thai
3. "Two worlds. One orbit." → "สองโลก วงโคจรเดียว"
4. Layout should not break with Thai text

---

## Quick Checklist

- [ ] `pnpm install` worked without errors
- [ ] Docker Compose services started
- [ ] `pnpm dev` started both web and API
- [ ] Web app loads at localhost:5173 with splash screen
- [ ] API /health returns 200 OK
- [ ] `pnpm test` all green
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes
- [ ] `pnpm build` succeeds
- [ ] PWA manifest visible in DevTools
- [ ] Service worker registers
- [ ] Works on mobile phone (same network)
- [ ] Thai language strings present (even if not fully interactive yet)
- [ ] No console errors
- [ ] Git repository initialized with clean commit history

---

## Common Issues

### `pnpm install` fails

- Update pnpm: `npm install -g pnpm@latest`
- Delete `node_modules` and `pnpm-lock.yaml`, try again

### Docker services won't start

- Is Docker Desktop running?
- Are ports 27017, 6379, 8025 already in use?
- Check: `docker-compose logs`

### Port 5173 or 4000 already in use

- Find and kill the process:
  ```powershell
  # Windows
  netstat -ano | findstr :5173
  taskkill /PID <PID> /F
  ```

### Web app can't reach API

- Check CORS configuration
- Verify `VITE_API_BASE_URL` in `.env` (apps/web)
- Check browser console for CORS errors

### MongoDB connection fails

- Verify Docker container is running: `docker ps`
- Check connection string in `apps/api/.env`
- Try: `docker-compose restart mongo`

---

## After Demo: What You Have

✅ **Complete monorepo** with pnpm + Turborepo  
✅ **Web app** (React + Vite + Tailwind + i18next + PWA)  
✅ **API** (Fastify + MongoDB + structured logging)  
✅ **Shared packages** (types, schemas, constants, game engine scaffold)  
✅ **Developer tooling** (ESLint, Prettier, Husky, commitlint)  
✅ **CI/CD pipeline** (GitHub Actions ready)  
✅ **Docker Compose** for local development  
✅ **Design tokens** (colors, typography, spacing from master prompt)  
✅ **Internationalization** (English + Thai structure)  
✅ **Tests** (Vitest configured and passing)  
✅ **Documentation** (README, .env.example, deployment guides)

---

## Ready for Milestone 1?

If all checkboxes above are ✅, you're ready to start building authentication, pairing, and the first real features!

**Next**: Get Navi's approval, then proceed to Milestone 1 (Two People, One Thread)

---

## Feedback Questions

Before moving on, answer these:

1. Did the installation take more than 5 minutes?
2. Were any error messages confusing?
3. Does the splash screen feel warm and inviting?
4. Does Thai text render correctly (no squares, good line height)?
5. Can Raya install it on her phone and see Thai by default?

**Record answers in DECISIONS.md** to guide future improvements.
