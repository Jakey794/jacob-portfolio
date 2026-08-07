import type { Metadata } from "next";

import {
  ExperienceExplorer,
  type ExperienceIndexItem,
} from "@/components/experience/experience-explorer";
import { Footer } from "@/components/footer";
import { PageAtmosphere } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { SiteNav } from "@/components/site-nav";
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
  };
}

export default function ExperienceIndexPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere />
      <SiteNav active="experience" />
      <PageDecorTop />

      {/* Tighter vertical rhythm than /projects: the experience concept packs
          the header into roughly 220px before the first card. */}
      <main className="relative z-10 px-6 pb-24 pt-[6.5rem] sm:px-10 sm:pt-[6.75rem] lg:pb-28 lg:pl-[5%] lg:pr-[9.5%] lg:pt-[6.4rem]">
        <PageEyebrow index="04" label="Experience" />

        <PageTitle size="index" className="mt-0.5">
          Experience
        </PageTitle>

        <p className="mt-0.5 max-w-[26rem] text-[0.95rem] leading-[1.5] text-[#a2a8b5]">
          Roles, research positions, and technical work across engineering,
          machine learning, and quantitative systems.
        </p>

        <div className="mt-8 lg:mt-5">
          <ExperienceExplorer
            featured={toIndexItem(featuredExperience)}
            items={supportingExperience.map(toIndexItem)}
          />
        </div>

        <p className="sr-only">{`${experience.length} roles listed.`}</p>

        <PageDecorFoot />
      </main>

      <Footer />
    </div>
  );
}
