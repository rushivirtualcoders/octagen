'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  searchCatalogue,
  type CatalogueProduct,
} from '@/lib/catalogue'
import { EASE } from '@/lib/animations'

type ActivityHit = { id: string; title: string; text?: string; href: string }

function filterLocal(
  query: string,
  products: CatalogueProduct[],
  activities: ActivityHit[],
) {
  const q = query.trim().toLowerCase()
  if (!q) return { products: [] as CatalogueProduct[], activities: [] as ActivityHit[] }
  return {
    products: products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categorySlug.includes(q) ||
        p.path.includes(q),
    ),
    activities: activities.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.text ?? '').toLowerCase().includes(q),
    ),
  }
}

const QUICK_LINKS = [
  { label: 'Car products', href: '/products/car' },
  { label: 'Bike products', href: '/products/bike' },
  { label: 'Marketing', href: '/#marketing' },
  { label: 'Activities', href: '/#activities' },
  { label: 'Most loved', href: '/#most-loved' },
]

export default function SiteSearch({
  products,
  activities,
  expanded = false,
}: {
  products?: CatalogueProduct[]
  activities?: ActivityHit[]
  expanded?: boolean
} = {}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const catalogue = products ?? []
  const activityList = activities ?? []

  const results = useMemo(() => {
    if (products || activities) {
      return filterLocal(query, catalogue, activityList)
    }
    return searchCatalogue(query)
  }, [query, products, activities, catalogue, activityList])

  const idleSuggestions = useMemo(() => {
    const loved = catalogue.filter((p) => p.loved).slice(0, 4)
    if (loved.length > 0) return loved
    return catalogue.slice(0, 4)
  }, [catalogue])

  const close = () => {
    setOpen(false)
    setQuery('')
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const hasQuery = Boolean(query.trim())
  const hasHits = results.products.length > 0 || results.activities.length > 0

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          expanded
            ? 'flex h-9 min-w-[11.5rem] items-center gap-2 border border-line bg-[#f6f7f8] px-3 text-[0.68rem] font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:border-lm-red hover:text-lm-red'
            : 'flex size-9 items-center justify-center border border-line text-ink transition-colors hover:border-lm-red hover:text-lm-red'
        }
        aria-label="Search products and activities"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        </svg>
        {expanded ? <span>Search</span> : null}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-start justify-center bg-[#0B1215]/55 px-4 pt-[10vh] backdrop-blur-[2px] sm:pt-[14vh]"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
          >
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="w-full max-w-lg overflow-hidden border border-line bg-white shadow-[0_24px_80px_rgba(11,18,21,0.28)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0 text-lm-red"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, car, bike…"
                  className="w-full bg-transparent py-3.5 text-[0.95rem] text-ink outline-none placeholder:text-muted/70"
                  aria-label="Search query"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="tech-label shrink-0 text-muted hover:text-ink"
                  >
                    Clear
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={close}
                    className="tech-label shrink-0 text-muted hover:text-ink"
                  >
                    Esc
                  </button>
                )}
              </div>

              <div className="max-h-[min(420px,55vh)] overflow-y-auto">
                {!hasQuery && (
                  <div className="p-4">
                    <p className="tech-label text-muted">Browse</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {QUICK_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={close}
                          className="tech-label border border-line px-3 py-2 text-ink transition-colors hover:border-lm-red hover:text-lm-red"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    {idleSuggestions.length > 0 && (
                      <>
                        <p className="tech-label mt-5 text-muted">Popular</p>
                        <ul className="mt-2 divide-y divide-line border border-line">
                          {idleSuggestions.map((p) => (
                            <li key={p.id}>
                              <a
                                href={p.liquiMolyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={close}
                                className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-surface"
                              >
                                <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden bg-white">
                                  <img
                                    src={p.image}
                                    alt=""
                                    className="max-h-9 max-w-9 object-contain"
                                  />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-sm font-semibold text-ink">
                                    {p.name}
                                  </span>
                                  <span className="tech-label mt-0.5 block text-muted capitalize">
                                    {p.path}
                                  </span>
                                </span>
                                <span className="tech-label shrink-0 text-lm-red">View →</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}

                {hasQuery && !hasHits && (
                  <p className="px-4 py-6 text-sm text-muted">
                    No matches for “{query.trim()}”. Try car, bike, or a product name.
                  </p>
                )}

                {hasQuery && results.products.length > 0 && (
                  <div className="border-b border-line p-2">
                    <p className="tech-label px-2 py-2 text-muted">Products</p>
                    <ul>
                      {results.products.slice(0, 8).map((p) => (
                        <li key={p.id}>
                          <a
                            href={p.liquiMolyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={close}
                            className="flex items-center gap-3 px-2 py-2 transition-colors hover:bg-surface"
                          >
                            <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden border border-line bg-white">
                              <img
                                src={p.image}
                                alt=""
                                className="max-h-9 max-w-9 object-contain"
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-ink">
                                {p.name}
                              </span>
                              <span className="mt-0.5 block truncate text-xs text-muted capitalize">
                                {p.path} · {p.categorySlug.replace(/-/g, ' ')}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {hasQuery && results.activities.length > 0 && (
                  <div className="p-2">
                    <p className="tech-label px-2 py-2 text-muted">Activities</p>
                    <ul>
                      {results.activities.map((a) => (
                        <li key={a.id}>
                          <a
                            href={a.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={close}
                            className="block px-2 py-2.5 transition-colors hover:bg-surface"
                          >
                            <span className="text-sm font-semibold text-ink">{a.title}</span>
                            <span className="mt-0.5 block text-xs text-muted">Marketing activity</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
