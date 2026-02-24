import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  AUTH_SECRET: z.string().min(16),
  NEXTAUTH_URL: z.string().url().optional(),
  CRON_SECRET: z.string().optional(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

function validateEnv() {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error(
      'Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    )
    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

export const env = validateEnv()
export const isDev = env.NODE_ENV === 'development'
export const isProd = env.NODE_ENV === 'production'
export const hasDatabase = !!env.DATABASE_URL
