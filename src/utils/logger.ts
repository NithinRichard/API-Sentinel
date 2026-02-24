const isDev = process.env.NODE_ENV === 'development'

export const logger = {
  info: (message: string, data?: unknown) => {
    if (isDev) console.log(`[INFO] ${message}`, data ?? '')
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, data ?? '')
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error ?? '')
  },
}
