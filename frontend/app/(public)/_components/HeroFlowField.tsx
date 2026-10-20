"use client";

import { useEffect, useState } from "react";

/**
 * The hero's process-flow field: streamlines, the instruments sitting on
 * them, and the flow they measure.
 *
 * The field used to be static lines with six unlabelled dots, which left
 * the right 60% of the first screen reading as unfinished rather than as
 * open. Nothing has been added in place of that space — the field itself
 * now carries the meaning the tagline promises: material moves along the
 * streamlines, and the dots are instruments reading it. The tags are the
 * same loop the P&ID further down draws (FT/LT/TT/PT-101), so the hero
 * and the engineering chapter describe one plant.
 *
 * Readouts drift on a slow random walk around a fixed setpoint. They are
 * illustrative, and the values stay in a plausible band rather than
 * pretending to be live telemetry.
 */

type Stream = {
  d: string;
  stroke: string;
  opacity?: number;
  width?: number;
  /** Streamlines that carry visible flow. */
  flow?: boolean;
};

/* Ink and accent only. Two of these lines used to be violet and blue, the
   only place outside a project chapter that reached for either. */
const INK = "rgba(10,12,15,1)";
const ACC = "var(--color-accent)";

const STREAMS: Stream[] = [
  { d: "M -50,50  C 380,86  660,14  900,70  S 1280,10  1650,60", stroke: INK, opacity: 0.09 },
  { d: "M -50,112 C 420,166 680,58  920,140 S 1310,64  1650,124", stroke: INK, opacity: 0.07 },
  { d: "M -50,178 C 360,206 640,150 900,190 S 1260,148 1650,182", stroke: ACC, opacity: 0.22, width: 1.4, flow: true },
  { d: "M -50,240 C 440,302 700,178 930,268 S 1330,182 1650,254", stroke: INK, opacity: 0.08 },
  { d: "M -50,305 C 390,345 650,265 900,325 S 1290,263 1650,315", stroke: INK, opacity: 0.06 },
  { d: "M -50,368 C 460,438 720,298 940,398 S 1350,300 1650,378", stroke: INK, opacity: 0.08 },
  { d: "M -50,432 C 370,464 630,400 900,440 S 1270,398 1650,428", stroke: INK, opacity: 0.1 },
  { d: "M -50,498 C 450,558 710,438 930,528 S 1340,440 1650,510", stroke: ACC, opacity: 0.26, width: 1.4, flow: true },
  { d: "M -50,562 C 400,604 660,520 900,568 S 1300,518 1650,556", stroke: INK, opacity: 0.07 },
  { d: "M -50,628 C 470,694 730,562 950,656 S 1360,564 1650,634", stroke: INK, opacity: 0.08 },
  { d: "M -50,698 C 380,730 640,668 900,706 S 1280,666 1650,696", stroke: INK, opacity: 0.09 },
  { d: "M -50,762 C 430,818 690,682 920,776 S 1320,684 1650,750", stroke: INK, opacity: 0.06 },
  { d: "M -50,828 C 400,858 650,798 900,832 S 1290,796 1650,824", stroke: ACC, opacity: 0.16, width: 1.4, flow: true },
];

type Instrument = {
  cx: number;
  cy: number;
  tag?: string;
  unit?: string;
  setpoint?: number;
  /** Half-width of the band the reading wanders in. */
  band?: number;
  decimals?: number;
  accent?: boolean;
};

/* Each sits on the inflection of its own streamline (see STREAMS). */
const INSTRUMENTS: Instrument[] = [
  { cx: 900, cy: 70 },
  { cx: 930, cy: 268, tag: "LT-101", unit: "m", setpoint: 2.4, band: 0.06, decimals: 2 },
  { cx: 940, cy: 398, tag: "FT-101", unit: "m³/h", setpoint: 12.6, band: 0.4, decimals: 1 },
  { cx: 930, cy: 528, tag: "TT-101", unit: "°C", setpoint: 78.4, band: 0.6, decimals: 1, accent: true },
  { cx: 950, cy: 656, tag: "PT-101", unit: "bar", setpoint: 1.04, band: 0.03, decimals: 2 },
  { cx: 900, cy: 832, accent: true },
];

