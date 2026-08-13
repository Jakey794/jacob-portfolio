import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/projects";
import { CaptureFrame } from "@/components/projects/capture-frame";
import { ProjectThumb } from "@/components/projects/project-thumb";
import { TechLine } from "@/components/section-shell";

type ProjectRowProps = {
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
 * One entry in the homepage case-study list.
 *
 * Three columns on wide viewports — index, the work, and a right-hand column
 * that carries the capture where one exists and the project's own
 * classification where one does not. Every row therefore has the same
 * skeleton, and a project without a screenshot reads as a research entry
 * rather than as a broken card.
 *
 * Only the homepage uses this; the projects index draws its own explorer.
 */
export function ProjectRow({ project, index }: ProjectRowProps) {
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
  // The small slot takes the detail crop: the wide capture is a whole product
  // window, and at a quarter of the row nothing in it is legible.
  const thumb = project.imageDetail ?? project.image;

  return (
    // Placed rather than ordered: at lg the index and the classification open
    // the row on the same line and the capture hangs under the classification,
    // while stacked the row reads index, classification, work, capture.
    <li className="group grid gap-x-10 gap-y-6 border-b border-white/10 py-11 lg:grid-cols-[3.25rem_minmax(0,1fr)_minmax(0,19rem)] lg:gap-y-5 lg:py-14">
      {/* Stacked, the number belongs on the classification line — the spine it
          forms at lg does not exist in one column. */}
      {index ? (
        <p className="order-1 hidden font-mono text-[0.72rem] leading-[1.6] tracking-[0.16em] text-accent-indigo-soft/80 lg:col-start-1 lg:row-start-1 lg:block">
          {index}
        </p>
      ) : null}

      <p className="order-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.66rem] uppercase leading-[1.7] tracking-[0.16em] lg:col-start-3 lg:row-start-1">
        {index ? (
          <>
            <span className="text-[0.72rem] normal-case text-accent-indigo-soft/80 lg:hidden">
              {index}
            </span>
            <span aria-hidden="true" className="text-white/15 lg:hidden">
              /
            </span>
          </>
        ) : null}
        <span className="text-white/40">{statusLabel}</span>
        <span aria-hidden="true" className="text-white/15">
          /
        </span>
        <span className="text-white/25">{project.categories.join(" · ")}</span>
      </p>

      <div className="order-3 min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <h3 className="text-[1.32rem]/[1.28] font-medium tracking-[-0.018em] text-[#e4e7ed] transition-colors group-hover:text-white sm:text-[1.5rem]/[1.26]">
          {project.title}
        </h3>

        <p className="mt-4 max-w-[36rem] text-[0.97rem] leading-[1.72] text-[#8d93a1]">
          {project.summary}
        </p>

        <ul className="mt-6 grid max-w-[38rem] gap-2.5">
          {project.proof.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.62rem] size-[4px] shrink-0 rounded-full bg-accent-indigo-soft/70"
              />
              <span className="text-[0.88rem] leading-[1.68] text-[#a0a6b4]">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <TechLine items={project.displayTags} className="mt-6" />

        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
          {primaryAction ? (
            primaryAction.internal ? (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center gap-2.5 rounded-sm text-[0.9rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
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
                className="inline-flex items-center gap-2.5 rounded-sm text-[0.9rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
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
              className="inline-flex items-center gap-2 rounded-sm text-[0.86rem] text-white/45 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              GitHub
              <ArrowUpRight aria-hidden="true" className="size-[0.85rem]" />
            </a>
          ) : null}
        </div>
      </div>

      {thumb ? (
        <div className="order-4 lg:col-start-3 lg:row-start-2 lg:self-start">
          <CaptureFrame
            label={project.title}
            className="w-full max-w-[22rem] shadow-[0_28px_70px_-45px_rgba(0,0,0,0.95)] lg:max-w-none"
            bodyClassName="aspect-[1.5/1]"
          >
            <ProjectThumb
              src={thumb}
              alt={project.imageAlt ?? `${project.title} screenshot`}
              sizes="(min-width: 1024px) 20vw, 22rem"
              focus="center top"
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </CaptureFrame>
        </div>
      ) : null}
    </li>
  );
}
