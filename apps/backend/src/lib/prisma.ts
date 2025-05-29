import { Prisma, PrismaClient } from '@prisma/client'

// Define process-wide log level
const logLevels: Prisma.LogLevel[] = process.env.NODE_ENV === 'production'
  ? ['error'] // In production, log only errors
  : ['query', 'error', 'warn']

// In development, use global to prevent multiple instances during hot reloading
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Create the PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: logLevels
    // You can configure connection pooling settings here
    // datasources: {
    //   db: {
    //     url: process.env.DATABASE_URL,
    //     // These settings can improve performance under high load
    //     poolTimeout: 20, // 20 seconds
    //     connectionLimit: 10 // default is 10
    //   }
    // }
  })
}

// Create the singleton
export const prisma = global.prisma ?? prismaClientSingleton()

// Cache in development only
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}