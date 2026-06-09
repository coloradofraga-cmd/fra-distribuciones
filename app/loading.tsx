import { ProductSkeletonGrid } from "@/components/ui/ProductSkeleton";
import { CategorySkeletonRow } from "@/components/ui/CategorySkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";

export default function HomeLoading() {
  return (
    <>
      <TopBar />
      <main className="flex flex-col gap-8 py-4 pb-28">
        <div className="px-4">
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
        <div className="px-4">
          <Skeleton className="w-full h-52 rounded-3xl" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-32 mx-4" />
          <CategorySkeletonRow count={5} />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-40 mx-4" />
          <ProductSkeletonGrid count={6} />
        </div>
      </main>
      <BottomNav />
    </>
  );
}
