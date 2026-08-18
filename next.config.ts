import type { NextConfig } from "next";

import { experience } from "./lib/experience";
import { allProjects } from "./lib/projects";

/**
 * Permanent redirects for every retired path.
 *
 * Built from the collections rather than typed out, so a `legacySlugs` entry
 * on a record is the single place a retired URL is declared and it cannot
 * drift from the route that now serves it.
 *
 * `permanent: true` emits a 308, which preserves the request method and — the
 * part that matters here — query strings, so a link carrying a UTM tag or an
 * anchor survives the move.
 *
 * One deliberate mapping: the old `regime-specialist-stock-predictor` slug
 * points at `ml-analysis-tool`, the honestly attributed collaborative record.
 * It must not point at `market-regime-risk-platform`, which is a different,
 * separately owned project — sending the old URL there would silently
 * transfer the old page's claims onto work they were never about.
 */
const projectRedirects = allProjects.flatMap((project) =>
  (project.legacySlugs ?? []).map((legacy) => ({
    source: `/projects/${legacy}`,
    destination: `/projects/${project.slug}`,
    permanent: true,
  }))
);

const experienceRedirects = experience.flatMap((item) =>
  (item.legacySlugs ?? []).map((legacy) => ({
    source: `/experience/${legacy}`,
    destination: `/experience/${item.slug}`,
    permanent: true,
  }))
);

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [...projectRedirects, ...experienceRedirects];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
