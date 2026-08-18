import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Every dial a standalone page needs to own its own atmosphere.
 *
 * The four inner pages previously shared one hard-coded band, so they all
 * opened on the same crop of the same summit at the same brightness and read
 * as the same page four times. Each route now has its own plate, and the
 * remaining dials shape how that plate is composed: where it is cropped, how
 * bright and how cool it is, how far the title scrim reaches across it, and
 * how the band resolves into the page below.
 */
export type PageAtmosphereConfig = {
  /** Plate for this route. */
  src: string;
  /** Height of the band. Tailwind classes; keep them literal so JIT sees them. */
  height: string;
  /** CSS `object-position` — which part of the plate the band is cropped to. */
  position: string;
  /** Luminance multiplier applied to the plate. */
  brightness: number;
  /** Contrast multiplier. Above 1 hardens ridge lines. */
  contrast?: number;
  /** Saturation multiplier. Lower reads cooler and more clinical. */
  saturate: number;
  /** Plate opacity before the scrims: how loud this page's backdrop is. */
  opacity: number;
  /** Strength of the left scrim that holds the page title, 0-1. */
  scrim: number;
  /**
   * How far across the band that scrim reaches, as a percentage. Low values
   * leave the plate legible behind the content; high values bury it.
   */
  reach?: number;
  /**
   * Where the plate has fully resolved into the page background, as a
   * percentage of the band height. Short values end the band crisply; long
   * ones let it hang in the page.
   */
  dissolve?: number;
  /** Softens the plate so it sits behind the copy rather than competing. */
  blur?: number;
  /** Optional colour wash layered over the plate. Any CSS background value. */
  wash?: string;
  /** Hairline rule at the foot of the band — a drawn horizon. */
  horizon?: boolean;
  /** Whether the page carries the standing technical marks. */
  decor: boolean;
};

/**
 * Per-route plates. All four are the same 1672x941 frame as the hero plate
 * (`/images/hero/mountains.png`, owned by `components/hero.tsx`, which is
 * composed around the portrait cutout and so is not shared), which means the
 * crop geometry below transfers directly between them.
 *
 * Each was chosen for what its composition does for the page, not just to be
 * different: see the note against each preset.
 */
const PLATES = {
  /** Lone summit in deep fog; the left two thirds are almost pure black. */
  about: "/images/atmosphere/about.jpg",
  /** Storm cell over a distant ridge; enormous quiet sky, one bright event. */
  projects: "/images/atmosphere/projects.jpg",
  /** High-key snowfield under cloud; cold, clinical, high micro-contrast. */
  experience: "/images/atmosphere/experience.jpg",
  /** Conceptual Northstar rig scene; route-specific and not employer media. */
  northstarExperience: "/images/atmosphere/northstar-experience.jpg",
  /** Still alpine water at dusk; the only horizontal, restful plate. */
  contact: "/images/atmosphere/contact.jpg",
} as const;

