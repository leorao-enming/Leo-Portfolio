"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "hero",         label: "IDENTITY",   num: "01" },
  { id: "about",        label: "THE SYSTEM", num: "02" },
  { id: "projects",     label: "WORKS",      num: "03" },
  { id: "capabilities", label: "STACK",      num: "04" },
  { id: "timeline",     label: "CHRONICLE",  num: "05" },
  { id: "contact",      label: "CONNECT",    num: "06" },
];

export function ChapterIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const mid = window.scrollY + window.innerHeight * 0.45;
      let found = 0;
      CHAPTERS.forEach((ch, i) => {
        const el = document.getElementById(ch.id);
        if (el && el.offsetTop <= mid) found = i;
      });
      setActive(found);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const ch = CHAPTERS[active];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: 28,
        zIndex: 200,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div
        style={{
          fontSize: 8.5,
          letterSpacing: "0.32em",
          color: "rgba(255,255,255,0.22)",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          marginBottom: 3,
        }}
      >
        CHAPTER {ch.num} / 06
      </div>
      <div
        style={{
          fontSize: 8.5,
          letterSpacing: "0.32em",
          color: "rgba(255,255,255,0.14)",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        SECTION — {ch.label}
      </div>
      {/* Progress bar */}
      <div style={{ width: 72, height: 1, background: "rgba(255,255,255,0.07)" }}>
        <div
          style={{
            height: 1,
            width: `${((active + 1) / CHAPTERS.length) * 100}%`,
            background: "var(--color-terminal-green)",
            boxShadow: "0 0 6px rgba(0,255,65,0.5)",
            transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
    </div>
  );
}
