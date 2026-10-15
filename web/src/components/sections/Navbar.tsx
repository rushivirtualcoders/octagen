'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ASSETS, DISTRIBUTOR, NAV_LINKS } from '../../lib/constants'
import { EASE } from '../../lib/animations'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SiteSearch from '../ui/SiteSearch'
import type { CatalogueProduct, VehiclePath } from '@/lib/catalogue'

export type NavSubcategory = { slug: string; name: string; count: number }

export type NavCategory = {
  slug: string
  name: string
  path: VehiclePath
  count?: number
  subcategories?: NavSubcategory[]
}

type ProductMenu = VehiclePath

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${DISTRIBUTOR} home`}>
      <img src={ASSETS.octagenLogo} alt={DISTRIBUTOR} className="h-6 w-auto sm:h-7" />
    </Link>
  )
}

function MenuChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M2.2 4.4 6 8.1 9.8 4.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function VehicleCard({
  label,
  hint,
  active,
  onClick,
}: {
  label: string
  hint: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-2xl border bg-white px-4 py-4 text-left transition-all ${
        active
          ? 'border-[#f0c89a] shadow-[0_10px_28px_rgba(233,126,17,0.16)]'
          : 'border-transparent shadow-[0_1px_2px_rgba(11,18,21,0.04)] hover:border-[#f0c89a]'
      }`}
    >
      <span className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-lm-red' : 'bg-surface-2'}`} />
        <span className={`text-xs font-medium ${active ? 'text-lm-red' : 'text-muted'}`}>
          {active ? 'Selected' : 'Choose'}
        </span>
      </span>
      <span className="mt-2 block font-display text-2xl leading-none font-extrabold tracking-tight text-ink uppercase">{label}</span>
      <span className="mt-2 block text-xs leading-snug text-muted">{hint}</span>
    </button>
  )
}

