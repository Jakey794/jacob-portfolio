import Link from "next/link";

/**
 * Every entry must resolve to a section that actually exists on the homepage.
 * Add new destinations here only once the corresponding section ships.
 */
const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
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
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-sm transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
