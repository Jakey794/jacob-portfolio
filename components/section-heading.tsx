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
 * Section masthead for the homepage bands.
 *
 * The eyebrow, a hairline and the band's action share one line running the
 * full width of the page. That rule is what opens the band — it replaces the
 * separate full-width divider the shell used to draw, so the page carries one
 * horizontal line per section rather than two, and the action sits on the same
 * axis as the section number instead of floating alongside the third line of
 * the supporting copy.
 *
 * Eyebrow, gradient display face and muted body colour are shared with the
 * standalone pages, so a band reads as part of the same system as the hero.
 */
export function SectionMasthead({
  index,
  eyebrow,
  aside,
  className,
}: {
  index?: string;
  eyebrow?: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-6 sm:gap-8", className)}>
      {eyebrow ? (
        index ? (
          <PageEyebrow index={index} label={eyebrow} className="shrink-0" />
        ) : (
          <p className="shrink-0 font-mono text-[0.78rem] uppercase tracking-[0.2em] text-white/45">
            {eyebrow}
          </p>
        )
      ) : null}

      <span
        aria-hidden="true"
        className="h-px min-w-0 flex-1 bg-[linear-gradient(90deg,rgba(133,144,246,0.30)_0%,rgba(255,255,255,0.13)_14%,rgba(255,255,255,0.06)_62%,transparent_100%)]"
      />

      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

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
    <div className={cn("relative", className)}>
      <SectionMasthead index={index} eyebrow={eyebrow} aside={aside} />

      {/* Size and line height are declared together — see PageTitle. */}
      <h2
        id={id}
        className="mt-8 max-w-[38rem] bg-gradient-to-b from-[#b6bbc6] to-[#dfe2e9] bg-clip-text text-[clamp(1.75rem,2.7vw,2.6rem)]/[1.13] font-medium tracking-[-0.024em] text-transparent lg:mt-10"
      >
        {title}
      </h2>

      {children ? (
        <div className="mt-5 max-w-[33rem] text-[0.97rem] leading-[1.72] text-[#8d93a1]">
          {children}
        </div>
      ) : null}
    </div>
  );
}
