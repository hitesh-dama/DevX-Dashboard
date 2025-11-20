'use client';

import Link from 'next/link';
import { Order } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDateTime } from '@/lib/utils/calculations';
import { ExternalLink } from 'lucide-react';

interface OrderDetailsDialogProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

const statusColors = {
  PAID: 'bg-green-100 text-green-800 hover:bg-green-100',
  PENDING: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  REFUNDED: 'bg-red-100 text-red-800 hover:bg-red-100',
  CANCELLED: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
};

export function OrderDetailsDialog({ order, open, onClose }: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="outline" className={statusColors[order.status]}>
                {order.status}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Customer</p>
            <p className="font-medium">{order.customerName}</p>
            <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
            <Link href={`/customers/${order.customerId}`} onClick={onClose}>
              <Button variant="link" className="px-0 h-auto" size="sm">
                View Customer Profile
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{formatDateTime(order.orderDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-xl font-bold">{formatCurrency(order.amount)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
