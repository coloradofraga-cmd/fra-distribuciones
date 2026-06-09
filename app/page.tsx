import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/products/ProductCard";
import SearchBar from "@/components/SearchBar";
import { getCategories, getFeaturedProducts, getProductsByIds } from "@/lib/supabase/queries";
import { formatPrice } from "@/lib/supabase/types";

const TOP_IDS = ["6", "22", "58"];

export default async function Home() {
  const [categories, featured, topProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getProductsByIds(TOP_IDS),
  ]);

  const navCats = categories.filter((c) => c.id !== "etc");
  const orderedTop = TOP_IDS.map((id) => topProducts.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
      <TopBar />
      <main className="flex flex-col gap-8 py-4 pb-28">

        {/* Search bar */}
        <section className="px-4 fade-up">
          <SearchBar />
        </section>

        {/* Hero banner */}
        <section className="px-4 fade-up fade-up-delay-1">
          <div className="relative w-full h-52 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,54,46,0.25)]"
            style={{ background: "linear-gradient(135deg, #00362e 0%, #004f44 50%, #00A86B 100%)" }}>
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -right-4 bottom-0 w-32 h-32 rounded-full bg-[var(--color-fresh-green)]/20" />
            <div className="absolute right-8 top-6 w-16 h-16 rounded-full bg-white/10" />
            <div className="absolute inset-0 flex flex-col justify-center px-6">
              <span className="bg-[var(--color-fresh-green)] text-white text-[11px] font-bold px-3 py-1 rounded-full w-fit mb-3 tracking-wide">
                OFERTA DE LA SEMANA
              </span>
              <h2 className="text-[28px] font-extrabold leading-tight mb-1 text-white tracking-tight">
                Higiene Total<br />para tu Hogar
              </h2>
              <p className="text-[14px] text-white/80 mb-4 font-medium">Hasta 30% OFF en desinfectantes</p>
              <Link
                href="/categorias"
                className="bg-white text-[var(--color-primary)] font-bold py-2.5 px-6 rounded-full w-fit text-[13px] shadow-lg active:scale-95 transition-transform"
              >
                Comprar ahora
              </Link>
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="flex flex-col gap-3 fade-up fade-up-delay-2">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-[17px] font-bold text-[var(--color-deep-charcoal)] tracking-tight">Categorías</h3>
            <Link href="/categorias" className="text-[var(--color-fresh-green)] font-semibold text-[13px]">
              Ver todas
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 hide-scrollbar py-1">
            {navCats.map((cat) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                className="flex flex-col items-center gap-2 flex-shrink-0 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-container-high)] flex items-center justify-center shadow-sm group-hover:bg-[var(--color-primary-fixed)] transition-colors duration-200">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-[26px]">{cat.icon}</span>
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-on-surface-variant)]">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Top ventas */}
        <section className="flex flex-col gap-3 fade-up fade-up-delay-3">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-[17px] font-bold text-[var(--color-deep-charcoal)] tracking-tight">Los más vendidos</h3>
            <span className="material-symbols-outlined text-[var(--color-fresh-green)] text-[20px]">trending_up</span>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 hide-scrollbar pb-1">
            {orderedTop.map((product, i) => (
              <ProductCard key={product!.id} product={product!} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* Ofertas especiales */}
        <section className="px-4 flex flex-col gap-3 fade-up fade-up-delay-4">
          <h3 className="text-[17px] font-bold text-[var(--color-deep-charcoal)] tracking-tight">Ofertas Especiales</h3>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="col-span-1 row-span-2 rounded-3xl p-5 flex flex-col justify-between overflow-hidden relative shadow-[0_4px_24px_rgba(0,79,68,0.2)]"
              style={{ background: "linear-gradient(160deg, #004f44 0%, #00362e 100%)", minHeight: 200 }}
            >
              <div className="z-10 relative">
                <span className="text-[11px] font-bold bg-white/20 text-white px-2.5 py-1 rounded-full">PACK AHORRO</span>
                <h4 className="text-[22px] font-extrabold mt-3 leading-tight text-white tracking-tight">
                  Combo<br />Lavandería
                </h4>
                <p className="text-[12px] mt-1 text-white/70 font-medium">4 productos esenciales</p>
              </div>
              <div className="z-10 relative">
                <span className="text-[20px] font-extrabold text-white">$89.000</span>
                <span className="text-[12px] line-through block text-white/50 font-medium">$120.000</span>
              </div>
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[var(--color-fresh-green)]/30 rounded-full blur-xl" />
              <div className="absolute -right-2 top-4 w-16 h-16 bg-white/5 rounded-full" />
            </div>
            <div className="rounded-3xl p-4 flex items-center justify-between bg-[var(--color-secondary-container)] shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-[var(--color-secondary)] tracking-wide">FLASH SALE</span>
                <h4 className="text-[15px] font-bold text-[var(--color-deep-charcoal)] mt-0.5">Esponjas x10</h4>
                <p className="text-[17px] font-extrabold text-[var(--color-primary)] mt-0.5">$5.500</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-[22px]">bolt</span>
              </div>
            </div>
            <div className="rounded-3xl p-4 flex items-center justify-between bg-[var(--color-surface-container-high)] shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-[var(--color-fresh-green)] tracking-wide">NUEVO</span>
                <h4 className="text-[15px] font-bold text-[var(--color-deep-charcoal)] mt-0.5">Aromatizante</h4>
                <p className="text-[17px] font-extrabold text-[var(--color-tertiary)] mt-0.5">$15.200</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--color-fresh-green)]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[var(--color-fresh-green)] text-[22px]">eco</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recomendados */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-[17px] font-bold text-[var(--color-deep-charcoal)] tracking-tight">Recomendado para el hogar</h3>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 hide-scrollbar pb-2">
            {featured.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.slug}`}
                className="w-68 flex-shrink-0 bg-white rounded-3xl shadow-[0_4px_20px_rgba(39,50,57,0.07)] flex flex-col overflow-hidden border border-[var(--color-surface-variant)]/40 card-lift"
                style={{ minWidth: 260 }}
              >
                <div className="h-36 rounded-t-3xl overflow-hidden bg-[var(--color-surface-container)] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[64px] text-[var(--color-outline-variant)]/60">inventory_2</span>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="material-symbols-outlined text-[13px] text-[var(--color-fresh-green)]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-[12px] font-semibold text-[var(--color-on-surface-variant)]">
                        {product.rating} · {product.reviews} reseñas
                      </span>
                    </div>
                  )}
                  <h4 className="text-[15px] font-bold text-[var(--color-on-surface)] leading-tight">{product.name}</h4>
                  <p className="text-[12px] text-[var(--color-outline)] line-clamp-2 mt-0.5 leading-relaxed">{product.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[18px] font-extrabold text-[var(--color-primary)]">{formatPrice(product.price)}</span>
                    <span className="bg-[var(--color-fresh-green)] text-white px-4 py-1.5 rounded-full font-semibold text-[12px]">
                      Ver detalle
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <BottomNav />
    </>
  );
}
