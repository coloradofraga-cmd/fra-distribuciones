import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserOrders } from "@/lib/supabase/queries";
import { formatPrice } from "@/lib/supabase/types";
import BottomNav from "@/components/layout/BottomNav";

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  shipped: "En camino",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

export default async function PedidosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const orders = await getUserOrders(user.id);

  return (
    <>
      <header className="flex items-center gap-3 w-full px-4 h-16 sticky top-0 z-40 bg-[var(--color-surface)] shadow-sm">
        <Link href="/perfil" className="active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-[var(--color-primary)]">arrow_back</span>
        </Link>
        <span className="font-bold text-[20px] text-[var(--color-primary)]" style={{ fontFamily: "var(--font-headline)" }}>
          Mis pedidos
        </span>
      </header>

      <main className="px-4 pt-4 pb-28 max-w-screen-sm mx-auto flex flex-col gap-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--color-surface-container)] flex items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-[var(--color-outline-variant)]">receipt_long</span>
            </div>
            <div>
              <p className="text-[17px] font-bold text-[var(--color-deep-charcoal)]">Todavía no hiciste pedidos</p>
              <p className="text-[14px] text-[var(--color-on-surface-variant)] mt-1">Explorá el catálogo y encontrá lo que necesitás.</p>
            </div>
            <Link
              href="/"
              className="mt-2 h-12 px-6 rounded-xl bg-[var(--color-primary)] text-white font-bold text-[15px] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              Ver catálogo
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            const date = new Date(order.created_at).toLocaleDateString("es-AR", {
              day: "numeric", month: "long", year: "numeric",
            });
            const statusLabel = STATUS_LABEL[order.status] ?? order.status;
            const statusColor = STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-600";
            const itemCount = order.order_items.reduce((acc, i) => acc + i.quantity, 0);

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-[var(--color-surface-variant)] shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-surface-variant)]">
                  <div>
                    <p className="text-[12px] text-[var(--color-on-surface-variant)]">Pedido</p>
                    <p className="text-[13px] font-bold text-[var(--color-deep-charcoal)] font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${statusColor}`}>
                    {statusLabel}
                  </span>
                </div>

                {/* Items */}
                <div className="px-4 py-3 flex flex-col gap-2">
                  {order.order_items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[14px]">
                      <span className="text-[var(--color-on-surface-variant)] flex-1 mr-2 line-clamp-1">
                        {item.products?.name ?? "Producto"} {item.products?.unit} × {item.quantity}
                      </span>
                      <span className="font-semibold text-[var(--color-deep-charcoal)] flex-shrink-0">
                        {formatPrice(item.unit_price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-surface-container)] border-t border-[var(--color-surface-variant)]">
                  <p className="text-[12px] text-[var(--color-on-surface-variant)]">{date} · {itemCount} {itemCount === 1 ? "producto" : "productos"}</p>
                  <p className="font-extrabold text-[16px] text-[var(--color-primary)]">{formatPrice(order.total)}</p>
                </div>
              </div>
            );
          })
        )}
      </main>
      <BottomNav />
    </>
  );
}
