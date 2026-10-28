'use client'

export const ADMIN_PAGE_SIZE = 10
export const CATALOGUE_PAGE_SIZE = 12

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const total = items.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize) || 1)
  const safePage = Math.min(Math.max(1, page), pageCount)
  const start = (safePage - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageCount,
    total,
  }
}

export default function Pagination({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
  className = '',
}: {
  page: number
  pageCount: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
  className?: string
}) {
  if (total <= pageSize) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 text-sm text-muted ${className}`}
    >
      <p>
        Showing <span className="font-medium text-ink">{from}</span>–
        <span className="font-medium text-ink">{to}</span> of{' '}
        <span className="font-medium text-ink">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-md border border-line bg-white px-3 py-1.5 font-medium text-ink transition enabled:hover:border-lm-red enabled:hover:text-lm-red disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <span className="min-w-[5.5rem] text-center tabular-nums">
          {page} / {pageCount}
        </span>
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="rounded-md border border-line bg-white px-3 py-1.5 font-medium text-ink transition enabled:hover:border-lm-red enabled:hover:text-lm-red disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
