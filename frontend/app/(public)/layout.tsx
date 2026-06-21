import type { Metadata } from "next";
import { NavBar } from "./_components/NavBar";
import { CursorGlow } from "./_components/CursorGlow";

export const metadata: Metadata = {
  title: "Public",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ position: "relative" }}>
      <CursorGlow />
      <NavBar />
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
