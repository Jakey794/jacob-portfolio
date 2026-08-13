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
            style={{
              objectPosition: focus,
              // Light-mode product UI is the brightest thing on a near-black
              // page. A luminance and saturation pull-back seats the capture in
              // the grade the rest of the site is shot in, and is gentler than
              // another scrim: scrims flatten the interface, this keeps its
              // internal contrast.
              //
              // At 0.9 the captures were still the brightest object on every
              // page they appeared on — a white rectangle in a near-black
              // composition, which is what made the projects index and the case
              // study mastheads read as a different site. Taken further down and
              // slightly harder on contrast, the interface stays legible while
              // sitting inside the page's own exposure rather than on top of it.
              ...(grade === "settle"
                ? { filter: "brightness(0.58) saturate(0.68) contrast(1.06)" }
                : {}),
            }}
          />

          {/*
            The captures are light-mode product UI on a near-black page. They
            were previously buried under three stacked scrims, which took them
            to solid black; the opposite extreme left a near-white rectangle as
            the brightest object on every page it appeared on.

            The grade is doing the work now: luminance and saturation come down
            in the filter above, and the cool multiply cast pulls what is left
            of the whites toward the page's own navy instead of leaving them
            neutral grey. The two gradients only settle the edges, so the
            interface keeps its internal contrast and stays readable.
          */}
          {grade === "settle" ? (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,22,0.24)_0%,transparent_26%,transparent_66%,rgba(8,11,18,0.46)_100%)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_38%,transparent_44%,rgba(8,11,18,0.38)_100%)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[rgba(34,42,78,0.30)] mix-blend-multiply"
              />
            </>
          ) : null}
        </>
      ) : (
        /*
          No capture for this project. The slot draws the site's own
          topographic mark on a measuring grid rather than announcing the
          gap: a row that reads as a quiet technical plate sits beside a
          real screenshot without looking like a missing image, whereas the
          "capture pending" label this used to carry told every reader that
          the page was unfinished.
        */
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(133,144,246,0.06),transparent_58%),linear-gradient(rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:auto,22px_22px,22px_22px]"
        >
          <WireframePeaks className="absolute bottom-0 left-1/2 w-[62%] -translate-x-1/2 opacity-70" />
        </div>
      )}
    </div>
  );
}
