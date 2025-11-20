import { Skeleton } from '@/components/ui/skeleton';

export default function CustomerLoading() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-32" />

      <div>
        <Skeleton className="h-9 w-48" />
        <div className="flex gap-4 mt-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>

      <Skeleton className="h-[400px]" />
    </div>
  );
}
