import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import {
  ProjectsExplorer,
  type ProjectIndexItem,
} from "@/components/projects/projects-explorer";
import { pageGutters } from "@/components/section-shell";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";
import { allProjects, ownershipLabels, projectFilters } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

const description =
  "Public systems and research projects spanning LLM evaluation, incident response, Rust market infrastructure, portfolio risk, local-first tooling, RF classification, and collaborative regime modeling.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    title: "Projects | Jacob Allan",
    description,
    url: absoluteUrl("/projects"),
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/og/projects.jpg"),
        width: 1200,
        height: 630,
        alt: "Projects by Jacob Allan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Jacob Allan",
    description,
    images: [absoluteUrl("/images/og/projects.jpg")],
  },
};

/**
 * Only the fields the index renders cross into the client bundle. The full
 * records stay on the server — a project carries several kilobytes of
 * case-study prose that no card shows.
 */
const items: ProjectIndexItem[] = allProjects.map((project) => ({
  slug: project.slug,
  title: project.title,
  oneLine: project.oneLine,
  eyebrow: project.eyebrow,
  ownershipLabel: ownershipLabels[project.ownership],
  statusLabel: project.statusLabel,
  displayDate: project.displayDate,
  archive: project.archive,
  attribution: project.attribution,
  categories: project.categories,
  displayTags: project.displayTags,
  proof: project.proof[0],
  headlineMetric: project.metrics[0]
    ? { value: project.metrics[0].value, label: project.metrics[0].label }
    : undefined,
  links: project.links,
  media: project.media,
  architecture: project.architecture,
}));

export default function ProjectsIndexPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.projects} />
      <SiteNav active="projects" />
      {pageAtmospheres.projects.decor ? <PageDecorTop variant="spec" /> : null}

      <main
        id="main-content"
        className={cn(
          "relative z-10 pb-24 pt-[8.5rem] md:pt-[7.1rem] lg:pb-20",
          pageGutters.wide
        )}
      >
        <PageEyebrow index="03" label="Projects" />

        <PageTitle className="mt-2">Projects</PageTitle>

        <p className="mt-3 max-w-[34rem] text-[1.02rem] leading-[1.7] text-[#a2a8b5] lg:text-[1.09rem]">
          {description}
        </p>

        <div className="mt-9 lg:mt-10">
          <ProjectsExplorer projects={items} filters={projectFilters} />
        </div>

        <PageDecorFoot />
      </main>

      <Footer className={pageGutters.wide} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Projects by Jacob Allan",
          numberOfItems: allProjects.length,
          itemListElement: allProjects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            url: absoluteUrl(`/projects/${project.slug}`),
          })),
        }}
      />
    </div>
  );
}
