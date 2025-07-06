# OpenCupid

Free and open matchmaking application.

## Stack

- Frontend: Vue 3 + Bootstrap 5 + Vite
- Backend: Node.js + Fastify + Prisma
- DB: PostgreSQL

## Getting Started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

## Running tests and code quality checks

```bash
pnpm install 
pnpm --filter backend generate  # generate prisma client

pnpm test  # this runs all of the tests in backend/frontend

# lint
pnpm lint
pnpm --filter frontend type-check
```
