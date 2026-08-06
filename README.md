# Leologic

A full-stack system combining a **Next.js** frontend with a **FastAPI** Python backend — powering quantitative trading analytics and bio-metrics tracking.

---

## Architecture

```
leora/
├── frontend/          # Next.js 16 (React 19, Tailwind CSS, TypeScript)
└── backend/           # FastAPI (Python, Uvicorn)
```

### Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Landing page — hero, about, featured work, timeline, contact |
| `/projects` | Public | Full project registry with architecture breakdowns |
| `/login` | Public | Auth gate (demo token) |
| `/logout` | Public | Clears the auth cookie, redirects to `/login` |
| `/dashboard` | Protected | Command center overview |
| `/dashboard/quant` | Protected | LQC quant engine subsystem |
| `/dashboard/biometrics` | Protected | Half-Life bio-metrics subsystem |

`frontend/proxy.ts` gates every `/dashboard/*` route on the `auth-token` cookie.
Project names, codenames, and statuses come from a single source of truth in
`frontend/app/_data/projects.ts` — both the landing page and `/projects` read
from it, so a project is never described two different ways.

### Frontend — `frontend/`

| Technology | Version |
|---|---|
| Next.js | 16.2.4 |
| React | 19 |
| Tailwind CSS | v4 |
| TypeScript | v5 |

The frontend communicates with the backend via the `NEXT_PUBLIC_API_URL` environment variable, read in `frontend/app/_lib/api.ts`. Set it to `http://localhost:8000` for local development; if unset it falls back to the deployed backend. In production, the frontend is deployed on **Vercel** and served at [leologic.org](https://leologic.org).

### Backend — `backend/`

| Technology | Detail |
|---|---|
| FastAPI | REST API framework |
| Uvicorn | ASGI server |
| python-dotenv | Environment config |

Key routers:
- `/quant` — Quantitative trading engine endpoints
- `/bio` — Bio-metrics tracking endpoints
- `/health` — Health check (used by load balancers and uptime monitors)

CORS accepts `localhost:3000` / `127.0.0.1:3000` (dev), `leologic.org` and `www.leologic.org` (prod), plus any `*.vercel.app` preview deployment. Add further origins with the `CORS_ORIGINS` environment variable (comma-separated). A wildcard origin is deliberately not used — browsers reject `Access-Control-Allow-Origin: *` on credentialed requests.

---

## Local Development

### Prerequisites

- **Node.js** ≥ 18 and **npm**
- **Python** ≥ 3.11

### 1. Clone and configure environment

```bash
# Clone the repository
git clone <repo-url>
cd leora

# Copy and fill in environment variables
cp .env.example frontend/.env.local
cp .env.example backend/.env
# Then edit both files with your real values
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Set up the Python backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Run both servers concurrently

Open **two terminal windows** from the project root:

**Terminal 1 — Frontend**
```powershell
cd frontend
npm run dev
# Runs at http://localhost:3000
```

**Terminal 2 — Backend**
```powershell
cd backend
.\venv\Scripts\Activate.ps1        # Windows
# source venv/bin/activate         # macOS / Linux
python main.py
# Runs at http://localhost:8000
# Interactive docs at http://localhost:8000/docs
```

> **Tip (macOS/Linux):** You can run both in a single terminal using a process manager like `concurrently` or `honcho`, or simply use `&`:
> ```bash
> (cd frontend && npm run dev) & (cd backend && source venv/bin/activate && python main.py)
> ```

### Verifying the setup

| URL | Expected |
|---|---|
| http://localhost:3000 | Next.js app |
| http://localhost:8000/health | `{"status": "ok", "service": "leologic-api"}` |
| http://localhost:8000/docs | FastAPI Swagger UI |

---

## Deployment

### Overview

```
User → Cloudflare DNS → Vercel Edge Network → Next.js App
                                    ↓
                         (API calls) FastAPI Backend
                         (hosted separately, e.g. Railway / Render / VPS)
```

### Frontend — Vercel + Cloudflare DNS

1. **Push** your code to GitHub (or GitLab / Bitbucket).
2. **Import** the `frontend/` directory into [Vercel](https://vercel.com) as a new project.
   - Set the **Root Directory** to `frontend`.
   - Framework preset: **Next.js** (auto-detected).
3. **Add environment variables** in the Vercel project settings:
   - `NEXT_PUBLIC_API_URL` → URL of your deployed FastAPI backend (e.g. `https://api.leologic.org`)
   - `AUTH_SECRET` → a long random string (generate with `openssl rand -base64 32`)
4. **Configure Cloudflare DNS** to point `leologic.org` to Vercel:
   - In Cloudflare dashboard, add a **CNAME** record:
     - **Name:** `@` (or `leologic.org`)
     - **Target:** `cname.vercel-dns.com`
     - **Proxy status:** DNS only (grey cloud) — required for Vercel's SSL provisioning on the first deploy.
   - Add the domain `leologic.org` inside Vercel → Project → Settings → Domains.
   - Once Vercel verifies the domain and issues an SSL certificate, you can optionally re-enable Cloudflare proxying (orange cloud) for DDoS protection and caching.
5. Every push to the main branch triggers an automatic deployment via Vercel CI.

### Backend

Deploy the `backend/` directory to any Python-compatible host (Railway, Render, Fly.io, a VPS, etc.). Set the same environment variables from `.env.example` on the hosting platform.

If you expose the backend on a subdomain (e.g. `api.leologic.org`), add a **CNAME** DNS record in Cloudflare pointing `api` to the host's provided domain.

---

## Project Scripts

| Directory | Command | Description |
|---|---|---|
| `frontend/` | `npm run dev` | Start Next.js dev server |
| `frontend/` | `npm run build` | Build for production |
| `frontend/` | `npm run lint` | Run ESLint |
| `backend/` | `python main.py` | Start FastAPI with hot-reload |
| `backend/` | `uvicorn main:app --reload` | Alternative start command |

---

## License

Private — all rights reserved.
