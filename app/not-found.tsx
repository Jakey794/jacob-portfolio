import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/footer";
import { PageAtmosphere, pageAtmospheres } from "@/components/page-atmosphere";
import { PageEyebrow, PageTitle } from "@/components/page-title";
import { pageGutters } from "@/components/section-shell";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page does not exist. Browse projects, experience, or get in touch.",
  robots: { index: false, follow: true },
};

/**
 * Custom 404.
 *
 * A dead end is the one place a visitor definitely needs somewhere to go, so
 * this offers the four real destinations rather than an apology. The
 * destinations are the nav itself, so this page cannot list a route that has
 * been removed.
 */
export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <PageAtmosphere config={pageAtmospheres.contact} />
      <SiteNav />

      <main
        id="main-content"
        className={cn(
          "relative z-10 flex min-h-[68svh] flex-col justify-center pb-24 pt-[9rem] md:pt-[8rem]",
          pageGutters.page
        )}
      >
        <PageEyebrow index="404" label="Not found" />

        {/* No full stop — `PageTitle` closes the line with the accent dot. */}
        <PageTitle size="page" className="mt-3">
          This page doesn&rsquo;t exist
        </PageTitle>

        <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-[1.7] text-[#a2a8b5]">
          The link may be out of date, or the address may have a typo. Everything
          on the site is one step from here.
        </p>

        <ul className="mt-12 grid max-w-[46rem] border-t border-white/10">
          {navItems.map((item) => (
            <li key={item.key} className="border-b border-white/10">
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-6 rounded-sm py-5 text-[1.05rem] text-[#c9ced8] outline-none transition-colors hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {item.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-[1.05rem] text-white/55 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-indigo-soft"
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
