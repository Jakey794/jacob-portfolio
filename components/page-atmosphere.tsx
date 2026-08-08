import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Every dial a standalone page needs to own its own atmosphere.
 *
 * The four inner pages previously shared one hard-coded band, so they all
 * opened on the same crop of the same summit at the same brightness and read
 * as the same page four times. Nothing here is baked in: a page can change
 * the plate, where it is cropped, how bright and how saturated it is, how
 * much of it survives the scrims, and whether the technical marks appear at
 * all.
 *
 * `src` is the dial that matters most. Until unique photography exists for
 * each route they all point at the hero plate, and the remaining dials are
 * what separate them — see `pageAtmospheres` below.
 */
export type PageAtmosphereConfig = {
  /** Plate. Swap per page once unique photography lands. */
  src: string;
  /** Height of the band. Tailwind classes; keep them literal so JIT sees them. */
  height: string;
  /** CSS `object-position` — which part of the plate the band is cropped to. */
  position: string;
  /** Luminance multiplier applied to the plate. */
  brightness: number;
  /** Saturation multiplier. Lower reads cooler and more clinical. */
  saturate: number;
  /** Plate opacity before the scrims: how loud this page's backdrop is. */
  opacity: number;
  /** Strength of the left scrim that holds the page title, 0-1. */
  scrim: number;
  /** Optional colour wash layered over the plate. Any CSS background value. */
  wash?: string;
  /** Whether the page carries the standing technical marks. */
  decor: boolean;
};

/** The only plate the repo currently has. */
const HERO_PLATE = "/images/hero/mountains.png";

/**
 * Per-route presets.
 *
 * All four still point at `HERO_PLATE` because no unique photography has been
 * supplied — see the follow-ups in `public/images/hero/README.md`. The crop,
 * luminance, saturation and opacity are what give each route its own
 * character in the meantime, and each one only has to change `src` when its
 * own image arrives.
 */
export const pageAtmospheres = {
  /** Editorial and personal: quieter and more human than the homepage. */
  about: {
    src: HERO_PLATE,
    height: "h-[21rem] lg:h-[26rem]",
    // Low in the frame — haze and foreground rock rather than the summit.
    position: "46% 74%",
    brightness: 0.9,
    saturate: 0.78,
    opacity: 0.66,
    scrim: 0.92,
    decor: true,
  },
  /** Product and technical: the plate stays out of the screenshots' way. */
  projects: {
    src: HERO_PLATE,
    height: "h-[15rem] lg:h-[17.5rem]",
    position: "60% 26%",
    brightness: 0.84,
    saturate: 0.62,
    opacity: 0.48,
    scrim: 0.86,
    decor: true,
  },
  /** Research and industrial: cold, high-contrast ridge lines. */
  experience: {
    src: HERO_PLATE,
    height: "h-[18rem] lg:h-[22rem]",
    position: "84% 40%",
    brightness: 1.02,
    saturate: 0.42,
    opacity: 0.74,
    scrim: 0.88,
    wash: "linear-gradient(180deg, rgba(18,24,44,0.34) 0%, rgba(10,13,22,0.16) 60%, transparent 100%)",
    decor: true,
  },
  /** A calm, minimal closing page: almost pure gradient. */
  contact: {
    src: HERO_PLATE,
    height: "h-[23rem] lg:h-[29rem]",
    position: "24% 62%",
    brightness: 0.72,
    saturate: 0.5,
    opacity: 0.4,
    scrim: 0.94,
    decor: false,
  },
  /**
   * Detail pages keep their index's identity — same crop family and
   * saturation — over a deeper band, because the masthead there is taller.
   */
  projectDetail: {
    src: HERO_PLATE,
    height: "h-[24rem] lg:h-[31rem]",
    position: "60% 24%",
    brightness: 0.86,
    saturate: 0.62,
    opacity: 0.52,
    scrim: 0.88,
    decor: true,
  },
  experienceDetail: {
    src: HERO_PLATE,
    height: "h-[24rem] lg:h-[31rem]",
    position: "84% 38%",
    brightness: 1.0,
    saturate: 0.44,
    opacity: 0.7,
    scrim: 0.9,
    wash: "linear-gradient(180deg, rgba(18,24,44,0.3) 0%, rgba(10,13,22,0.14) 60%, transparent 100%)",
    decor: true,
  },
} satisfies Record<string, PageAtmosphereConfig>;

export type PageAtmosphereKey = keyof typeof pageAtmospheres;

/**
 * Cinematic header band shared by inner pages. Same grading language as the
 * homepage hero, but scoped to a band at the top of the page so the content
 * below sits on the flat near-black background.
 */
export function PageAtmosphere({
  config,
  className,
  priority = true,
}: {
  config: PageAtmosphereConfig;
  className?: string;
  priority?: boolean;
}) {
  const { scrim } = config;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden",
        config.height,
        className
      )}
    >
      <Image
        src={config.src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{
          objectPosition: config.position,
          opacity: config.opacity,
          filter: `brightness(${config.brightness}) saturate(${config.saturate})`,
        }}
      />

      {config.wash ? (
        <div className="absolute inset-0" style={{ background: config.wash }} />
      ) : null}

      {/* Holds the page title against the plate. */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, rgba(6,8,14,${0.97 * scrim}) 0%, rgba(6,8,14,${0.84 * scrim}) 16%, rgba(6,8,14,${0.46 * scrim}) 38%, rgba(6,8,14,${0.13 * scrim}) 64%, transparent 84%)`,
        }}
      />
      {/* Settles the right margin behind the rail and coordinates. */}
      <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(6,8,14,0.88)_0%,rgba(6,8,14,0.4)_9%,transparent_22%)]" />
      {/* Dissolves the band into the page background — no visible plate edge. */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--background)_0%,rgba(8,11,18,0.92)_14%,rgba(8,11,18,0.45)_46%,transparent_100%)]" />
      {/* Settles the navigation into the scene. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(6,8,14,0.66),transparent)]" />
      {/* Narrow viewports put copy over the full width of the plate. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,14,0.72)_0%,rgba(6,8,14,0.54)_48%,rgba(6,8,14,0.22)_78%,transparent_100%)] lg:hidden" />
    </div>
  );
}
