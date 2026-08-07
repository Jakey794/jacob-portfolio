import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { PageAtmosphere } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import {
  ProjectsExplorer,
  type ProjectIndexItem,
} from "@/components/projects/projects-explorer";
import { SiteNav } from "@/components/site-nav";
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
}));

export default function ProjectsIndexPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere />
      <SiteNav active="projects" />
      <PageDecorTop />

      <main className="relative z-10 px-6 pb-24 pt-[7rem] sm:px-10 sm:pt-[7.5rem] lg:pb-28 lg:pl-[5%] lg:pr-[9.5%] lg:pt-[7.6rem]">
        <PageEyebrow index="02" label="Projects" />

        <PageTitle className="mt-1">Projects</PageTitle>

        <p className="mt-2 max-w-[27.5rem] text-[1.02rem] leading-[1.7] text-[#a2a8b5] lg:text-[1.09rem]">
          A selection of systems, tools, and research exploring intelligent
          solutions to complex problems.
        </p>

        <div className="mt-9 lg:mt-8">
          <ProjectsExplorer projects={items} />
        </div>

        <PageDecorFoot />
      </main>

      <Footer />
    </div>
  );
}
