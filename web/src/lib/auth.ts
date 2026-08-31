import { cookies } from 'next/headers'
import { prisma } from './db'
import {
  decodeSession,
  encodeSession,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  type SessionUser,
} from './auth-token'

export type { SessionUser }
export { SESSION_COOKIE }

export async function createSession(user: SessionUser) {
  const token = await encodeSession(user)
  const jar = await cookies()
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export async function destroySession() {
  const jar = await cookies()
  jar.delete(SESSION_COOKIE)
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    return await decodeSession(token)
  } catch {
    return null
  }
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')
  if (session.role !== 'admin') throw new Error('Forbidden')
  return session
}

export async function findStaffByEmail(email: string) {
  return prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } })
}
