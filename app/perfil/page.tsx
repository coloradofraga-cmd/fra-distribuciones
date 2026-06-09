import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BottomNav from "@/components/layout/BottomNav";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, created_at")
    .eq("id", user.id)
    .single();

  const name = profile?.full_name ?? user.email?.split("@")[0] ?? "Usuario";
  const initial = name.charAt(0).toUpperCase();

  return (
    <>
      <header className="flex items-center w-full px-4 h-16 sticky top-0 z-40 bg-[var(--color-surface)] shadow-sm">
        <span className="font-bold text-[20px] text-[var(--color-primary)]" style={{ fontFamily: "var(--font-headline)" }}>
          Mi Perfil
        </span>
      </header>

      <main className="px-4 pt-6 pb-28 flex flex-col gap-6 max-w-sm mx-auto">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-[32px] font-bold">
            {initial}
          </div>
          <div className="text-center">
            <h2 className="text-[20px] font-bold text-[var(--color-deep-charcoal)]">{name}</h2>
            <p className="text-[14px] text-[var(--color-on-surface-variant)]">{user.email}</p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-surface-variant)] divide-y divide-[var(--color-surface-variant)]">
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="material-symbols-outlined text-[var(--color-primary)]">person</span>
            <div>
              <p className="text-[12px] text-[var(--color-on-surface-variant)]">Nombre</p>
              <p className="text-[15px] font-semibold text-[var(--color-deep-charcoal)]">{name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="material-symbols-outlined text-[var(--color-primary)]">mail</span>
            <div>
              <p className="text-[12px] text-[var(--color-on-surface-variant)]">Email</p>
              <p className="text-[15px] font-semibold text-[var(--color-deep-charcoal)]">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Mis pedidos */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-surface-variant)]">
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="material-symbols-outlined text-[var(--color-primary)]">receipt_long</span>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-[var(--color-deep-charcoal)]">Mis pedidos</p>
              <p className="text-[12px] text-[var(--color-on-surface-variant)]">Próximamente</p>
            </div>
            <span className="material-symbols-outlined text-[var(--color-outline)]">chevron_right</span>
          </div>
        </div>

        <LogoutButton />
      </main>
      <BottomNav />
    </>
  );
}
