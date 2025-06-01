FROM node:20-alpine

WORKDIR /app

COPY . .

# Optional: for native Prisma CLI if needed
RUN apk add --no-cache libc6-compat

# Enable corepack and install deps
RUN corepack enable && pnpm install --no-frozen-lockfile

# Build TS -> JS
RUN pnpm run build

# Use production node_modules only
RUN pnpm install --prod

EXPOSE 3000

CMD ["node", "dist/main.js"]
