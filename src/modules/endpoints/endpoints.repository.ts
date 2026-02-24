import { getPrisma } from '@/db/prisma'
import type { CreateEndpointInput } from './endpoints.schema'

const SAFE_SELECT = {
  id: true,
  name: true,
  endpointUrl: true,
  methods: true,
  interval: true,
  alertEmail: true,
  alertWebhook: true,
  threshold: true,
  lastChecked: true,
  lastResponse: true,
  lastStatus: true,
  createdAt: true,
  updatedAt: true,
} as const

export class EndpointsRepository {
  static async findAllByUser(userId: string) {
    const prisma = getPrisma()
    return prisma.aPIEndpoint.findMany({
      where: { userId },
      select: SAFE_SELECT,
      orderBy: { createdAt: 'desc' },
    })
  }

  static async findById(id: string, userId: string) {
    const prisma = getPrisma()
    return prisma.aPIEndpoint.findFirst({
      where: { id, userId },
      select: SAFE_SELECT,
    })
  }

  static async create(userId: string, data: CreateEndpointInput) {
    const prisma = getPrisma()
    return prisma.aPIEndpoint.create({
      data: {
        userId,
        name: data.name,
        endpointUrl: data.endpointUrl,
        methods: data.methods,
        apiKey: data.apiKey ?? '',
        interval: data.interval,
        alertEmail: data.alertEmail,
        threshold: data.threshold,
      },
      select: SAFE_SELECT,
    })
  }

  static async delete(id: string, userId: string) {
    const prisma = getPrisma()
    return prisma.aPIEndpoint.deleteMany({
      where: { id, userId },
    })
  }
}
