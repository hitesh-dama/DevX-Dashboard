'use client';

import { useEffect, useState } from 'react';
import { DateRange, DashboardKPIs, RevenueData } from '@/lib/types';
import { api } from '@/lib/api';
import { KPICard } from '@/components/dashboard/kpi-card';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { DateRangeSelector } from '@/components/dashboard/date-range-selector';
import { DollarSign, ShoppingCart, Users, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/calculations';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function DashboardContent() {
  const [dateRange, setDateRange] = useState<DateRange>('30');
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [kpisData, revenueDataResult] = await Promise.all([
          api.dashboard.getKPIs(dateRange),
          api.dashboard.getRevenueData(dateRange),
        ]);

        setKpis(kpisData);
        setRevenueData(revenueDataResult);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dateRange]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (loading || !kpis) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Key Metrics</h2>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(kpis.totalRevenue)}
          icon={DollarSign}
        />
        <KPICard
          title="Total Orders"
          value={kpis.totalOrders.toString()}
          icon={ShoppingCart}
        />
        <KPICard
          title="Active Customers"
          value={kpis.activeCustomers.toString()}
          icon={Users}
        />
        <KPICard
          title="Refund Rate"
          value={`${kpis.refundRate.toFixed(1)}%`}
          icon={TrendingDown}
        />
      </div>

      <RevenueChart data={revenueData} />
    </div>
  );
}
