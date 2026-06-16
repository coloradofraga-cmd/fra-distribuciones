import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DbProduct } from "@/lib/supabase/types";

type FavoritesStore = {
  items: DbProduct[];
  toggle: (product: DbProduct) => void;
  isFavorite: (productId: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        set({
          items: exists
            ? get().items.filter((p) => p.id !== product.id)
            : [...get().items, product],
        });
      },

      isFavorite: (productId) => get().items.some((p) => p.id === productId),
    }),
    { name: "fra-favorites" }
  )
);
