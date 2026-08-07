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
  Mail,
  MapPin,
  MessageSquare,
  Mountain,
} from "lucide-react";

import { Panel } from "@/components/case-study/panel";
import { Footer } from "@/components/footer";
import { PageAtmosphere } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
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

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere height="h-[26rem] lg:h-[32rem]" />
      <SiteNav active="contact" />
      <PageDecorTop />

      <main className="relative z-10 px-6 pb-28 pt-[6.5rem] sm:px-10 sm:pt-[6.75rem] lg:pb-32 lg:pl-[4.5%] lg:pr-[5%] lg:pt-[6.2rem] xl:pr-[12.6%]">
        {/* ---------------------------------------------------------- masthead */}
        <div id="overview" className="scroll-mt-28">
          <PageEyebrow index="05" label="Contact" />

          <PageTitle size="page" className="mt-0.5">
            <span className="block">Let&rsquo;s build</span>
            something difficult
          </PageTitle>

          <p className="mt-3 max-w-[38rem] text-[1.02rem] leading-[1.55] text-[#a2a8b5] lg:text-[1.06rem]">
            {availabilityStatement}
          </p>

          {/* Only facts the repo records. Location, response window, timezone and
            preferred channel are deliberately absent — see lib/contact.ts. */}
          <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.86rem] text-[#9299a7]">
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

          <ul className="mt-4 flex flex-wrap gap-2">
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

        {/* --------------------------------------------- email + link panels */}
        {/* The concept's 4-across row only has room from xl; below that the
            email card takes its own row so the link cards stay readable. */}
        <div className="mt-8 grid gap-px bg-white/10 lg:grid-cols-3 xl:grid-cols-[2.85fr_1fr_1fr_1fr]">
          <section
            id="reach-out"
            aria-labelledby="reach-out-title"
            className="relative scroll-mt-28 overflow-hidden bg-[#090c13]/60 p-5 lg:col-span-3 xl:col-span-1"
          >
            <div className="flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center border border-white/15 text-accent-indigo-soft"
              >
                <Mail className="size-[1.05rem]" />
              </span>
              <h2
                id="reach-out-title"
                className="text-[1rem] font-medium text-[#dfe2e9]"
              >
                {emailChannel.label}
              </h2>
            </div>

            <a
              href={emailChannel.href}
              className="group mt-3 inline-flex flex-wrap items-center gap-3 rounded-sm text-[1.3rem] leading-tight tracking-[-0.015em] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-[1.45rem]"
            >
              {emailChannel.text}
              <ArrowRight
                aria-hidden="true"
                className="size-[1.15rem] shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>

            <p className="mt-3 max-w-[26rem] text-[0.86rem] leading-[1.55] text-[#8d93a1]">
              {emailChannel.description}
            </p>

            {/* Faint wireframe echo of the concept's decorative mesh. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 right-0 h-32 w-56 bg-[radial-gradient(circle_at_70%_80%,rgba(133,144,246,0.10),transparent_65%)]"
            />
          </section>

          {linkChannels.map((channel, index) => {
            const Icon = channelIcons[channel.key as keyof typeof channelIcons];

            return (
              <section
                key={channel.key}
                id={index === 0 ? "links" : undefined}
                aria-labelledby={`${channel.key}-title`}
                className="group scroll-mt-28 bg-[#090c13]/60 p-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center border border-white/15 text-[#dfe2e9]"
                  >
                    <Icon className="size-[1rem]" />
                  </span>
                  <h2
                    id={`${channel.key}-title`}
                    className="text-[0.98rem] font-medium text-[#dfe2e9]"
                  >
                    {channel.label}
                  </h2>
                </div>

                <p className="mt-3 text-[0.82rem] leading-[1.55] text-[#8d93a1]">
                  {channel.description}
                </p>

                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-4 inline-flex items-center gap-2 rounded-sm text-[0.85rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  {channel.action}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-[0.9rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </section>
            );
          })}
        </div>

        {/* ------------------------------------------------ information rows */}
        <div className="mt-6 grid gap-px bg-white/10 lg:grid-cols-[2fr_1.16fr_1fr]">
          <Panel
            id="availability"
            title="Availability / What I'm Open To"
            icon={CalendarCheck}
            className="border-0 p-5"
            bodyClassName="mt-4"
          >
            <ul className="grid gap-1.5 sm:grid-cols-2 sm:gap-x-8">
              {openTo.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="size-[5px] shrink-0 rounded-full bg-accent-indigo-soft/70"
                  />
                  <span className="text-[0.86rem] leading-[1.5] text-[#a0a6b4]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            id="channels"
            title="Ways to Reach Out"
            icon={MessageSquare}
            className="border-0 p-5"
            bodyClassName="mt-4"
          >
            <ul className="grid gap-1.5">
              {[emailChannel, ...linkChannels].map((channel) => (
                <li key={channel.key}>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-3 rounded-sm text-[0.86rem] text-[#a0a6b4] transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <ArrowRight
                      aria-hidden="true"
                      className="size-[0.85rem] shrink-0 text-accent-indigo-soft/60 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                    <span className="min-w-0 truncate">{channel.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            id="university"
            title="University"
            icon={GraduationCap}
            className="border-0 p-5"
            bodyClassName="mt-4"
          >
            <ul className="grid gap-1.5 text-[0.85rem] text-[#a0a6b4]">
              <li className="flex items-center gap-2.5">
                <GraduationCap
                  aria-hidden="true"
                  className="size-[0.9rem] shrink-0 text-white/35"
                />
                {universityBase.institution}
              </li>
              <li className="flex items-center gap-2.5">
                <FileText
                  aria-hidden="true"
                  className="size-[0.9rem] shrink-0 text-white/35"
                />
                {universityBase.programme}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin
                  aria-hidden="true"
                  className="size-[0.9rem] shrink-0 text-white/35"
                />
                {universityBase.campus}
              </li>
            </ul>

            <p className="mt-3 border-t border-white/10 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/30">
              {universityBase.coordinates}
            </p>
          </Panel>
        </div>

        {/* --------------------------------------------------------- cta strip */}
        <section
          id="next"
          aria-labelledby="contact-next-title"
          className="mx-auto mt-6 flex max-w-[68rem] scroll-mt-28 flex-col gap-6 border border-white/10 bg-[#090c13]/60 p-6 lg:flex-row lg:items-center lg:justify-between lg:py-4"
        >
          <div className="flex items-center gap-4">
            <Mountain
              aria-hidden="true"
              className="size-7 shrink-0 text-white/25"
            />
            <div>
              <h2
                id="contact-next-title"
                className="text-[0.98rem] font-medium text-[#e2e5ec]"
              >
                Thanks for stopping by.
              </h2>
              <p className="mt-1 text-[0.85rem] leading-[1.5] text-[#8d93a1]">
                If you think we could build something meaningful together,
                I&rsquo;d love to hear from you.
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

      {/* Numbered rail, mirroring the concept's right column. */}
      <nav
        aria-label="Contact sections"
        className="absolute right-[3.4%] top-[17.5rem] z-20 hidden xl:block"
      >
        <span
          aria-hidden="true"
          className="absolute left-[4px] top-1.5 bottom-1.5 w-px bg-white/15"
        />
        <ol className="relative flex flex-col gap-[2.1rem]">
          {contactSections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-[1.15rem] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
              >
                <span
                  aria-hidden="true"
                  className={
                    index === 0
                      ? "size-[9px] shrink-0 rounded-full border border-accent-indigo bg-accent-indigo"
                      : "size-[9px] shrink-0 rounded-full border border-white/35 bg-background transition-colors group-hover:border-white/70"
                  }
                />
                <span
                  className={
                    index === 0
                      ? "text-[0.88rem] text-accent-indigo-soft"
                      : "text-[0.88rem] text-white/50 transition-colors group-hover:text-white/85"
                  }
                >
                  {section.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Footer />
    </div>
  );
}
