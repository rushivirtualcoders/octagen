'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InquiryForm, { type InquiryFormValues } from './InquiryForm'
import { EASE } from '@/lib/animations'

type InquiryContextValue = {
  openInquiry: (defaults?: InquiryFormValues) => void
  closeInquiry: () => void
}

const InquiryContext = createContext<InquiryContextValue | null>(null)

export function useInquiry() {
  const ctx = useContext(InquiryContext)
  if (!ctx) {
    return {
      openInquiry: () => undefined,
      closeInquiry: () => undefined,
    }
  }
  return ctx
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.97,
    transition: { duration: 0.28, ease: EASE },
  },
}

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [defaults, setDefaults] = useState<InquiryFormValues | undefined>()

  const openInquiry = useCallback((next?: InquiryFormValues) => {
    setDefaults({
      type: next?.type,
      name: next?.name,
      email: next?.email,
      phone: next?.phone,
      // Don't prefill marketing CTA copy into the subject field
      subject: next?.subject && !/get quote|submit inquiry|talk to/i.test(next.subject)
        ? next.subject
        : '',
      message: next?.message,
    })
    setOpen(true)
  }, [])

  const closeInquiry = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) {
      document.body.classList.remove('inquiry-open')
      return
    }

    document.body.classList.add('inquiry-open')
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeInquiry()
    }
    window.addEventListener('keydown', onKey)
    window.dispatchEvent(new CustomEvent('octagen:lenis', { detail: { stop: true } }))

    return () => {
      document.body.classList.remove('inquiry-open')
      window.removeEventListener('keydown', onKey)
      window.dispatchEvent(new CustomEvent('octagen:lenis', { detail: { stop: false } }))
    }
  }, [open, closeInquiry])

  const value = useMemo(() => ({ openInquiry, closeInquiry }), [openInquiry, closeInquiry])

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="inquiry-modal"
            className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center sm:p-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              type="button"
              aria-label="Close inquiry form"
              className="absolute inset-0 cursor-pointer bg-ink/60 backdrop-blur-[3px]"
              onClick={closeInquiry}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="inquiry-dialog-title"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(event) => event.stopPropagation()}
              className="relative z-10 flex max-h-[92vh] w-full max-w-[34rem] flex-col overflow-hidden rounded-t-[16px] border border-line bg-white shadow-[0_28px_90px_rgba(11,18,21,0.35)] sm:rounded-[14px]"
            >
              <div className="relative border-b border-line bg-gradient-to-br from-white via-white to-lm-blue/5 px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-5">
                <div className="pr-12">
                  <p className="tech-label text-lm-blue">Submit inquiry</p>
                  <h2
                    id="inquiry-dialog-title"
                    className="font-display mt-2 text-[1.55rem] font-extrabold uppercase tracking-tight text-ink sm:text-2xl"
                  >
                    Get a quote
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                    Fill the form — your query is saved to the Octagen admin inbox for follow-up.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeInquiry}
                  aria-label="Close"
                  data-cursor="CLOSE"
                  className="absolute top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center rounded-[10px] border border-line bg-white text-ink transition-colors hover:border-lm-red hover:bg-lm-red hover:text-white sm:top-5 sm:right-5"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
                <InquiryForm
                  key={`inquiry-${defaults?.type || 'GENERAL'}-${String(open)}`}
                  defaults={defaults}
                  compact
                  submitLabel="Send Inquiry"
                  onSuccess={() => {
                    window.setTimeout(closeInquiry, 1200)
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </InquiryContext.Provider>
  )
}
