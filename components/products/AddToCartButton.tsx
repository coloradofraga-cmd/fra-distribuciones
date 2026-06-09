"use client";

import { useCartStore } from "@/lib/store/cartStore";
import type { DbProduct } from "@/lib/supabase/types";
import { toast } from "sonner";

export default function AddToCartButton({ product }: { product: DbProduct }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        toast.success("Agregado al carrito", {
          description: product.name,
          duration: 2000,
        });
      }}
      className="bg-[var(--color-fresh-green)] text-white rounded-full w-8 h-8 flex items-center justify-center active:scale-90 transition-transform flex-shrink-0"
    >
      <span className="material-symbols-outlined text-[18px]">add</span>
    </button>
  );
}
