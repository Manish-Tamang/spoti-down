import { Skeleton } from "@/components/ui/skeleton";

export function TrackSkeleton() {
  return (
    <div className="space-y-8">
      {/* Track Header Skeleton */}
      <div className="flex flex-col md:flex-row gap-6">
        <Skeleton className="w-48 h-48 rounded-[4px]" />
        <div className="space-y-4 flex-1">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>

      {/* YouTube Results Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/4" />
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border border-gray-200 rounded-[4px]">
              <Skeleton className="w-24 h-24 rounded-[4px]" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 