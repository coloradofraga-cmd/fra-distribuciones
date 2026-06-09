import Link from "next/link";
import CartCount from "./CartCount";

export default function TopBar() {
  return (
    <header className="flex justify-between items-center w-full px-[var(--spacing-margin-mobile)] h-16 sticky top-0 z-40 bg-[var(--color-surface)] shadow-sm">
      <div className="flex items-center gap-[var(--spacing-stack-md)]">
        <button className="text-[var(--color-primary)] active:scale-95 transition-transform">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <Link href="/" className="font-bold text-[20px] text-[var(--color-primary)] leading-tight" style={{ fontFamily: "var(--font-headline)" }}>
          FRA Distribuciones
        </Link>
      </div>
      <div className="flex items-center gap-[var(--spacing-stack-md)]">
        <Link href="/buscar" className="text-[var(--color-primary)] active:scale-95 transition-transform">
          <span className="material-symbols-outlined">search</span>
        </Link>
        <CartCount />
      </div>
    </header>
  );
}
