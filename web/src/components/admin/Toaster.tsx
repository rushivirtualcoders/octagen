'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type ToastTone = 'success' | 'error'
type Toast = { id: number; message: string; tone: ToastTone }

function toneStyles(tone: ToastTone) {
  if (tone === 'error') {
    return {
      wrap: 'border-lm-red/25 bg-white text-lm-red',
      badge: 'bg-lm-red/10 text-lm-red',
      label: 'Error',
    }
  }
  return {
    wrap: 'border-emerald-200 bg-white text-emerald-800',
    badge: 'bg-emerald-50 text-emerald-700',
    label: 'Success',
  }
}

function ToastList() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  useEffect(() => {
    const message = params?.get('toast')
    if (!message) return
    const tone: ToastTone = params?.get('tone') === 'error' ? 'error' : 'success'
    setToasts((current) => [...current, { id: Date.now(), message, tone }])
    if (pathname) router.replace(pathname, { scroll: false })
  }, [params, pathname, router])

  useEffect(() => {
    if (!toasts.length) return
    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        dismiss(toast.id)
      }, 4200),
    )
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [toasts, dismiss])

  if (!toasts.length) return null

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-[250] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((toast) => {
        const styles = toneStyles(toast.tone)
        return (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto rounded-lg border px-4 py-3 text-sm shadow-xl ${styles.wrap}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`tech-label mb-1 inline-flex rounded px-2 py-0.5 text-[10px] ${styles.badge}`}>
                  {styles.label}
                </p>
                <p className="leading-relaxed">{toast.message}</p>
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => dismiss(toast.id)}
                className="shrink-0 text-lg leading-none opacity-60 hover:opacity-100"
              >
                ×
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Toaster() {
  return (
    <Suspense fallback={null}>
      <ToastList />
    </Suspense>
  )
}
