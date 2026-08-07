import Link from "next/link";

import { cn } from "@/lib/utils";

export type RailSection = {
  /** Two-digit label rendered on the rail. */
  index: string;
  /** Accessible section name. */
  label: string;
  href: string;
};

export const homeSections: RailSection[] = [
  { index: "01", label: "Introduction", href: "#top" },
  { index: "02", label: "About", href: "#about" },
  { index: "03", label: "Projects", href: "#projects" },
  { index: "04", label: "Experience", href: "#experience" },
  { index: "05", label: "Contact", href: "#contact" },
];

/**
 * Vertical numbered section rail. Static by design: the marker highlights the
 * section the rail is rendered in, so no scroll listeners or client JS.
 */
export function SectionRail({
  sections = homeSections,
  activeIndex = "01",
  className,
}: {
  sections?: RailSection[];
  activeIndex?: string;
  className?: string;
}) {
  return (
    <nav
      aria-label="Page sections"
      className={cn("relative", className)}
    >
      <span
        aria-hidden="true"
        className="absolute left-[4px] top-1.5 bottom-1.5 w-px bg-white/15"
      />
      <ol className="relative flex flex-col gap-[2.85rem]">
        {sections.map((section) => {
          const isActive = section.index === activeIndex;

          return (
            <li key={section.index}>
              <Link
                href={section.href}
                className="group flex items-center gap-[1.35rem] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-[9px] shrink-0 rounded-full border bg-background transition-colors",
                    isActive
                      ? "border-accent-indigo bg-accent-indigo"
                      : "border-white/35 group-hover:border-white/70"
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-mono text-[0.78rem] tracking-[0.12em] transition-colors",
                    isActive
                      ? "text-white/90"
                      : "text-white/45 group-hover:text-white/80"
                  )}
                >
                  {section.index}
                </span>
                <span className="sr-only">{`Section ${section.index} — ${section.label}`}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
