// ─────────────────────────────────────────────────────────────────────────────
// Canonical project registry — single source of truth.
//
// Both the landing page (ProjectsSection) and the full registry (/projects)
// read from here, so a project's name, codename, and status can only be
// stated in one place.
//
// Content is kept in step with the Obsidian knowledge vault, which is the
// system of record for project scope and architecture decisions. Nothing here
// should claim a capability the vault does not back.
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
  /** Marks a link that lands behind the operator auth gate. */
  requiresAuth?: boolean;
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
    codename: "LQC",
    title: "LeoLogic Quantitative Core",
    tag: "Flagship",
    status: "ACTIVE",
    statusLabel: "In Development",
    summary:
      "A remote operator console for Interactive Brokers, built as a private Discord bot — " +
      "market data, signals, and backtests all run from a chat command, not a web dashboard. " +
      "Live order execution is gated off behind measurable validation criteria.",
    stack: ["Python", "Discord Bot", "IBKR API", "ib_insync"],
    accent: "var(--color-terminal-green)",
    showOnLanding: true,
    landingFeatured: true,
    registry: {
      displayType: "Architecture Only",
      longDescription:
        "LQC is operated entirely through a private Discord bot — the interaction model is " +
        "deliberately conversational: an operator command in a chat channel is the interface, " +
        "not a web UI. The bot connects to Interactive Brokers' paper gateway via ib_insync, " +
        "runs a technical-indicator signal engine, and drives a backtesting framework with " +
        "parameter sweeps and trade-level diagnostics — all reachable from chat. The order " +
        "path is implemented and exercised against the paper gateway, but live execution is " +
        "held behind an explicit flag — ENABLE_ORDER_EXECUTION stays false until the strategy " +
        "set clears full-universe backtesting, risk-module stress testing, and a 90-day " +
        "profitable paper record. Treating the safety interlock as a first-class, documented " +
        "decision matters more here than shipping the feature early. Command surface and " +
        "strategy logic are closed; the architecture below reflects the real component design.",
      techStack: [
        { label: "Python", tone: "green" },
        { label: "discord.py", tone: "green" },
        { label: "ib_insync", tone: "green" },
        { label: "pandas", tone: "cyan" },
        { label: "SQLite", tone: "amber" },
        { label: "Docker", tone: "amber" },
      ],
      metrics: [
        { label: "INTERFACE", value: "Private Discord bot" },
        { label: "BROKER", value: "Interactive Brokers — paper gateway" },
        { label: "EXECUTION", value: "Paper only — live gated" },
        { label: "SAFETY FLAG", value: "ENABLE_ORDER_EXECUTION=false" },
        { label: "UNLOCK BAR", value: "Sharpe > 1.5 · 90d paper" },
        { label: "NEXT REVIEW", value: "2026-Q4" },
      ],
      architecture: {
        title: "LQC — REMOTE OPERATOR STACK",
        layers: [
          {
            label: "DISCORD OPERATOR CONSOLE",
            sublabel: "Chat-driven command surface — the entire remote-operate interface",
            tone: "cyan",
          },
          {
            label: "IBKR CONNECTION LAYER",
            sublabel: "ib_insync paper-gateway session — quotes, bars, account state",
            tone: "cyan",
          },
          {
            label: "SAFETY INTERLOCK",
            sublabel: "Input validation + persistent kill switch, gates the engine before any order path",
            tone: "amber",
          },
          {
            label: "SIGNAL ENGINE",
            sublabel: "Technical-indicator strategy logic, iterated across versions",
            tone: "green",
          },
          {
            label: "BACKTEST FRAMEWORK",
            sublabel: "Historical replay, parameter sweeps, trade-level diagnostics",
            tone: "green",
          },
          {
            label: "JOURNAL LEDGER",
            sublabel: "Local SQLite trade and account log",
            tone: "amber",
          },
          {
            label: "ORDER GATE",
            sublabel: "ENABLE_ORDER_EXECUTION flag — live path implemented but held closed",
            tone: "amber",
          },
        ],
      },
      tags: [
        "QUANT_RESEARCH",
        "DISCORD_BOT",
        "REMOTE_OPS",
        "IBKR_API",
        "BACKTESTING",
        "SIGNAL_PROCESSING",
        "SAFETY_ENGINEERING",
      ],
      links: [
        { label: "LIVE MODULE — OPERATOR ACCESS", href: "/dashboard/quant", requiresAuth: true },
      ],
    },
  },
  {
    id: "P-02",
    codename: "HALFLIFE",
    title: "Half-Life",
    tag: "Mobile",
    status: "ACTIVE",
    statusLabel: "In Development",
    summary:
      "iOS health and metabolism app built on Expo and React Native, reading Apple HealthKit " +
      "data and modelling physiological recovery as first-order exponential decay.",
    stack: ["Expo", "React Native", "HealthKit", "Supabase"],
    accent: "var(--color-terminal-cyan)",
    showOnLanding: true,
    registry: {
      displayType: "Live System",
      longDescription:
        "Half-Life is an iOS application built with Expo and React Native that reads Apple " +
        "HealthKit data and models metabolic load, recovery, and supplement pharmacokinetics " +
        "as first-order decay: A(t) = A₀ · e^(−0.693t / t½). Supabase backs sync and " +
        "persistence. The architecture deliberately runs on the stable React Native core — " +
        "Skia, Reanimated, and Worklets were removed after they proved to be a recurring " +
        "source of build fragility, and stability now takes priority over animation ceiling. " +
        "The decay model itself is exposed through a Python service, and the simulator below " +
        "calls that live endpoint.",
      techStack: [
        { label: "Expo", tone: "green" },
        { label: "React Native", tone: "green" },
        { label: "HealthKit", tone: "green" },
        { label: "Supabase", tone: "cyan" },
        { label: "TypeScript", tone: "cyan" },
        { label: "Python", tone: "cyan" },
        { label: "FastAPI", tone: "amber" },
      ],
      metrics: [
        { label: "PLATFORM", value: "iOS — Expo / React Native" },
        { label: "HEALTH DATA", value: "Apple HealthKit" },
        { label: "BACKEND", value: "Supabase" },
        { label: "MODEL", value: "A(t) = A₀ · e^(−λt)" },
        { label: "ARCH CHOICE", value: "Stable core — no Skia/Reanimated" },
        { label: "DECAY API", value: "Python · live endpoint" },
      ],
      architecture: {
        title: "HALF-LIFE — DECAY ENGINE",
        layers: [
          {
            label: "HEALTHKIT INGESTION",
            sublabel: "Native iOS permissions · workout, sleep, and vitals reads",
            tone: "cyan",
          },
          {
            label: "SUPABASE SYNC",
            sublabel: "Persistence and cross-session state",
            tone: "cyan",
          },
          {
            label: "SUBSTANCE CONFIG",
            sublabel: "t½ per compound · dosage · unit-of-measure",
            tone: "green",
          },
          {
            label: "HALF-LIFE KINETICS",
            sublabel: "A(t) = A₀ · e^(−0.693t / t½) — first-order decay",
            tone: "green",
          },
          {
            label: "DOSE SCHEDULER",
            sublabel: "Multi-dose accumulation · replenishment timing",
            tone: "amber",
          },
          {
            label: "DECAY API",
            sublabel: "Python / FastAPI — /api/decay · powers the simulator below",
            tone: "cyan",
          },
          {
            label: "VISUALIZER",
            sublabel: "Concentration curve · peak and trough markers",
            tone: "amber",
          },
        ],
      },
      tags: [
        "IOS",
        "REACT_NATIVE",
        "EXPO",
        "HEALTHKIT",
        "SUPABASE",
        "PHARMACOKINETICS",
        "HALF_LIFE_MODELING",
      ],
      links: [
        { label: "LIVE MODULE — OPERATOR ACCESS", href: "/dashboard/biometrics", requiresAuth: true },
      ],
    },
  },
  {
    id: "P-03",
    codename: "LEOLOGIC-OS",
    title: "LeoLogic OS",
    tag: "System",
    status: "ACTIVE",
    statusLabel: "Active",
    summary:
      "Personal operating system handling tasks, priorities, agent workflows, and " +
      "cross-system automation — with Obsidian as the long-term knowledge layer beside it.",
    stack: ["Next.js", "FastAPI", "Python", "Obsidian"],
    accent: "#60a5fa",
    showOnLanding: true,
    registry: {
      displayType: "Live System",
      longDescription:
        "LeoLogic OS is the execution layer of a two-system personal architecture. It owns " +
        "tasks, priorities, agent workflows, automation, and cross-system execution; Obsidian " +
        "owns long-term knowledge, project context, and decision records. The split is a " +
        "documented scope boundary rather than an accident — neither system duplicates what " +
        "the other already does well, which is what keeps maintenance cost from doubling. " +
        "Development runs in phases, each with an explicit acceptance checklist and a " +
        "test → commit → tag → changelog cycle. This site and its FastAPI backend are the " +
        "public surface of that system.",
      techStack: [
        { label: "Next.js 16", tone: "green" },
        { label: "React 19", tone: "green" },
        { label: "TypeScript", tone: "cyan" },
        { label: "Tailwind CSS", tone: "cyan" },
        { label: "FastAPI", tone: "cyan" },
        { label: "Python", tone: "amber" },
        { label: "Obsidian", tone: "amber" },
      ],
      metrics: [
        { label: "EXECUTION LAYER", value: "LeoLogic OS" },
        { label: "KNOWLEDGE LAYER", value: "Obsidian vault" },
        { label: "CODE LAYER", value: "Git — commit history" },
        { label: "METHOD", value: "Phase-based · acceptance checklists" },
        { label: "RELEASE CYCLE", value: "test → commit → tag → changelog" },
        { label: "SCOPE RULE", value: "No duplicated responsibility" },
      ],
      architecture: {
        title: "LEOLOGIC OS — SYSTEM SPLIT",
        layers: [
          {
            label: "EXECUTION — LEOLOGIC OS",
            sublabel: "Tasks · priorities · agent workflows · automation",
            tone: "green",
          },
          {
            label: "KNOWLEDGE — OBSIDIAN",
            sublabel: "Decisions · project context · career and reference material",
            tone: "cyan",
          },
          {
            label: "CODE — GIT",
            sublabel: "Implementation and commit history",
            tone: "cyan",
          },
          {
            label: "PUBLIC SURFACE",
            sublabel: "Next.js portfolio + FastAPI dashboard API",
            tone: "green",
          },
          {
            label: "PHASE PIPELINE",
            sublabel: "Goal → acceptance checklist → test → commit → tag → changelog",
            tone: "amber",
          },
        ],
      },
      tags: [
        "PERSONAL_SYSTEMS",
        "AGENT_WORKFLOWS",
        "AUTOMATION",
        "NEXT_JS",
        "FASTAPI",
        "KNOWLEDGE_MANAGEMENT",
        "SYSTEM_DESIGN",
      ],
      links: [
        { label: "COMMAND CENTER — OPERATOR ACCESS", href: "/dashboard", requiresAuth: true },
      ],
    },
  },
  {
    id: "P-04",
    codename: "ANOMALY",
    title: "异常事务处",
    tag: "Creative IP",
    status: "WIP",
    statusLabel: "In Production",
    summary:
      "AI-assisted short-drama and novel IP, exploring a repeatable content production " +
      "workflow and monetisation path. Written under the pen name 尤尼维斯.",
    stack: ["AI-assisted writing", "Worldbuilding", "Content ops"],
    accent: "#c084fc",
    showOnLanding: false,
    registry: {
      displayType: "Architecture Only",
      longDescription:
        "异常事务处 is an original short-drama and novel IP developed with AI assistance " +
        "across drafting, worldbuilding, and revision. The goal is less a single story than a " +
        "repeatable production pipeline: a structured worldbuilding and character base that " +
        "keeps continuity across episodes, an AI-assisted drafting loop that stays under " +
        "authorial control, and a distribution track for content operations. Current milestone " +
        "is unit U-001. Published under the pen name 尤尼维斯.",
      techStack: [
        { label: "AI-assisted drafting", tone: "green" },
        { label: "Worldbuilding system", tone: "cyan" },
        { label: "Episode structure", tone: "cyan" },
        { label: "Character bible", tone: "cyan" },
        { label: "Content operations", tone: "amber" },
      ],
      metrics: [
        { label: "FORMAT", value: "Short drama · novel" },
        { label: "PEN NAME", value: "尤尼维斯" },
        { label: "MILESTONE", value: "U-001" },
        { label: "METHOD", value: "AI-assisted, author-directed" },
        { label: "FOCUS", value: "Repeatable production workflow" },
        { label: "TRACK", value: "Content monetisation" },
      ],
      architecture: {
        title: "异常事务处 — PRODUCTION PIPELINE",
        layers: [
          {
            label: "WORLDBUILDING",
            sublabel: "Setting rules · internal consistency constraints",
            tone: "cyan",
          },
          {
            label: "CHARACTER BIBLE",
            sublabel: "Cast definitions · voice and motivation continuity",
            tone: "cyan",
          },
          {
            label: "EPISODE STRUCTURE",
            sublabel: "Outline → beat sheet → script draft",
            tone: "green",
          },
          {
            label: "AI DRAFTING LOOP",
            sublabel: "Assisted generation under explicit authorial direction",
            tone: "green",
          },
          {
            label: "RESEARCH BASE",
            sublabel: "Reference material and plot source gathering",
            tone: "amber",
          },
          {
            label: "DISTRIBUTION",
            sublabel: "Publishing cadence and content operations",
            tone: "amber",
          },
        ],
      },
      tags: [
        "CREATIVE_IP",
        "AI_ASSISTED_WRITING",
        "SHORT_DRAMA",
        "WORLDBUILDING",
        "CONTENT_OPERATIONS",
        "NARRATIVE_DESIGN",
      ],
    },
  },
];

/** Projects shown in the landing page's Featured Work grid. */
export const LANDING_PROJECTS = PROJECTS.filter((p) => p.showOnLanding);

/** Projects with full architecture detail, rendered on /projects. */
export const REGISTRY_PROJECTS = PROJECTS.filter(
  (p): p is Project & { registry: ProjectRegistryDetail } => p.registry !== undefined,
);
