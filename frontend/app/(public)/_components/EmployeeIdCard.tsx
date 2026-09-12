"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface Props {
  open: boolean;
  onClose: () => void;
}

/* card resting positions */
const OPEN_Y  =  20;   /* visible: 20px below top of viewport */
const CLOSE_Y = -580;  /* fully hidden above viewport          */

/* ─── Security pattern SVG (guilloché-style micro lines) ─────────── */
const SECURITY_BG = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%233a2a14' stroke-width='0.4' opacity='0.18'%3E%3Ccircle cx='20' cy='20' r='18'/%3E%3Ccircle cx='20' cy='20' r='13'/%3E%3Ccircle cx='20' cy='20' r='8'/%3E%3Cline x1='0' y1='20' x2='40' y2='20'/%3E%3Cline x1='20' y1='0' x2='20' y2='40'/%3E%3C/g%3E%3C/svg%3E")`;

/* ─── Holographic shimmer overlay ────────────────────────────────── */
const HOLO_GRADIENT =
  "linear-gradient(105deg, transparent 20%, rgba(0,255,100,0.06) 30%, rgba(0,200,255,0.08) 40%, rgba(180,0,255,0.05) 50%, transparent 60%)";

/* ─── PVC grain — feTurbulence noise, at a low enough opacity to read
   as material texture rather than visible static. ────────────────── */
const PVC_GRAIN =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ─── Micro scratches — a handful of hand-placed, faintly-angled hairlines,
   not a repeating pattern. Real handling wear doesn't repeat on a grid. ── */
const MICRO_SCRATCHES = (
  <svg
    aria-hidden
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 252 400"
    preserveAspectRatio="none"
  >
    <g stroke="#fff" strokeLinecap="round" fill="none">
      <line x1="18" y1="42" x2="86" y2="35" strokeWidth="0.5" opacity="0.10" />
      <line x1="140" y1="110" x2="210" y2="122" strokeWidth="0.4" opacity="0.08" />
      <line x1="30" y1="230" x2="70" y2="245" strokeWidth="0.5" opacity="0.09" />
      <line x1="170" y1="300" x2="150" y2="340" strokeWidth="0.4" opacity="0.07" />
      <line x1="60" y1="360" x2="130" y2="352" strokeWidth="0.5" opacity="0.08" />
      <line x1="200" y1="60" x2="222" y2="95" strokeWidth="0.35" opacity="0.06" />
    </g>
  </svg>
);

/* Max tilt in degrees — the brief explicitly rules out large exaggerated
   3D motion, so this stays small enough to read as "glossy surface"
   rather than a gimmick. */
const MAX_TILT = 4;

/* ─── Specular sheen ─────────────────────────────────────────────────
   Defaults to a fixed upper-left highlight — a believable "studio light"
   position — so a mobile visitor who never fires a mousemove event still
   sees a static highlight rather than nothing. On desktop, the mousemove
   handler on the tilt wrapper overwrites --sheen-x/--sheen-y so it tracks
   the cursor instead. One component, shared by both faces via CSS custom
   property inheritance — no ref plumbing into each face needed. */
