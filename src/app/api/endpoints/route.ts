import { NextResponse } from 'next/server'
import { mockEndpoints } from '@/lib/mock-endpoints'

export async function GET() {
  try {
    // Get uptime stats
    const totalEndpoints = mockEndpoints.length
    const upEndpoints = mockEndpoints.filter((e) => e.lastStatus === 'up').length
    const uptimePercent = totalEndpoints > 0
      ? Math.round((upEndpoints / totalEndpoints) * 100)
      : 0

    // Get last checked time (most recent)
    const lastChecked = mockEndpoints[0]?.lastChecked || null

    return NextResponse.json({
      endpoints: mockEndpoints,
      stats: {
        total: totalEndpoints,
        up: upEndpoints,
        down: totalEndpoints - upEndpoints,
        uptimePercent,
        lastChecked,
      },
    })
  } catch (error) {
    console.error('Error fetching endpoints:', error)
    return NextResponse.json(
      { error: 'Failed to fetch endpoints' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, endpointUrl, apiKey, alertEmail, interval, threshold } = body

    const newEndpoint = {
      id: String(mockEndpoints.length + 1),
      name,
      endpointUrl,
      methods: ['GET'],
      apiKey: apiKey || '',
      interval: interval || 60,
      alertEmail,
      alertWebhook: null,
      threshold: threshold || 2000,
      lastChecked: new Date().toISOString(),
      lastResponse: '200',
      lastStatus: 'up',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockEndpoints.push(newEndpoint)

    return NextResponse.json({ endpoint: newEndpoint }, { status: 201 })
  } catch (error) {
    console.error('Error creating endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to create endpoint' },
      { status: 500 }
    )
  }
}
