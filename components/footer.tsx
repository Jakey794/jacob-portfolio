import { pageGutters } from "@/components/section-shell";
import { cn } from "@/lib/utils";
import { contactLinks, profile } from "@/lib/site";

/**
 * Site footer.
 *
 * `className` carries the gutters of whatever page it closes, so its rule
 * lands on the same axis as that page's own rules rather than eighteen pixels
 * off it.
 *
 * `relative` keeps the footer painting after the closing band, so the ground
 * haze that band throws past its own edge sits behind this copy rather than
 * over it.
 */
const links = [
  { label: "Email", href: contactLinks.emailHref, external: false },
  { label: "LinkedIn", href: contactLinks.linkedin, external: true },
  { label: "GitHub", href: contactLinks.github, external: true },
  { label: "Resume", href: contactLinks.resume, external: false },
];

export function Footer({ className }: { className?: string } = {}) {
  return (
    <footer className={cn("relative pb-12", className ?? pageGutters.page)}>
      {/* The same fading hairline the section mastheads open with, so the page
          closes on the rule it has been using all the way down. */}
      <span
        aria-hidden="true"
        className="block h-px bg-[linear-gradient(90deg,rgba(133,144,246,0.24)_0%,rgba(255,255,255,0.11)_14%,rgba(255,255,255,0.05)_62%,transparent_100%)]"
      />

      <div className="flex flex-col gap-8 pt-9 text-[0.85rem] text-[#8d93a1] lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div>
          <p className="font-medium text-[#dfe2e9]">{profile.displayName}</p>
          <p className="mt-1.5 max-w-[24rem]">{profile.footerDescriptor}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="rounded-sm transition-colors outline-none hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  {link.label}
                  {link.external ? (
                    <span className="sr-only"> (opens in a new tab)</span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/55">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
