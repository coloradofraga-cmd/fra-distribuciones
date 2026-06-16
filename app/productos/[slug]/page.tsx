export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";
import ProductDetail from "@/components/products/ProductDetail";
import { getCategories, getProductBySlug, getRelatedProducts } from "@/lib/supabase/queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.brand}`,
    description: `Comprá ${product.name} de ${product.brand}. ${product.unit}. Entrega a domicilio.`,
    openGraph: {
      title: `${product.name} — ${product.brand}`,
      description: `Comprá ${product.name} de ${product.brand}. ${product.unit}.`,
      ...(product.image ? { images: [{ url: product.image, width: 800, height: 800 }] } : {}),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [categories, related] = await Promise.all([
    getCategories(),
    getRelatedProducts(product.category, product.id),
  ]);
  const category = categories.find((c) => c.id === product.category);

  return (
    <>
      <header className="flex justify-between items-center w-full px-4 h-16 sticky top-0 z-40 bg-[var(--color-surface)] shadow-sm">
        <div className="flex items-center gap-4">
          <Link href={category ? `/categorias/${category.slug}` : "/categorias"} className="active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[var(--color-primary)]">arrow_back</span>
          </Link>
          <span className="font-bold text-[18px] text-[var(--color-primary)]" style={{ fontFamily: "var(--font-headline)" }}>
            FRA Distribuciones
          </span>
        </div>
      </header>
      <ProductDetail product={product} related={related} category={category} />
      <BottomNav />
    </>
  );
}
