import { pageGutters } from "@/components/section-shell";
import { cn } from "@/lib/utils";

/**
 * Site footer.
 *
 * `className` carries the gutters of whatever page it closes. The footer used
 * to hard-code the homepage's margins, so on the four standalone routes its
 * rule started eighteen pixels right of the page's own rules and ended a
 * hundred and fifty short of them — two near-parallel hairlines at different
 * insets, which was the most visible seam on those pages.
 *
 * `relative` keeps the footer painting after the closing band, so the ground
 * haze that band throws past its own edge sits behind this copy rather than
 * over it.
 */
export function Footer({ className }: { className?: string } = {}) {
  return (
    <footer className={cn("relative pb-12", className ?? pageGutters.page)}>
      {/* The same fading hairline the section mastheads open with, so the page
          closes on the rule it has been using all the way down rather than on
          a heavier full-width border. */}
      <span
        aria-hidden="true"
        className="block h-px bg-[linear-gradient(90deg,rgba(133,144,246,0.24)_0%,rgba(255,255,255,0.11)_14%,rgba(255,255,255,0.05)_62%,transparent_100%)]"
      />
      <div className="flex flex-col gap-4 pt-9 text-[0.85rem] text-[#8d93a1] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-medium text-[#dfe2e9]">Jacob Allan</p>
          <p className="mt-1.5">
            Machine Learning &amp; Quantitative Software Engineering
          </p>
        </div>
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/25">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
