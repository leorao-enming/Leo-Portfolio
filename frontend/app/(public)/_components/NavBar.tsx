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
            border: "1px solid rgba(10, 12, 15,0.09)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            background: "rgba(246,245,241,0.78)",
            boxShadow: "0 12px 40px rgba(10,12,15,0.08)",
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
              className="touch-target flex items-center gap-2 rounded-full"
              /* Negative margin keeps the visual position identical while giving
                 the link a real hit area — it was a 20px-tall target before. */
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 12px", margin: "-8px -12px" }}
              aria-label={isHome ? "Open ID card" : "Home"}
            >
              <span
                className="font-display font-bold text-sm tracking-tight"
                style={{ color: "var(--color-accent-ink)" }}
              >
                LeoLogic
              </span>
            </Link>

            {/* Nav links — hidden on small screens */}
            <div className="hidden md:flex items-center gap-1">
              {/* One link per destination. Root-relative so the #anchors also
                  resolve from other pages. next/link handles hash targets fine,
                  and avoids the full page reload a raw <a> forced on every nav. */}
              {NAV_ITEMS.map(({ label, href }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={
                      "text-xs px-3 py-1.5 rounded-full transition-colors duration-300 active:scale-95 " +
                      "hover:bg-black/5 focus-visible:bg-black/5 " +
                      (active ? "text-black/90" : "text-black/55 hover:text-black/90")
                    }
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              {/* Enter OS CTA — this is a public read-only demo, not a live operational tool */}
              <Link
                href="/dashboard"
                className="accent-chip hidden sm:flex items-center gap-2 text-xs font-medium rounded-full active:scale-95 group"
                style={{
                  padding: "8px 16px",
                  color: "var(--color-accent-ink)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.02em",
                }}
              >
                Enter OS
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--color-accent-ink)",
                    border: "1px solid rgba(255,122,24,0.3)",
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
                    background: "rgba(255,122,24,0.15)",
                    fontSize: "10px",
                  }}
                >
                  →
                </span>
              </Link>

              {/* Mobile menu toggle.
                  The button box is 44x44 — the touch-target floor — while the
                  visible chrome stays the 32px circle it always was. Same
                  trick as the logo above: grow the hit area, then pull the
                  layout back with a matching negative margin so nothing
                  moves. This is the only control on the mobile bar, so it is
                  also the one that can least afford to be hard to hit. */}
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="md:hidden flex items-center justify-center"
                style={{
                  width: 44,
                  height: 44,
                  margin: -6,
                  borderRadius: "50%",
                  background: "transparent",
                  border: "none",
                }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span
                  aria-hidden
                  className="flex items-center justify-center"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: menuOpen ? "rgba(10, 12, 15,0.1)" : "transparent",
                    border: "1px solid rgba(10, 12, 15,0.12)",
                  }}
                >
                <div style={{ position: "relative", width: 14, height: 10 }}>
                  <span
                    style={{
                      position: "absolute", left: 0, right: 0, height: 1.5, background: "rgba(10, 12, 15,0.8)",
                      top: menuOpen ? 4.25 : 0,
                      transform: menuOpen ? "rotate(45deg)" : "none",
                      transition: "all 0.25s ease",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute", left: 0, right: 0, height: 1.5, background: "rgba(10, 12, 15,0.8)",
                      top: 4.25,
                      opacity: menuOpen ? 0 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute", left: 0, right: 0, height: 1.5, background: "rgba(10, 12, 15,0.8)",
                      top: menuOpen ? 4.25 : 8.5,
                      transform: menuOpen ? "rotate(-45deg)" : "none",
                      transition: "all 0.25s ease",
                    }}
                  />
                </div>
                </span>
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
                style={{ borderTop: "1px solid rgba(10, 12, 15,0.08)" }}
              >
                <div style={{ padding: "8px 12px 14px", display: "flex", flexDirection: "column", gap: 2 }}>
                  {NAV_ITEMS.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      aria-current={pathname === href ? "page" : undefined}
                      className="flex items-center text-sm px-4 rounded-xl transition-colors text-black/70 hover:bg-black/5"
                      style={{
                        minHeight: 44, /* comfortable touch target */
                        fontFamily: "var(--font-display)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center justify-between text-sm px-4 rounded-xl"
                    style={{
                      minHeight: 44, /* comfortable touch target */
                      marginTop: 6,
                      background: "rgba(255,122,24,0.08)",
                      border: "1px solid rgba(255,122,24,0.18)",
                      color: "var(--color-accent-ink)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    <span>Enter OS</span>
                    <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--color-accent-ink)" }}>DEMO →</span>
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
