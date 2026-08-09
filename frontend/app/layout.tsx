import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by next/font — no runtime CDN request, and the
// same bytes ship to every visitor. The previous stack led with Segoe UI,
// Aptos Display, and Cascadia Code, which are Windows-only: everyone else
// silently fell back to a different typeface. These are the closest open
// variable equivalents, so the design reads identically on every platform.

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "LeoLogic — Leo Rao",
    template: "%s — LeoLogic",
  },
  description:
    "LeoLogic. Building precision systems at the intersection of chemical engineering and artificial intelligence.",
  keywords: ["LeoLogic", "Leo Rao", "AI systems", "quant trading", "chemical engineering", "automation"],
  openGraph: {
    title: "LeoLogic — Leo Rao",
    description:
      "Precision systems at the intersection of chemical engineering, quantitative research, and artificial intelligence.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
