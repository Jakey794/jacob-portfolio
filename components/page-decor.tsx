import { profile } from "@/lib/site";
import {
  CoordinateBlock,
  CrossMark,
  DotGrid,
  GuideLine,
} from "@/components/technical-decor";

/**
 * The campus readout, matching the hero and the closing band. Labelled with
 * the institution so the coordinates are read as a design mark rather than as
 * a home address.
 */
const LOCATION = [...profile.coordinates, ...profile.coordinateLabel];
const LOCATION_DMS = ["43° 39′ 46″ N", "79° 23′ 45″ W"];

/**
 * The standing set of technical marks on inner pages.
 *
 * The set is not identical everywhere: a page picks the marks that suit its
 * character, so the decor contributes to each route's identity instead of
 * stamping the same four glyphs on all of them.
 *
 *   `quiet`      — left guide marks only. Editorial pages.
 *   `instrument` — guide marks plus the coordinate readout. Research pages.
 *   `spec`       — guide marks, readout and the dot grid. Product pages.
 *
 * Positioned against the nearest positioned ancestor, so wrap the page in
 * `relative`.
 */
export type PageDecorVariant = "quiet" | "instrument" | "spec";

export function PageDecorTop({
  variant = "spec",
}: {
  variant?: PageDecorVariant;
}) {
  return (
    <>
      <GuideLine className="absolute left-[2%] top-[7rem] z-10 hidden h-[22rem] lg:block" />
      <CrossMark
        size={11}
        className="absolute left-[4.5%] top-[8.5rem] z-10 hidden text-white/55 lg:block"
      />
      <CrossMark
        size={20}
        className="absolute left-[2.35%] top-[10.5rem] z-10 hidden text-white/55 lg:block"
      />

      {/* Held back until xl: below that the page content reaches into this
          corner and the marks would sit on top of it. */}
      {variant !== "quiet" ? (
        <>
          <CrossMark
            size={16}
            className="absolute left-[68.5%] top-[7.4rem] z-10 hidden text-white/55 xl:block"
          />
          <CoordinateBlock
            lines={LOCATION_DMS}
            className="absolute left-[72%] top-[7rem] z-10 hidden xl:block"
          />
        </>
      ) : null}

      {variant === "spec" ? (
        <DotGrid className="absolute right-[2%] top-[6.5rem] z-10 hidden xl:block" />
      ) : null}
    </>
  );
}

/**
 * End-of-page marks.
 *
 * This used to close every page with the hero's "Scroll" cue, which pointed
 * at nothing — by the time it is on screen the page has ended. The foot now
 * carries the location readout and a terminating rule instead, so the page
 * resolves rather than inviting a scroll that does not exist.
 */
export function PageDecorFoot() {
  return (
    /*
      In flow rather than absolutely positioned in the page's bottom padding.
      Overlaid, the readout landed at 4.5% of the viewport — on neither the
      content axis nor the footer's — so the foot of every standalone page
      carried three different left edges within 150px of each other, and on the
      shorter pages it sat barely twenty pixels under the last content rule.
      As a block it inherits the gutter and gets real space above it.
    */
    <div
      aria-hidden="true"
      className="mt-20 hidden items-end justify-between gap-10 lg:flex"
    >
      <CoordinateBlock lines={LOCATION} />

      <div className="flex flex-col items-end gap-3">
        <span className="h-16 w-px bg-gradient-to-b from-transparent to-white/25" />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/55">
          End
        </span>
      </div>
    </div>
  );
}
