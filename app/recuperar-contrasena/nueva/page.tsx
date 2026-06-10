"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NuevaContrasenaPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError("No pudimos actualizar la contraseña. El link puede haber expirado.");
      setLoading(false);
    } else {
      router.push("/perfil");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--color-surface)]">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[22px] font-bold text-[var(--color-deep-charcoal)]">Nueva contraseña</h1>
          <p className="text-[14px] text-[var(--color-on-surface-variant)]">Elegí una contraseña nueva para tu cuenta.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[var(--color-deep-charcoal)]">Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="h-12 px-4 rounded-xl border border-[var(--color-outline-variant)] bg-white text-[15px] outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[var(--color-deep-charcoal)]">Confirmar contraseña</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder="••••••••"
              className="h-12 px-4 rounded-xl border border-[var(--color-outline-variant)] bg-white text-[15px] outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {error && <p className="text-[13px] text-[var(--color-error-red)] font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="h-14 rounded-xl bg-[var(--color-primary)] text-white font-bold text-[16px] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Guardar contraseña"}
          </button>
        </form>
      </div>
    </main>
  );
}
