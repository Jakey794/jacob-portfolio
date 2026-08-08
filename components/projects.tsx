import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { caseStudyProjects, featuredProject } from "@/lib/projects";
import { ArrowLink, CtaLink, ctaClass } from "@/components/cta-link";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { HomeSection } from "@/components/section-shell";

/** Labels for the featured project's two proof lines, in order. */
const featuredProofLabels = ["System", "Reliability"];

export function FeaturedProjectShowcase() {
  return (
    <HomeSection id="projects" labelledBy="featured-project-title" glow="right">
      <SectionHeading
        index="03"
        eyebrow="Selected Work"
        title="Product-shaped engineering case studies"
        id="featured-project-title"
        aside={
          <ArrowLink href="/projects" className="hidden lg:inline-flex">
            All projects
          </ArrowLink>
        }
      >
        <p>
          Four focused previews of ML systems, full-stack AI tools, applied
          research, and quantitative software, each framed around what was
          built and what makes it credible.
        </p>
      </SectionHeading>

      {/* The featured slot is a single drawn object: one hairline box split by
          a 1px rule, rather than a floating card with a shadow. */}
      <article className="group mt-12 grid gap-px border border-white/10 bg-white/10 lg:mt-14 lg:grid-cols-[1.12fr_0.88fr]">
        {featuredProject.image ? (
          <div className="relative overflow-hidden bg-[#070a10]">
            <Image
              src={featuredProject.image}
              alt={
                featuredProject.imageAlt ??
                `${featuredProject.title} screenshot`
              }
              width={1200}
              height={760}
              priority
              className="h-full min-h-72 w-full object-cover object-top brightness-[0.96] saturate-[0.96] transition-transform duration-700 ease-out group-hover:scale-[1.012] sm:min-h-[26rem]"
            />
            {/* Settles the bright product screenshot into the dark page. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,18,0.14)_0%,transparent_30%,rgba(8,11,18,0.5)_100%)]"
            />
          </div>
        ) : null}

        <div className="flex flex-col bg-[#090c13] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
            <span className="text-accent-indigo-soft">01 / Primary case study</span>
            {featuredProject.statusLabel ? (
              <span className="text-white/35">{featuredProject.statusLabel}</span>
            ) : null}
          </div>

          <h3 className="mt-5 text-[1.75rem]/[1.16] font-medium tracking-[-0.022em] text-[#e4e7ed] sm:text-[2.05rem]/[1.14]">
            {featuredProject.title}
          </h3>

          <p className="mt-5 max-w-[34rem] text-[1rem] leading-[1.74] text-[#a2a8b5]">
            {featuredProject.summary}
          </p>

          <ul className="mt-8 border-t border-white/10">
            {featuredProject.proof.map((item, index) => (
              <li
                key={item}
                className="grid gap-2 border-b border-white/10 py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
              >
                <span className="font-mono text-[0.66rem] uppercase leading-[1.6] tracking-[0.16em] text-white/35">
                  {featuredProofLabels[index] ?? `Proof ${index + 1}`}
                </span>
                <span className="text-[0.9rem] leading-[1.65] text-[#a0a6b4]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {featuredProject.stack.map((tag) => (
              <li
                key={tag}
                className="border border-white/12 px-2.5 py-1 text-[0.73rem] text-[#9299a7]"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-9">
            <CtaLink href={`/projects/${featuredProject.slug}`} size="sm">
              Read case study
            </CtaLink>
            {featuredProject.github ? (
              <a
                href={featuredProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaClass("secondary", "sm")}
              >
                GitHub
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-[0.95rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ) : null}
            {featuredProject.liveDemo ? (
              <a
                href={featuredProject.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaClass("secondary", "sm")}
              >
                Live demo
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-[0.95rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </HomeSection>
  );
}

export function CaseStudyPreviewGrid() {
  return (
    <HomeSection id="case-studies" labelledBy="case-studies-title">
      {/* No index: this band continues section 03 rather than opening a new
          one, so it carries a plain eyebrow and the rail stays at five. */}
      <SectionHeading
        eyebrow="Case-study previews"
        title="Research, product tooling, and quant systems"
        id="case-studies-title"
        aside={
          <ArrowLink href="/projects" className="lg:hidden">
            All projects
          </ArrowLink>
        }
      >
        <p>
          Each preview is structured for a full project page: proof,
          architecture, metrics, source links, and demos where available.
        </p>
      </SectionHeading>

      <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-3">
        {caseStudyProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={String(index + 2).padStart(2, "0")}
          />
        ))}
      </div>
    </HomeSection>
  );
}
