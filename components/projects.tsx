import { ProofChips, ResourceLinkRow } from "@/components/evidence";
import { ArrowLink, CtaLink } from "@/components/cta-link";
import { RecordVisual } from "@/components/media/record-visual";
import { ProjectRow } from "@/components/project-row";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  HomeSection,
  SpecList,
  SpecRow,
  TechLine,
} from "@/components/section-shell";
import { featuredProject, previewProjects } from "@/lib/projects";

/**
 * The one product moment on the homepage.
 *
 * The capture is the object; there is no card around it. Wrapping the band in
 * a bordered panel put a frame inside a frame — the screenshot already carries
 * drawn window chrome — and turned the section into the largest box on the
 * page. A single hairline separates the copy from the capture instead.
 */
export function FeaturedProjectShowcase() {
  return (
    <HomeSection id="projects" labelledBy="featured-project-title" glow="right">
      <SectionHeading
        index="03"
        eyebrow="Selected Work"
        title="Public systems, with source and limits attached"
        id="featured-project-title"
        aside={
          <ArrowLink href="/projects" className="hidden lg:inline-flex">
            All projects
          </ArrowLink>
        }
      >
        <p>
          Public systems and research projects with source, validation,
          limitations, and working demos where available.
        </p>
      </SectionHeading>

      <Reveal
        as="article"
        className="mt-14 grid gap-10 lg:mt-[4.5rem] xl:grid-cols-[1.06fr_0.94fr] xl:gap-0"
      >
        <div className="xl:pr-16 2xl:pr-20">
          <RecordVisual
            media={featuredProject.media}
            nodes={featuredProject.architecture}
            caption="System architecture"
            framed={Boolean(featuredProject.media)}
            frameLabel={featuredProject.title}
            frameBodyClassName="aspect-[1.62/1]"
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            className="w-full shadow-[0_40px_110px_-50px_rgba(0,0,0,0.95)]"
          />

          {featuredProject.media ? (
            <p className="mt-3.5 text-[0.78rem] leading-[1.55] text-white/55">
              {featuredProject.media.caption}
            </p>
          ) : null}
        </div>

        {/* The divider is a drawn rule rather than a border: a hard edge that
            stops where the copy stops reads as the side of a missing box. */}
        <div className="relative flex flex-col xl:pl-16 2xl:pl-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.13)_9%,rgba(255,255,255,0.13)_74%,transparent_100%)] xl:block"
          />

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
            <span className="text-accent-indigo-soft">
              01 / {featuredProject.eyebrow}
            </span>
            <span className="text-white/55">{featuredProject.statusLabel}</span>
          </div>

          <h3 className="mt-5 text-[1.8rem]/[1.16] font-medium tracking-[-0.022em] text-[#e4e7ed] sm:text-[2.15rem]/[1.13]">
            {featuredProject.title}
          </h3>

          <p className="mt-5 max-w-[34rem] text-[1rem] leading-[1.74] text-[#a2a8b5]">
            {featuredProject.summary}
          </p>

          <SpecList className="mt-9 max-w-[46rem] xl:max-w-none">
            <SpecRow
              label="Evidence"
              className="sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-7"
            >
              <ProofChips chips={featuredProject.proof} />
            </SpecRow>
            <SpecRow
              label="Stack"
              className="sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-7"
            >
              <TechLine items={featuredProject.stack} />
            </SpecRow>
          </SpecList>

          <div className="mt-auto flex flex-col gap-4 pt-10">
            <CtaLink href={`/projects/${featuredProject.slug}`} size="sm">
              Read case study
            </CtaLink>
            <ResourceLinkRow
              links={featuredProject.links}
              recordTitle={featuredProject.title}
            />
          </div>
        </div>
      </Reveal>
    </HomeSection>
  );
}

/**
 * The remaining previews, drawn as a numbered editorial list.
 *
 * A grid of bordered cards puts every project at the same weight and needs an
 * image per cell to look finished. A list lets the records with a capture
 * carry one and the records without lead with their measured figures instead,
 * without either reading as a hole.
 */
export function CaseStudyPreviewGrid() {
  return (
    <HomeSection id="case-studies" labelledBy="case-studies-title" glow="left">
      <SectionHeading
        eyebrow="More work"
        title="Market infrastructure, portfolio risk, local-first tooling, research"
        id="case-studies-title"
        aside={
          <ArrowLink href="/projects" className="hidden lg:inline-flex">
            All projects
          </ArrowLink>
        }
      >
        <p>
          Each record carries its architecture, the decisions behind it, the
          measurements that back it, and what it explicitly does not do.
        </p>
      </SectionHeading>

      <ol className="mt-14 border-t border-white/10 lg:mt-[4.5rem]">
        {previewProjects.map((project, index) => (
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
