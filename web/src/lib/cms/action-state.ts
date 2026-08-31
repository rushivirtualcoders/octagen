import { Prisma } from '@prisma/client'
import type { ZodError } from 'zod'

export type ActionState = {
  error?: string
  fieldErrors?: Record<string, string>
} | null

export function fromZod(error: ZodError): ActionState {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path.map(String).join('.') || 'form'
    if (!fieldErrors[key]) fieldErrors[key] = issue.message
  }
  return { error: 'Please fix the highlighted fields and try again.', fieldErrors }
}

export function fromUnknown(error: unknown): ActionState {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    const fields = (error.meta?.target as string[] | undefined) ?? []
    const label = fields.includes('slug')
      ? 'slug'
      : fields.includes('articleNumber')
        ? 'article number'
        : 'value'
    return { error: `That ${label} is already in use.` }
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
    return { error: 'This record is still linked to other data, so it cannot be deleted.' }
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
    return { error: 'This record no longer exists.' }
  }
  if (error instanceof Error) {
    if (error.message === 'Unauthorized') {
      return { error: 'Your session expired. Please sign in again.' }
    }
    if (error.message === 'Forbidden') {
      return { error: 'You do not have permission to perform this action.' }
    }
    if (
      error.message.endsWith('is required') ||
      error.message.includes('still has products') ||
      error.message.includes('still has articles')
    ) {
      return { error: error.message }
    }
  }
  return { error: 'Something went wrong. Please try again.' }
}

export function toastPath(path: string, message: string, tone: 'success' | 'error' = 'success') {
  const params = new URLSearchParams({ toast: message, tone })
  return `${path}?${params.toString()}`
}
