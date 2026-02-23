import { NextResponse } from 'next/server'
import { checkAllEndpoints } from '@/lib/monitor'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const results = await checkAllEndpoints()

    const summary = {
      total: results.length,
      up: results.filter((r) => r.isUp).length,
      down: results.filter((r) => !r.isUp).length,
      checkedAt: new Date().toISOString(),
    }

    return NextResponse.json(summary)
  } catch (error) {
    return NextResponse.json(
      { error: 'Health check failed', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    )
  }
}