const READ_INTERVAL_MS = 1800;
/** Seconds for one particle to traverse a streamline end to end. */
const TRANSIT_S = 28;

function useReadings(reduced: boolean | null): number[] {
  const [values, setValues] = useState(() => INSTRUMENTS.map((i) => i.setpoint ?? 0));

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setValues((prev) =>
        prev.map((v, k) => {
          const inst = INSTRUMENTS[k];
          if (inst.setpoint === undefined || inst.band === undefined) return v;
          /* Mean-reverting step: drift toward the setpoint plus noise, so
             the reading wanders but never walks out of its band. */
          const pull = (inst.setpoint - v) * 0.35;
          const noise = (Math.random() - 0.5) * inst.band * 0.9;
          const next = v + pull + noise;
          return Math.min(inst.setpoint + inst.band, Math.max(inst.setpoint - inst.band, next));
        }),
      );
    }, READ_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  return values;
}

export function FlowField({ reduced }: { reduced: boolean | null }) {
  const readings = useReadings(reduced);

  return (
    /* slice, not none: "none" stretched the 16:9 drawing to whatever the
       viewport was, which on a phone pulled every streamline into a
       near-vertical squiggle. slice keeps the drawing's proportions and
       crops the edges instead. */
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%" }}
    >
      <g fill="none">
        {STREAMS.map((s, i) => (
          <path
            key={i}
            id={s.flow ? `hero-stream-${i}` : undefined}
            d={s.d}
            stroke={s.stroke}
            strokeOpacity={s.opacity}
            strokeWidth={s.width ?? 1.2}
          />
        ))}
      </g>

      {/* Flow. SMIL rather than JS: the browser runs it off the main thread
          budget, and there is nothing to clean up. Not rendered at all
          under reduced motion. */}
      {!reduced && (
        <g>
          {STREAMS.map((s, i) =>
            s.flow
              ? [0, 0.5].map((phase) => (
                  <circle key={`${i}-${phase}`} r="2.6" fill="var(--color-accent)" fillOpacity="0.75">
                    <animateMotion
                      dur={`${TRANSIT_S}s`}
                      begin={`${-(phase + i * 0.17) * TRANSIT_S}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href={`#hero-stream-${i}`} />
                    </animateMotion>
                  </circle>
                ))
              : null,
          )}
        </g>
      )}

      {/* Instruments. */}
      <g>
        {INSTRUMENTS.map((inst, k) => (
          <g key={k}>
            {inst.tag && (
              <circle
                cx={inst.cx}
                cy={inst.cy}
                r="9"
                fill="none"
                stroke={inst.accent ? ACC : INK}
                strokeOpacity={inst.accent ? 0.45 : 0.18}
              />
            )}
            <circle
              cx={inst.cx}
              cy={inst.cy}
              r={inst.tag ? 3 : 2.8}
              fill={inst.accent ? ACC : INK}
              fillOpacity={inst.accent ? 0.6 : 0.3}
            />
          </g>
        ))}
      </g>

      {/* Readouts. Off below md: the cropped phone view puts these right
          under the name, where they would read as part of the headline. */}
      <g className="max-md:hidden" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.2">
        {INSTRUMENTS.map((inst, k) =>
          inst.tag ? (
            <text key={k} x={inst.cx + 18} y={inst.cy + 4}>
              <tspan fill={INK} fillOpacity="0.5">{inst.tag}</tspan>
              <tspan dx="10" fill={inst.accent ? "var(--color-accent-ink)" : INK} fillOpacity={inst.accent ? 1 : 0.78}>
                {readings[k].toFixed(inst.decimals)} {inst.unit}
              </tspan>
            </text>
          ) : null,
        )}
      </g>
    </svg>
  );
}
