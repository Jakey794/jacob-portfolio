import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  children,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase text-cyan-300">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="text-3xl font-semibold text-slate-50 sm:text-4xl"
      >
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
          {children}
        </div>
      ) : null}
    </div>
  );
}
