"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProofChips, ResourceLinkRow } from "@/components/evidence";
import {
  MetricPlate,
  QuietPlate,
  RecordVisual,
} from "@/components/media/record-visual";
import { CaptureFrame } from "@/components/projects/capture-frame";
import { Reveal } from "@/components/reveal";
import { SectionRail } from "@/components/section-rail";
import { Tag } from "@/components/section-shell";
import type { FlowNode, Media, ResourceLink } from "@/lib/content-types";
import { cn } from "@/lib/utils";

/**
 * Serialisable slice of a project, prepared on the server.
 *
 * Deliberately a projection rather than the whole record: this is a client
 * component, so everything here crosses into the bundle, and a project record
 * carries several kilobytes of case-study prose that the index never renders.
 */
export type ProjectIndexItem = {
  slug: string;
  title: string;
  oneLine: string;
  eyebrow: string;
  ownershipLabel: string;
  statusLabel: string;
  displayDate: string;
  archive: boolean;
  attribution?: string;
  categories: string[];
  displayTags: string[];
  proof: string;
  /** First metric, shown in the thumbnail slot when there is no capture. */
  headlineMetric?: { value: string; label: string };
  links: ResourceLink[];
  media?: Media;
  architecture: FlowNode[];
};

export type ProjectFilter = { key: string; count: number };

export function ProjectsExplorer({
  projects,
  filters,
}: {
  projects: ProjectIndexItem[];
  filters: readonly ProjectFilter[];
}) {
  const [filter, setFilter] = useState("All");
  const statusId = useId();

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter, projects]
  );

  /* The archive record always sorts last and is labelled, so a collaborative
     contribution can never be mistaken for owned flagship work. */
  const primary = visible.filter((project) => !project.archive);
  const archived = visible.filter((project) => project.archive);
  const [lead, ...rest] = primary;

  return (
    <div className="relative">
      <FilterRow
        filters={filters}
        value={filter}
        onChange={setFilter}
        count={visible.length}
        statusId={statusId}
      />

      <div className="mt-9 lg:mt-11">
        {lead ? (
          <Reveal>
            <FeaturedCard project={lead} index={1} />
          </Reveal>
        ) : null}

        {rest.length > 0 ? (
          <ul className="mt-6 border-t border-white/10 lg:mt-8">
            {rest.map((project, index) => (
              <CompactRow
                key={project.slug}
                project={project}
                index={index + 2}
              />
            ))}
          </ul>
        ) : null}

        {archived.length > 0 ? (
          <section
            aria-labelledby={`${statusId}-archive`}
            className="mt-14 lg:mt-16"
          >
            <h2
              id={`${statusId}-archive`}
              className="flex items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/55"
            >
              Collaborative / Archive
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.12),transparent)]"
              />
            </h2>

            <ul className="mt-5 border-t border-white/10">
              {archived.map((project, index) => (
                <CompactRow
                  key={project.slug}
                  project={project}
                  index={primary.length + index + 1}
                />
              ))}
            </ul>
          </section>
        ) : null}

        {visible.length === 0 ? (
          <p className="border border-white/10 px-6 py-16 text-center text-sm text-white/55">
            No projects match this filter.
          </p>
        ) : null}
      </div>

      {/* Numbered rail, derived from the visible set so it never points at a
          filtered-out card. */}
      <SectionRail
        className="absolute -right-[6.5%] top-[3.5rem] z-10 hidden xl:block"
        gap="2.35rem"
        sections={visible.map((project, index) => ({
          index: String(index + 1).padStart(2, "0"),
          label: project.title,
          href: `#project-${project.slug}`,
        }))}
      />
    </div>
  );
}

/**
 * The filter row.
 *
 * Native buttons with `aria-pressed`, and the result count in a polite live
 * region that is present at every width. The previous version hid the count
 * below `sm`, which meant the one announcement a screen-reader user gets when
 * the list changes was also the element most likely to be display:none.
 */
