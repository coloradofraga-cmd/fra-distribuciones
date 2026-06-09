import { ProductSkeletonGrid } from "@/components/ui/ProductSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";

export default function BuscarLoading() {
  return (
    <>
      <TopBar />
      <main className="flex flex-col gap-4 py-4 pb-28">
        <div className="px-4">
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
        <div className="px-4 flex gap-2 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>
        <ProductSkeletonGrid count={6} />
      </main>
      <BottomNav />
    </>
  );
}
