import { Suspense } from 'react';
import { CustomerContent } from './customer-content';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Customer Details - Business Analytics Portal',
  description: 'View customer profile and order history',
};

export default function CustomerPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 space-y-6">
      <Suspense fallback={<CustomerSkeleton />}>
        <CustomerContent customerId={params.id} />
      </Suspense>
    </div>
  );
}

function CustomerSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-48" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <Skeleton className="h-[400px]" />
    </div>
  );
}
