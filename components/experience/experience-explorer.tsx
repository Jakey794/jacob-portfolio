"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { ProofChips } from "@/components/evidence";
import { RecordVisual } from "@/components/media/record-visual";
import { StageChain } from "@/components/experience/role-visuals";
import { Reveal } from "@/components/reveal";
import { SectionRail } from "@/components/section-rail";
import { Tag } from "@/components/section-shell";
import type { FlowNode, Media, VisualMedia } from "@/lib/content-types";
import { cn } from "@/lib/utils";

/** Serialisable slice of an experience record, prepared on the server. */
export type ExperienceIndexItem = {
  slug: string;
  organization: string;
  shortOrganization: string;
  role: string;
  displayDates: string;
  current: boolean;
  categories: string[];
  tools: string[];
  oneLine: string;
  summary: string;
  location?: string;
  workMode?: string;
  archive: boolean;
  proofChips: string[];
  workflow?: FlowNode[];
  thumbnailMedia?: VisualMedia;
  media?: Media;
  /** Other roles held at the same organisation, e.g. a promotion history. */
  roleHistory: { slug: string; role: string; displayDates: string }[];
};

export type ExperienceFilter = { key: string; count: number };

export function ExperienceExplorer({
  items,
  filters,
}: {
  items: ExperienceIndexItem[];
  filters: readonly ExperienceFilter[];
}) {
  const [filter, setFilter] = useState("All");
  const statusId = useId();

  const visible = useMemo(
    () =>
      filter === "All"
        ? items
        : items.filter((item) => item.categories.includes(filter)),
    [filter, items]
  );

  /* "Earlier experience" is a heading, not a deletion. Every one of the ten
     records renders under every filter it belongs to; the archive flag only
     decides which of the two groups it sits in. */
  const current = visible.filter((item) => !item.archive);
  const earlier = visible.filter((item) => item.archive);
  const [lead, ...rest] = current;

  return (
    <div className="relative">
      <FilterRow
        filters={filters}
        value={filter}
        onChange={setFilter}
        count={visible.length}
        statusId={statusId}
      />

      <div className="mt-5 lg:-mt-1">
        {lead ? (
          <Reveal>
            <FeaturedExperience item={lead} />
          </Reveal>
        ) : null}

        {rest.length > 0 ? <Timeline items={rest} /> : null}

        {earlier.length > 0 ? (
          <section
            aria-labelledby={`${statusId}-earlier`}
            className="mt-14 lg:mt-16"
          >
            <h2
              id={`${statusId}-earlier`}
              className="flex items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/55"
            >
              Earlier experience
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.12),transparent)]"
              />
            </h2>

            <Timeline items={earlier} className="mt-5" />
          </section>
        ) : null}

        {visible.length === 0 ? (
          <p className="border border-white/10 px-6 py-16 text-center text-sm text-white/55">
            No experience records match this filter.
          </p>
        ) : null}
      </div>

      <SectionRail
        className="absolute -right-[6.5%] top-[3.25rem] z-10 hidden xl:block"
        gap="2.6rem"
        sections={visible.map((item, index) => ({
          index: String(index + 1).padStart(2, "0"),
          label: `${item.shortOrganization} — ${item.role}`,
          href: `#experience-${item.slug}`,
        }))}
      />
    </div>
  );
}

function FilterRow({
  filters,
  value,
  onChange,
  count,
  statusId,
}: {
  filters: readonly ExperienceFilter[];
  value: string;
  onChange: (next: string) => void;
  count: number;
  statusId: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-3">
      <div
        role="group"
        aria-label="Filter experience by field"
        className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8"
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
                "relative -mb-[13px] pb-3 text-[0.92rem] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "text-accent-indigo-soft"
                  : "text-white/55 hover:text-white/85"
              )}
            >
              {option.key}
              <span className="sr-only">{` (${option.count} roles)`}</span>
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
        {count} {count === 1 ? "role" : "roles"}
      </p>
    </div>
  );
}

function FeaturedExperience({ item }: { item: ExperienceIndexItem }) {
  const cardMedia = item.thumbnailMedia ?? item.media;

  return (
    <article
      id={`experience-${item.slug}`}
      className="group relative grid scroll-mt-28 overflow-hidden border border-white/10 bg-[#090c13]/60 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-[2px] hover:border-white/20 lg:min-h-[15rem] lg:grid-cols-[0.53fr_0.47fr]"
    >
      <div className="p-7 sm:p-8 lg:px-8 lg:py-7">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent-indigo-soft">
          {item.current ? "Current role" : "Featured experience"}
        </p>

        <h2 className="mt-2 text-[1.4rem] font-medium leading-tight tracking-[-0.02em] text-[#e2e5ec] sm:text-[1.55rem]">
          <Link
            href={`/experience/${item.slug}`}
            className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {item.organization}
          </Link>
        </h2>

        <p className="mt-1.5 text-[0.98rem] text-accent-indigo-soft">
          {item.role}
        </p>

        <p className="mt-2.5 max-w-[28rem] text-[0.88rem] leading-[1.6] text-[#9ba1af]">
          {item.oneLine}
        </p>

        <MetaRow
          dates={item.displayDates}
          location={item.location}
          workMode={item.workMode}
          className="mt-3.5"
        />

        <RoleHistory history={item.roleHistory} className="mt-3" />
        <ProofChips chips={item.proofChips} className="mt-3.5" />
        <TagRow tags={item.tools.slice(0, 5)} className="mt-4" />
      </div>

      {/* Card-only conceptual artwork can identify a role without displacing
          the public-scope workflow on its detail route. */}
      <div className="relative border-t border-white/10 lg:border-l lg:border-t-0">
        <RecordVisual
          media={cardMedia}
          nodes={item.workflow}
          caption="Public-scope workflow"
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="h-full min-h-[13rem]"
        />
      </div>
    </article>
  );
}

