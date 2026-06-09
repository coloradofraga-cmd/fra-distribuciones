import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) redirect("/");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-container-lowest)]">
      <header className="h-14 bg-[var(--color-primary)] flex items-center px-4 gap-4 sticky top-0 z-40">
        <Link href="/" className="text-white/70 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <span className="text-white font-bold text-[18px]" style={{ fontFamily: "var(--font-headline)" }}>
          Admin — FRA
        </span>
      </header>

      <nav className="flex overflow-x-auto gap-1 px-4 py-2 bg-white border-b border-[var(--color-surface-variant)] hide-scrollbar">
        {[
          { href: "/admin", label: "Dashboard", icon: "dashboard" },
          { href: "/admin/productos", label: "Productos", icon: "inventory_2" },
          { href: "/admin/pedidos", label: "Pedidos", icon: "receipt_long" },
        ].map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)] transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
