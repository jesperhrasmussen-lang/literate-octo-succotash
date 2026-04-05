# Nearby Offers Web Demo

Dette repo indeholder Next.js-frontenden for Nearby Offers. Den kan køre i en mock-demo-tilstand, så UI’et kan vises uden backend, og kan senere kobles til den rigtige søgepipeline.

## Kørsel lokalt

```bash
npm install
# mock-demo
DEMO_MODE=true npm run dev
```

Sæt `DEMO_MODE=true` (fx i `.env.local`), når appen skal bruge det indbyggede mockdatasæt.
Sæt `DEMO_MODE=false` og sørg for, at Python-pipelinen kan kaldes, hvis du vil bruge den rigtige backend.

## Deployment
1. Sæt `DEMO_MODE` som miljøvariabel i Vercel (eller anden host).
2. Byg med `npm run build` og kør `npm start` (eller lad Vercel køre standard Next.js build).
3. Når backend bliver klar, fjern `DEMO_MODE` eller sæt den til `false`, og sørg for at scripts/DB er tilgængelige på den hostede server.

## Næste skridt
- Holde mock-mode som fallback, men gør klar til at pege på den rigtige `/api/search`.
- Tilføje logs/observability før ekstern trial.
