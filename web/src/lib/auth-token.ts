export const SESSION_COOKIE = 'octagen_session'
export const SESSION_MAX_AGE = 60 * 60 * 8

export type SessionUser = {
  id: string
  email: string
  name: string
  role: string
}

function getSecret() {
  const value = process.env.AUTH_SECRET
  if (!value || value.length < 32) {
    throw new Error('AUTH_SECRET must be set to at least 32 characters')
  }
  return value
}

function toBase64Url(bytes: Uint8Array) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

function fromBase64Url(value: string) {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/') + '==='.slice((value.length + 3) % 4)
  const binary = atob(padded)
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return result === 0
}

async function sign(body: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body))
  return toBase64Url(new Uint8Array(signature))
}

export async function encodeSession(user: SessionUser, expiresAt = Date.now() + SESSION_MAX_AGE * 1000) {
  const body = toBase64Url(new TextEncoder().encode(JSON.stringify({ ...user, exp: expiresAt })))
  const signature = await sign(body)
  return `${body}.${signature}`
}

export async function decodeSession(token: string): Promise<SessionUser | null> {
  const [body, signature] = token.split('.')
  if (!body || !signature) return null
  const expected = await sign(body)
  if (!safeEqual(signature, expected)) return null
  try {
    const parsed = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as SessionUser & { exp: number }
    if (!parsed?.exp || parsed.exp < Date.now() || !parsed.email) return null
    return { id: parsed.id, email: parsed.email, name: parsed.name, role: parsed.role }
  } catch {
    return null
  }
}
