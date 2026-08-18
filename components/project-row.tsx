import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProofChips, ResourceLinkRow } from "@/components/evidence";
import { QuietPlate, RecordVisual } from "@/components/media/record-visual";
import { CaptureFrame } from "@/components/projects/capture-frame";
import { Reveal } from "@/components/reveal";
import { TechLine } from "@/components/section-shell";
import { ownershipLabels, type Project } from "@/lib/projects";

/**
 * One entry in the homepage project list.
 *
 * Three columns on wide viewports — index, the work, and a right-hand column
 * carrying the capture where one exists and the project's classification where
 * one does not. Every row has the same skeleton, so a project without a
 * screenshot reads as a research entry rather than as a broken card.
 *
 * Every record in the collection has a detail route, so the primary action is
 * always the case study. The previous version kept a hard-coded set of four
 * slugs that "had a page", which meant adding a project silently produced a
 * card whose main link 404'd.
 */
export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  /** Two-digit label, matching the featured slot above. */
  index?: string;
}) {
  return (
    <Reveal
      as="li"
      className="group grid gap-x-10 gap-y-6 border-b border-white/10 py-11 lg:grid-cols-[3.25rem_minmax(0,1fr)_minmax(0,19rem)] lg:gap-y-5 lg:py-14"
    >
      {/* Stacked, the number belongs on the classification line — the spine it
          forms at lg does not exist in one column. */}
      {index ? (
        <p className="order-1 hidden font-mono text-[0.72rem] leading-[1.6] tracking-[0.16em] text-accent-indigo-soft/85 lg:col-start-1 lg:row-start-1 lg:block">
          {index}
        </p>
      ) : null}

      <p className="order-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.66rem] uppercase leading-[1.7] tracking-[0.16em] lg:col-start-3 lg:row-start-1">
        {index ? (
          <>
            <span className="text-[0.72rem] normal-case text-accent-indigo-soft/85 lg:hidden">
              {index}
            </span>
            <span aria-hidden="true" className="text-white/15 lg:hidden">
              /
            </span>
          </>
        ) : null}
        <span className="text-white/55">{project.statusLabel}</span>
        <span aria-hidden="true" className="text-white/15">
          /
        </span>
        <span className="text-white/55">{project.categories.join(" · ")}</span>
      </p>

      <div className="order-3 min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <h3 className="text-[1.32rem]/[1.28] font-medium tracking-[-0.018em] text-[#e4e7ed] transition-colors group-hover:text-white sm:text-[1.5rem]/[1.26]">
          {project.title}
        </h3>

        {project.ownership !== "owned" ? (
          <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
            {ownershipLabels[project.ownership]}
          </p>
        ) : null}

        <p className="mt-4 max-w-[36rem] text-[0.97rem] leading-[1.72] text-[#8d93a1]">
          {project.summary}
        </p>

        <ProofChips chips={project.proof} className="mt-6 max-w-[38rem]" />

        <TechLine items={project.displayTags} className="mt-6" />

        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2.5 rounded-sm text-[0.9rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {`Read the ${project.shortTitle} case study`}
            <ArrowRight
              aria-hidden="true"
              className="size-[0.95rem] transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          <ResourceLinkRow
            links={project.links}
            recordTitle={project.title}
          />
        </div>
      </div>

      <div className="order-4 lg:col-start-3 lg:row-start-2 lg:self-start">
        {project.media ? (
          <CaptureFrame
            label={project.title}
            className="w-full max-w-[22rem] shadow-[0_28px_70px_-45px_rgba(0,0,0,0.95)] lg:max-w-none"
            bodyClassName="aspect-[1.5/1]"
          >
            <RecordVisual
              media={project.media}
              caption=""
              variant="detail"
              decorative
              sizes="(min-width: 1024px) 20vw, 22rem"
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </CaptureFrame>
        ) : project.architecture.length ? (
          <RecordVisual
            nodes={project.architecture}
            caption="System architecture"
            sizes="(min-width: 1024px) 20vw, 22rem"
            className="w-full max-w-[22rem] border border-white/10 lg:max-w-none"
          />
        ) : (
          <QuietPlate className="aspect-[1.5/1] w-full max-w-[22rem] border border-white/10 lg:max-w-none" />
        )}
      </div>
    </Reveal>
  );
}
