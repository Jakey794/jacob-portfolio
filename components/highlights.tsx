import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { HomeSection } from "@/components/section-shell";
import { homeHighlights } from "@/lib/about";

/**
 * The band directly under the hero.
 *
 * Four credentials, each a link to the record that evidences it. This replaced
 * a row of test counts — 1,286 PostgreSQL-backed tests, 221 backend tests, 247
 * CI tests, 150K samples. Those numbers are real and they are still on the
 * pages that own them, with their methodology attached; they were simply the
 * wrong four facts to put in the first screen, where a reader is deciding who
 * this is rather than auditing a suite.
 *
 * Entries stagger in on a short delay so the row assembles left to right
 * rather than appearing as a block.
 */
export function Highlights() {
  return (
    <HomeSection
      labelledBy="highlights-title"
      className="py-[3.25rem] sm:py-[3.75rem] lg:py-[4.25rem]"
    >
      <h2 id="highlights-title" className="sr-only">
        Credentials and current work
      </h2>

      <ul className="grid gap-x-10 gap-y-9 border-y border-white/10 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:py-9">
        {homeHighlights.map((item, index) => (
          <Reveal
            as="li"
            key={item.href}
            delay={Math.min(index * 0.06, 0.18)}
          >
            <Link
              href={item.href}
              className="group flex h-full flex-col rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-[1.35rem] font-medium leading-tight tracking-[-0.022em] text-accent-indigo-soft transition-colors duration-300 group-hover:text-white lg:text-[1.5rem]">
                  {item.value}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-1 size-[0.9rem] shrink-0 text-white/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-indigo-soft"
                />
              </span>
              <span className="mt-3 block text-[0.84rem] leading-[1.5] text-[#9299a7]">
                {item.label}
              </span>
              {/* Underline grows from the left on hover — the same affordance
                  the nav uses, so the row reads as navigation rather than as
                  four statistics. */}
              <span
                aria-hidden="true"
                className="mt-4 block h-px w-0 bg-accent-indigo-soft/60 transition-all duration-500 ease-out group-hover:w-full"
              />
            </Link>
          </Reveal>
        ))}
      </ul>
    </HomeSection>
  );
}
