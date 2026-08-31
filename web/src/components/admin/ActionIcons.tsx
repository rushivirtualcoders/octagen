import Link from 'next/link'

function iconButtonClass(tone: 'default' | 'danger' = 'default') {
  return tone === 'danger'
    ? 'inline-flex h-8 w-8 items-center justify-center rounded-md border border-lm-red/20 bg-lm-red/5 text-lm-red transition hover:bg-lm-red/10'
    : 'inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-lm-blue transition hover:border-lm-blue/40 hover:bg-lm-blue/5'
}

export function EditIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}

export function OpenIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function TrashIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  )
}

export function ActionIconLink({
  href,
  label,
  variant = 'edit',
}: {
  href: string
  label: string
  variant?: 'edit' | 'open'
}) {
  return (
    <Link href={href} aria-label={label} title={label} className={iconButtonClass('default')}>
      {variant === 'open' ? <OpenIcon /> : <EditIcon />}
    </Link>
  )
}

export { iconButtonClass }
