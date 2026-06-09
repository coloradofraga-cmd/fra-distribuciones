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
