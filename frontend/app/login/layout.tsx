import type { Metadata } from "next";

// The login page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Operator Console",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
