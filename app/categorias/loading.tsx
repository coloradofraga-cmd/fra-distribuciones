import { Skeleton } from "@/components/ui/Skeleton";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";

export default function CategoriasLoading() {
  return (
    <>
      <TopBar />
      <main className="flex flex-col gap-6 py-4 pb-28 px-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
