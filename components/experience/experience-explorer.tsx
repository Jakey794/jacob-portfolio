"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import {
  ResultField,
  RoleSchematic,
  StageChain,
} from "@/components/experience/role-visuals";
import { PendingPlate } from "@/components/pending";
import { ProjectThumb } from "@/components/projects/project-thumb";
import { SectionRail } from "@/components/section-rail";
import type { ResultTile, WorkflowStage } from "@/lib/experience";
import { Tag } from "@/components/section-shell";
import { cn } from "@/lib/utils";

/** Serialisable slice of an experience entry, prepared on the server. */
export type ExperienceIndexItem = {
  slug: string;
  organization: string;
  shortName: string;
  role: string;
  dates: string;
  categories: string[];
  tools: string[];
  /** Falls back to the first bullet when no summary has been written. */
  summary: string;
  location?: string;
  image?: string;
  imageAlt?: string;
  /** Figures quoted in the role's bullets, used where no photography exists. */
  results?: ResultTile[];
  /** Pipeline described by the role's bullets, used as a fallback visual. */
  workflow?: WorkflowStage[];
};

const FILTERS = ["All", "Industry", "Research", "Leadership", "Quant"] as const;

export function ExperienceExplorer({
  featured,
  items,
}: {
  featured: ExperienceIndexItem;
  items: ExperienceIndexItem[];
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const all = useMemo(() => [featured, ...items], [featured, items]);

  const visible = useMemo(
    () =>
      filter === "All"
        ? all
        : all.filter((item) => item.categories.includes(filter)),
    [filter, all]
  );

  const [lead, ...rest] = visible;

  return (
    <div className="relative">
      <FilterRow value={filter} onChange={setFilter} count={visible.length} />

      <div className="mt-5 lg:-mt-1">
        {lead ? (
          <FeaturedExperience item={lead} />
        ) : (
          <p className="border border-white/10 px-6 py-16 text-center text-sm text-white/45">
            No experience in this category yet.
          </p>
        )}

        {rest.length > 0 ? <Timeline items={rest} /> : null}
      </div>

      {/* Numbered rail, derived from the visible set. */}
      <SectionRail
        className="absolute -right-[6.5%] top-[3.25rem] z-10 hidden xl:block"
        gap="2.6rem"
        sections={visible.map((item, index) => ({
          index: String(index + 1).padStart(2, "0"),
          label: `${item.organization} — ${item.role}`,
          href: `#experience-${item.slug}`,
        }))}
      />
    </div>
  );
}

function FilterRow({
  value,
  onChange,
  count,
}: {
  value: string;
  onChange: (next: (typeof FILTERS)[number]) => void;
  count: number;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-3">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 sm:gap-x-9">
        {FILTERS.map((option) => {
          const isActive = option === value;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option)}
              className={cn(
                "relative -mb-[13px] pb-3 text-[0.95rem] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "text-accent-indigo-soft"
                  : "text-white/55 hover:text-white/85"
              )}
            >
              {option}
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

      {/* Hidden on the narrowest viewports: at 390px it lands hard against
          the last filter, and the list beside it already shows the count. */}
      <p
        aria-live="polite"
        className="hidden font-mono text-[0.72rem] uppercase tracking-[0.2em] text-white/35 sm:block"
      >
        {count} {count === 1 ? "role" : "roles"}
      </p>
    </div>
  );
}

function FeaturedExperience({ item }: { item: ExperienceIndexItem }) {
  return (
    <article
      id={`experience-${item.slug}`}
      className="group relative grid scroll-mt-28 overflow-hidden border border-white/10 bg-[#090c13]/60 transition-colors hover:border-white/20 lg:min-h-[14.5rem] lg:grid-cols-[0.465fr_0.535fr]"
    >
      <div className="p-7 sm:p-8 lg:px-8 lg:py-7">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent-indigo-soft">
          Featured experience
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

        <p className="mt-0.5 max-w-[26rem] text-[0.86rem] leading-[1.55] text-[#9ba1af]">
          {item.summary}
        </p>

        <MetaRow dates={item.dates} location={item.location} className="mt-3" />

        <TagRow tags={item.tools.slice(0, 5)} className="mt-3" />
      </div>

      {/*
        No photography exists for any role. Rather than reserve half the card
        for a dashed "imagery pending" plate, the slot carries the role's own
        measured figures — the strongest proof it has — falling back to its
        pipeline, and only then to a placeholder.
      */}
      {/* Not `absolute inset-0`: below lg the row has no height of its own, so
          absolutely positioning the figures inside a `min-h` box clipped the
          bottom two labels clean off at 768px. The pane is in flow and the
          grid row sizes to it. */}
      <div className="relative border-t border-white/10 lg:border-l lg:border-t-0">
        {item.image ? (
          <div className="relative h-full min-h-[13rem]">
            <ProjectThumb
              src={item.image}
              alt={item.imageAlt ?? `${item.organization} imagery`}
              sizes="(min-width: 1024px) 56vw, 100vw"
              priority
              className="absolute inset-0"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(270deg,rgba(9,12,19,0.7)_0%,transparent_40%)]"
            />
          </div>
        ) : item.results?.length ? (
          <ResultField results={item.results} className="h-full" />
        ) : item.workflow?.length ? (
          <RoleSchematic stages={item.workflow} className="h-full" />
        ) : (
          <PendingPlate hint="Imagery" className="h-full min-h-[13rem] border-0" />
        )}
      </div>
    </article>
  );
}

/**
 * The supporting roles, drawn as a timeline rather than as an index.
 *
 * The projects index is a list of rows with a thumbnail; if this were the same
 * shape it would read as the same page twice. So the entries hang off a
 * continuous spine, lead with the period rather than the name, and close with
 * the role's pipeline as a chain of stage names — progression and systems,
 * which is what this page is for.
 */
function Timeline({ items }: { items: ExperienceIndexItem[] }) {
  return (
    <ol className="relative mt-8 lg:mt-10">
      {/* The spine. Runs the full height of the list and fades at both ends so
          it reads as a segment of a longer track. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[4px] top-2 bottom-2 hidden w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.16)_6%,rgba(255,255,255,0.16)_92%,transparent)] sm:block"
      />

      {items.map((item) => (
        <li
          key={item.slug}
          id={`experience-${item.slug}`}
          className="group relative scroll-mt-28 border-b border-white/10 first:border-t"
        >
          <Link
            href={`/experience/${item.slug}`}
            className="flex gap-5 py-6 outline-none transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.03] sm:gap-7 sm:pr-5"
          >
            <span
              aria-hidden="true"
              className="relative z-10 mt-[0.4rem] hidden size-[9px] shrink-0 rounded-full border border-white/35 bg-background transition-colors group-hover:border-accent-indigo-soft group-hover:bg-accent-indigo/60 sm:block"
            />

            <div className="min-w-0 flex-1">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white/40">
                {item.dates}
              </p>

              <div className="mt-2.5 grid gap-x-10 gap-y-2 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
                <div>
                  <p className="text-[1.06rem] font-medium leading-snug tracking-[-0.01em] text-[#e2e5ec]">
                    {item.shortName}
                  </p>
                  <p className="mt-1.5 text-[0.9rem] leading-snug text-accent-indigo-soft">
                    {item.role}
                  </p>
                </div>

                <p className="text-[0.86rem] leading-[1.65] text-[#8d93a1]">
                  {item.summary}
                </p>
              </div>

              {item.workflow?.length ? (
                <StageChain stages={item.workflow} className="mt-4" />
              ) : null}
            </div>

            <ArrowRight
              aria-hidden="true"
              className="mt-[0.2rem] size-[1.05rem] shrink-0 self-start text-white/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-indigo-soft"
            />
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function MetaRow({
  dates,
  location,
  className,
}: {
  dates: string;
  location?: string;
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
        <CalendarDays aria-hidden="true" className="size-[0.9rem] text-white/35" />
        {dates}
      </span>
      {/* A missing location renders nothing. It used to print "Location
          pending" beside the dates on every role — the field is unset for all
          of them, so the marker was not a rare gap but a permanent label on the
          page telling readers the site was unfinished. The row simply closes
          after the dates instead; `lib/experience.ts` still documents the
          field as outstanding. */}
      {location ? (
        <span className="inline-flex items-center gap-2">
          <MapPin aria-hidden="true" className="size-[0.9rem] text-white/35" />
          {location}
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
