import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  FileText,
  GitBranch,
  GraduationCap,
  Link2,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { SectionRail, anchorSections } from "@/components/section-rail";
import { SiteNav } from "@/components/site-nav";
import {
  availabilityStatement,
  contactSections,
  contactTags,
  emailChannel,
  linkChannels,
  openTo,
  universityBase,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact | Jacob Allan",
  description: availabilityStatement,
  openGraph: {
    title: "Contact | Jacob Allan",
    description: availabilityStatement,
    type: "website",
  },
};

/** lucide-react v1 has no brand glyphs; the repo already substitutes these. */
const channelIcons = {
  linkedin: Link2,
  github: GitBranch,
  resume: FileText,
} as const;

/**
 * The closing page.
 *
 * Everything here is set at the lowest density on the site: no bordered
 * panels, no icon tiles, one rule between bands and a single large address.
 * The page previously carried seven boxes across three grids, two of which
 * relisted destinations that were already on screen — the duplicate channel
 * list is gone and the rest is drawn as rows, so the last thing a reader sees
 * is mostly space.
 */
export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.contact} />
      <SiteNav active="contact" />

      <main className="relative z-10 px-6 pb-32 pt-[8.5rem] sm:px-10 md:pt-[7.1rem] lg:pb-40 lg:pl-[5%] lg:pr-[5%] xl:pr-[15.5%]">
        {/* ---------------------------------------------------------- masthead */}
        <div id="overview" className="scroll-mt-28">
          <PageEyebrow index="05" label="Contact" />

          <PageTitle size="page" className="mt-2">
            <span className="block">Let&rsquo;s build</span>
            something difficult
          </PageTitle>

          <p className="mt-6 max-w-[36rem] text-[1.08rem] leading-[1.7] text-[#a2a8b5] lg:text-[1.14rem]">
            {availabilityStatement}
          </p>

          {/* Only facts the repo records. Location, response window, timezone and
            preferred channel are deliberately absent — see lib/contact.ts. */}
          <ul className="mt-7 flex flex-wrap items-center gap-x-9 gap-y-3 text-[0.86rem] text-[#9299a7]">
            <li className="inline-flex items-center gap-2.5">
              <GraduationCap
                aria-hidden="true"
                className="size-[0.95rem] text-white/35"
              />
              {universityBase.programme}, {universityBase.institution}
            </li>
            <li className="inline-flex items-center gap-2.5">
              <CalendarCheck
                aria-hidden="true"
                className="size-[0.95rem] text-white/35"
              />
              Open to opportunities
            </li>
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {contactTags.map((tag) => (
              <li
                key={tag}
                className="border border-accent-indigo-soft/25 bg-accent-indigo-soft/[0.07] px-2.5 py-1 text-[0.74rem] text-accent-indigo-soft/85"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ email */}
        {/* The one loud element on the page, and the only thing a recruiter
            actually needs: the address, at display scale, on nothing. */}
        <section
          id="reach-out"
          aria-labelledby="reach-out-title"
          className="mt-20 scroll-mt-28 border-t border-white/10 pt-10 lg:mt-24"
        >
          <h2
            id="reach-out-title"
            className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/35"
          >
            {emailChannel.label}
          </h2>

          <a
            href={emailChannel.href}
            className="group mt-5 inline-flex max-w-full flex-wrap items-center gap-x-5 gap-y-2 rounded-sm text-[clamp(1.5rem,3.6vw,2.7rem)] leading-[1.15] tracking-[-0.025em] text-[#e2e5ec] transition-colors outline-none hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span className="break-all">{emailChannel.text}</span>
            <ArrowRight
              aria-hidden="true"
              className="size-[1.6rem] shrink-0 text-accent-indigo-soft transition-transform duration-200 group-hover:translate-x-1.5"
            />
          </a>

          <p className="mt-5 max-w-[32rem] text-[0.95rem] leading-[1.7] text-[#8d93a1]">
            {emailChannel.description}
          </p>
        </section>

        {/* ------------------------------------------------------------ links */}
        <section
          id="links"
          aria-labelledby="links-title"
          className="mt-16 scroll-mt-28 lg:mt-20"
        >
          <h2 id="links-title" className="sr-only">
            Links
          </h2>

          <ul className="border-t border-white/10">
            {linkChannels.map((channel) => {
              const Icon = channelIcons[channel.key as keyof typeof channelIcons];

              return (
                <li key={channel.key} className="border-b border-white/10">
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex flex-wrap items-center gap-x-8 gap-y-2 rounded-sm py-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <span className="flex w-[9rem] shrink-0 items-center gap-3">
                      <Icon
                        aria-hidden="true"
                        className="size-[1rem] shrink-0 text-white/35 transition-colors group-hover:text-accent-indigo-soft"
                      />
                      <span className="text-[1rem] font-medium text-[#dfe2e9]">
                        {channel.label}
                      </span>
                    </span>

                    <span className="min-w-0 flex-1 text-[0.9rem] leading-[1.6] text-[#8d93a1]">
                      {channel.description}
                    </span>

                    <span className="inline-flex shrink-0 items-center gap-2 text-[0.88rem] text-accent-indigo-soft/85 transition-colors group-hover:text-white">
                      {channel.text}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-[0.9rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ----------------------------------------------------- availability */}
        <section
          id="availability"
          aria-labelledby="availability-title"
          className="mt-16 grid scroll-mt-28 gap-8 border-t border-white/10 pt-10 lg:mt-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16"
        >
          <h2
            id="availability-title"
            className="text-[0.95rem] font-medium text-[#dfe2e9]"
          >
            Open to
          </h2>

          <ul className="flex flex-wrap gap-x-12 gap-y-3.5">
            {openTo.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[0.95rem] text-[#a0a6b4]"
              >
                <span
                  aria-hidden="true"
                  className="size-[5px] shrink-0 rounded-full bg-accent-indigo-soft/70"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- closing */}
        <section
          id="next"
          aria-labelledby="contact-next-title"
          className="mt-16 flex scroll-mt-28 flex-col gap-8 border-t border-white/10 pt-10 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div>
            <h2
              id="contact-next-title"
              className="text-[1.35rem] font-medium leading-snug tracking-[-0.015em] text-[#e2e5ec]"
            >
              Thanks for stopping by.
            </h2>
            <p className="mt-3 max-w-[34rem] text-[0.95rem] leading-[1.7] text-[#8d93a1]">
              If you think we could build something meaningful together, I&rsquo;d
              love to hear from you.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex h-[2.9rem] items-center justify-center gap-3 rounded-md bg-accent-indigo px-6 text-[0.95rem] text-white transition-colors outline-none hover:bg-accent-indigo/85 focus-visible:ring-2 focus-visible:ring-accent-indigo-soft focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View Projects
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex h-[2.9rem] items-center justify-center gap-3 rounded-md border border-white/18 px-6 text-[0.95rem] text-white transition-colors outline-none hover:border-white/40 hover:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-accent-indigo-soft focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Back to Home
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>

        <PageDecorFoot />
      </main>

      <SectionRail
        variant="labelled"
        gap="2.1rem"
        sections={anchorSections(contactSections)}
        className="absolute right-[3.2%] top-[18rem] z-20 hidden xl:block"
      />

      <Footer />
    </div>
  );
}
