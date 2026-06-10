import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";

export default function ConfirmacionPage() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-6 text-center pb-24">
        <div className="w-24 h-24 rounded-full bg-[var(--color-fresh-green)]/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-[56px] text-[var(--color-fresh-green)]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[26px] font-extrabold text-[var(--color-deep-charcoal)]" style={{ fontFamily: "var(--font-headline)" }}>
            ¡Pedido confirmado!
          </h1>
          <p className="text-[15px] text-[var(--color-on-surface-variant)] max-w-xs">
            Recibimos tu pedido. Nos comunicaremos pronto para coordinar la entrega.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="/"
            className="h-14 rounded-xl bg-[var(--color-primary)] text-white font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            Volver al inicio
          </Link>
          <Link
            href="/perfil/pedidos"
            className="h-14 rounded-xl border-2 border-[var(--color-outline-variant)] text-[var(--color-deep-charcoal)] font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            Ver mis pedidos
          </Link>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
