"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/",            icon: "home",          label: "Inicio" },
  { href: "/favoritos",   icon: "favorite",      label: "Favoritos" },
  { href: "/buscar",      icon: "search",        label: "Buscar" },
  { href: "/carrito",     icon: "shopping_cart", label: "Carrito" },
  { href: "/perfil",      icon: "person",        label: "Perfil" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-white shadow-[0px_-2px_15px_rgba(39,50,57,0.08)] border-t border-[var(--color-surface-variant)]">
      {navItems.map(({ href, icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-[2px] px-2 py-1 rounded-xl transition-all active:scale-90 ${
              active
                ? "text-[var(--color-fresh-green)]"
                : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
            >
              {icon}
            </span>
            <span className="text-[11px] font-semibold leading-none">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
