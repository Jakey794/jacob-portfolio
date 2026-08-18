/**
 * Stage of a left-to-right pipeline diagram. `body` is carried by project
 * case studies; `items` is used by experience workflows to list the concrete
 * pieces inside a stage. Both are optional.
 */
export type FlowStage = {
  label: string;
  title: string;
  body?: string;
  items?: string[];
};

/**
 * Left-to-right stage diagram built from real pipeline stages. Scrolls
 * horizontally on narrow viewports rather than reflowing into something that
 * no longer reads as a pipeline.
 */
export function ArchitectureFlow({
  stages,
  feedbackLabel,
  feedbackNote,
  /** Wider boxes for stages that list sub-items. */
  size = "compact",
}: {
  stages: FlowStage[];
  /** Optional dashed return path drawn beneath the row. */
  feedbackLabel?: string;
  feedbackNote?: string;
  size?: "compact" | "detailed";
}) {
  const isDetailed = size === "detailed";

  return (
    <div className="-mx-1 overflow-x-auto pb-1">
      <div className="flex min-w-max items-stretch gap-0 px-1">
        {stages.map((stage, index) => (
          <div key={stage.label} className="flex items-stretch">
            <article
              className={
                isDetailed
                  ? "flex w-[8.75rem] flex-col border border-white/10 bg-white/[0.02] px-3 py-3"
                  : "flex w-[7.25rem] flex-col justify-between border border-white/10 bg-white/[0.02] px-2.5 py-3"
              }
            >
              <p className="font-mono text-[0.58rem] uppercase leading-tight tracking-[0.12em] text-accent-indigo-soft/85">
                {stage.label}
              </p>
              <p
                className={
                  isDetailed
                    ? "mt-2 text-[0.74rem] font-medium leading-[1.32] text-[#dcdfe7]"
                    : "mt-3 text-[0.74rem] font-medium leading-[1.32] text-[#dcdfe7]"
                }
              >
                {stage.title}
              </p>

              {stage.items?.length ? (
                <ul className="mt-2.5 grid gap-1.5 border-t border-white/8 pt-2.5">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-1.5 text-[0.66rem] leading-[1.35] text-[#8a909e]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.36rem] size-[3px] shrink-0 rounded-full bg-accent-indigo-soft/50"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>

            {index < stages.length - 1 ? (
              <span
                aria-hidden="true"
                className="flex w-6 shrink-0 items-center justify-center"
              >
                <svg
                  viewBox="0 0 24 8"
                  className="w-5 text-white/55"
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
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/55">
              {feedbackLabel}
            </p>
            {feedbackNote ? (
              <p className="mt-1 text-[0.62rem] text-white/55">{feedbackNote}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
