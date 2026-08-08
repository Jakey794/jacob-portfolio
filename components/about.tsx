import { ArrowLink } from "@/components/cta-link";
import { PageEyebrow } from "@/components/page-title";
import { HairlineCell, HairlineGrid, HomeSection } from "@/components/section-shell";
import { aboutBody, aboutLede, aboutStats, technicalFocus } from "@/lib/about";

/**
 * Concise homepage preview. The full profile lives at /about — this section
 * shares its content from `lib/about.ts` rather than restating it, so the two
 * can never drift apart.
 *
 * No top rule: this is the first band under the hero, and the fog should
 * resolve into the page rather than meeting a hairline.
 */
export function About() {
  return (
    <HomeSection id="about" labelledBy="about-title" divide={false} glow="left">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <PageEyebrow index="02" label="About" />

          <h2
            id="about-title"
            className="mt-5 max-w-[26rem] bg-gradient-to-b from-[#c4c9d3] to-[#e4e7ed] bg-clip-text text-[1.62rem]/[1.28] font-medium tracking-[-0.02em] text-transparent sm:text-[1.9rem]/[1.26]"
          >
            {aboutLede}
          </h2>

          <ArrowLink href="/about" className="mt-8">
            More about me
          </ArrowLink>

          {/* Counts and figures computed from the data files. They sit in the
              short column so the two halves of the band end together. */}
          <ul className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8">
            {aboutStats.map((stat) => (
              <li key={stat.label}>
                <span className="block text-[1.75rem] font-medium leading-none tracking-[-0.03em] text-accent-indigo-soft">
                  {stat.value}
                </span>
                <span className="mt-3 block text-[0.76rem] leading-[1.5] text-white/45">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="space-y-5">
            {aboutBody.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[34rem] text-[1.02rem] leading-[1.76] text-[#a2a8b5]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <HairlineGrid className="mt-10 sm:grid-cols-3">
            {technicalFocus.map((area) => (
              <HairlineCell key={area.title} className="px-5 py-4.5">
                <p className="text-[0.9rem] font-medium text-[#dfe2e9]">
                  {area.title}
                </p>
                <p className="mt-2 text-[0.78rem] leading-[1.55] text-[#8d93a1]">
                  {area.skills.slice(0, 3).join(", ")}
                </p>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </div>
      </div>
    </HomeSection>
  );
}
