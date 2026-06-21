"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Phase = "hidden" | "entering" | "visible" | "leaving";

/* ─── Security pattern SVG (guilloché-style micro lines) ─────────── */
const SECURITY_BG = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23003a1a' stroke-width='0.4' opacity='0.18'%3E%3Ccircle cx='20' cy='20' r='18'/%3E%3Ccircle cx='20' cy='20' r='13'/%3E%3Ccircle cx='20' cy='20' r='8'/%3E%3Cline x1='0' y1='20' x2='40' y2='20'/%3E%3Cline x1='20' y1='0' x2='20' y2='40'/%3E%3C/g%3E%3C/svg%3E")`;

/* ─── Holographic shimmer overlay ────────────────────────────────── */
const HOLO_GRADIENT =
  "linear-gradient(105deg, transparent 20%, rgba(0,255,100,0.06) 30%, rgba(0,200,255,0.08) 40%, rgba(180,0,255,0.05) 50%, transparent 60%)";

/* ─── Chip SVG (EMV-style) ───────────────────────────────────────── */
function Chip() {
  return (
    <div
      style={{
        width: 32,
        height: 24,
        borderRadius: 4,
        background: "linear-gradient(135deg, #c8a84b 0%, #e8c96a 30%, #b8943a 60%, #d4ac50 100%)",
        border: "1px solid #a07830",
        position: "relative",
        boxShadow: "0 1px 3px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
        flexShrink: 0,
      }}
    >
      {/* Chip contact pads */}
      {[
        { top: 3, left: 3 }, { top: 3, left: 11 }, { top: 3, right: 3 },
        { top: 10, left: 3 }, { top: 10, right: 3 },
        { bottom: 3, left: 3 }, { bottom: 3, left: 11 }, { bottom: 3, right: 3 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 6,
            height: 5,
            borderRadius: 1,
            background: "linear-gradient(135deg, #9a7228 0%, #c8a040 100%)",
            border: "0.5px solid #806020",
            ...pos,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Photo placeholder ──────────────────────────────────────────── */
function PhotoPlaceholder() {
  return (
    <div
      style={{
        width: 72,
        height: 90,
        background: "linear-gradient(160deg, #1a2a1a 0%, #0d180d 100%)",
        border: "1.5px solid #d0cfc0",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* Silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 58,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Head circle */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2a3d2a 0%, #1e2e1e 100%)",
            marginBottom: 2,
          }}
        />
        {/* Shoulders */}
        <div
          style={{
            width: 52,
            height: 36,
            borderRadius: "50% 50% 0 0",
            background: "linear-gradient(135deg, #1e2e1e 0%, #152215 100%)",
          }}
        />
      </div>
      {/* "LR" monogram overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 20,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "rgba(0,255,65,0.4)",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          LR
        </span>
      </div>
    </div>
  );
}

/* ─── QR Code grid ───────────────────────────────────────────────── */
function QrCode() {
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,0],
    [0,1,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1],
    [1,0,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,0],
    [0,1,0,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1],
    [1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,0],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,0,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,1,1,1,1,1,1],
  ];
  const size = 5;
  return (
    <div
      style={{
        display: "inline-block",
        padding: 8,
        background: "#fff",
        borderRadius: 4,
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(21, ${size}px)`,
          gap: 0,
        }}
      >
        {pattern.flat().map((cell, i) => (
          <div
            key={i}
            style={{
              width: size,
              height: size,
              background: cell ? "#0d0d0d" : "#ffffff",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── CARD FRONT ─────────────────────────────────────────────────── */
function CardFront() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        borderRadius: 14,
        overflow: "hidden",
        background: "#f5f4ef",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.75), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {/* Security guilloché background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: SECURITY_BG,
          backgroundSize: "40px 40px",
          opacity: 0.7,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Holographic sheen */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: HOLO_GRADIENT,
          pointerEvents: "none",
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>

        {/* Badge clip hole */}
        <div
          style={{
            position: "absolute",
            top: -1,
            left: "50%",
            transform: "translateX(-50%)",
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #c8c0a8 0%, #a8a090 100%)",
            border: "2px solid #887860",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(255,255,255,0.3)",
            zIndex: 10,
          }}
        />

        {/* Header band */}
        <div
          style={{
            background: "linear-gradient(135deg, #001800 0%, #003020 50%, #004830 100%)",
            padding: "14px 16px 12px",
            borderBottom: "2px solid rgba(0,255,65,0.5)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Header security micro-lines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0,255,65,0.04) 0px, rgba(0,255,65,0.04) 1px, transparent 1px, transparent 3px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div>
              <div style={{ fontSize: 8, letterSpacing: "0.38em", color: "rgba(0,255,65,0.55)", marginBottom: 3, fontFamily: "monospace" }}>
                LEOLOGIC SYSTEMS
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", color: "#00ff41", fontFamily: "monospace", lineHeight: 1 }}>
                EMPLOYEE
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", color: "#00ff41", fontFamily: "monospace", lineHeight: 1 }}>
                CREDENTIAL
              </div>
            </div>
            {/* Mini logo mark */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1.5px solid rgba(0,255,65,0.35)",
                background: "rgba(0,255,65,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "rgba(0,255,65,0.7)",
                fontFamily: "monospace",
                flexShrink: 0,
              }}
            >
              LL
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "14px 16px 0", flex: 1 }}>

          {/* Photo + identity row */}
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <PhotoPlaceholder />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#111",
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                  marginBottom: 3,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                LEO RAO
              </div>
              <div
                style={{
                  fontSize: 8.5,
                  color: "#444",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 2,
                  fontFamily: "monospace",
                }}
              >
                Systems Engineer
              </div>
              <div style={{ fontSize: 8, color: "#777", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "monospace" }}>
                Quant Research · ChemEng
              </div>

              {/* Chip */}
              <Chip />

              {/* Status pill */}
              <div
                style={{
                  marginTop: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: "rgba(0,180,40,0.1)",
                  border: "1px solid rgba(0,180,40,0.28)",
                  borderRadius: 3,
                  padding: "2px 7px",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#00b428",
                    boxShadow: "0 0 6px rgba(0,180,40,0.8)",
                    animation: "pulse-green 2s ease-in-out infinite",
                  }}
                />
                <span style={{ fontSize: 7.5, color: "#006620", letterSpacing: "0.22em", fontFamily: "monospace", fontWeight: 700 }}>
                  AUTHORIZED
                </span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div
            style={{
              height: 1,
              background: "linear-gradient(to right, rgba(0,100,30,0.2), rgba(0,100,30,0.1), transparent)",
              marginBottom: 10,
            }}
          />

          {/* Fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 8px", marginBottom: 10 }}>
            {[
              ["INSTITUTION", "University of Toronto"],
              ["PROGRAM", "Chemical Engineering"],
              ["YEAR", "3rd Year · 3T7"],
              ["CERT", "Six Sigma Black Belt"],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 6.5, letterSpacing: "0.22em", color: "#aaa", fontFamily: "monospace", marginBottom: 1.5, textTransform: "uppercase" }}>
                  {k}
                </div>
                <div style={{ fontSize: 8, color: "#222", fontWeight: 600, lineHeight: 1.3, fontFamily: "system-ui, sans-serif" }}>
                  {v}
                </div>
              </div>
            ))}
          </div>

          {/* Separator */}
          <div
            style={{
              height: 1,
              background: "linear-gradient(to right, rgba(0,0,0,0.08), transparent)",
              marginBottom: 10,
            }}
          />

          {/* Barcode area */}
          <div>
            <div style={{ fontSize: 7, letterSpacing: "0.18em", color: "#bbb", fontFamily: "monospace", marginBottom: 5 }}>
              ID: LL-2004-ENG-0723
            </div>
            {/* Realistic barcode */}
            <div style={{ display: "flex", gap: 0, alignItems: "flex-end", height: 28 }}>
              {[2,1,3,1,2,1,1,3,2,1,2,1,3,1,2,2,1,3,1,2,1,1,3,2,1,2,1,3,1,2,1,2,3,1,2,1,1,3,2,1].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: w * 1.6,
                    height: i % 5 === 0 ? 28 : i % 3 === 0 ? 24 : 22,
                    background: i % 2 === 0 ? "#1a1a1a" : "transparent",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 6.5, letterSpacing: "0.35em", color: "#ccc", fontFamily: "monospace", marginTop: 2 }}>
              0 7 2 3 · 2 0 0 4 · S Y S
            </div>
          </div>
        </div>

        {/* Footer band */}
        <div
          style={{
            background: "linear-gradient(90deg, #001200 0%, #002000 100%)",
            padding: "7px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            borderTop: "1px solid rgba(0,255,65,0.15)",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {["SYS", "QUANT", "BIO", "R&D"].map((zone, i) => (
              <span
                key={zone}
                style={{
                  fontSize: 6.5,
                  letterSpacing: "0.18em",
                  color: i === 0 ? "#00ff41" : "rgba(0,255,65,0.45)",
                  fontFamily: "monospace",
                  fontWeight: i === 0 ? 700 : 400,
                }}
              >
                {zone}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>CLICK TO FLIP</span>
        </div>
      </div>
    </div>
  );
}

/* ─── CARD BACK ──────────────────────────────────────────────────── */
function CardBack() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        borderRadius: 14,
        overflow: "hidden",
        background: "#0f0f0c",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.75), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Magnetic stripe — full width at top */}
      <div
        style={{
          width: "100%",
          height: 44,
          background: "linear-gradient(180deg, #1a1000 0%, #0d0900 40%, #1a1000 100%)",
          borderBottom: "1px solid #2a1a00",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Stripe texture lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(90deg, rgba(255,180,0,0.04) 0px, rgba(255,180,0,0.04) 1px, transparent 1px, transparent 3px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 6,
            letterSpacing: "0.15em",
            color: "rgba(255,160,0,0.2)",
            fontFamily: "monospace",
          }}
        >
          ISO/IEC 7811
        </div>
      </div>

      {/* Signature strip */}
      <div
        style={{
          margin: "10px 16px 0",
          height: 28,
          background: "linear-gradient(90deg, #f8f6f0 0%, #f0ede8 100%)",
          borderRadius: 2,
          border: "1px solid #ddd",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          paddingLeft: 8,
        }}
      >
        {/* Signature strip pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 4px)",
          }}
        />
        <span
          style={{
            fontSize: 8,
            fontFamily: "cursive, serif",
            color: "#334",
            letterSpacing: "0.05em",
            position: "relative",
            zIndex: 1,
            fontStyle: "italic",
          }}
        >
          Leo Rao
        </span>
        <span
          style={{
            position: "absolute",
            right: 6,
            fontSize: 6,
            color: "#aaa",
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            zIndex: 1,
          }}
        >
          AUTHORIZED SIGNATURE
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          flex: 1,
        }}
      >
        <div style={{ fontSize: 7.5, letterSpacing: "0.32em", color: "rgba(0,255,65,0.4)", fontFamily: "monospace", textTransform: "uppercase" }}>
          LeoLogic · Access Control
        </div>

        <QrCode />

        {/* Access fields */}
        <div style={{ width: "100%", borderTop: "1px solid rgba(0,255,65,0.08)", paddingTop: 10 }}>
          {[
            ["CLEARANCE", "LEVEL 5 / ADMIN"],
            ["ZONES", "ALL SYSTEMS"],
            ["ISSUED", "2024-09-01"],
            ["EXPIRES", "NEVER · ∞"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
                padding: "3px 0",
                borderBottom: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              <span style={{ fontSize: 7, letterSpacing: "0.2em", color: "#444", fontFamily: "monospace" }}>{k}</span>
              <span style={{ fontSize: 8, color: "#00ff41", fontFamily: "monospace", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Machine-readable zone */}
        <div
          style={{
            width: "100%",
            background: "rgba(0,255,65,0.03)",
            border: "1px solid rgba(0,255,65,0.07)",
            borderRadius: 3,
            padding: "6px 8px",
          }}
        >
          <div style={{ fontSize: 6.5, letterSpacing: "0.12em", color: "rgba(255,255,255,0.12)", fontFamily: "monospace", lineHeight: 1.6 }}>
            P&lt;LLSRAO&lt;&lt;LEO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          </div>
          <div style={{ fontSize: 6.5, letterSpacing: "0.12em", color: "rgba(255,255,255,0.12)", fontFamily: "monospace", lineHeight: 1.6 }}>
            LL20040723&lt;5ENG9912319M&lt;&lt;&lt;4
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "6px 16px 8px",
          textAlign: "center",
          borderTop: "1px solid rgba(0,255,65,0.06)",
        }}
      >
        <div style={{ fontSize: 6.5, letterSpacing: "0.22em", color: "#333", fontFamily: "monospace" }}>
          NOT TRANSFERABLE · VOID IF ALTERED · PROPERTY OF LEOLOGIC
        </div>
      </div>
    </div>
  );
}

/* ─── LANYARD CLIP ───────────────────────────────────────────────── */
function LanyardClip() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: -1, position: "relative", zIndex: 2 }}>
      <div
        style={{
          width: 18,
          height: 10,
          borderRadius: "0 0 6px 6px",
          background: "linear-gradient(180deg, #888 0%, #666 100%)",
          border: "1px solid #555",
          borderTop: "none",
          boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 6,
            borderRadius: 3,
            background: "linear-gradient(180deg, #aaa 0%, #888 100%)",
            border: "0.5px solid #666",
          }}
        />
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export function EmployeeIdCard({ open, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [flipped, setFlipped] = useState(false);
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const velRef = useRef(0);
  const isDragging = useRef(false);
  const lastXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (open && phase === "hidden") {
      setPhase("entering");
      const t = setTimeout(() => setPhase("visible"), 800);
      return () => clearTimeout(t);
    }
    if (!open && (phase === "entering" || phase === "visible")) {
      setPhase("leaving");
      const t = setTimeout(() => {
        setPhase("hidden");
        setFlipped(false);
        setAngle(0);
        angleRef.current = 0;
        velRef.current = 0;
      }, 420);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* Pendulum physics */
  useEffect(() => {
    if (phase !== "visible") {
      cancelAnimationFrame(animRef.current);
      return;
    }
    velRef.current = 4;
    const tick = () => {
      if (!isDragging.current) {
        velRef.current += (-angleRef.current * 0.07) - (velRef.current * 0.09);
        angleRef.current += velRef.current;
        if (Math.abs(angleRef.current) < 0.008 && Math.abs(velRef.current) < 0.008) {
          angleRef.current = 0;
          velRef.current = 0;
        }
        setAngle(angleRef.current);
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase]);

  /* Scroll close */
  useEffect(() => {
    if (phase !== "visible" && phase !== "entering") return;
    const onScroll = () => { if (window.scrollY > 80) onClose(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase, onClose]);

  /* Click outside close */
  useEffect(() => {
    if (phase !== "visible") return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) onClose();
    };
    const t = setTimeout(() => window.addEventListener("click", onClick), 200);
    return () => { clearTimeout(t); window.removeEventListener("click", onClick); };
  }, [phase, onClose]);

  /* Drag to swing */
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastXRef.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastXRef.current;
    velRef.current = dx * 0.45;
    angleRef.current += velRef.current;
    setAngle(angleRef.current);
    lastXRef.current = e.clientX;
  };
  const onPointerUp = () => { isDragging.current = false; };

  if (phase === "hidden") return null;

  const isEntering = phase === "entering";
  const isLeaving = phase === "leaving";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        /* Drop from right side — near the "Enter OS" button */
        right: "clamp(60px, 10vw, 180px)",
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Lanyard rope */}
      <div
        style={{
          width: 3,
          height: 110,
          background: "linear-gradient(180deg, #1a1a14 0%, #3a3828 30%, #4a4838 70%, #3a3828 100%)",
          transformOrigin: "top center",
          transform: `rotate(${angle * 0.28}deg)`,
          animation: isEntering ? "rope-extend 0.55s cubic-bezier(0.22,1,0.36,1) forwards" : undefined,
          opacity: isLeaving ? 0 : 1,
          transition: isLeaving ? "opacity 0.35s ease" : undefined,
          flexShrink: 0,
          boxShadow: "2px 0 6px rgba(0,0,0,0.5), -1px 0 3px rgba(0,0,0,0.3)",
          borderRadius: "0 0 2px 2px",
        }}
      />

      {/* Lanyard clip + Card */}
      <div
        ref={containerRef}
        style={{
          transformOrigin: "top center",
          transform: `rotate(${angle}deg)`,
          animation: isEntering
            ? "card-drop 0.85s cubic-bezier(0.34, 1.4, 0.64, 1) forwards"
            : isLeaving
            ? "card-leave 0.42s cubic-bezier(0.4, 0, 0.8, 0.2) forwards"
            : undefined,
          pointerEvents: "auto",
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <LanyardClip />

        <div
          style={{
            width: 252,
            height: 400,
            position: "relative",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onClick={() => !isDragging.current && setFlipped(f => !f)}
        >
          <CardFront />
          <CardBack />
        </div>
      </div>
    </div>
  );
}
