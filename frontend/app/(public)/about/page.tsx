import type { Metadata } from "next";
import Link from "next/link";
import { AboutSection } from "../_components/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Leo Rao — Chemical Engineering student at the University of Toronto, building systems at the boundary of science and software.",
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <Link
        href="/"
        className="text-xs tracking-widest font-mono inline-flex items-center gap-2"
        style={{ color: "var(--text-muted)" }}
      >
        ← LEOLOGIC.ORG
      </Link>
      <AboutSection />
    </div>
  );
}
