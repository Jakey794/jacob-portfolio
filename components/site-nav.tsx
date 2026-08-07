import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Every entry must resolve to a destination that actually exists.
 * Add new items here only once the corresponding section or route ships.
 *
 * Hrefs are root-relative so the same nav works on standalone routes such as
 * /projects and /projects/[slug], not just the homepage.
 */
const navItems = [
  { key: "about", label: "About", href: "/about" },
  { key: "projects", label: "Projects", href: "/projects" },
  { key: "experience", label: "Experience", href: "/experience" },
  { key: "contact", label: "Contact", href: "/contact" },
];

export type NavKey = (typeof navItems)[number]["key"];

export function SiteNav({
  /** Marks the current section with an accent dot, as in the concepts. */
  active,
}: {
  active?: NavKey;
} = {}) {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="flex flex-col gap-4 px-6 pt-6 sm:px-10 md:flex-row md:items-center md:justify-between md:gap-10 lg:pl-[2.375rem] lg:pr-[5.25rem] lg:pt-[2.15rem]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-8 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent lg:gap-[3.1rem]"
        >
          <span
            aria-hidden="true"
            className="hidden h-9 w-[2px] bg-accent-indigo-soft/70 lg:block"
          />
          <span className="text-[1.4rem] font-medium tracking-[-0.01em] text-white lg:text-[1.85rem]">
            Allan
          </span>
          <span className="sr-only">— home</span>
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
                    className={cn(
                      "relative rounded-sm transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
                      isActive && "text-white"
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-[0.55rem] left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-accent-indigo-soft"
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
