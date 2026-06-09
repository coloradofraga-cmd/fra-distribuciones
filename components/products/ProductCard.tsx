"use client";

import Link from "next/link";
import { type DbProduct, formatPrice } from "@/lib/supabase/types";

interface ProductCardProps {
  product: DbProduct;
  rank?: number;
}

export default function ProductCard({ product, rank }: ProductCardProps) {
  return (
    <Link
      href={`/productos/${product.slug}`}
      className="w-40 flex-shrink-0 bg-white rounded-xl shadow-[0px_4px_20px_rgba(39,50,57,0.06)] overflow-hidden flex flex-col relative group"
    >
      <div className="h-32 bg-[var(--color-surface-gray)] overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <span className="material-symbols-outlined text-[48px] text-[var(--color-outline-variant)]">
            inventory_2
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <span className="text-[10px] text-[var(--color-outline)] uppercase font-bold tracking-wider">
          {product.brand}
        </span>
        <h4 className="text-[13px] font-bold text-[var(--color-on-surface)] leading-tight mt-1 mb-2 h-8 line-clamp-2">
          {product.name}
          {product.unit && (
            <span className="font-normal text-[var(--color-outline)]"> {product.unit}</span>
          )}
        </h4>
        <div className="mt-auto flex justify-between items-end">
          <div className="flex flex-col">
            {product.compare_at_price && (
              <span className="text-[11px] line-through text-[var(--color-outline)]">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
            <span className="text-[14px] font-bold text-[var(--color-deep-charcoal)]">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="bg-[var(--color-fresh-green)] text-white rounded-full w-8 h-8 flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
      </div>

      {rank && (
        <div className="absolute top-2 left-2 bg-[var(--color-primary-fixed)]/60 text-[var(--color-primary)] text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
          TOP {rank}
        </div>
      )}
    </Link>
  );
}
