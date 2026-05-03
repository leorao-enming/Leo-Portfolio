import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Public",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav
        style={{
          backgroundColor: "var(--color-surface-1)",
          borderBottom: "1px solid var(--color-border)",
        }}
        className="py-3"
      >
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 xl:px-24 w-full flex items-center justify-between">
          <Link href="/" className="terminal-text font-bold text-sm tracking-widest hover:opacity-80 transition-opacity">
            LEOLOGIC
          </Link>
          <div className="flex items-center gap-6 text-xs tracking-wider text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              / INDEX
            </Link>
            <Link href="/projects" className="hover:text-white transition-colors">
              / PROJECTS
            </Link>
            <Link href="/methodology" className="hover:text-white transition-colors">
              / METHOD
            </Link>
            <Link href="/logs" className="hover:text-white transition-colors">
              / LOGS
            </Link>
            <Link
              href="/dashboard"
              className="terminal-text text-xs tracking-wider border px-3 py-1 hover:opacity-80 transition-opacity"
              style={{ borderColor: "var(--color-terminal-green)" }}
            >
              ENTER OS →
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 xl:px-24 w-full">
          {children}
        </div>
      </main>
      <footer
        style={{ borderTop: "1px solid var(--color-border)" }}
        className="py-4 text-xs tracking-widest text-center text-zinc-600"
      >
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 xl:px-24 w-full">
          LEOLOGIC © {new Date().getFullYear()} — SYSTEM ONLINE
        </div>
      </footer>
    </div>
  );
}
