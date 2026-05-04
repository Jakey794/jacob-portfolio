import { skillGroups } from "@/lib/skills";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="A compact technical stack"
        >
          <p>
            Languages, ML tooling, quant concepts, and software platforms used
            across research and product projects.
          </p>
        </SectionHeading>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group) => (
            <section
              key={group.category}
              aria-labelledby={`skills-${group.category.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")}`}
              className="rounded-lg border border-slate-800 bg-slate-950/60 p-5"
            >
              <h3
                id={`skills-${group.category.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")}`}
                className="text-lg font-semibold text-slate-50"
              >
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="border-slate-700 bg-slate-900/70 text-slate-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
