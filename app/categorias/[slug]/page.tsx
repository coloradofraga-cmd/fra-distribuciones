import { notFound } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import AddToCartButton from "@/components/products/AddToCartButton";
import { getCategories, getProductsByCategory } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <>
      <TopBar />
      <main className="pb-28">
        <div className="relative h-40 bg-[var(--color-primary-container)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-charcoal)]/70 to-transparent flex flex-col justify-end p-4">
            <Link href="/categorias" className="flex items-center gap-1 text-white/80 text-[13px] mb-2">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Categorías
            </Link>
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-white text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {category.icon}
              </span>
              <div>
                <h1 className="text-[24px] font-bold text-white" style={{ fontFamily: "var(--font-headline)" }}>
                  {category.name}
                </h1>
                <p className="text-[12px] text-white/80">{products.length} productos</p>
              </div>
            </div>
          </div>
        </div>

        <section className="px-4 pt-4">
          {products.length === 0 ? (
            <div className="text-center py-16 text-[var(--color-outline)]">
              <span className="material-symbols-outlined text-[64px] block mb-4">inventory_2</span>
              <p className="text-[16px]">Sin productos en esta categoría aún.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/productos/${product.slug}`}
                  className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(39,50,57,0.06)] overflow-hidden flex flex-col group"
                >
                  <div className="aspect-square bg-[var(--color-surface-gray)] flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <span className="material-symbols-outlined text-[48px] text-[var(--color-outline-variant)]">inventory_2</span>
                    )}
                  </div>
                  <div className="p-3 flex flex-col flex-grow">
                    <span className="text-[10px] text-[var(--color-outline)] uppercase font-bold">{product.brand}</span>
                    <h4 className="text-[13px] font-bold text-[var(--color-on-surface)] leading-tight mt-1 mb-2 line-clamp-2">
                      {product.name}
                      <span className="font-normal text-[var(--color-outline)]"> · {product.unit}</span>
                    </h4>
                    <div className="mt-auto flex justify-between items-center">
                      <div>
                        {product.compare_at_price && (
                          <span className="text-[11px] line-through text-[var(--color-outline)] block">
                            ${product.compare_at_price.toLocaleString("es-AR")}
                          </span>
                        )}
                        <span className="text-[15px] font-bold text-[var(--color-primary)]">
                          ${product.price.toLocaleString("es-AR")}
                        </span>
                      </div>
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <BottomNav />
    </>
  );
}
