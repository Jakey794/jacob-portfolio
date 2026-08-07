import {
  CoordinateBlock,
  CrossMark,
  DotGrid,
  GuideLine,
  ScrollCue,
} from "@/components/technical-decor";

/** Toronto / UofT St. George, matching the homepage readouts. */
const LOCATION = ["43.6629° N", "79.3957° W", "Toronto, ON"];
const LOCATION_DMS = ["43° 39′ 46″ N", "79° 23′ 45″ W"];

/**
 * The standing set of technical marks used on inner pages: guide marks and a
 * coordinate readout at the top, location and a scroll cue at the foot.
 * Positioned against the nearest positioned ancestor, so wrap the page in
 * `relative`.
 */
export function PageDecorTop() {
  return (
    <>
      <GuideLine className="absolute left-[2%] top-[7rem] z-10 hidden h-[22rem] lg:block" />
      <CrossMark
        size={11}
        className="absolute left-[4.5%] top-[8.5rem] z-10 hidden text-white/30 lg:block"
      />
      <CrossMark
        size={20}
        className="absolute left-[2.35%] top-[10.5rem] z-10 hidden text-white/40 lg:block"
      />

      {/* Held back until xl: below that the page content reaches into this
          corner and the marks would sit on top of it. */}
      <CrossMark
        size={16}
        className="absolute left-[68.5%] top-[7.4rem] z-10 hidden text-white/40 xl:block"
      />
      <CoordinateBlock
        lines={LOCATION_DMS}
        className="absolute left-[72%] top-[7rem] z-10 hidden xl:block"
      />
      <DotGrid className="absolute right-[2%] top-[6.5rem] z-10 hidden xl:block" />
    </>
  );
}

export function PageDecorFoot() {
  return (
    <>
      <CoordinateBlock
        lines={LOCATION}
        className="absolute bottom-8 left-[4.5%] z-10 hidden lg:block"
      />
      <ScrollCue className="absolute bottom-10 right-[3.4%] z-10 hidden lg:flex" />
    </>
  );
}
