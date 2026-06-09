import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: totalProducts },
    { count: totalOrders },
    { count: totalUsers },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("id, total, status, created_at").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Productos", value: totalProducts ?? 0, icon: "inventory_2", color: "var(--color-primary)" },
    { label: "Pedidos", value: totalOrders ?? 0, icon: "receipt_long", color: "var(--color-fresh-green)" },
    { label: "Usuarios", value: totalUsers ?? 0, icon: "group", color: "var(--color-secondary)" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <h1 className="text-[22px] font-bold text-[var(--color-deep-charcoal)]">Dashboard</h1>

      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--color-surface-variant)] flex flex-col gap-2">
            <span className="material-symbols-outlined text-[24px]" style={{ color }}>{icon}</span>
            <span className="text-[26px] font-extrabold text-[var(--color-deep-charcoal)]">{value}</span>
            <span className="text-[12px] text-[var(--color-on-surface-variant)] font-medium">{label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-surface-variant)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--color-surface-variant)]">
          <h2 className="text-[15px] font-bold text-[var(--color-deep-charcoal)]">Últimos pedidos</h2>
        </div>
        {recentOrders && recentOrders.length > 0 ? (
          <div className="divide-y divide-[var(--color-surface-variant)]">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-4 py-3 gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-mono text-[var(--color-outline)]">#{order.id.slice(0, 8)}</span>
                  <span className="text-[12px] text-[var(--color-on-surface-variant)]">
                    {new Date(order.created_at).toLocaleDateString("es-AR")}
                  </span>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {order.status === "pending" ? "Pendiente" : "Completado"}
                </span>
                <span className="font-bold text-[var(--color-primary)] text-[14px]">
                  ${Number(order.total).toLocaleString("es-AR")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="px-4 py-6 text-[14px] text-[var(--color-outline)] text-center">Sin pedidos aún</p>
        )}
      </div>
    </div>
  );
}
