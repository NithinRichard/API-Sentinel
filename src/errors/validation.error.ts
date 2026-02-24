import { AppError } from './app.error'
import type { ZodIssue } from 'zod'

export class ValidationError extends AppError {
  public readonly issues: { field: string; message: string }[]

  constructor(zodIssues: ZodIssue[]) {
    super('Validation failed', 400)
    this.issues = zodIssues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    }))
  }
}
