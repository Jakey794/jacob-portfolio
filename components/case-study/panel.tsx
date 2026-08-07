import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The bordered panel that the case-study grid is built from: a hairline box
 * with an icon + title header and free content below.
 */
export function Panel({
  id,
  title,
  icon: Icon,
  children,
  className,
  bodyClassName,
}: {
  id?: string;
  title: string;
  icon?: LucideIcon;
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
        "flex scroll-mt-28 flex-col border border-white/10 bg-[#090c13]/45 p-6 sm:p-7",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {Icon ? (
          <Icon
            aria-hidden="true"
            className="size-[1.05rem] shrink-0 text-accent-indigo-soft/80"
          />
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

/** Bulleted list with the small indigo tick used for Key Features. */
export function PanelList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5">
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

/** Big-figure tile grid used by Results. */
export function StatTiles({
  tiles,
}: {
  tiles: { value: string; label: string }[];
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {tiles.map((tile) => (
        <li
          key={tile.label}
          className="border border-white/10 bg-white/[0.015] px-4 py-3.5"
        >
          <p className="text-[1.35rem] font-medium leading-none tracking-[-0.02em] text-accent-indigo-soft">
            {tile.value}
          </p>
          <p className="mt-2 text-[0.74rem] leading-[1.45] text-[#8d93a1]">
            {tile.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
