import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import { getCategories } from "@/lib/supabase/queries";

export default async function CategoriasPage() {
  const categories = await getCategories();
  const main = categories.filter((c) => c.id !== "etc");
  const etc = categories.find((c) => c.id === "etc");

  return (
    <>
      <TopBar />
      <main className="max-w-screen-md mx-auto pb-28">
        <section className="px-4 pt-6">
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[24px] font-bold text-[var(--color-deep-charcoal)]">Categorías</h2>
            <p className="text-[14px] text-[var(--color-on-surface-variant)]">
              Encontrá todo lo que necesitás para tu hogar.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Baño — span completo */}
            <Link
              href="/categorias/bano"
              className="col-span-2 relative h-48 rounded-xl overflow-hidden shadow-sm group active:scale-95 transition-transform"
            >
              <div className="w-full h-full bg-[var(--color-primary-container)] flex items-end">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-charcoal)]/80 to-transparent flex flex-col justify-end p-4">
                  <span
                    className="material-symbols-outlined text-white mb-2 text-[32px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bathtub
                  </span>
                  <h3 className="text-[20px] font-bold text-white" style={{ fontFamily: "var(--font-headline)" }}>
                    Baño
                  </h3>
                  <p className="text-[12px] text-white/80">Higiene y accesorios</p>
                </div>
              </div>
            </Link>

            {main.slice(1).map((cat) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                className="relative h-40 rounded-xl overflow-hidden shadow-sm group active:scale-95 transition-transform"
              >
                <div className="w-full h-full bg-[var(--color-surface-container-high)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-charcoal)]/80 to-transparent flex flex-col justify-end p-4">
                  <span
                    className="material-symbols-outlined text-white mb-1 text-[24px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {cat.icon}
                  </span>
                  <h3 className="text-[14px] font-bold text-white">{cat.name}</h3>
                </div>
              </Link>
            ))}

            {etc && (
              <Link
                href="/categorias/etc"
                className="col-span-2 relative h-24 rounded-xl overflow-hidden shadow-sm active:scale-95 transition-transform"
              >
                <div className="absolute inset-0 bg-[var(--color-surface-container-high)] border border-[var(--color-outline-variant)] flex items-center p-4 gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-fresh-green)]/10 flex items-center justify-center text-[var(--color-fresh-green)] flex-shrink-0">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-[var(--color-deep-charcoal)]" style={{ fontFamily: "var(--font-headline)" }}>
                      Etc
                    </h3>
                    <p className="text-[12px] text-[var(--color-on-surface-variant)]">
                      Lámparas y termos
                    </p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-[var(--color-outline)]">chevron_right</span>
                </div>
              </Link>
            )}
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
