'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { CatalogueCategory, CatalogueProduct, VehiclePath } from '@/lib/catalogue'
import { PRODUCT_INFORMATION_PDF } from '@/lib/product-sheets'

function toggle(set: Set<string>, value: string) {
  const next = new Set(set)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}

export default function ProductListing({
  path,
  categories,
  products: allProducts,
  initialCategory,
}: {
  path: VehiclePath
  categories: CatalogueCategory[]
  products: CatalogueProduct[]
  initialCategory?: string
}) {
  const startingCategory =
    initialCategory && categories.some((category) => category.slug === initialCategory)
      ? initialCategory
      : null
  const [openSlug, setOpenSlug] = useState<string | null>(startingCategory)
  const [categorySet, setCategorySet] = useState<Set<string>>(() =>
    startingCategory ? new Set([startingCategory]) : new Set(),
  )
  const [subcategorySet, setSubcategorySet] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const button = document.querySelector('aside button[aria-expanded="true"]')
    const panel = button?.closest('[data-lenis-prevent]')
    if (!(button instanceof HTMLElement) || !(panel instanceof HTMLElement)) return
    const buttonBox = button.getBoundingClientRect()
    const panelBox = panel.getBoundingClientRect()
    if (buttonBox.top < panelBox.top || buttonBox.bottom > panelBox.bottom) {
      panel.scrollTop += buttonBox.top - panelBox.top - 12
    }
  }, [])

  const categoryName = useMemo(() => {
    const names = new Map(categories.map((category) => [category.slug, category.name]))
    return (slug: string) => names.get(slug) ?? slug
  }, [categories])

  const subcategoriesByCategory = useMemo(() => {
    const grouped = new Map<string, { slug: string; name: string; count: number }[]>()
    for (const category of categories) {
      const counts = new Map<string, { name: string; count: number }>()
      for (const product of allProducts) {
        if (product.categorySlug !== category.slug) continue
        if (product.subcategoryName === category.name) continue
        const current = counts.get(product.subcategorySlug)
        counts.set(product.subcategorySlug, {
          name: product.subcategoryName,
          count: (current?.count ?? 0) + 1,
        })
      }
      grouped.set(
        category.slug,
        [...counts.entries()]
          .map(([slug, value]) => ({ slug, ...value }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      )
    }
    return grouped
  }, [allProducts, categories])

  const products = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allProducts.filter((product) => {
      if (categorySet.size > 0 && !categorySet.has(product.categorySlug)) return false
      if (subcategorySet.size > 0 && !subcategorySet.has(product.subcategorySlug)) return false
      if (!q) return true
      return (
        product.name.toLowerCase().includes(q) ||
        product.subcategoryName.toLowerCase().includes(q) ||
        product.packSize.toLowerCase().includes(q)
      )
    })
  }, [allProducts, categorySet, query, subcategorySet])

  const activeCount = categorySet.size + subcategorySet.size + (query ? 1 : 0)

  function clearAll() {
    setOpenSlug(null)
    setCategorySet(new Set())
    setSubcategorySet(new Set())
    setQuery('')
  }

  function openCategory(slug: string) {
    const next = openSlug === slug ? null : slug
    setOpenSlug(next)
    setCategorySet(next ? new Set([next]) : new Set())
    setSubcategorySet(new Set())
  }

  const title = path === 'car' ? 'Car products' : 'Bike products'
  const other = path === 'car' ? 'bike' : 'car'
  const selectedSlug = categorySet.size === 1 ? [...categorySet][0] : null
  const selectedName = selectedSlug ? categoryName(selectedSlug) : null

  const filters = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Filters</p>
        {activeCount > 0 ? (
          <button type="button" onClick={clearAll} className="text-sm text-ink underline underline-offset-2">
            Clear all
          </button>
        ) : null}
      </div>

      <label className="block">
        <span className="sr-only">Search products</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          className="w-full rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:ring-2 focus:ring-lm-red/30"
        />
      </label>

      <div>
        <p className="text-sm font-semibold text-ink">Category</p>
        <ul className="mt-2 divide-y divide-line border-y border-line">
          {categories.map((category) => {
            const count = allProducts.filter((product) => product.categorySlug === category.slug).length
            const open = openSlug === category.slug
            const subs = subcategoriesByCategory.get(category.slug) ?? []
            return (
              <li key={category.slug}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => openCategory(category.slug)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 py-3 text-left text-sm text-ink"
                >
                  <span className={`flex-1 leading-snug ${open ? 'font-semibold' : ''}`}>{category.name}</span>
                  <span className="text-xs text-muted">{count}</span>
                  <span aria-hidden className="w-4 text-center text-base leading-none text-ink">
                    {open ? '−' : '+'}
                  </span>
                </button>
                {open && subs.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pb-3 pl-1">
                    {subs.map((option) => {
                      const on = subcategorySet.has(option.slug)
                      return (
                        <button
                          key={option.slug}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() =>
                            setSubcategorySet(on ? new Set() : new Set([option.slug]))
                          }
                          className={`rounded-full border px-3 py-1.5 text-xs ${
                            on ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink'
                          }`}
                        >
                          {option.name}
                          <span className={on ? 'text-white/70' : 'text-muted'}> {option.count}</span>
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )

  return (
    <>
      <div className="border-b border-line bg-base pt-24">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-4 px-6 py-5 lg:px-10">
          <div>
            <p className="tech-label flex items-center gap-3 text-lm-red">
              <span className="h-px w-8 bg-lm-red" />
              {selectedName ? title : 'Product groups'}
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              {selectedName ?? title}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              {selectedName
                ? `${products.length} product${products.length === 1 ? '' : 's'} in ${selectedName}. Open a product for details and its information sheet.`
                : 'Filter by category, then open a product for details and its information sheet. No prices on this site.'}
            </p>
          </div>
          <Link
            href={`/products/${other}`}
            className="text-sm font-semibold text-ink underline underline-offset-2"
          >
            Switch to {other}
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] items-start gap-8 px-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-10 lg:py-8">
        <aside className="relative hidden h-0 min-h-full self-start lg:block">
          <div
            data-lenis-prevent
            className="sticky top-24 max-h-[min(100%,calc(100vh-7rem))] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-5 [overflow-anchor:none]"
          >
            {filters}
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="rounded-full border border-ink px-4 py-2 text-sm font-semibold text-ink lg:hidden"
            >
              Filters{activeCount > 0 ? ` · ${activeCount}` : ''}
            </button>
            <p className="text-sm text-muted">
              {products.length} product{products.length === 1 ? '' : 's'}
            </p>
            {[...categorySet].map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => openCategory(slug)}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink"
              >
                {categoryName(slug)} ×
              </button>
            ))}
            {[...subcategorySet].map((slug) => {
              const name = allProducts.find((product) => product.subcategorySlug === slug)?.subcategoryName
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setSubcategorySet(toggle(subcategorySet, slug))}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink"
                >
                  {name} ×
                </button>
              )
            })}
          </div>

          <div className="mt-5">
            {products.length === 0 ? (
              <p className="text-sm text-muted">No products match these filters.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="flex flex-col rounded-2xl border border-line bg-white p-4"
                >
                  <div className="relative mb-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-surface">
                    <img
                      src={product.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="max-h-[80%] max-w-[65%] object-contain"
                    />
                  </div>
                  <p className="text-xs text-muted">{product.subcategoryName}</p>
                  <h2 className="mt-1 text-base font-semibold leading-snug text-ink">{product.name}</h2>
                  <p className="mt-2 text-sm text-muted">
                    Article {product.articleId} · {product.packSize}
                  </p>
                  <a
                    href={PRODUCT_INFORMATION_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm font-semibold text-ink underline underline-offset-2"
                  >
                    More details
                  </a>
                </article>
              ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-[80] flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <p className="text-base font-semibold text-ink">Filters</p>
            <button type="button" onClick={() => setFiltersOpen(false)} className="text-sm text-ink">
              Close
            </button>
          </div>
          <div className="flex-1 overflow-auto px-5 py-5">{filters}</div>
          <div className="border-t border-line p-4">
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="site-btn w-full bg-ink py-3 text-sm font-semibold text-white"
            >
              Show {products.length} products
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
