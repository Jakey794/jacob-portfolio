import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ArchitectureFlow } from "@/components/case-study/architecture-flow";
import { Panel, PanelList, PanelText } from "@/components/case-study/panel";
import { MetricGrid, ResourceActions } from "@/components/evidence";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { RecordVisual } from "@/components/media/record-visual";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { Reveal } from "@/components/reveal";
import { SectionRail, anchorSections } from "@/components/section-rail";
import { TechLine, pageGutters } from "@/components/section-shell";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";
import { experience } from "@/lib/experience";
import {
  allProjects,
  getAdjacentProjects,
  getProjectBySlug,
  ownershipLabels,
  projectSlugs,
} from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

/** Every record in the collection gets a route. No allowlist. */
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const url = absoluteUrl(`/projects/${project.slug}`);
  const image = project.media?.social ?? `/images/og/${project.slug}.jpg`;

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.seo.title} | Jacob Allan`,
      description: project.seo.description,
      url,
      type: "article",
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: project.media?.alt ?? project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.seo.title} | Jacob Allan`,
      description: project.seo.description,
      images: [absoluteUrl(image)],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const position = allProjects.findIndex((item) => item.slug === slug);
  const eyebrowIndex = String(position + 1).padStart(2, "0");
  const { previous, next } = getAdjacentProjects(slug);

  const relatedRoles = project.relatedExperienceSlugs
    .map((related) => experience.find((item) => item.slug === related))
    .filter((item): item is (typeof experience)[number] => Boolean(item));

  /* The rail is built from what renders, so no entry ever scrolls to a
     section that this particular record does not have. */
  const railSections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    ...(project.architecture.length
      ? [{ id: "architecture", label: "Architecture" }]
      : []),
    { id: "features", label: "What I built" },
    ...(project.technicalDecisions.length
      ? [{ id: "decisions", label: "Decisions" }]
      : []),
    ...(project.metrics.length ? [{ id: "evidence", label: "Evidence" }] : []),
    { id: "limitations", label: "Limitations" },
    { id: "stack", label: "Stack" },
    ...(relatedRoles.length ? [{ id: "related", label: "Related" }] : []),
    { id: "next-project", label: "Next" },
  ];

  const panelIndex = (id: string) => {
    const index = railSections.findIndex((section) => section.id === id);
    return index === -1 ? undefined : String(index + 1).padStart(2, "0");
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.projectDetail} />
      <SiteNav active="projects" />
      {pageAtmospheres.projectDetail.decor ? (
        <PageDecorTop variant="spec" />
      ) : null}

      <main
        id="main-content"
        className={cn(
          "relative z-10 pb-24 pt-[8.5rem] md:pt-[7.1rem] lg:pb-20",
          pageGutters.railed
        )}
      >
        {/* ---------------------------------------------------------- masthead */}
        <div className="grid gap-12 lg:grid-cols-[0.44fr_0.56fr] lg:items-start lg:gap-10">
          <div className="min-w-0">
            <PageEyebrow index={eyebrowIndex} label={project.eyebrow} />

            <PageTitle size="detail" className="mt-6">
              {project.title}
            </PageTitle>

            <p className="mt-6 max-w-[28rem] text-[0.99rem] leading-[1.75] text-[#a2a8b5] lg:text-[1.04rem]">
              {project.oneLine}
            </p>

            {project.attribution ? (
              <p className="mt-4 max-w-[28rem] border-l border-accent-indigo-soft/35 pl-4 text-[0.86rem] leading-[1.6] text-white/55">
                {project.attribution}
              </p>
            ) : null}

            <TechLine
              items={project.displayTags}
              className="mt-7 text-[0.95rem] text-accent-indigo-soft/85"
            />

            <dl className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(7rem,max-content))] gap-x-12 gap-y-5">
              {[
                ["Ownership", ownershipLabels[project.ownership]],
                ["Timeline", project.displayDate],
                ["Status", project.statusLabel],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/55">
                    {label}
                  </dt>
                  <dd className="mt-2 text-[0.88rem] leading-[1.6] text-[#c3c8d2]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <ResourceActions
              links={project.links}
              recordTitle={project.title}
              className="mt-9"
            />
          </div>

          <div className="relative lg:-mt-2">
            <div className={project.media ? "[perspective:2200px]" : undefined}>
              <RecordVisual
                media={project.media}
                nodes={project.architecture}
                caption="System architecture"
                framed={Boolean(project.media)}
                frameLabel={project.title}
                frameBodyClassName="aspect-[16/10]"
                sizes="(min-width: 1024px) 52vw, 100vw"
                priority
                className={
                  project.media
                    ? "shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] lg:[transform:rotateY(-5deg)_rotateX(1.5deg)]"
                    : "border border-white/10 shadow-[0_44px_110px_-45px_rgba(0,0,0,0.95)]"
                }
              />
            </div>

            {project.media ? (
              <p className="mt-3.5 text-[0.78rem] leading-[1.55] text-white/55">
                {project.media.caption}
              </p>
            ) : null}
          </div>
        </div>

        {/* -------------------------------------------------- summary band */}
        <Reveal className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:mt-20 xl:grid-cols-3">
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
            title="My role"
            index={panelIndex("approach")}
            className="border-0"
          >
            <PanelText>{project.role}</PanelText>
          </Panel>
        </Reveal>

        {/* --------------------------------------- architecture / what built */}
        <Reveal className="mt-6 grid gap-px bg-white/10 lg:mt-8 xl:grid-cols-[1.15fr_1fr]">
          {project.architecture.length ? (
            <Panel
              id="architecture"
              title="System architecture"
              index={panelIndex("architecture")}
              className="border-0"
              bodyClassName="flex flex-col justify-center"
            >
              <ArchitectureFlow stages={project.architecture} size="detailed" />
            </Panel>
          ) : null}

          <Panel
            id="features"
            title="What I built"
            index={panelIndex("features")}
            className="border-0"
          >
            <PanelList
              items={project.whatBuilt}
              className={
                project.architecture.length
                  ? undefined
                  : "sm:grid-cols-2 sm:gap-x-10"
              }
            />
          </Panel>
        </Reveal>

        {/* --------------------------------------- decisions / validation */}
        <Reveal className="mt-6 grid gap-px bg-white/10 lg:mt-8 xl:grid-cols-2">
          {project.technicalDecisions.length ? (
            <Panel
              id="decisions"
              title="Technical decisions"
              index={panelIndex("decisions")}
              className="border-0"
            >
              <PanelList items={project.technicalDecisions} />
            </Panel>
          ) : null}

          <Panel
            id="validation"
            title="Testing and validation"
            className="border-0"
          >
            <PanelList items={project.testingAndValidation} />
          </Panel>
        </Reveal>

        {/* ------------------------------------------------------- evidence */}
        {project.metrics.length ? (
          <Reveal className="mt-6 lg:mt-8">
            <Panel
              id="evidence"
              title="Measured evidence"
              index={panelIndex("evidence")}
            >
              {/* Each figure keeps the run that produced it. That is the whole
                  argument of this page, so the methodology is rendered rather
                  than tucked into a tooltip. */}
              <MetricGrid metrics={project.metrics} columns={2} />

              <p className="mt-8 border-t border-white/10 pt-5 text-[0.86rem] leading-[1.7] text-[#a0a6b4]">
                {project.outcome}
              </p>
            </Panel>
          </Reveal>
        ) : null}

        {/* ---------------------------------------- limitations / privacy */}
        <Reveal className="mt-6 grid gap-px bg-white/10 lg:mt-8 xl:grid-cols-[1fr_0.85fr]">
          <Panel
            id="limitations"
            title="Limitations"
            index={panelIndex("limitations")}
            className="border-0"
          >
            <PanelList items={project.limitations} />
          </Panel>

          <Panel
            id="stack"
            title="Technology stack"
            index={panelIndex("stack")}
            className="border-0"
          >
            <TechLine items={project.stack} className="text-[0.88rem]" />

            {project.securityAndPrivacy ? (
              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
                  Data and privacy
                </p>
                <PanelText className="mt-2.5">
                  {project.securityAndPrivacy}
                </PanelText>
              </div>
            ) : null}
          </Panel>
        </Reveal>

        {/* -------------------------------------------- related / next up */}
        <div className="mt-6 grid gap-px bg-white/10 lg:mt-8 xl:grid-cols-[0.85fr_1fr]">
          {relatedRoles.length ? (
            <Panel
              id="related"
              title="Related experience"
              index={panelIndex("related")}
              className="border-0"
            >
              <ul className="grid gap-4">
                {relatedRoles.map((role) => (
                  <li key={role.slug}>
                    <Link
                      href={`/experience/${role.slug}`}
                      className="group/related inline-flex items-baseline gap-2.5 rounded-sm text-[0.9rem] text-[#c3c8d2] transition-colors outline-none hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      <span>
                        {role.shortOrganization}
                        <span className="text-white/55"> — {role.role}</span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-[0.85rem] shrink-0 transition-transform duration-200 group-hover/related:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          ) : null}

          {next ? (
            <NextRecordPanel
              index={panelIndex("next-project")}
              eyebrow="Next project"
              title={next.title}
              oneLine={next.oneLine}
              href={`/projects/${next.slug}`}
            />
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-7">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 rounded-sm text-[0.92rem] text-white/60 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All projects
          </Link>

          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="inline-flex items-center gap-3 rounded-sm text-[0.92rem] text-white/60 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              {`Previous: ${previous.shortTitle}`}
            </Link>
          ) : null}
        </div>

        <PageDecorFoot />
      </main>

      <SectionRail
        variant="labelled"
        gap="1.35rem"
        sections={anchorSections(railSections)}
        className="absolute right-[3.2%] top-[15.5rem] z-20 hidden xl:block"
      />

      <Footer className={pageGutters.railed} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Projects",
                  item: absoluteUrl("/projects"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: project.title,
                  item: absoluteUrl(`/projects/${project.slug}`),
                },
              ],
            },
            {
              /* SoftwareApplication only where something is genuinely usable;
                 everything else is a CreativeWork. No rating, review, offer or
                 download-count markup — there is no evidence for any of it. */
              "@type": project.links.some(
                (link) => link.kind === "live" || link.kind === "release"
              )
                ? "SoftwareApplication"
                : project.links.some((link) => link.kind === "source")
                  ? "SoftwareSourceCode"
                  : "CreativeWork",
              name: project.title,
              headline: project.seo.title,
              description: project.seo.description,
              url: absoluteUrl(`/projects/${project.slug}`),
              ...(project.slug === "formatclip"
                ? { applicationCategory: "BrowserApplication" }
                : {}),
              author: {
                "@type": "Person",
                name: "Jacob Allan",
                url: absoluteUrl("/"),
              },
              ...(project.links.find((link) => link.kind === "source")
                ? {
                    codeRepository: project.links.find(
                      (link) => link.kind === "source"
                    )!.href,
                  }
                : {}),
              keywords: project.stack.join(", "),
            },
          ],
        }}
      />
    </div>
  );
}

