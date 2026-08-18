import { cn } from "@/lib/utils";

/** `02 / PROJECTS` — the index is accented, the label stays muted mono. */
export function PageEyebrow({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[0.78rem] uppercase tracking-[0.2em]",
        className
      )}
    >
      <span className="text-accent-indigo-soft">{index}</span>
      <span aria-hidden="true" className="text-white/55">
        /
      </span>
      <span className="text-white/55">{label}</span>
    </p>
  );
}

/**
 * Display-heading scale.
 *
 * Font size and line height are declared together with Tailwind's
 * `text-[size]/[leading]` syntax, and never as separate `text-*` + `leading-*`
 * classes. A `text-*` utility conflicts with `leading-*` in tailwind-merge, so
 * a separate `leading-*` in the base string is silently dropped the moment any
 * font size is applied — which previously left every title at the default 1.5
 * line height. Keeping the pair atomic makes that impossible.
 *
 * Sizes are per-page because each was measured against its own concept.
 */
const titleSizes = {
  /** Projects index. */
  hero: "text-[clamp(2.6rem,5.7vw,5.95rem)]/[1.06]",
  /** Experience index. */
  index: "text-[clamp(2.4rem,5.2vw,5.45rem)]/[1.06]",
  /** About. */
  page: "text-[clamp(2.3rem,4.5vw,4.7rem)]/[1.06]",
  /** Project case study. */
  detail: "text-[clamp(2.3rem,3.75vw,3.9rem)]/[1.06]",
  /** Experience detail. */
  compact: "text-[clamp(2.1rem,3.35vw,3.5rem)]/[1.06]",
} as const;

export type PageTitleSize = keyof typeof titleSizes;

/**
 * Display heading with the accent dot used across the site. `dot` renders the
 * periwinkle full stop that closes the homepage headline.
 *
 * Pass `size` rather than a `text-*` class in `className` — see above.
 */
export function PageTitle({
  children,
  id,
  dot = true,
  size = "hero",
  className,
}: {
  children: React.ReactNode;
  id?: string;
  dot?: boolean;
  size?: PageTitleSize;
  className?: string;
}) {
  return (
    <h1
      id={id}
      className={cn(
        "bg-gradient-to-b from-[#b6bbc6] to-[#dfe2e9] bg-clip-text font-medium tracking-[-0.028em] text-transparent",
        titleSizes[size],
        className
      )}
    >
      {children}
      {dot ? (
        <span
          aria-hidden="true"
          className="ml-[0.04em] inline-block size-[0.13em] rounded-full bg-accent-indigo-soft align-baseline"
        />
      ) : null}
    </h1>
  );
}
