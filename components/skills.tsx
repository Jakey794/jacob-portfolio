import { skillGroups } from "@/lib/skills";
import { SectionHeading } from "@/components/section-heading";
import {
  HomeSection,
  SpecList,
  SpecRow,
  TechLine,
} from "@/components/section-shell";

/**
 * Supporting band rather than a numbered section — it backs up the work above
 * instead of introducing a new one, so it carries a plain eyebrow.
 *
 * Drawn as the same label/value rules the rest of the page uses. It was
 * thirty-five bordered chips over four rows, which read as a tag cloud and was
 * the most generic object on the homepage; the words are unchanged, the boxes
 * are gone.
 */
export function Skills() {
  return (
    <HomeSection id="skills" labelledBy="skills-title" glow="right">
      <SectionHeading
        eyebrow="Stack"
        title="A compact technical stack"
        id="skills-title"
      >
        <p>
          Languages, ML tooling, quant concepts, and software platforms used
          across research and product projects.
        </p>
      </SectionHeading>

      <SpecList className="mt-14 lg:mt-[4.5rem]">
        {skillGroups.map((group) => (
          <SpecRow
            key={group.category}
            label={group.category}
            accent
            /* The label track was 17rem against labels that are never more
               than eight characters, which opened a 250px hole between every
               category and its values while the row's rule ran on to the page
               gutter. Tightened, and the value measure widened to the point
               where each group sets on one line — which also stops a wrap
               leaving a separator dangling at the end of a line. */
            className="py-6 sm:gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:py-7"
          >
            <TechLine
              items={group.skills}
              className="max-w-[62rem] gap-x-[0.7rem] gap-y-1.5 text-[0.9rem]"
            />
          </SpecRow>
        ))}
      </SpecList>
    </HomeSection>
  );
}
