import type { ResultTile, WorkflowStage } from "@/lib/experience";
import { cn } from "@/lib/utils";

/**
 * Visuals for the experience routes, built from each role's own data.
 *
 * No photography exists for any role, and none is going to be invented. The
 * pages were therefore carrying large dashed "imagery pending" plates in their
 * most prominent slots, which made finished work look unfinished.
 *
 * Every role does however carry real structure: a `workflow` describing the
 * pipeline named in its bullets, and `results` holding the figures quoted in
 * them. Those are drawn here instead — a measured readout and a signal chain
 * — so the slot is filled with the work rather than with a placeholder for a
 * photograph that was never going to be taken.
 */

/** Faint measurement grid shared by both plates. */
function TechnicalGrid({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:32px_32px]",
        className
      )}
    />
  );
}

/**
 * The role's quoted figures as an instrument readout.
 *
 * Used where the concept called for a photograph. Figures are laid out on a
 * hairline grid at display scale, largest first, so the slot carries the
 * strongest proof the role has rather than a dashed rectangle.
 */
export function ResultField({
  results,
  className,
  caption,
}: {
  results: ResultTile[];
  className?: string;
  caption?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#080b12]",
        className
      )}
    >
      <TechnicalGrid />

      {/* Cool bloom in the corner, echoing the page atmosphere above it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-64 bg-[radial-gradient(circle,rgba(106,116,216,0.16),transparent_68%)]"
      />

      <div className="relative flex h-full flex-col p-6 sm:p-7">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/35">
          {caption ?? "Measured"}
        </p>

        <ul className="mt-5 grid flex-1 content-start gap-x-8 gap-y-5 sm:grid-cols-2">
          {results.slice(0, 4).map((tile) => (
            <li key={tile.label} className="border-t border-white/10 pt-3">
              <p className="text-[1.65rem] font-medium leading-none tracking-[-0.03em] text-accent-indigo-soft">
                {tile.value}
              </p>
              <p className="mt-2.5 text-[0.74rem] leading-[1.45] text-[#8d93a1]">
                {tile.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The role's pipeline as a vertical signal chain.
 *
 * The horizontal `ArchitectureFlow` used inside panels does not survive a tall
 * narrow slot, so the masthead draws the same stages down a spine instead:
 * numbered nodes, stage label, stage title, and the concrete pieces inside it.
 */
export function RoleSchematic({
  stages,
  className,
  caption,
}: {
  stages: WorkflowStage[];
  className?: string;
  caption?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[#080b12]", className)}>
      <TechnicalGrid />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-20 size-72 bg-[radial-gradient(circle,rgba(106,116,216,0.13),transparent_70%)]"
      />

      <div className="relative p-6 sm:p-7">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/35">
          {caption ?? "System"}
        </p>

        <ol className="relative mt-5">
          {/* Spine. Stops inside the first and last node so it reads as a
              chain rather than as a border. */}
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-2 bottom-2 w-px bg-[linear-gradient(180deg,transparent,rgba(133,144,246,0.32)_10%,rgba(255,255,255,0.14)_88%,transparent)]"
          />

          {stages.map((stage, index) => (
            <li key={stage.label} className="relative flex gap-4 pb-4 last:pb-0">
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 mt-[0.3rem] size-[11px] shrink-0 rounded-full border",
                  index === 0
                    ? "border-accent-indigo bg-accent-indigo"
                    : "border-white/30 bg-[#080b12]"
                )}
              />

              <div className="min-w-0 flex-1 border-b border-white/[0.07] pb-3.5 last:border-b-0 last:pb-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-accent-indigo-soft/70">
                    {stage.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.58rem] tracking-[0.12em] text-white/22"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-1 text-[0.86rem] font-medium leading-snug text-[#dcdfe7]">
                  {stage.title}
                </p>

                {stage.items?.length ? (
                  <p className="mt-1 text-[0.74rem] leading-[1.5] text-[#8a909e]">
                    {stage.items.join(" · ")}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/**
 * The role's pipeline compressed to a single line of stage names.
 *
 * Used on the experience index rows. It is what stops that index reading as a
 * second copy of the projects index: every row carries the shape of the work
 * rather than a thumbnail, so the page is about progression and systems.
 */
export function StageChain({
  stages,
  className,
  limit = 5,
}: {
  stages: WorkflowStage[];
  className?: string;
  limit?: number;
}) {
  const shown = stages.slice(0, limit);

  return (
    <p
      aria-hidden="true"
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.63rem] uppercase tracking-[0.14em] text-white/30",
        className
      )}
    >
      {shown.map((stage, index) => (
        <span key={stage.label} className="inline-flex items-center gap-2">
          <span className="transition-colors group-hover:text-white/45">
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

/**
 * Small plate for compact slots — the next-role card, where neither of the
 * plates above would be legible. Draws the role's headline figure alone.
 */
export function ResultMark({
  results,
  className,
}: {
  results?: ResultTile[];
  className?: string;
}) {
  const lead = results?.[0];

  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden border border-white/10 bg-[#080b12]",
        className
      )}
    >
      <TechnicalGrid />
      {lead ? (
        <p className="relative px-2 text-center">
          <span className="block text-[1.4rem] font-medium leading-none tracking-[-0.03em] text-accent-indigo-soft">
            {lead.value}
          </span>
          <span className="mt-1.5 block font-mono text-[0.54rem] uppercase leading-[1.4] tracking-[0.14em] text-white/30">
            {lead.label}
          </span>
        </p>
      ) : null}
    </div>
  );
}
