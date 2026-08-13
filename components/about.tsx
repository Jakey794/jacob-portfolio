import { ArrowLink } from "@/components/cta-link";
import { SectionHeading } from "@/components/section-heading";
import { HomeSection, SpecList, SpecRow, TechLine } from "@/components/section-shell";
import { aboutBody, aboutLede, aboutStats, technicalFocus } from "@/lib/about";

/**
 * Concise homepage preview. The full profile lives at /about — this section
 * shares its content from `lib/about.ts` rather than restating it, so the two
 * can never drift apart.
 *
 * Laid out as a magazine opener rather than a two-column dashboard: the lede
 * runs at display scale across the measure, the prose and the focus areas sit
 * beneath it, and the figures close the band on one rule. The focus areas were
 * three bordered cards, which is what made the first band under the hero read
 * as a component library.
 */
export function About() {
  return (
    <HomeSection id="about" labelledBy="about-title" glow="left">
      <SectionHeading
        index="02"
        eyebrow="About"
        title={aboutLede}
        id="about-title"
      />

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <div className="space-y-5">
            {aboutBody.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[34rem] text-[1.05rem] leading-[1.78] text-[#a2a8b5]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ArrowLink href="/about" className="mt-9">
            More about me
          </ArrowLink>
        </div>

        {/* Focus areas as numbered label/value rules — the same primitive the
            stack band uses further down, so the two agree. */}
        <SpecList>
          {technicalFocus.map((area, index) => (
            <SpecRow
              key={area.title}
              label={String(index + 1).padStart(2, "0")}
              accent
              className="sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-8"
            >
              <p className="text-[0.98rem] leading-[1.5] text-[#dfe2e9]">
                {area.title}
              </p>
              <TechLine
                items={area.skills.slice(0, 3)}
                className="mt-2.5 text-[0.8rem]"
              />
            </SpecRow>
          ))}
        </SpecList>
      </div>

      {/* Counts and figures computed from the data files. */}
      <ul className="mt-14 grid gap-y-8 border-t border-white/10 pt-9 sm:grid-cols-3 sm:gap-x-10 lg:mt-16">
        {aboutStats.map((stat) => (
          <li key={stat.label}>
            <span className="block text-[2rem] font-medium leading-none tracking-[-0.03em] text-accent-indigo-soft lg:text-[2.35rem]">
              {stat.value}
            </span>
            <span className="mt-3.5 block text-[0.78rem] leading-[1.5] text-white/45">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
