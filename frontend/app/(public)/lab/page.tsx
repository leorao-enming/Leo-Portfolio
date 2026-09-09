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
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(96px, 11vw, 128px) clamp(24px, 5vw, 80px) 0" }}>
      <Link
        href="/"
        className="text-xs tracking-widest font-mono inline-flex items-center gap-2"
        style={{ color: "rgba(255,255,255,0.32)" }}
      >
        ← LEOLOGIC.ORG
      </Link>
      <LabSection />
    </div>
  );
}
