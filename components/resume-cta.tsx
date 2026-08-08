import { ArrowUpRight, Download } from "lucide-react";

import { CtaLink, ctaClass } from "@/components/cta-link";
import { PageEyebrow } from "@/components/page-title";
import { HomeSection } from "@/components/section-shell";
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
 * Closing band. The page has been getting quieter on the way down, so this
 * lands on the darkest panel of all with the heading back at display scale —
 * the counterpart to the hero rather than a coloured promo box.
 *
 * Copy is the original section's, unchanged.
 */
export function ResumeCta() {
  return (
    <HomeSection id="resume" labelledBy="resume-title" glow="right">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <PageEyebrow index="05" label="Resume + Contact" />

          <h2
            id="resume-title"
            className="mt-5 max-w-[26rem] bg-gradient-to-b from-[#b6bbc6] to-[#e4e7ed] bg-clip-text text-[clamp(1.8rem,2.85vw,2.7rem)]/[1.14] font-medium tracking-[-0.025em] text-transparent"
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

          <div className="mt-9 flex flex-wrap items-center gap-4">
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
