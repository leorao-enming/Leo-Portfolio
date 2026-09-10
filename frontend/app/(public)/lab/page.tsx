import type { Metadata } from "next";
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
      <LabSection />
    </div>
  );
}
