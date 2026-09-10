import type { MetadataRoute } from "next";
import { REGISTRY_PROJECTS } from "./_data/projects";

const BASE_URL = "https://leologic.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/engineering", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/lab", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    /* Each project is its own indexable, shareable page. */
    ...REGISTRY_PROJECTS.map((p) => ({
      path: `/projects/${p.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
