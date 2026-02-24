import { NextResponse } from 'next/server'
import { AppError } from '@/errors'
import { HttpStatus } from '@/constants/status.constant'

export function successResponse<T>(data: T, status = HttpStatus.OK) {
  return NextResponse.json(data, { status })
}

export function errorResponse(error: unknown) {
  if (error instanceof AppError) {
    const body: Record<string, unknown> = { error: error.message }
    if ('issues' in error) {
      body.issues = (error as { issues: unknown }).issues
    }
    return NextResponse.json(body, { status: error.statusCode })
  }

  console.error('Unhandled error:', error)
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: HttpStatus.INTERNAL_SERVER_ERROR },
  )
}
