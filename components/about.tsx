import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { aboutBody, aboutLede, aboutStats, technicalFocus } from "@/lib/about";

/**
 * Concise homepage preview. The full profile lives at /about — this section
 * shares its content from `lib/about.ts` rather than restating it, so the two
 * can never drift apart.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-24 px-6 py-20 sm:px-10 lg:px-[6.4rem] lg:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="flex items-center gap-3 font-mono text-[0.78rem] uppercase tracking-[0.2em]">
            <span className="text-accent-indigo-soft">01</span>
            <span aria-hidden="true" className="text-white/25">
              /
            </span>
            <span className="text-white/45">About</span>
          </p>

          <h2
            id="about-title"
            className="mt-5 max-w-[27rem] text-[1.62rem] font-medium leading-[1.25] tracking-[-0.02em] text-[#dfe2e9] sm:text-[1.85rem]"
          >
            {aboutLede}
          </h2>

          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-3 rounded-sm text-[0.98rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            More about me
            <ArrowRight
              aria-hidden="true"
              className="size-[1.05rem] transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div>
          <div className="space-y-4">
            {aboutBody.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[34rem] text-[1rem] leading-[1.72] text-[#a2a8b5]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            {technicalFocus.map((area) => (
              <li key={area.title} className="bg-[#090c13] px-5 py-4">
                <p className="text-[0.9rem] font-medium text-[#dfe2e9]">
                  {area.title}
                </p>
                <p className="mt-1.5 text-[0.76rem] leading-[1.5] text-[#8d93a1]">
                  {area.skills.slice(0, 3).join(", ")}
                </p>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {aboutStats.map((stat) => (
              <li key={stat.label}>
                <span className="block text-[1.35rem] font-medium leading-none tracking-[-0.02em] text-accent-indigo-soft">
                  {stat.value}
                </span>
                <span className="mt-1.5 block text-[0.74rem] text-[#8d93a1]">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
