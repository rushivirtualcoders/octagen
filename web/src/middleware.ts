import { NextResponse, type NextRequest } from 'next/server'
import { decodeSession, SESSION_COOKIE } from '@/lib/auth-token'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token) {
    const login = request.nextUrl.clone()
    login.pathname = '/admin/login'
    login.searchParams.set('from', pathname)
    return NextResponse.redirect(login)
  }

  try {
    const session = await decodeSession(token)
    if (!session) throw new Error('invalid')
    return NextResponse.next()
  } catch {
    const login = request.nextUrl.clone()
    login.pathname = '/admin/login'
    return NextResponse.redirect(login)
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
