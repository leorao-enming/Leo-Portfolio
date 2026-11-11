// ─────────────────────────────────────────────────────────────────────────────
// Lab — the open-source replication track.
//
// These are builds that have not shipped. The section states that plainly:
// every entry carries a status, and nothing is described in the past tense
// until it is real. A roadmap that is honest about what is queued reads as
// deliberate; the same list implied to be finished work does not survive one
// follow-up question in an interview.
//
// Each entry leads with the capability it buys rather than the artefact. The
// point of replicating these systems is the transferable engineering — sensor
// fusion, real-time control loops, closed-loop calibration — which is the same
// skill set that automated process plants run on.
// ─────────────────────────────────────────────────────────────────────────────

export type LabStatus = "QUEUED" | "IN PROGRESS" | "SHIPPED";

export type LabEntry = {
  id: string;
  title: string;
  /** What is being replicated, and from where. */
  upstream: string;
  status: LabStatus;
  /**
   * Why this build is worth the time, in capability terms.
   * One string is one paragraph; an array is several. L-03 covers two
   * separate builds and needs the breaks — the others are two sentences
   * and do not.
   */
  objective: string | readonly string[];
  /** Named skills the build is meant to produce. */
  capabilities: string[];
  /** The honest link back to the process engineering track. */
  transfer: string;
  /** One-line, verifiable build state — test counts, CI status, dates. Omit until there's something real to report. */
  evidence?: string;
  /** Clickable, verifiable references — public repos, CI runs. */
  links?: { label: string; href: string }[];
};

export const LAB_ENTRIES: LabEntry[] = [
  {
    id: "L-01",
    title: "Portable voice assistant",
    upstream: "Open-source wake-word and on-device speech stacks",
    status: "QUEUED",
    objective:
      "Build a self-contained voice interface that runs wake-word detection and " +
      "speech recognition locally, so the whole loop works without a network round trip.",
    capabilities: [
      "Embedded audio pipelines",
      "On-device inference",
      "Real-time streaming I/O",
      "Power and thermal budgeting",
    ],
    transfer:
      "Hands-free operation and local-first reliability are the same constraints " +
      "that govern instrumentation on a plant floor.",
  },
  {
    id: "L-02",
    title: "Open bipedal robot replication",
    upstream: "NVIDIA / Disney Research BDX-style open droid platform",
    status: "QUEUED",
    objective:
      "Reproduce a published bipedal robot from open hardware and control code, and " +
      "get it balancing under a policy I can read, modify, and explain end to end.",
    capabilities: [
      "Real-time control loops",
      "Sensor fusion — IMU and encoders",
      "Actuator calibration",
      "Simulation-to-hardware transfer",
    ],
    transfer:
      "Closed-loop control, sensor calibration, and drift handling are exactly the " +
      "mechanics behind DCS level, pressure, and flow control.",
  },
  {
    id: "L-03",
    title: "FabTwin & FabChem",
    upstream:
      "Own build — hierarchical semiconductor process simulator (FabTwin) and an IPA/water " +
      "separation flowsheet optimizer (FabChem); public fab datasets are the planned external check",
    status: "IN PROGRESS",
    /* Framing, then one paragraph per build. This entry was a single block
       of ~100 words sitting between two entries of two sentences each; the
       density read as a different author. Wording unchanged. */
    objective: [
      "Two evidence-first engineering projects built for process/manufacturing New Grad " +
        "roles, on a 2027-06-30 deadline.",
      "FabTwin is a plasma-etch SPC and fault-detection simulator whose intended differentiator " +
        "isn't the model — it's validating that model against two real public fab datasets " +
        "(SECOM, LAM9600) with the correct statistics, including a deliberate reproduction " +
        "of the common evaluation mistakes (like reporting raw accuracy on a 1:14 class " +
        "imbalance) as a documented contrast. That validation has not been run yet.",
      "FabChem is an IPA/water separation techno-economic optimizer. Its thermodynamic " +
        "parameters are being cross-checked across independent literature NRTL sources; " +
        "the flowsheet, cost model and uncertainty analysis are still ahead.",
    ],
    capabilities: [
      "Statistical process control (SPC)",
      "Multivariate fault detection — PCA / Hotelling T² / SPE",
      "Process simulation & validation",
      "Thermodynamic modelling & flowsheet optimization",
    ],
    transfer:
      "This is the direct target skill set for process and manufacturing engineering roles — " +
      "SPC, capability analysis, and flowsheet optimization are the daily tools of the " +
      "internship track this site already documents.",
    /* Vault: FabTwin & FabChem Overview + T3 review, 2026-11-05. */
    evidence:
      "FabTwin: 158 tests passing at 775ce5e (local + CI), ruff/mypy clean. Simulator (T1) and " +
      "SPC/capability (T2) milestones closed. Detection scoring, yield/DPPM and PCA / " +
      "Hotelling T² / SPE (T3) are implemented, but a 2026-11-05 review found six issues to " +
      "fix before the milestone closes. Frozen case studies, dashboard and public-dataset " +
      "validation not started. FabChem: IDAES + IPOPT solver feasibility passed; NRTL " +
      "parameters sourced from three independent papers; flowsheet and TEA not started.",
    links: [
      { label: "fabtwin", href: "https://github.com/leorao-enming/fabtwin" },
      { label: "fabchem-optimizer", href: "https://github.com/leorao-enming/fabchem-optimizer" },
    ],
  },
];

// Darkened for AA text contrast on the light public site (these render as
// small uppercase status text, not chrome, so the contrast floor applies).
export const LAB_STATUS_TONE: Record<LabStatus, string> = {
  QUEUED: "var(--text-muted)",
  "IN PROGRESS": "#92400e",
  SHIPPED: "var(--color-accent-ink)",
};

/**
 * Shown beneath the roadmap. Naming the rule out loud is the point: it tells a
 * reader that everything *else* on this site has already cleared that bar.
 */
export const LAB_DISCLOSURE =
  "Nothing here is finished. Entries move to shipped only when the build runs " +
  "and the write-up exists — until then they stay listed as intent.";
