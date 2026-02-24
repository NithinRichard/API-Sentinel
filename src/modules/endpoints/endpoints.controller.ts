import { auth } from '@/modules/auth/auth.service'
import { successResponse, errorResponse } from '@/helpers/response.helper'
import { ValidationError } from '@/errors/validation.error'
import { HttpStatus } from '@/constants/status.constant'
import { EndpointsService } from './endpoints.service'
import { createEndpointSchema } from './endpoints.schema'

export class EndpointsController {
  static async getAll() {
    try {
      const session = await auth()
      const result = await EndpointsService.getAll(session?.user?.id)
      return successResponse(result)
    } catch (error) {
      return errorResponse(error)
    }
  }

  static async create(request: Request) {
    try {
      const session = await auth()
      const body = await request.json()
      const result = createEndpointSchema.safeParse(body)

      if (!result.success) throw new ValidationError(result.error.issues)

      const endpoint = await EndpointsService.create(
        session?.user?.id ?? 'demo',
        result.data,
      )

      return successResponse({ endpoint }, HttpStatus.CREATED)
    } catch (error) {
      return errorResponse(error)
    }
  }
}
