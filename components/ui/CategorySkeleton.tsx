import { Skeleton } from "./Skeleton";

export function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="w-16 h-16 rounded-2xl" />
      <Skeleton className="h-3 w-14" />
    </div>
  );
}

export function CategorySkeletonRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-3 px-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <CategorySkeleton key={i} />
      ))}
    </div>
  );
}
