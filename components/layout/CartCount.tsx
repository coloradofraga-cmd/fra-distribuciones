"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";

export default function CartCount() {
  const total = useCartStore((s) => s.totalItems());

  return (
    <Link href="/carrito" className="relative text-[var(--color-primary)] active:scale-95 transition-transform">
      <span className="material-symbols-outlined">shopping_cart</span>
      {total > 0 && (
        <span className="absolute -top-2 -right-2 bg-[var(--color-error-red)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
          {total > 99 ? "99" : total}
        </span>
      )}
    </Link>
  );
}
