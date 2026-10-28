'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ASSETS } from '@/lib/constants'

export type NavSubcategory = { slug: string; name: string; count: number }

export type NavCategory = {
  slug: string
  name: string
  path: 'car' | 'bike'
  count?: number
  subcategories?: NavSubcategory[]
}

const VEHICLES = [
  {
    key: 'car' as const,
    href: '/products/car',
    label: 'Car',
    title: 'Car & recreational',
    text: 'Motor oils, additives, fluids and car care for every drive.',
    image: '/assets/images/lm/black-falcon-lg.jpg',
  },
  {
    key: 'bike' as const,
    href: '/products/bike',
    label: 'Bike',
    title: 'Motorcycle',
    text: 'Dedicated motorcycle oils and care for road and performance riding.',
    image: '/assets/images/lm/mxgp.jpg',
  },
]

/** Castrol-style Products panel — Bike open by default; View all expands categories in-menu */
export default function ProductsMenu({
  categories = [],
  pathname,
  onNavigate,
}: {
  categories?: NavCategory[]
  pathname?: string | null
  onNavigate: () => void
}) {
  // Bike categories open by default; Car closed
  const [openKey, setOpenKey] = useState<'car' | 'bike'>('bike')

  function toggleVehicle(key: 'car' | 'bike') {
    setOpenKey(key)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_20px_48px_rgba(11,18,21,0.12)]">
      <div className="flex items-center justify-between bg-ink px-5 py-3">
        <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-white uppercase">Products</p>
        <span className="text-[0.65rem] tracking-wide text-white/45 uppercase">LIQUI MOLY · India</span>
      </div>

      <div className="grid gap-0 sm:grid-cols-2">
        {VEHICLES.map((vehicle, index) => {
          const isOpen = openKey === vehicle.key
          const links = categories.filter((category) => category.path === vehicle.key)

          return (
            <div
              key={vehicle.key}
              className={`flex flex-col ${index === 0 ? 'sm:border-r sm:border-line' : ''}`}
            >
              <button
                type="button"
                onClick={() => toggleVehicle(vehicle.key)}
                aria-expanded={isOpen}
                className="group relative block min-h-[9.5rem] w-full overflow-hidden text-left"
              >
                <img
                  src={vehicle.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
                <div className="relative flex h-full min-h-[9.5rem] flex-col justify-end p-5">
                  <p className="tech-label text-lm-red">{vehicle.label}</p>
                  <p className="font-display mt-1 text-xl font-extrabold tracking-tight text-white uppercase">
                    {vehicle.title}
                  </p>
                  <p className="mt-1.5 max-w-[16rem] text-xs leading-relaxed text-white/70">{vehicle.text}</p>
                  <span
                    className={`mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${
                      isOpen ? 'text-lm-red' : 'text-white'
                    }`}
                  >
                    {isOpen ? 'Categories open' : 'Explore categories'}
                    <span aria-hidden>{isOpen ? '▾' : '→'}</span>
                  </span>
                </div>
              </button>

              {isOpen ? (
                <div className="flex flex-1 flex-col bg-surface/60">
                  {links.length > 0 ? (
                    <ul className="flex max-h-[14rem] flex-col gap-0.5 overflow-y-auto overscroll-contain px-3 py-3">
                      {links.map((category) => (
                        <li key={category.slug}>
                          <Link
                            href={`/products/${vehicle.key}?category=${category.slug}`}
                            onClick={onNavigate}
                            className={`flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition hover:bg-white hover:text-lm-red ${
                              pathname?.includes(`category=${category.slug}`)
                                ? 'bg-white font-semibold text-lm-red'
                                : 'text-ink'
                            }`}
                          >
                            <span className="truncate">{category.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-5 py-4 text-sm text-muted">No categories yet.</p>
                  )}

                  <div className="mt-auto border-t border-line/60 px-3 py-2.5">
                    <p className="px-2.5 text-[0.7rem] font-semibold tracking-wide text-lm-red uppercase">
                      {vehicle.label} categories
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 items-center bg-surface/40 px-3 py-3">
                  <button
                    type="button"
                    onClick={() => toggleVehicle(vehicle.key)}
                    className="w-full rounded-md px-2.5 py-2.5 text-left text-xs font-semibold text-lm-red transition hover:bg-white"
                  >
                    View all {vehicle.label.toLowerCase()} products →
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between border-t border-line bg-white px-5 py-2.5">
        <p className="text-[0.7rem] text-muted">Exclusive authorized national distributor</p>
        <img src={ASSETS.octagenLogo} alt="" className="h-4 w-auto opacity-70" />
      </div>
    </div>
  )
}