function ProductCategories({
  path,
  categories,
  activeSlug,
  onNavigate,
  onPick,
  onSelect,
}: {
  path: VehiclePath
  categories: NavCategory[]
  activeSlug: string | null
  onNavigate: () => void
  onPick: (path: VehiclePath) => void
  onSelect: (slug: string) => void
}) {
  const items = categories.filter((category) => category.path === path)
  const label = path === 'car' ? 'Car' : 'Bike'
  const [focus, setFocus] = useState<string | null>(activeSlug ?? items[0]?.slug ?? null)
  const focused = items.find((category) => category.slug === focus) ?? null
  const subs = focused?.subcategories ?? []

  useEffect(() => {
    const next = categories.filter((category) => category.path === path)
    setFocus(
      activeSlug && next.some((category) => category.slug === activeSlug) ? activeSlug : next[0]?.slug ?? null,
    )
  }, [activeSlug, categories, path])

  return (
    <div className="product-step-menu">
      <style>{`
        .product-step-subs { display: none; }
        @media (min-width: 64rem) {
          .product-step-menu { display: grid; grid-template-columns: 200px minmax(0, 1fr) minmax(0, 1fr); gap: 12px; align-items: start; }
          .product-step-cards { display: flex; flex-direction: column; }
          .product-step-subs { display: block; }
        }
      `}</style>
      <div className="product-step-cards grid grid-cols-2 gap-2">
        <VehicleCard
          label="Car"
          hint="Oils, additives and care"
          active={path === 'car'}
          onClick={() => onPick('car')}
        />
        <VehicleCard
          label="Bike"
          hint="Motorcycle oils and care"
          active={path === 'bike'}
          onClick={() => onPick('bike')}
        />
      </div>

      <div className="min-w-0 rounded-2xl bg-white p-2 shadow-[0_8px_30px_rgba(11,18,21,0.05)]">
        <div className="flex items-center justify-between gap-3 px-3 py-2">
          <p className="text-xs font-medium text-muted">Categories</p>
          <Link href={`/products/${path}`} onClick={onNavigate} className="text-xs font-semibold text-lm-red">
            All {label.toLowerCase()} products
          </Link>
        </div>
        <ul data-lenis-prevent style={{ maxHeight: 'min(22rem, 55vh)' }} className="overflow-y-auto overscroll-contain">
          {items.map((category) => {
            const open = focused?.slug === category.slug
            const nested = category.subcategories ?? []
            return (
              <li key={category.slug} onMouseEnter={() => setFocus(category.slug)}>
                <div className="flex items-center">
                  <Link
                    href={`/products/${path}?category=${category.slug}`}
                    onClick={() => {
                      onSelect(category.slug)
                      onNavigate()
                    }}
                    aria-current={activeSlug === category.slug ? 'page' : undefined}
                    style={open ? { backgroundColor: '#fff4e8' } : undefined}
                    className={`flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      open ? 'font-semibold text-ink' : 'text-ink hover:bg-surface'
                    }`}
                  >
                    <span className="leading-snug">{category.name}</span>
                    <span className="flex shrink-0 items-center gap-2">
                      {typeof category.count === 'number' ? (
                        <span className={`rounded-full px-2 py-0.5 text-[11px] ${open ? 'bg-white text-lm-red' : 'bg-surface text-muted'}`}>
                          {category.count}
                        </span>
                      ) : null}
                      {nested.length > 0 ? (
                        <svg viewBox="0 0 12 12" aria-hidden className={`hidden h-3 w-3 lg:block ${open ? 'text-lm-red' : 'text-muted'}`}>
                          <path d="M4.2 2.2 8 6 4.2 9.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
                        </svg>
                      ) : null}
                    </span>
                  </Link>
                  {nested.length > 0 ? (
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-label={`${open ? 'Hide' : 'Show'} ${category.name} subcategories`}
                      onClick={() => setFocus(open ? null : category.slug)}
                      className="px-3 py-3 text-sm text-ink lg:hidden"
                    >
                      {open ? '−' : '+'}
                    </button>
                  ) : null}
                </div>
                {open && nested.length > 0 ? (
                  <ul className="flex flex-wrap gap-1.5 px-3 pt-1 pb-3 lg:hidden">
                    {nested.map((subcategory) => (
                      <li key={subcategory.slug}>
                        <Link
                          href={`/products/${path}?category=${category.slug}&subcategory=${subcategory.slug}`}
                          onClick={() => {
                            onSelect(category.slug)
                            onNavigate()
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-[#f0c89a] bg-[#fff7ef] px-3 py-1.5 text-sm text-ink"
                        >
                          <span className="leading-snug">{subcategory.name}</span>
                          <span className="text-[11px] text-lm-red">{subcategory.count}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="product-step-subs min-w-0 rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgba(11,18,21,0.05)]">
        <p className="truncate px-1 pb-3 text-sm font-semibold text-ink">
          {focused ? focused.name : 'Subcategories'}
        </p>
        {subs.length > 0 ? (
          <ul data-lenis-prevent style={{ maxHeight: 'min(22rem, 55vh)' }} className="flex flex-wrap content-start gap-2 overflow-y-auto overscroll-contain">
            {subs.map((subcategory) => (
              <li key={subcategory.slug}>
                <Link
                  href={`/products/${path}?category=${focused?.slug}&subcategory=${subcategory.slug}`}
                  onClick={() => {
                    if (focused) onSelect(focused.slug)
                    onNavigate()
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 text-sm text-ink transition-colors hover:border-[#f0c89a] hover:bg-[#fff7ef]"
                >
                  <span className="leading-snug">{subcategory.name}</span>
                  <span className="text-[11px] font-semibold text-lm-red">{subcategory.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-1 py-4 text-sm leading-relaxed text-muted">
            {focused ? `${focused.name} has no extra subcategories.` : 'Choose a category.'}
          </p>
        )}
      </div>
    </div>
  )
}

export default function Navbar({
  searchProducts,
  searchActivities,
  categories = [],
}: {
  searchProducts?: CatalogueProduct[]
  searchActivities?: { id: string; title: string; text?: string; href: string }[]
  categories?: NavCategory[]
} = {}) {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [productMenu, setProductMenu] = useState<ProductMenu | null>(null)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
    setProductMenu(null)
    setActiveSlug(new URLSearchParams(window.location.search).get('category'))
  }, [pathname])

  useEffect(() => {
    if (!productMenu) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProductMenu(null)
    }
    const onPointer = (event: MouseEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return
      setProductMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [productMenu])

  function closeMenus() {
    setOpen(false)
    setProductMenu(null)
  }

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[100] border-b border-line bg-white transition-shadow duration-300 ${
        scrolled ? 'py-2 shadow-[0_4px_20px_rgba(11,18,21,0.05)]' : 'py-2.5'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-5 xl:gap-6 lg:flex">
          {NAV_LINKS.map((link) =>
            link.label === 'Products' ? (
              <li key={link.href}>
                <button
                  type="button"
                  aria-expanded={productMenu !== null}
                  aria-controls="product-menu"
                  onClick={() => setProductMenu((current) => (current ? null : 'car'))}
                  className={`inline-flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 hover:text-lm-blue ${
                    productMenu || pathname?.startsWith('/products') ? 'text-lm-red' : 'text-[#0B1215]'
                  }`}
                >
                  Products
                  <MenuChevron open={productMenu !== null} />
                </button>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setProductMenu(null)}
                  className="text-[0.62rem] font-semibold tracking-[0.16em] text-[#0B1215] uppercase transition-colors duration-300 hover:text-lm-blue"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="hidden items-center lg:flex">
          <SiteSearch expanded products={searchProducts} activities={searchActivities} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <SiteSearch products={searchProducts} activities={searchActivities} />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1"
          >
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {productMenu ? (
        <div
          id="product-menu"
          className="absolute inset-x-0 top-full hidden border-t border-line bg-surface shadow-[0_24px_60px_rgba(11,18,21,0.08)] lg:block"
        >
          <div className="mx-auto max-w-[1400px] px-8 py-6">
            <ProductCategories
              path={productMenu}
              categories={categories}
              activeSlug={pathname?.startsWith(`/products/${productMenu}`) ? activeSlug : null}
              onPick={setProductMenu}
              onSelect={setActiveSlug}
              onNavigate={closeMenus}
            />
          </div>
        </div>
      ) : null}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-[-1] flex h-screen flex-col overflow-y-auto bg-white px-8 pt-24 pb-10 lg:hidden"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.06 }}
                >
                  {link.label === 'Products' ? (
                    <div>
                      <button
                        type="button"
                        aria-expanded={productMenu !== null}
                        onClick={() => setProductMenu((current) => (current ? null : 'car'))}
                        className="font-display block py-2 text-left text-5xl font-extrabold tracking-tight text-[#0B1215] uppercase"
                      >
                        Products
                      </button>
                      {productMenu === 'car' || productMenu === 'bike' ? (
                        <div className="mt-3">
                          <ProductCategories
                            path={productMenu}
                            categories={categories}
                            activeSlug={pathname?.startsWith(`/products/${productMenu}`) ? activeSlug : null}
                            onPick={setProductMenu}
                            onSelect={setActiveSlug}
                            onNavigate={closeMenus}
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMenus}
                      className="font-display block py-2 text-5xl font-extrabold tracking-tight text-[#0B1215] uppercase"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
