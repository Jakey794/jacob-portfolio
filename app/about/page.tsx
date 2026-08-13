import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";

import { ctaClass } from "@/components/cta-link";
import { Footer } from "@/components/footer";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { SectionRail, anchorSections } from "@/components/section-rail";
import { TechLine, pageGutters } from "@/components/section-shell";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";
import {
  aboutBody,
  aboutContact,
  aboutLede,
  aboutSections,
  aboutStats,
  aboutTags,
  availability,
  education,
  journey,
  technicalFocus,
  workingPrinciples,
} from "@/lib/about";
import { skillGroups } from "@/lib/skills";

export const metadata: Metadata = {
  title: "About | Jacob Allan",
  description:
    "Engineering Science student at the University of Toronto building ML systems, full-stack AI tools, and quantitative software.",
  openGraph: {
    title: "About | Jacob Allan",
    description:
      "Engineering Science at UofT — machine learning, software engineering, and quantitative research.",
    type: "profile",
  },
};

/**
 * Section head for the editorial bands below the masthead.
 *
 * About used to be six equally weighted bordered panels in two rows, which
 * gave the most personal page on the site the density of a dashboard. The
 * page is now set as an article instead: a numbered head, a hairline rule,
 * and content in a reading measure. Nothing is boxed.
 */
