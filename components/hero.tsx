import Image from "next/image";

import { CtaLink } from "@/components/cta-link";
import { SectionRail } from "@/components/section-rail";
import {
  CoordinateBlock,
  CrossMark,
  DotGrid,
  GuideLine,
  ScrollCue,
  WireframePeaks,
} from "@/components/technical-decor";

const disciplines = [
  "Machine Learning",
  "Software Engineering",
  "Quantitative Research",
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[44rem] flex-col justify-center overflow-hidden bg-background lg:min-h-svh"
    >
      <HeroBackdrop />
      <HeroPortrait />
      <HeroFog />
      <HeroDecor />

      {/* Below lg the portrait is stacked under the copy rather than beside
          it, so the reserved bottom padding keeps the two from colliding. */}
      <div className="relative z-20 w-full px-6 pb-[20rem] pt-36 sm:px-10 sm:pb-[24rem] sm:pt-40 lg:px-[6.4rem] lg:pb-0 lg:pt-0">
        {/* The trailing pad biases the centred block slightly above the
            optical centre of the viewport, as in the reference composition. */}
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:ease-out lg:pb-12">
          <h1
            id="hero-title"
            className="text-[clamp(2.3rem,5.3vw,5.5rem)] font-medium leading-[1.1] tracking-[-0.025em]"
          >
            <span className="block bg-gradient-to-b from-[#a7adb9] to-[#bcc1cb] bg-clip-text text-transparent">
              I build
            </span>
            <span className="block bg-gradient-to-b from-[#c0c5cf] to-[#d6dae2] bg-clip-text text-transparent">
              intelligent systems
              <span
                aria-hidden="true"
                className="ml-[0.05em] inline-block size-[0.145em] rounded-full bg-accent-indigo-soft align-baseline"
              />
            </span>
          </h1>

          {/* Wraps until the viewport is wide enough for the single line to
              clear the figure; only then does it run full width. */}
          <p className="mt-7 flex max-w-[26rem] flex-wrap items-center gap-x-[0.85rem] text-[1.05rem] text-accent-indigo-soft sm:max-w-none sm:text-[1.2rem] lg:mt-8 lg:max-[1399px]:max-w-[26rem] lg:text-[1.18rem] xl:max-[1399px]:max-w-[35rem] xl:text-[1.28rem]">
            {/* Each label keeps its trailing separator in the same flex item,
                so a wrap can end a line with the dot but never start one. */}
            {disciplines.map((discipline, index) => (
              <span
                key={discipline}
                className="inline-flex items-center gap-x-[0.85rem]"
              >
                {discipline}
                {index < disciplines.length - 1 ? (
                  <span aria-hidden="true" className="text-accent-indigo-soft/45">
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </p>

          <p className="mt-6 max-w-[24rem] text-[1.02rem] leading-[1.78] text-[#a2a8b5] lg:mt-7 lg:text-[1.19rem]">
            Engineering Science @ UofT building ML systems, full-stack AI tools,
            and quantitative software.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4 lg:mt-10 lg:gap-9">
            <CtaLink href="#projects">View Projects</CtaLink>
            <CtaLink href="/about" variant="secondary">
              About Me
            </CtaLink>
          </div>
        </div>
      </div>

      <SectionRail className="absolute right-[4.4%] top-[51.5%] z-20 hidden -translate-y-1/2 lg:block" />

      <ScrollCue className="absolute bottom-[6%] right-[3.1%] z-20 hidden lg:flex" />
    </section>
  );
}

/** Mountain photography plus the atmospheric grading that sits over it. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      {/* The plate is lifted so the ridgeline reads behind the headline at the
          density the concept shows; the layers below then take brightness back
          out only where it would fight the type or the rail. */}
      <Image
        src="/images/hero/mountains.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center brightness-[1.38]"
      />
      {/* Left column: just enough to hold the headline, no more. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,14,0.62)_0%,rgba(6,8,14,0.34)_16%,rgba(6,8,14,0.14)_36%,transparent_62%)]" />
      {/* Knocks down the upper-right cloud break so the coordinates, dot grid
          and numbered rail stay legible, while leaving the lower-right rock. */}
      <div className="absolute inset-0 bg-[radial-gradient(52%_66%_at_103%_20%,rgba(6,8,14,0.99)_0%,rgba(6,8,14,0.78)_42%,transparent_100%)]" />
      {/* Anchors the composition to the bottom of the viewport. */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--background)_0%,rgba(8,11,18,0.5)_7%,transparent_22%)]" />
      {/* Settles the navigation into the scene. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(6,8,14,0.5),transparent)]" />
      {/* Below lg the copy sits over the full width of the plate rather than
          its dark left third, so it needs its own scrim. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,14,0.72)_0%,rgba(6,8,14,0.52)_45%,rgba(6,8,14,0.16)_74%,transparent_100%)] lg:hidden" />
    </div>
  );
}

/**
 * The lg geometry is solved from the concept: matching the subject's face
 * box (142x215 centred at 1086,308 in a 1672x941 frame) puts the plate at
 * 65.7% width, inset 2% from the right, with its base lifted 8.4% so the
 * figure settles into the fog rather than butting the viewport edge.
 */
function HeroPortrait() {
  return (
    <div className="pointer-events-none absolute -right-1/4 bottom-0 z-10 h-[17rem] w-[150%] [-webkit-mask-image:linear-gradient(to_top,transparent_0,#000_13%)] [mask-image:linear-gradient(to_top,transparent_0,#000_13%)] sm:-right-[10%] sm:h-[22rem] sm:w-[120%] lg:top-0 lg:bottom-[8.4%] lg:right-[2%] lg:h-auto lg:w-[65.7%]">
      <Image
        src="/images/hero/portrait.png"
        alt="Jacob Allan"
        fill
        priority
        sizes="(min-width: 1024px) 66vw, (min-width: 640px) 120vw, 150vw"
        className="object-contain object-bottom"
      />
    </div>
  );
}

/**
 * Full-bleed fog that settles the figure and the ridgeline into the base of
 * the viewport. Kept above the portrait so no container edge is visible.
 */
function HeroFog() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[18%] bg-[linear-gradient(0deg,var(--background)_0%,rgba(8,11,18,0.5)_38%,transparent_100%)]"
    />
  );
}

function HeroDecor() {
  return (
    <>
      {/* Left-hand guide marks */}
      <GuideLine className="absolute left-[2%] top-[10%] z-10 hidden h-[64%] lg:block" />
      <CrossMark
        size={11}
        className="absolute left-[4.5%] top-[12.4%] z-10 hidden text-white/30 lg:block"
      />
      <CrossMark
        size={20}
        className="absolute left-[2.35%] top-[16%] z-10 hidden text-white/40 lg:block"
      />

      {/* Upper-right technical readout */}
      <CrossMark
        size={16}
        className="absolute left-[80.5%] top-[19%] z-10 hidden text-white/40 lg:block"
      />
      <CoordinateBlock
        lines={["43° 39′ 46″ N", "79° 23′ 45″ W"]}
        className="absolute left-[84%] top-[17.8%] z-10 hidden lg:block"
      />
      <DotGrid className="absolute right-0 top-[15.5%] z-10 hidden lg:block" />

      {/* Topographic wireframe behind the portrait */}
      <WireframePeaks className="absolute left-[74%] top-[21%] z-0 hidden w-[11.5%] lg:block" />

      {/* Location readout */}
      <CoordinateBlock
        lines={["43.6629° N", "79.3957° W", "Toronto, ON"]}
        className="absolute bottom-[8%] left-[4.5%] z-20 hidden lg:block"
      />
    </>
  );
}
