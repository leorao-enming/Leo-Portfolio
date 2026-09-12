import { NavBar } from "./_components/NavBar";
import { SiteFooter } from "./_components/SiteFooter";
import { MarginRails } from "./_components/MarginRails";

// Title and description are inherited from the root layout. Re-declaring the
// title here as a string re-applied the root's "%s — LeoLogic" template on top
// of it, rendering "LeoLogic — Leo Rao — LeoLogic".

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative public-shell" style={{ minHeight: "100dvh", background: "var(--color-bg)" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-[100000] rounded-md px-4 py-2 text-sm font-medium"
        style={{
          background: "var(--color-accent)",
          color: "var(--color-on-accent)",
        }}
      >
        Skip to content
      </a>
      <NavBar />
      <MarginRails />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
