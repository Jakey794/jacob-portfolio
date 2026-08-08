import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Boxes,
  CircuitBoard,
  FileText,
  HelpCircle,
  ListChecks,
  Sparkles,
  Users,
} from "lucide-react";

import { ArchitectureFlow } from "@/components/case-study/architecture-flow";
import {
  Panel,
  PanelList,
  PanelText,
  StatTiles,
} from "@/components/case-study/panel";
import { MetaRow, TagRow } from "@/components/experience/experience-explorer";
import { ResultMark, RoleSchematic } from "@/components/experience/role-visuals";
import { Footer } from "@/components/footer";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { PendingPlate, PendingText, PendingTile } from "@/components/pending";
import { ProjectThumb } from "@/components/projects/project-thumb";
import { SectionRail, anchorSections } from "@/components/section-rail";
import { SiteNav } from "@/components/site-nav";
import {
  experience,
  experienceSlugs,
  getAdjacentExperience,
  getExperienceBySlug,
  type ResultTile,
} from "@/lib/experience";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return experienceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getExperienceBySlug(slug);

  if (!item) {
    return { title: "Experience Not Found | Jacob Allan" };
  }

  const description = item.summary ?? item.bullets[0];

  return {
    title: `${item.organization} | Jacob Allan Experience`,
    description,
    openGraph: {
      title: `${item.role} — ${item.organization}`,
      description,
      type: "article",
    },
  };
}

