export function StatusBadge({
  tone = 'neutral',
  children,
}: {
  tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  children: React.ReactNode
}) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    warning: 'bg-amber-50 text-amber-800 ring-amber-200',
    danger: 'bg-lm-red/10 text-lm-red ring-lm-red/20',
    info: 'bg-lm-orange/10 text-lm-orange ring-lm-orange/20',
    neutral: 'bg-surface text-muted ring-line',
  }[tone]

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${styles}`}>
      {children}
    </span>
  )
}

export function PublishStatus({ published }: { published: boolean }) {
  return <StatusBadge tone={published ? 'success' : 'neutral'}>{published ? 'Published' : 'Draft'}</StatusBadge>
}

export function InquiryStatusBadge({ status }: { status: string }) {
  const tone =
    status === 'NEW'
      ? 'danger'
      : status === 'READ'
        ? 'info'
        : status === 'REPLIED'
          ? 'success'
          : 'neutral'

  const label =
    status === 'NEW'
      ? 'New'
      : status === 'READ'
        ? 'Read'
        : status === 'REPLIED'
          ? 'Replied'
          : status === 'CLOSED'
            ? 'Closed'
            : status

  return <StatusBadge tone={tone}>{label}</StatusBadge>
}

export function FeaturedBadge({ featured }: { featured: boolean }) {
  if (!featured) return null
  return <StatusBadge tone="warning">Featured</StatusBadge>
}
