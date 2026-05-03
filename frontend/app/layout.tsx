import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "LEOLOGIC",
    template: "%s // LEOLOGIC",
  },
  description: "Personal Operating System — Engineering, Quantitative Systems, and Biometric Optimization.",
  keywords: ["leologic", "quant trading", "biometrics", "engineering", "personal OS"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-zinc-950 text-zinc-200 scanline">{children}</body>
    </html>
  );
}
