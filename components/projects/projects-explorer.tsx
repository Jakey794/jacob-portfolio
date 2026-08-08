"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CaptureFrame } from "@/components/projects/capture-frame";
import { ProjectThumb } from "@/components/projects/project-thumb";
import { SectionRail } from "@/components/section-rail";
import { cn } from "@/lib/utils";

/** Serialisable slice of a project, prepared on the server. */
export type ProjectIndexItem = {
  slug: string;
  title: string;
  oneLine: string;
  categories: string[];
  displayTags: string[];
  image?: string;
  imageAlt?: string;
  imageDetail?: string;
};

const FILTERS = ["All", "ML", "Software", "Quant", "Research"] as const;

export function ProjectsExplorer({
  projects,
}: {
  projects: ProjectIndexItem[];
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter, projects]
  );

  const [featured, ...rest] = visible;

  return (
    <div className="relative">
      <FilterRow value={filter} onChange={setFilter} count={visible.length} />

      <div className="mt-9 lg:mt-11">
        {featured ? (
          <FeaturedCard project={featured} index={1} />
        ) : (
          <p className="border border-white/10 px-6 py-16 text-center text-sm text-white/45">
            No projects in this category yet.
          </p>
        )}

        {/* Single column. A two-column grid left a visible empty cell whenever
            the filtered count was odd — which it is for four of the five
            filters — so the remainder is drawn as an index of full-width rows
            that fills at any count. */}
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
                isActive ? "text-accent-indigo-soft" : "text-white/55 hover:text-white/85"
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
      className="group relative grid scroll-mt-28 overflow-hidden border border-white/10 bg-[#090c13]/60 transition-colors hover:border-white/20 lg:grid-cols-[0.365fr_0.635fr]"
    >
      <div className="flex flex-col justify-between gap-6 p-7 sm:p-8 lg:px-9 lg:py-9">
        <div>
          <span className="font-mono text-[0.78rem] tracking-[0.12em] text-white/40">
            {String(index).padStart(2, "0")}
          </span>
          <h2 className="mt-4 text-[1.55rem] font-medium leading-tight tracking-[-0.02em] text-[#e2e5ec] sm:text-[1.75rem]">
            {project.title}
          </h2>
          <p className="mt-3.5 max-w-[20rem] text-[1rem] leading-[1.65] text-[#9ba1af]">
            {project.oneLine}
          </p>
          <TagRow tags={project.displayTags} className="mt-5" />
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex w-fit items-center gap-3 rounded-sm text-[0.98rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          Explore Project
          <ArrowRight
            aria-hidden="true"
            className="size-[1.05rem] transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* The capture is presented inside drawn app chrome rather than bled to
          the card edge: it is a light-mode interface on a near-black page, and
          framing it reads as a product shot instead of as a bright block that
          has to be dimmed until it disappears. */}
      <div className="relative border-t border-white/10 p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-7">
        {/* Held near the capture's own 1.68:1 so `object-cover` has little
            left to trim. A short band cropped the interface to a strip. */}
        <CaptureFrame
          label={project.title}
          className="shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)]"
          bodyClassName="aspect-[2/1] lg:aspect-[2.55/1]"
        >
          <ProjectThumb
            src={project.image}
            alt={project.imageAlt ?? `${project.title} interface preview`}
            sizes="(min-width: 1024px) 52vw, 100vw"
            priority
            className="absolute inset-0"
          />
        </CaptureFrame>
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
      className="group scroll-mt-28 border-b border-white/10"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full items-center gap-5 px-1 py-5 outline-none transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.03] sm:gap-7 sm:px-3 sm:py-6"
      >
        <span className="hidden shrink-0 self-center font-mono text-[0.78rem] tracking-[0.12em] text-white/35 sm:block">
          {String(index).padStart(2, "0")}
        </span>

        {/* Detail crop: at this size the whole surface is noise, so the row
            shows the one region of the product that still reads. */}
        <CaptureFrame
          chrome={false}
          className="aspect-[16/10] w-[7rem] shrink-0 sm:w-[9.5rem] lg:w-[11rem]"
        >
          <ProjectThumb
            src={project.imageDetail ?? project.image}
            alt={project.imageAlt ?? `${project.title} preview`}
            sizes="(min-width: 1024px) 15vw, 32vw"
            className="absolute inset-0"
          />
        </CaptureFrame>

        <div className="min-w-0 flex-1">
          <h3 className="text-[1.12rem] font-medium leading-snug tracking-[-0.01em] text-[#e2e5ec]">
            {project.title}
          </h3>
          <p className="mt-2 max-w-[38rem] text-[0.88rem] leading-[1.6] text-[#8d93a1]">
            {project.oneLine}
          </p>
        </div>

        <TagRow
          tags={project.displayTags.slice(0, 3)}
          className="hidden w-[15rem] shrink-0 lg:flex"
        />

        <ArrowRight
          aria-hidden="true"
          className="hidden size-[1.05rem] shrink-0 self-center text-white/35 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-indigo-soft sm:block"
        />
      </Link>
    </li>
  );
}

function TagRow({
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
