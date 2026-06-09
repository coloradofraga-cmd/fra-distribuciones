"use client";

import Link from "next/link";
import { useState } from "react";
import { DbProduct, DbCategory, formatPrice } from "@/lib/supabase/types";
import { useCartStore } from "@/lib/store/cartStore";

type Props = {
  product: DbProduct;
  related: DbProduct[];
  category: DbCategory | undefined;
};

export default function ProductDetail({ product, related, category }: Props) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="max-w-screen-xl mx-auto pb-32">
      <div className="flex flex-col">

        {/* Imagen */}
        <section className="relative bg-[var(--color-surface-container-lowest)] w-full aspect-square flex items-center justify-center">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
          ) : (
            <span className="material-symbols-outlined text-[120px] text-[var(--color-outline-variant)]">inventory_2</span>
          )}
          {product.in_stock && (
            <div className="absolute top-4 left-4 bg-[var(--color-fresh-green)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full text-[12px] font-semibold">
              En stock
            </div>
          )}
        </section>

        {/* Info */}
        <section className="px-4 py-6 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[var(--color-secondary)] text-[12px] font-semibold uppercase tracking-wider">
              {category?.name} · {product.brand}
            </span>
            <h2 className="text-[24px] font-bold text-[var(--color-deep-charcoal)] leading-tight">
              {product.name}
              <span className="text-[18px] font-normal text-[var(--color-outline)]"> {product.unit}</span>
            </h2>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-[var(--color-primary)]">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-[var(--color-outline)] line-through text-[14px] font-semibold">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>

          <div className="bg-[var(--color-surface-container)] p-4 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--color-primary)]">local_shipping</span>
            <p className="text-[14px] text-[var(--color-on-surface-variant)]">
              Envío gratis en compras mayores a{" "}
              <span className="font-bold text-[var(--color-primary)]">$20.000</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-bold text-[var(--color-deep-charcoal)]">Descripción</h3>
            <p className="text-[14px] text-[var(--color-on-surface-variant)] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              {product.description}
            </p>
          </div>

          <div className="mt-2 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold">Cantidad</span>
              <div className="flex items-center bg-[var(--color-surface-container-high)] rounded-full px-2 py-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[var(--color-primary)] active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="w-12 text-center font-bold text-[16px]">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[var(--color-primary)] active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[var(--color-fresh-green)] text-white h-14 rounded-xl font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-fresh-green)]/20 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: added ? "'FILL' 1" : "'FILL' 0" }}>
                {added ? "check_circle" : "shopping_cart"}
              </span>
              {added ? "¡Agregado!" : "Añadir al carrito"}
            </button>

            <button className="w-full border-2 border-[var(--color-outline-variant)] text-[var(--color-deep-charcoal)] h-14 rounded-xl font-bold text-[16px] hover:bg-[var(--color-surface-variant)] transition-colors active:scale-[0.98]">
              Comprar ahora
            </button>
          </div>
        </section>

        {/* Relacionados */}
        {related.length > 0 && (
          <section className="px-4 mt-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-bold text-[var(--color-deep-charcoal)]">Productos Relacionados</h3>
              <Link
                href={`/categorias/${product.category}`}
                className="text-[var(--color-primary)] text-[14px] font-semibold flex items-center"
              >
                Ver todos <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/productos/${p.slug}`}
                  className="min-w-[180px] bg-white rounded-xl shadow-sm overflow-hidden border border-[var(--color-outline-variant)]/30 flex flex-col"
                >
                  <div className="aspect-square bg-[var(--color-surface-gray)] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[48px] text-[var(--color-outline-variant)]">inventory_2</span>
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <span className="text-[11px] text-[var(--color-secondary)] font-semibold">{p.brand}</span>
                    <h4 className="text-[13px] font-bold text-[var(--color-deep-charcoal)] truncate">{p.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-bold text-[var(--color-primary)]">{formatPrice(p.price)}</span>
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="bg-[var(--color-fresh-green)] text-white w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