function Sheen() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle 200px at var(--sheen-x, 28%) var(--sheen-y, 18%), rgba(255,255,255,0.28), transparent 60%)",
        mixBlendMode: "overlay",
        pointerEvents: "none",
        /* Kept below the zIndex:2 text layer on both faces on purpose — a
           white overlay-blend layer measurably washes out dark text under
           its hotspot, and this card's contrast has already needed fixing
           three times this session. A physically-accurate glint sitting on
           top of the lettering isn't worth risking that again. */
        zIndex: 1,
      }}
    />
  );
}

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
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2a3d2a 0%, #1e2e1e 100%)",
            marginBottom: 2,
          }}
        />
        <div
          style={{
            width: 52,
            height: 36,
            borderRadius: "50% 50% 0 0",
            background: "linear-gradient(135deg, #1e2e1e 0%, #152215 100%)",
          }}
        />
      </div>
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
            color: "rgba(255,122,24,0.4)",
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
      {/* PVC grain — a physical card is never perfectly flat plastic. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: PVC_GRAIN,
          opacity: 0.05,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {MICRO_SCRATCHES}
      {/* Holographic strip — narrowed to a band near the right edge, closer
          to how a real security-foil strip sits on a badge, and its
          position ties to --sheen-x so it shifts slightly with the same
          cursor tracking as the specular highlight, the way real foil
          shifts color with viewing angle. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: HOLO_GRADIENT,
          backgroundSize: "160% 100%",
          backgroundPosition: "var(--sheen-x, 28%) 0",
          pointerEvents: "none",
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      />
      <Sheen />

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
            background: "linear-gradient(135deg, #1a1206 0%, #3a2410 50%, #52320f 100%)",
            padding: "14px 16px 12px",
            borderBottom: "2px solid rgba(255,122,24,0.5)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "repeating-linear-gradient(0deg, rgba(255,122,24,0.04) 0px, rgba(255,122,24,0.04) 1px, transparent 1px, transparent 3px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div>
              <div style={{ fontSize: 8, letterSpacing: "0.38em", color: "rgba(255,122,24,0.55)", marginBottom: 3, fontFamily: "monospace" }}>
                LEOLOGIC SYSTEMS
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", color: "#ff7a18", fontFamily: "monospace", lineHeight: 1 }}>
                EMPLOYEE
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", color: "#ff7a18", fontFamily: "monospace", lineHeight: 1 }}>
                CREDENTIAL
              </div>
            </div>
            {/* Embossed — a light rim top-left, a dark one bottom-right, on
                both the badge and the lettering, is the standard raised-relief
                trick: it reads as pressed into the card rather than printed
                flat on it. */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,122,24,0.35)",
                background: "rgba(255,122,24,0.08)",
                boxShadow:
                  "inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 1.5px rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "rgba(255,122,24,0.7)",
                fontFamily: "monospace",
                textShadow: "0 1px 0 rgba(255,255,255,0.12), 0 -1px 0 rgba(0,0,0,0.35)",
                flexShrink: 0,
              }}
            >
              LL
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "14px 16px 0", flex: 1 }}>
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
              {/* Sits on the card's near-white face, so this needs dark ink —
                  the previous #777 measured 4.07:1, just under AA. */}
              <div style={{ fontSize: 10, color: "#5f5f5f", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "monospace" }}>
                Process Engineering · ChemEng
              </div>
              <Chip />
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

          <div
            style={{
              height: 1,
              background: "linear-gradient(to right, rgba(0,100,30,0.2), rgba(0,100,30,0.1), transparent)",
              marginBottom: 10,
            }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 8px", marginBottom: 10 }}>
            {[
              ["INSTITUTION", "University of Toronto"],
              ["PROGRAM", "Chemical Engineering"],
              ["YEAR", "3rd Year · 3T7"],
              ["CERT", "Six Sigma Black Belt"],
            ].map(([k, v]) => (
              <div key={k}>
                {/* #aaa/#8a8a90 measured 2.1:1 / 3.1:1 on this near-white
                    face — the same fix already applied two fields up. */}
                <div style={{ fontSize: 6.5, letterSpacing: "0.22em", color: "#6b6b6b", fontFamily: "monospace", marginBottom: 1.5, textTransform: "uppercase" }}>
                  {k}
                </div>
                <div style={{ fontSize: 8, color: "#5a5a60", fontWeight: 600, lineHeight: 1.3, fontFamily: "system-ui, sans-serif" }}>
                  {v}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              height: 1,
              background: "linear-gradient(to right, rgba(0,0,0,0.08), transparent)",
              marginBottom: 10,
            }}
          />

          <div>
            <div style={{ fontSize: 7, letterSpacing: "0.18em", color: "#5a5a60", fontFamily: "monospace", marginBottom: 5 }}>
              ID: LL-2004-ENG-0723
            </div>
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
            {/* Simulated barcode serial — decorative microprint, like the real
                thing it imitates. Carries no information a reader needs. */}
            <div aria-hidden style={{ fontSize: 6.5, letterSpacing: "0.35em", color: "#ccc", fontFamily: "monospace", marginTop: 2 }}>
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
            borderTop: "1px solid rgba(255,122,24,0.15)",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {["SYS", "QUANT", "BIO", "R&D"].map((zone, i) => (
              <span
                key={zone}
                style={{
                  fontSize: 6.5,
                  letterSpacing: "0.18em",
                  color: i === 0 ? "#ff7a18" : "rgba(255,122,24,0.45)",
                  fontFamily: "monospace",
                  fontWeight: i === 0 ? 700 : 400,
                }}
              >
                {zone}
              </span>
            ))}
          </div>
          {/* A real affordance, not chrome — it has to be readable. */}
          <span style={{ fontSize: 9, letterSpacing: "0.08em", color: "rgba(255,255,255,0.75)", fontFamily: "monospace" }}>CLICK TO FLIP</span>
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
      {/* PVC grain, scratches, and the specular sheen — same three material
          layers as the front face, kept below the zIndex:2 content wrapper
          below for the same reason: nothing here should risk washing out
          already AA-fixed text. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: PVC_GRAIN,
          opacity: 0.05,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {MICRO_SCRATCHES}
      <Sheen />

      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>
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
            color: "#6b6b6b",
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            zIndex: 1,
          }}
        >
          AUTHORIZED SIGNATURE
        </span>
      </div>

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
        <div style={{ fontSize: 10, letterSpacing: "0.28em", color: "rgba(255,122,24,0.85)", fontFamily: "monospace", textTransform: "uppercase" }}>
          LeoLogic · Access Control
        </div>

        <QrCode />

        <div style={{ width: "100%", borderTop: "1px solid rgba(255,122,24,0.08)", paddingTop: 10 }}>
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
              {/* #444 measured ~2:1 against this near-black face — dark
                  grey on near-black, not the light grey it needed. */}
              <span style={{ fontSize: 7, letterSpacing: "0.2em", color: "#8a8a90", fontFamily: "monospace" }}>{k}</span>
              <span style={{ fontSize: 8, color: "#ff7a18", fontFamily: "monospace", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Simulated machine-readable zone. Pure decoration — it imitates the
            microprint on a physical badge, and reads as gibberish aloud. */}
        <div
          aria-hidden
          style={{
            width: "100%",
            background: "rgba(255,122,24,0.03)",
            border: "1px solid rgba(255,122,24,0.07)",
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

      <div
        style={{
          padding: "6px 16px 8px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,122,24,0.06)",
        }}
      >
        {/* Decorative security-strip text, as on a real badge. */}
        <div aria-hidden style={{ fontSize: 6.5, letterSpacing: "0.22em", color: "#333", fontFamily: "monospace" }}>
          NOT TRANSFERABLE · VOID IF ALTERED · PROPERTY OF LEOLOGIC
        </div>
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
  const [flipped, setFlipped] = useState(false);
  const reduced = useReducedMotion();

  /* DOM refs for direct transform updates (no re-render per frame) */
  const wrapperRef = useRef<HTMLDivElement>(null); /* translateY */
  const ropeRef    = useRef<HTMLDivElement>(null); /* rope X rotation */
  const bodyRef    = useRef<HTMLDivElement>(null); /* card+clip X rotation */
  const tiltRef    = useRef<HTMLDivElement>(null); /* cursor tilt + sheen, independent of the swing above */

  /* Physics state (all refs — never trigger renders) */
  const yRef     = useRef(CLOSE_Y);
  const velYRef  = useRef(0);
  const angleRef = useRef(0);
  const velXRef  = useRef(0);

  /* Drag tracking */
  const isDragging   = useRef(false);
  const dragStartY   = useRef(0);
  const dragStartPY  = useRef(0);
  const lastCY       = useRef(0);
  const lastCX       = useRef(0);

  /* Keep latest open value accessible inside RAF without re-creating effect */
  const openRef = useRef(open);
  useEffect(() => { openRef.current = open; }, [open]);

  /* The RAF loop writes transforms directly, so the global
     prefers-reduced-motion CSS override cannot reach it — it has to be
     honoured here explicitly. */
  const reducedRef = useRef(reduced);
  useEffect(() => { reducedRef.current = reduced; }, [reduced]);

  /* Kick impulse when opening so card "drops" with momentum */
  useEffect(() => {
    if (open && !reduced) {
      velYRef.current = 22;
      velXRef.current = 3;
    }
  }, [open, reduced]);

  /* Escape → close */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* Pointer events only active when open */
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.style.pointerEvents = open ? "auto" : "none";
    }
  }, [open]);

  /* Main physics RAF — runs for lifetime of component */
  useEffect(() => {
    let raf: number;

    const tick = () => {
      const targetY = openRef.current ? OPEN_Y : CLOSE_Y;

      if (reducedRef.current) {
        /* Park at the target with no spring, swing, or momentum. */
        yRef.current = targetY;
        velYRef.current = 0;
        angleRef.current = 0;
        velXRef.current = 0;
      } else if (!isDragging.current) {
        /* Y spring toward target */
        const dy = targetY - yRef.current;
        velYRef.current = velYRef.current * 0.78 + dy * 0.10;
        yRef.current   += velYRef.current;

        /* X pendulum damping */
        velXRef.current  += (-angleRef.current * 0.07) - (velXRef.current * 0.09);
        angleRef.current += velXRef.current;
        if (Math.abs(angleRef.current) < 0.01 && Math.abs(velXRef.current) < 0.01) {
          angleRef.current = 0;
          velXRef.current  = 0;
        }
      }

      /* Apply directly to DOM — zero React overhead */
      if (wrapperRef.current)
        wrapperRef.current.style.transform = `translateY(${yRef.current}px)`;
      if (ropeRef.current)
        ropeRef.current.style.transform = `rotate(${angleRef.current * 0.28}deg)`;
      if (bodyRef.current)
        bodyRef.current.style.transform = `rotate(${angleRef.current}deg)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Scroll → close */
  useEffect(() => {
    if (!open) return;
    const onScroll = () => { if (window.scrollY > 80) onClose(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, onClose]);

  /* Click outside → close */
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (bodyRef.current && !bodyRef.current.contains(e.target as Node)) onClose();
    };
    const t = setTimeout(() => window.addEventListener("click", onClick), 200);
    return () => { clearTimeout(t); window.removeEventListener("click", onClick); };
  }, [open, onClose]);

  /* ── Drag handlers ─────────────────────────────────────────────────
     isDragging only flips to true once the pointer has actually moved
     past a small threshold, not on every pointerdown. Capturing the
     pointer immediately on pointerdown (the previous behaviour) retargets
     the click event that follows to the capturing element, per the
     Pointer Events spec's compatibility-mouse-event rules — so a plain
     click on the flip button never reached the button at all, only
     Tab+Enter (keyboard activation bypasses pointer capture entirely)
     did. Deferring capture until real movement is detected fixes that
     while keeping the drag-to-swing gesture working. */
  const DRAG_THRESHOLD = 6; // px
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const pointerIdRef  = useRef<number | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current    = false;
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
    pointerIdRef.current  = e.pointerId;
    dragStartY.current  = e.clientY;
    dragStartPY.current = yRef.current;
    lastCY.current      = e.clientY;
    lastCX.current      = e.clientX;
    e.preventDefault();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) {
      const dx0 = e.clientX - pointerStartX.current;
      const dy0 = e.clientY - pointerStartY.current;
      if (Math.hypot(dx0, dy0) < DRAG_THRESHOLD) return;
      isDragging.current = true;
      if (pointerIdRef.current !== null) {
        (e.currentTarget as HTMLElement).setPointerCapture(pointerIdRef.current);
      }
      if (bodyRef.current) bodyRef.current.style.cursor = "grabbing";
    }

    const dy = e.clientY - dragStartY.current;
    const dx = e.clientX - lastCX.current;

    /* Y: allow full drag, clamp so card can't fly too far above OPEN_Y */
    const newY = dragStartPY.current + dy;
    yRef.current   = Math.max(newY, OPEN_Y - 50);
    velYRef.current = (e.clientY - lastCY.current) * 0.6;

    /* X swing from horizontal drag */
    velXRef.current   = dx * 0.45;
    angleRef.current += velXRef.current;

    lastCY.current = e.clientY;
    lastCX.current = e.clientX;
  };

  const onPointerUp = () => {
    /* isDragging.current is intentionally left as-is here rather than
       reset — the button's onClick, which fires right after this, reads
       it to tell a real drag apart from a plain click and clears it. */
    if (bodyRef.current) bodyRef.current.style.cursor = "grab";
  };

  /* ── Cursor tilt + specular sheen ──────────────────────────────────
     Mouse-only (not pointer events) and desktop-only by nature — this is a
     cosmetic glossy-surface cue, not information, so there's no meaningful
     touch equivalent to build; a static default sheen position already
     covers the mobile case (see Sheen's fallback values). Applied to
     tiltRef, a dedicated inner element, so it never touches the flip
     transform (on the button) or the swing transform (on bodyRef) —
     three independent transforms on three different elements, composed
     visually rather than fighting over one style property. A CSS
     transition on tiltRef (set below, disabled under reduced motion)
     handles the settle, so this only ever writes the target values. */
  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || isDragging.current || !tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    const rotY = (relX - 0.5) * MAX_TILT * 2;
    const rotX = (0.5 - relY) * MAX_TILT * 2;
    tiltRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    tiltRef.current.style.setProperty("--sheen-x", `${relX * 100}%`);
    tiltRef.current.style.setProperty("--sheen-y", `${relY * 100}%`);
  };

  const onCardMouseLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    tiltRef.current.style.removeProperty("--sheen-x");
    tiltRef.current.style.removeProperty("--sheen-y");
  };

  return (
    <div
      ref={wrapperRef}
      /* Parked off-screen when closed — keep it out of the a11y tree and the
         tab order entirely rather than exposing a card nobody can see. */
      aria-hidden={!open}
      inert={!open}
      style={{
        position: "fixed",
        top: 0,
        right: "clamp(60px, 10vw, 180px)",
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        willChange: "transform",
        /* initial value prevents flicker before RAF starts */
        transform: `translateY(${CLOSE_Y}px)`,
      }}
    >
      {/* Lanyard rope */}
      <div
        ref={ropeRef}
        style={{
          width: 3,
          height: 110,
          background: "linear-gradient(180deg, #1a1a14 0%, #3a3828 30%, #4a4838 70%, #3a3828 100%)",
          transformOrigin: "top center",
          flexShrink: 0,
          boxShadow: "2px 0 6px rgba(0,0,0,0.5), -1px 0 3px rgba(0,0,0,0.3)",
          borderRadius: "0 0 2px 2px",
        }}
      />

      {/* Clip + card — draggable */}
      <div
        ref={bodyRef}
        style={{
          transformOrigin: "top center",
          pointerEvents: "none", /* updated via effect when open changes */
          cursor: "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <LanyardClip />

        {/* A button, not a div: the flip has to be reachable and operable by
            keyboard, and Enter/Space come free with the right element. */}
        <button
          type="button"
          aria-pressed={flipped}
          aria-label={flipped ? "Show front of ID card" : "Show back of ID card"}
          style={{
            width: 252,
            height: 400,
            position: "relative",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: reduced ? "none" : "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "inherit",
            font: "inherit",
            color: "inherit",
            textAlign: "inherit",
          }}
          onClick={() => {
            if (isDragging.current) { isDragging.current = false; return; }
            setFlipped((f) => !f);
          }}
        >
          {/* Tilt + sheen live here, one level in from the flip — this way
              the two 3D transforms (flip on the button, tilt on this div)
              never overwrite each other's `transform` property. */}
          <div
            ref={tiltRef}
            onMouseMove={onCardMouseMove}
            onMouseLeave={onCardMouseLeave}
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transition: reduced ? "none" : "transform 0.15s ease-out",
              willChange: "transform",
            }}
          >
            <CardFront />
            <CardBack />
          </div>
        </button>
      </div>
    </div>
  );
}
