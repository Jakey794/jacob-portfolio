import Image from "next/image";

import { CaptureFrame } from "@/components/projects/capture-frame";
import { WireframePeaks } from "@/components/technical-decor";
import type { FlowNode, Media } from "@/lib/content-types";
import { cn } from "@/lib/utils";

/**
 * The image slot for a project or a role.
 *
 * There are exactly three things this can draw, in descending order of
 * evidential weight, and it never invents a fourth:
 *
 * 1. A sanitised capture of the real product.
 * 2. The record's own architecture, drawn by this site as a schematic. This
 *    is not decoration — every stage in it comes from the record's
 *    `architecture` or `workflow` field, so it is a diagram of the thing that
 *    actually exists.
 * 3. Nothing, for records that have neither.
 *
 * What it replaced was a dashed "imagery pending" plate, which appeared on
 * most roles and several projects and told every reader the site was
 * unfinished. A record with no photograph is not a hole; it is a record whose
 * strongest available visual is its own structure.
 */

/**
 * Grading for a capture.
 *
 * Light-mode product UI is the brightest thing on a near-black page and has to
 * be pulled down to sit inside the composition. Dark-mode UI already does, and
 * applying the same pull renders it as a black rectangle — which is what
 * happened when the two new dashboards were first dropped into the slot built
 * for the two light-mode ones.
 */
const TONE_FILTER: Record<Media["tone"], string | undefined> = {
  light: "brightness(0.62) saturate(0.72) contrast(1.05)",
  dark: "brightness(0.94) saturate(0.96)",
};

export function CaptureImage({
  media,
  className,
  sizes,
  priority = false,
  /** Detail crop for small slots. Falls back to the wide derivative. */
  variant = "wide",
  /**
   * Set when adjacent copy already carries the same information — a card and
   * its detail crop on one page should not both announce the same alt text.
   */
  decorative = false,
}: {
  media: Media;
  className?: string;
  sizes: string;
  priority?: boolean;
  variant?: "wide" | "detail";
  decorative?: boolean;
}) {
  const src =
    variant === "detail" ? (media.detail ?? media.wide) : media.wide;

  return (
    <div className={cn("relative overflow-hidden bg-[#0b0e16]", className)}>
      <Image
        src={src}
        alt={decorative ? "" : media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ filter: TONE_FILTER[media.tone] }}
      />

      {/* Edge settling only. The grade above does the tonal work, so the
          interface keeps its internal contrast and stays readable. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,22,0.20)_0%,transparent_28%,transparent_70%,rgba(8,11,18,0.42)_100%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_38%,transparent_48%,rgba(8,11,18,0.32)_100%)]"
      />
      {media.tone === "light" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[rgba(34,42,78,0.26)] mix-blend-multiply"
        />
      ) : null}
    </div>
  );
}

/**
 * The record's structure, drawn as a stacked schematic.
 *
 * Vertical rather than the horizontal `ArchitectureFlow`, because this fills a
 * portrait-ish card slot where a left-to-right row would either overflow or
 * shrink past legibility. Long pipelines are truncated with an explicit
 * "+N more" rather than silently cut.
 */
export function SchematicPlate({
  nodes,
  caption,
  className,
  limit = 5,
}: {
  nodes: FlowNode[];
  caption: string;
  className?: string;
  limit?: number;
}) {
  const shown = nodes.slice(0, limit);
  const hidden = nodes.length - shown.length;

  return (
    <div
      className={cn(
        "relative flex flex-col justify-center overflow-hidden bg-[#090c13] p-5 sm:p-6",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(133,144,246,0.07),transparent_58%),linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:auto,24px_24px,24px_24px]"
      />

      <ol className="relative grid gap-0">
        {shown.map((node, index) => (
          <li key={node.label} className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className="flex shrink-0 flex-col items-center self-stretch pt-[0.42rem]"
            >
              <span className="size-[5px] rounded-full bg-accent-indigo-soft/70" />
              {index < shown.length - 1 ? (
                <span className="mt-1 w-px flex-1 bg-white/12" />
              ) : null}
            </span>

            <span className="min-w-0 pb-3.5 last:pb-0">
              <span className="block font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-indigo-soft/85">
                {node.label}
              </span>
              <span className="mt-1 block text-[0.8rem] leading-[1.35] text-[#dcdfe7]">
                {node.title}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <p className="relative mt-4 flex items-center gap-2.5 border-t border-white/10 pt-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/55">
        {caption}
        {hidden > 0 ? (
          <span className="text-white/55">{`+${hidden} more`}</span>
        ) : null}
      </p>
    </div>
  );
}

/**
 * Picks whichever of the two above the record can support.
 *
 * Returns `null` rather than a placeholder when there is neither, so the
 * caller's layout can close up around the absence instead of reserving space
 * for an apology.
 */
export function RecordVisual({
  media,
  nodes,
  caption,
  className,
  sizes,
  priority = false,
  variant = "wide",
  decorative = false,
  framed = false,
  frameLabel,
  frameBodyClassName,
}: {
  media?: Media;
  nodes?: FlowNode[];
  caption: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  variant?: "wide" | "detail";
  decorative?: boolean;
  /** Draws the capture inside the site's own window chrome. */
  framed?: boolean;
  frameLabel?: string;
  /** Aspect ratio for the framed body, which sizes the capture. */
  frameBodyClassName?: string;
}) {
  if (media) {
    const image = (
      <CaptureImage
        media={media}
        sizes={sizes}
        priority={priority}
        variant={variant}
        decorative={decorative}
        className={framed ? "absolute inset-0" : className}
      />
    );

    if (!framed) return image;

    return (
      <CaptureFrame
        label={frameLabel}
        className={className}
        bodyClassName={frameBodyClassName}
      >
        {image}
      </CaptureFrame>
    );
  }

  if (nodes?.length) {
    return (
      <SchematicPlate nodes={nodes} caption={caption} className={className} />
    );
  }

  return null;
}

/**
 * A record's headline figure, drawn to fill a thumbnail slot.
 *
 * Used in the compact index rows for records with no capture. Three identical
 * decorative plates down a list is worse than no image; the strongest thing
 * these records have is a measured number, and at this size a number is the
 * one thing that stays legible. The value comes straight from the record's
 * first metric, so nothing here can say something the evidence panel does not.
 *
 * `aria-hidden`, because the same figure is on the detail page with its
 * methodology attached, and read aloud here it would be a bare number.
 */
export function MetricPlate({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex flex-col justify-center overflow-hidden bg-[#090c13] px-4 py-3",
        className
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(133,144,246,0.08),transparent_62%),linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:auto,20px_20px,20px_20px]"
      />
      <span className="relative block truncate text-[1.15rem] font-medium leading-none tracking-[-0.025em] text-accent-indigo-soft">
        {value}
      </span>
      <span className="relative mt-2 block text-[0.62rem] leading-[1.35] text-white/55 line-clamp-2">
        {label}
      </span>
    </div>
  );
}

/**
 * The quiet technical plate used where a slot must be filled and the record
 * has neither a capture nor a figure. Purely decorative, and marked as such.
 */
export function QuietPlate({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(135deg,rgba(133,144,246,0.06),transparent_58%),linear-gradient(rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:auto,22px_22px,22px_22px]",
        className
      )}
    >
      <WireframePeaks className="absolute bottom-0 left-1/2 w-[62%] -translate-x-1/2 opacity-70" />
    </div>
  );
}
