import { NextResponse } from 'next/server'
import { mockEndpoints } from '@/lib/mock-endpoints'

export async function GET() {
  try {
    const endpointCount = mockEndpoints.length

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      endpointsMonitored: endpointCount,
    })
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Health check failed' },
      { status: 500 },
    )
  }
}
