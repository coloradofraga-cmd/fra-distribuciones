import { ProductSkeletonGrid } from "@/components/ui/ProductSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";

export default function CategoriaLoading() {
  return (
    <>
      <TopBar />
      <main className="flex flex-col gap-6 py-4 pb-28">
        <div className="px-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-24 mt-1" />
        </div>
        <ProductSkeletonGrid count={6} />
      </main>
      <BottomNav />
    </>
  );
}
