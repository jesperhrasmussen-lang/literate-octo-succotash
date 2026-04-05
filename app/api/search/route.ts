import { NextResponse } from 'next/server';
import { buildMockResponse } from '@/lib/search-api';
import { filterSearchResponse } from '@/lib/filter-search-response';
import { executeSearch } from '@/lib/search-service';
import type { SearchRequest, SearchResponse } from '@/types/search-types';
import { validateSearchRequest } from '@/types/search-types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const demoMode = process.env.DEMO_MODE === 'true' || process.env.DEMO_MODE === '1';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SearchRequest;
    validateSearchRequest(body);

    let response: SearchResponse;
    if (demoMode) {
      response = buildMockResponse(body);
    } else {
      response = await executeSearch(body);
    }

    const filtered = filterSearchResponse(response);
    return NextResponse.json(filtered, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Search pipeline failed',
      },
      { status: 422 },
    );
  }
}
