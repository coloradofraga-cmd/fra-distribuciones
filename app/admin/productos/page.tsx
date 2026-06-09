import { createClient } from "@/lib/supabase/server";
import AdminProductsClient from "./AdminProductsClient";

export default async function AdminProductosPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("category")
    .order("name");

  return <AdminProductsClient initialProducts={products ?? []} />;
}
