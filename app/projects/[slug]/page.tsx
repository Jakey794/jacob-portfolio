import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, GitBranch } from "lucide-react";

import {
  ArchitectureFlow,
} from "@/components/case-study/architecture-flow";
import {
  Panel,
  PanelList,
  PanelText,
  StatTiles,
} from "@/components/case-study/panel";
import { Footer } from "@/components/footer";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { CaptureFrame } from "@/components/projects/capture-frame";
import { ProjectThumb } from "@/components/projects/project-thumb";
import { SectionRail, anchorSections } from "@/components/section-rail";
import { TechLine, pageGutters } from "@/components/section-shell";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";
import { caseStudies, caseStudySlugs, getCaseStudy } from "@/lib/case-studies";
import { allProjects, getProjectBySlug } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !caseStudies[slug]) {
    return { title: "Project Not Found | Jacob Allan" };
  }

  return {
    title: `${project.title} | Jacob Allan Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Jacob Allan Case Study`,
      description: project.summary,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Jacob Allan Case Study`,
      description: project.summary,
    },
  };
}

const railSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Features" },
  { id: "results", label: "Results" },
  { id: "stack", label: "Stack" },
  { id: "next-project", label: "Next Project" },
];

/** Panel heads carry the same index the rail entry that targets them does. */
function panelIndex(id: string) {
  const position = railSections.findIndex((section) => section.id === id);
  return position === -1 ? undefined : String(position + 1).padStart(2, "0");
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const caseStudy = getCaseStudy(slug);

  if (!project || !caseStudy) {
    notFound();
  }

  const position = allProjects.findIndex((item) => item.slug === slug);
  const eyebrowIndex = String(position + 1).padStart(2, "0");
  const nextProject = allProjects[(position + 1) % allProjects.length];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.projectDetail} />
      <SiteNav active="projects" />
      {pageAtmospheres.projectDetail.decor ? (
        <PageDecorTop variant="spec" />
      ) : null}

      {/* The wide right gutter only applies from xl, where the text-labelled
          rail is actually rendered. */}
      <main className={cn("relative z-10 pb-24 pt-[8.5rem] md:pt-[7.1rem] lg:pb-20", pageGutters.railed)}>
        {/* ---------------------------------------------------------- masthead */}
        <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start lg:gap-10">
          <div>
            <PageEyebrow index={eyebrowIndex} label="Project Case Study" />

            <PageTitle size="detail" className="mt-6">
              {project.title}
            </PageTitle>

            <p className="mt-6 max-w-[27rem] text-[0.99rem] leading-[1.75] text-[#a2a8b5] lg:text-[1.04rem]">
              {project.oneLine}
            </p>

            {/* A line, not chips — the masthead is unboxed, and the same four
                declarations already appear as chips in the index card this
                page is opened from. */}
            <TechLine
              items={project.displayTags}
              className="mt-7 text-[0.95rem] text-accent-indigo-soft/85"
            />

            {/* Short meta pairs only — the full role narrative lives in the
                Approach panel below, so this row stays on one line. */}
            <dl className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(7rem,max-content))] gap-x-12 gap-y-5">
              {caseStudy.highlights.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/35">
                    {label}
                  </dt>
                  <dd className="mt-2 text-[0.88rem] leading-[1.6] text-[#c3c8d2]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/*
            Product capture. The concept angles this plate hard; at
            rotateY(-13deg) over an already dark grade the interface stopped
            being readable, which defeats the point of showing it. The tilt is
            kept but shallow, and the capture sits in the same drawn window
            chrome the index uses so the two pages agree.
          */}
          <div className="relative lg:-mt-2">
            <div className="[perspective:2200px]">
              <CaptureFrame
                label={project.title}
                className="shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] lg:[transform:rotateY(-5deg)_rotateX(1.5deg)]"
                bodyClassName="aspect-[16/9]"
              >
                <ProjectThumb
                  src={project.image}
                  alt={
                    project.imageAlt ?? `${project.title} interface screenshot`
                  }
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  priority
                  className="absolute inset-0"
                />
              </CaptureFrame>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------- summary band */}
        {/*
          The fourth cell used to be a second copy of the same screenshot under
          heavy scrims, which rendered as an empty black rectangle. It now
          carries the detail crop — a different region of the product — and is
          dropped entirely for projects with no capture, so the band closes at
          three panels instead of leaving a hole.
        */}
        <div
          className={`mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:mt-20 ${
            project.image
              ? "xl:grid-cols-[repeat(3,minmax(0,1fr))_1.15fr]"
              : "xl:grid-cols-3"
          }`}
        >
          <Panel
            id="overview"
            title="Overview"
            index={panelIndex("overview")}
            className="border-0"
          >
            <PanelText>{project.summary}</PanelText>
          </Panel>

          <Panel
            id="problem"
            title="Problem"
            index={panelIndex("problem")}
            className="border-0"
          >
            <PanelText>{project.problem}</PanelText>
          </Panel>

          <Panel
            id="approach"
            title="Approach"
            index={panelIndex("approach")}
            className="border-0"
          >
            <PanelText>{project.role}</PanelText>
          </Panel>

          {project.image ? (
            /*
              One cell, never two. Spanning both columns at sm put the crop in
              a row of its own roughly 1300px wide against a 208px minimum
              height, so `object-cover` zoomed a 730x460 detail crop by a
              factor of four and clipped it mid-sentence — and it left the cell
              beside "Approach" empty, which showed as a bare hole in the band.
              As a single cell it fills that slot and lands at close to the
              source's own 1.6:1, so almost nothing is trimmed at any width.
            */
            <div className="flex min-h-[13rem] items-stretch bg-[#090c13] p-5">
              <CaptureFrame chrome={false} className="w-full">
                <ProjectThumb
                  src={project.imageDetail ?? project.image}
                  alt=""
                  sizes="(min-width: 1280px) 26vw, 100vw"
                  className="absolute inset-0"
                />
              </CaptureFrame>
            </div>
          ) : null}
        </div>

        {/* ------------------------------------------ architecture / features */}
        <div className="mt-6 grid gap-px bg-white/10 lg:mt-8 xl:grid-cols-[1.24fr_0.86fr_0.9fr]">
          <Panel
            id="architecture"
            title="System Architecture"
            index={panelIndex("architecture")}
            className="border-0"
            bodyClassName="flex flex-col justify-center"
          >
            <ArchitectureFlow
              stages={caseStudy.architecture}
              feedbackLabel="Structured response contract"
              feedbackNote="Typed outputs flow back into the product surface"
            />
          </Panel>

          <Panel
            id="features"
            title="Key Features"
            index={panelIndex("features")}
            className="border-0"
          >
            <PanelList items={caseStudy.whatBuilt} />
          </Panel>

          <Panel
            id="results"
            title={caseStudy.results ? "Results" : "Validation"}
            index={panelIndex("results")}
            className="border-0"
          >
            {caseStudy.results ? (
              <StatTiles tiles={caseStudy.results} />
            ) : (
              <PanelList items={caseStudy.metricsProof} />
            )}
          </Panel>
        </div>

        {/* ------------------------------------------------ stack / next up */}
        <div className="mt-6 grid gap-px bg-white/10 lg:mt-8 xl:grid-cols-[1.15fr_1fr]">
          <Panel
            id="stack"
            title="Technology Stack"
            index={panelIndex("stack")}
            className="border-0"
          >
            {/* Set as a line rather than as bordered chips. Ten rectangles
                inside an already-bordered panel is the same tag cloud the
                homepage dropped, and it was the loudest object in the band. */}
            <TechLine items={project.stack} className="text-[0.88rem]" />

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-sm text-[0.9rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <GitBranch aria-hidden="true" className="size-4" />
                View source on GitHub
              </a>
            ) : null}
          </Panel>

          <NextProjectPanel
            index={panelIndex("next-project")}
            title={nextProject.title}
            oneLine={nextProject.oneLine}
            href={`/projects/${nextProject.slug}`}
            /* The detail crop, not the wide capture: this slot is under two
               hundred pixels across, and a whole product window scaled into it
               is noise rather than a preview. */
            image={nextProject.imageDetail ?? nextProject.image}
            imageAlt={nextProject.imageAlt}
          />
        </div>

        <div className="mt-10 border-t border-white/10 pt-7">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 rounded-sm text-[0.92rem] text-white/60 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <ArrowRight aria-hidden="true" className="size-4 rotate-180" />
            All projects
          </Link>
        </div>

        <PageDecorFoot />
      </main>

      {/* Section rail — anchors into the panels above. */}
      <SectionRail
        variant="labelled"
        gap="1.35rem"
        sections={anchorSections(railSections)}
        className="absolute right-[3.2%] top-[15.5rem] z-20 hidden xl:block"
      />

      <Footer className={pageGutters.railed} />
    </div>
  );
}

function NextProjectPanel({
  index,
  title,
  oneLine,
  href,
  image,
  imageAlt,
}: {
  index?: string;
  title: string;
  oneLine: string;
  href: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section
      id="next-project"
      aria-labelledby="next-project-title"
      className="group scroll-mt-28 bg-[#090c13]/45"
    >
      <Link
        href={href}
        className="flex h-full flex-col gap-6 p-6 outline-none transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.03] sm:flex-row sm:items-center sm:p-7"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.78rem] tracking-[0.12em] text-accent-indigo-soft">
              {index}
            </span>
            <span
              id="next-project-title"
              className="text-[1.02rem] font-medium tracking-[-0.01em] text-[#dfe2e9]"
            >
              Next Project
            </span>
          </div>
          <p className="mt-5 text-[1.15rem] font-medium tracking-[-0.015em] text-[#e2e5ec]">
            {title}
          </p>
          <p className="mt-2.5 max-w-[22rem] text-[0.85rem] leading-[1.62] text-[#8d93a1]">
            {oneLine}
          </p>
        </div>

        <ProjectThumb
          src={image}
          alt={imageAlt ?? `${title} preview`}
          sizes="(min-width: 1024px) 16vw, 40vw"
          className="aspect-[16/10] w-full shrink-0 border border-white/10 sm:w-[11rem]"
        />

        <span
          aria-hidden="true"
          className="hidden size-10 shrink-0 place-items-center border border-white/15 text-white/50 transition-all duration-200 group-hover:border-accent-indigo-soft/50 group-hover:text-accent-indigo-soft sm:grid"
        >
          <ArrowRight className="size-4" />
        </span>
      </Link>
    </section>
  );
}
