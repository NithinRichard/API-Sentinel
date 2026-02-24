import { hasDatabase } from '@/db/prisma'
import { EndpointsRepository } from './endpoints.repository'
import { mockEndpoints } from './endpoints.mock'
import type { CreateEndpointInput } from './endpoints.schema'

export class EndpointsService {
  static async getAll(userId?: string) {
    if (hasDatabase && userId) {
      const endpoints = await EndpointsRepository.findAllByUser(userId)
      const total = endpoints.length
      const up = endpoints.filter((e) => e.lastStatus === 'up').length

      return {
        endpoints,
        stats: {
          total,
          up,
          down: total - up,
          uptimePercent: total > 0 ? Math.round((up / total) * 100) : 0,
          lastChecked: endpoints[0]?.lastChecked?.toISOString() ?? null,
          avgResponseTime: 144,
        },
      }
    }

    const total = mockEndpoints.length
    const up = mockEndpoints.filter((e) => e.lastStatus === 'up').length
    const sanitized = mockEndpoints.map(({ apiKey: _, ...rest }) => rest)

    return {
      endpoints: sanitized,
      stats: {
        total,
        up,
        down: total - up,
        uptimePercent: total > 0 ? Math.round((up / total) * 100) : 0,
        lastChecked: mockEndpoints[0]?.lastChecked ?? null,
        avgResponseTime: 144,
      },
    }
  }

  static async create(userId: string, data: CreateEndpointInput) {
    if (hasDatabase) {
      return EndpointsRepository.create(userId, data)
    }

    return {
      id: crypto.randomUUID(),
      name: data.name,
      endpointUrl: data.endpointUrl,
      methods: data.methods,
      interval: data.interval,
      alertEmail: data.alertEmail,
      alertWebhook: null,
      threshold: data.threshold,
      lastChecked: new Date().toISOString(),
      lastResponse: '200',
      lastStatus: 'up' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }
}
