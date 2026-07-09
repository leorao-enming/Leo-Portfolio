import type { Metadata } from "next";
import "./globals.css";

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
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
