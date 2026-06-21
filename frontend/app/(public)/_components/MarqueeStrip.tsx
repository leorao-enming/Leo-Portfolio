"use client";

const ITEMS = [
  "LEOLOGIC", "PRECISION SYSTEMS", "QUANTUM ANALYSIS",
  "AI ENGINEERING", "CHEMICAL PROCESS", "SIX SIGMA",
  "UNIVERSITY OF TORONTO", "2025", "AUTOMATION", "DATA INTELLIGENCE",
];

export function MarqueeStrip({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        overflow: "hidden",
        padding: "14px 0",
        borderTop: "1px solid rgba(255,255,255,0.045)",
        borderBottom: "1px solid rgba(255,255,255,0.045)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 56,
          animation: `${reverse ? "marquee-reverse" : "marquee"} 28s linear infinite`,
          width: "max-content",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 56,
              fontSize: 9,
              letterSpacing: "0.32em",
              color: "rgba(255,255,255,0.16)",
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              fontWeight: 500,
            }}
          >
            {item}
            <span style={{ color: "rgba(0,255,65,0.28)", fontSize: 10 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
