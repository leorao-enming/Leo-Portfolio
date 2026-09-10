"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { LAB_ENTRIES, LAB_STATUS_TONE, type LabEntry } from "../../_data/lab";

const ease = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#74d7ff";

function StatusPill({ status }: { status: LabEntry["status"] }) {
  const color = LAB_STATUS_TONE[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        letterSpacing: "0.2em",
        color,
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: color, opacity: status === "QUEUED" ? 0.5 : 1 }} />
      {status}
    </span>
  );
}

export function LabTeaser() {
  const reduced = useReducedMotion();

  return (
    <section
      id="lab"
      className="section-shell"
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
      >
        <div className="bezel-outer">
          <div
            className="bezel-inner"
            style={{
              padding: "clamp(28px, 4vw, 44px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px, 3vw, 28px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: 12,
                    letterSpacing: "0.24em",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-display)",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  Lab — Build Queue
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(26px, 3.6vw, 42px)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.12,
                    color: "var(--color-text-primary)",
                    margin: 0,
                  }}
                >
                  What I&apos;m building next.
                </h2>
              </div>

              <Link
                href="/lab"
                className="group"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 16px",
                  borderRadius: "9999px",
                  border: `1px solid ${ACCENT}33`,
                  background: `${ACCENT}0d`,
                  fontFamily: "var(--font-display)",
                  fontSize: 12,
                  letterSpacing: "0.02em",
                  color: ACCENT,
                  whiteSpace: "nowrap",
                }}
              >
                View build queue
                <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {LAB_ENTRIES.map((entry, i) => (
                <div
                  key={entry.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    padding: "14px 4px",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, minWidth: 0 }}>
                    <span style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      [{entry.id}]
                    </span>
                    <span style={{ fontSize: "clamp(14px, 1.3vw, 16px)", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                      {entry.title}
                    </span>
                  </div>
                  <StatusPill status={entry.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
