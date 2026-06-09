"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Order = {
  id: string;
  total: number;
  status: string;
  created_at: string;
  user_id: string | null;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function AdminOrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);

  async function updateStatus(id: string, status: string) {
    const supabase = createClient();
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-[var(--color-deep-charcoal)]">Pedidos</h1>
        <span className="text-[13px] text-[var(--color-on-surface-variant)]">{orders.length} pedidos</span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center text-[var(--color-outline)] border border-[var(--color-surface-variant)]">
          <span className="material-symbols-outlined text-[48px] block mb-2">receipt_long</span>
          Sin pedidos aún
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-[var(--color-surface-variant)] shadow-sm p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-mono text-[var(--color-outline)]">#{order.id.slice(0, 8)}</p>
                <p className="text-[13px] text-[var(--color-on-surface-variant)]">
                  {new Date(order.created_at).toLocaleDateString("es-AR", {
                    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                  })}
                </p>
                <p className="text-[15px] font-bold text-[var(--color-primary)] mt-0.5">
                  ${Number(order.total).toLocaleString("es-AR")}
                </p>
              </div>

              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className={`text-[12px] font-bold px-2.5 py-1.5 rounded-full border-none outline-none cursor-pointer ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-700"}`}
              >
                {Object.entries(STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
