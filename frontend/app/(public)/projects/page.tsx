import type { Metadata } from "next";
import { ProjectCard, type ProjectCardProps } from "../_components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects — LeoLogic",
  description:
    "Technical project portfolio: LeoLogic Quantitative Core, Project Catalyst, and Half-Life Bio-Metrics.",
};

// ─────────────────────────────────────────────────────────────────────────────
// Project data
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS: ProjectCardProps[] = [
  {
    id: "P-01",
    codename: "LQC-CORE",
    title: "LeoLogic Quantitative Core",
    status: "ACTIVE",
    displayType: "Architecture Only",
    description:
      "Automated trading system powered by a custom Python execution engine with strict order logic.",
    longDescription:
      "LQC is a systematic trading infrastructure built entirely in pure Python. It interfaces " +
      "directly with the Interactive Brokers TWS API via socket-level communication to manage " +
      "live and paper positions. The engine enforces strict entry/exit rules, real-time signal " +
      "evaluation, and hard drawdown caps — with no discretionary overrides permitted at runtime. " +
      "Source code and strategy logic are closed to protect execution edge.",
    techStack: [
      { label: "Python 3.12", tone: "green" },
      { label: "IBKR TWS API", tone: "green" },
      { label: "FastAPI", tone: "cyan" },
      { label: "pandas", tone: "cyan" },
      { label: "TA-Lib", tone: "cyan" },
      { label: "asyncio", tone: "amber" },
      { label: "SQLite", tone: "amber" },
      { label: "Next.js 16", tone: "cyan" },
    ],
    metrics: [
      { label: "ENGINE",      value: "Pure Python" },
      { label: "BROKER",      value: "IBKR TWS API" },
      { label: "EXECUTION",   value: "Live + Paper" },
      { label: "PARADIGM",    value: "Event-driven" },
      { label: "RISK MODULE", value: "Drawdown cap · Kelly" },
      { label: "LATENCY",     value: "Sub-100 ms target" },
    ],
    architecture: {
      title: "LQC — EXECUTION STACK",
      layers: [
        {
          label: "MARKET DATA FEED",
          sublabel: "Real-time price + volume stream via IBKR socket",
          tone: "cyan",
        },
        {
          label: "SIGNAL PROCESSOR",
          sublabel: "EMA · RSI · VWAP · ATR band evaluation",
          tone: "cyan",
        },
        {
          label: "STRATEGY ENGINE",
          sublabel: "Rule validation · entry / exit condition gating",
          tone: "green",
        },
        {
          label: "RISK MODULE",
          sublabel: "Drawdown cap · position sizing · Kelly fraction",
          tone: "amber",
        },
        {
          label: "ORDER ROUTER",
          sublabel: "IBKR TWS API — live order placement + fills",
          tone: "green",
        },
        {
          label: "AUDIT LEDGER",
          sublabel: "SQLite trade log · execution timestamps · P&L",
          tone: "amber",
        },
      ],
    },
    tags: [
      "ALGORITHMIC_TRADING",
      "PYTHON_AUTOMATION",
      "IBKR_API",
      "SIGNAL_PROCESSING",
      "EVENT_DRIVEN",
      "RISK_MANAGEMENT",
      "QUANT_FINANCE",
    ],
    links: [
      { label: "READ ARCHITECTURE", href: "#" },
      { label: "VIEW WHITEPAPER",   href: "#" },
    ],
  },
  {
    id: "P-02",
    codename: "CATALYST-SYS",
    title: "Project Catalyst",
    status: "WIP",
    displayType: "Architecture Only",
    description:
      "Multi-asset portfolio optimization engine applying modern portfolio theory and factor-based allocation models.",
    longDescription:
      "Catalyst is a research-grade portfolio construction system designed to run scenario analysis " +
      "across equity and derivative instruments. It integrates mean-variance optimization, " +
      "Black-Litterman blending, and Fama-French factor exposure reporting. The allocation engine " +
      "operates on a configurable rebalance schedule and is interfaced via a private REST API layer. " +
      "Full source code is restricted — architecture overview reflects the actual component design.",
    techStack: [
      { label: "Python 3.12",   tone: "green" },
      { label: "cvxpy",         tone: "green" },
      { label: "scipy.optimize",tone: "green" },
      { label: "pandas",        tone: "cyan" },
      { label: "FastAPI",       tone: "cyan" },
      { label: "PostgreSQL",    tone: "amber" },
      { label: "Redis",         tone: "amber" },
      { label: "Next.js 16",   tone: "cyan" },
    ],
    metrics: [
      { label: "OPTIMIZER",   value: "MV · Black-Litterman" },
      { label: "FACTORS",     value: "Fama-French 3/5F" },
      { label: "INSTRUMENTS", value: "Equity · Options" },
      { label: "REBALANCE",   value: "Configurable schedule" },
      { label: "CONSTRAINTS", value: "Weight · sector · VaR" },
      { label: "OUTPUT",      value: "Efficient frontier + weights" },
    ],
    architecture: {
      title: "CATALYST — ALLOCATION STACK",
      layers: [
        {
          label: "DATA INGESTION",
          sublabel: "Market data + fundamentals · REST + WebSocket",
          tone: "cyan",
        },
        {
          label: "FACTOR ENGINE",
          sublabel: "Fama-French exposure · alpha signal generation",
          tone: "cyan",
        },
        {
          label: "OPTIMIZER CORE",
          sublabel: "cvxpy MV · Black-Litterman view blending",
          tone: "green",
        },
        {
          label: "CONSTRAINT LAYER",
          sublabel: "Weight bounds · sector limits · VaR ceiling",
          tone: "amber",
        },
        {
          label: "REBALANCE SCHEDULER",
          sublabel: "Drift trigger · calendar-based execution gating",
          tone: "green",
        },
        {
          label: "REPORTING API",
          sublabel: "FastAPI · frontier chart · attribution breakdown",
          tone: "amber",
        },
      ],
    },
    tags: [
      "PORTFOLIO_OPTIMIZATION",
      "FACTOR_INVESTING",
      "BLACK_LITTERMAN",
      "MEAN_VARIANCE",
      "QUANT_FINANCE",
      "PYTHON_SCIENCE",
      "RISK_MANAGEMENT",
    ],
    links: [
      { label: "READ ARCHITECTURE", href: "#" },
      { label: "VIEW WHITEPAPER",   href: "#" },
    ],
  },
  {
    id: "P-03",
    codename: "HALF-LIFE-BIO",
    title: "Half-Life Bio-Metrics",
    status: "STABLE",
    displayType: "Live System",
    description:
      "Metabolic decay simulator applying first-order half-life kinetics to track substance plasma concentration.",
    longDescription:
      "Half-Life Bio-Metrics models the pharmacokinetic decay of supplemental compounds — " +
      "including Creatine, Vitamin D3, and Magnesium — using the first-order decay equation " +
      "A(t) = A₀ × e^(−0.693t / t½). The system accounts for scheduled dosing intervals, " +
      "accumulation effects across multi-day cycles, and generates a continuous concentration " +
      "curve to inform optimal supplementation timing.",
    techStack: [
      { label: "Python 3.12",   tone: "green" },
      { label: "NumPy / SciPy", tone: "green" },
      { label: "FastAPI",       tone: "cyan" },
      { label: "Next.js 16",   tone: "cyan" },
      { label: "TypeScript",    tone: "cyan" },
      { label: "Tailwind CSS",  tone: "amber" },
      { label: "Recharts",      tone: "amber" },
    ],
    metrics: [
      { label: "SUBSTANCES", value: "Creatine · Vit-D3 · Mg" },
      { label: "ALGORITHM",  value: "First-order decay" },
      { label: "FORMULA",    value: "A(t) = A₀ × e^(−λt)" },
      { label: "HALF-LIFE",  value: "Configurable per compound" },
      { label: "DOSING",     value: "Accumulation-aware" },
      { label: "OUTPUT",     value: "Plasma conc. curve" },
    ],
    architecture: {
      title: "HALF-LIFE — DECAY ENGINE",
      layers: [
        {
          label: "SUBSTANCE CONFIG",
          sublabel: "t½ per compound · dosage · unit-of-measure",
          tone: "cyan",
        },
        {
          label: "HALF-LIFE KINETICS",
          sublabel: "A(t) = A₀ × e^(−0.693t / t½) — first-order ODE",
          tone: "green",
        },
        {
          label: "DOSE SCHEDULER",
          sublabel: "Multi-dose accumulation · replenishment timing",
          tone: "green",
        },
        {
          label: "SIMULATION ENGINE",
          sublabel: "Discrete time-step integration across cycle window",
          tone: "amber",
        },
        {
          label: "API LAYER",
          sublabel: "FastAPI — /simulate endpoint · JSON payload",
          tone: "cyan",
        },
        {
          label: "VISUALIZER",
          sublabel: "Plasma concentration curve · peak / trough markers",
          tone: "amber",
        },
      ],
    },
    tags: [
      "PHARMACOKINETICS",
      "HALF_LIFE_MODELING",
      "PYTHON_SCIENCE",
      "NUMPY_SCIPY",
      "FASTAPI",
      "NEXT_JS",
      "BIO_INFORMATICS",
    ],
    links: [
      { label: "LAUNCH DASHBOARD",    href: "/dashboard/biometrics" },
      { label: "VIEW LIVE METRICS",   href: "/dashboard/biometrics" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

const LIVE_COUNT  = PROJECTS.filter((p) => p.displayType === "Live System").length;
const ARCH_COUNT  = PROJECTS.filter((p) => p.displayType === "Architecture Only").length;

export default function ProjectsPage() {
  return (
    <div className="py-16">

      {/* ── Page header ─────────────────────────────────────────── */}
      <header className="mb-14">
        <p className="text-xs tracking-[0.35em] mb-5" style={{ color: "#2e2e2e" }}>
          PROJECT REGISTRY — {PROJECTS.length} ENTRIES
        </p>
        <h1
          className="font-bold tracking-tight leading-none mb-5"
          style={{ fontSize: "clamp(1.8rem, 6vw, 3.5rem)", color: "#e0e0e0" }}
        >
          TECHNICAL
          <br />
          <span className="terminal-text">PROJECTS</span>
        </h1>
        <div
          className="h-px w-full mb-6"
          style={{
            background:
              "linear-gradient(to right, var(--color-terminal-green), rgba(0,212,255,0.3), transparent)",
          }}
        />
        <p className="text-xs leading-relaxed max-w-2xl" style={{ color: "#555" }}>
          Each system below is an active build or architectural design. Live System entries are
          connected to real APIs and can be interacted with directly. Architecture Only entries
          are proprietary or conceptual — source is restricted, but the full execution stack
          is documented here.
        </p>

        {/* ── Legend ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-5 mt-6">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono px-2 py-0.5"
              style={{
                color: "#00d4ff",
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.25)",
              }}
            >
              LIVE SYSTEM
            </span>
            <span className="text-xs text-zinc-600">{LIVE_COUNT} active</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono px-2 py-0.5"
              style={{
                color: "#ffb000",
                background: "rgba(255,176,0,0.06)",
                border: "1px solid rgba(255,176,0,0.22)",
              }}
            >
              PRIVATE CORE
            </span>
            <span className="text-xs text-zinc-600">{ARCH_COUNT} restricted</span>
          </div>
        </div>
      </header>

      {/* ── Project cards ───────────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* ── Footer note ─────────────────────────────────────────── */}
      <div className="mt-20 pt-8" style={{ borderTop: "1px solid #111" }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs" style={{ color: "#333" }}>
            <span style={{ color: "#444" }}>leologic@sys</span>
            <span style={{ color: "#222" }}> ~/projects </span>
            <span className="cursor-blink" />
          </p>
          <p className="text-xs tracking-wider" style={{ color: "#2a2a2a" }}>
            {PROJECTS.length} REGISTERED · {LIVE_COUNT} LIVE · {ARCH_COUNT} PRIVATE
          </p>
        </div>
      </div>
    </div>
  );
}
