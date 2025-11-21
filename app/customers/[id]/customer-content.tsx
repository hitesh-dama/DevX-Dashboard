'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Customer, Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils/calculations';
import { ArrowLeft, Mail, Calendar, IndianRupee, ShoppingCart, Clock } from 'lucide-react';

const statusColors = {
  PAID: 'bg-green-100 text-green-800 hover:bg-green-100',
  PENDING: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  REFUNDED: 'bg-red-100 text-red-800 hover:bg-red-100',
  CANCELLED: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
};

interface CustomerContentProps {
  customerId: string;
}

export function CustomerContent({ customerId }: CustomerContentProps) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        setLoading(true);
        setError(null);

        const [customerData, ordersData] = await Promise.all([
          api.customers.getById(customerId),
          api.customers.getOrders(customerId),
        ]);

        setCustomer(customerData);
        setOrders(ordersData);
      } catch (err) {
        setError('Failed to load customer data. Please try again.');
        console.error('Customer fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomerData();
  }, [customerId]);

  if (error) {
    return (
      <div className="space-y-4">
        <Link href="/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (loading || !customer) {
    return <div>Loading customer details...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{customer.name}</h1>
        <div className="flex items-center gap-4 mt-2 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            {customer.email}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Joined {formatDate(customer.joinedAt)}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(customer.totalRevenue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(customer.totalRevenue / customer.totalOrders)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Order</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">
              {formatDate(customer.lastOrderDate)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No orders found
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
