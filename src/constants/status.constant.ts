export const EndpointStatus = {
  UP: 'up',
  DOWN: 'down',
  DEGRADED: 'degraded',
  UNKNOWN: 'unknown',
} as const

export type EndpointStatusType =
  (typeof EndpointStatus)[keyof typeof EndpointStatus]

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const
