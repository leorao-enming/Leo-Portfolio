"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Phase = "hidden" | "entering" | "visible" | "leaving";

function QrGrid() {
  const pattern = [
    [1,1,1,0,1,0,1,1,1],
    [1,0,1,0,0,0,1,0,1],
    [1,0,1,1,0,1,1,0,1],
    [0,0,0,1,1,0,0,0,0],
    [1,0,1,1,0,1,1,0,1],
    [0,0,0,0,1,0,0,0,0],
    [1,1,1,0,1,0,1,1,1],
    [0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,0,1,0],
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 6px)", gap: "1px" }}>
      {pattern.flat().map((cell, i) => (
        <div key={i} style={{ width: 6, height: 6, background: cell ? "#111" : "#f0f0f0" }} />
      ))}
    </div>
  );
}

function CardFront() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#f8f8f6",
        boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      {/* Green header stripe */}
      <div
        style={{
          background: "linear-gradient(135deg, #002200 0%, #003a00 50%, #00ff41 200%)",
          padding: "14px 16px 10px",
          borderBottom: "2px solid #00ff41",
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(0,255,65,0.6)", marginBottom: 2 }}>
          LEOLOGIC SYSTEM OS
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.15em", color: "#00ff41", fontFamily: "monospace" }}>
          EMPLOYEE ID
        </div>
      </div>

      {/* Badge hole */}
      <div
        style={{
          position: "absolute",
          top: -1,
          left: "50%",
          transform: "translateX(-50%)",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#d4d4c8",
          border: "2px solid #b0b09a",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
          zIndex: 2,
        }}
      />

      {/* Body */}
      <div style={{ padding: "16px 16px 14px" }}>
        {/* Avatar */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
          <div
            style={{
              width: 58,
              height: 68,
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
              border: "2px solid #e0e0d8",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 24,
              color: "#00ff41",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            L
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111", letterSpacing: "0.03em", lineHeight: 1.2 }}>
              LEO RAO
            </div>
            <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.12em", marginTop: 3, textTransform: "uppercase" }}>
              Systems Engineer
            </div>
            <div style={{ fontSize: 9, color: "#777", letterSpacing: "0.08em", marginTop: 2 }}>
              Quant · ChemEng
            </div>
            <div
              style={{
                marginTop: 6,
                display: "inline-block",
                background: "rgba(0,255,65,0.12)",
                border: "1px solid rgba(0,180,40,0.3)",
                borderRadius: 2,
                padding: "2px 5px",
                fontSize: 8,
                color: "#006620",
                letterSpacing: "0.2em",
                fontFamily: "monospace",
              }}
            >
              ACTIVE
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div
          style={{
            borderTop: "1px solid #e8e8e0",
            paddingTop: 10,
            marginBottom: 10,
          }}
        >
          {[
            ["INSTITUTION", "University of Toronto"],
            ["PROGRAM", "Chemical Engineering"],
            ["YEAR", "3rd Year · Candidate"],
            ["CERT", "Six Sigma Black Belt"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 6, marginBottom: 5 }}>
              <span style={{ fontSize: 7, letterSpacing: "0.2em", color: "#999", width: 58, flexShrink: 0, paddingTop: 1, fontFamily: "monospace" }}>
                {k}
              </span>
              <span style={{ fontSize: 8, color: "#333", fontWeight: 500, lineHeight: 1.4 }}>{v}</span>
            </div>
          ))}
        </div>

        {/* ID + barcode */}
        <div style={{ borderTop: "1px solid #e8e8e0", paddingTop: 10 }}>
          <div style={{ fontSize: 8, letterSpacing: "0.2em", color: "#aaa", fontFamily: "monospace", marginBottom: 5 }}>
            ID: LL-2004-0723
          </div>
          <div style={{ display: "flex", gap: 1.5 }}>
            {Array.from({ length: 28 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: [1.5, 3, 1.5, 2, 1.5, 3, 2, 1.5][i % 8],
                  height: 20,
                  background: "#222",
                  borderRadius: 0.5,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: "#111",
          padding: "6px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 7, letterSpacing: "0.3em", color: "#00ff41", fontFamily: "monospace" }}>
          ACCESS: SYS · QUANT · BIO
        </span>
        <span style={{ fontSize: 7, color: "#444", fontFamily: "monospace" }}>FLIP →</span>
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#0d0d0d",
        boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.4)",
        border: "1px solid rgba(0,255,65,0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 20px 20px",
        gap: 14,
      }}
    >
      <div style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(0,255,65,0.5)", fontFamily: "monospace" }}>
        LEOLOGIC OS
      </div>

      <QrGrid />

      <div style={{ width: "100%", borderTop: "1px solid rgba(0,255,65,0.1)", paddingTop: 12 }}>
        {[
          ["CLEARANCE", "LEVEL 5"],
          ["ZONES", "ALL SYSTEMS"],
          ["EXPIRES", "NEVER"],
          ["ISSUED", "2024-09-01"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 7, letterSpacing: "0.2em", color: "#555", fontFamily: "monospace" }}>{k}</span>
            <span style={{ fontSize: 8, color: "#00ff41", fontFamily: "monospace" }}>{v}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "auto",
          fontSize: 7,
          letterSpacing: "0.25em",
          color: "#333",
          fontFamily: "monospace",
          textAlign: "center",
        }}
      >
        NOT TRANSFERABLE — VOID IF ALTERED
      </div>
    </div>
  );
}

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
      const t = setTimeout(() => setPhase("visible"), 750);
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
      }, 380);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Pendulum physics while visible
  useEffect(() => {
    if (phase !== "visible") {
      cancelAnimationFrame(animRef.current);
      return;
    }
    velRef.current = 3;

    const tick = () => {
      if (!isDragging.current) {
        velRef.current += (-angleRef.current * 0.08) - (velRef.current * 0.1);
        angleRef.current += velRef.current;
        if (Math.abs(angleRef.current) < 0.01 && Math.abs(velRef.current) < 0.01) {
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

  // Scroll auto-close
  useEffect(() => {
    if (phase !== "visible" && phase !== "entering") return;
    const onScroll = () => { if (window.scrollY > 60) onClose(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase, onClose]);

  // Click outside to close
  useEffect(() => {
    if (phase !== "visible") return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const t = setTimeout(() => window.addEventListener("click", onClick), 150);
    return () => { clearTimeout(t); window.removeEventListener("click", onClick); };
  }, [phase, onClose]);

  // Drag to swing
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastXRef.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastXRef.current;
    velRef.current = dx * 0.4;
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
        left: 0,
        right: 0,
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Rope */}
      <div
        style={{
          width: 2,
          height: 120,
          background: "linear-gradient(to bottom, #2a2a1e, #5a5a40, #3a3a28)",
          transformOrigin: "top center",
          transform: `rotate(${angle * 0.3}deg)`,
          animation: isEntering ? "rope-extend 0.5s ease-out forwards" : undefined,
          opacity: isLeaving ? 0 : 1,
          transition: isLeaving ? "opacity 0.3s ease" : undefined,
          flexShrink: 0,
          boxShadow: "1px 0 3px rgba(0,0,0,0.5)",
        }}
      />

      {/* Card container */}
      <div
        ref={containerRef}
        style={{
          transformOrigin: "top center",
          transform: `rotate(${angle}deg)`,
          animation: isEntering
            ? "card-drop 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
            : isLeaving
            ? "card-leave 0.38s cubic-bezier(0.4, 0, 0.8, 0.2) forwards"
            : undefined,
          pointerEvents: "auto",
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          style={{
            width: 220,
            height: 340,
            position: "relative",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onClick={() => setFlipped(f => !f)}
        >
          <CardFront />
          <CardBack />
        </div>
      </div>
    </div>
  );
}
