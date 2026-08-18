import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";

import { ctaClass } from "@/components/cta-link";
import { Footer } from "@/components/footer";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { Reveal } from "@/components/reveal";
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
  awards,
  certifications,
  education,
  independentInvestingNote,
  journey,
  technicalFocus,
  volunteering,
  workingPrinciples,
} from "@/lib/about";
import { skillGroups } from "@/lib/skills";
import { absoluteUrl, contactLinks, profile } from "@/lib/site";

const description =
  "Engineering Science student at the University of Toronto building secure backend systems, applied ML pipelines, and quantitative tools. Education, recognition, skills, and working principles.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: "About | Jacob Allan",
    description,
    url: absoluteUrl("/about"),
    type: "profile",
    images: [
      {
        url: absoluteUrl("/images/og/about.jpg"),
        width: 1200,
        height: 630,
        alt: "About Jacob Allan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Jacob Allan",
    description,
    images: [absoluteUrl("/images/og/about.jpg")],
  },
};

/**
 * Section head for the editorial bands below the masthead.
 *
 * About is set as an article rather than as a dashboard: a numbered head, a
 * hairline rule, and content in a reading measure. Nothing is boxed.
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
    <Reveal
      as="section"
      className="scroll-mt-28 border-t border-white/10 pt-8"
    >
      <div id={id} className="grid scroll-mt-28 gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <h2
          className="flex items-baseline gap-3 text-[0.95rem] font-medium text-[#dfe2e9] lg:sticky lg:top-28 lg:h-fit"
        >
          <span
            aria-hidden="true"
            className="font-mono text-[0.72rem] tracking-[0.12em] text-accent-indigo-soft/85"
          >
            {index}
          </span>
          {title}
        </h2>

        <div className="min-w-0">{children}</div>
      </div>
    </Reveal>
  );
}

export default function AboutPage() {
  const [uoft, secondary] = education;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.about} />
      <SiteNav active="about" />
      {pageAtmospheres.about.decor ? <PageDecorTop variant="quiet" /> : null}

      <main
        id="main-content"
        className={cn(
          "relative z-10 pb-24 pt-[8.5rem] md:pt-[7.1rem] lg:pb-20",
          pageGutters.railed
        )}
      >
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

        <aside
          aria-labelledby="independent-investing-title"
          className="mt-8 max-w-[36rem] border-l border-accent-indigo-soft/55 pl-5"
        >
          <h2
            id="independent-investing-title"
            className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-accent-indigo-soft/90"
          >
            {independentInvestingNote.title}
          </h2>
          <p className="mt-3 text-[0.95rem] leading-[1.7] text-[#b2b7c3]">
            {independentInvestingNote.body} {independentInvestingNote.performance}
          </p>
          <p className="mt-2 text-[0.76rem] leading-[1.6] text-[#777e8d]">
            {independentInvestingNote.qualifier}
          </p>
        </aside>

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
                <span className="mt-3 block max-w-[12rem] text-[0.78rem] leading-[1.4] text-[#8d93a1]">
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
              {uoft.credential}
              {uoft.field ? `, ${uoft.field}` : ""}
            </p>
            <p className="mt-2 text-[1rem] text-[#a0a6b4]">
              {uoft.institution}
              {uoft.location ? ` · ${uoft.location}` : ""}
            </p>
            <p className="mt-1.5 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-white/55">
              {uoft.displayDates}
            </p>

            <p className="mt-6 max-w-[38rem] text-[0.95rem] leading-[1.72] text-[#8d93a1]">
              {uoft.summary}
            </p>

            <dl className="mt-8 grid gap-x-14 gap-y-7 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
                  Concentrations
                </dt>
                <dd className="mt-2.5 text-[0.95rem] text-[#dfe2e9]">
                  {uoft.concentrations?.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
                  Distinction
                </dt>
                <dd className="mt-2.5 text-[0.95rem] text-[#dfe2e9]">
                  {uoft.honour}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
                  GPA
                </dt>
                <dd className="mt-2.5 text-[0.95rem] text-[#dfe2e9]">
                  {uoft.gpa}
                  {/* A GPA is a snapshot, so it is dated. Nothing here derives
                      a class rank or a percentage from it. */}
                  <span className="mt-1 block text-[0.78rem] text-white/55">
                    {uoft.gpaQualifier}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
                  Selected coursework
                </dt>
                <dd className="mt-2.5 text-[0.95rem] leading-[1.6] text-[#dfe2e9]">
                  {uoft.coursework?.join(", ")}
                </dd>
              </div>
            </dl>

            {secondary ? (
              <div className="mt-10 border-t border-white/10 pt-7">
                <p className="text-[1rem] font-medium text-[#dfe2e9]">
                  {secondary.institution}
                </p>
                <p className="mt-1.5 text-[0.9rem] text-[#a0a6b4]">
                  {secondary.credential} · {secondary.displayDates}
                </p>
                <ul className="mt-4 grid gap-2">
                  {secondary.distinctions?.map((entry) => (
                    <li key={entry} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] size-[4px] shrink-0 rounded-full bg-accent-indigo-soft/60"
                      />
                      <span className="text-[0.88rem] leading-[1.6] text-[#8d93a1]">
                        {entry}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Band>

          <Band id="recognition" index="03" title="Recognition">
            <ol className="grid gap-7">
              {awards.map((award) => (
                <li
                  key={award.id}
                  className="grid gap-x-10 gap-y-1.5 sm:grid-cols-[8rem_minmax(0,1fr)]"
                >
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/55 sm:pt-[0.2rem]">
                    {award.displayDate}
                  </p>
                  <div>
                    <p className="text-[1rem] font-medium leading-snug text-[#e2e5ec]">
                      {award.title}
                      {award.amount ? (
                        <span className="ml-2.5 text-accent-indigo-soft">
                          {award.amount}
                        </span>
                      ) : null}
                    </p>
                    {award.issuer ? (
                      <p className="mt-1 text-[0.84rem] text-white/55">
                        {award.issuer}
                      </p>
                    ) : null}
                    <p className="mt-2 max-w-[36rem] text-[0.88rem] leading-[1.65] text-[#8d93a1]">
                      {award.summary}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 border-t border-white/10 pt-7">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
                Certification
              </p>
              <ul className="mt-4 grid gap-5">
                {certifications.map((certification) => (
                  <li key={certification.id}>
                    <p className="text-[1rem] font-medium leading-snug text-[#e2e5ec]">
                      {certification.name}
                    </p>
                    <p className="mt-1 text-[0.84rem] text-white/55">
                      {certification.issuer} · {certification.displayDate}
                    </p>
                    <p className="mt-2 max-w-[36rem] text-[0.88rem] leading-[1.65] text-[#8d93a1]">
                      {certification.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Band>

          <Band id="focus" index="04" title="Technical Focus">
            {/* Two up until xl. Inside the band's value column three tracks
                left each one about 155px wide at lg, which broke every skill
                list onto five lines. */}
            <dl className="grid gap-7 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-8 xl:gap-10">
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

          <Band id="skills" index="05" title="Skills">
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
                  <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent-indigo-soft/85">
                    {group.category}
                  </dt>
                  <dd className="text-[0.9rem] leading-[1.7] text-[#a0a6b4]">
                    {group.skills.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Band>

          <Band id="how-i-work" index="06" title="How I Work">
            <ol className="grid gap-8 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-9">
              {workingPrinciples.map((principle, index) => (
                <li key={principle.title}>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.66rem] tracking-[0.14em] text-white/55"
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

          <Band id="journey" index="07" title="Selected Journey">
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
                  <div className="grid min-w-0 gap-x-10 gap-y-1 sm:grid-cols-[11rem_minmax(0,1fr)]">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/55 sm:pt-[0.15rem]">
                      {entry.dates}
                    </p>
                    <div>
                      <Link
                        href={`/experience/${entry.slug}`}
                        className="block rounded-sm text-[0.98rem] font-medium leading-snug text-[#e2e5ec] transition-colors outline-none hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                      >
                        {entry.organization}
                      </Link>
                      <p className="mt-1 text-[0.88rem] leading-[1.5] text-accent-indigo-soft/85">
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
              All ten roles, including earlier experience
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Band>

          <Band id="volunteering" index="08" title="Volunteering">
            <ol className="grid gap-7">
              {volunteering.map((role) => (
                <li
                  key={role.id}
                  className="grid gap-x-10 gap-y-1.5 sm:grid-cols-[11rem_minmax(0,1fr)]"
                >
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/55 sm:pt-[0.2rem]">
                    {role.displayDates}
                  </p>
                  <div>
                    <p className="text-[1rem] font-medium leading-snug text-[#e2e5ec]">
                      {role.organization}
                    </p>
                    <p className="mt-1 text-[0.88rem] text-accent-indigo-soft/85">
                      {role.role}
                      {role.location ? (
                        <span className="text-white/55"> · {role.location}</span>
                      ) : null}
                    </p>
                    <p className="mt-2.5 max-w-[36rem] text-[0.88rem] leading-[1.65] text-[#8d93a1]">
                      {role.summary}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
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
              className="max-w-[32rem] text-[1.35rem] font-medium leading-snug tracking-[-0.015em] text-[#e2e5ec]"
            >
              Interested in reliable software, applied ML, or quantitative
              systems?
            </h2>
            <p className="mt-3 max-w-[38rem] text-[0.95rem] leading-[1.7] text-[#8d93a1]">
              I am open to internship, research, and collaborative opportunities
              where careful engineering and measurable evidence matter.{" "}
              {availability}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/projects" className={ctaClass("primary", "sm")}>
              View Projects
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link href="/experience" className={ctaClass("secondary", "sm")}>
              View Experience
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              href={contactLinks.emailHref}
              className={ctaClass("secondary", "sm")}
            >
              Email Jacob
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
            <MapPin
              aria-hidden="true"
              className="size-[0.9rem] shrink-0 text-white/55"
            />
            {aboutContact.institution}
          </li>
          <li>
            <a
              href={contactLinks.emailHref}
              className="flex items-center gap-2.5 rounded-sm transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
            >
              <Mail
                aria-hidden="true"
                className="size-[0.9rem] shrink-0 text-white/55"
              />
              Email {profile.displayName.split(" ")[0]}
            </a>
          </li>
        </ul>
      </div>

      <Footer className={pageGutters.railed} />
    </div>
  );
}
