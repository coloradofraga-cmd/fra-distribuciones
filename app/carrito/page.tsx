"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/supabase/types";
import BottomNav from "@/components/layout/BottomNav";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <>
      <header className="flex items-center justify-between w-full px-4 h-16 sticky top-0 z-40 bg-[var(--color-surface)] shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[var(--color-primary)]">arrow_back</span>
          </Link>
          <span className="font-bold text-[20px] text-[var(--color-primary)]" style={{ fontFamily: "var(--font-headline)" }}>
            Mi Carrito
          </span>
        </div>
        {items.length > 0 && (
          <span className="text-[13px] text-[var(--color-on-surface-variant)]">
            {items.length} {items.length === 1 ? "producto" : "productos"}
          </span>
        )}
      </header>

      <main className="pb-48 px-4 pt-4 max-w-screen-sm mx-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <span className="material-symbols-outlined text-[80px] text-[var(--color-outline-variant)]">shopping_cart</span>
            <h2 className="text-[20px] font-bold text-[var(--color-deep-charcoal)]">Tu carrito está vacío</h2>
            <p className="text-[14px] text-[var(--color-on-surface-variant)]">Explorá nuestros productos</p>
            <Link
              href="/categorias"
              className="mt-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold text-[15px]"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-[var(--color-surface-variant)] p-4 flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-[var(--color-surface-container)] flex items-center justify-center flex-shrink-0">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <span className="material-symbols-outlined text-[36px] text-[var(--color-outline-variant)]">inventory_2</span>
                  )}
                </div>

                <div className="flex flex-col flex-1 gap-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-[14px] font-bold text-[var(--color-deep-charcoal)] leading-tight line-clamp-2">
                      {product.name}
                      <span className="font-normal text-[var(--color-outline)]"> · {product.unit}</span>
                    </h4>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-[var(--color-outline)] active:scale-90 transition-transform flex-shrink-0"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>

                  <span className="text-[13px] text-[var(--color-outline)]">{product.brand}</span>

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[16px] font-bold text-[var(--color-primary)]">
                      {formatPrice(product.price * quantity)}
                    </span>
                    <div className="flex items-center bg-[var(--color-surface-container-high)] rounded-full px-1">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[var(--color-primary)] active:scale-90 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="w-8 text-center font-bold text-[14px]">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[var(--color-primary)] active:scale-90 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {items.length > 0 && (
        <div className="fixed bottom-16 left-0 w-full px-4 pb-4 bg-[var(--color-surface)] border-t border-[var(--color-surface-variant)] pt-4 z-40">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[15px] font-semibold text-[var(--color-on-surface-variant)]">Total</span>
            <span className="text-[22px] font-extrabold text-[var(--color-primary)]">{formatPrice(totalPrice())}</span>
          </div>
          <Link
            href="/checkout"
            className="w-full h-14 rounded-xl bg-[var(--color-fresh-green)] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-fresh-green)]/20 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            Ir al checkout
          </Link>
        </div>
      )}

      <BottomNav />
    </>
  );
}
