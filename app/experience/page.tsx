import type { Metadata } from "next";

import {
  ExperienceExplorer,
  type ExperienceIndexItem,
} from "@/components/experience/experience-explorer";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { pageGutters } from "@/components/section-shell";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";
import { experience, experienceFilters, roleHistory } from "@/lib/experience";
import { absoluteUrl } from "@/lib/site";

const description =
  "Work across enterprise software, applied machine learning, quantitative finance, research, teaching, and technical leadership. Each record separates verified outcomes from context and avoids implying public access to private employer work.";

export const metadata: Metadata = {
  title: "Experience",
  description,
  alternates: { canonical: absoluteUrl("/experience") },
  openGraph: {
    title: "Experience | Jacob Allan",
    description,
    url: absoluteUrl("/experience"),
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/og/experience.jpg"),
        width: 1200,
        height: 630,
        alt: "Experience — Jacob Allan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Jacob Allan",
    description,
    images: [absoluteUrl("/images/og/experience.jpg")],
  },
};

const items: ExperienceIndexItem[] = experience.map((item) => ({
  slug: item.slug,
  organization: item.organization,
  shortOrganization: item.shortOrganization,
  role: item.role,
  displayDates: item.displayDates,
  current: item.current,
  categories: item.categories,
  tools: item.tools,
  oneLine: item.oneLine,
  summary: item.summary,
  location: item.location,
  workMode: item.workMode,
  archive: item.archive,
  proofChips: item.proofChips,
  workflow: item.workflow,
  thumbnailMedia: item.thumbnailMedia,
  media: item.media,
  roleHistory: roleHistory(item).map((other) => ({
    slug: other.slug,
    role: other.role,
    displayDates: other.displayDates,
  })),
}));

export default function ExperienceIndexPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.experience} />
      <SiteNav active="experience" />
      {pageAtmospheres.experience.decor ? (
        <PageDecorTop variant="instrument" />
      ) : null}

      <main
        id="main-content"
        className={cn(
          "relative z-10 pb-24 pt-[8.5rem] md:pt-[7.1rem] lg:pb-20",
          pageGutters.wide
        )}
      >
        <PageEyebrow index="04" label="Experience" />

        <PageTitle size="index" className="mt-2">
          Experience
        </PageTitle>

        <p className="mt-3 max-w-[36rem] text-[1.02rem] leading-[1.7] text-[#a2a8b5] lg:text-[1.09rem]">
          {description}
        </p>

        <div className="mt-9 lg:mt-10">
          <ExperienceExplorer items={items} filters={experienceFilters} />
        </div>

        <PageDecorFoot />
      </main>

      <Footer className={pageGutters.wide} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Experience — Jacob Allan",
          numberOfItems: experience.length,
          itemListElement: experience.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${item.role} — ${item.organization}`,
            url: absoluteUrl(`/experience/${item.slug}`),
          })),
        }}
      />
    </div>
  );
}
