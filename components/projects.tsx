import { ArrowUpRight } from "lucide-react";

import { caseStudyProjects, featuredProject } from "@/lib/projects";
import { ArrowLink, CtaLink, ctaClass } from "@/components/cta-link";
import { ProjectRow } from "@/components/project-row";
import { CaptureFrame } from "@/components/projects/capture-frame";
import { ProjectThumb } from "@/components/projects/project-thumb";
import { SectionHeading } from "@/components/section-heading";
import {
  HomeSection,
  SpecList,
  SpecRow,
  TechLine,
} from "@/components/section-shell";

/** Labels for the featured project's two proof lines, in order. */
const featuredProofLabels = ["System", "Reliability"];

/**
 * The one product moment on the homepage.
 *
 * The capture is the object; there is no card around it. Wrapping the whole
 * band in a bordered panel put a frame inside a frame — the screenshot already
 * carries drawn window chrome — and turned the section into the largest box on
 * the page. The copy is separated from the capture by a single hairline
 * instead.
 */
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

      {/* Held in one column until xl: below that the two halves each land
          under thirty characters wide and every proof line wraps four deep. */}
      <article className="mt-14 grid gap-10 lg:mt-[4.5rem] xl:grid-cols-[1.06fr_0.94fr] xl:gap-0">
        {featuredProject.image ? (
          <div className="xl:pr-16 2xl:pr-20">
            {/* Same drawn window chrome the projects index and case studies
                use, so every capture on the site is framed the same way. */}
            <CaptureFrame
              label={featuredProject.title}
              className="w-full shadow-[0_40px_110px_-50px_rgba(0,0,0,0.95)]"
              bodyClassName="aspect-[1.62/1]"
            >
              <ProjectThumb
                src={featuredProject.image}
                alt={
                  featuredProject.imageAlt ??
                  `${featuredProject.title} screenshot`
                }
                sizes="(min-width: 1024px) 55vw, 100vw"
                priority
                className="absolute inset-0"
              />
            </CaptureFrame>
          </div>
        ) : null}

        {/* The divider is a drawn rule rather than a border: a hard edge that
            stops where the copy stops reads as the side of a missing box. */}
        <div className="relative flex flex-col xl:pl-16 2xl:pl-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.13)_9%,rgba(255,255,255,0.13)_74%,transparent_100%)] xl:block"
          />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
            <span className="text-accent-indigo-soft">01 / Primary case study</span>
            {featuredProject.statusLabel ? (
              <span className="text-white/35">{featuredProject.statusLabel}</span>
            ) : null}
          </div>

          <h3 className="mt-5 text-[1.8rem]/[1.16] font-medium tracking-[-0.022em] text-[#e4e7ed] sm:text-[2.15rem]/[1.13]">
            {featuredProject.title}
          </h3>

          <p className="mt-5 max-w-[34rem] text-[1rem] leading-[1.74] text-[#a2a8b5]">
            {featuredProject.summary}
          </p>

          <SpecList className="mt-9 max-w-[46rem] xl:max-w-none">
            {featuredProject.proof.map((item, index) => (
              <SpecRow
                key={item}
                label={featuredProofLabels[index] ?? `Proof ${index + 1}`}
                className="sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-7"
              >
                <span className="block text-[0.92rem] leading-[1.68] text-[#a0a6b4]">
                  {item}
                </span>
              </SpecRow>
            ))}
            <SpecRow
              label="Stack"
              className="sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-7"
            >
              <TechLine items={featuredProject.stack} />
            </SpecRow>
          </SpecList>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-10">
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

/**
 * The remaining case studies, drawn as a numbered editorial list.
 *
 * This was a three-up grid of bordered cards, two of which were mostly a
 * dashed "imagery pending" plate — a wall of boxes announcing missing content
 * at the exact point a recruiter is deciding whether to keep reading. A list
 * lets the one project with a real capture carry an image and the two without
 * carry their metrics instead, without either looking like a hole.
 */
export function CaseStudyPreviewGrid() {
  return (
    <HomeSection id="case-studies" labelledBy="case-studies-title" glow="left">
      {/* No index: this band continues section 03 rather than opening a new
          one, so it carries a plain eyebrow and the rail stays at five. */}
      <SectionHeading
        eyebrow="Case-study previews"
        title="Research, product tooling, and quant systems"
        id="case-studies-title"
        aside={
          <ArrowLink href="/projects" className="hidden lg:inline-flex">
            All projects
          </ArrowLink>
        }
      >
        <p>
          Each preview is structured for a full project page: proof,
          architecture, metrics, source links, and demos where available.
        </p>
      </SectionHeading>

      <ol className="mt-14 border-t border-white/10 lg:mt-[4.5rem]">
        {caseStudyProjects.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={String(index + 2).padStart(2, "0")}
          />
        ))}
      </ol>

      <ArrowLink href="/projects" className="mt-10 lg:hidden">
        All projects
      </ArrowLink>
    </HomeSection>
  );
}
