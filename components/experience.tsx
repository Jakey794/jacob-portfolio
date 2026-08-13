import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { experience } from "@/lib/experience";
import { ArrowLink } from "@/components/cta-link";
import { SectionHeading } from "@/components/section-heading";
import { HomeSection, TechLine } from "@/components/section-shell";

/**
 * Experience reads as a progression, so it is drawn as a timeline: one
 * continuous rail down the left with a node per role, rather than a stack of
 * separate cards. Each entry links to its own page.
 *
 * The bullet column is held to a reading measure. Left to fill `1fr` it ran to
 * eleven hundred pixels on a wide display — the only place on the page where
 * the type was set to the window rather than to the eye.
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

      {/* The rules live on the list, not on `first:`: the rail below is the
          list's first child, so a `first:border-t-0` on the entries matched
          nothing and the opening row drew a border it was meant to suppress. */}
      <ol className="relative mt-14 border-t border-white/10 lg:mt-[4.5rem]">
        {/* The rail. Stops short at both ends so it reads as a segment of a
            longer track rather than a box edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[4px] top-8 bottom-10 hidden w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.16)_8%,rgba(255,255,255,0.16)_88%,transparent)] sm:block"
        />

        {experience.map((item) => (
          <li
            key={item.slug}
            className="group relative border-b border-white/10 sm:pl-11"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-[2.6rem] hidden size-[9px] rounded-full border border-accent-indigo/70 bg-accent-indigo transition-transform duration-300 group-hover:scale-125 sm:block"
            />

            {/* The whole row is clickable via the title link's ::after
                overlay. Wrapping the row in the anchor instead would give it
                an accessible name made of every bullet in the entry. */}
            <div className="grid gap-6 py-9 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16 lg:py-11">
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white/40">
                  {item.dates}
                </p>
                <h3 className="mt-3.5 text-[1.15rem]/[1.4] font-medium text-[#e4e7ed] transition-colors group-hover:text-white">
                  <Link
                    href={`/experience/${item.slug}`}
                    className="rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    {item.organization}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.92rem] leading-[1.5] text-accent-indigo-soft">
                  {item.role}
                </p>

                <TechLine
                  items={item.tools.slice(0, 4)}
                  className="mt-4 text-[0.79rem]"
                />
              </div>

              <div className="max-w-[44rem]">
                <ul className="grid gap-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.62rem] size-[4px] shrink-0 rounded-full bg-accent-indigo-soft/60"
                      />
                      <span className="text-[0.93rem] leading-[1.72] text-[#a2a8b5]">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <span
                  aria-hidden="true"
                  className="mt-6 inline-flex items-center gap-2.5 text-[0.86rem] text-white/40 transition-colors group-hover:text-accent-indigo-soft"
                >
                  Read the detail
                  <ArrowRight className="size-[0.9rem] transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <ArrowLink href="/experience" className="mt-10 lg:hidden">
        Full experience
      </ArrowLink>
    </HomeSection>
  );
}
