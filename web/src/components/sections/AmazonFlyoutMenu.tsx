'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import type { NavCategory } from './ProductsMenu'

type VehiclePath = 'car' | 'bike'

const VEHICLES: { key: VehiclePath; label: string; hint: string }[] = [
  { key: 'car', label: 'Car', hint: '4-wheeler' },
  { key: 'bike', label: 'Bike', hint: '2-wheeler' },
]

// Explicit solid colours — never inherit or use CSS vars that might resolve to transparent
const C = {
  ink: '#0b1215',
  white: '#ffffff',
  surface: '#f4f7fb',
  red: '#e97e11',
  line: 'rgba(11,18,21,0.10)',
  muted: '#5c6b78',
  redHover: 'rgba(233,126,17,0.07)',
}

function X() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4 shrink-0"
      style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 200ms' }}
      aria-hidden
    >
      <path
        d="M6 3.2 11 8 6 12.8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// A full-height column with header, scrollable body, and footer
function Column({
  bg,
  header,
  footer,
  children,
}: {
  bg: string
  header: React.ReactNode
  footer: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: bg,
        position: 'relative',
      }}
    >
      {/* Header — fixed height */}
      <div
        style={{
          height: '4rem',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${C.line}`,
          backgroundColor: bg,
        }}
      >
        {header}
      </div>

      {/* Scrollable body — scrollbar only on hover/focus (see .flyout-scroll) */}
      <div
        data-lenis-prevent
        className="flyout-scroll"
        tabIndex={0}
        style={{
          flex: '1 1 0',
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehavior: 'contain',
          backgroundColor: bg,
          outline: 'none',
        }}
      >
        {children}
      </div>

      {/* Footer — fixed height */}
      <div
        style={{
          flexShrink: 0,
          borderTop: `1px solid ${C.line}`,
          padding: '0.875rem 1.5rem',
          backgroundColor: bg,
        }}
      >
        {footer}
      </div>
    </div>
  )
}

function firstExpandableSlug(items: NavCategory[]) {
  return items.find((c) => (c.subcategories?.length ?? 0) > 0)?.slug ?? null
}

export default function AmazonFlyoutMenu({
  categories,
  onNavigate,
  onClose,
}: {
  categories: NavCategory[]
  onNavigate: () => void
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)
  const [openVehicle, setOpenVehicle] = useState<VehiclePath | null>('car')
  const [openCatSlug, setOpenCatSlug] = useState<string | null>(() =>
    firstExpandableSlug(categories.filter((c) => c.path === 'car')),
  )

  const catItems = useMemo(
    () => (openVehicle ? categories.filter((c) => c.path === openVehicle) : []),
    [categories, openVehicle],
  )
  const openCat = catItems.find((c) => c.slug === openCatSlug) ?? null
  const subs = openCat?.subcategories ?? []

  useEffect(() => { setMounted(true) }, [])

  // Price lists only nest under Engine Oils — auto-open that first group
  useEffect(() => {
    if (!openVehicle) {
      setOpenCatSlug(null)
      return
    }
    setOpenCatSlug(firstExpandableSlug(categories.filter((c) => c.path === openVehicle)))
  }, [openVehicle, categories])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('octagen:lenis', { detail: { stop: true } }))
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (openCatSlug) { setOpenCatSlug(null); return }
      onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.dispatchEvent(new CustomEvent('octagen:lenis', { detail: { stop: false } }))
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose, openCatSlug])

  // Width must match visible columns only — leftover width showed as empty white strip
  const showSubs = Boolean(openVehicle && openCat && subs.length > 0)
  const drawerW = !openVehicle ? '14rem' : showSubs ? 'min(96vw,56rem)' : '36rem'

  if (!mounted) return null

  return createPortal(
    /* Root overlay — fully opaque dark curtain */
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
      }}
    >
      {/* Solid opaque backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(11,18,21,0.82)',
          border: 'none',
          cursor: 'pointer',
        }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shop by vehicle"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: drawerW,
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          maxHeight: '100dvh',
          overflow: 'hidden',
          backgroundColor: C.white,
          boxShadow: '16px 0 48px rgba(11,18,21,0.28)',
          transition: 'width 200ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* ── Col 1: Car / Bike rail ── */}
        <div
          style={{
            width: '14rem',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: C.ink,
            color: C.white,
          }}
        >
          {/* Rail header */}
          <div
            style={{
              height: '4rem',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1.25rem',
              borderBottom: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-tech)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              Shop
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '0.625rem',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.75)',
                cursor: 'pointer',
                transition: 'background 150ms, border-color 150ms',
              }}
            >
              <X />
            </button>
          </div>

          {/* Vehicle buttons */}
          <nav style={{ flex: '1 1 0', padding: '0.75rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {VEHICLES.map((v) => {
              const active = openVehicle === v.key
              return (
                <button
                  key={v.key}
                  type="button"
                  aria-expanded={active}
                  onClick={() => setOpenVehicle((cur) => (cur === v.key ? null : v.key))}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    padding: '1.125rem 1rem',
                    borderRadius: '0.75rem',
                    background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 150ms',
                  }}
                >
                  {active && (
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        bottom: '0.75rem',
                        left: 0,
                        width: '3px',
                        borderRadius: '999px',
                        backgroundColor: C.red,
                      }}
                    />
                  )}
                  <span
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      lineHeight: 1,
                      fontWeight: 800,
                      letterSpacing: '-0.01em',
                      textTransform: 'uppercase',
                      color: C.white,
                    }}
                  >
                    {v.label}
                    <span style={{ color: active ? C.red : 'rgba(255,255,255,0.30)' }}>
                      <Caret open={active} />
                    </span>
                  </span>
                  <span
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: active ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {active ? 'Click to close' : v.hint}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Rail footer */}
          <div
            style={{
              flexShrink: 0,
              borderTop: '1px solid rgba(255,255,255,0.10)',
              padding: '0.875rem 1.25rem',
            }}
          >
            <span
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.30)',
              }}
            >
              LIQUI MOLY · India
            </span>
          </div>
        </div>

        {/* ── Col 2: Categories ── */}
        {openVehicle ? (
          <div
            style={{
              width: 'min(100%, 22rem)',
              flexShrink: 0,
              height: '100%',
              borderRight: `1px solid ${C.line}`,
              backgroundColor: C.white,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Column
              bg={C.white}
              header={
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 1.5rem',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-tech)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        color: C.red,
                        marginBottom: '0.25rem',
                      }}
                    >
                      Categories
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        lineHeight: 1,
                        fontWeight: 800,
                        letterSpacing: '-0.01em',
                        textTransform: 'uppercase',
                        color: C.ink,
                      }}
                    >
                      {openVehicle === 'car' ? 'Car' : 'Bike'}
                    </p>
                  </div>
                  {!openCat && (
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close menu"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.25rem',
                        height: '2.25rem',
                        borderRadius: '0.625rem',
                        border: `1px solid ${C.line}`,
                        background: C.white,
                        color: C.ink,
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <X />
                    </button>
                  )}
                </div>
              }
              footer={
                <Link
                  href={`/products/${openVehicle}`}
                  onClick={onNavigate}
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: C.red,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  All {openVehicle === 'car' ? 'car' : 'bike'} products →
                </Link>
              }
            >
              <div style={{ padding: '0.5rem' }}>
                {catItems.length === 0 ? (
                  <p style={{ padding: '3rem 1rem', fontSize: '0.875rem', color: C.muted }}>
                    No categories yet.
                  </p>
                ) : (
                  catItems.map((cat) => {
                    const hasSubs = (cat.subcategories?.length ?? 0) > 0
                    const active = openCatSlug === cat.slug
                    const href = `/products/${openVehicle}?category=${encodeURIComponent(cat.slug)}`

                    const rowStyle: React.CSSProperties = {
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.625rem',
                      backgroundColor: active ? 'rgba(233,126,17,0.08)' : 'transparent',
                      color: active ? C.red : C.ink,
                      cursor: 'pointer',
                      textAlign: 'left',
                      border: 'none',
                      textDecoration: 'none',
                      transition: 'background 150ms, color 150ms',
                    }

                    const bar = (
                      <span
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: '0.75rem',
                          bottom: '0.75rem',
                          left: 0,
                          width: '3px',
                          borderRadius: '999px',
                          backgroundColor: C.red,
                          opacity: active ? 1 : 0,
                          transition: 'opacity 150ms',
                        }}
                      />
                    )

                    const nameEl = (
                      <span style={{ flex: 1, minWidth: 0, fontSize: '0.9375rem', lineHeight: 1.4, fontWeight: 500 }}>
                        {cat.name}
                      </span>
                    )

                    // Nested only under Engine Oils in the April 2026 lists — expand, don't navigate
                    if (hasSubs) {
                      return (
                        <button
                          key={cat.slug}
                          type="button"
                          aria-expanded={active}
                          onClick={() => setOpenCatSlug((cur) => (cur === cat.slug ? null : cat.slug))}
                          style={rowStyle}
                        >
                          {bar}
                          {nameEl}
                          <span style={{ flexShrink: 0, marginTop: '0.125rem', color: active ? C.red : C.muted }}>
                            <Caret open={active} />
                          </span>
                        </button>
                      )
                    }

                    return (
                      <Link key={cat.slug} href={href} onClick={onNavigate} style={rowStyle}>
                        {bar}
                        {nameEl}
                      </Link>
                    )
                  })
                )}
              </div>
            </Column>
          </div>
        ) : null}

        {/* ── Col 3: Subcategories ── */}
        {showSubs ? (
          <div style={{ flex: '1 1 0', height: '100%', backgroundColor: C.surface, display: 'flex', flexDirection: 'column' }}>
            <Column
              bg={C.surface}
              header={
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 1.5rem',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-tech)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        color: C.red,
                        marginBottom: '0.25rem',
                      }}
                    >
                      Subcategories
                    </p>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: C.ink,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {openCat.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenCatSlug(null)}
                    aria-label="Close subcategories"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2.25rem',
                      height: '2.25rem',
                      borderRadius: '0.625rem',
                      border: `1px solid ${C.line}`,
                      background: C.white,
                      color: C.ink,
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <X />
                  </button>
                </div>
              }
              footer={
                <Link
                  href={`/products/${openVehicle}?category=${openCat.slug}`}
                  onClick={onNavigate}
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: C.red,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  All in {openCat.name} →
                </Link>
              }
            >
              <div style={{ padding: '0.5rem' }}>
                {subs.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/products/${openVehicle}?category=${openCat.slug}&subcategory=${sub.slug}`}
                    onClick={onNavigate}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.625rem',
                      backgroundColor: 'transparent',
                      color: C.ink,
                      textDecoration: 'none',
                      transition: 'background 150ms, color 150ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = C.redHover
                      e.currentTarget.style.color = C.red
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = C.ink
                    }}
                  >
                    <span style={{ flex: 1, minWidth: 0, fontSize: '0.9375rem', lineHeight: 1.4, fontWeight: 500 }}>
                      {sub.name}
                    </span>
                  </Link>
                ))}
              </div>
            </Column>
          </div>
        ) : null}
      </aside>
    </div>,
    document.body,
  )
}
