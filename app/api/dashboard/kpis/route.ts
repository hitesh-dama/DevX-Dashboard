import { NextRequest, NextResponse } from 'next/server';
import { mockOrders } from '@/lib/mock-data';
import { calculateKPIs } from '@/lib/utils/calculations';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get('range') || '30';
    const dateRange = parseInt(range);

    const kpis = calculateKPIs(mockOrders, dateRange);

    return NextResponse.json(kpis);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch KPIs' },
      { status: 500 }
    );
  }
}
