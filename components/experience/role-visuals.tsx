import type { FlowNode } from "@/lib/content-types";
import { cn } from "@/lib/utils";

/**
 * The role's pipeline as a compact chain of stage names.
 *
 * Used in the experience timeline, where a full diagram would not fit and a
 * blank right-hand column would. It is `aria-hidden` on purpose: the same
 * stages are rendered properly on the role's detail page, and read aloud here
 * they would be six disconnected nouns between the summary and the next
 * entry.
 *
 * This file previously also carried `ResultField`, `RoleSchematic` and
 * `ResultMark`, which existed to fill the "imagery pending" slots. Those slots
 * are gone — `components/media/record-visual.tsx` now owns every image
 * decision for both projects and roles — so only the chain remains.
 */
export function StageChain({
  stages,
  className,
  limit = 5,
}: {
  stages: FlowNode[];
  className?: string;
  limit?: number;
}) {
  const shown = stages.slice(0, limit);

  return (
    <p
      aria-hidden="true"
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.63rem] uppercase tracking-[0.14em] text-white/55",
        className
      )}
    >
      {shown.map((stage, index) => (
        <span key={stage.label} className="inline-flex items-center gap-2">
          <span className="transition-colors group-hover:text-white/55">
            {stage.label}
          </span>
          {index < shown.length - 1 ? (
            <span className="text-accent-indigo-soft/35">&rarr;</span>
          ) : null}
        </span>
      ))}
    </p>
  );
}