/**
 * Supporting roles, drawn as a timeline rather than as an index.
 *
 * The projects index is a list of rows with a thumbnail; if this were the same
 * shape it would read as the same page twice. So the entries hang off a
 * continuous spine, lead with the period rather than the name, and close with
 * the role's pipeline as a chain of stage names.
 */
function Timeline({
  items,
  className,
}: {
  items: ExperienceIndexItem[];
  className?: string;
}) {
  return (
    <ol className={cn("relative mt-8 lg:mt-10", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[4px] top-2 bottom-2 hidden w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.16)_6%,rgba(255,255,255,0.16)_92%,transparent)] sm:block"
      />

      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.slug}
          delay={Math.min(index * 0.04, 0.16)}
          className="group relative scroll-mt-28 border-b border-white/10 first:border-t"
        >
          <div id={`experience-${item.slug}`} className="scroll-mt-28">
            <Link
              href={`/experience/${item.slug}`}
              className="flex gap-5 py-6 outline-none transition-colors duration-300 hover:bg-white/[0.02] focus-visible:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-indigo-soft/70 sm:gap-7 sm:pr-5"
            >
              <span
                aria-hidden="true"
                className="relative z-10 mt-[0.4rem] hidden size-[9px] shrink-0 rounded-full border border-white/35 bg-background transition-colors group-hover:border-accent-indigo-soft group-hover:bg-accent-indigo/60 sm:block"
              />

              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white/55">
                  {item.displayDates}
                  {item.location ? (
                    <span className="text-white/55">{item.location}</span>
                  ) : null}
                </p>

                <div className="mt-2.5 grid gap-x-10 gap-y-2 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
                  <div>
                    <p className="text-[1.06rem] font-medium leading-snug tracking-[-0.01em] text-[#e2e5ec]">
                      {item.shortOrganization}
                    </p>
                    <p className="mt-1.5 text-[0.9rem] leading-snug text-accent-indigo-soft">
                      {item.role}
                    </p>
                  </div>

                  <p className="text-[0.86rem] leading-[1.65] text-[#8d93a1]">
                    {item.oneLine}
                  </p>
                </div>

                {item.proofChips.length > 0 ? (
                  <ProofChips chips={item.proofChips} className="mt-3.5" />
                ) : item.workflow?.length ? (
                  <StageChain stages={item.workflow} className="mt-4" />
                ) : null}
              </div>

              <ArrowRight
                aria-hidden="true"
                className="mt-[0.2rem] size-[1.05rem] shrink-0 self-start text-white/55 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-indigo-soft"
              />
            </Link>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/**
 * A promotion, shown inside the role it led to.
 *
 * The two UTEFA entries are separate records because the source lists them
 * separately, but presenting them as two unrelated jobs loses the fact that
 * one became the other.
 */
export function RoleHistory({
  history,
  className,
}: {
  history: { slug: string; role: string; displayDates: string }[];
  className?: string;
}) {
  if (history.length === 0) return null;

  return (
    <p
      className={cn(
        "text-[0.8rem] leading-[1.55] text-white/55",
        className
      )}
    >
      Previously{" "}
      {history.map((entry, index) => (
        <span key={entry.slug}>
          {index > 0 ? ", " : ""}
          <span className="text-white/55">{entry.role}</span>
          {` (${entry.displayDates})`}
        </span>
      ))}
    </p>
  );
}

export function MetaRow({
  dates,
  location,
  workMode,
  className,
}: {
  dates: string;
  location?: string;
  workMode?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.84rem] text-[#9ba1af]",
        className
      )}
    >
      <span className="inline-flex items-center gap-2">
        <CalendarDays
          aria-hidden="true"
          className="size-[0.9rem] text-white/55"
        />
        {dates}
      </span>
      {location || workMode ? (
        <span className="inline-flex items-center gap-2">
          <MapPin aria-hidden="true" className="size-[0.9rem] text-white/55" />
          {[location, workMode].filter(Boolean).join(" · ")}
        </span>
      ) : null}
    </div>
  );
}

export function TagRow({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </ul>
  );
}
