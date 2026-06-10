import { createClient } from "./server";
import type { DbCategory, DbProduct } from "./types";

export async function getCategories(): Promise<DbCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("id");
  return data ?? [];
}

export async function getFeaturedProducts(): Promise<DbProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true);
  return data ?? [];
}

export async function getProductsByCategory(slug: string): Promise<DbProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug)
    .order("name");
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<DbProduct | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ?? null;
}

export async function getRelatedProducts(categoryId: string, excludeId: string, limit = 3): Promise<DbProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", categoryId)
    .neq("id", excludeId)
    .limit(limit);
  return data ?? [];
}

export async function searchProducts(q: string, category?: string): Promise<DbProduct[]> {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${q}%,brand.ilike.%${q}%,description.ilike.%${q}%`)
    .order("name")
    .limit(40);
  if (category) query = query.eq("category", category);
  const { data } = await query;
  return data ?? [];
}

export async function getProductsByIds(ids: string[]): Promise<DbProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .in("id", ids);
  return data ?? [];
}

export type DbOrderWithItems = {
  id: string;
  status: string;
  total: number;
  created_at: string;
  order_items: {
    quantity: number;
    unit_price: number;
    products: { name: string; unit: string } | null;
  }[];
};

export async function getUserOrders(userId: string): Promise<DbOrderWithItems[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select("id, status, total, created_at, order_items(quantity, unit_price, products(name, unit))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data as unknown as DbOrderWithItems[]) ?? [];
}
