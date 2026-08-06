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

const SUBSTANCES = ["Creatine", "Vitamin D3", "Artichoke Extract"] as const;
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
        background: "#080808",
        border: "1px solid rgba(0,212,255,0.22)",
        borderRadius: "2px",
        padding: "8px 12px",
        color: "#a1a1aa",
      }}
    >
      <p style={{ color: "#555", marginBottom: "4px" }}>T+{label}h</p>
      <p>
        <span style={{ color: "#00d4ff" }}>{payload[0].value.toFixed(2)}</span>
        <span style={{ color: "#3f3f46" }}> mg remaining</span>
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HalfLifeSimulator() {
  const [substance, setSubstance] = useState<Substance>(SUBSTANCES[0]);
  const [dosage, setDosage] = useState<number>(5000);
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
        background: "var(--color-surface-0)",
        border: "1px solid rgba(0,212,255,0.15)",
        borderTop: "1px solid rgba(0,212,255,0.3)",
      }}
    >
      {/* ── Section label ─────────────────────────────────────────────────── */}
      <p className="text-xs tracking-[0.25em] mb-4 text-zinc-500">
        DECAY SIMULATOR — INTERACTIVE
      </p>

      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* Substance selector */}
        <div>
          <label className="block text-xs tracking-wider text-zinc-600 mb-1.5">
            SUBSTANCE
          </label>
          <select
            value={substance}
            onChange={(e) => setSubstance(e.target.value as Substance)}
            className="w-full text-xs font-mono px-3 py-2 appearance-none"
            style={{
              background: "var(--color-surface-1)",
              border: "1px solid rgba(0,212,255,0.22)",
              borderRadius: "1px",
              color: "#00d4ff",
              outline: "none",
            }}
          >
            {SUBSTANCES.map((s) => (
              <option key={s} value={s} style={{ background: "#0d0d0d" }}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Initial dosage */}
        <div>
          <label className="block text-xs tracking-wider text-zinc-600 mb-1.5">
            INITIAL DOSAGE (mg)
          </label>
          <input
            type="number"
            value={dosage}
            min={1}
            onChange={(e) => setDosage(Math.max(1, Number(e.target.value)))}
            className="w-full text-xs font-mono px-3 py-2"
            style={{
              background: "var(--color-surface-1)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: "1px",
              color: "#e0e0e0",
              outline: "none",
            }}
          />
        </div>

        {/* Bone weight baseline — readonly system variable */}
        <div>
          <label className="block text-xs tracking-wider text-zinc-600 mb-1.5">
            BONE WEIGHT BASELINE
          </label>
          <input
            type="text"
            value="4.5"
            disabled
            readOnly
            className="w-full text-xs font-mono px-3 py-2 cursor-not-allowed"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "1px",
              color: "#3f3f46",
            }}
          />
        </div>
      </div>

      {/* ── Run button ────────────────────────────────────────────────────── */}
      <button
        onClick={runSimulation}
        disabled={loading}
        className="text-xs tracking-widest font-mono px-5 py-2 text-cyan-400 transition-all duration-150"
        style={{
          border: "1px solid rgba(0,212,255,0.35)",
          borderRadius: "1px",
          background: loading
            ? "rgba(0,212,255,0.02)"
            : "rgba(0,212,255,0.07)",
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "CALCULATING..." : "RUN SIMULATION"}
      </button>

      {/* ── Error output ──────────────────────────────────────────────────── */}
      {error && (
        <p
          className="mt-3 text-xs font-mono"
          style={{ color: "rgba(239,68,68,0.8)" }}
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
              background: "var(--color-surface-1)",
              border: "1px solid rgba(0,212,255,0.1)",
            }}
          >
            <span className="text-xs font-mono tracking-wider text-zinc-400">
              {result.substance.toUpperCase()} — {result.dosage_mg}mg
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-600">
                t½ base:{" "}
                <span className="text-cyan-400">{result.half_life_hours}h</span>
              </span>
              <span className="text-xs font-mono text-zinc-600">
                t½ eff:{" "}
                <span className="text-cyan-400">
                  {result.effective_half_life_hours}h
                </span>
              </span>
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
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
              <XAxis
                dataKey="time_hours"
                tick={{ fill: "#3f3f46", fontSize: 10, fontFamily: "monospace" }}
                tickFormatter={(v: number) => `${v}h`}
                axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#3f3f46", fontSize: 10, fontFamily: "monospace" }}
                axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
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
                stroke="#00d4ff"
                strokeWidth={1.5}
                dot={{ fill: "#00d4ff", r: 3, strokeWidth: 0 }}
                activeDot={{
                  r: 5,
                  fill: "#00d4ff",
                  stroke: "rgba(0,212,255,0.35)",
                  strokeWidth: 4,
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Data table strip */}
          <div
            className="mt-2 overflow-x-auto"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <table className="w-full text-xs font-mono">
              <thead>
                <tr>
                  {result.data_points.map((pt) => (
                    <th
                      key={pt.time_hours}
                      className="px-2 py-1.5 text-center font-normal"
                      style={{ color: "#3f3f46", whiteSpace: "nowrap" }}
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
                      style={{ color: "#00d4ff" }}
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
