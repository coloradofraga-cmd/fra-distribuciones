"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email o contraseña incorrectos.");
      toast.error("Email o contraseña incorrectos");
      setLoading(false);
    } else {
      toast.success("¡Bienvenido de vuelta!");
      router.push("/perfil");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--color-surface)]">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-1 mb-2">
          <span className="text-[32px] font-extrabold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-headline)" }}>
            FRA
          </span>
          <h1 className="text-[22px] font-bold text-[var(--color-deep-charcoal)]">Iniciá sesión</h1>
          <p className="text-[14px] text-[var(--color-on-surface-variant)]">Accedé a tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[var(--color-deep-charcoal)]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="h-12 px-4 rounded-xl border border-[var(--color-outline-variant)] bg-white text-[15px] outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-semibold text-[var(--color-deep-charcoal)]">Contraseña</label>
              <Link href="/recuperar-contrasena" className="text-[12px] text-[var(--color-primary)] font-semibold">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="h-12 px-4 rounded-xl border border-[var(--color-outline-variant)] bg-white text-[15px] outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {error && (
            <p className="text-[13px] text-[var(--color-error-red)] font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-14 rounded-xl bg-[var(--color-primary)] text-white font-bold text-[16px] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-[14px] text-[var(--color-on-surface-variant)]">
          ¿No tenés cuenta?{" "}
          <Link href="/registro" className="text-[var(--color-primary)] font-semibold">
            Registrate
          </Link>
        </p>
      </div>
    </main>
  );
}
