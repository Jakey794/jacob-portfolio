import type { ReactNode } from "react";

import { DotGrid, GuideLine } from "@/components/technical-decor";
import { cn } from "@/lib/utils";

/**
 * Horizontal gutters, shared by every route's main column, its footer and the
 * standing technical marks.
 *
 * The left edge is the same everywhere — `6.4rem`, the axis the hero headline
 * sits on. The four standalone routes previously set it as a percentage, which
 * put page content, the site nav and the footer on three different axes on the
 * same screen. The right edge still varies, because the section rail and the
 * corner marks need different amounts of margin per page; that difference is
 * deliberate and is what keeps each route's measure its own.
 */
export const pageGutters = {
  /** Homepage bands, and the default for the footer. */
  page: "px-6 sm:px-10 lg:px-[6.4rem]",
  /** Routes carrying the right-hand section rail from xl. */
  railed: "px-6 sm:px-10 lg:pl-[6.4rem] lg:pr-[6.4rem] xl:pr-[15.5%]",
  /** Index routes: no rail inside the text column, so it runs wider. */
  wide: "px-6 sm:px-10 lg:pl-[6.4rem] lg:pr-[9.5%]",
} as const;

/**
 * The homepage's vertical rhythm below the hero.
 *
 * Every band shares the hero's horizontal margins (`lg:px-[6.4rem]`) rather
 * than the centred `max-w-7xl` container the older sections used, so the left
 * edge of the copy stays on the same axis as the headline all the way down the
 * page.
 *
 * There is no rule across the top of a band. Each one opens with the masthead
 * in `SectionHeading`, whose eyebrow rule runs out to the right gutter and
 * separates the bands on its own — a stack of full-width dividers read as a
 * column of boxes rather than as one continuous composition.
 *
 * `isolate` matters: the ambient bloom is drawn at `-z-10`, and without a
 * stacking context here it lands underneath the page's opaque background and
 * renders nothing at all.
 */
export function HomeSection({
  id,
  labelledBy,
  glow,
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  /** Side the ambient indigo bloom sits on, if any. */
  glow?: "left" | "right";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative isolate scroll-mt-24 px-6 py-[5rem] sm:px-10 sm:py-[5.5rem] lg:px-[6.4rem] lg:py-[6.25rem]",
        className
      )}
    >
      {glow ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-[-6rem] -z-10 h-[34rem] w-[46rem] max-w-full",
            glow === "left"
              ? "left-[-6rem] bg-[radial-gradient(50%_50%_at_30%_38%,rgba(58,66,132,0.16),transparent_72%)]"
              : "right-[-6rem] bg-[radial-gradient(50%_50%_at_70%_38%,rgba(58,66,132,0.15),transparent_72%)]"
          )}
        />
      ) : null}
      {children}
    </section>
  );
}

/**
 * The handoff between the photographic hero and the drawn page beneath it.
 *
 * The hero used to resolve to flat background over about fifty pixels and then
 * hand over to two hundred more of dead black, which is what made the page read
 * as two unrelated designs stacked on each other. This keeps the hero's haze
 * alive for most of a screen past the fold and lets the technical marks the
 * hero already carries — the left guide line, the dot grid — surface out of it,
 * so the photography thins into a drawing rather than stopping.
 *
 * Rendered as a zero-height sibling immediately after the hero, so it is
 * anchored to the hero's bottom edge whatever that section's height resolves
 * to, adds nothing to the scroll, and is painted under the following band's
 * content by ordinary document order.
 */
