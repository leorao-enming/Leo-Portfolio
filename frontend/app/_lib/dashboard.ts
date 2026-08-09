// ─────────────────────────────────────────────────────────────────────────────
// Dashboard payload types and fetchers.
//
// These mirror the Pydantic models in backend/schemas/. The API emits semantic
// tones ("amber") rather than CSS class names, so presentation stays here.
// ─────────────────────────────────────────────────────────────────────────────

import { fetchApi, type ApiResult } from "./api";

export type Tone = "green" | "amber" | "cyan" | "red" | "neutral";

export type ModuleStatus =
  | "HEALTHY"
  | "ACTIVE"
  | "STANDBY"
  | "PENDING"
  | "ERROR";

export type StatCard = {
  label: string;
  value: string;
  sub: string;
  tone: Tone;
};

export type MetricPair = { key: string; value: string };

export type ModuleHealth = {
  name: string;
  status: ModuleStatus;
  /** Build state or a measured figure — never an unmeasured performance number. */
  detail: string;
};

// ─── Quant ───────────────────────────────────────────────────────────────────

export type EngineLayer = {
  layer: string;
  name: string;
  tech: string;
  description: string;
  status: ModuleStatus;
  /** Build state, e.g. "Implemented" or "Paper gateway only". */
  implementation: string;
};

export type FlowStepType =
  | "INPUT"
  | "INTERNAL"
  | "COMPUTE"
  | "CONTROL"
  | "OUTPUT"
  | "CONFIRM";

export type FlowStep = {
  step: string;
  node: string;
  type: FlowStepType;
  detail: string;
};

export type Strategy = {
  name: string;
  version: string;
  universe: string;
  lookback: string;
  params: string;
  status: "ACTIVE" | "STAGED" | "RESEARCH" | "RETIRED";
};

export type GateCondition = {
  label: string;
  target: string;
  met: boolean;
};

/** The interlock standing between the engine and real capital. */
export type SafetyGate = {
  flag: string;
  flag_value: string;
  mode: string;
  summary: string;
  conditions: GateCondition[];
  review_date: string;
};

/**
 * No live-signal feed by design. The engine runs paper-only with execution
 * gated off, so a table of scored signals would be fabricated telemetry
 * contradicting the safety gate rendered beside it.
 */
export type QuantDashboard = {
  status_cards: StatCard[];
  safety_gate: SafetyGate;
  engine_layers: EngineLayer[];
  ibkr_flow: FlowStep[];
  strategies: Strategy[];
  modules: ModuleHealth[];
};

// ─── Bio ─────────────────────────────────────────────────────────────────────

export type Supplement = {
  name: string;
  dose: string;
  frequency: string;
  half_life: string;
  purpose: string;
};

export type HalfLifeParam = {
  param: string;
  half_life: string;
  category: string;
  notes: string;
};

export type BioModule = { name: string; status: ModuleStatus };

export type TrainingEntry = {
  date: string;
  type: string;
  duration: string;
  load: string;
  half_life: string;
  decay: string;
};

export type BioDashboard = {
  metric_cards: StatCard[];
  supplements: Supplement[];
  halflife_params: HalfLifeParam[];
  training_log: TrainingEntry[];
  modules: BioModule[];
};

// ─── System ──────────────────────────────────────────────────────────────────

export type ActivityCategory =
  | "BUILD"
  | "RESEARCH"
  | "TRAINING"
  | "LEARNING"
  | "OPS";

export type ActivityEntry = {
  date: string;
  category: ActivityCategory;
  level: "INFO" | "WARN" | "ERROR";
  title: string;
  detail: string;
  tags: string[];
};

export type SubsystemSummary = {
  id: string;
  label: string;
  description: string;
  href: string;
  status_label: string;
  tone: Tone;
  metrics: MetricPair[];
};

export type SystemOverview = {
  subsystems: SubsystemSummary[];
  activity: ActivityEntry[];
};

// ─── Presentation mapping ────────────────────────────────────────────────────

/** Semantic tone → the terminal text class defined in globals.css. */
export const TONE_CLASS: Record<Tone, string> = {
  green: "terminal-text",
  amber: "terminal-amber",
  cyan: "terminal-cyan",
  red: "terminal-red",
  neutral: "",
};

/** Tone → raw CSS colour, for inline styles where a class won't do. */
export const TONE_COLOR: Record<Tone, string> = {
  green: "var(--color-terminal-green)",
  amber: "var(--color-terminal-amber)",
  cyan: "var(--color-terminal-cyan)",
  red: "var(--color-terminal-red)",
  neutral: "#71717a",
};

/** Module status → the status-dot modifier class. */
export function statusDotClass(status: ModuleStatus): string {
  if (status === "HEALTHY" || status === "ACTIVE") return "status-dot-online";
  if (status === "STANDBY" || status === "PENDING") return "status-dot-idle";
  return "status-dot-offline";
}

/** Module status → text colour. */
export function statusColor(status: ModuleStatus): string {
  if (status === "HEALTHY" || status === "ACTIVE") return TONE_COLOR.green;
  if (status === "STANDBY" || status === "PENDING") return TONE_COLOR.amber;
  return TONE_COLOR.red;
}

// ─── Fetchers ────────────────────────────────────────────────────────────────

export function getSystemOverview(): Promise<ApiResult<SystemOverview>> {
  return fetchApi<SystemOverview>("/system/overview");
}

export function getQuantDashboard(): Promise<ApiResult<QuantDashboard>> {
  return fetchApi<QuantDashboard>("/quant/dashboard");
}

export function getBioDashboard(): Promise<ApiResult<BioDashboard>> {
  return fetchApi<BioDashboard>("/bio/dashboard");
}
