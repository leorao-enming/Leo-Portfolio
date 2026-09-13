import type { Metadata } from "next";
import { ProjectsHero } from "./_components/ProjectsHero";
import { GalleryHalfLife } from "./_components/GalleryHalfLife";
import { GalleryFabTwin } from "./_components/GalleryFabTwin";
import { GalleryLeoLogicOs } from "./_components/GalleryLeoLogicOs";
import { ProjectArchive } from "./_components/ProjectArchive";
import { ContinueToLab } from "./_components/ContinueToLab";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected systems, experiments and tools: a caffeine-kinetics iOS app, a plasma-etch " +
    "SPC simulator, and a personal operating system — plus the working archive behind them.",
};

/**
 * /projects as two layers rather than one uniform registry.
 *
 * GALLERY (01) carries identity: three works, each a full chapter with its
 * own surface, art direction and composition. ARCHIVE (02) carries
 * evidence: the dense registry, preserved, on a light technical paper.
 *
 * The tone arc is load-bearing, same as the homepage: warm neutral → cream
 * → titanium → graphite → technical paper → warm neutral. Only LeoLogic OS
 * gets a large dark field, and the page resolves back to light afterwards
 * rather than ending in black.
 *
 * Half-Life and LeoLogic OS are excluded from the archive because they are
 * shown in full above; nothing is deleted — every other registry project
 * still appears, and FabTwin's record stays in Lab where it belongs.
 */
export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <GalleryHalfLife />
      <GalleryFabTwin />
      <GalleryLeoLogicOs />
      <ProjectArchive excludeSlugs={["half-life", "leologic-os"]} />
      <ContinueToLab />
    </>
  );
}
