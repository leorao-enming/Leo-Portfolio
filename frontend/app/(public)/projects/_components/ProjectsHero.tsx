import { PROJECTS_ON_RECORD } from "../../../_data/projects";
import { PageIntro } from "../../_components/editorial";

/**
 * A quiet opening. Deliberately not a dashboard panel and not six cards:
 * one line of metadata, one statement, one sentence, then whitespace. The
 * old header led with "PROJECT REGISTRY — 6 ENTRIES" plus a live/architecture
 * legend before the reader had seen a single project; that legend now belongs
 * to the archive further down, where the distinction is actually used.
 *
 * Rendered through the shared PageIntro, which was extracted from this
 * component so /about, /engineering and /lab open the same way.
 */
export function ProjectsHero() {
  return (
    <PageIntro
      railLabel="Projects"
      eyebrow={`Project archive — ${PROJECTS_ON_RECORD} entries`}
      title="Selected systems, experiments and tools."
      lead="Three works carried far enough to show in full, and the working archive behind them."
    />
  );
}
