import { prisma } from './prisma'

export interface UptimeCheckResult {
  endpointId: string
  isUp: boolean
  responseTime: number
  status: string
  errorMessage?: string
}

export async function checkEndpoint(endpointId: string): Promise<UptimeCheckResult> {
  const endpoint = await prisma.aPIEndpoint.findUnique({
    where: { id: endpointId },
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
      headers: {
        'Authorization': `Bearer ${endpoint.apiKey}`,
      },
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

  // Log uptime
  await prisma.uptimeLog.create({
    data: {
      endpointId,
      isUp,
      responseTime,
      status,
      errorMessage,
    },
  })

  // Update endpoint status
  await prisma.aPIEndpoint.update({
    where: { id: endpointId },
    data: {
      lastChecked: new Date(),
      lastResponse: status,
      lastStatus: isUp ? 'up' : 'down',
    },
  })

  return {
    endpointId,
    isUp,
    responseTime,
    status,
    errorMessage,
  }
}

export async function checkAllEndpoints() {
  const endpoints = await prisma.aPIEndpoint.findMany()

  const results = await Promise.all(
    endpoints.map((endpoint) => checkEndpoint(endpoint.id))
  )

  return results
}
