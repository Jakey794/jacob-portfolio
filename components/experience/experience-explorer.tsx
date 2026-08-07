"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { PendingPlate } from "@/components/pending";
import { ProjectThumb } from "@/components/projects/project-thumb";
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
      <nav
        aria-label="Experience entries"
        className="absolute -right-[6.5%] top-[3.25rem] z-10 hidden xl:block"
      >
        <span
          aria-hidden="true"
          className="absolute left-[4px] top-1.5 bottom-1.5 w-px bg-white/15"
        />
        <ol className="relative flex flex-col gap-[2.6rem]">
          {visible.map((item, index) => (
            <li key={item.slug}>
              <a
                href={`#experience-${item.slug}`}
                className="group flex items-center gap-[1.35rem] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-[9px] shrink-0 rounded-full border bg-background transition-colors",
                    index === 0
                      ? "border-accent-indigo bg-accent-indigo"
                      : "border-white/35 group-hover:border-white/70"
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-mono text-[0.78rem] tracking-[0.12em] transition-colors",
                    index === 0
                      ? "text-white/90"
                      : "text-white/45 group-hover:text-white/80"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="sr-only">{`${item.organization} — ${item.role}`}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
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

      <p
        aria-live="polite"
        className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-white/35"
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

      <div className="relative min-h-[13rem] border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0">
        {item.image ? (
          <>
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
          </>
        ) : (
          <PendingPlate hint="Imagery" className="absolute inset-0 border-0" />
        )}
      </div>
    </article>
  );
}

/** Dated rows with a connecting spine, as in the concept. */
function Timeline({ items }: { items: ExperienceIndexItem[] }) {
  return (
    <ol className="relative mt-6 lg:mt-7">
      <span
        aria-hidden="true"
        className="absolute left-[1.6rem] top-8 bottom-8 hidden w-px bg-white/12 sm:block"
      />
      {items.map((item) => (
        <li
          key={item.slug}
          id={`experience-${item.slug}`}
          className="group relative scroll-mt-28 border-b border-white/10 first:border-t"
        >
          <Link
            href={`/experience/${item.slug}`}
            className="flex items-center gap-4 py-4 pl-4 pr-4 outline-none transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.03] sm:gap-5 sm:pl-0 sm:pr-5"
          >
            <span
              aria-hidden="true"
              className="relative z-10 hidden size-[9px] shrink-0 rounded-full border border-white/35 bg-background transition-colors group-hover:border-accent-indigo-soft sm:ml-[1.25rem] sm:block"
            />

            <span className="hidden w-[9.5rem] shrink-0 whitespace-nowrap font-mono text-[0.76rem] tracking-[0.04em] text-white/45 lg:block">
              {item.dates}
            </span>

            {/* Real organisation names run longer than the concept's, so these
                columns are wider and clamped rather than truncated mid-word. */}
            <span className="line-clamp-2 w-[13rem] shrink-0 text-[0.92rem] font-medium leading-snug text-[#dfe2e9] xl:w-[17rem]">
              {item.shortName}
            </span>

            <span className="line-clamp-2 hidden w-[12rem] shrink-0 text-[0.88rem] leading-snug text-accent-indigo-soft lg:block xl:w-[13rem]">
              {item.role}
            </span>

            <span className="line-clamp-2 hidden min-w-0 flex-1 text-[0.84rem] leading-[1.55] text-[#8d93a1] xl:block">
              {item.summary}
            </span>

            <ArrowRight
              aria-hidden="true"
              className="ml-auto size-[1.05rem] shrink-0 text-white/35 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-indigo-soft"
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
      {location ? (
        <span className="inline-flex items-center gap-2">
          <MapPin aria-hidden="true" className="size-[0.9rem] text-white/35" />
          {location}
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/25">
          <MapPin aria-hidden="true" className="size-[0.9rem]" />
          Location pending
        </span>
      )}
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
        <li
          key={tag}
          className="border border-accent-indigo-soft/25 bg-accent-indigo-soft/[0.07] px-2.5 py-1 text-[0.72rem] tracking-[0.02em] text-accent-indigo-soft/85"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
