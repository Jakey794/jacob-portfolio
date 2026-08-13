import { ArrowUpRight, Download } from "lucide-react";

import { CtaLink, ctaClass } from "@/components/cta-link";
import { SectionMasthead } from "@/components/section-heading";
import { HomeSection } from "@/components/section-shell";
import { CoordinateBlock } from "@/components/technical-decor";
import { contactChannels } from "@/lib/contact";

/** Destinations come from lib/contact.ts so there is one source of truth. */
const links = (["email", "github", "linkedin"] as const).map((key) => {
  const channel = contactChannels.find((c) => c.key === key)!;

  return {
    key,
    label: channel.key === "email" ? "Email" : channel.label,
    href: channel.href,
    text: channel.text,
    external: channel.external,
  };
});

/**
 * Closing scene.
 *
 * The page has been getting quieter on the way down, so this brings the
 * atmosphere back: the same indigo haze that carries the hero rises through
 * the last band and under the footer, and the location readout that opens the
 * hero closes the page. Without it the homepage simply ran out of sections and
 * stopped on a rule.
 */
export function ResumeCta() {
  return (
    <HomeSection id="resume" labelledBy="resume-title" className="lg:pb-[6rem]">
      <ClosingAtmosphere />

      <SectionMasthead index="05" eyebrow="Resume + Contact" />

      <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <h2
            id="resume-title"
            className="max-w-[26rem] bg-gradient-to-b from-[#b6bbc6] to-[#e4e7ed] bg-clip-text text-[clamp(1.9rem,3.05vw,2.9rem)]/[1.13] font-medium tracking-[-0.026em] text-transparent"
          >
            Resume &mdash; Machine Learning, Software, and Quantitative Finance
            <span
              aria-hidden="true"
              className="ml-[0.06em] inline-block size-[0.12em] rounded-full bg-accent-indigo-soft align-baseline"
            />
          </h2>

          <p className="mt-6 max-w-[32rem] text-[1rem] leading-[1.74] text-[#8d93a1]">
            A concise resume covering ML research, full-stack AI tools,
            quantitative modeling, and engineering experience.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClass("primary")}
            >
              Download Resume
              <Download aria-hidden="true" className="size-[1.05rem]" />
            </a>
            <CtaLink href="/contact" variant="secondary">
              Get In Touch
            </CtaLink>
          </div>

          {/* Closes the loop with the readout in the hero's lower-left. */}
          <CoordinateBlock
            lines={["43.6629° N", "79.3957° W", "Toronto, ON"]}
            className="mt-12 hidden lg:block"
          />
        </div>

        {/* `id="contact"` is the hero rail's 05 target — keep it here. */}
        <ul
          id="contact"
          className="grid scroll-mt-24 self-start border-t border-white/10"
        >
          {links.map((link) => (
            <li key={link.key} className="border-b border-white/10">
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between gap-6 rounded-sm py-5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/35">
                    {link.label}
                  </span>
                  <span className="mt-2 block truncate text-[1rem] text-[#c9ced8] transition-colors group-hover:text-accent-indigo-soft">
                    {link.text}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-[1.1rem] shrink-0 text-white/25 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-indigo-soft"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </HomeSection>
  );
}

/**
 * Ground haze for the foot of the page. Sits at `-z-10` inside the band's own
 * stacking context and is allowed to run past the section, so the footer sits
 * inside the same weather rather than on flat black beneath it.
 *
 * It runs to `-bottom-[8rem]`, which is the height of the footer, and no
 * further. At `-bottom-[14rem]` the box ended ninety-two pixels below the last
 * thing on the page: because it is in normal flow inside the section it
 * counted toward the document height, so scrolling to the bottom of the
 * homepage ran past the footer into a strip of empty background. Ending the
 * haze on the footer's own bottom edge keeps the weather and drops the gap.
 */
function ClosingAtmosphere() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-[8rem] -z-10 h-[34rem]"
    >
      <span className="absolute inset-0 bg-[radial-gradient(58%_48%_at_44%_86%,rgba(64,74,140,0.22)_0%,rgba(26,32,62,0.10)_46%,transparent_74%)]" />
      <span className="absolute inset-0 bg-[radial-gradient(38%_34%_at_84%_70%,rgba(40,48,96,0.16)_0%,transparent_72%)]" />
    </span>
  );
}
