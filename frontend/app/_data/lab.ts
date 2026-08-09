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
  upstreamUrl?: string;
  status: LabStatus;
  /** Why this build is worth the time, in capability terms. */
  objective: string;
  /** Named skills the build is meant to produce. */
  capabilities: string[];
  /** The honest link back to the process engineering track. */
  transfer: string;
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
];

export const LAB_STATUS_TONE: Record<LabStatus, string> = {
  QUEUED: "rgba(255,255,255,0.38)",
  "IN PROGRESS": "var(--color-terminal-amber)",
  SHIPPED: "var(--color-terminal-green)",
};

/**
 * Shown beneath the roadmap. Naming the rule out loud is the point: it tells a
 * reader that everything *else* on this site has already cleared that bar.
 */
export const LAB_DISCLOSURE =
  "Nothing here is finished. Entries move to shipped only when the build runs " +
  "and the write-up exists — until then they stay listed as intent.";
