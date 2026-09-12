import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Condensed, Spectral } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by next/font — no runtime CDN request, and the
// same bytes ship to every visitor.
//
// IBM Plex Sans stays as the body face — clean, legible, still the right
// register. Plex Mono is now scoped to genuinely technical contexts (data
// labels, registry ids, the dashboard) instead of section headings — a
// dark-terminal cue that a live audit of real engineering-firm sites
// (Arup, Webb Yates, Eckersley O'Callaghan) doesn't share. Display
// headings move to Spectral, a serif Arup itself uses in production —
// verified by reading its live computed styles, not assumed.

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

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-spectral",
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
      className={`${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable} ${spectral.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