function FilterRow({
  filters,
  value,
  onChange,
  count,
  statusId,
}: {
  filters: readonly ProjectFilter[];
  value: string;
  onChange: (next: string) => void;
  count: number;
  statusId: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-3">
      <div
        role="group"
        aria-label="Filter projects by discipline"
        className="flex flex-wrap items-center gap-x-7 gap-y-2 sm:gap-x-9"
      >
        {filters.map((option) => {
          const isActive = option.key === value;

          return (
            <button
              key={option.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.key)}
              className={cn(
                "relative -mb-[13px] pb-3 text-[0.95rem] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "text-accent-indigo-soft"
                  : "text-white/55 hover:text-white/85"
              )}
            >
              {option.key}
              <span className="sr-only">{` (${option.count} projects)`}</span>
              {/* The active filter is marked by an underline as well as by
                  colour, so the selection is not carried by hue alone. */}
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[1.5px] bg-accent-indigo-soft"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <p
        id={statusId}
        aria-live="polite"
        className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-white/55"
      >
        {count} {count === 1 ? "project" : "projects"}
      </p>
    </div>
  );
}

function FeaturedCard({
  project,
  index,
}: {
  project: ProjectIndexItem;
  index: number;
}) {
  return (
    <article
      id={`project-${project.slug}`}
      className="group relative grid scroll-mt-28 overflow-hidden border border-white/10 bg-[#090c13]/60 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-[2px] hover:border-white/20 lg:grid-cols-[0.4fr_0.6fr]"
    >
      <div className="flex flex-col items-start gap-7 p-7 sm:p-8 lg:px-9 lg:py-9">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.18em]">
            <span className="text-white/55">
              {String(index).padStart(2, "0")}
            </span>
            <span className="text-accent-indigo-soft">{project.eyebrow}</span>
          </p>

          {/* h2, not h3: this is the first heading under the page h1, and
              jumping straight to h3 is a level skip for a screen-reader user
              navigating by heading. The compact rows below are h3. */}
          <h2 className="mt-4 text-[1.55rem] font-medium leading-tight tracking-[-0.02em] text-[#e2e5ec] sm:text-[1.75rem]">
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-sm outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {project.title}
            </Link>
          </h2>

          <p className="mt-3.5 max-w-[22rem] text-[1rem] leading-[1.65] text-[#9ba1af]">
            {project.oneLine}
          </p>

          <ProofChips chips={[project.proof]} className="mt-5" />
          <TagRow tags={project.displayTags} className="mt-5" />
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex w-fit items-center gap-3 rounded-sm text-[0.98rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {`Explore ${project.title}`}
            <ArrowRight
              aria-hidden="true"
              className="size-[1.05rem] transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          <ResourceLinkRow
            links={project.links}
            recordTitle={project.title}
          />
        </div>
      </div>

      <div className="relative border-t border-white/10 p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-7">
        <RecordVisual
          media={project.media}
          nodes={project.architecture}
          caption="System architecture"
          frameLabel={project.title}
          framed={Boolean(project.media)}
          sizes="(min-width: 1024px) 52vw, 100vw"
          priority
          frameBodyClassName="aspect-[2/1] lg:aspect-[2.4/1]"
          className={
            project.media
              ? "shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)]"
              : "h-full min-h-[15rem] border border-white/10"
          }
        />
      </div>
    </article>
  );
}

function CompactRow({
  project,
  index,
}: {
  project: ProjectIndexItem;
  index: number;
}) {
  return (
    <li
      id={`project-${project.slug}`}
      className="group relative scroll-mt-28 border-b border-white/10"
    >
      <div className="flex items-center gap-5 px-1 py-5 transition-colors duration-300 hover:bg-white/[0.02] sm:gap-7 sm:px-3 sm:py-6">
        <span className="hidden shrink-0 self-center font-mono text-[0.78rem] tracking-[0.12em] text-white/55 sm:block">
          {String(index).padStart(2, "0")}
        </span>

        <CaptureFrame
          chrome={false}
          className="aspect-[16/10] w-[7rem] shrink-0 sm:w-[9.5rem] lg:w-[11rem]"
        >
          {project.media ? (
            <RecordVisual
              media={project.media}
              caption=""
              variant="detail"
              decorative
              sizes="(min-width: 1024px) 15vw, 32vw"
              className="absolute inset-0"
            />
          ) : project.headlineMetric ? (
            <MetricPlate
              value={project.headlineMetric.value}
              label={project.headlineMetric.label}
              className="absolute inset-0"
            />
          ) : (
            <QuietPlate className="absolute inset-0" />
          )}
        </CaptureFrame>

        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-white/55">
            {project.archive ? project.ownershipLabel : project.statusLabel}
          </p>

          <h3 className="mt-1.5 text-[1.12rem] font-medium leading-snug tracking-[-0.01em] text-[#e2e5ec]">
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-sm outline-none transition-colors after:absolute after:inset-0 after:content-[''] hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-2 max-w-[38rem] text-[0.88rem] leading-[1.6] text-[#8d93a1]">
            {project.oneLine}
          </p>

          {project.attribution ? (
            <p className="mt-2 text-[0.78rem] leading-[1.5] text-white/55">
              {project.attribution}
            </p>
          ) : null}
        </div>

        <TagRow
          tags={project.displayTags.slice(0, 3)}
          className="hidden w-[15rem] shrink-0 lg:flex"
        />

        <ArrowRight
          aria-hidden="true"
          className="hidden size-[1.05rem] shrink-0 self-center text-white/55 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-indigo-soft sm:block"
        />
      </div>
    </li>
  );
}

function TagRow({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </ul>
  );
}
