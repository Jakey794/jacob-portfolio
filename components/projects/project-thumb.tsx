import Image from "next/image";

import { cn } from "@/lib/utils";
import { WireframePeaks } from "@/components/technical-decor";

/**
 * Project preview image.
 *
 * Sources are already cropped: `scripts/crop-captures.mjs` derives what ships
 * from the raw screenshots, so nothing here has to defend against browser
 * chrome leaking into frame. Several projects have no capture at all, so this
 * falls back to a quiet technical plate rather than an empty box — drop a real
 * capture into `public/images/projects/` and set `image` on the project.
 */
export function ProjectThumb({
  src,
  alt,
  className,
  sizes,
  priority = false,
  /** Focal point, as CSS `object-position`. */
  focus = "center",
  /** Presentational grading. `plain` leaves the capture alone. */
  grade = "settle",
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  focus?: string;
  grade?: "settle" | "plain";
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0b0e16]", className)}>
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={{ objectPosition: focus }}
          />

          {/*
            The captures are light-mode product UI on a near-black page. They
            were previously buried under three stacked scrims, which took them
            to solid black. A single cool, low-strength grade is enough to seat
            one in the composition while leaving the interface readable.
          */}
          {grade === "settle" ? (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,22,0.20)_0%,transparent_26%,transparent_68%,rgba(8,11,18,0.42)_100%)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_38%,transparent_46%,rgba(8,11,18,0.34)_100%)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[rgba(28,34,64,0.16)] mix-blend-multiply"
              />
            </>
          ) : null}
        </>
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
