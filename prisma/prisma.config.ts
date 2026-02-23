import { PrismaConfig } from '@prisma/client'

export default new PrismaConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
