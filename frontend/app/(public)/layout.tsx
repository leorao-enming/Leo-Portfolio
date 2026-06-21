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
      <CursorGlow />
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
