import { successResponse, errorResponse } from '@/helpers/response.helper'
import { mockEndpoints } from '@/modules/endpoints/endpoints.mock'
import { Messages } from '@/constants/messages.constant'

export class HealthController {
  static async check() {
    try {
      return successResponse({
        status: Messages.HEALTH.OK,
        timestamp: new Date().toISOString(),
        endpointsMonitored: mockEndpoints.length,
      })
    } catch (error) {
      return errorResponse(error)
    }
  }
}
