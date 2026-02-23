import { z } from 'zod'

const BLOCKED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0', '::1', '169.254.']

export const createEndpointSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be under 100 characters')
    .trim(),
  endpointUrl: z
    .string()
    .url('Must be a valid URL')
    .refine((url) => {
      try {
        const parsed = new URL(url)
        return ['http:', 'https:'].includes(parsed.protocol)
      } catch {
        return false
      }
    }, 'Only HTTP/HTTPS protocols are allowed')
    .refine((url) => {
      try {
        const parsed = new URL(url)
        return !BLOCKED_HOSTS.some(
          (host) => parsed.hostname === host || parsed.hostname.startsWith(host)
        )
      } catch {
        return false
      }
    }, 'Internal/private URLs are not allowed'),
  apiKey: z.string().max(500).optional().default(''),
  alertEmail: z.string().email('Must be a valid email address'),
  interval: z.number().int().min(30).max(3600).optional().default(60),
  threshold: z.number().int().min(500).max(30000).optional().default(2000),
  methods: z
    .array(z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD']))
    .optional()
    .default(['GET']),
})

export type CreateEndpointInput = z.infer<typeof createEndpointSchema>
