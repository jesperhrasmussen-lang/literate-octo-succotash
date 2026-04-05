# Nearby Offers Web Skeleton

Minimal Next.js V1 skeleton for the Nearby Offers project.

## Current state
- App Router structure
- search page
- results page
- mock-backed search flow
- typed request/response models
- ready to replace mock mode with real `/api/search`

## Run

```bash
cd projects/nearby-offers-webapp/web
npm install
npm run dev
```

## Next step
- connect `/results` to real backend instead of `buildMockResponse(...)`
- replace mock data with real API fetch
- expand reusable components
