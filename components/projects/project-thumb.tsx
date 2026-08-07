import Image from "next/image";

import { cn } from "@/lib/utils";
import { WireframePeaks } from "@/components/technical-decor";

/**
 * Project preview image. Several projects have no screenshot yet, so this
 * falls back to a quiet technical plate rather than an empty box — drop a real
 * capture into `public/images/` and set `image` on the project to replace it.
 */
export function ProjectThumb({
  src,
  alt,
  className,
  sizes,
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#0b0e16]",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-left-top"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(133,144,246,0.07),transparent_58%),linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:auto,22px_22px,22px_22px]"
        >
          <WireframePeaks className="absolute bottom-0 left-1/2 w-[62%] -translate-x-1/2 opacity-70" />
          <span className="absolute left-3 top-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/25">
            capture pending
          </span>
        </div>
      )}
    </div>
  );
}
