import { getPrisma } from '@/db/prisma'
import { hashPassword } from '@/helpers/encryption.helper'
import { successResponse, errorResponse } from '@/helpers/response.helper'
import { ValidationError } from '@/errors/validation.error'
import { AppError } from '@/errors/app.error'
import { registerSchema } from './auth.schema'
import { HttpStatus } from '@/constants/status.constant'
import { Messages } from '@/constants/messages.constant'

export class AuthController {
  static async register(request: Request) {
    try {
      const body = await request.json()
      const result = registerSchema.safeParse(body)

      if (!result.success) throw new ValidationError(result.error.issues)

      const { name, email, password } = result.data
      const prisma = getPrisma()

      const existing = await prisma.user.findUnique({ where: { email } })
      if (existing) {
        throw new AppError(Messages.AUTH.USER_EXISTS, HttpStatus.CONFLICT)
      }

      const hashedPassword = await hashPassword(password)

      const user = await prisma.user.create({
        data: { name, email, hashedPassword },
        select: { id: true, email: true, name: true },
      })

      return successResponse({ user }, HttpStatus.CREATED)
    } catch (error) {
      return errorResponse(error)
    }
  }
}
