# OpsAgent — Agentic FacilityOps AI Platform

A working prototype web application built for the internship project
**"Agentic FacilityOps AI Platform"**. This sprint implements the
**Homepage/Onboarding**, the **Dashboard (AI Agent Modules)** screen, and two
fully working modules:

- ⚡ **Energy Agent** — energy monitoring, HVAC/lighting optimization, demand
  forecasting.
- 🔧 **Maintenance Agent** — equipment health monitoring, predictive
  maintenance, work order generation, downtime reduction.

The Occupancy Agent and Security Agent are shown as "planned" in the agent
orchestration strip but are intentionally **not implemented yet** — this
sprint's scope was Energy + Maintenance only, per Milestones 1 & 2 of the
project plan.

The app runs on **plain HTML / CSS / JavaScript / React (frontend)** and
**Node.js + Express (backend)**. No other frameworks or UI kits are used —
charts, sparklines and progress bars are all hand-built, dependency-free SVG
components. There is no real database yet: the backend serves **static
dummy data** from `backend/db/db.js`, structured the same way real data
would eventually look, so the UI is fully wired end-to-end and easy to swap
over to a real DB/IoT feed later.

---

## Folder structure

```
opsagent/
├── backend/                     # Node.js + Express API server
│   ├── db/
│   │   └── db.js                # Static dummy data (Energy + Maintenance only)
│   ├── routes/
│   │   ├── energyAgent.js       # /api/energy-agent/* endpoints
│   │   └── maintenanceAgent.js  # /api/maintenance-agent/* endpoints
│   ├── server.js                # Express app entry point
│   └── package.json
│
├── frontend/                    # React (Vite) single-page app
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js           # fetch() wrapper for all backend calls
│   │   ├── components/
│   │   │   ├── AgentModuleCard.jsx   # Module summary card (dashboard)
│   │   │   ├── DashboardLayout.jsx   # Sidebar + Topbar + <Outlet/>
│   │   │   ├── KpiCard.jsx           # Reusable KPI stat card
│   │   │   ├── MiniBarChart.jsx      # Dependency-free SVG bar chart
│   │   │   ├── ProgressList.jsx      # Horizontal distribution bars
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Sparkline.jsx         # Dependency-free SVG line chart
│   │   │   └── Topbar.jsx
│   │   ├── pages/
│   │   │   ├── Homepage.jsx          # "/" onboarding / get-started page
│   │   │   ├── Dashboard.jsx         # "/dashboard" AI Agent Modules overview
│   │   │   ├── EnergyAgentPage.jsx   # "/dashboard/energy-agent" detail page
│   │   │   └── MaintenanceAgentPage.jsx # "/dashboard/maintenance-agent"
│   │   ├── styles/               # Plain CSS, one file per component/page
│   │   ├── App.jsx               # Route definitions
│   │   └── main.jsx              # React DOM entry point
│   ├── index.html
│   ├── vite.config.js            # Dev server + /api proxy to backend
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Prerequisites

- **Node.js 18+** and **npm** installed.

---

## 1. Run the backend

```bash
cd backend
npm install
npm start
```

The API server starts on **http://localhost:5000**. Quick check:

```bash
curl http://localhost:5000/api/health
# -> {"status":"ok","message":"OpsAgent backend is running"}
```

### Available endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/energy-agent` | Full Energy Agent payload (summary, trend, distribution, facilities, recommendations, alerts, forecast) |
| GET | `/api/energy-agent/summary` | KPI summary only |
| GET | `/api/energy-agent/trend` | Weekly consumption trend |
| GET | `/api/energy-agent/distribution` | Energy split by system (HVAC/Lighting/etc.) |
| GET | `/api/energy-agent/facilities` | Per-facility energy breakdown |
| GET | `/api/energy-agent/recommendations` | AI efficiency recommendations |
| GET | `/api/energy-agent/alerts` | Energy alert feed |
| GET | `/api/energy-agent/forecast` | 7-day demand forecast |
| GET | `/api/maintenance-agent` | Full Maintenance Agent payload |
| GET | `/api/maintenance-agent/summary` | KPI summary only |
| GET | `/api/maintenance-agent/trend` | Work orders closed per week |
| GET | `/api/maintenance-agent/health-distribution` | Equipment health split |
| GET | `/api/maintenance-agent/assets` | Monitored assets list |
| GET | `/api/maintenance-agent/assets/:assetId` | Single asset detail |
| GET | `/api/maintenance-agent/work-orders` | Auto-generated work orders |
| GET | `/api/maintenance-agent/alerts` | Maintenance alert feed |

Each agent's route file only reads its own slice of `db.js` — the Energy
routes never touch maintenance data and vice versa, matching the "each agent
should only see its own data" requirement.

---

## 2. Run the frontend

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**. The dev server proxies any `/api/...` call
to the backend on port 5000 (see `vite.config.js`), so make sure the
backend is running first.

### Pages

| Route | Page |
|---|---|
| `/` | Homepage — "Get started with OpsAgent" onboarding screen |
| `/dashboard` | AI Agent Modules overview — Energy Agent & Maintenance Agent cards |
| `/dashboard/energy-agent` | Full Energy Agent dashboard (KPIs, trend chart, distribution, facility table, recommendations, alerts) |
| `/dashboard/maintenance-agent` | Full Maintenance Agent dashboard (KPIs, work-order trend, asset health table, work orders, alerts) |

---

## 3. Production build (optional)

```bash
cd frontend
npm run build     # outputs static files to frontend/dist
npm run preview   # serve the production build locally
```

---

## Notes / next steps

- All data in `backend/db/db.js` is static/mock, matching the schema in the
  project's Database Scheme (Facilities, Energy Usage, Maintenance Records,
  Assets, Alerts, etc.) so swapping in a real Postgres/IoT feed later only
  means changing what populates that file — the routes and frontend don't
  need to change shape.
- Occupancy Agent and Security Agent are the next milestone (Weeks 5–6 per
  the project plan) and are deliberately left as "disabled" nav items /
  greyed-out nodes in the orchestration strip so the UI already shows where
  they'll plug in.
- No UI libraries (Tailwind/MUI/etc.) or chart libraries were used — every
  chart (`Sparkline.jsx`, `MiniBarChart.jsx`) is a small hand-written SVG
  component, and all styling is plain CSS, per the requested tech stack.
