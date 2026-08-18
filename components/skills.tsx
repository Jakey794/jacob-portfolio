import { ArrowLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { HomeSection, TechLine } from "@/components/section-shell";
import { homeStack } from "@/lib/skills";

/**
 * Supporting band rather than a numbered section — it backs up the work above
 * instead of introducing a new one, so it carries a plain eyebrow.
 *
 * A deliberate short list, not the full inventory. Thirteen names a reader
 * takes in at a glance says more than ninety they skim past; the complete
 * grouped set is on About, one link away.
 */
export function Skills() {
  return (
    <HomeSection id="skills" labelledBy="skills-title" glow="right">
      <SectionHeading
        eyebrow="Core stack"
        title="What I build with"
        id="skills-title"
        aside={
          <ArrowLink href="/about#skills" className="hidden lg:inline-flex">
            Full technical profile
          </ArrowLink>
        }
      >
        <p>
          The tools that appear across the projects and roles above. The
          complete grouped inventory, including quantitative and signals work,
          is on the About page.
        </p>
      </SectionHeading>

      <Reveal className="mt-12 border-t border-white/10 pt-9 lg:mt-14">
        <TechLine
          items={homeStack}
          className="max-w-[62rem] gap-x-[0.9rem] gap-y-2.5 text-[1.05rem] text-[#c3c8d2] lg:text-[1.15rem]"
        />
      </Reveal>

      <ArrowLink href="/about#skills" className="mt-9 lg:hidden">
        Full technical profile
      </ArrowLink>
    </HomeSection>
  );
}
