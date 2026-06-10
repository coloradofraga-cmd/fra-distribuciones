import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import { getCategories } from "@/lib/supabase/queries";

const CAT_GRADIENTS: Record<string, string> = {
  bano:           "linear-gradient(135deg, #0e7490 0%, #164e63 100%)",
  cocina:         "linear-gradient(135deg, #b45309 0%, #78350f 100%)",
  limpieza:       "linear-gradient(135deg, #15803d 0%, #14532d 100%)",
  lavanderia:     "linear-gradient(135deg, #4338ca 0%, #1e1b4b 100%)",
  desinfectantes: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
  pisos:          "linear-gradient(135deg, #be185d 0%, #831843 100%)",
  jardín:         "linear-gradient(135deg, #65a30d 0%, #3f6212 100%)",
  etc:            "linear-gradient(135deg, #475569 0%, #1e293b 100%)",
};

const CAT_PATTERN: Record<string, string> = {
  bano:           "🚿",
  cocina:         "🍽️",
  limpieza:       "🧹",
  lavanderia:     "👕",
  desinfectantes: "🧴",
  pisos:          "✨",
  jardín:         "🌿",
  etc:            "📦",
};

function catGradient(slug: string) {
  return CAT_GRADIENTS[slug] ?? "linear-gradient(135deg, #00362e 0%, #004f44 100%)";
}

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
            {/* Primera categoría — span completo */}
            {main[0] && (
              <Link
                href={`/categorias/${main[0].slug}`}
                className="col-span-2 relative h-48 rounded-2xl overflow-hidden shadow-md group"
                style={{ background: catGradient(main[0].slug) }}
              >
                {/* Círculos decorativos */}
                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -right-2 bottom-4 w-20 h-20 rounded-full bg-white/5" />
                {/* Emoji decorativo grande */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[72px] opacity-20 select-none">
                  {CAT_PATTERN[main[0].slug] ?? "🧴"}
                </div>
                {/* Overlay en active */}
                <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors duration-150" />
                {/* Contenido */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 group-active:translate-y-0.5 transition-transform duration-150">
                  <span
                    className="material-symbols-outlined text-white mb-2 text-[32px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {main[0].icon}
                  </span>
                  <h3 className="text-[22px] font-bold text-white" style={{ fontFamily: "var(--font-headline)" }}>
                    {main[0].name}
                  </h3>
                  {main[0].description && (
                    <p className="text-[13px] text-white/75 mt-0.5">{main[0].description}</p>
                  )}
                </div>
              </Link>
            )}

            {main.slice(1).map((cat) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                className="relative h-44 rounded-2xl overflow-hidden shadow-md group"
                style={{ background: catGradient(cat.slug) }}
              >
                <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
                <div className="absolute right-2 bottom-2 w-12 h-12 rounded-full bg-white/5" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[56px] opacity-20 select-none">
                  {CAT_PATTERN[cat.slug] ?? "🧴"}
                </div>
                <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors duration-150" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 group-active:translate-y-0.5 transition-transform duration-150">
                  <span
                    className="material-symbols-outlined text-white mb-1 text-[26px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {cat.icon}
                  </span>
                  <h3 className="text-[15px] font-bold text-white">{cat.name}</h3>
                  {cat.description && (
                    <p className="text-[11px] text-white/70 mt-0.5 line-clamp-1">{cat.description}</p>
                  )}
                </div>
              </Link>
            ))}

            {etc && (
              <Link
                href="/categorias/etc"
                className="col-span-2 relative h-24 rounded-2xl overflow-hidden shadow-sm group"
                style={{ background: catGradient("etc") }}
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors duration-150" />
                <div className="absolute inset-0 flex items-center px-5 gap-4 group-active:translate-y-0.5 transition-transform duration-150">
                  <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-[22px]">more_horiz</span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white" style={{ fontFamily: "var(--font-headline)" }}>
                      {etc.name}
                    </h3>
                    {etc.description && (
                      <p className="text-[12px] text-white/70">{etc.description}</p>
                    )}
                  </div>
                  <span className="material-symbols-outlined ml-auto text-white/60">chevron_right</span>
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
