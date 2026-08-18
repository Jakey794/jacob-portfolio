import { ArrowLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  HomeSection,
  SpecList,
  SpecRow,
  TechLine,
} from "@/components/section-shell";
import { homeStats, technicalFocus } from "@/lib/about";
import { profile } from "@/lib/site";

/**
 * Homepage preview of the full profile at /about.
 *
 * Content is shared from `lib/about.ts` and `lib/site.ts` rather than
 * restated, so the two pages cannot drift. Laid out as a magazine opener
 * rather than a two-column dashboard: the heading runs at display scale, the
 * prose and focus areas sit beneath it, and the computed figures close the
 * band on one rule.
 */
export function About() {
  return (
    <HomeSection id="about" labelledBy="about-title" glow="left">
      <SectionHeading
        index="02"
        eyebrow="About"
        title="Secure systems, careful evaluation, and explicit failure boundaries."
        id="about-title"
      />

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <div className="space-y-5">
            <p className="max-w-[34rem] text-[1.05rem] leading-[1.78] text-[#a2a8b5]">
              I am an Engineering Science student at the University of Toronto
              specializing in Machine Intelligence and Mathematics. Most of my
              work is Python: PyTorch models, portfolio-risk and regime
              research, evaluation harnesses, and the FastAPI and PostgreSQL
              services around them &mdash; plus deterministic Rust where
              latency and reproducibility matter.
            </p>
            <p className="max-w-[34rem] text-[1.05rem] leading-[1.78] text-[#a2a8b5]">
              {profile.longBio[1]}
            </p>
          </div>

          <ArrowLink href="/about" className="mt-9">
            Education, skills, and approach
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

      {/* Counts computed from the content collections, never typed in. */}
      <Reveal className="mt-14 grid gap-y-8 border-t border-white/10 pt-9 sm:grid-cols-2 sm:gap-x-10 lg:mt-16 lg:grid-cols-4">
        {homeStats.map((stat) => (
          <div key={stat.label}>
            <span className="block text-[2rem] font-medium leading-none tracking-[-0.03em] text-accent-indigo-soft lg:text-[2.35rem]">
              {stat.value}
            </span>
            <span className="mt-3.5 block text-[0.78rem] leading-[1.5] text-white/55">
              {stat.label}
            </span>
          </div>
        ))}
      </Reveal>
    </HomeSection>
  );
}
