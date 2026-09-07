'use client'

import type { ReactNode } from 'react'
import { useInquiry } from './InquiryProvider'

type Props = {
  children: ReactNode
  className?: string
  subject?: string
  type?: 'GENERAL' | 'WORKSHOP' | 'BULK' | 'PRODUCT_QUOTE'
  onOpen?: () => void
}

/** Opens the inquiry popup — use for Get Quote / Submit Inquiry CTAs. */
export default function InquiryTrigger({ children, className = '', subject, type, onOpen }: Props) {
  const { openInquiry } = useInquiry()

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onOpen?.()
        openInquiry({ subject, type })
      }}
    >
      {children}
    </button>
  )
}
