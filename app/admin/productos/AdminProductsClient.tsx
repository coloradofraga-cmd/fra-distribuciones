"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DbProduct } from "@/lib/supabase/types";

type EditingProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  in_stock: boolean;
};

export default function AdminProductsClient({ initialProducts }: { initialProducts: DbProduct[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EditingProduct | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  function startEdit(p: DbProduct) {
    setEditing({ id: p.id, name: p.name, brand: p.brand, price: p.price, in_stock: p.in_stock });
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("products")
      .update({ name: editing.name, brand: editing.brand, price: editing.price, in_stock: editing.in_stock })
      .eq("id", editing.id);
    if (!error) {
      setProducts((prev) => prev.map((p) => p.id === editing.id ? { ...p, ...editing } : p));
      setEditing(null);
    }
    setSaving(false);
  }

  async function toggleStock(id: string, current: boolean) {
    const supabase = createClient();
    await supabase.from("products").update({ in_stock: !current }).eq("id", id);
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, in_stock: !current } : p));
  }

  async function deleteProduct(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    setDeleting(id);
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-[var(--color-deep-charcoal)]">Productos</h1>
        <span className="text-[13px] text-[var(--color-on-surface-variant)]">{filtered.length} productos</span>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar producto..."
        className="h-11 px-4 rounded-xl border border-[var(--color-outline-variant)] bg-white text-[14px] outline-none focus:border-[var(--color-primary)] transition-colors"
      />

      <div className="flex flex-col gap-2">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-[var(--color-surface-variant)] shadow-sm p-4">
            {editing?.id === p.id ? (
              <div className="flex flex-col gap-3">
                <input
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="h-10 px-3 rounded-lg border border-[var(--color-outline-variant)] text-[14px] outline-none focus:border-[var(--color-primary)]"
                />
                <div className="flex gap-2">
                  <input
                    value={editing.brand}
                    onChange={(e) => setEditing({ ...editing, brand: e.target.value })}
                    placeholder="Marca"
                    className="h-10 px-3 rounded-lg border border-[var(--color-outline-variant)] text-[14px] outline-none focus:border-[var(--color-primary)] flex-1"
                  />
                  <input
                    type="number"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="h-10 px-3 rounded-lg border border-[var(--color-outline-variant)] text-[14px] outline-none focus:border-[var(--color-primary)] w-28"
                  />
                </div>
                <label className="flex items-center gap-2 text-[13px] font-medium">
                  <input
                    type="checkbox"
                    checked={editing.in_stock}
                    onChange={(e) => setEditing({ ...editing, in_stock: e.target.checked })}
                  />
                  En stock
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    disabled={saving}
                    className="flex-1 h-9 rounded-lg bg-[var(--color-primary)] text-white font-semibold text-[13px] disabled:opacity-60"
                  >
                    {saving ? "Guardando..." : "Guardar"}
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="flex-1 h-9 rounded-lg border border-[var(--color-outline-variant)] text-[13px] font-semibold"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[var(--color-deep-charcoal)] truncate">{p.name}</p>
                  <p className="text-[12px] text-[var(--color-outline)]">{p.brand} · {p.unit}</p>
                  <p className="text-[13px] font-bold text-[var(--color-primary)] mt-0.5">
                    ${p.price.toLocaleString("es-AR")}
                  </p>
                </div>
                <button
                  onClick={() => toggleStock(p.id, p.in_stock)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
                    p.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}
                >
                  {p.in_stock ? "Stock" : "Sin stock"}
                </button>
                <button onClick={() => startEdit(p)} className="text-[var(--color-primary)] active:scale-90 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  disabled={deleting === p.id}
                  className="text-[var(--color-error-red)] active:scale-90 transition-transform disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
