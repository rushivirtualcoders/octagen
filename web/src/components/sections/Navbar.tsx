'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ASSETS, DISTRIBUTOR, NAV_LINKS } from '../../lib/constants'
import { EASE } from '../../lib/animations'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SiteSearch from '../ui/SiteSearch'
import type { CatalogueProduct, VehiclePath } from '@/lib/catalogue'

export type NavCategory = { slug: string; name: string; path: VehiclePath; count?: number }

type ProductMenu = 'pick' | VehiclePath

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

function VehicleChoice({
  path,
  count,
  onPick,
}: {
  path: VehiclePath
  count: number
  onPick: (path: VehiclePath) => void
}) {
  const label = path === 'car' ? 'Car' : 'Bike'
  return (
    <button
      type="button"
      onClick={() => onPick(path)}
      className="group rounded-2xl border border-line bg-white p-5 text-left transition-colors hover:border-ink"
    >
      <span className="tech-label text-lm-red">Products</span>
      <span className="mt-2 flex items-center justify-between gap-3">
        <span className="text-lg font-semibold text-ink">{label}</span>
        <span aria-hidden className="text-ink transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
      <span className="mt-1 block text-sm text-muted">
        {count} categor{count === 1 ? 'y' : 'ies'}
      </span>
    </button>
  )
}

function ProductCategories({
  path,
  categories,
  activeSlug,
  onNavigate,
  onBack,
  onPick,
  onSelect,
}: {
  path: VehiclePath
  categories: NavCategory[]
  activeSlug: string | null
  onNavigate: () => void
  onBack: () => void
  onPick: (path: VehiclePath) => void
  onSelect: (slug: string) => void
}) {
  const items = categories.filter((category) => category.path === path)
  const label = path === 'car' ? 'Car' : 'Bike'

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-ink underline underline-offset-2"
        >
          ← Car and bike
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPick('car')}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              path === 'car' ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink'
            }`}
          >
            Car
          </button>
          <button
            type="button"
            onClick={() => onPick('bike')}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              path === 'bike' ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink'
            }`}
          >
            Bike
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{label} categories</p>
        <Link
          href={`/products/${path}`}
          onClick={onNavigate}
          className="text-sm font-semibold text-lm-red"
        >
          All {label.toLowerCase()} products
        </Link>
      </div>
      <ul className="mt-2 grid max-h-[min(22rem,55vh)] gap-1 overflow-y-auto overscroll-contain sm:grid-cols-2 xl:grid-cols-3">
        {items.map((category) => {
          const active = activeSlug === category.slug
          return (
            <li key={category.slug}>
              <Link
                href={`/products/${path}?category=${category.slug}`}
                onClick={() => {
                  onSelect(category.slug)
                  onNavigate()
                }}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm ${
                  active ? 'bg-surface font-semibold text-ink' : 'text-ink hover:bg-surface'
                }`}
              >
                <span className="leading-snug">{category.name}</span>
                {typeof category.count === 'number' ? (
                  <span className={`shrink-0 text-xs ${active ? 'text-ink' : 'text-muted'}`}>
                    {category.count}
                  </span>
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>
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
  const carCount = categories.filter((category) => category.path === 'car').length
  const bikeCount = categories.filter((category) => category.path === 'bike').length

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
                  onClick={() => setProductMenu((current) => (current ? null : 'pick'))}
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
          className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_24px_60px_rgba(11,18,21,0.08)] lg:block"
        >
          <div className="mx-auto max-w-[1400px] px-8 py-6">
            {productMenu === 'pick' ? (
              <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
                <VehicleChoice path="car" count={carCount} onPick={setProductMenu} />
                <VehicleChoice path="bike" count={bikeCount} onPick={setProductMenu} />
              </div>
            ) : (
              <ProductCategories
                path={productMenu}
                categories={categories}
                activeSlug={pathname?.startsWith(`/products/${productMenu}`) ? activeSlug : null}
                onBack={() => setProductMenu('pick')}
                onPick={setProductMenu}
                onSelect={setActiveSlug}
                onNavigate={closeMenus}
              />
            )}
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
                        onClick={() => setProductMenu((current) => (current ? null : 'pick'))}
                        className="font-display block py-2 text-left text-5xl font-extrabold tracking-tight text-[#0B1215] uppercase"
                      >
                        Products
                      </button>
                      {productMenu === 'pick' ? (
                        <div className="mt-3 grid gap-3">
                          <VehicleChoice path="car" count={carCount} onPick={setProductMenu} />
                          <VehicleChoice path="bike" count={bikeCount} onPick={setProductMenu} />
                        </div>
                      ) : null}
                      {productMenu === 'car' || productMenu === 'bike' ? (
                        <div className="mt-3">
                          <ProductCategories
                            path={productMenu}
                            categories={categories}
                            activeSlug={pathname?.startsWith(`/products/${productMenu}`) ? activeSlug : null}
                            onBack={() => setProductMenu('pick')}
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