/** Ordered as the panels are laid out, so the rail counts down the page. */
const railSections = [
  { id: "contributions", label: "Contributions" },
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "workflow", label: "Workflow" },
  { id: "results", label: "Results" },
  { id: "tools", label: "Tools" },
  { id: "team", label: "Team" },
  { id: "next-role", label: "Next Role" },
];

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getExperienceBySlug(slug);

  if (!item) {
    notFound();
  }

  const position = experience.findIndex((entry) => entry.slug === slug);
  const eyebrowIndex = String(position + 1).padStart(2, "0");
  const next = getAdjacentExperience(slug);

  /**
   * With no photograph to show, the masthead carries the workflow schematic —
   * and then the horizontal flow panel further down would repeat it verbatim.
   * Only one of the two renders.
   */
  const schematicInMasthead = !item.image && Boolean(item.workflow?.length);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.experienceDetail} />
      <SiteNav active="experience" />
      {pageAtmospheres.experienceDetail.decor ? (
        <PageDecorTop variant="instrument" />
      ) : null}

      {/* The wide right gutter only applies from xl, where the text-labelled
          rail is actually rendered. */}
      <main className="relative z-10 px-6 pb-28 pt-[8.5rem] sm:px-10 md:pt-[7.1rem] lg:pb-32 lg:pl-[5%] lg:pr-[5%] xl:pr-[15.5%]">
        {/* ---------------------------------------------------------- masthead */}
        <div className="grid gap-12 lg:grid-cols-[0.46fr_0.54fr] lg:items-start lg:gap-10">
          <div>
            <PageEyebrow index={eyebrowIndex} label="Experience Detail" />

            <PageTitle size="compact" className="mt-2">
              {item.organization}
            </PageTitle>

            <p className="mt-2.5 text-[1.02rem] text-accent-indigo-soft">
              {item.role}
            </p>

            {item.summary ? (
              <p className="mt-3.5 max-w-[28rem] text-[0.95rem] leading-[1.6] text-[#a2a8b5]">
                {item.summary}
              </p>
            ) : (
              <PendingText
                hint="Role summary"
                lines={3}
                className="mt-3.5 max-w-[28rem]"
              />
            )}

            <MetaRow dates={item.dates} location={item.location} className="mt-5" />

            <TagRow tags={item.tools} className="mt-4" />
          </div>

          {/*
            No photography exists for any role, so where there is none the
            masthead draws the role itself: the pipeline its bullets describe,
            as a signal chain. This slot previously held a dashed "role imagery
            pending" plate over the atmosphere band, which was the single most
            unfinished-looking element on the site.

            When the schematic lands here it takes the `workflow` anchor with
            it and the panel version below is dropped, so the same five stages
            are never drawn twice on one page.
          */}
          <div
            id={schematicInMasthead ? "workflow" : undefined}
            className="relative scroll-mt-28 lg:-mt-2"
          >
            {item.image ? (
              <div className="overflow-hidden border border-white/12 bg-[#0b0e16]">
                <ProjectThumb
                  src={item.image}
                  alt={item.imageAlt ?? `${item.organization} imagery`}
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  priority
                  className="aspect-[16/10]"
                />
              </div>
            ) : schematicInMasthead ? (
              <RoleSchematic
                stages={item.workflow!}
                caption="System workflow"
                className="border border-white/10"
              />
            ) : (
              <PendingPlate hint="Role imagery" className="aspect-[16/10]" />
            )}
          </div>
        </div>

        {/* -------------------------------------------------- summary band */}
        {/*
          Contributions leads. It is the only panel of the three that is
          populated for every role — `summary` and `context` are unwritten
          across the board — so putting the written work first keeps the band
          from opening on two placeholders.
        */}
        <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:mt-16 xl:grid-cols-[1.4fr_1fr_1fr]">
          <Panel
            id="contributions"
            title="Technical Contributions"
            icon={ListChecks}
            className="border-0 sm:col-span-2 xl:col-span-1"
          >
            <PanelList items={item.bullets} />
          </Panel>

          <Panel id="overview" title="Overview" icon={Sparkles} className="border-0">
            {item.summary ? (
              <PanelText>{item.summary}</PanelText>
            ) : (
              <PendingText hint="Overview" lines={4} />
            )}
          </Panel>

          <Panel
            id="context"
            title="Problem / Context"
            icon={HelpCircle}
            className="border-0"
          >
            {item.context ? (
              <PanelText>{item.context}</PanelText>
            ) : (
              <PendingText hint="Problem / context" lines={4} />
            )}
          </Panel>
        </div>

        {/* ------------------------------------------- workflow / results */}
        <div
          className={`mt-6 grid gap-px bg-white/10 lg:mt-8 ${
            schematicInMasthead ? "" : "xl:grid-cols-[1.15fr_1fr]"
          }`}
        >
          {schematicInMasthead ? null : (
            <Panel
              id="workflow"
              title="System Workflow"
              icon={CircuitBoard}
              className="border-0"
              bodyClassName="flex flex-col justify-center"
            >
              {item.workflow?.length ? (
                <ArchitectureFlow
                  stages={item.workflow}
                  size="detailed"
                  feedbackLabel={item.feedbackLabel}
                />
              ) : (
                <PendingPlate hint="Workflow diagram" className="min-h-[10rem]" />
              )}
            </Panel>
          )}

          <Panel id="results" title="Key Results" icon={FileText} className="border-0">
            {item.results?.length ? (
              <StatTiles tiles={item.results} columns={3} />
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                <PendingTile hint="Result pending" />
                <PendingTile hint="Result pending" />
              </ul>
            )}
          </Panel>
        </div>

        {/* ------------------------------------------------ tools / team / next */}
        <div className="mt-6 grid gap-px bg-white/10 lg:mt-8 xl:grid-cols-[1fr_0.85fr_1fr]">
          <Panel id="tools" title="Tools & Stack" icon={Boxes} className="border-0">
            <ul className="flex flex-wrap gap-2">
              {item.tools.map((tool) => (
                <li
                  key={tool}
                  className="flex items-center gap-2 border border-white/12 bg-white/[0.02] px-3 py-2 text-[0.8rem] text-[#c3c8d2]"
                >
                  <span
                    aria-hidden="true"
                    className="size-[5px] rounded-full bg-accent-indigo-soft/70"
                  />
                  {tool}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            id="team"
            title="Team / Collaboration"
            icon={Users}
            className="border-0"
          >
            {item.team?.length ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {item.team.map((group) => (
                  <div key={group.label}>
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/35">
                      {group.label}
                    </p>
                    <ul className="mt-3 grid gap-2">
                      {group.items.map((entry) => (
                        <li
                          key={entry}
                          className="text-[0.82rem] leading-[1.5] text-[#a0a6b4]"
                        >
                          {entry}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <PendingText hint="Team / collaboration" lines={4} />
            )}
          </Panel>

          {next ? (
            <NextExperiencePanel
              index={String(
                ((position + 1) % experience.length) + 1
              ).padStart(2, "0")}
              organization={next.organization}
              role={next.role}
              summary={next.summary ?? next.bullets[0]}
              href={`/experience/${next.slug}`}
              image={next.image}
              imageAlt={next.imageAlt}
              results={next.results}
            />
          ) : null}
        </div>

        <div className="mt-10 border-t border-white/10 pt-7">
          <Link
            href="/experience"
            className="inline-flex items-center gap-3 rounded-sm text-[0.92rem] text-white/60 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <ArrowRight aria-hidden="true" className="size-4 rotate-180" />
            All experience
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

      <Footer />
    </div>
  );
}

function NextExperiencePanel({
  index,
  organization,
  role,
  summary,
  href,
  image,
  imageAlt,
  results,
}: {
  index: string;
  organization: string;
  role: string;
  summary: string;
  href: string;
  image?: string;
  imageAlt?: string;
  results?: ResultTile[];
}) {
  return (
    <section
      id="next-role"
      aria-labelledby="next-role-title"
      className="group scroll-mt-28 bg-[#090c13]/45"
    >
      <Link
        href={href}
        className="flex h-full flex-col gap-5 p-6 outline-none transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.03] sm:p-7"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.78rem] tracking-[0.12em] text-accent-indigo-soft">
            {index}
          </span>
          <span
            id="next-role-title"
            className="text-[1.02rem] font-medium tracking-[-0.01em] text-[#dfe2e9]"
          >
            Next Experience
          </span>
        </div>

        <div className="flex flex-1 items-start gap-5">
          <div className="min-w-0 flex-1">
            <p className="text-[1.02rem] font-medium leading-snug tracking-[-0.015em] text-[#e2e5ec]">
              {organization}
            </p>
            <p className="mt-1.5 text-[0.85rem] text-accent-indigo-soft/85">
              {role}
            </p>
            <p className="mt-3 line-clamp-3 text-[0.82rem] leading-[1.6] text-[#8d93a1]">
              {summary}
            </p>
          </div>

          {image ? (
            <ProjectThumb
              src={image}
              alt={imageAlt ?? `${organization} preview`}
              sizes="(min-width: 1024px) 14vw, 34vw"
              className="hidden aspect-[16/10] w-[8.5rem] shrink-0 border border-white/12 sm:block"
            />
          ) : results?.length ? (
            <ResultMark
              results={results}
              className="hidden aspect-[16/10] w-[8.5rem] shrink-0 sm:grid"
            />
          ) : (
            <PendingPlate
              hint="Image"
              className="hidden aspect-[16/10] w-[8.5rem] shrink-0 sm:grid"
            />
          )}
        </div>

        <span
          aria-hidden="true"
          className="inline-flex items-center gap-2.5 text-[0.88rem] text-accent-indigo-soft transition-colors group-hover:text-white"
        >
          View next role
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
}
