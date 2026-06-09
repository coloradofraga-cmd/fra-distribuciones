import { createClient } from "@/lib/supabase/server";
import AdminOrdersClient from "./AdminOrdersClient";

export default async function AdminPedidosPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, total, status, created_at, user_id")
    .order("created_at", { ascending: false });

  return <AdminOrdersClient initialOrders={orders ?? []} />;
}
