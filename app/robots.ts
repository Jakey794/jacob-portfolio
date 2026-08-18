import type { MetadataRoute } from "next";

import { absoluteUrl, siteUrl } from "@/lib/site";

/**
 * Robots policy.
 *
 * Everything public is crawlable. `/resume.pdf` is excluded from the sitemap
 * but not disallowed here — it is a legitimate destination a reader may be
 * linked to directly.
 *
 * This file is not a privacy control. Nothing private is served in the first
 * place; a robots rule would only ask politely.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
