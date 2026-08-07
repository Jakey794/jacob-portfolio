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
      <span aria-hidden="true" className="text-white/25">
        /
      </span>
      <span className="text-white/45">{label}</span>
    </p>
  );
}

/**
 * Display heading with the accent dot used across the site. `dot` renders the
 * periwinkle full stop that closes the homepage headline.
 */
export function PageTitle({
  children,
  id,
  dot = true,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  dot?: boolean;
  className?: string;
}) {
  return (
    <h1
      id={id}
      className={cn(
        "bg-gradient-to-b from-[#b6bbc6] to-[#dfe2e9] bg-clip-text font-medium leading-[1.06] tracking-[-0.028em] text-transparent",
        "text-[clamp(2.6rem,5.7vw,5.95rem)]",
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
