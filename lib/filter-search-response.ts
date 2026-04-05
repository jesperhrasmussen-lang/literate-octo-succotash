import type { Offer, SearchResponse } from '@/types/search-types';

function getDistanceLimitMeters(response: SearchResponse): number | null {
  if (response.search.accessMode === 'radius' && response.search.radiusKm !== null) {
    return response.search.radiusKm * 1000;
  }
  if (response.search.accessMode === 'walk' && response.search.maxWalkKm !== null) {
    return response.search.maxWalkKm * 1000;
  }
  return null;
}

export function filterSearchResponse(response: SearchResponse): SearchResponse {
  const distanceLimit = getDistanceLimitMeters(response);

  const storeInScope = (store: SearchResponse['stores'][number]) => {
    if (distanceLimit !== null && store.distanceMeters !== null) {
      return store.distanceMeters <= distanceLimit;
    }
    return store.accessQualified;
  };

  const stores = response.stores.filter(storeInScope);
  const storeIds = new Set(stores.map((store) => store.storeId));
  const chainIds = new Set(stores.map((store) => store.chainId));
  const chains = response.chains.filter((chain) => chainIds.has(chain.chainId));

  const offerInScope = (offer: Offer) => {
    if (distanceLimit !== null && offer.distanceMeters !== null) {
      return offer.distanceMeters <= distanceLimit;
    }
    if (offer.storeId) return storeIds.has(offer.storeId);
    return true;
  };

  const bestNow = response.bestNow.filter(offerInScope);
  const upcoming = response.upcoming.filter(offerInScope);
  const offerGroups = response.offerGroups.map((group) => ({
    ...group,
    offers: group.offers.filter(offerInScope),
  }));

  const totalOffersMatched = new Set([
    ...bestNow.map((offer) => offer.offerId),
    ...upcoming.map((offer) => offer.offerId),
  ]).size;

  return {
    ...response,
    chains,
    stores,
    bestNow,
    upcoming,
    offerGroups,
    summary: {
      ...response.summary,
      totalStoresInScope: stores.length,
      totalOffersMatched,
    },
  };
}
