import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Boxes,
  CircuitBoard,
  FileText,
  GitBranch,
  Layers,
  ListChecks,
  Sparkles,
  Target,
} from "lucide-react";

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
import { PageAtmosphere } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { ProjectThumb } from "@/components/projects/project-thumb";
import { SiteNav } from "@/components/site-nav";
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
      <PageAtmosphere height="h-[26rem] lg:h-[34rem]" />
      <SiteNav active="projects" />
      <PageDecorTop />

      {/* The wide right gutter only applies from xl, where the text-labelled
          rail is actually rendered. */}
      <main className="relative z-10 px-6 pb-28 pt-[7rem] sm:px-10 sm:pt-[7.5rem] lg:pb-32 lg:pl-[5%] lg:pr-[5%] lg:pt-[7.4rem] xl:pr-[15.5%]">
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

            <ul className="mt-7 flex flex-wrap gap-2">
              {project.displayTags.map((tag) => (
                <li
                  key={tag}
                  className="border border-accent-indigo-soft/25 bg-accent-indigo-soft/[0.07] px-2.5 py-1 text-[0.74rem] text-accent-indigo-soft/85"
                >
                  {tag}
                </li>
              ))}
            </ul>

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

          {/* Angled product capture, as in the concept. */}
          <div className="relative lg:-mt-2">
            <div className="[perspective:1700px]">
              <div className="relative overflow-hidden border border-white/12 bg-[#0b0e16] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] lg:[transform:rotateY(-13deg)_rotateX(4deg)_rotate(-1.2deg)]">
                <ProjectThumb
                  src={project.image}
                  alt={
                    project.imageAlt ?? `${project.title} interface screenshot`
                  }
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  priority
                  className="aspect-[16/9]"
                />
                {/* Presentational grading so the light-mode capture settles
                    into the dark composition. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(130%_120%_at_35%_30%,transparent_25%,rgba(8,11,18,0.6)_100%)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[rgba(8,11,18,0.24)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------- summary band */}
        <div className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:mt-20 xl:grid-cols-[repeat(3,minmax(0,1fr))_1.15fr]">
          <Panel id="overview" title="Overview" icon={Sparkles} className="border-0">
            <PanelText>{project.summary}</PanelText>
          </Panel>

          <Panel id="problem" title="Problem" icon={Target} className="border-0">
            <PanelText>{project.problem}</PanelText>
          </Panel>

          <Panel id="approach" title="Approach" icon={Layers} className="border-0">
            <PanelText>{project.role}</PanelText>
          </Panel>

          {/* Second capture slot — drop a detail screenshot here. */}
          <div className="relative min-h-[11rem] bg-[#090c13]">
            <ProjectThumb
              src={project.image}
              alt=""
              sizes="(min-width: 1024px) 28vw, 100vw"
              className="absolute inset-0"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,12,19,0.8)_0%,rgba(9,12,19,0.2)_38%,transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[rgba(8,11,18,0.32)]"
            />
          </div>
        </div>

        {/* ------------------------------------------ architecture / features */}
        <div className="mt-6 grid gap-px bg-white/10 lg:mt-8 xl:grid-cols-[1.24fr_0.86fr_0.9fr]">
          <Panel
            id="architecture"
            title="System Architecture"
            icon={CircuitBoard}
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
            icon={ListChecks}
            className="border-0"
          >
            <PanelList items={caseStudy.whatBuilt} />
          </Panel>

          <Panel
            id="results"
            title={caseStudy.results ? "Results" : "Validation"}
            icon={FileText}
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
            icon={Boxes}
            className="border-0"
          >
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 border border-white/12 bg-white/[0.02] px-3 py-2 text-[0.8rem] text-[#c3c8d2]"
                >
                  <span
                    aria-hidden="true"
                    className="size-[5px] rounded-full bg-accent-indigo-soft/70"
                  />
                  {item}
                </li>
              ))}
            </ul>

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
            index={String(
              ((position + 1) % allProjects.length) + 1
            ).padStart(2, "0")}
            title={nextProject.title}
            oneLine={nextProject.oneLine}
            href={`/projects/${nextProject.slug}`}
            image={nextProject.image}
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
      <nav
        aria-label="Case study sections"
        className="absolute right-[3.2%] top-[15rem] z-20 hidden xl:block"
      >
        <span
          aria-hidden="true"
          className="absolute left-[4px] top-1.5 bottom-1.5 w-px bg-white/15"
        />
        <ol className="relative flex flex-col gap-[1.35rem]">
          {railSections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-[1.1rem] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
              >
                <span
                  aria-hidden="true"
                  className={
                    index === 0
                      ? "size-[9px] shrink-0 rounded-full border border-accent-indigo bg-accent-indigo"
                      : "size-[9px] shrink-0 rounded-full border border-white/35 bg-background transition-colors group-hover:border-white/70"
                  }
                />
                <span
                  className={
                    index === 0
                      ? "text-[0.85rem] text-white/85"
                      : "text-[0.85rem] text-white/45 transition-colors group-hover:text-white/80"
                  }
                >
                  {section.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Footer />
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
  index: string;
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
          className="aspect-[16/10] w-full shrink-0 border border-white/12 sm:w-[11rem]"
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
