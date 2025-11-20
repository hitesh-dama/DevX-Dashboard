import { Suspense } from 'react';
import { OrdersContent } from './orders-content';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Orders - Business Analytics Portal',
  description: 'Browse and manage customer orders',
};

export default function OrdersPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Browse and filter customer orders
        </p>
      </div>

      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersContent />
      </Suspense>
    </div>
  );
}

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <Skeleton className="h-[500px]" />
    </div>
  );
}
