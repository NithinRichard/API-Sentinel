import { PrismaClient, PrismaConfig } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export function getPrisma(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is not set. Add it to .env.local to enable database features.',
    )
  }

  if (globalForPrisma.prisma) return globalForPrisma.prisma

  const config = new PrismaConfig({
    datasources: { db: { url: process.env.DATABASE_URL } },
  })

  const client = new PrismaClient(config)

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client
  }

  return client
}

export const hasDatabase = !!process.env.DATABASE_URL
