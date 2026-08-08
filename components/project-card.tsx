import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/projects";
import { PendingPlate } from "@/components/pending";

type ProjectCardProps = {
  project: Project;
  /** Two-digit label shown against the project, matching the featured slot. */
  index?: string;
};

const caseStudyProjectSlugs = new Set([
  "incident-triage-copilot",
  "formatclip",
  "rf-signal-classification-research",
  "regime-specialist-stock-predictor",
]);

/**
 * A cell in the case-study grid. Deliberately not a rounded, shadowed card:
 * the grid draws its own hairlines, so each cell is a flat panel that shares
 * the page background and lifts only slightly on hover.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const hasCaseStudyPage = caseStudyProjectSlugs.has(project.slug);
  const primaryAction = hasCaseStudyPage
    ? {
        label: "Read case study",
        href: `/projects/${project.slug}`,
        internal: true,
      }
    : project.liveDemo
      ? { label: "Live demo", href: project.liveDemo, internal: false }
      : project.github
        ? { label: "GitHub", href: project.github, internal: false }
        : null;
  const statusLabel = project.statusLabel ?? "Case-study preview";

  return (
    <article className="group flex h-full flex-col bg-[#090c13] transition-colors duration-300 hover:bg-[#0c101a]">
      {/* A shallow media band rather than 16/9: two of the four projects have
          no screenshot yet, and a full-height empty plate dominates the row. */}
      {project.image ? (
        <div className="relative aspect-[2.2/1] overflow-hidden border-b border-white/10 bg-[#070a10]">
          <Image
            src={project.image}
            alt={project.imageAlt ?? `${project.title} screenshot`}
            width={900}
            height={520}
            /* Scaled in: at a third of the row width a whole browser window
               reads as noise, so the band shows a legible detail instead. */
            className="h-full w-full scale-[1.28] object-cover object-center brightness-[0.96] saturate-[0.96] transition-transform duration-700 ease-out group-hover:scale-[1.33]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,18,0.18)_0%,transparent_35%,rgba(8,11,18,0.55)_100%)]"
          />
        </div>
      ) : (
        <PendingPlate
          hint="Imagery"
          className="aspect-[2.2/1] border-0 border-b border-solid border-white/10"
        />
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.16em]">
          {index ? <span className="text-accent-indigo-soft">{index}</span> : null}
          <span className="text-white/35">{statusLabel}</span>
        </div>

        <h3 className="mt-4 text-[1.18rem]/[1.3] font-medium tracking-[-0.015em] text-[#e4e7ed]">
          {project.title}
        </h3>

        <p className="mt-3 text-[0.9rem] leading-[1.68] text-[#8d93a1]">
          {project.summary}
        </p>

        <ul className="mt-5 grid gap-2.5">
          {project.proof.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span
                aria-hidden="true"
                className="mt-[0.5rem] size-[4px] shrink-0 rounded-full bg-accent-indigo-soft/70"
              />
              <span className="text-[0.83rem] leading-[1.6] text-[#a0a6b4]">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.displayTags.map((tag) => (
            <li
              key={tag}
              className="border border-white/12 px-2 py-[0.2rem] text-[0.7rem] text-[#9299a7]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          {primaryAction ? (
            primaryAction.internal ? (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center gap-2.5 rounded-sm text-[0.88rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {primaryAction.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-[0.95rem] transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            ) : (
              <a
                href={primaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-sm text-[0.88rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {primaryAction.label}
                <ArrowUpRight aria-hidden="true" className="size-[0.95rem]" />
              </a>
            )
          ) : null}

          {project.github && primaryAction?.href !== project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm text-[0.85rem] text-white/45 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              GitHub
              <ArrowUpRight aria-hidden="true" className="size-[0.85rem]" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
