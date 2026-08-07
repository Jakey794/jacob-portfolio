import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  GraduationCap,
  Mail,
  MapPin,
  Route,
  Sparkles,
  Target,
  User,
} from "lucide-react";

import { Panel, PanelText } from "@/components/case-study/panel";
import { Footer } from "@/components/footer";
import { PageAtmosphere } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { SiteNav } from "@/components/site-nav";
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

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere height="h-[24rem] lg:h-[30rem]" />
      <SiteNav active="about" />
      <PageDecorTop />

      <main className="relative z-10 px-6 pb-28 pt-[6.5rem] sm:px-10 sm:pt-[6.75rem] lg:pb-32 lg:pl-[5%] lg:pr-[5%] lg:pt-[6.2rem] xl:pr-[15.5%]">
        {/* ---------------------------------------------------------- masthead */}
        <PageEyebrow index="01" label="About" />

        <PageTitle size="page" className="mt-0.5">
          About
        </PageTitle>

        <p className="mt-0 max-w-[33rem] text-[1.22rem] leading-[1.18] text-[#ccd1da] lg:text-[1.32rem]">
          {aboutLede}
        </p>

        {/* The masthead carries the first paragraph; the Bio panel picks up
            the second, so neither repeats the other. */}
        <p className="mt-3 max-w-[33rem] text-[0.93rem] leading-[1.38] text-[#9299a7]">
          {aboutBody[0]}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {aboutTags.map((tag) => (
            <li
              key={tag}
              className="border border-accent-indigo-soft/25 bg-accent-indigo-soft/[0.07] px-2.5 py-1 text-[0.74rem] text-accent-indigo-soft/85"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* ------------------------------------------------------ first band */}
        <div className="mt-8 grid gap-px bg-white/10 lg:mt-5 lg:grid-cols-[0.95fr_1fr_1.15fr]">
          <Panel
            id="overview"
            title="Bio"
            icon={User}
            className="border-0 p-5 sm:p-6"
          >
            <PanelText>{aboutBody[1]}</PanelText>

            <ul className="mt-5 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
              {aboutStats.map((stat) => (
                <li key={stat.label}>
                  <Link
                    href={stat.href}
                    className="group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <span className="block text-[1.5rem] font-medium leading-none tracking-[-0.02em] text-accent-indigo-soft transition-colors group-hover:text-white">
                      {stat.value}
                    </span>
                    <span className="mt-2 block text-[0.72rem] leading-[1.4] text-[#8d93a1]">
                      {stat.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            id="education"
            title="Education"
            icon={GraduationCap}
            className="border-0 p-5 sm:p-6"
          >
            <p className="text-[1.05rem] font-medium leading-snug text-accent-indigo-soft">
              {education.programme}
            </p>
            <p className="mt-1.5 text-[0.9rem] text-[#a0a6b4]">
              {education.institution}
            </p>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/35">
                Honour
              </p>
              <p className="mt-2.5 text-[0.95rem] text-[#dfe2e9]">
                {education.honour}
              </p>
            </div>

            <a
              href={aboutContact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 rounded-sm text-[0.88rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              View résumé
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </Panel>

          <Panel
            id="focus"
            title="Technical Focus"
            icon={Target}
            className="border-0 p-5 sm:p-6"
          >
            <ul className="divide-y divide-white/8">
              {technicalFocus.map((area, index) => (
                <li
                  key={area.title}
                  className={index === 0 ? "pb-3" : "py-3 last:pb-0"}
                >
                  <p className="text-[0.92rem] font-medium text-accent-indigo-soft">
                    {area.title}
                  </p>
                  <p className="mt-1.5 text-[0.82rem] leading-[1.55] text-[#8d93a1]">
                    {area.skills.slice(0, 4).join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* ----------------------------------------------------- second band */}
        <div className="mt-6 grid gap-px bg-white/10 lg:mt-8 lg:grid-cols-[0.95fr_1.15fr_1fr]">
          <Panel
            id="skills"
            title="Skills"
            icon={Compass}
            className="border-0 p-5 sm:p-6"
          >
            {/* Label/value rows rather than chips: chips wrap to several
                lines and blow past the density the concept sets. The full
                list stays on the homepage stack section. */}
            <ul className="divide-y divide-white/8">
              {skillGroups.map((group, index) => (
                <li
                  key={group.category}
                  className={index === 0 ? "pb-3" : "py-3 last:pb-0"}
                >
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent-indigo-soft/70">
                    {group.category}
                  </p>
                  <p className="mt-1 text-[0.8rem] leading-[1.5] text-[#8d93a1]">
                    {group.skills.slice(0, 5).join(", ")}
                    {group.skills.length > 5 ? (
                      <span className="text-white/30">
                        {` +${group.skills.length - 5}`}
                      </span>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            id="how-i-work"
            title="How I Work"
            icon={Sparkles}
            className="border-0 p-5 sm:p-6"
          >
            <ul className="grid gap-3.5">
              {workingPrinciples.map((principle) => (
                <li key={principle.title}>
                  <p className="text-[0.88rem] font-medium leading-snug text-[#dfe2e9]">
                    {principle.title}
                  </p>
                  {/* Source runs inline with the evidence so each principle
                      stays a two-line block. */}
                  <p className="mt-1 text-[0.79rem] leading-[1.5] text-[#8d93a1]">
                    {principle.evidence}{" "}
                    <Link
                      href={principle.href}
                      className="whitespace-nowrap rounded-sm text-accent-indigo-soft/80 transition-colors outline-none hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
            </ul>
          </Panel>

          <Panel
            id="journey"
            title="Selected Journey"
            icon={Route}
            className="border-0 p-5 sm:p-6"
          >
            <ol className="relative grid gap-5">
              <span
                aria-hidden="true"
                className="absolute left-[4px] top-2 bottom-3 w-px bg-white/12"
              />
              {journey.map((entry) => (
                <li key={entry.slug} className="relative flex gap-4">
                  <span
                    aria-hidden="true"
                    className="relative z-10 mt-[0.35rem] size-[9px] shrink-0 rounded-full border border-accent-indigo/70 bg-accent-indigo"
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-[0.7rem] tracking-[0.06em] text-white/40">
                      {entry.dates}
                    </p>
                    <Link
                      href={`/experience/${entry.slug}`}
                      className="mt-1 block rounded-sm text-[0.9rem] font-medium leading-snug text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      {entry.role}
                    </Link>
                    <p className="mt-1 text-[0.8rem] leading-[1.5] text-[#8d93a1]">
                      {entry.organization}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href="/experience"
              className="mt-6 inline-flex items-center gap-2.5 rounded-sm text-[0.85rem] text-white/55 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Full experience
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Panel>
        </div>

        {/* --------------------------------------------------------- cta bar */}
        <section
          aria-labelledby="about-cta-title"
          className="mt-6 flex flex-col gap-6 border border-white/10 bg-[#090c13]/60 p-6 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:p-7"
        >
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center border border-accent-indigo-soft/25 bg-accent-indigo-soft/[0.07] text-accent-indigo-soft"
            >
              <Mail className="size-[1.1rem]" />
            </span>
            <div>
              <h2
                id="about-cta-title"
                className="text-[1.02rem] font-medium text-[#e2e5ec]"
              >
                Open to interesting problems and collaborations.
              </h2>
              <p className="mt-1.5 max-w-[42rem] text-[0.86rem] leading-[1.55] text-[#8d93a1]">
                {availability}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex h-[2.9rem] items-center justify-center gap-3 rounded-md bg-accent-indigo px-6 text-[0.95rem] text-white transition-colors outline-none hover:bg-accent-indigo/85 focus-visible:ring-2 focus-visible:ring-accent-indigo-soft focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View Projects
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              href={`mailto:${aboutContact.email}`}
              className="inline-flex h-[2.9rem] items-center justify-center gap-3 rounded-md border border-white/18 px-6 text-[0.95rem] text-white transition-colors outline-none hover:border-white/40 hover:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-accent-indigo-soft focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get In Touch
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </section>

        <PageDecorFoot />
      </main>

      {/* Section rail + contact meta, mirroring the concept's right column. */}
      <div className="absolute right-[3.2%] top-[15.5rem] z-20 hidden xl:block">
        <nav aria-label="About sections">
          <span
            aria-hidden="true"
            className="absolute left-[4px] top-1.5 h-[19rem] w-px bg-white/15"
          />
          <ol className="relative flex flex-col gap-[2.05rem]">
            {aboutSections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex items-start gap-[1.1rem] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
                >
                  <span
                    aria-hidden="true"
                    className={
                      index === 0
                        ? "mt-[0.3rem] size-[9px] shrink-0 rounded-full border border-accent-indigo bg-accent-indigo"
                        : "mt-[0.3rem] size-[9px] shrink-0 rounded-full border border-white/35 bg-background transition-colors group-hover:border-white/70"
                    }
                  />
                  <span>
                    <span className="block font-mono text-[0.74rem] tracking-[0.1em] text-white/40">
                      {section.index}
                    </span>
                    <span
                      className={
                        index === 0
                          ? "mt-0.5 block text-[0.85rem] text-accent-indigo-soft"
                          : "mt-0.5 block text-[0.85rem] text-white/55 transition-colors group-hover:text-white/85"
                      }
                    >
                      {section.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

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

      <Footer />
    </div>
  );
}
