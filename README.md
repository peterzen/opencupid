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

# backend test suite
pnpm --filter backend test

# frontend test suite
pnpm --filter frontend test:unit

# lint
pnpm lint
pnpm --filter frontend type-check
```
