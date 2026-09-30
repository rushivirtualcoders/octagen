'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { CatalogueCategory, CatalogueProduct, VehiclePath } from '@/lib/catalogue'
import InquiryTrigger from '@/components/inquiry/InquiryTrigger'

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
  const [category, setCategory] = useState(
    initialCategory && categories.some((c) => c.slug === initialCategory)
      ? initialCategory
      : 'all',
  )

  const products = useMemo(() => {
    if (category === 'all') return allProducts
    return allProducts.filter((p) => p.categorySlug === category)
  }, [allProducts, category])

  const title = path === 'car' ? 'Car products' : 'Bike products'
  const other = path === 'car' ? 'bike' : 'car'

  return (
    <>
      <div className="border-b border-line bg-base">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
          <p className="tech-label text-lm-blue">Product groups</p>
          <h1 className="font-display mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted lg:text-base">
            Browse by category, then open product details on liqui-moly.com. Octagen fulfills
            authorized supply and quotes across India — no cart, no prices on this site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/products/${other}`}
              className="site-btn border border-line bg-transparent px-5 py-3 text-[0.62rem] font-semibold tracking-[0.16em] text-ink uppercase hover:border-lm-blue"
            >
              Switch to {other}
            </Link>
            <InquiryTrigger
              className="site-btn bg-lm-red px-5 py-3 text-[0.62rem] font-semibold tracking-[0.16em] text-white uppercase hover:bg-[#c96a0e]"
              type="PRODUCT_QUOTE"
              subject={`${title} inquiry`}
            >
              Submit inquiry / get quote
            </InquiryTrigger>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-12">
        <div className="flex flex-wrap gap-2 border-b border-line pb-6">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`tech-label px-4 py-2 transition-colors ${
              category === 'all'
                ? 'bg-lm-red text-white'
                : 'border border-line text-muted hover:text-ink'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setCategory(cat.slug)}
              className={`tech-label px-4 py-2 transition-colors ${
                category === cat.slug
                  ? 'bg-lm-red text-white'
                  : 'border border-line text-muted hover:text-ink'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="mt-10 text-sm text-muted">No products in this category yet.</p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.liquiMolyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${product.name} — open product details on liqui-moly.com`}
                className="group flex flex-col border border-line bg-surface p-5 transition-colors hover:border-lm-red/60"
              >
                <div className="relative mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[85%] max-w-[70%] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="tech-label text-lm-blue capitalize">
                  {product.categorySlug.replace(/-/g, ' ')}
                </p>
                <h2 className="font-display mt-2 text-lg font-extrabold uppercase tracking-tight text-ink">
                  {product.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {product.shortDescription}
                </p>
                <span className="tech-label mt-5 text-lm-red">
                  View on liqui-moly.com →
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
