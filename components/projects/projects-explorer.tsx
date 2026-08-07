"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectThumb } from "@/components/projects/project-thumb";
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

        {/* Two columns only once there is room for the thumbnail and the copy
            to sit side by side without starving the text. */}
        {rest.length > 0 ? (
          <ul className="mt-6 grid border-t border-l border-white/10 lg:mt-8 xl:grid-cols-2">
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
      <nav
        aria-label="Projects"
        className="absolute -right-[6.5%] top-[3.5rem] z-10 hidden xl:block"
      >
        <span
          aria-hidden="true"
          className="absolute left-[4px] top-1.5 bottom-1.5 w-px bg-white/15"
        />
        <ol className="relative flex flex-col gap-[2.35rem]">
          {visible.map((project, index) => (
            <li key={project.slug}>
              <a
                href={`#project-${project.slug}`}
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
                <span className="sr-only">{project.title}</span>
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

      <p
        aria-live="polite"
        className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-white/35"
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
      className="group relative grid scroll-mt-28 overflow-hidden border border-white/10 bg-[#090c13]/60 transition-colors hover:border-white/20 lg:min-h-[19.5rem] lg:grid-cols-[0.365fr_0.635fr]"
    >
      <div className="flex flex-col justify-between gap-6 p-7 sm:p-8 lg:px-9 lg:py-8">
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

      <div className="relative min-h-[15rem] border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0">
        <ProjectThumb
          src={project.image}
          alt={project.imageAlt ?? `${project.title} interface preview`}
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority
          className="absolute inset-0"
        />
        {/* The real capture is a light-mode browser window, so it is settled
            into the dark card with a presentational scrim and vignette rather
            than left as a bright block. A dark-mode capture would need none of
            this — see the note in the projects README. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(270deg,rgba(9,12,19,0.8)_0%,rgba(9,12,19,0.2)_16%,transparent_42%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_110%_at_70%_40%,transparent_20%,rgba(8,11,18,0.7)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(8,11,18,0.36)]"
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
      className="group scroll-mt-28 border-b border-r border-white/10"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full items-center gap-5 px-5 py-4 outline-none transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.03] sm:gap-6 sm:px-6 sm:py-4"
      >
        <span className="hidden shrink-0 self-start pt-1.5 font-mono text-[0.78rem] tracking-[0.12em] text-white/35 sm:block">
          {String(index).padStart(2, "0")}
        </span>

        <ProjectThumb
          src={project.image}
          alt={project.imageAlt ?? `${project.title} preview`}
          sizes="(min-width: 1024px) 15vw, 32vw"
          className="aspect-[2.4/1] w-[8rem] shrink-0 border border-white/10 sm:w-[11rem] lg:w-[14.25rem] xl:w-[11rem] 2xl:w-[14.25rem]"
        />

        <div className="min-w-0 flex-1">
          <h3 className="text-[1.08rem] font-medium leading-snug tracking-[-0.01em] text-[#e2e5ec]">
            {project.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[0.86rem] leading-[1.6] text-[#8d93a1]">
            {project.oneLine}
          </p>
          <TagRow tags={project.displayTags.slice(0, 3)} className="mt-2.5" />
        </div>

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
