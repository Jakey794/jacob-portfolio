import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type CtaLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
  /** Set false for links that should not show the trailing arrow. */
  withArrow?: boolean;
};

/**
 * Large hero-scale call to action. Shared so later pages keep the same
 * button metrics as the homepage.
 */
export function CtaLink({
  variant = "primary",
  withArrow = true,
  className,
  children,
  ...props
}: CtaLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex h-[3.125rem] items-center justify-center gap-3 rounded-md px-7 text-[1.0625rem] leading-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo-soft focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "primary"
          ? "bg-accent-indigo text-white hover:bg-accent-indigo/85"
          : "border border-white/18 text-white hover:border-white/40 hover:bg-white/[0.05]",
        className
      )}
    >
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
