import Link from "next/link";
import { cookies } from "next/headers";

const NAV_ITEMS = [
  { label: "OVERVIEW", href: "/dashboard" },
  { label: "QUANT ENGINE", href: "/dashboard/quant" },
  { label: "BIO-METRICS", href: "/dashboard/biometrics" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const user = cookieStore.get("auth-token")?.value ?? "OPERATOR";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface-0)" }}>
      {/* Top bar */}
      <header
        style={{
          backgroundColor: "var(--color-surface-1)",
          borderBottom: "1px solid var(--color-border)",
        }}
        className="px-6 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="terminal-text font-bold text-sm tracking-widest hover:opacity-80 transition-opacity">
            LEOLOGIC
          </Link>
          <span className="text-xs text-zinc-700">/</span>
          <span className="text-xs tracking-widest terminal-amber">COMMAND CENTER</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="status-dot status-dot-online" />
            <span className="text-xs tracking-widest text-zinc-400">
              SYS ONLINE
            </span>
          </div>
          <span className="text-xs tracking-widest text-zinc-400">
            UID:{user.slice(0, 8).toUpperCase()}
          </span>
          <Link
            href="/login"
            className="text-xs tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            LOGOUT →
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className="w-64 shrink-0 py-6 flex flex-col gap-1 border-r border-gray-800"
          style={{
            backgroundColor: "var(--color-surface-1)",
          }}
        >
          <p className="px-5 text-xs tracking-[0.3em] mb-4 text-secondary">
            SUBSYSTEMS
          </p>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mx-3 px-3 py-2 text-xs tracking-wider rounded-sm transition-colors text-zinc-300 hover:text-white hover:bg-zinc-900"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-auto px-5 pt-6">
            <div
              className="text-xs leading-relaxed dim-label"
              style={{ borderTop: "1px solid #1f1f23", paddingTop: "12px" }}
            >
              <p className="mb-1">LEOLOGIC OS</p>
              <p>v0.1.0-alpha</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
