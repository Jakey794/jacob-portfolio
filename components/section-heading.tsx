import type { ReactNode } from "react";

import { PageEyebrow } from "@/components/page-title";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /**
   * Two-digit index shown before the eyebrow. Use the value from
   * `homeSections` so the section agrees with the hero's numbered rail.
   */
  index?: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  id?: string;
  className?: string;
  /** Optional right-hand slot, e.g. a "view all" link on wide viewports. */
  aside?: ReactNode;
};

/**
 * Section masthead for the homepage bands. Shares the eyebrow, the gradient
 * display face and the muted body colour with the standalone pages, so a
 * section reads as part of the same system as the hero rather than as a
 * separate template.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
  id,
  className,
  aside,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-20",
        className
      )}
    >
      <div className="max-w-[36rem]">
        {eyebrow ? (
          index ? (
            <PageEyebrow index={index} label={eyebrow} />
          ) : (
            <p className="font-mono text-[0.78rem] uppercase tracking-[0.2em] text-white/45">
              {eyebrow}
            </p>
          )
        ) : null}

        {/* Size and line height are declared together — see PageTitle. */}
        <h2
          id={id}
          className="mt-4 bg-gradient-to-b from-[#b6bbc6] to-[#dfe2e9] bg-clip-text text-[clamp(1.7rem,2.55vw,2.45rem)]/[1.14] font-medium tracking-[-0.022em] text-transparent"
        >
          {title}
        </h2>

        {children ? (
          <div className="mt-4 max-w-[33rem] text-[0.97rem] leading-[1.72] text-[#8d93a1]">
            {children}
          </div>
        ) : null}
      </div>

      {aside ? <div className="shrink-0 lg:pb-1.5">{aside}</div> : null}
    </div>
  );
}
