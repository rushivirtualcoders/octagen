'use client'

import { useEffect, type ReactNode } from 'react'

type Props = {
  open: boolean
  title: string
  eyebrow?: string
  onClose: () => void
  children: ReactNode
  size?: 'md' | 'lg' | 'xl'
}

const SIZE = {
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
} as const

export default function AdminModal({
  open,
  title,
  eyebrow = 'Octagen CMS',
  onClose,
  children,
  size = 'xl',
}: Props) {
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[400] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        className={`relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-line bg-white shadow-2xl sm:rounded-xl ${SIZE[size]}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line bg-[#f8fafc] px-5 py-4 sm:px-6">
          <div className="min-w-0 pr-2">
            <p className="tech-label text-lm-red">{eyebrow}</p>
            <h2 id="admin-modal-title" className="font-display mt-1 truncate text-xl font-extrabold uppercase text-ink sm:text-2xl">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-white text-ink transition hover:border-lm-red hover:bg-lm-red hover:text-white"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">{children}</div>
      </div>
    </div>
  )
}
