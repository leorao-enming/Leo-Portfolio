// ─────────────────────────────────────────────────────────────────────────────
// Canonical project registry — single source of truth.
//
// Both the landing page (ProjectsSection) and the full registry (/projects)
// read from here, so a project's name, codename, and status can only be
// stated in one place.
//
// `registry` is optional: only projects with a documented execution stack
// render a full ProjectCard on /projects. Everything else still appears on
// the landing page using the shared identity fields.
// ─────────────────────────────────────────────────────────────────────────────

export type Tone = "green" | "cyan" | "amber";

export type TechTag = {
  label: string;
  tone?: Tone;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ArchitectureLayer = {
  label: string;
  sublabel?: string;
  tone?: Tone;
};

/** Extended detail rendered by ProjectCard on /projects. */
export type ProjectRegistryDetail = {
  displayType: "Live System" | "Architecture Only";
  longDescription: string;
  techStack: TechTag[];
  metrics: ProjectMetric[];
  architecture: {
    title: string;
    layers: ArchitectureLayer[];
  };
  tags: string[];
  links?: ProjectLink[];
};

export type Project = {
  /** Registry id, e.g. "P-01". Stable — used as a React key and display label. */
  id: string;
  /** Short machine name, e.g. "LQC-CORE". Matches the dashboard subsystem id. */
  codename: string;
  /** Canonical display name. Never restate this anywhere else. */
  title: string;
  /** Short label for the landing-page pill. */
  tag: string;
  status: "ACTIVE" | "STABLE" | "WIP" | "ARCHIVED";
  /** Human-readable status for the landing card. */
  statusLabel: string;
  /** One- or two-sentence summary used on the landing page. */
  summary: string;
  /** Condensed stack list for the landing card. */
  stack: string[];
  /** Accent colour for the landing card. */
  accent: string;
  /** Show on the landing page's Featured Work grid. */
  showOnLanding: boolean;
  /** The single large card on the landing page. Exactly one project sets this. */
  landingFeatured?: boolean;
  registry?: ProjectRegistryDetail;
};

export const PROJECTS: Project[] = [
  {
    id: "P-01",
    codename: "LQC-CORE",
    title: "LeoLogic Quantitative Core",
    tag: "Flagship",
    status: "ACTIVE",
    statusLabel: "In Development",
    summary:
      "Automated trading system powered by a custom Python execution engine that interfaces " +
      "directly with the Interactive Brokers TWS API. Strict entry/exit rules, real-time signal " +
      "evaluation, and hard drawdown caps — no discretionary overrides at runtime.",
    stack: ["Python", "IBKR TWS API", "FastAPI", "Next.js"],
    accent: "var(--color-terminal-green)",
    showOnLanding: true,
    landingFeatured: true,
    registry: {
      displayType: "Architecture Only",
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
        { label: "ENGINE", value: "Pure Python" },
        { label: "BROKER", value: "IBKR TWS API" },
        { label: "EXECUTION", value: "Live + Paper" },
        { label: "PARADIGM", value: "Event-driven" },
        { label: "RISK MODULE", value: "Drawdown cap · Kelly" },
        { label: "LATENCY", value: "Sub-100 ms target" },
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
      links: [{ label: "OPEN LIVE MODULE", href: "/dashboard/quant" }],
    },
  },
  {
    id: "P-02",
    codename: "CATALYST",
    title: "Project Catalyst",
    tag: "Research",
    status: "WIP",
    statusLabel: "Research",
    summary:
      "Multi-asset portfolio optimization engine applying modern portfolio theory and " +
      "factor-based allocation models.",
    stack: ["Python", "cvxpy", "PostgreSQL"],
    accent: "#c084fc",
    showOnLanding: false,
    registry: {
      displayType: "Architecture Only",
      longDescription:
        "Catalyst is a research-grade portfolio construction system designed to run scenario analysis " +
        "across equity and derivative instruments. It integrates mean-variance optimization, " +
        "Black-Litterman blending, and Fama-French factor exposure reporting. The allocation engine " +
        "operates on a configurable rebalance schedule and is interfaced via a private REST API layer. " +
        "Full source code is restricted — architecture overview reflects the actual component design.",
      techStack: [
        { label: "Python 3.12", tone: "green" },
        { label: "cvxpy", tone: "green" },
        { label: "scipy.optimize", tone: "green" },
        { label: "pandas", tone: "cyan" },
        { label: "FastAPI", tone: "cyan" },
        { label: "PostgreSQL", tone: "amber" },
        { label: "Redis", tone: "amber" },
        { label: "Next.js 16", tone: "cyan" },
      ],
      metrics: [
        { label: "OPTIMIZER", value: "MV · Black-Litterman" },
        { label: "FACTORS", value: "Fama-French 3/5F" },
        { label: "INSTRUMENTS", value: "Equity · Options" },
        { label: "REBALANCE", value: "Configurable schedule" },
        { label: "CONSTRAINTS", value: "Weight · sector · VaR" },
        { label: "OUTPUT", value: "Efficient frontier + weights" },
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
    },
  },
  {
    id: "P-03",
    codename: "HALFLIFE",
    title: "Half-Life Bio-Metrics",
    tag: "Live",
    status: "STABLE",
    statusLabel: "Live",
    summary:
      "Metabolic decay simulator applying first-order half-life kinetics to track substance " +
      "plasma concentration across multi-day dosing cycles.",
    stack: ["Python", "NumPy / SciPy", "FastAPI", "Recharts"],
    accent: "var(--color-terminal-cyan)",
    showOnLanding: false,
    registry: {
      displayType: "Live System",
      longDescription:
        "Half-Life Bio-Metrics models the pharmacokinetic decay of supplemental compounds — " +
        "including Creatine, Vitamin D3, and Magnesium — using the first-order decay equation " +
        "A(t) = A₀ × e^(−0.693t / t½). The system accounts for scheduled dosing intervals, " +
        "accumulation effects across multi-day cycles, and generates a continuous concentration " +
        "curve to inform optimal supplementation timing.",
      techStack: [
        { label: "Python 3.12", tone: "green" },
        { label: "NumPy / SciPy", tone: "green" },
        { label: "FastAPI", tone: "cyan" },
        { label: "Next.js 16", tone: "cyan" },
        { label: "TypeScript", tone: "cyan" },
        { label: "Tailwind CSS", tone: "amber" },
        { label: "Recharts", tone: "amber" },
      ],
      metrics: [
        { label: "SUBSTANCES", value: "Creatine · Vit-D3 · Mg" },
        { label: "ALGORITHM", value: "First-order decay" },
        { label: "FORMULA", value: "A(t) = A₀ × e^(−λt)" },
        { label: "HALF-LIFE", value: "Configurable per compound" },
        { label: "DOSING", value: "Accumulation-aware" },
        { label: "OUTPUT", value: "Plasma conc. curve" },
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
            sublabel: "FastAPI — /api/decay endpoint · JSON payload",
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
      links: [{ label: "OPEN LIVE MODULE", href: "/dashboard/biometrics" }],
    },
  },
  {
    id: "P-04",
    codename: "LEOLOGIC-OS",
    title: "LeoLogic OS",
    tag: "System",
    status: "ACTIVE",
    statusLabel: "Active",
    summary:
      "Personal operating system: biometrics dashboard, quant engine, and AI command center " +
      "in one unified interface.",
    stack: ["Next.js", "FastAPI", "Tailwind"],
    accent: "#60a5fa",
    showOnLanding: true,
  },
  {
    id: "P-05",
    codename: "CHEMSIM",
    title: "ChemSim Agent",
    tag: "Research",
    status: "WIP",
    statusLabel: "Prototype",
    summary:
      "AI agent for chemical process simulation and optimization. Automates HYSYS workflows " +
      "using Python scripting and LLM reasoning.",
    stack: ["Python", "LLM", "HYSYS COM"],
    accent: "#c084fc",
    showOnLanding: true,
  },
];

/** Projects shown in the landing page's Featured Work grid. */
export const LANDING_PROJECTS = PROJECTS.filter((p) => p.showOnLanding);

/** Projects with full architecture detail, rendered on /projects. */
export const REGISTRY_PROJECTS = PROJECTS.filter(
  (p): p is Project & { registry: ProjectRegistryDetail } => p.registry !== undefined,
);
