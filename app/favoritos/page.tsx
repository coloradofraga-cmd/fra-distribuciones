"use client";

import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/products/ProductCard";
import { useFavoritesStore } from "@/lib/store/favoritesStore";

export default function FavoritosPage() {
  const { items } = useFavoritesStore();

  return (
    <>
      <TopBar />
      <main className="flex-1 px-4 pt-4 pb-28 max-w-lg mx-auto w-full">
        <h1 className="text-[22px] font-bold text-[var(--color-deep-charcoal)] mb-4"
          style={{ fontFamily: "var(--font-headline)" }}>
          Favoritos
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 pt-16 text-center">
            <span className="material-symbols-outlined text-[64px] text-[var(--color-outline-variant)]">favorite</span>
            <p className="text-[15px] font-semibold text-[var(--color-on-surface)]">Todavía no tenés favoritos</p>
            <p className="text-[13px] text-[var(--color-outline)]">Tocá el corazón en cualquier producto para guardarlo acá.</p>
            <Link
              href="/"
              className="mt-4 h-11 px-6 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-[14px] flex items-center"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </>
  );
}
