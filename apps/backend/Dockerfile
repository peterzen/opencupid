FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/package.json

RUN corepack enable && pnpm install --frozen-lockfile

# Copy source
COPY apps/backend ./apps/backend
COPY packages ./packages

WORKDIR /app/apps/backend

RUN pnpm install --no-frozen-lockfile
# Optional: for native Prisma CLI if needed
# RUN apk add --no-cache libc6-compat

# Generate Prisma client and build application
RUN pnpm run generate && pnpm run build

# Remove dev dependencies
RUN pnpm prune --prod

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app .

WORKDIR /app/apps/backend

EXPOSE 3000

CMD ["node", "dist/main.js"]
