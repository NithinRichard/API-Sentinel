import { getPrisma } from '@/db/prisma'
import type { PrismaClient } from '@prisma/client'

export class BaseRepository {
  protected static get db(): PrismaClient {
    return getPrisma()
  }
}
