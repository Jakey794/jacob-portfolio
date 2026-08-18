import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";

import { ArchitectureFlow } from "@/components/case-study/architecture-flow";
import { Panel, PanelList, PanelText } from "@/components/case-study/panel";
import { MetricGrid } from "@/components/evidence";
import {
  MetaRow,
  RoleHistory,
} from "@/components/experience/experience-explorer";
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
import {
  experience,
  experienceSlugs,
  getAdjacentExperience,
  getExperienceBySlug,
  roleHistory,
} from "@/lib/experience";
import { allProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

/** All ten records get a route, resolved from the collection. */
export function generateStaticParams() {
  return experienceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getExperienceBySlug(slug);

  if (!item) return { title: "Experience not found" };

  const url = absoluteUrl(`/experience/${item.slug}`);

  return {
    title: item.seo.title,
    description: item.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${item.seo.title} | Jacob Allan`,
      description: item.seo.description,
      url,
      type: "article",
      images: [
        {
          url: absoluteUrl("/images/og/experience.jpg"),
          width: 1200,
          height: 630,
          alt: `${item.role} — ${item.organization}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.seo.title} | Jacob Allan`,
      description: item.seo.description,
    },
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getExperienceBySlug(slug);

  if (!item) notFound();

  const position = experience.findIndex((entry) => entry.slug === slug);
  const eyebrowIndex = String(position + 1).padStart(2, "0");
  const { previous, next } = getAdjacentExperience(slug);
  const history = roleHistory(item);

  const relatedProjects = item.relatedProjectSlugs
    .map((related) => allProjects.find((project) => project.slug === related))
    .filter((project): project is (typeof allProjects)[number] =>
      Boolean(project)
    );

  const hasContext = Boolean(item.context);
  const hasMetrics = item.metrics.length > 0;
  const hasWorkflow = Boolean(item.workflow?.length);
  const hasCaveats = item.claimCaveats.length > 0;

  /*
    The workflow diagram renders once. When the masthead carries it — which is
    the case for every role with no photography — the horizontal panel version
    is dropped, so the same stages are never drawn twice on one page.
  */
  const workflowInMasthead = !item.media && hasWorkflow;

  const railSections = [
    { id: "contributions", label: "Contributions" },
    { id: "overview", label: "Overview" },
    ...(hasContext ? [{ id: "context", label: "Context" }] : []),
    ...(hasWorkflow ? [{ id: "workflow", label: "Workflow" }] : []),
    ...(hasMetrics ? [{ id: "outcomes", label: "Outcomes" }] : []),
    { id: "tools", label: "Tools" },
    ...(hasCaveats || item.confidentialityNote
      ? [{ id: "scope", label: "Scope" }]
      : []),
    ...(relatedProjects.length ? [{ id: "related", label: "Related" }] : []),
    ...(next ? [{ id: "next-role", label: "Next" }] : []),
  ];

  const panelIndex = (id: string) => {
    const index = railSections.findIndex((section) => section.id === id);
    return index === -1 ? undefined : String(index + 1).padStart(2, "0");
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.experienceDetail} />
      <SiteNav active="experience" />
      {pageAtmospheres.experienceDetail.decor ? (
        <PageDecorTop variant="instrument" />
      ) : null}

      <main
        id="main-content"
        className={cn(
          "relative z-10 pb-24 pt-[8.5rem] md:pt-[7.1rem] lg:pb-20",
          pageGutters.railed
        )}
      >
        {/* ---------------------------------------------------------- masthead */}
        <div className="grid gap-12 lg:grid-cols-[0.5fr_0.5fr] lg:items-start lg:gap-10">
          <div className="min-w-0">
            <PageEyebrow index={eyebrowIndex} label="Experience" />

            <PageTitle size="compact" className="mt-2">
              {item.organization}
            </PageTitle>

            <p className="mt-2.5 text-[1.02rem] text-accent-indigo-soft">
              {item.role}
            </p>

            <p className="mt-3.5 max-w-[30rem] text-[0.95rem] leading-[1.65] text-[#a2a8b5]">
              {item.summary}
            </p>

            <MetaRow
              dates={item.displayDates}
              location={item.location}
              workMode={item.workMode}
              className="mt-5"
            />

            <RoleHistory history={history} className="mt-3" />

            <TechLine
              items={item.tools.slice(0, 8)}
              className="mt-4 text-[0.92rem] text-accent-indigo-soft/85"
            />
          </div>

          <div
            id={workflowInMasthead ? "workflow" : undefined}
            className="relative scroll-mt-28 lg:-mt-2"
          >
            <RecordVisual
              media={item.media}
              nodes={workflowInMasthead ? item.workflow : undefined}
              caption="Public-scope workflow"
              sizes="(min-width: 1024px) 48vw, 100vw"
              priority
              className="border border-white/10 shadow-[0_44px_110px_-45px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>

        {/* -------------------------------------------------- summary band */}
        <Reveal
          className={cn(
            "mt-16 grid gap-px bg-white/10 lg:mt-20",
            hasContext ? "xl:grid-cols-[1.35fr_1fr]" : ""
          )}
        >
          <Panel
            id="contributions"
            title="Contributions"
            index={panelIndex("contributions")}
            className="border-0"
          >
            <PanelList items={item.responsibilities} />
          </Panel>

          {hasContext ? (
            <Panel
              id="context"
              title="Context"
              index={panelIndex("context")}
              className="border-0"
            >
              <PanelText>{item.context}</PanelText>

              <div id="overview" className="mt-6 scroll-mt-28">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
                  In one line
                </p>
                <PanelText className="mt-2.5">{item.oneLine}</PanelText>
              </div>
            </Panel>
          ) : (
            <Panel
              id="overview"
              title="Overview"
              index={panelIndex("overview")}
              className="border-0"
            >
              <PanelText>{item.oneLine}</PanelText>
            </Panel>
          )}
        </Reveal>

        {/* --------------------------------------------- workflow / outcomes */}
        {!workflowInMasthead && hasWorkflow ? (
          <Reveal className="mt-6 lg:mt-8">
            <Panel
              id="workflow"
              title="Workflow"
              index={panelIndex("workflow")}
              bodyClassName="flex flex-col justify-center"
            >
              <ArchitectureFlow stages={item.workflow!} />
            </Panel>
          </Reveal>
        ) : null}

        {hasMetrics ? (
          <Reveal className="mt-6 lg:mt-8">
            <Panel
              id="outcomes"
              title="Measured outcomes"
              index={panelIndex("outcomes")}
            >
              <MetricGrid metrics={item.metrics} columns={2} />
            </Panel>
          </Reveal>
        ) : null}

        {/* -------------------------------------------------- tools / scope */}
        <Reveal className="mt-6 grid gap-px bg-white/10 lg:mt-8 xl:grid-cols-[0.85fr_1fr]">
          <Panel
            id="tools"
            title="Tools & stack"
            index={panelIndex("tools")}
            className="border-0"
          >
            <TechLine items={item.tools} className="text-[0.88rem]" />
          </Panel>

          {hasCaveats || item.confidentialityNote ? (
            <Panel
              id="scope"
              title="Scope of this page"
              index={panelIndex("scope")}
              className="border-0"
            >
              {item.confidentialityNote ? (
                <p className="flex gap-3 text-[0.84rem] leading-[1.7] text-[#949aa8]">
                  <Lock
                    aria-hidden="true"
                    className="mt-[0.22rem] size-[0.85rem] shrink-0 text-white/55"
                  />
                  {item.confidentialityNote}
                </p>
              ) : null}

              {hasCaveats ? (
                <PanelList
                  items={item.claimCaveats}
                  className={item.confidentialityNote ? "mt-5" : undefined}
                />
              ) : null}
            </Panel>
          ) : null}
        </Reveal>

        {/* -------------------------------------------- related / next role */}
        <div className="mt-6 grid gap-px bg-white/10 lg:mt-8 xl:grid-cols-[0.85fr_1fr]">
          {relatedProjects.length ? (
            <Panel
              id="related"
              title="Related public work"
              index={panelIndex("related")}
              className="border-0"
            >
              <ul className="grid gap-4">
                {relatedProjects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/related inline-flex items-baseline gap-2.5 rounded-sm text-[0.9rem] text-[#c3c8d2] transition-colors outline-none hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      {project.shortTitle}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-[0.85rem] shrink-0 transition-transform duration-200 group-hover/related:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-white/10 pt-4 text-[0.78rem] leading-[1.55] text-white/55">
                Personal projects, listed for the shared themes. Neither was
                built for this organisation.
              </p>
            </Panel>
          ) : null}

          {next ? (
            <NextRolePanel
              index={panelIndex("next-role")}
              organization={next.shortOrganization}
              role={next.role}
              oneLine={next.oneLine}
              href={`/experience/${next.slug}`}
            />
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-7">
          <Link
            href="/experience"
            className="inline-flex items-center gap-3 rounded-sm text-[0.92rem] text-white/60 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All experience
          </Link>

          {previous ? (
            <Link
              href={`/experience/${previous.slug}`}
              className="inline-flex items-center gap-3 rounded-sm text-[0.92rem] text-white/60 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              {`Previous: ${previous.shortOrganization}`}
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
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Experience",
              item: absoluteUrl("/experience"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: `${item.role} — ${item.organization}`,
              item: absoluteUrl(`/experience/${item.slug}`),
            },
          ],
        }}
      />
    </div>
  );
}

function NextRolePanel({
  index,
  organization,
  role,
  oneLine,
  href,
}: {
  index?: string;
  organization: string;
  role: string;
  oneLine: string;
  href: string;
}) {
  return (
    <section
      id="next-role"
      aria-labelledby="next-role-title"
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
              id="next-role-title"
              className="text-[1.02rem] font-medium tracking-[-0.01em] text-[#dfe2e9]"
            >
              Next experience
            </span>
          </div>

          <p className="mt-5 text-[1.2rem] font-medium leading-snug tracking-[-0.015em] text-[#e2e5ec]">
            {organization}
          </p>
          <p className="mt-1.5 text-[0.88rem] text-accent-indigo-soft/85">
            {role}
          </p>
          <p className="mt-3 max-w-[26rem] text-[0.84rem] leading-[1.6] text-[#8d93a1]">
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
