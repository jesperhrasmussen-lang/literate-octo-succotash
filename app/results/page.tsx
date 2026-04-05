import { ResultsPageClient } from '@/components/results-page-client';
import type { SearchRequest } from '@/types/search-types';

function parseQueries(value: string | undefined): string[] {
  if (!value) return ['hakket oksekød', 'kyllingebrystfilet'];
  return value
    .split('|')
    .map((query) => query.trim())
    .filter(Boolean);
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const accessMode =
    params.accessMode === 'radius' || params.accessMode === 'walk' || params.accessMode === 'transit'
      ? params.accessMode
      : 'walk';

  const request: SearchRequest = {
    address: typeof params.address === 'string' ? params.address : 'Tingvej 4A, 2300 København S',
    accessMode,
    radiusKm:
      accessMode === 'radius' && typeof params.radiusKm === 'string' ? Number(params.radiusKm) : null,
    maxWalkKm:
      accessMode === 'walk' && typeof params.maxWalkKm === 'string' ? Number(params.maxWalkKm) : 1,
    maxTransitMin:
      accessMode === 'transit' && typeof params.maxTransitMin === 'string'
        ? Number(params.maxTransitMin)
        : null,
    queries: parseQueries(typeof params.queries === 'string' ? params.queries : undefined),
  };

  return (
    <main className="page-stack">
      <ResultsPageClient initialRequest={request} />
    </main>
  );
}
