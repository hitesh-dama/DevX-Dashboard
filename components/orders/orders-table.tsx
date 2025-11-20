'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { formatCurrency, formatDateTime } from '@/lib/utils/calculations';
import { OrderDetailsDialog } from './order-details-dialog';

interface OrdersTableProps {
  orders: Order[];
  onSort: (key: string) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const statusColors = {
  PAID: 'bg-green-100 text-green-800 hover:bg-green-100',
  PENDING: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  REFUNDED: 'bg-red-100 text-red-800 hover:bg-red-100',
  CANCELLED: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
};

export function OrdersTable({ orders, onSort, sortBy, sortOrder }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const SortButton = ({ column, label }: { column: string; label: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSort(column)}
      className="-ml-3 h-8"
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No orders found
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortButton column="id" label="Order ID" />
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>
                <SortButton column="orderDate" label="Order Date" />
              </TableHead>
              <TableHead>
                <SortButton column="amount" label="Amount" />
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedOrder(order)}
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <Link
                    href={`/customers/${order.customerId}`}
                    className="hover:underline text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {order.customerName}
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    {order.customerEmail}
                  </div>
                </TableCell>
                <TableCell>{formatDateTime(order.orderDate)}</TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(order.amount)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <OrderDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
