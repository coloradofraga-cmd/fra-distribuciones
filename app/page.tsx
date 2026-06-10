import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/products/ProductCard";
import SearchBar from "@/components/SearchBar";
import { getCategories, getFeaturedProducts, getProductsByIds, getDiscountedProducts } from "@/lib/supabase/queries";
import { formatPrice } from "@/lib/supabase/types";

const TOP_IDS = ["6", "22", "58"];

export default async function Home() {
  const [categories, featured, topProducts, discounted] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getProductsByIds(TOP_IDS),
    getDiscountedProducts(),
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
                DISTRIBUCIÓN MAYORISTA
              </span>
              <h2 className="text-[28px] font-extrabold leading-tight mb-1 text-white tracking-tight">
                Limpieza Total<br />para tu Hogar
              </h2>
              <p className="text-[14px] text-white/80 mb-4 font-medium">Productos de higiene al mejor precio</p>
              <Link
                href="/categorias"
                className="bg-white text-[var(--color-primary)] font-bold py-2.5 px-6 rounded-full w-fit text-[13px] shadow-lg active:scale-95 transition-transform"
              >
                Ver catálogo
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

        {/* Ofertas reales */}
        {discounted.length > 0 && (
          <section className="flex flex-col gap-3 fade-up fade-up-delay-4">
            <div className="flex justify-between items-center px-4">
              <h3 className="text-[17px] font-bold text-[var(--color-deep-charcoal)] tracking-tight">En oferta</h3>
              <Link href="/buscar?oferta=1" className="text-[var(--color-fresh-green)] font-semibold text-[13px]">
                Ver todas
              </Link>
            </div>
            <div className="flex overflow-x-auto gap-3 px-4 hide-scrollbar pb-1">
              {discounted.map((product) => {
                const discount = product.compare_at_price
                  ? Math.round((1 - product.price / product.compare_at_price) * 100)
                  : 0;
                return (
                  <Link
                    key={product.id}
                    href={`/productos/${product.slug}`}
                    className="flex-shrink-0 w-40 bg-white rounded-2xl border border-[var(--color-surface-variant)] shadow-sm overflow-hidden flex flex-col active:scale-[0.98] transition-transform"
                  >
                    <div className="relative h-28 bg-[var(--color-surface-container)] flex items-center justify-center">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
                      ) : (
                        <span className="material-symbols-outlined text-[48px] text-[var(--color-outline-variant)]">inventory_2</span>
                      )}
                      <span className="absolute top-2 left-2 bg-[var(--color-error-red)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        -{discount}%
                      </span>
                    </div>
                    <div className="p-3 flex flex-col gap-0.5">
                      <span className="text-[11px] text-[var(--color-secondary)] font-semibold">{product.brand}</span>
                      <h4 className="text-[13px] font-bold text-[var(--color-deep-charcoal)] line-clamp-2 leading-tight">{product.name}</h4>
                      <div className="mt-1.5 flex flex-col">
                        <span className="text-[15px] font-extrabold text-[var(--color-primary)]">{formatPrice(product.price)}</span>
                        <span className="text-[11px] line-through text-[var(--color-outline)]">{formatPrice(product.compare_at_price!)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

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
