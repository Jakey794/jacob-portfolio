import { skillGroups } from "@/lib/skills";
import { SectionHeading } from "@/components/section-heading";
import { HomeSection } from "@/components/section-shell";

/**
 * Supporting band rather than a numbered section — it backs up the work above
 * instead of introducing a new one, so it carries a plain eyebrow and is drawn
 * as a dense label/value table rather than a grid of chip cards.
 */
export function Skills() {
  return (
    <HomeSection id="skills" labelledBy="skills-title">
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

      <dl className="mt-12 border-t border-white/10 lg:mt-14">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="grid gap-2 border-b border-white/10 py-6 lg:grid-cols-[19rem_1fr] lg:gap-14"
          >
            <dt className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent-indigo-soft/80">
              {group.category}
            </dt>
            <dd className="flex flex-wrap gap-x-2 gap-y-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-white/12 px-2.5 py-1 text-[0.78rem] text-[#a0a6b4] transition-colors hover:border-white/25 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </HomeSection>
  );
}
