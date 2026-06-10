"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset`,
    });
    if (error) {
      setError("No pudimos enviar el email. Verificá la dirección.");
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--color-surface)]">
      <div className="w-full max-w-sm flex flex-col gap-6">

        <Link href="/login" className="flex items-center gap-1 text-[var(--color-primary)] text-[14px] font-semibold self-start">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Volver al login
        </Link>

        {sent ? (
          <div className="flex flex-col items-center gap-4 text-center py-8">
            <div className="w-20 h-20 rounded-full bg-[var(--color-fresh-green)]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-[var(--color-fresh-green)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                mark_email_read
              </span>
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-[var(--color-deep-charcoal)]">Revisá tu email</h2>
              <p className="text-[14px] text-[var(--color-on-surface-variant)] mt-1 max-w-xs">
                Te enviamos un link a <strong>{email}</strong> para restablecer tu contraseña.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="text-[22px] font-bold text-[var(--color-deep-charcoal)]">Recuperar contraseña</h1>
              <p className="text-[14px] text-[var(--color-on-surface-variant)]">
                Ingresá tu email y te enviamos un link para crear una nueva contraseña.
              </p>
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

              {error && <p className="text-[13px] text-[var(--color-error-red)] font-medium">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="h-14 rounded-xl bg-[var(--color-primary)] text-white font-bold text-[16px] active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar link"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
