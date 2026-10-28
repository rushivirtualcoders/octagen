'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ASSETS, DISTRIBUTOR, NAV_LINKS } from '../../lib/constants'
import { EASE } from '../../lib/animations'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SiteSearch from '../ui/SiteSearch'
import { type NavCategory } from './ProductsMenu'
import AmazonFlyoutMenu from './AmazonFlyoutMenu'
import type { CatalogueProduct } from '@/lib/catalogue'

export type { NavCategory, NavSubcategory } from './ProductsMenu'

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

/** Links that don't include Activities (flyout is now on Products) */
const DESKTOP_NAV = NAV_LINKS.filter((l) => l.label !== 'Activities')

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
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [flyoutOpen, setFlyoutOpen] = useState(false)

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
    setMobileOpen(false)
    setFlyoutOpen(false)
  }, [pathname])

  function closeMenus() {
    setMobileOpen(false)
    setFlyoutOpen(false)
  }

  const productsActive = flyoutOpen || Boolean(pathname?.startsWith('/products'))

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b border-line bg-white transition-shadow duration-300 ${
        scrolled ? 'py-2 shadow-[0_4px_20px_rgba(11,18,21,0.05)]' : 'py-2.5'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-5 xl:gap-6 lg:flex">
          {DESKTOP_NAV.map((link) =>
            link.label === 'Products' ? (
              <li key={link.href}>
                <button
                  type="button"
                  aria-expanded={flyoutOpen}
                  aria-haspopup="dialog"
                  onClick={() => setFlyoutOpen((v) => !v)}
                  className={`inline-flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 hover:text-lm-blue ${
                    productsActive ? 'text-lm-red' : 'text-[#0B1215]'
                  }`}
                >
                  Products
                  <MenuChevron open={flyoutOpen} />
                </button>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenus}
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

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <SiteSearch products={searchProducts} activities={searchActivities} />
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1"
          >
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${mobileOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${mobileOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Left flyout — Products click (desktop) */}
      {flyoutOpen ? (
        <AmazonFlyoutMenu
          categories={categories}
          onNavigate={closeMenus}
          onClose={() => setFlyoutOpen(false)}
        />
      ) : null}

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-[-1] flex h-screen flex-col overflow-y-auto bg-white px-5 pt-24 pb-10 lg:hidden"
          >
            <ul className="space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.06 }}
                >
                  {link.label === 'Products' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false)
                        setFlyoutOpen(true)
                      }}
                      className="font-display block py-2 text-left text-4xl font-extrabold tracking-tight text-[#0B1215] uppercase"
                    >
                      Products
                    </button>
                  ) : link.label === 'Activities' ? null : (
                    <Link
                      href={link.href}
                      onClick={closeMenus}
                      className="font-display block py-2 text-4xl font-extrabold tracking-tight text-[#0B1215] uppercase"
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
