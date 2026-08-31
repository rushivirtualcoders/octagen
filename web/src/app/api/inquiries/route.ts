import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createInquiry } from '@/lib/cms/inquiries'
import { rateLimit } from '@/lib/rate-limit'
import { ZodError } from 'zod'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'local'
  const limited = rateLimit(`inquiry:${ip}`, 8, 60 * 60 * 1000)
  if (!limited.ok) {
    return NextResponse.json({ error: 'Too many inquiries. Try later.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const id = await createInquiry(body)
    revalidatePath('/admin/inquiries')
    revalidatePath('/admin')
    return NextResponse.json({ ok: true, id }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid inquiry payload.' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Could not save inquiry.' }, { status: 500 })
  }
}