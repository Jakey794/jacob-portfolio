import { Brain, Code2, LineChart } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";

const focusAreas = [
  {
    title: "Machine learning systems",
    icon: Brain,
  },
  {
    title: "Full-stack AI tools",
    icon: Code2,
  },
  {
    title: "Quantitative modeling",
    icon: LineChart,
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          id="about-title"
          eyebrow="About"
          title="Practical ML, built like software"
        />
        <div className="space-y-6 text-base leading-8 text-slate-300 sm:text-lg">
          <p>
            I&apos;m an Engineering Science student at the University of Toronto
            focused on machine learning, quantitative finance, and software
            engineering.
          </p>
          <p>
            I like building practical systems: ML pipelines, full-stack AI
            tools, and models that turn messy data into decisions. My current
            work spans RF signal classification, customer-personalization ML,
            incident triage automation, and portfolio/risk modeling.
          </p>
          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            {focusAreas.map(({ title, icon: Icon }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100"
              >
                <Icon aria-hidden="true" className="size-4 text-cyan-300" />
                <span>{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
