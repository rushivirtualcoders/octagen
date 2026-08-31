'use client'

import { useState } from 'react'
import { loginAction } from '@/lib/cms/actions'
import { fieldClass } from './Fields'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [pending, setPending] = useState(false)

  async function onSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    setFieldErrors({})
    const result = await loginAction(formData)
    if (result?.error) setError(result.error)
    if (result?.fieldErrors) setFieldErrors(result.fieldErrors)
    setPending(false)
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <label className="block">
        <span className="tech-label text-muted">Email</span>
        <input className={fieldClass(fieldErrors.email)} type="email" name="email" autoComplete="username" required />
        {fieldErrors.email ? <span className="mt-1 block text-xs text-lm-red">{fieldErrors.email}</span> : null}
      </label>
      <label className="block">
        <span className="tech-label text-muted">Password</span>
        <input className={fieldClass(fieldErrors.password)} type="password" name="password" autoComplete="current-password" required minLength={8} />
        {fieldErrors.password ? <span className="mt-1 block text-xs text-lm-red">{fieldErrors.password}</span> : null}
      </label>
      {error ? <p className="text-sm text-lm-red">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-lm-red py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#c40017] disabled:opacity-60"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
