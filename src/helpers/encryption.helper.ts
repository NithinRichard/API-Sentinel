import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function maskApiKey(key: string): string {
  if (key.length <= 8) return '••••••••'
  return key.slice(0, 4) + '••••' + key.slice(-4)
}
