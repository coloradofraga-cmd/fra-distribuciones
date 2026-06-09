"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full h-14 rounded-xl border-2 border-[var(--color-error-red)] text-[var(--color-error-red)] font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
    >
      <span className="material-symbols-outlined">logout</span>
      Cerrar sesión
    </button>
  );
}
