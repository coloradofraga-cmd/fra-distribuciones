export type DbCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  image: string | null;
  col_span: string | null;
};

export type DbProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  unit: string;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  in_stock: boolean;
  is_featured: boolean;
  image: string;
  rating: number | null;
  reviews: number | null;
};

export function formatPrice(price: number) {
  return `$${price.toLocaleString("es-AR")}`;
}
