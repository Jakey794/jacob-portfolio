import { ArrowUpRight, FileText, GitBranch, Package, Play } from "lucide-react";

import { ctaClass } from "@/components/cta-link";
import type { Metric, ResourceLink } from "@/lib/content-types";
import { cn } from "@/lib/utils";

/**
 * Outbound actions and measured figures — the two things on this site that
 * are load-bearing for credibility, and the two most easily degraded by
 * layout.
 */

const LINK_ICON = {
  source: GitBranch,
  live: Play,
  release: Package,
  docs: FileText,
} as const;

/**
 * Actions for a record.
 *
 * Only links that exist are passed in, so there is no disabled state and no
 * "coming soon" — a project with no live demo simply shows one fewer button,
 * which is honest and also looks better than a greyed-out promise.
 *
 * Every action states its destination in its accessible name, because
 * "View source" repeated down a page of seven projects is seven identical
 * link names to a screen-reader user.
 */
export function ResourceActions({
  links,
  recordTitle,
  size = "sm",
  className,
}: {
  links: ResourceLink[];
  /** Disambiguates otherwise-identical link text across a page. */
  recordTitle: string;
  size?: "sm" | "lg";
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center gap-3">
        {links.map((link, index) => {
          const Icon = LINK_ICON[link.kind];
          const primary = index === 0;

          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} — ${recordTitle} (opens in a new tab)`}
              className={ctaClass(primary ? "primary" : "secondary", size)}
            >
              <Icon aria-hidden="true" className="size-[0.95rem]" />
              {link.label}
              <ArrowUpRight
                aria-hidden="true"
                className="size-[0.9rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          );
        })}
      </div>

      {links.some((link) => link.note) ? (
        <ul className="grid gap-1">
          {links
            .filter((link) => link.note)
            .map((link) => (
              <li
                key={`${link.href}-note`}
                className="text-[0.78rem] leading-[1.5] text-white/55"
              >
                {link.note}
              </li>
            ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Compact inline action row, for cards where a button row is too heavy. */
export function ResourceLinkRow({
  links,
  recordTitle,
  className,
}: {
  links: ResourceLink[];
  recordTitle: string;
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-2", className)}>
      {links.map((link) => {
        const Icon = LINK_ICON[link.kind];

        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} — ${recordTitle} (opens in a new tab)`}
              className="group/link inline-flex items-center gap-2 rounded-sm text-[0.85rem] text-white/50 transition-colors outline-none hover:text-accent-indigo-soft focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <Icon aria-hidden="true" className="size-[0.85rem]" />
              {link.label}
              <ArrowUpRight
                aria-hidden="true"
                className="size-[0.8rem] transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Measured figures, each with the run that produced it.
 *
 * The methodology is rendered, not tucked into a `title` attribute. A tooltip
 * is invisible on touch, invisible in a screenshot, and invisible to anyone
 * skimming — which is every reader who would otherwise take "≈128 ms p95" for
 * a production number. It costs two lines of small type to be accurate.
 */
export function MetricGrid({
  metrics,
  columns = 2,
  className,
}: {
  metrics: Metric[];
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  if (metrics.length === 0) return null;

  return (
    <ul
      className={cn(
        "grid gap-x-8 gap-y-7",
        columns === 3
          ? "sm:grid-cols-2 xl:grid-cols-3"
          : columns === 2
            ? "sm:grid-cols-2"
            : "",
        className
      )}
    >
      {metrics.map((metric) => (
        <li key={metric.label} className="border-t border-white/12 pt-3.5">
          <p className="text-[1.4rem] font-medium leading-none tracking-[-0.025em] text-accent-indigo-soft">
            {metric.value}
          </p>
          <p className="mt-2.5 text-[0.8rem] leading-[1.45] text-[#c3c8d2]">
            {metric.label}
          </p>
          <p className="mt-2 text-[0.74rem] leading-[1.55] text-[#8d93a1]">
            {metric.methodology}
          </p>
          {metric.qualifier ? (
            <p className="mt-1.5 text-[0.74rem] leading-[1.55] text-white/55">
              {metric.qualifier}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/**
 * Short evidence chips for index cards.
 *
 * These are the only place a figure appears without its methodology beside
 * it, so each chip has to be self-qualifying: "1,286 PostgreSQL-backed tests"
 * rather than "1,286 tests", "≈90% unseen-data accuracy" rather than "90%".
 * The full method is one click away on the detail page.
 */
export function ProofChips({
  chips,
  className,
}: {
  chips: string[];
  className?: string;
}) {
  if (chips.length === 0) return null;

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[0.78rem] text-[#9299a7]",
        className
      )}
    >
      {chips.map((chip) => (
        <li key={chip} className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-[4px] shrink-0 rounded-full bg-accent-indigo-soft/60"
          />
          {chip}
        </li>
      ))}
    </ul>
  );
}