export function HeroSpill() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative z-0 h-0">
      {/*
        The box straddles the hero's edge, and its own mask decides how much of
        the overlap is used: nothing at the very top, so the plate is never
        lifted by a bloom drawn on top of it, then full strength across the
        boundary, then out again before the band's copy begins.
      */}
      <div className="absolute inset-x-0 -top-[9rem] h-[26rem] overflow-hidden [-webkit-mask-image:linear-gradient(180deg,transparent_0%,#000_32%,#000_64%,transparent_100%)] [mask-image:linear-gradient(180deg,transparent_0%,#000_32%,#000_64%,transparent_100%)] lg:-top-[12rem] lg:h-[34rem]">
        {/* The hero fog, continuing. Centred on the same axis as the plate's
            cloud break so it reads as the same weather, not a new gradient. */}
        <span className="absolute inset-0 bg-[radial-gradient(64%_58%_at_58%_38%,rgba(62,72,136,0.32)_0%,rgba(26,32,62,0.14)_46%,transparent_74%)]" />
        {/* A second, colder bank low and left, so the haze is not one
            symmetrical bloom. */}
        <span className="absolute inset-0 bg-[radial-gradient(46%_42%_at_16%_60%,rgba(38,46,92,0.22)_0%,transparent_70%)]" />

        {/* The hero's left guide line, resuming below the fold. */}
        <GuideLine className="absolute left-[2%] top-[42%] hidden h-[44%] lg:block" />
        {/* And its upper-right dot grid, emerging rather than repeating: held
            at low opacity and faded out from the top. */}
        <DotGrid
          columns={10}
          rows={5}
          className="absolute right-[3.4%] top-[56%] hidden opacity-40 lg:block"
        />
      </div>
    </div>
  );
}

/**
 * Label/value rows drawn with hairlines instead of boxes.
 *
 * The lower page had three separate implementations of "a caption beside some
 * values" — a bordered card grid in About, a bespoke table in Skills, a third
 * in the featured project. They are one primitive now, which is what keeps the
 * bands reading as the same document.
 */
export function SpecList({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <dl className={cn("border-t border-white/10", className)}>{children}</dl>
  );
}

export function SpecRow({
  label,
  accent = false,
  className,
  children,
}: {
  label: string;
  /** Carries the label in the page accent, as the eyebrow indices do. */
  accent?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid gap-2 border-b border-white/10 py-5 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-8",
        className
      )}
    >
      <dt
        className={cn(
          "font-mono text-[0.7rem] uppercase leading-[1.75] tracking-[0.16em]",
          accent ? "text-accent-indigo-soft/80" : "text-white/40"
        )}
      >
        {label}
      </dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

/**
 * The technology chip used inside the index cards.
 *
 * The same five declarations were copied into About, Contact, the project
 * detail page and both explorers, and had already drifted on size and
 * tracking. One implementation now, so the chips read as one system — and so
 * the tone can be adjusted in a single place.
 *
 * Where a chip may appear is a rule, not a preference: **inside a card, never
 * on an unboxed page.** The homepage, About, Contact and the detail mastheads
 * all set the same lists as `TechLine` below, because on a page drawn entirely
 * in hairlines and negative space a row of small rounded rectangles is the one
 * element that reads as a template. Inside the explorers' cards the chips have
 * a box around them already, and there they work as metadata.
 */
export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "border border-accent-indigo-soft/25 bg-accent-indigo-soft/[0.07] px-2.5 py-1 text-[0.73rem] tracking-[0.02em] text-accent-indigo-soft/85",
        className
      )}
    >
      {children}
    </li>
  );
}

/**
 * A technology list as a line of text, separated by the same interpunct the
 * hero uses between disciplines.
 *
 * Replaces the bordered chips that were previously repeated in four sections —
 * thirty-five of them in the stack band alone. A wall of identical rounded
 * rectangles is the single most template-like thing a portfolio can do, and it
 * carried no more information than the words inside it.
 */
export function TechLine({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-[0.6rem] gap-y-1 text-[0.83rem] leading-[1.7] text-[#9299a7]",
        className
      )}
    >
      {items.map((item, index) => (
        <li key={item} className="inline-flex items-center gap-x-[0.6rem]">
          {item}
          {index < items.length - 1 ? (
            <span aria-hidden="true" className="text-white/20">
              ·
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
