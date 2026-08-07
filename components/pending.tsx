import { cn } from "@/lib/utils";

/**
 * Placeholders for content that has not been written yet.
 *
 * These deliberately look unfinished. Nothing here should ever be replaced
 * with plausible-sounding filler prose — the point is that an empty slot is
 * visible at a glance and easy to find when filling the page in.
 */

export function PendingText({
  hint,
  lines = 3,
  className,
}: {
  /** What to write here, e.g. "summary". */
  hint: string;
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("select-none", className)}>
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent-indigo-soft/45">
        {hint} pending
      </p>
      <div aria-hidden="true" className="mt-3 grid gap-2">
        {Array.from({ length: lines }, (_, index) => (
          <span
            key={index}
            className="block h-[0.44rem] rounded-full bg-white/[0.055]"
            style={{ width: `${100 - index * 14}%` }}
          />
        ))}
      </div>
      <span className="sr-only">{`${hint} not yet written`}</span>
    </div>
  );
}

export function PendingTile({ hint }: { hint: string }) {
  return (
    <div className="border border-dashed border-white/12 bg-white/[0.012] px-4 py-3.5">
      <p className="text-[1.35rem] font-medium leading-none text-white/20">—</p>
      <p className="mt-2 font-mono text-[0.64rem] uppercase leading-[1.45] tracking-[0.14em] text-white/30">
        {hint}
      </p>
    </div>
  );
}

/** Dashed frame used where an image or diagram has not been supplied. */
export function PendingPlate({
  hint,
  className,
}: {
  hint: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative grid place-items-center border border-dashed border-white/12 bg-[linear-gradient(135deg,rgba(133,144,246,0.05),transparent_60%)]",
        className
      )}
    >
      <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-white/25">
        {hint} pending
      </p>
    </div>
  );
}
