import type { MetadataRoute } from "next";

import { profile } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.displayName} Portfolio`,
    short_name: profile.displayName,
    description: profile.shortBio,
    start_url: "/",
    display: "standalone",
    /* Both derived from the design tokens in globals.css. */
    background_color: "#080b12",
    theme_color: "#080b12",
    icons: [
      { src: "/app-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
