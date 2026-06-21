"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { EmployeeIdCard } from "./EmployeeIdCard";

export function NavBar() {
  const [cardOpen, setCardOpen] = useState(false);
  const close = useCallback(() => setCardOpen(false), []);

  return (
    <>
      <nav
        style={{
          backgroundColor: "var(--color-surface-1)",
          borderBottom: "1px solid var(--color-border)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        className="py-3"
      >
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 xl:px-24 w-full flex items-center justify-between">
          <button
            onClick={() => setCardOpen(v => !v)}
            className="terminal-text font-bold text-sm tracking-widest hover:opacity-80 transition-opacity glitch-hover"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            LEOLOGIC
          </button>
          <div className="flex items-center gap-6 text-xs tracking-wider text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              / INDEX
            </Link>
            <Link href="/projects" className="hover:text-white transition-colors">
              / PROJECTS
            </Link>
            <span className="cursor-not-allowed opacity-40">/ METHOD</span>
            <span className="cursor-not-allowed opacity-40">/ LOGS</span>
            <Link
              href="/dashboard"
              className="terminal-text text-xs tracking-wider border px-3 py-1 hover:opacity-80 transition-opacity"
              style={{ borderColor: "var(--color-terminal-green)" }}
            >
              ENTER OS →
            </Link>
          </div>
        </div>
      </nav>

      <EmployeeIdCard open={cardOpen} onClose={close} />
    </>
  );
}
