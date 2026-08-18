import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { SkipLink } from "@/components/skip-link";
import { absoluteUrl, contactLinks, profile, siteSeo, siteUrl } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/**
 * `metadataBase` is what makes every relative Open Graph and canonical URL in
 * the tree resolve to an absolute one. Without it Next emits relative OG
 * image paths, which most crawlers will not follow.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteSeo.defaultTitle,
    template: siteSeo.titleTemplate,
  },
  description: siteSeo.description,
  applicationName: siteSeo.name,
  authors: [{ name: profile.displayName, url: siteUrl }],
  creator: profile.displayName,
  keywords: [...siteSeo.keywords],
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: siteSeo.defaultTitle,
    description: siteSeo.description,
    url: siteUrl,
    siteName: siteSeo.name,
    locale: siteSeo.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl(siteSeo.defaultSocialImage),
        width: 1200,
        height: 630,
        alt: `${profile.displayName} — ${profile.brandTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSeo.defaultTitle,
    description: siteSeo.description,
    images: [absoluteUrl(siteSeo.defaultSocialImage)],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#080b12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`dark h-full scroll-smooth antialiased ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/*
          Scroll reveals are JavaScript-driven and render with an inline
          `opacity: 0`. With scripting disabled nothing would ever turn them
          back on, so the whole page below the hero would be blank. This is the
          escape hatch, and it costs one rule.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        {children}

        {/*
          Site-wide identity. `sameAs` carries only the two profiles that are
          current and verified. The University of Toronto relationship is
          expressed with an explicit "expected" credential so nothing here
          implies a completed degree, and no phone number, citizenship,
          birthday or address appears — those exist in the source evidence and
          are deliberately not published.
        */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url: siteUrl,
            name: siteSeo.defaultTitle,
            mainEntity: {
              "@type": "Person",
              name: profile.displayName,
              url: siteUrl,
              email: contactLinks.emailHref,
              jobTitle: "Software Engineering Intern",
              description: profile.shortBio,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Toronto",
                addressRegion: "ON",
                addressCountry: "CA",
              },
              worksFor: {
                "@type": "Organization",
                name: "Northstar Downhole Specialists",
              },
              knowsAbout: [...profile.focusAreas],
              sameAs: [contactLinks.linkedin, contactLinks.github],
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "Bachelor of Applied Science (in progress)",
                name: "BASc in Engineering Science, expected May 2029",
                recognizedBy: {
                  "@type": "CollegeOrUniversity",
                  name: "University of Toronto",
                },
              },
            },
          }}
        />
      </body>
    </html>
  );
}
