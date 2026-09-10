import type { Metadata } from "next";
import Link from "next/link";
import { LabSection } from "../_components/LabSection";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "The open-source replication build queue — systems chosen for a specific transferable " +
    "capability, honestly labelled queued/in progress/shipped until the work is real.",
};

export default function LabPage() {
  return (
    <div className="page-shell">
      <Link
        href="/"
        className="text-xs tracking-widest font-mono inline-flex items-center gap-2"
        style={{ color: "var(--text-muted)" }}
      >
        ← LEOLOGIC.ORG
      </Link>
      <LabSection />
    </div>
  );
}
