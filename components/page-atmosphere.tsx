import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Cinematic mountain header shared by inner pages. Same plate and grading
 * language as the homepage hero, but scoped to a band at the top of the page
 * so the content below sits on the flat near-black background.
 */
export function PageAtmosphere({
  className,
  /** Height of the band. Tune per page. */
  height = "h-[19rem] lg:h-[22rem]",
  priority = true,
}: {
  className?: string;
  height?: string;
  priority?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden",
        height,
        className
      )}
    >
      <Image
        src="/images/hero/mountains.png"
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-[center_34%] brightness-[1.06]"
      />
      {/* Holds the page title against the plate. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,14,0.95)_0%,rgba(6,8,14,0.82)_16%,rgba(6,8,14,0.44)_38%,rgba(6,8,14,0.12)_64%,transparent_84%)]" />
      {/* Settles the right margin behind the rail and coordinates. */}
      <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(6,8,14,0.88)_0%,rgba(6,8,14,0.4)_9%,transparent_22%)]" />
      {/* Dissolves the band into the page background. */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--background)_0%,rgba(8,11,18,0.92)_14%,rgba(8,11,18,0.45)_46%,transparent_100%)]" />
      {/* Settles the navigation into the scene. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(6,8,14,0.66),transparent)]" />
      {/* Narrow viewports put copy over the full width of the plate. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,14,0.68)_0%,rgba(6,8,14,0.5)_48%,rgba(6,8,14,0.2)_78%,transparent_100%)] lg:hidden" />
    </div>
  );
}
