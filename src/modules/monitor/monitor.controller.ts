import { successResponse, errorResponse } from '@/helpers/response.helper'
import { UnauthorizedError } from '@/errors/unauthorized.error'
import { MonitorService } from './monitor.service'

export class MonitorController {
  static async runChecks(request: Request) {
    try {
      const authHeader = request.headers.get('authorization')
      const cronSecret = process.env.CRON_SECRET

      if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        throw new UnauthorizedError('Invalid cron secret')
      }

      const results = await MonitorService.checkAll()

      return successResponse({
        total: results.length,
        up: results.filter((r) => r.isUp).length,
        down: results.filter((r) => !r.isUp).length,
        checkedAt: new Date().toISOString(),
      })
    } catch (error) {
      return errorResponse(error)
    }
  }
}
