import type { Metadata } from "next";

import {
  ExperienceExplorer,
  type ExperienceIndexItem,
} from "@/components/experience/experience-explorer";
import { Footer } from "@/components/footer";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { pageGutters } from "@/components/section-shell";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";
import {
  experience,
  featuredExperience,
  supportingExperience,
  type ExperienceItem,
} from "@/lib/experience";

export const metadata: Metadata = {
  title: "Experience | Jacob Allan",
  description:
    "Research, machine learning engineering, and quantitative work by Jacob Allan.",
  openGraph: {
    title: "Experience | Jacob Allan",
    description:
      "Research, machine learning engineering, and quantitative work.",
    type: "website",
  },
};

/** No summary has been written yet, so the first bullet stands in for it. */
function toIndexItem(item: ExperienceItem): ExperienceIndexItem {
  return {
    slug: item.slug,
    organization: item.organization,
    shortName: item.shortName,
    role: item.role,
    dates: item.dates,
    categories: item.categories,
    tools: item.tools,
    summary: item.summary ?? item.bullets[0],
    location: item.location,
    image: item.image,
    imageAlt: item.imageAlt,
    results: item.results,
    workflow: item.workflow,
  };
}

export default function ExperienceIndexPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.experience} />
      <SiteNav active="experience" />
      {pageAtmospheres.experience.decor ? (
        <PageDecorTop variant="instrument" />
      ) : null}

      <main className={cn("relative z-10 pb-24 pt-[8.5rem] md:pt-[7.1rem] lg:pb-20", pageGutters.wide)}>
        <PageEyebrow index="04" label="Experience" />

        <PageTitle size="index" className="mt-2">
          Experience
        </PageTitle>

        <p className="mt-3 max-w-[27.5rem] text-[1.02rem] leading-[1.7] text-[#a2a8b5] lg:text-[1.09rem]">
          Roles, research positions, and technical work across engineering,
          machine learning, and quantitative systems.
        </p>

        <div className="mt-9 lg:mt-10">
          <ExperienceExplorer
            featured={toIndexItem(featuredExperience)}
            items={supportingExperience.map(toIndexItem)}
          />
        </div>

        <p className="sr-only">{`${experience.length} roles listed.`}</p>

        <PageDecorFoot />
      </main>

      <Footer className={pageGutters.wide} />
    </div>
  );
}
