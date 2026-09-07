'use client'

import type { ReactNode } from 'react'
import { useInquiry } from '../inquiry/InquiryProvider'

type Props = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost' | 'blue' | 'white'
  className?: string
  dataCursor?: string
  /** Opens the inquiry popup instead of navigating */
  inquiry?: boolean
  inquirySubject?: string
  inquiryType?: 'GENERAL' | 'WORKSHOP' | 'BULK' | 'PRODUCT_QUOTE'
}

export default function MagneticButton({
  children,
  href = '#',
  variant = 'primary',
  className = '',
  dataCursor,
  inquiry = false,
  inquirySubject,
  inquiryType,
}: Props) {
  const { openInquiry } = useInquiry()

  const styles =
    variant === 'primary'
      ? 'bg-lm-red text-white hover:bg-[#c40017]'
      : variant === 'blue'
        ? 'border border-lm-blue bg-transparent text-ink hover:bg-lm-blue/10'
        : variant === 'white'
          ? 'bg-white text-ink hover:bg-surface'
          : 'border border-ink/20 text-ink hover:border-lm-blue hover:text-lm-blue'

  const classes = `site-btn px-8 py-4 text-[0.7rem] font-semibold tracking-[0.24em] uppercase ${styles} ${className}`

  if (inquiry) {
    return (
      <button
        type="button"
        data-cursor={dataCursor}
        className={classes}
        onClick={() => openInquiry({ subject: inquirySubject, type: inquiryType })}
      >
        {children}
      </button>
    )
  }

  return (
    <a href={href} data-cursor={dataCursor} className={classes}>
      {children}
    </a>
  )
}