export const pageAtmospheres = {
  /**
   * Editorial and personal. The lone summit sits right of the masthead with
   * the fog bank running under it, so the left of the band stays empty for
   * the copy — the quietest composition of the set, and the only one with a
   * single subject rather than a range.
   */
  about: {
    src: PLATES.about,
    // Pulled back from 30rem at 0.82, then nudged forward again: at 0.66
    // opacity with a 0.6px blur the summit read as barely more than a navy
    // gradient, which lost the one thing this plate was chosen for — a single
    // lit peak. Opacity and brightness are up and the blur is gone so the ridge
    // texture survives; height, scrim and reach are untouched, so the title
    // column is exactly as dark as before and the page is still the quietest
    // on the site.
    height: "h-[21rem] lg:h-[26rem]",
    position: "62% 38%",
    brightness: 0.98,
    contrast: 1.05,
    saturate: 0.78,
    opacity: 0.76,
    scrim: 0.8,
    reach: 74,
    dissolve: 96,
    decor: true,
  },
  /**
   * Product and technical. Almost the entire frame is empty storm sky, with
   * the strike held at the far right edge — the band gives the page energy
   * without putting anything behind the project captures.
   */
  projects: {
    src: PLATES.projects,
    height: "h-[16rem] lg:h-[19rem]",
    // The band is short and wide relative to the plate, so at a lg viewport
    // the crop is width-locked and only a ~300px-tall horizontal slice of the
    // 941px source survives. At 34% that slice held the cloud glow around the
    // strike but cut the bolt itself off at the ankle. Moved down so the full
    // fork — the thing "visible at a glance" actually depends on — is inside
    // the slice instead of bleeding off the bottom edge.
    position: "74% 52%",
    // Contrast carries this plate: the strike is a bright filament inside a
    // dark cloud bank, and contrast is what keeps that filament reading as
    // a line rather than a soft glow. Raised together with opacity so the
    // cloud structure around it is legible at a glance. Scrim and reach are
    // unchanged — the strike already sits clear of the masthead at 72% 34%,
    // so making it louder does not touch the title's own contrast.
    brightness: 1.03,
    contrast: 1.1,
    saturate: 0.88,
    opacity: 0.82,
    scrim: 0.8,
    reach: 76,
    dissolve: 74,
    decor: true,
  },
  /**
   * Research and industrial. Cropped into the lit ridge so the band is the
   * brightest and coldest of the set, and closed with a drawn horizon that
   * the timeline below reads as its baseline.
   */
  experience: {
    src: PLATES.experience,
    height: "h-[18rem] lg:h-[23rem]",
    position: "76% 44%",
    // The source plate is the brightest of the four — high-key snow under an
    // overcast sky — but the wash and a sub-1 brightness were holding it back
    // to the same weight as the others, so the one plate that could carry the
    // most detail was carrying the least. Brightness now clears 1 and the
    // wash is lighter, so the snowfield's own micro-contrast comes through;
    // this is deliberately the loudest of the four bands per the brief. Scrim
    // and reach are untouched, so the masthead's own contrast doesn't move.
    brightness: 1.04,
    contrast: 1.08,
    saturate: 0.5,
    opacity: 0.86,
    scrim: 0.84,
    reach: 70,
    dissolve: 82,
    wash: "linear-gradient(180deg, rgba(18,24,44,0.26) 0%, rgba(10,13,22,0.1) 62%, transparent 100%)",
    horizon: true,
    decor: true,
  },
  /**
   * The calmest page. The only plate with still water in it, cropped low so
   * the reflection carries the band, softened and run long so it never
   * resolves to a visible edge — the page just fades open.
   */
  contact: {
    src: PLATES.contact,
    height: "h-[26rem] lg:h-[34rem]",
    // The band-to-page handoff at the foot of this component always resolves
    // to solid background, which is what let the plate dissolve cleanly into
    // the page below — but it means whatever source pixels land at the very
    // bottom of the crop window are the most heavily obscured, and at 41% the
    // window's lower half (where the water sits) fell inside exactly that
    // zone. The water was technically in frame and invisible anyway. Moved
    // to the foot of the source frame instead, which trades the summit's tip
    // for the shoreline and the reflection actually surviving the fade — the
    // plate this page was chosen for is the water, not the peak.
    position: "58% 100%",
    brightness: 1.06,
    contrast: 1.0,
    // The only plate with dusk light in it. At 0.72 the ridge kept a warm tan
    // cast that was the one non-cool colour on the site; pulled down, the
    // band stays legible but sits in the same navy as everything else. Lifted
    // slightly from 0.5 now that opacity is higher, so the water keeps some
    // colour rather than reading as grey.
    saturate: 0.56,
    opacity: 0.86,
    wash: "linear-gradient(180deg, rgba(20,26,50,0.22) 0%, rgba(12,16,28,0.1) 58%, transparent 100%)",
    scrim: 0.72,
    reach: 62,
    // Dropped from 100: at full height the dissolve's clear zone starts only
    // at the very top of a 34rem band, so the reflection — now most of what
    // is left in the crop — sat in the same heavily-obscured lower stretch it
    // was hidden in before. Ending the fade earlier leaves the water in the
    // band's clearer upper two-thirds while the last few rows still resolve
    // to flat background underneath the content.
    dissolve: 66,
    // 1.5px of blur was softening the reflection and the shoreline rocks —
    // the two things that make this plate read as water rather than another
    // ridge. Reduced, not removed: the page is still the calmest of the four.
    blur: 0.6,
    decor: false,
  },
  /**
   * Detail pages keep their index's plate and grading — same identity — over
   * a deeper band, cropped elsewhere in the frame so the two do not read as
   * the same picture twice.
   */
  projectDetail: {
    src: PLATES.projects,
    height: "h-[24rem] lg:h-[31rem]",
    position: "34% 52%",
    brightness: 0.96,
    contrast: 1.02,
    saturate: 0.78,
    opacity: 0.62,
    scrim: 0.82,
    reach: 66,
    dissolve: 86,
    decor: true,
  },
  experienceDetail: {
    src: PLATES.experience,
    height: "h-[24rem] lg:h-[31rem]",
    position: "28% 56%",
    brightness: 0.92,
    contrast: 1.05,
    saturate: 0.42,
    opacity: 0.7,
    scrim: 0.84,
    reach: 66,
    dissolve: 88,
    wash: "linear-gradient(180deg, rgba(18,24,44,0.32) 0%, rgba(10,13,22,0.16) 62%, transparent 100%)",
    horizon: true,
    decor: true,
  },
  /**
   * Northstar alone gets an industrial variation. The generated plate keeps
   * deep copy-safe sky at left and the conceptual rig in the right third;
   * every other role continues to use the neutral snowfield above.
   */
  northstarExperienceDetail: {
    src: PLATES.northstarExperience,
    height: "h-[24rem] lg:h-[31rem]",
    position: "72% 48%",
    brightness: 0.92,
    contrast: 1.06,
    saturate: 0.72,
    opacity: 0.78,
    scrim: 0.86,
    reach: 64,
    dissolve: 88,
    wash: "linear-gradient(180deg, rgba(18,24,44,0.22) 0%, rgba(10,13,22,0.12) 62%, transparent 100%)",
    horizon: true,
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
  const { scrim, reach = 84, dissolve = 88 } = config;

  // The scrim runs from solid at the left edge to nothing at `reach`, so a
  // page can decide how much of its own plate survives behind the masthead.
  const stop = (fraction: number) => Math.round(reach * fraction);

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
          filter: [
            `brightness(${config.brightness})`,
            `saturate(${config.saturate})`,
            config.contrast ? `contrast(${config.contrast})` : "",
            config.blur ? `blur(${config.blur}px)` : "",
          ]
            .filter(Boolean)
            .join(" "),
        }}
      />

      {config.wash ? (
        <div className="absolute inset-0" style={{ background: config.wash }} />
      ) : null}

      {/*
        Holds the page title against the plate. Both horizontal scrims are
        scoped to lg: they exist because the masthead sits in the left third of
        a wide viewport. On a phone the copy spans the full width, so these
        covered the entire band and every page opened on flat black — the
        vertical scrim below is what holds the title there.
      */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background: `linear-gradient(90deg, rgba(6,8,14,${(0.97 * scrim).toFixed(3)}) 0%, rgba(6,8,14,${(0.84 * scrim).toFixed(3)}) ${stop(0.19)}%, rgba(6,8,14,${(0.46 * scrim).toFixed(3)}) ${stop(0.45)}%, rgba(6,8,14,${(0.13 * scrim).toFixed(3)}) ${stop(0.76)}%, transparent ${reach}%)`,
        }}
      />
      {/* Settles the right margin behind the rail and coordinates. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(270deg,rgba(6,8,14,0.86)_0%,rgba(6,8,14,0.36)_9%,transparent_22%)] lg:block" />
      {/* Dissolves the band into the page background — no visible plate edge. */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(0deg, var(--background) 0%, rgba(8,11,18,0.92) ${Math.round(dissolve * 0.16)}%, rgba(8,11,18,0.45) ${Math.round(dissolve * 0.52)}%, transparent ${dissolve}%)`,
        }}
      />
      {/* Settles the navigation into the scene. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(6,8,14,0.66),transparent)]" />
      {/* Narrow viewports put copy over the full width of the plate, so the
          scrim runs down it instead of across. Lighter at the top than the
          old full-strength wash, which left nothing of the plate visible. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,14,0.42)_0%,rgba(6,8,14,0.60)_46%,rgba(6,8,14,0.34)_76%,transparent_100%)] lg:hidden" />

      {config.horizon ? (
        <span className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(133,144,246,0.22)_18%,rgba(255,255,255,0.10)_54%,transparent_92%)]" />
      ) : null}
    </div>
  );
}
