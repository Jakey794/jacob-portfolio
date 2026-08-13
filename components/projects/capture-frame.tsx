import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Dark application chrome drawn around a product capture.
 *
 * The two real captures are light-mode UI photographed inside a browser
 * window, complete with a saturated red toolbar and a personal bookmarks bar.
 * Cropping that away (see `CaptureCrop`) leaves the product surface but also
 * leaves it floating, so the page draws its own window instead: a hairline
 * frame in the site's palette, with a title bar carrying the project name.
 *
 * The screenshot then reads as a deliberate product shot rather than as a
 * bright rectangle that has to be dimmed into the background to belong.
 */
export function CaptureFrame({
  label,
  className,
  bodyClassName,
  children,
  /** Suppresses the title bar where the frame is too small to carry one. */
  chrome = true,
}: {
  label?: string;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
  chrome?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden border border-white/10 bg-[#0a0d15]",
        className
      )}
    >
      {chrome ? (
        <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-[#0c1018] px-3.5 py-2.5">
          <span aria-hidden="true" className="flex shrink-0 gap-[5px]">
            <span className="size-[6px] rounded-full bg-white/20" />
            <span className="size-[6px] rounded-full bg-white/14" />
            <span className="size-[6px] rounded-full bg-white/14" />
          </span>
          {label ? (
            <span className="min-w-0 truncate font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/35">
              {label}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className={cn("relative min-h-0 flex-1", bodyClassName)}>
        {children}
      </div>

      {/* Inner hairline: reads as glass over the interface. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-white/[0.06]"
      />
    </div>
  );
}
