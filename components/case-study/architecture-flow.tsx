import type { ArchitectureStage } from "@/lib/case-studies";

/**
 * Left-to-right stage diagram built from the project's real architecture
 * stages. Scrolls horizontally on narrow viewports rather than reflowing into
 * something that no longer reads as a pipeline.
 */
export function ArchitectureFlow({
  stages,
  feedbackLabel,
  feedbackNote,
}: {
  stages: ArchitectureStage[];
  /** Optional dashed return path drawn beneath the row. */
  feedbackLabel?: string;
  feedbackNote?: string;
}) {
  return (
    <div className="-mx-1 overflow-x-auto pb-1">
      <div className="flex min-w-max items-stretch gap-0 px-1">
        {stages.map((stage, index) => (
          <div key={stage.label} className="flex items-stretch">
            {/* Compact box: label header over the stage name, as in the
                concept. The longer `body` copy stays in the data for use
                elsewhere rather than crowding the pipeline. */}
            <article className="flex w-[7.25rem] flex-col justify-between border border-white/12 bg-white/[0.02] px-2.5 py-3">
              <p className="font-mono text-[0.58rem] uppercase leading-tight tracking-[0.12em] text-accent-indigo-soft/75">
                {stage.label}
              </p>
              <p className="mt-3 text-[0.74rem] font-medium leading-[1.32] text-[#dcdfe7]">
                {stage.title}
              </p>
            </article>

            {index < stages.length - 1 ? (
              <span
                aria-hidden="true"
                className="flex w-6 shrink-0 items-center justify-center"
              >
                <svg
                  viewBox="0 0 24 8"
                  className="w-5 text-white/30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path d="M0 4h20M17 1l3 3-3 3" />
                </svg>
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {feedbackLabel ? (
        <div aria-hidden="true" className="mt-3 px-1">
          <div className="border-t border-dashed border-white/15 pt-2 text-center">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/35">
              {feedbackLabel}
            </p>
            {feedbackNote ? (
              <p className="mt-1 text-[0.62rem] text-white/25">{feedbackNote}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
