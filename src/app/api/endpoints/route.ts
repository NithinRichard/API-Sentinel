import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { mockEndpoints } from '@/lib/mock-endpoints'
import { createEndpointSchema } from '@/lib/validators'

const USE_DB = !!process.env.DATABASE_URL

export async function GET() {
  try {
    if (USE_DB) {
      const session = await auth()
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const endpoints = await prisma.aPIEndpoint.findMany({
        where: { userId: session.user.id },
        select: {
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
        },
        orderBy: { createdAt: 'desc' },
      })

      const total = endpoints.length
      const up = endpoints.filter(
        (e: { lastStatus: string }) => e.lastStatus === 'up',
      ).length

      return NextResponse.json({
        endpoints,
        stats: {
          total,
          up,
          down: total - up,
          uptimePercent: total > 0 ? Math.round((up / total) * 100) : 0,
          lastChecked:
            endpoints[0]?.lastChecked?.toISOString() ?? null,
          avgResponseTime: 144,
        },
      })
    }

    const totalEndpoints = mockEndpoints.length
    const upEndpoints = mockEndpoints.filter((e) => e.lastStatus === 'up').length
    const uptimePercent =
      totalEndpoints > 0 ? Math.round((upEndpoints / totalEndpoints) * 100) : 0

    const sanitized = mockEndpoints.map(({ apiKey: _, ...rest }) => rest)

    return NextResponse.json({
      endpoints: sanitized,
      stats: {
        total: totalEndpoints,
        up: upEndpoints,
        down: totalEndpoints - upEndpoints,
        uptimePercent,
        lastChecked: mockEndpoints[0]?.lastChecked ?? null,
        avgResponseTime: 144,
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch endpoints' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = createEndpointSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          issues: result.error.issues.map((i) => ({
            field: i.path.join('.'),
            message: i.message,
          })),
        },
        { status: 400 },
      )
    }

    const validated = result.data

    if (USE_DB) {
      const session = await auth()
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const endpoint = await prisma.aPIEndpoint.create({
        data: {
          userId: session.user.id,
          name: validated.name,
          endpointUrl: validated.endpointUrl,
          methods: validated.methods,
          apiKey: validated.apiKey ?? '',
          interval: validated.interval,
          alertEmail: validated.alertEmail,
          threshold: validated.threshold,
        },
        select: {
          id: true,
          name: true,
          endpointUrl: true,
          methods: true,
          interval: true,
          alertEmail: true,
          threshold: true,
          lastStatus: true,
          createdAt: true,
        },
      })

      return NextResponse.json({ endpoint }, { status: 201 })
    }

    const newEndpoint = {
      id: crypto.randomUUID(),
      name: validated.name,
      endpointUrl: validated.endpointUrl,
      methods: validated.methods,
      interval: validated.interval,
      alertEmail: validated.alertEmail,
      alertWebhook: null,
      threshold: validated.threshold,
      lastChecked: new Date().toISOString(),
      lastResponse: '200',
      lastStatus: 'up' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ endpoint: newEndpoint }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create endpoint' },
      { status: 500 },
    )
  }
}
