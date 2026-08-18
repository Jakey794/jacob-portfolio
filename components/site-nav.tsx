import Link from "next/link";

import { cn } from "@/lib/utils";
import { navItems, profile, type NavKey } from "@/lib/site";

/**
 * Primary navigation.
 *
 * Entries come from `lib/site.ts`, which is also what the 404 page lists, so
 * a route can never be present in one and missing from the other.
 */
export type { NavKey };

export function SiteNav({
  /** Marks the current section with an accent dot, as in the concepts. */
  active,
}: {
  active?: NavKey;
} = {}) {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      {/* The left padding is solved so the wordmark — not the accent bar,
          which is an outdented margin mark — lands on the page gutter at
          6.4rem: 3.175rem + the 2px bar + the 3.1rem gap. The nav, the hero
          headline and every section masthead therefore share one axis. */}
      <div className="flex flex-col gap-4 px-6 pt-6 sm:px-10 md:flex-row md:items-center md:justify-between md:gap-10 lg:pl-[3.175rem] lg:pr-[6.4rem] lg:pt-[2.15rem]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-8 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent lg:gap-[3.1rem]"
        >
          <span
            aria-hidden="true"
            className="hidden h-9 w-[2px] bg-accent-indigo-soft/70 lg:block"
          />
          <span className="text-[1.4rem] font-medium tracking-[-0.01em] text-white lg:text-[1.85rem]">
            Jacob
          </span>
          <span className="sr-only">{`${profile.displayName} — home`}</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem] text-white/85 sm:gap-x-7 md:text-[0.95rem] lg:gap-x-[6rem] lg:text-[1.0625rem]">
            {navItems.map((item) => {
              const isActive = item.key === active;

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    /* `py-1` takes the hit area to 30px. The links clear WCAG
                       2.5.8 on the spacing exception either way, but 22px is
                       a small thumb target on a phone and the padding costs
                       nothing in the layout. */
                    className={cn(
                      "relative inline-block rounded-sm py-1 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
                      isActive && "text-white"
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-[0.2rem] left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-accent-indigo-soft"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
