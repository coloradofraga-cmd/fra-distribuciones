"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/buscar?q=${encodeURIComponent(q.trim())}`);
    else router.push("/buscar");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-2xl flex items-center px-4 py-3.5 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-[var(--color-surface-variant)]/60">
        <span className="material-symbols-outlined text-[var(--color-fresh-green)] mr-3 text-[22px]">search</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="bg-transparent border-none outline-none w-full text-[15px] placeholder:text-[var(--color-outline-variant)] font-medium"
          placeholder="¿Qué producto de limpieza buscás?"
          type="text"
        />
        <button type="submit">
          <span className="material-symbols-outlined text-[var(--color-outline)] text-[20px]">arrow_forward</span>
        </button>
      </div>
    </form>
  );
}
