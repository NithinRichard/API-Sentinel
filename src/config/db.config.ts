export const dbConfig = {
  connectionUrl: process.env.DATABASE_URL ?? '',
  poolMin: 2,
  poolMax: 10,
  idleTimeoutMs: 30_000,
} as const
