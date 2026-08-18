import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The bordered panel that the case-study grid is built from: a hairline box
 * with an indexed title header and free content below.
 *
 * The header used to carry a lucide glyph per panel — sparkles, a target,
 * layers, a circuit board, a clipboard, a file, a box, a question mark, a pair
 * of figures. Nine decorative icons across the two detail pages, none of them
 * carrying information the title did not already carry, and none of them part
 * of the vocabulary the rest of the site is drawn in. They are replaced by the
 * two-digit mono index the eyebrows and section rails use, so a panel head
 * reads as `01 Overview` in the same voice as `03 / PROJECTS` — and so the
 * index agrees with the rail entry that scrolls to it.
 */
export function Panel({
  id,
  title,
  index,
  children,
  className,
  bodyClassName,
}: {
  id?: string;
  title: string;
  /** Two-digit label matching this panel's entry in the page rail. */
  index?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        /*
          `min-w-0` is load-bearing. A panel is a grid item, and a grid item's
          default `min-width: auto` sizes it to its widest content — which for
          the architecture panel is `ArchitectureFlow`'s `min-w-max` row of
          stages. At 390px that blew the whole band out to 724px inside a
          390px viewport: the page's `overflow-x-clip` then cut it off, so the
          diagram could not be scrolled to, and the Key Features bullets beside
          it ran off the screen mid-sentence. With the item allowed to shrink,
          the band matches the column and the diagram's own `overflow-x-auto`
          does its job.
        */
        "flex min-w-0 scroll-mt-28 flex-col border border-white/10 bg-[#090c13]/45 p-6 sm:p-7",
        className
      )}
    >
      <div className="flex items-baseline gap-3.5">
        {index ? (
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-[0.72rem] tracking-[0.12em] text-accent-indigo-soft/85"
          >
            {index}
          </span>
        ) : null}
        <h2
          id={headingId}
          className="text-[1.02rem] font-medium tracking-[-0.01em] text-[#dfe2e9]"
        >
          {title}
        </h2>
      </div>
      <div className={cn("mt-5 flex-1", bodyClassName)}>{children}</div>
    </section>
  );
}

/** Muted body copy at the density the concept panels use. */
export function PanelText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[0.88rem] leading-[1.72] text-[#949aa8]",
        className
      )}
    >
      {children}
    </p>
  );
}

/**
 * Bulleted list with the small indigo tick used for Key Features.
 *
 * `className` exists so a panel that runs the full width of the page can set
 * the list in two tracks rather than letting each bullet run to a
 * fourteen-hundred-pixel line.
 */
export function PanelList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span
            aria-hidden="true"
            className="mt-[0.42rem] size-[4px] shrink-0 rounded-full bg-accent-indigo-soft/70"
          />
          <span className="text-[0.82rem] leading-[1.55] text-[#a0a6b4]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Big-figure grid used by Results.
 *
 * Each figure is opened by a hairline rather than closed inside a box. These
 * tiles sit inside a panel that is itself a bordered box, so bordering them
 * too drew a frame within a frame — six of them on the experience detail page
 * — and the numbers, which are the strongest evidence on either detail page,
 * read as chips instead of as measurements. The rule is the same one the
 * spec rows on the homepage are set with, so the two agree.
 */
export function StatTiles({
  tiles,
  columns = 2,
}: {
  tiles: { value: string; label: string }[];
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={cn(
        "grid gap-x-8 gap-y-6",
        columns === 3 ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2"
      )}
    >
      {tiles.map((tile) => (
        <li key={tile.label} className="border-t border-white/12 pt-3.5">
          <p className="text-[1.45rem] font-medium leading-none tracking-[-0.025em] text-accent-indigo-soft">
            {tile.value}
          </p>
          <p className="mt-2.5 text-[0.74rem] leading-[1.45] text-[#8d93a1]">
            {tile.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
