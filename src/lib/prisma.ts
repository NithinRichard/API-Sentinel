import { PrismaClient, PrismaConfig } from '@prisma/client'

const prismaConfig = new PrismaConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaConfig)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
