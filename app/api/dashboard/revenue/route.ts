import { NextRequest, NextResponse } from 'next/server';
import { mockOrders } from '@/lib/mock-data';
import { calculateRevenueData } from '@/lib/utils/calculations';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get('range') || '30';
    const dateRange = parseInt(range);

    const revenueData = calculateRevenueData(mockOrders, dateRange);

    return NextResponse.json(revenueData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch revenue data' },
      { status: 500 }
    );
  }
}
