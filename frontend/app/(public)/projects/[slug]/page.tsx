import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectCard } from "../../_components/ProjectCard";
import { REGISTRY_PROJECTS, getProjectBySlug } from "../../../_data/projects";

/** Prerender every project at build time — the set is static and small. */
export function generateStaticParams() {
  return REGISTRY_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — LeoLogic`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  /* Neighbours give the page somewhere to go that isn't the nav bar. */
  const index = REGISTRY_PROJECTS.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? REGISTRY_PROJECTS[index - 1] : null;
  const next =
    index < REGISTRY_PROJECTS.length - 1 ? REGISTRY_PROJECTS[index + 1] : null;

  return (
    <div className="page-shell">
      <nav aria-label="Breadcrumb" style={{ marginBottom: "clamp(20px, 3vw, 32px)" }}>
        <Link
          href="/projects"
          className="text-xs tracking-widest font-mono hover:underline"
          style={{ color: "var(--text-muted)" }}
        >
          ← All projects
        </Link>
      </nav>

      <ProjectCard project={project} />

      {/* Previous / next */}
      {(prev || next) && (
        <nav
          aria-label="More projects"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginTop: "clamp(32px, 5vw, 56px)",
            paddingTop: 24,
            borderTop: "1px solid var(--color-hairline)",
          }}
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              style={{ maxWidth: "45%", textDecoration: "none" }}
              className="group"
            >
              <span
                className="block text-xs tracking-widest font-mono mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                ← Previous
              </span>
              <span style={{ fontSize: 14, color: "var(--text-body)" }} className="group-hover:underline">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              href={`/projects/${next.slug}`}
              style={{ maxWidth: "45%", textAlign: "right", textDecoration: "none" }}
              className="group"
            >
              <span
                className="block text-xs tracking-widest font-mono mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Next →
              </span>
              <span style={{ fontSize: 14, color: "var(--text-body)" }} className="group-hover:underline">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
