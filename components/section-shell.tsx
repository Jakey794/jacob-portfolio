import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The homepage's vertical rhythm below the hero.
 *
 * Every band shares the hero's horizontal margins (`lg:px-[6.4rem]`) rather
 * than the centred `max-w-7xl` container the older sections used, so the left
 * edge of the copy stays on the same axis as the headline all the way down the
 * page. `divide` draws the hairline that separates one band from the next;
 * the first band after the hero leaves it off so the fog resolves into the
 * page instead of hitting a rule.
 */
export function HomeSection({
  id,
  labelledBy,
  divide = true,
  glow,
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  /** Hairline rule across the top of the band. */
  divide?: boolean;
  /** Side the ambient indigo bloom sits on, if any. */
  glow?: "left" | "right";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative scroll-mt-24 px-6 py-20 sm:px-10 lg:px-[6.4rem] lg:py-[6.5rem]",
        divide &&
          "before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-[linear-gradient(90deg,rgba(133,144,246,0.28)_0%,rgba(255,255,255,0.10)_22%,rgba(255,255,255,0.05)_70%,transparent_100%)] sm:before:inset-x-10 lg:before:inset-x-[6.4rem]",
        className
      )}
    >
      {glow ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 -z-10 h-[26rem] w-[38rem] max-w-full",
            glow === "left"
              ? "left-0 bg-[radial-gradient(60%_60%_at_18%_0%,rgba(60,68,140,0.13),transparent_70%)]"
              : "right-0 bg-[radial-gradient(60%_60%_at_82%_0%,rgba(60,68,140,0.12),transparent_70%)]"
          )}
        />
      ) : null}
      {children}
    </section>
  );
}

/**
 * The hairline grid the panels are built from: a 1px white/10 background that
 * the children's own dark fills leave showing as dividers. Used instead of
 * individually bordered cards so a row of panels reads as one drawn object.
 */
export function HairlineGrid({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("grid gap-px border border-white/10 bg-white/10", className)}
    >
      {children}
    </div>
  );
}

/** A cell inside `HairlineGrid`. */
export function HairlineCell({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("bg-[#090c13]", className)} {...props}>
      {children}
    </div>
  );
}
