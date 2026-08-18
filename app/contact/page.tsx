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

import { ctaClass } from "@/components/cta-link";
import { Footer } from "@/components/footer";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { SectionRail, anchorSections } from "@/components/section-rail";
import { TechLine, pageGutters } from "@/components/section-shell";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";
import {
  availabilityStatement,
  contactHeadline,
  contactLede,
  contactSections,
  contactTags,
  emailChannel,
  linkChannels,
  openTo,
  universityBase,
} from "@/lib/contact";
import { absoluteUrl } from "@/lib/site";

const description =
  "Contact Jacob Allan about software engineering, machine learning, quantitative systems, research, or internship opportunities.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: "Contact | Jacob Allan",
    description,
    url: absoluteUrl("/contact"),
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/og/contact.jpg"),
        width: 1200,
        height: 630,
        alt: "Contact Jacob Allan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Jacob Allan",
    description,
    images: [absoluteUrl("/images/og/contact.jpg")],
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

      <main
        id="main-content"
        className={cn(
          "relative z-10 pb-28 pt-[8.5rem] md:pt-[7.1rem] lg:pb-24",
          pageGutters.railed
        )}
      >
        {/* ---------------------------------------------------------- masthead */}
        <div id="overview" className="scroll-mt-28">
          <PageEyebrow index="05" label="Contact" />

          <PageTitle size="page" className="mt-2">
            {contactHeadline}
          </PageTitle>

          <p className="mt-6 max-w-[36rem] text-[1.08rem] leading-[1.7] text-[#a2a8b5] lg:text-[1.14rem]">
            {contactLede}
          </p>

          <p className="mt-5 max-w-[36rem] text-[0.98rem] leading-[1.72] text-[#8d93a1]">
            {availabilityStatement}
          </p>

          {/* Only facts the source evidence supports. No response window, no
              timezone, no phone number, no address — see lib/contact.ts. */}
          <ul className="mt-7 flex flex-wrap items-center gap-x-9 gap-y-3 text-[0.86rem] text-[#9299a7]">
            <li className="inline-flex items-center gap-2.5">
              <GraduationCap
                aria-hidden="true"
                className="size-[0.95rem] text-white/55"
              />
              {universityBase.programme}, {universityBase.institution}
            </li>
            <li className="inline-flex items-center gap-2.5">
              <CalendarCheck
                aria-hidden="true"
                className="size-[0.95rem] text-white/55"
              />
              Open to opportunities
            </li>
          </ul>

          {/* Set as a line, not as chips: this is the calmest page on the
              site and four bordered rectangles were the only boxes on it. */}
          <TechLine
            items={contactTags}
            className="mt-6 text-[0.95rem] text-accent-indigo-soft/85"
          />
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
            className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/55"
          >
            {emailChannel.label}
          </h2>

          <a
            href={emailChannel.href}
            /* The gap tightens below sm so the address and its arrow still
               share a line at 390px instead of the arrow dropping under the
               address on a line of its own. */
            className="group mt-5 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-2 rounded-sm text-[clamp(1.5rem,3.6vw,2.7rem)] leading-[1.15] tracking-[-0.025em] text-[#e2e5ec] transition-colors outline-none hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:gap-x-5"
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
                    /* Stacked below sm. Wrapping, the résumé row kept its
                       short destination on the first line and squeezed the
                       description into a sixty-pixel column that set one word
                       per line, eleven lines deep. */
                    className="group flex flex-col gap-2.5 rounded-sm py-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2"
                  >
                    <span className="flex items-center gap-3 sm:w-[9rem] sm:shrink-0">
                      <Icon
                        aria-hidden="true"
                        className="size-[1rem] shrink-0 text-white/55 transition-colors group-hover:text-accent-indigo-soft"
                      />
                      <span className="text-[1rem] font-medium text-[#dfe2e9]">
                        {channel.label}
                      </span>
                    </span>

                    <span className="min-w-0 text-[0.9rem] leading-[1.6] text-[#8d93a1] sm:flex-1">
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
              If you are building something where careful engineering and
              measurable evidence matter, I&rsquo;d like to hear about it.
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
            <Link
              href="/"
              className={ctaClass("secondary", "sm")}
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

      <Footer className={pageGutters.railed} />
    </div>
  );
}
