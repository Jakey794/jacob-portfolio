import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type CtaVariant = "primary" | "secondary";
export type CtaSize = "lg" | "sm";

/**
 * Button metrics, exported so `<a>` elements (external links, mailto, the
 * résumé PDF) can match `CtaLink` exactly instead of approximating it.
 */
export function ctaClass(
  variant: CtaVariant = "primary",
  size: CtaSize = "lg",
  className?: string
) {
  return cn(
    "group inline-flex items-center justify-center gap-3 rounded-md leading-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    size === "lg"
      ? "h-[3.125rem] px-7 text-[1.0625rem]"
      : "h-[2.75rem] px-5 text-[0.94rem]",
    variant === "primary"
      ? "bg-accent-indigo text-white hover:bg-accent-indigo/85"
      : "border border-white/18 text-white hover:border-white/40 hover:bg-white/[0.05]",
    className
  );
}

type CtaLinkProps = ComponentProps<typeof Link> & {
  variant?: CtaVariant;
  size?: CtaSize;
  /** Set false for links that should not show the trailing arrow. */
  withArrow?: boolean;
};

/**
 * Large hero-scale call to action. Shared so later pages keep the same
 * button metrics as the homepage.
 */
export function CtaLink({
  variant = "primary",
  size = "lg",
  withArrow = true,
  className,
  children,
  ...props
}: CtaLinkProps) {
  return (
    <Link {...props} className={ctaClass(variant, size, className)}>
      {children}
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-[1.05rem] transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </Link>
  );
}

/**
 * Quiet inline link with a trailing arrow — the "more about me" / "all
 * projects" affordance. Shared so every one of them has the same colour,
 * hover and focus ring rather than each section inventing its own.
 */
export function ArrowLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex items-center gap-3 rounded-sm text-[0.95rem] text-accent-indigo-soft transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-accent-indigo-soft/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-[1.05rem] transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}