function Band({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 border-t border-white/10 pt-8"
    >
      <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <h2
          id={`${id}-title`}
          className="flex items-baseline gap-3 text-[0.95rem] font-medium text-[#dfe2e9] lg:sticky lg:top-28 lg:h-fit"
        >
          <span
            aria-hidden="true"
            className="font-mono text-[0.72rem] tracking-[0.12em] text-accent-indigo-soft/70"
          >
            {index}
          </span>
          {title}
        </h2>

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.about} />
      <SiteNav active="about" />
      {pageAtmospheres.about.decor ? <PageDecorTop variant="quiet" /> : null}

      <main className={cn("relative z-10 pb-24 pt-[8.5rem] md:pt-[7.1rem] lg:pb-20", pageGutters.railed)}>
        {/* ---------------------------------------------------------- masthead */}
        <PageEyebrow index="02" label="About" />

        <PageTitle size="page" className="mt-2">
          About
        </PageTitle>

        {/* The lede is the largest body type on the site. This is the one page
            where the writing, rather than the work, is the subject. */}
        <p className="mt-6 max-w-[36rem] text-[1.32rem] leading-[1.5] text-[#ccd1da] lg:text-[1.5rem] lg:leading-[1.48]">
          {aboutLede}
        </p>

        <div className="mt-8 max-w-[36rem] space-y-5 text-[1.02rem] leading-[1.78] text-[#a2a8b5]">
          {aboutBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {/* The same disciplines the homepage hero sets, drawn the same way —
            an accented line of interpuncts. As four bordered chips they were
            the only boxed object on a page that is otherwise entirely
            hairlines and prose. */}
        <TechLine
          items={aboutTags}
          className="mt-8 text-[0.95rem] text-accent-indigo-soft/85"
        />

        {/* Figures sit under the prose as a quiet index into the site rather
            than inside a panel of their own. */}
        <ul
          id="overview"
          className="mt-12 flex scroll-mt-28 flex-wrap gap-x-14 gap-y-8 border-t border-white/10 pt-8"
        >
          {aboutStats.map((stat) => (
            <li key={stat.label}>
              <Link
                href={stat.href}
                className="group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span className="block text-[2rem] font-medium leading-none tracking-[-0.03em] text-accent-indigo-soft transition-colors group-hover:text-white">
                  {stat.value}
                </span>
                <span className="mt-3 block text-[0.78rem] leading-[1.4] text-[#8d93a1]">
                  {stat.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* ------------------------------------------------------------ bands */}
        <div className="mt-16 grid gap-14 lg:mt-20 lg:gap-16">
          <Band id="education" index="02" title="Education">
            <p className="text-[1.35rem] font-medium leading-snug tracking-[-0.015em] text-[#e2e5ec]">
              {education.programme}
            </p>
            <p className="mt-2 text-[1rem] text-[#a0a6b4]">
              {education.institution}
            </p>

            <dl className="mt-7 flex flex-wrap gap-x-16 gap-y-6">
              <div>
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/35">
                  Honour
                </dt>
                <dd className="mt-2.5 text-[0.95rem] text-[#dfe2e9]">
                  {education.honour}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/35">
                  Résumé
                </dt>
                <dd className="mt-2.5">
                  <a
                    href={aboutContact.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-sm text-[0.95rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    View PDF
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </dd>
              </div>
            </dl>
          </Band>

          <Band id="focus" index="03" title="Technical Focus">
            {/* Two up until xl. Inside the band's value column three tracks
                left each one about 155px wide at lg, which broke every skill
                list onto five lines. */}
            <dl className="grid gap-7 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-8 xl:grid-cols-3 xl:gap-10">
              {technicalFocus.map((area) => (
                <div key={area.title}>
                  <dt className="text-[0.95rem] font-medium leading-snug text-accent-indigo-soft">
                    {area.title}
                  </dt>
                  <dd className="mt-2.5 text-[0.86rem] leading-[1.65] text-[#8d93a1]">
                    {area.skills.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Band>

          <Band id="skills" index="04" title="Skills">
            {/* Label/value rows rather than chips: chips wrap to several lines
                and blow past the density this page is set at. */}
            <dl className="grid">
              {skillGroups.map((group, index) => (
                <div
                  key={group.category}
                  className={`grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8 ${
                    index === 0
                      ? "pb-4"
                      : "border-t border-white/10 py-4 last:pb-0"
                  }`}
                >
                  <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent-indigo-soft/70">
                    {group.category}
                  </dt>
                  <dd className="text-[0.9rem] leading-[1.7] text-[#a0a6b4]">
                    {group.skills.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Band>

          <Band id="how-i-work" index="05" title="How I Work">
            <ol className="grid gap-8 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-9">
              {workingPrinciples.map((principle, index) => (
                <li key={principle.title}>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.66rem] tracking-[0.14em] text-white/25"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2.5 text-[1rem] font-medium leading-snug text-[#dfe2e9]">
                    {principle.title}
                  </p>
                  <p className="mt-2 text-[0.88rem] leading-[1.65] text-[#8d93a1]">
                    {principle.evidence}{" "}
                    <Link
                      href={principle.href}
                      className="whitespace-nowrap rounded-sm text-accent-indigo-soft/85 transition-colors outline-none hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {principle.source}
                      <ArrowRight
                        aria-hidden="true"
                        className="ml-1 inline size-3 align-[-0.1em]"
                      />
                    </Link>
                  </p>
                </li>
              ))}
            </ol>
          </Band>

          <Band id="journey" index="06" title="Selected Journey">
            <ol className="relative grid gap-7">
              <span
                aria-hidden="true"
                className="absolute left-[4px] top-2 bottom-3 w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.16)_8%,rgba(255,255,255,0.16)_90%,transparent)]"
              />
              {journey.map((entry) => (
                <li key={entry.slug} className="relative flex gap-5">
                  <span
                    aria-hidden="true"
                    className="relative z-10 mt-[0.45rem] size-[9px] shrink-0 rounded-full border border-accent-indigo/70 bg-accent-indigo"
                  />
                  <div className="min-w-0 grid gap-x-10 gap-y-1 sm:grid-cols-[11rem_minmax(0,1fr)]">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/40 sm:pt-[0.15rem]">
                      {entry.dates}
                    </p>
                    <div>
                      <Link
                        href={`/experience/${entry.slug}`}
                        className="block rounded-sm text-[0.98rem] font-medium leading-snug text-[#e2e5ec] transition-colors outline-none hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                      >
                        {entry.organization}
                      </Link>
                      <p className="mt-1 text-[0.88rem] leading-[1.5] text-accent-indigo-soft/80">
                        {entry.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href="/experience"
              className="mt-8 inline-flex items-center gap-2.5 rounded-sm text-[0.9rem] text-white/55 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Full experience
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Band>
        </div>

        {/* --------------------------------------------------------- cta bar */}
        <section
          aria-labelledby="about-cta-title"
          className="mt-16 flex flex-col gap-7 border-t border-white/10 pt-8 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div>
            <h2
              id="about-cta-title"
              className="text-[1.35rem] font-medium leading-snug tracking-[-0.015em] text-[#e2e5ec]"
            >
              Open to interesting problems and collaborations.
            </h2>
            <p className="mt-3 max-w-[38rem] text-[0.95rem] leading-[1.7] text-[#8d93a1]">
              {availability}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/projects"
              className={ctaClass("primary", "sm")}
            >
              View Projects
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              href={`mailto:${aboutContact.email}`}
              className={ctaClass("secondary", "sm")}
            >
              Get In Touch
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </section>

        <PageDecorFoot />
      </main>

      {/* Section rail + contact meta, mirroring the concept's right column. */}
      <div className="absolute right-[3.2%] top-[16rem] z-20 hidden xl:block">
        <SectionRail
          variant="indexed"
          gap="2.05rem"
          sections={anchorSections(aboutSections)}
        />

        <ul className="mt-10 grid gap-3.5 border-t border-white/10 pt-6 text-[0.84rem] text-[#9299a7]">
          <li className="flex items-center gap-2.5">
            <MapPin aria-hidden="true" className="size-[0.9rem] text-white/35" />
            {aboutContact.institution}
          </li>
          <li>
            <a
              href={`mailto:${aboutContact.email}`}
              className="flex items-center gap-2.5 rounded-sm transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
            >
              <Mail aria-hidden="true" className="size-[0.9rem] text-white/35" />
              Email
            </a>
          </li>
        </ul>
      </div>

      <Footer className={pageGutters.railed} />
    </div>
  );
}
