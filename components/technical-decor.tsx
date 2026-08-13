import { cn } from "@/lib/utils";

/**
 * Decorative technical marks used across the site's cinematic sections.
 * Everything here is presentational and hidden from assistive technology.
 */

export function CrossMark({
  className,
  size = 14,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
      className={cn("text-white/35", className)}
    >
      <path d="M12 1.5v21M1.5 12h21" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function GuideLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block w-px bg-gradient-to-b from-transparent via-white/12 to-transparent",
        className
      )}
    />
  );
}

export function CoordinateBlock({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "font-mono text-[0.78rem] uppercase leading-[1.95] tracking-[0.14em] text-white/40",
        className
      )}
    >
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
}

export function DotGrid({
  className,
  columns = 12,
  rows = 6,
  gap = 11,
}: {
  className?: string;
  columns?: number;
  rows?: number;
  gap?: number;
}) {
  const width = columns * gap;
  const height = rows * gap;

  return (
    <svg
      aria-hidden="true"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-white/30", className)}
    >
      <defs>
        <pattern
          id="decor-dot-grid"
          width={gap}
          height={gap}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={gap / 2} cy={gap / 2} r={1} fill="currentColor" />
        </pattern>
        <linearGradient id="decor-dot-fade" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.95" />
          <stop offset="1" stopColor="white" stopOpacity="0.15" />
        </linearGradient>
        <mask id="decor-dot-mask">
          <rect width={width} height={height} fill="url(#decor-dot-fade)" />
        </mask>
      </defs>
      <rect
        width={width}
        height={height}
        fill="url(#decor-dot-grid)"
        mask="url(#decor-dot-mask)"
      />
    </svg>
  );
}

/** Thin topographic peak outlines, used as depth behind the hero portrait. */
export function WireframePeaks({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 140"
      fill="none"
      className={cn("text-accent-indigo-soft/30", className)}
    >
      <g stroke="currentColor" strokeWidth={0.55} strokeLinejoin="round">
        <path d="M2 128 46 60 74 92 108 26 136 74 160 48 198 122" />
        <path
          d="M18 128 52 82 76 104 110 52 134 90 158 70 186 122"
          opacity="0.6"
        />
        <path d="M40 128 74 98 104 118 132 96 166 126" opacity="0.35" />
        <path d="M108 26 108 128" opacity="0.22" />
        <path d="M46 60 46 128" opacity="0.18" />
      </g>
      <g fill="currentColor">
        <circle cx="108" cy="26" r="1.6" />
        <circle cx="46" cy="60" r="1.2" />
        <circle cx="136" cy="74" r="1.2" />
        <circle cx="160" cy="48" r="1.2" />
      </g>
    </svg>
  );
}

export function ScrollCue({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex flex-col items-center gap-3", className)}
    >
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white/45">
        Scroll
      </span>
      <span className="h-16 w-px bg-gradient-to-b from-white/40 to-transparent" />
    </div>
  );
}
