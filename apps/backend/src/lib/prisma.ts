// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // allow global ‘prisma’ for hot-reload/dev so we don't create many instances
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    // optional logging
    // log: ['query', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
