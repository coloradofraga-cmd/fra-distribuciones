"use client";

import Link from "next/link";
import { type DbProduct, formatPrice } from "@/lib/supabase/types";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useCartStore } from "@/lib/store/cartStore";
import { toast } from "sonner";

const PLACEHOLDERS = [
  "linear-gradient(135deg, #00362e 0%, #00A86B 100%)",
  "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
  "linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)",
  "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
  "linear-gradient(135deg, #b91c1c 0%, #f87171 100%)",
];

interface ProductCardProps {
  product: DbProduct;
  rank?: number;
}

export default function ProductCard({ product, rank }: ProductCardProps) {
  const { toggle, isFavorite } = useFavoritesStore();
  const addItem = useCartStore((s) => s.addItem);
  const fav = isFavorite(product.id);
  const gradient = PLACEHOLDERS[product.name.charCodeAt(0) % PLACEHOLDERS.length];

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="w-40 flex-shrink-0 bg-white rounded-xl shadow-[0px_4px_20px_rgba(39,50,57,0.06)] overflow-hidden flex flex-col relative group"
    >
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
        className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform shadow-sm"
        aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <span className={`material-symbols-outlined text-[18px] ${fav ? "text-[var(--color-error-red)]" : "text-[var(--color-outline-variant)]"}`}
          style={{ fontVariationSettings: fav ? "'FILL' 1" : "'FILL' 0" }}>
          favorite
        </span>
      </button>

      <div className="h-32 overflow-hidden flex items-center justify-center relative"
        style={{ background: product.image ? undefined : gradient }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <span className="material-symbols-outlined text-[52px] text-white/40">
            water_drop
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
              addItem(product);
              toast.success("Agregado al carrito", { description: product.name, duration: 2000 });
            }}
            className="bg-[var(--color-fresh-green)] text-white rounded-full w-8 h-8 flex items-center justify-center active:scale-90 transition-transform flex-shrink-0"
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
