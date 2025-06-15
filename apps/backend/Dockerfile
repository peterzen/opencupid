FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Optional: for native Prisma CLI if needed
RUN apk add --no-cache libc6-compat

# Generate Prisma client and build application
RUN pnpm run generate && pnpm run build

# Remove dev dependencies
RUN pnpm prune --prod

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "dist/main.js"]
