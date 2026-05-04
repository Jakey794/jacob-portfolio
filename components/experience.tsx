import { Briefcase } from "lucide-react";

import { experience } from "@/lib/experience";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience / Research"
          title="Research, ML engineering, and quant work"
        />
        <div className="mt-10 grid gap-5">
          {experience.map((item) => (
            <Card
              key={`${item.organization}-${item.role}`}
              className="border border-slate-800 bg-slate-950/70"
            >
              <CardContent className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[18rem_1fr]">
                <div>
                  <div className="mb-4 inline-flex rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-200">
                    <Briefcase aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-50">
                    {item.organization}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-cyan-200">
                    {item.role}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase text-slate-500">
                    {item.dates}
                  </p>
                </div>
                <ul className="space-y-3 text-sm leading-6 text-slate-300 sm:text-base">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
