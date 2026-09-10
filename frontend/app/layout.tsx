import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by next/font — no runtime CDN request, and the
// same bytes ship to every visitor.
//
// IBM Plex, not Inter. Inter plus JetBrains Mono is the most common default
// UI pairing there is, and it reads as templated no matter what sits on top
// of it. Plex was commissioned for exactly this technical register — it
// belongs to spec sheets and instrument panels, which is the subject here.
// Condensed carries display type so headings get their own voice without
// introducing a second unrelated family.

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-sans",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-plex-condensed",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://leologic.org"),
  title: {
    default: "LeoLogic — Leo Rao",
    template: "%s — LeoLogic",
  },
  description:
    "LeoLogic. Building precision systems at the intersection of chemical engineering and artificial intelligence.",
  keywords: ["LeoLogic", "Leo Rao", "AI systems", "process engineering", "chemical engineering", "manufacturing engineering", "automation"],
  openGraph: {
    title: "LeoLogic — Leo Rao",
    description:
      "Precision systems at the intersection of chemical engineering, process engineering, and artificial intelligence.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
