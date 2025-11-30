import { TrackSkeleton } from "@/components/track-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-[670px] mx-auto px-4 py-8">
        <div className="mb-6 inline-flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-5 w-24" />
        </div>

        <TrackSkeleton />
      </div>
    </div>
  );
}

