import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { getPrisma, hasDatabase } from '@/db/prisma'
import { authConfig } from '@/config/auth.config'
import { comparePassword } from '@/helpers/encryption.helper'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  ...(hasDatabase ? { adapter: PrismaAdapter(getPrisma()) } : {}),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!hasDatabase) return null
        if (!credentials?.email || !credentials?.password) return null

        const email = credentials.email as string
        const password = credentials.password as string

        const prisma = getPrisma()
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user?.hashedPassword) return null

        const isValid = await comparePassword(password, user.hashedPassword)
        if (!isValid) return null

        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
})
