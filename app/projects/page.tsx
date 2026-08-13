import type { Metadata } from "next";

import { Footer } from "@/components/footer";
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
import { allProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Jacob Allan",
  description:
    "ML systems, full-stack AI tools, applied research, and quantitative software built by Jacob Allan.",
  openGraph: {
    title: "Projects | Jacob Allan",
    description:
      "ML systems, full-stack AI tools, applied research, and quantitative software.",
    type: "website",
  },
};

const items: ProjectIndexItem[] = allProjects.map((project) => ({
  slug: project.slug,
  title: project.title,
  oneLine: project.oneLine,
  categories: project.categories,
  displayTags: project.displayTags,
  image: project.image,
  imageAlt: project.imageAlt,
  imageDetail: project.imageDetail,
}));

export default function ProjectsIndexPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.projects} />
      <SiteNav active="projects" />
      {pageAtmospheres.projects.decor ? <PageDecorTop variant="spec" /> : null}

      {/* Shallowest masthead of the standalone pages: the work is the point
          here, so the header hands over to the first capture quickly. */}
      <main className={cn("relative z-10 pb-24 pt-[8.5rem] md:pt-[7.1rem] lg:pb-20", pageGutters.wide)}>
        <PageEyebrow index="03" label="Projects" />

        <PageTitle className="mt-2">Projects</PageTitle>

        <p className="mt-3 max-w-[27.5rem] text-[1.02rem] leading-[1.7] text-[#a2a8b5] lg:text-[1.09rem]">
          A selection of systems, tools, and research exploring intelligent
          solutions to complex problems.
        </p>

        <div className="mt-9 lg:mt-10">
          <ProjectsExplorer projects={items} />
        </div>

        <PageDecorFoot />
      </main>

      <Footer className={pageGutters.wide} />
    </div>
  );
}
