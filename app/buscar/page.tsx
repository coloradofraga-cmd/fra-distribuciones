"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import AddToCartButton from "@/components/products/AddToCartButton";
import { formatPrice, type DbProduct, type DbCategory } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/client";

function BuscarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const initialQ = searchParams.get("q") ?? "";
  const initialCat = searchParams.get("cat") ?? "";

  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState(initialCat);
  const [allProducts, setAllProducts] = useState<DbProduct[]>([]);
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("categories").select("*").order("id"),
      supabase.from("products").select("*").order("name").limit(80),
    ]).then(([{ data: cats }, { data: prods }]) => {
      setCategories(cats ?? []);
      setAllProducts(prods ?? []);
      setLoading(false);
    });
  }, []);

  const results = allProducts.filter((p) => {
    const matchQ = !q.trim() || `${p.name} ${p.brand} ${p.description ?? ""}`.toLowerCase().includes(q.toLowerCase());
    const matchCat = !cat || p.category === cat;
    return matchQ && matchCat;
  });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat) params.set("cat", cat);
      router.replace(`/buscar?${params.toString()}`);
    });
  }

  function handleCat(catId: string) {
    const next = cat === catId ? "" : catId;
    setCat(next);
    startTransition(() => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (next) params.set("cat", next);
      router.replace(`/buscar?${params.toString()}`);
    });
  }

  return (
    <>
      <TopBar />
      <main className="pb-28">
        {/* Search input */}
        <section className="px-4 pt-4 pb-3 sticky top-16 z-30 bg-[var(--color-surface)]">
          <form onSubmit={handleSearch}>
            <div className="bg-white rounded-2xl flex items-center px-4 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-[var(--color-surface-variant)]/60 gap-3">
              <span className="material-symbols-outlined text-[var(--color-fresh-green)] text-[22px]">search</span>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-[15px] placeholder:text-[var(--color-outline-variant)] font-medium"
                placeholder="Buscá productos, marcas..."
                type="text"
              />
              {q && (
                <button type="button" onClick={() => { setQ(""); runSearch("", cat); }}>
                  <span className="material-symbols-outlined text-[var(--color-outline)] text-[20px]">close</span>
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Filtros categoría */}
        <section className="flex overflow-x-auto gap-2 px-4 pb-3 hide-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCat(c.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                cat === c.id
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </section>

        {/* Resultados */}
        <section className="px-4 pt-2 fade-up">
          {loading && (
            <div className="flex justify-center py-16">
              <span className="material-symbols-outlined text-[40px] text-[var(--color-outline-variant)] animate-spin">progress_activity</span>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="flex flex-col items-center py-16 gap-3 text-center">
              <span className="material-symbols-outlined text-[64px] text-[var(--color-outline-variant)]">search_off</span>
              <p className="text-[16px] font-semibold text-[var(--color-deep-charcoal)]">Sin resultados</p>
              <p className="text-[13px] text-[var(--color-on-surface-variant)]">Probá con otro término o categoría</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <p className="text-[12px] text-[var(--color-on-surface-variant)] mb-3">
                {q || cat ? `${results.length} resultado${results.length !== 1 ? "s" : ""}` : `${results.length} productos`}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {results.map((product) => {
                  const gradients = [
                    "linear-gradient(135deg,#00362e,#00A86B)",
                    "linear-gradient(135deg,#ea580c,#f97316)",
                    "linear-gradient(135deg,#0e7490,#06b6d4)",
                    "linear-gradient(135deg,#7c3aed,#a78bfa)",
                    "linear-gradient(135deg,#b91c1c,#f87171)",
                  ];
                  const bg = gradients[product.name.charCodeAt(0) % gradients.length];
                  return (
                    <Link
                      key={product.id}
                      href={`/productos/${product.slug}`}
                      className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(39,50,57,0.06)] overflow-hidden flex flex-col group"
                    >
                      <div className="aspect-square flex items-center justify-center overflow-hidden"
                        style={{ background: product.image ? undefined : bg }}>
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <span className="material-symbols-outlined text-[52px] text-white/40">water_drop</span>
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
                                {formatPrice(product.compare_at_price)}
                              </span>
                            )}
                            <span className="text-[15px] font-bold text-[var(--color-primary)]">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                          <AddToCartButton product={product} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>
      <BottomNav />
    </>
  );
}

export default function BuscarPage() {
  return (
    <Suspense>
      <BuscarContent />
    </Suspense>
  );
}
