import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jacob Allan | Machine Learning & Quantitative Software Engineering",
  description:
    "Portfolio for Jacob Allan, an Engineering Science student at the University of Toronto building ML systems, full-stack AI tools, and quantitative modeling projects.",
  openGraph: {
    title: "Jacob Allan | ML, Quant & Software Engineering",
    description:
      "Engineering Science student at UofT building ML systems, full-stack AI tools, and quantitative software.",
    url: "https://jacob-portfolio-six.vercel.app/",
    siteName: "Jacob Allan Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacob Allan | ML, Quant & Software Engineering",
    description:
      "Engineering Science student at UofT building ML systems, full-stack AI tools, and quantitative software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
