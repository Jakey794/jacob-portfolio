import type { MetadataRoute } from "next";

import { experience } from "@/lib/experience";
import { allProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

/**
 * Sitemap, derived from the content collections.
 *
 * `lastModified` comes from each record's `lastVerified` date rather than from
 * `new Date()`. Stamping the build time onto every URL tells a crawler the
 * whole site changed on every deploy, which is both false and a good way to
 * have the signal ignored.
 *
 * Excluded on purpose: `/resume.pdf` (not an HTML page), the retired
 * `regime-specialist-stock-predictor` slug and the three retired experience
 * slugs (they 308 elsewhere, and listing a redirect is a crawl error).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
    {
      url: absoluteUrl("/experience"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.6 },
  ];

  const projects: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(project.lastVerified),
    changeFrequency: "monthly",
    priority: project.featured ? 0.8 : 0.6,
  }));

  const roles: MetadataRoute.Sitemap = experience.map((item) => ({
    url: absoluteUrl(`/experience/${item.slug}`),
    lastModified: new Date(item.lastVerified),
    changeFrequency: "monthly",
    priority: item.featured ? 0.7 : 0.5,
  }));

  return [...pages, ...projects, ...roles];
}
