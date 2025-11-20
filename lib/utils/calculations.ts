import { Order, DashboardKPIs, RevenueData } from '../types';

export function calculateKPIs(orders: Order[], dateRange: number): DashboardKPIs {
  const now = new Date();
  const startDate = new Date(now.getTime() - dateRange * 24 * 60 * 60 * 1000);

  const filteredOrders = orders.filter(
    order => new Date(order.orderDate) >= startDate
  );

  const totalRevenue = filteredOrders
    .filter(o => o.status === 'PAID')
    .reduce((sum, order) => sum + order.amount, 0);

  const totalOrders = filteredOrders.length;

  const uniqueCustomers = new Set(filteredOrders.map(o => o.customerId));
  const activeCustomers = uniqueCustomers.size;

  const refundedOrders = filteredOrders.filter(o => o.status === 'REFUNDED').length;
  const refundRate = totalOrders > 0 ? (refundedOrders / totalOrders) * 100 : 0;

  return {
    totalRevenue,
    totalOrders,
    activeCustomers,
    refundRate,
  };
}

export function calculateRevenueData(orders: Order[], dateRange: number): RevenueData[] {
  const now = new Date();
  const startDate = new Date(now.getTime() - dateRange * 24 * 60 * 60 * 1000);

  const dateMap = new Map<string, { revenue: number; orders: number }>();

  for (let i = 0; i < dateRange; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    dateMap.set(dateStr, { revenue: 0, orders: 0 });
  }

  orders.forEach(order => {
    const orderDate = new Date(order.orderDate);
    if (orderDate >= startDate) {
      const dateStr = orderDate.toISOString().split('T')[0];
      const existing = dateMap.get(dateStr) || { revenue: 0, orders: 0 };

      if (order.status === 'PAID') {
        existing.revenue += order.amount;
      }
      existing.orders += 1;

      dateMap.set(dateStr, existing);
    }
  });

  return Array.from(dateMap.entries())
    .map(([date, data]) => ({
      date,
      revenue: data.revenue,
      orders: data.orders,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

export function formatDateTime(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}
