"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/client";
import BottomNav from "@/components/layout/BottomNav";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    router.replace("/carrito");
    return null;
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id ?? null,
        status: "pending",
        total: totalPrice(),
      })
      .select()
      .single();

    if (orderError || !order) {
      setError("Error al crear el pedido. Intentá de nuevo.");
      setLoading(false);
      return;
    }

    const orderItems = items.map((i) => ({
      order_id: order.id,
      product_id: i.product.id,
      quantity: i.quantity,
      unit_price: i.product.price,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      setError("Error al guardar los productos. Intentá de nuevo.");
      setLoading(false);
      return;
    }

    // fire-and-forget — email failure doesn't block order confirmation
    fetch("/api/send-order-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order.id,
        orderIdShort: order.id.slice(0, 8),
        total: totalPrice(),
        name,
        address,
        phone,
        userEmail: user?.email ?? "",
        items: items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          unit_price: i.product.price,
        })),
      }),
    });

    clearCart();
    router.push(`/checkout/confirmacion?order=${order.id}`);
  }

  return (
    <>
      <header className="flex items-center gap-3 w-full px-4 h-16 sticky top-0 z-40 bg-[var(--color-surface)] shadow-sm">
        <Link href="/carrito" className="active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-[var(--color-primary)]">arrow_back</span>
        </Link>
        <span className="font-bold text-[20px] text-[var(--color-primary)]" style={{ fontFamily: "var(--font-headline)" }}>
          Checkout
        </span>
      </header>

      <main className="pb-32 px-4 pt-4 max-w-screen-sm mx-auto flex flex-col gap-6">

        {/* Resumen */}
        <section className="bg-white rounded-2xl border border-[var(--color-surface-variant)] shadow-sm p-4 flex flex-col gap-3">
          <h2 className="text-[15px] font-bold text-[var(--color-deep-charcoal)]">Resumen del pedido</h2>
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex justify-between items-center text-[14px]">
              <span className="text-[var(--color-on-surface-variant)] line-clamp-1 flex-1 mr-2">
                {product.name} × {quantity}
              </span>
              <span className="font-semibold text-[var(--color-deep-charcoal)] flex-shrink-0">
                {formatPrice(product.price * quantity)}
              </span>
            </div>
          ))}
          <div className="border-t border-[var(--color-surface-variant)] pt-3 flex justify-between">
            <span className="font-bold text-[15px]">Total</span>
            <span className="font-extrabold text-[17px] text-[var(--color-primary)]">{formatPrice(totalPrice())}</span>
          </div>
        </section>

        {/* Datos de envío */}
        <form onSubmit={handleConfirm} className="flex flex-col gap-4">
          <h2 className="text-[15px] font-bold text-[var(--color-deep-charcoal)]">Datos de entrega</h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[var(--color-deep-charcoal)]">Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Tu nombre"
              className="h-12 px-4 rounded-xl border border-[var(--color-outline-variant)] bg-white text-[15px] outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[var(--color-deep-charcoal)]">Dirección</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Calle, número, localidad"
              className="h-12 px-4 rounded-xl border border-[var(--color-outline-variant)] bg-white text-[15px] outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[var(--color-deep-charcoal)]">Teléfono</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="11 1234-5678"
              className="h-12 px-4 rounded-xl border border-[var(--color-outline-variant)] bg-white text-[15px] outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {error && <p className="text-[13px] text-[var(--color-error-red)] font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-xl bg-[var(--color-fresh-green)] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-fresh-green)]/20 active:scale-[0.98] transition-all disabled:opacity-60"
          >
            <span className="material-symbols-outlined">check_circle</span>
            {loading ? "Confirmando..." : "Confirmar pedido"}
          </button>
        </form>
      </main>
      <BottomNav />
    </>
  );
}
