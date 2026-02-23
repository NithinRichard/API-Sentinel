import { prisma } from './prisma'

export interface UptimeCheckResult {
  endpointId: string
  isUp: boolean
  responseTime: number
  status: string
  errorMessage?: string
}

const MAX_CONCURRENT_CHECKS = 10

export async function checkEndpoint(
  endpointId: string,
): Promise<UptimeCheckResult> {
  const endpoint = await prisma.aPIEndpoint.findUnique({
    where: { id: endpointId },
    select: {
      id: true,
      endpointUrl: true,
      apiKey: true,
      threshold: true,
    },
  })

  if (!endpoint) {
    throw new Error(`Endpoint ${endpointId} not found`)
  }

  const startTime = Date.now()
  let isUp = false
  let status = 'unknown'
  let responseTime = 0
  let errorMessage: string | undefined

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), endpoint.threshold)

    const response = await fetch(endpoint.endpointUrl, {
      method: 'GET',
      headers: endpoint.apiKey
        ? { Authorization: `Bearer ${endpoint.apiKey}` }
        : {},
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    responseTime = Date.now() - startTime
    status = response.status.toString()
    isUp = response.ok
  } catch (error) {
    responseTime = Date.now() - startTime
    errorMessage = error instanceof Error ? error.message : 'Unknown error'
    isUp = false
    status = 'error'
  }

  await prisma.$transaction([
    prisma.uptimeLog.create({
      data: { endpointId, isUp, responseTime, status, errorMessage },
    }),
    prisma.aPIEndpoint.update({
      where: { id: endpointId },
      data: {
        lastChecked: new Date(),
        lastResponse: status,
        lastStatus: isUp ? 'up' : 'down',
      },
    }),
  ])

  return { endpointId, isUp, responseTime, status, errorMessage }
}

export async function checkAllEndpoints(): Promise<UptimeCheckResult[]> {
  const endpoints = await prisma.aPIEndpoint.findMany({
    select: { id: true },
  })

  const results: UptimeCheckResult[] = []

  for (let i = 0; i < endpoints.length; i += MAX_CONCURRENT_CHECKS) {
    const batch = endpoints.slice(i, i + MAX_CONCURRENT_CHECKS)
    const batchResults = await Promise.allSettled(
      batch.map((ep) => checkEndpoint(ep.id)),
    )

    for (const r of batchResults) {
      if (r.status === 'fulfilled') results.push(r.value)
    }
  }

  return results
}
