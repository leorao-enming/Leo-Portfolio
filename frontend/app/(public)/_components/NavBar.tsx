"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EmployeeIdCard } from "./EmployeeIdCard";

const NAV_ITEMS = [
  { label: "Projects", href: "/projects" },
  { label: "Engineering", href: "/engineering" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [cardOpen, setCardOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const close = useCallback(() => setCardOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* Floating pill nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ paddingTop: "16px", paddingLeft: "16px", paddingRight: "16px" }}
      >
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col w-full"
          style={{
            maxWidth: "900px",
            borderRadius: menuOpen ? "24px" : "9999px",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            background: "rgba(6,8,7,0.72)",
            boxShadow: "0 18px 60px rgba(0,0,0,0.22)",
            transition: "border-radius 0.3s ease",
            overflow: "hidden",
          }}
        >
          <div
            className="flex items-center justify-between gap-4 w-full"
            style={{ padding: "10px 16px 10px 20px" }}
          >
            {/* Logo — always returns home. Only toggles the ID card when already
                there, so navigating home from another page doesn't also pop it. */}
            <Link
              href="/"
              onClick={() => { if (isHome) setCardOpen(v => !v); }}
              className="flex items-center gap-2 rounded-full focus:outline-none"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              aria-label={isHome ? "Open ID card" : "Home"}
            >
              <span
                className="font-display font-bold text-sm tracking-tight"
                style={{ color: "var(--color-terminal-green)", textShadow: "0 0 12px rgba(0,255,65,0.35)" }}
              >
                LeoLogic
              </span>
            </Link>

            {/* Nav links — hidden on small screens */}
            <div className="hidden md:flex items-center gap-1">
              {/* One link per destination. Root-relative so the #anchors also resolve from other pages. */}
              {NAV_ITEMS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-300 active:scale-95"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Enter OS CTA — this is a public read-only demo, not a live operational tool */}
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 text-xs font-medium rounded-full transition-all duration-300 active:scale-95 group"
                style={{
                  padding: "8px 16px",
                  background: "rgba(0,255,65,0.1)",
                  border: "1px solid rgba(0,255,65,0.2)",
                  color: "var(--color-terminal-green)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,255,65,0.16)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,65,0.35)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,255,65,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,65,0.2)";
                }}
              >
                Enter OS
                <span
                  style={{
                    fontSize: 8,
                    letterSpacing: "0.14em",
                    color: "rgba(0,255,65,0.5)",
                    border: "1px solid rgba(0,255,65,0.25)",
                    borderRadius: 4,
                    padding: "1px 4px",
                  }}
                >
                  DEMO
                </span>
                <span
                  className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "rgba(0,255,65,0.15)",
                    fontSize: "10px",
                  }}
                >
                  →
                </span>
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="md:hidden flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: menuOpen ? "rgba(255,255,255,0.1)" : "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <div style={{ position: "relative", width: 14, height: 10 }}>
                  <span
                    style={{
                      position: "absolute", left: 0, right: 0, height: 1.5, background: "rgba(255,255,255,0.8)",
                      top: menuOpen ? 4.25 : 0,
                      transform: menuOpen ? "rotate(45deg)" : "none",
                      transition: "all 0.25s ease",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute", left: 0, right: 0, height: 1.5, background: "rgba(255,255,255,0.8)",
                      top: 4.25,
                      opacity: menuOpen ? 0 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute", left: 0, right: 0, height: 1.5, background: "rgba(255,255,255,0.8)",
                      top: menuOpen ? 4.25 : 8.5,
                      transform: menuOpen ? "rotate(-45deg)" : "none",
                      transition: "all 0.25s ease",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile menu panel */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div style={{ padding: "8px 12px 14px", display: "flex", flexDirection: "column", gap: 2 }}>
                  {NAV_ITEMS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      className="text-sm px-4 py-2.5 rounded-xl transition-colors"
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {label}
                    </a>
                  ))}
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center justify-between text-sm px-4 py-2.5 rounded-xl"
                    style={{
                      marginTop: 6,
                      background: "rgba(0,255,65,0.08)",
                      border: "1px solid rgba(0,255,65,0.18)",
                      color: "var(--color-terminal-green)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    <span>Enter OS</span>
                    <span style={{ fontSize: 9, letterSpacing: "0.14em", color: "rgba(0,255,65,0.5)" }}>DEMO →</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      <EmployeeIdCard open={cardOpen} onClose={close} />
    </>
  );
}
