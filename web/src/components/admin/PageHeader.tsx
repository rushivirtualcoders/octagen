import Link from 'next/link'

export function BackLink({ href, label = 'Back' }: { href: string; label?: string }) {
  return (
    <Link href={href} className="tech-label mb-4 inline-flex items-center gap-2 text-lm-orange hover:text-ink">
      <span aria-hidden>←</span> {label}
    </Link>
  )
}

export function PageHeader({
  eyebrow,
  title,
  backHref,
  backLabel,
  action,
}: {
  eyebrow: string
  title: string
  backHref?: string
  backLabel?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-8">
      {backHref ? <BackLink href={backHref} label={backLabel} /> : null}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="tech-label text-lm-red">{eyebrow}</p>
          <h1 className="font-display mt-2 text-3xl font-extrabold uppercase text-ink">{title}</h1>
        </div>
        {action}
      </div>
    </div>
  )
}
