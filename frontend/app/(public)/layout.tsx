import type { Metadata } from "next";
import { NavBar } from "./_components/NavBar";
import { CursorGlow } from "./_components/CursorGlow";

export const metadata: Metadata = {
  title: "LeoLogic — Leo Rao",
  description:
    "Building precision systems at the intersection of chemical engineering and artificial intelligence.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ minHeight: "100dvh", background: "var(--color-bg)" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-[100000] rounded-md px-4 py-2 text-sm font-medium"
        style={{
          background: "var(--color-terminal-green)",
          color: "var(--color-bg)",
        }}
      >
        Skip to content
      </a>
      <CursorGlow />
      <NavBar />
      <main id="main-content">{children}</main>
    </div>
  );
}
