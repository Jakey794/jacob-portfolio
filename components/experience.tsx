import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { experience } from "@/lib/experience";
import { ArrowLink } from "@/components/cta-link";
import { SectionHeading } from "@/components/section-heading";
import { HomeSection } from "@/components/section-shell";

/**
 * Experience reads as a progression, so it is drawn as a timeline: one
 * continuous rail down the left with a node per role, rather than a stack of
 * separate cards. Each entry links to its own page.
 */
export function Experience() {
  return (
    <HomeSection id="experience" labelledBy="experience-title" glow="left">
      <SectionHeading
        index="04"
        eyebrow="Experience / Proof"
        title="Research, ML engineering, and quant work"
        id="experience-title"
        aside={
          <ArrowLink href="/experience" className="hidden lg:inline-flex">
            Full experience
          </ArrowLink>
        }
      >
        <p>
          Proof across RF signal classification, customer-personalization ML,
          portfolio/risk modeling, and thesis-driven quantitative work.
        </p>
      </SectionHeading>

      <ol className="relative mt-12 lg:mt-14">
        {/* The rail. Stops short at both ends so it reads as a segment of a
            longer track rather than a box edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[4px] top-3 bottom-8 hidden w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.16)_8%,rgba(255,255,255,0.16)_88%,transparent)] sm:block"
        />

        {experience.map((item) => (
          <li
            key={item.slug}
            className="group relative border-t border-white/10 first:border-t-0 sm:pl-10"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-[2.15rem] hidden size-[9px] rounded-full border border-accent-indigo/70 bg-accent-indigo transition-transform duration-300 group-hover:scale-125 sm:block"
            />

            {/* The whole row is clickable via the title link's ::after
                overlay. Wrapping the row in the anchor instead would give it
                an accessible name made of every bullet in the entry. */}
            <div className="grid gap-6 py-8 lg:grid-cols-[19rem_1fr] lg:gap-14">
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white/40">
                  {item.dates}
                </p>
                <h3 className="mt-3 text-[1.12rem]/[1.4] font-medium text-[#e4e7ed] transition-colors group-hover:text-white">
                  <Link
                    href={`/experience/${item.slug}`}
                    className="rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    {item.organization}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.9rem] leading-[1.5] text-accent-indigo-soft">
                  {item.role}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.tools.slice(0, 4).map((tool) => (
                    <li
                      key={tool}
                      className="border border-white/12 px-2 py-[0.2rem] text-[0.7rem] text-[#9299a7]"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <ul className="grid gap-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6rem] size-[4px] shrink-0 rounded-full bg-accent-indigo-soft/60"
                      />
                      <span className="text-[0.93rem] leading-[1.7] text-[#a2a8b5]">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <span
                  aria-hidden="true"
                  className="mt-5 inline-flex items-center gap-2.5 text-[0.86rem] text-white/40 transition-colors group-hover:text-accent-indigo-soft"
                >
                  Read the detail
                  <ArrowRight className="size-[0.9rem] transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <ArrowLink href="/experience" className="mt-8 lg:hidden">
        Full experience
      </ArrowLink>
    </HomeSection>
  );
}
