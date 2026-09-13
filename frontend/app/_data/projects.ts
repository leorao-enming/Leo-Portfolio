// ─────────────────────────────────────────────────────────────────────────────
// Canonical project registry — single source of truth.
//
// The landing page's Selected Work, the full registry (/projects), and each
// detail page (/projects/[slug]) all read from here, so a project's name,
// codename, and status can only be stated in one place.
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
  /**
   * URL segment for /projects/<slug>. Declared explicitly rather than derived
   * from codename or title: this is a public URL that may end up in a job
   * application, so renaming the project must not silently break the link.
   */
  slug: string;
  /** Short machine name, e.g. "LQC-CORE". Matches the dashboard subsystem id. */
  codename: string;
  /** Canonical display name. Never restate this anywhere else. */
  title: string;
  /** Short label for the landing-page pill. */
  tag: string;
  /**
   * Subject area, for the /projects archive's DOMAIN column. A short
   * classification of what the project already documents about itself —
   * not a new claim. `tag` is a display pill ("Flagship", "Mobile") and
   * describes the project's role in the portfolio; this describes its
   * field.
   */
  domain: string;
  /** PARKED = intentionally paused, not abandoned — distinct from ARCHIVED. */
  status: "ACTIVE" | "STABLE" | "WIP" | "ARCHIVED" | "PARKED";
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
    slug: "lqc",
    codename: "LQC",
    title: "LeoLogic Quantitative Core",
    tag: "Flagship",
    domain: "Markets / quant",
    status: "PARKED",
    statusLabel: "Parked — idle since 2026-05",
    summary:
      "A remote operator console for Interactive Brokers, built as a private Discord bot — " +
      "market data, signals, and backtests all run from a chat command, not a web dashboard. " +
      "Live order execution is gated off behind measurable validation criteria. Intentionally " +
      "paused since May 2026 while execution priority sits with Half-Life and LeoLogic OS; " +
      "reactivation requires a runtime evidence refresh before any further build work.",
    stack: ["Python", "Discord Bot", "IBKR API", "ib_insync"],
    accent: "var(--color-terminal-green)",
    showOnLanding: true,
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
    slug: "half-life",
    codename: "HALFLIFE",
    title: "Half-Life",
    tag: "Mobile",
    domain: "Health / kinetics",
    status: "ACTIVE",
    statusLabel: "Release candidate — 1.0.4 (6)",
    summary:
      "Local-first iOS app that helps make sense of the relationship between caffeine intake " +
      "and sleep — built on Expo and React Native, reading Apple HealthKit data and modelling " +
      "caffeine as first-order exponential decay.",
    stack: ["Expo", "React Native", "HealthKit", "Supabase"],
    accent: "var(--color-terminal-cyan)",
    showOnLanding: true,
    landingFeatured: true,
    registry: {
      displayType: "Live System",
      longDescription:
        "Half-Life is a local-first iOS app built with Expo and React Native that helps make " +
        "sense of caffeine intake against sleep timing, modelled as first-order decay: " +
        "A(t) = A₀ · e^(−0.693t / t½). HealthKit access is user-triggered and only feeds " +
        "suggestions — it never silently overwrites a manually-set sleep or wake time, and raw " +
        "sleep samples are never persisted or synced to the cloud. Supabase is optional " +
        "account/sync only; the core logging flow works fully local-first. The architecture " +
        "deliberately runs on the stable React Native core — Skia, Reanimated, and Worklets " +
        "were removed after they proved to be a recurring source of build fragility, and " +
        "stability now takes priority over animation ceiling. The decay model itself is " +
        "exposed through a Python service, and the simulator below calls that live endpoint. " +
        "A signed 1.0.4 (6) release archive is built and locally exported; device acceptance " +
        "and TestFlight remain open.",
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
        { label: "BUILD", value: "1.0.4 (6) — signed archive exported" },
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
        { label: "GITHUB — half-life-app", href: "https://github.com/leorao-enming/half-life-app" },
      ],
    },
  },
  {
    id: "P-03",
    slug: "leologic-os",
    codename: "LEOLOGIC-OS",
    title: "LeoLogic OS",
    tag: "System",
    domain: "Personal systems",
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
        "The real leologic-os repository is private, has its own Vite + React + TypeScript " +
        "client with a Vitest test suite, and has shipped Phase 1 through 9 plus a separate " +
        "\"Adventure Mode\" feature line, each phase with its own written acceptance " +
        "checklist — and its daily/ and weekly/ directories hold real dated review files, " +
        "not templates, which is the evidence the phase cadence is actually lived in rather " +
        "than just designed. This site's Command Center below is a separate, public-facing " +
        "Next.js + FastAPI surface that visualizes a slice of that state — not the OS itself.",
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
        { label: "REAL CLIENT STACK", value: "Vite + React + TypeScript + Vitest" },
        { label: "PHASES SHIPPED", value: "Phase 1–9 + Adventure Mode (A–C)" },
        { label: "USAGE EVIDENCE", value: "Real daily/ and weekly/ review files" },
        { label: "KNOWLEDGE LAYER", value: "Obsidian vault" },
        { label: "METHOD", value: "Phase-based · acceptance checklists" },
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
    slug: "anomaly-affairs",
    codename: "ANOMALY",
    title: "异常事务处",
    tag: "Creative IP",
    domain: "AI / narrative",
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
  {
    id: "P-05",
    slug: "trace",
    codename: "TRACE",
    title: "Trace",
    tag: "AI Engineering",
    domain: "Evidence / AI",
    status: "ACTIVE",
    statusLabel: "In Development",
    summary:
      "An evidence-driven AI system for engineering drawings — upload a PDF, extract objects " +
      "and relationships with traceable source regions, and get grounded Q&A that highlights " +
      "back to the exact area of the drawing it answered from.",
    stack: ["TypeScript", "Cloudflare Workers", "D1", "R2", "OpenAI"],
    accent: "#fb923c",
    showOnLanding: true,
    registry: {
      displayType: "Architecture Only",
      longDescription:
        "Trace turns engineering drawings into a queryable evidence graph: a PDF is ingested, " +
        "structured into objects, relations, and source page regions, and every chat answer is " +
        "bound to evidenceIds and highlightIds that link back to the exact region it came from — " +
        "when evidence is insufficient the system says so rather than guessing. Production is " +
        "backed by an AI cost-control layer (unified router, per-request and daily budgets, " +
        "circuit breakers, audited usage events) and multi-tenant infrastructure (RBAC, credit " +
        "ledger, cross-tenant isolation, deletion pipelines). A research track (Pipeline v3) " +
        "ran a 30-drawing bootstrap benchmark — the gold annotations are still pending human " +
        "double-review, not yet frozen — and the quality gate correctly returned " +
        "rollback_required on the extraction scores, so production stays on the v2 pipeline " +
        "until accuracy clears the bar: a fail-closed rollout decision documented rather than " +
        "hidden.",
      techStack: [
        { label: "TypeScript", tone: "green" },
        { label: "React", tone: "green" },
        { label: "Cloudflare Workers", tone: "cyan" },
        { label: "D1", tone: "cyan" },
        { label: "R2", tone: "cyan" },
        { label: "OpenAI Files API", tone: "amber" },
        { label: "PDF.js", tone: "amber" },
      ],
      metrics: [
        { label: "INTERFACE", value: "Grounded PDF drawing Q&A" },
        { label: "DEPLOYMENT", value: "Cloudflare Workers + D1 + R2" },
        { label: "AI COST CONTROL", value: "Budgets, circuit breaker, audit trail" },
        { label: "QUALITY GATE", value: "v3 → rollback_required, v2 stays production" },
        { label: "BENCHMARK", value: "30/30 drawings, 270 standard regions" },
        { label: "EXTRACTION SCORES", value: "Object F1 0.25 / Relation F1 0.01 — below gate" },
        { label: "PHASE", value: "Gold double-review + deterministic extraction fixes" },
      ],
      architecture: {
        title: "TRACE — EVIDENCE GRAPH STACK",
        layers: [
          {
            label: "PDF INGESTION",
            sublabel: "Upload → R2 / OpenAI Files → structured DrawingGraph",
            tone: "cyan",
          },
          {
            label: "EVIDENCE GRAPH",
            sublabel: "Objects, relations, and source page regions with provenance",
            tone: "cyan",
          },
          {
            label: "GROUNDED Q&A",
            sublabel: "Answers bound to evidenceIds / highlightIds — no evidence, no guess",
            tone: "green",
          },
          {
            label: "AI COST ROUTER",
            sublabel: "Budgets, rate limits, circuit breaker, usage audit",
            tone: "amber",
          },
          {
            label: "TENANT CORE",
            sublabel: "Org/RBAC, credit ledger, cross-tenant isolation, deletion pipeline",
            tone: "amber",
          },
          {
            label: "PIPELINE V3 RESEARCH",
            sublabel: "Bootstrap gold benchmark (pending double-review) + automatic rollback on failed quality gate",
            tone: "green",
          },
        ],
      },
      tags: [
        "AI_ENGINEERING",
        "EVIDENCE_GRAPH",
        "GROUNDED_QA",
        "CLOUDFLARE_WORKERS",
        "COST_CONTROL",
        "QUALITY_GATES",
        "MULTI_TENANT",
      ],
    },
  },
  {
    id: "P-06",
    slug: "tiny-trials",
    codename: "TINY-TRIALS",
    title: "Tiny Trials",
    tag: "Mobile",
    domain: "Self-experiments",
    status: "ACTIVE",
    statusLabel: "In Development",
    summary:
      "A local-first iOS app for running one bounded, reviewable personal experiment at a " +
      "time — caffeine cutoffs, screen wind-down, morning light — reporting results with " +
      "honest confidence caveats instead of manufactured causal claims.",
    stack: ["Expo", "React Native", "TypeScript"],
    accent: "#fbbf24",
    showOnLanding: true,
    registry: {
      displayType: "Architecture Only",
      longDescription:
        "Tiny Trials runs exactly one active experiment at a time from a small template set — " +
        "caffeine cutoff, screen wind-down, morning light, steady wake — over a 7 to 90-day " +
        "window with up to three tracked metrics. Completing an experiment is an archive-first " +
        "transaction: the archive write happens before the active slot is released, so a failed " +
        "write can never silently lose a finished experiment. Reports degrade to low confidence " +
        "or 'no clear pattern yet' on sparse data rather than manufacturing a trend, and the app " +
        "stores everything locally — no account, no cloud sync — with full JSON export and " +
        "one-tap deletion under the user's control.",
      techStack: [
        { label: "Expo SDK 57", tone: "green" },
        { label: "React Native 0.86", tone: "green" },
        { label: "React 19", tone: "green" },
        { label: "TypeScript", tone: "cyan" },
        { label: "Local persistence", tone: "amber" },
      ],
      metrics: [
        { label: "PLATFORM", value: "iOS — Expo / React Native" },
        { label: "DATA MODEL", value: "One active experiment, archive-first completion" },
        { label: "TEMPLATES", value: "Caffeine cutoff, wind-down, morning light, steady wake" },
        { label: "PRIVACY", value: "No account, no cloud sync — local export + full delete" },
        { label: "BUILD", value: "1.1.0 (3) signed archive, uploaded" },
        { label: "STATUS", value: "Awaiting device acceptance + TestFlight" },
      ],
      architecture: {
        title: "TINY TRIALS — EXPERIMENT ENGINE",
        layers: [
          {
            label: "EXPERIMENT TEMPLATES",
            sublabel: "Bounded 7-90 day windows, up to 3 tracked metrics",
            tone: "cyan",
          },
          {
            label: "LOCAL RECORD STORE",
            sublabel: "Local-first persistence, legacy data migration on upgrade",
            tone: "cyan",
          },
          {
            label: "ARCHIVE-FIRST COMPLETION",
            sublabel: "Archive write commits before the active slot is released",
            tone: "green",
          },
          {
            label: "REPORT ENGINE",
            sublabel: "Confidence-graded, explicitly non-causal summaries",
            tone: "green",
          },
          {
            label: "SHARE CARD",
            sublabel: "Native-rendered screenshot export — no private notes included",
            tone: "amber",
          },
          {
            label: "DATA CONTROL",
            sublabel: "Local JSON export and full local deletion, user-triggered",
            tone: "amber",
          },
        ],
      },
      tags: [
        "IOS",
        "REACT_NATIVE",
        "EXPO",
        "LOCAL_FIRST",
        "PERSONAL_EXPERIMENTS",
        "PRIVACY_BY_DESIGN",
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

/** Look up a registry project by its URL slug. */
export function getProjectBySlug(slug: string) {
  return REGISTRY_PROJECTS.find((p) => p.slug === slug);
}