function NextRecordPanel({
  index,
  eyebrow,
  title,
  oneLine,
  href,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  oneLine: string;
  href: string;
}) {
  return (
    <section
      id="next-project"
      aria-labelledby="next-project-title"
      className="group scroll-mt-28 bg-[#090c13]/45"
    >
      <Link
        href={href}
        className="flex h-full flex-col justify-between gap-6 p-6 outline-none transition-colors duration-300 hover:bg-white/[0.02] focus-visible:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-indigo-soft/70 sm:p-7"
      >
        <div>
          <div className="flex items-center gap-3">
            {index ? (
              <span className="font-mono text-[0.78rem] tracking-[0.12em] text-accent-indigo-soft">
                {index}
              </span>
            ) : null}
            <span
              id="next-project-title"
              className="text-[1.02rem] font-medium tracking-[-0.01em] text-[#dfe2e9]"
            >
              {eyebrow}
            </span>
          </div>

          <p className="mt-5 text-[1.3rem] font-medium leading-snug tracking-[-0.018em] text-[#e2e5ec]">
            {title}
          </p>
          <p className="mt-2.5 max-w-[26rem] text-[0.85rem] leading-[1.62] text-[#8d93a1]">
            {oneLine}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="inline-flex items-center gap-2.5 text-[0.88rem] text-accent-indigo-soft transition-colors group-hover:text-white"
        >
          Continue
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
}
