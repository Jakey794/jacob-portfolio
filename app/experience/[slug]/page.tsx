import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { ArchitectureFlow } from "@/components/case-study/architecture-flow";
import {
  Panel,
  PanelList,
  PanelText,
  StatTiles,
} from "@/components/case-study/panel";
import { MetaRow } from "@/components/experience/experience-explorer";
import { ResultMark, RoleSchematic } from "@/components/experience/role-visuals";
import { Footer } from "@/components/footer";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageDecorFoot, PageDecorTop } from "@/components/page-decor";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { PendingPlate } from "@/components/pending";
import { ProjectThumb } from "@/components/projects/project-thumb";
import { SectionRail, anchorSections } from "@/components/section-rail";
import { TechLine, pageGutters } from "@/components/section-shell";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";
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

  /*
    Which panels this role actually has content for.

    `summary`, `context`, `team` and `location` are unset for every role in
    `lib/experience.ts`, so the page used to render five skeleton placeholders
    per role — "role summary pending" directly under the job title, then
    "overview pending", "problem / context pending", "team / collaboration
    pending" and "location pending". A reader met four grey stubs before any
    real work. Empty slots are dropped instead: the bands close up around what
    exists, and the outstanding fields stay documented in the data file rather
    than on the page.
  */
  const hasOverview = Boolean(item.summary);
  const hasContext = Boolean(item.context);
  const hasTeam = Boolean(item.team?.length);
  const hasResults = Boolean(item.results?.length);
  const hasWorkflow = Boolean(item.workflow?.length);

  /* Ordered as the panels are laid out, so the rail counts down the page — and
     built from what renders, so no entry scrolls to a section that is absent. */
  const railSections = [
    { id: "contributions", label: "Contributions" },
    ...(hasOverview ? [{ id: "overview", label: "Overview" }] : []),
    ...(hasContext ? [{ id: "context", label: "Context" }] : []),
    ...(hasWorkflow ? [{ id: "workflow", label: "Workflow" }] : []),
    ...(hasResults ? [{ id: "results", label: "Results" }] : []),
    { id: "tools", label: "Tools" },
    ...(hasTeam ? [{ id: "team", label: "Team" }] : []),
    ...(next ? [{ id: "next-role", label: "Next Role" }] : []),
  ];

  /** Panel heads carry the same index the rail entry that targets them does. */
  const panelIndex = (id: string) => {
    const position = railSections.findIndex((section) => section.id === id);
    return position === -1
      ? undefined
      : String(position + 1).padStart(2, "0");
  };

  const summaryPanels = 1 + Number(hasOverview) + Number(hasContext);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.experienceDetail} />
      <SiteNav active="experience" />
      {pageAtmospheres.experienceDetail.decor ? (
        <PageDecorTop variant="instrument" />
      ) : null}

      {/* The wide right gutter only applies from xl, where the text-labelled
          rail is actually rendered. */}
      <main className={cn("relative z-10 pb-24 pt-[8.5rem] md:pt-[7.1rem] lg:pb-20", pageGutters.railed)}>
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
            ) : null}

            <MetaRow dates={item.dates} location={item.location} className="mt-5" />

            {/* A line, not chips — the masthead is unboxed, and the same tools
                already appear as chips in the index card this page opens
                from. */}
            <TechLine
              items={item.tools}
              className="mt-4 text-[0.95rem] text-accent-indigo-soft/85"
            />
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
              <div className="overflow-hidden border border-white/10 bg-[#0b0e16]">
                <ProjectThumb
                  src={item.image}
                  alt={item.imageAlt ?? `${item.organization} imagery`}
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  priority
                  className="aspect-[16/10]"
                />
              </div>
            ) : schematicInMasthead ? (
              // The fill stays opaque — the corner readout sits behind this
              // slot and ghosts through anything translucent — but it is lifted
              // off the plate with a soft cast shadow, so the panel reads as
              // resting over the scene rather than as cut out of it.
              <RoleSchematic
                stages={item.workflow!}
                caption="System workflow"
                className="border border-white/10 shadow-[0_44px_110px_-45px_rgba(0,0,0,0.95)]"
              />
            ) : (
              <PendingPlate hint="Role imagery" className="aspect-[16/10]" />
            )}
          </div>
        </div>

        {/* -------------------------------------------------- summary band */}
        {/*
          Contributions leads: it is the one panel populated for every role.
          The band sizes itself to however many of the three have content, so a
          role with no written summary or context opens on one full-width panel
          of real work rather than on one panel and two stubs.
        */}
        <div
          className={cn(
            "mt-14 grid gap-px bg-white/10 lg:mt-16",
            summaryPanels === 3 &&
              "sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr]",
            summaryPanels === 2 && "xl:grid-cols-[1.4fr_1fr]"
          )}
        >
          <Panel
            id="contributions"
            title="Technical Contributions"
            index={panelIndex("contributions")}
            className={cn(
              "border-0",
              summaryPanels === 3 && "sm:col-span-2 xl:col-span-1"
            )}
          >
            {/* Alone, the panel runs the full measure of the page, so the
                bullets are set in two tracks rather than as fourteen-hundred
                pixel lines. */}
            <PanelList
              items={item.bullets}
              className={cn(
                summaryPanels === 1 && "gap-x-14 lg:grid-cols-2 xl:gap-x-20"
              )}
            />
          </Panel>

          {hasOverview ? (
            <Panel
              id="overview"
              title="Overview"
              index={panelIndex("overview")}
              className="border-0"
            >
              <PanelText>{item.summary}</PanelText>
            </Panel>
          ) : null}

          {hasContext ? (
            <Panel
              id="context"
              title="Problem / Context"
              index={panelIndex("context")}
              className="border-0"
            >
              <PanelText>{item.context}</PanelText>
            </Panel>
          ) : null}
        </div>

        {/* ------------------------------------------- workflow / results */}
        <div
          className={cn(
            "mt-6 grid gap-px bg-white/10 lg:mt-8",
            !schematicInMasthead && hasWorkflow && hasResults &&
              "xl:grid-cols-[1.15fr_1fr]"
          )}
        >
          {!schematicInMasthead && hasWorkflow ? (
            <Panel
              id="workflow"
              title="System Workflow"
              index={panelIndex("workflow")}
              className="border-0"
              bodyClassName="flex flex-col justify-center"
            >
              <ArchitectureFlow
                stages={item.workflow!}
                size="detailed"
                feedbackLabel={item.feedbackLabel}
              />
            </Panel>
          ) : null}

          {hasResults ? (
            <Panel
              id="results"
              title="Key Results"
              index={panelIndex("results")}
              className="border-0"
            >
              <StatTiles tiles={item.results!} columns={3} />
            </Panel>
          ) : null}
        </div>

        {/* ------------------------------------------------ tools / team / next */}
        <div
          className={cn(
            "mt-6 grid gap-px bg-white/10 lg:mt-8",
            /* Without a team panel the band is two cells, and the tools line
               is a single line of text: giving it the wider track left a
               quarter of a screen of empty panel beside it. The narrower track
               holds the line and the next-role card gets the width, which also
               shortens the band. */
            hasTeam ? "xl:grid-cols-[1fr_0.85fr_1fr]" : "xl:grid-cols-[0.76fr_1fr]"
          )}
        >
          <Panel
            id="tools"
            title="Tools & Stack"
            index={panelIndex("tools")}
            className="border-0"
          >
            {/* Set as a line rather than as bordered chips. Six rectangles
                inside an already-bordered panel is the same tag cloud the
                homepage dropped, and it read as the loudest thing in the
                band. */}
            <TechLine items={item.tools} className="text-[0.88rem]" />
          </Panel>

          {hasTeam ? (
            <Panel
              id="team"
              title="Team / Collaboration"
              index={panelIndex("team")}
              className="border-0"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {item.team!.map((group) => (
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
            </Panel>
          ) : null}

          {next ? (
            <NextExperiencePanel
              index={panelIndex("next-role")}
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

      <Footer className={pageGutters.railed} />
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
  index?: string;
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
              className="hidden aspect-[16/10] w-[8.5rem] shrink-0 border border-white/10 sm:block"
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
