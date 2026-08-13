import Link from "next/link";

import { cn } from "@/lib/utils";

export type RailSection = {
  /** Two-digit label rendered on the rail. */
  index: string;
  /** Accessible section name, and the visible label in `labelled` mode. */
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
 * Vertical numbered section rail, shared by every route.
 *
 * Each standalone page previously inlined its own copy of this markup, which
 * is why the dot size, gap, spine inset and active colour had drifted apart
 * across six rails. There is one implementation now; a page picks a `variant`
 * and a `gap` and nothing else.
 *
 * Static by design: the marker highlights the section the rail is rendered
 * for, so there are no scroll listeners and no client JS.
 */
export function SectionRail({
  sections = homeSections,
  activeIndex = "01",
  /** `numbered` shows the two-digit index; `labelled` shows the section name. */
  variant = "numbered",
  /** Vertical rhythm between entries. Matches the page's panel density. */
  gap = "2.85rem",
  className,
}: {
  sections?: RailSection[];
  activeIndex?: string;
  variant?: "numbered" | "labelled" | "indexed";
  gap?: string;
  className?: string;
}) {
  return (
    <nav aria-label="Page sections" className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="absolute left-[4px] top-1.5 bottom-1.5 w-px bg-white/15"
      />
      <ol
        className="relative flex flex-col"
        style={{ gap }}
      >
        {sections.map((section) => {
          const isActive = section.index === activeIndex;

          return (
            <li key={section.index}>
              <Link
                href={section.href}
                className={cn(
                  "group flex gap-[1.25rem] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
                  variant === "indexed" ? "items-start" : "items-center"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-[9px] shrink-0 rounded-full border bg-background transition-colors",
                    variant === "indexed" && "mt-[0.3rem]",
                    isActive
                      ? "border-accent-indigo bg-accent-indigo"
                      : "border-white/35 group-hover:border-white/70"
                  )}
                />

                {variant === "numbered" ? (
                  <>
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
                  </>
                ) : variant === "indexed" ? (
                  <span>
                    <span
                      aria-hidden="true"
                      className="block font-mono text-[0.74rem] tracking-[0.1em] text-white/40"
                    >
                      {section.index}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block text-[0.85rem] transition-colors",
                        isActive
                          ? "text-accent-indigo-soft"
                          : "text-white/55 group-hover:text-white/85"
                      )}
                    >
                      {section.label}
                    </span>
                  </span>
                ) : (
                  <span
                    className={cn(
                      "text-[0.86rem] transition-colors",
                      isActive
                        ? "text-accent-indigo-soft"
                        : "text-white/48 group-hover:text-white/85"
                    )}
                  >
                    {section.label}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Builds rail sections from `{ id, label }` anchors on a standalone page. */
export function anchorSections(
  entries: { id: string; label: string }[]
): RailSection[] {
  return entries.map((entry, index) => ({
    index: String(index + 1).padStart(2, "0"),
    label: entry.label,
    href: `#${entry.id}`,
  }));
}
