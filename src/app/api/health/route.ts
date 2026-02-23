import { NextResponse } from 'next/server'
import { mockEndpoints } from '@/lib/mock-endpoints'

export async function GET() {
  try {
    const endpointCount = mockEndpoints.length
    const lastChecked = mockEndpoints[0]?.lastChecked || null

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      endpointsMonitored: endpointCount,
      lastCheck: lastChecked,
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
