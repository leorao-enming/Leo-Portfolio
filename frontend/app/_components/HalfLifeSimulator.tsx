"use client";

import { useState } from "react";
import { apiUrl } from "../_lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

const SUBSTANCES = ["Caffeine", "Melatonin"] as const;
type Substance = (typeof SUBSTANCES)[number];

type DecayDataPoint = {
  time_hours: number;
  remaining_mg: number;
};

type DecayResponse = {
  substance: string;
  dosage_mg: number;
  half_life_hours: number;
  effective_half_life_hours: number;
  bone_weight_modifier: number;
  data_points: DecayDataPoint[];
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function DecayTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="text-xs font-mono"
      style={{
        background: "#fbfaf6",
        border: "1px solid rgba(3,105,161,0.25)",
        borderRadius: "2px",
        padding: "8px 12px",
        boxShadow: "0 4px 16px rgba(10,12,15,0.1)",
        color: "var(--text-muted)",
      }}
    >
      <p style={{ color: "var(--text-muted)", marginBottom: "4px" }}>T+{label}h</p>
      <p>
        <span style={{ color: "#0369a1" }}>{payload[0].value.toFixed(2)}</span>
        <span style={{ color: "var(--text-muted)" }}> mg remaining</span>
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HalfLifeSimulator() {
  const [substance, setSubstance] = useState<Substance>(SUBSTANCES[0]);
  const [dosage, setDosage] = useState<number>(200);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DecayResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("/api/decay"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          substance,
          dosage,
          bone_weight_modifier: 4.5,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          typeof errData.detail === "string"
            ? errData.detail
            : "Simulation request failed."
        );
      }

      const data: DecayResponse = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="mt-5 p-4"
      style={{
        background: "#f2f1ed",
        border: "1px solid rgba(3,105,161,0.15)",
        borderTop: "1px solid rgba(3,105,161,0.3)",
      }}
    >
      {/* ── Section label ─────────────────────────────────────────────────
          This page carries two exponential-decay charts, and labelled only
          "INTERACTIVE" this one read as a repeat of the illustrative curve
          near the top. It is not: that one is drawn client-side from fixed
          numbers, this one posts to the Python/FastAPI service and plots
          what comes back. Saying so turns an apparent duplicate into the
          page's strongest single piece of evidence — it is what makes the
          "DECAY API · live endpoint" row in SYSTEM SPECS checkable rather
          than merely claimed. */}
      <p className="text-xs tracking-[0.25em] mb-2 text-[var(--text-muted)]">
        DECAY SIMULATOR — LIVE ENDPOINT
      </p>
      <p className="text-xs leading-relaxed mb-4 text-[var(--text-muted)]">
        The curve higher up the page is drawn from fixed numbers to show the
        mechanic. This one posts to the Python service and plots the response —
        the same <span className="font-mono">/api/decay</span> the app calls.
      </p>

      {/* ── Controls ──────────────────────────────────────────────────────── */}
      {/* Two controls, both of which do something. A third sat here — a
          disabled "BONE WEIGHT BASELINE" pinned to 4.5, the value at which
          the backend's scale factor is exactly 1.0. It could not be changed,
          it never altered the result, and its label described a physiological
          mechanism the model does not implement (see _calculate_decay in
          backend/routers/bio_metrics.py). A control that cannot be operated
          and does nothing is not a control. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Substance selector */}
        <div>
          <label className="block text-xs tracking-wider text-[var(--text-muted)] mb-1.5">
            SUBSTANCE
          </label>
          <select
            value={substance}
            onChange={(e) => setSubstance(e.target.value as Substance)}
            className="w-full text-xs font-mono px-3 py-2 appearance-none"
            style={{
              background: "#fbfaf6",
              border: "1px solid rgba(3,105,161,0.22)",
              borderRadius: "1px",
              color: "#0369a1",
            }}
          >
            {SUBSTANCES.map((s) => (
              <option key={s} value={s} style={{ background: "#fbfaf6", color: "#0369a1" }}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Initial dosage */}
        <div>
          <label className="block text-xs tracking-wider text-[var(--text-muted)] mb-1.5">
            INITIAL DOSAGE (mg)
          </label>
          <input
            type="number"
            value={dosage}
            min={1}
            onChange={(e) => setDosage(Math.max(1, Number(e.target.value)))}
            className="w-full text-xs font-mono px-3 py-2"
            style={{
              background: "#fbfaf6",
              border: "1px solid rgba(3,105,161,0.2)",
              borderRadius: "1px",
              color: "var(--color-text-primary)",
            }}
          />
        </div>

      </div>

      {/* ── Run button ────────────────────────────────────────────────────── */}
      <button
        onClick={runSimulation}
        disabled={loading}
        className="text-xs tracking-widest font-mono px-5 py-2 text-[#0369a1] transition-all duration-150"
        style={{
          border: "1px solid rgba(3,105,161,0.35)",
          borderRadius: "1px",
          background: loading
            ? "rgba(3,105,161,0.02)"
            : "rgba(3,105,161,0.07)",
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "CALCULATING..." : "RUN SIMULATION"}
      </button>

      {/* ── Status region — announced to screen readers ───────────────────── */}
      <div aria-live="polite" className="sr-only">
        {loading
          ? "Running simulation."
          : error
            ? `Simulation failed: ${error}`
            : result
              ? `Simulation complete for ${result.substance}, ${result.dosage_mg} milligrams.`
              : ""}
      </div>

      {/* ── Error output ──────────────────────────────────────────────────── */}
      {error && (
        <p
          className="mt-3 text-xs font-mono"
          style={{ color: "#b91c1c" }}
        >
          ✗ {error}
        </p>
      )}

      {/* ── Results & Chart ───────────────────────────────────────────────── */}
      {result && (
        <div className="mt-5">
          {/* Result metadata row */}
          <div
            className="flex flex-wrap items-center justify-between gap-2 mb-3 px-3 py-2"
            style={{
              background: "#fbfaf6",
              border: "1px solid rgba(3,105,161,0.1)",
            }}
          >
            <span className="text-xs font-mono tracking-wider text-[var(--text-muted)]">
              {result.substance.toUpperCase()} — {result.dosage_mg}mg
            </span>
            <div className="flex items-center gap-4">
              {/* "base" and "eff" were rendered side by side and were always
                  the same number, because the scale factor is pinned at its
                  no-op value — two labels implying a distinction the response
                  never actually carries. Show the effective value alone, and
                  reveal the pair only if they ever genuinely diverge. */}
              <span className="text-xs font-mono text-[var(--text-muted)]">
                t½:{" "}
                <span className="text-[#0369a1]">
                  {result.effective_half_life_hours}h
                </span>
              </span>
              {result.effective_half_life_hours !== result.half_life_hours && (
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  t½ base:{" "}
                  <span className="text-[#0369a1]">{result.half_life_hours}h</span>
                </span>
              )}
            </div>
          </div>

          {/* Recharts decay curve */}
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={result.data_points}
              margin={{ top: 6, right: 6, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="2 4"
                stroke="rgba(10,12,15,0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="time_hours"
                tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "monospace" }}
                tickFormatter={(v: number) => `${v}h`}
                axisLine={{ stroke: "rgba(10,12,15,0.1)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "monospace" }}
                axisLine={{ stroke: "rgba(10,12,15,0.1)" }}
                tickLine={false}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(1)}g` : `${v}mg`
                }
                width={46}
              />
              <Tooltip content={<DecayTooltip />} />
              <Line
                type="monotone"
                dataKey="remaining_mg"
                stroke="#0369a1"
                strokeWidth={1.5}
                dot={{ fill: "#0369a1", r: 3, strokeWidth: 0 }}
                activeDot={{
                  r: 5,
                  fill: "#0369a1",
                  stroke: "rgba(3,105,161,0.35)",
                  strokeWidth: 4,
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Data table strip */}
          <div
            className="mt-2 overflow-x-auto"
            style={{ borderTop: "1px solid rgba(10,12,15,0.08)" }}
          >
            <table className="w-full text-xs font-mono">
              <thead>
                <tr>
                  {result.data_points.map((pt) => (
                    <th
                      key={pt.time_hours}
                      className="px-2 py-1.5 text-center font-normal"
                      style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}
                    >
                      T+{pt.time_hours}h
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {result.data_points.map((pt) => (
                    <td
                      key={pt.time_hours}
                      className="px-2 py-1 text-center"
                      style={{ color: "#0369a1" }}
                    >
                      {pt.remaining_mg >= 1000
                        ? `${(pt.remaining_mg / 1000).toFixed(2)}g`
                        : `${pt.remaining_mg}mg`}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
