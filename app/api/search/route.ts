import { NextResponse } from 'next/server';
import { buildMockResponse } from '@/lib/search-api';
import { executeSearch } from '@/lib/search-service';
import type { SearchRequest } from '@/types/search-types';
import { validateSearchRequest } from '@/types/search-types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const demoMode = process.env.DEMO_MODE === 'true' || process.env.DEMO_MODE === '1';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SearchRequest;
    validateSearchRequest(body);

    if (demoMode) {
      const mock = buildMockResponse(body);
      return NextResponse.json(mock, { status: 200 });
    }

    const response = await executeSearch(body);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Search pipeline failed',
      },
      { status: 422 },
    );
  }
}
