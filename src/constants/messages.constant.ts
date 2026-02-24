export const Messages = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_EXISTS: 'An account with this email already exists',
    UNAUTHORIZED: 'Authentication required',
    REGISTRATION_FAILED: 'Registration failed',
    LOGIN_SUCCESS: 'Logged in successfully',
  },
  ENDPOINT: {
    NOT_FOUND: 'Endpoint not found',
    CREATED: 'Endpoint created successfully',
    DELETED: 'Endpoint deleted successfully',
    FETCH_FAILED: 'Failed to fetch endpoints',
    CREATE_FAILED: 'Failed to create endpoint',
    VALIDATION_FAILED: 'Validation failed',
  },
  HEALTH: {
    OK: 'ok',
    ERROR: 'error',
    CHECK_FAILED: 'Health check failed',
  },
  GENERAL: {
    INTERNAL_ERROR: 'Internal server error',
    FORBIDDEN: 'Access denied',
  },
} as const
