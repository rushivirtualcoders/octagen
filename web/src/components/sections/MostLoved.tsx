'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import type { CatalogueProduct } from '@/lib/catalogue'
import { EASE } from '@/lib/animations'
import { productDetailsHref } from '@/lib/product-sheets'

export default function MostLoved({ products }: { products: CatalogueProduct[] }) {
  const reduced = useReducedMotion()

  return (
    <section
      id="most-loved"
      aria-label="Most loved products"
      className="relative overflow-hidden border-t border-line bg-surface"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
        <SectionFrame
          eyebrow="Most loved"
          title={['PRODUCTS DRIVERS', 'ASK FOR MOST.']}
          accentLine={0}
          description="Popular LIQUI MOLY references. Open a product for details and its information sheet. Quotes and supply go through Octagen."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.a
              key={product.id}
              href={productDetailsHref(product)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${product.name} — more details`}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.05 }}
              className="group flex flex-col border border-line bg-base p-5 transition-colors hover:border-lm-red/60"
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
                {product.path} · {product.categorySlug.replace(/-/g, ' ')}
              </p>
              <h3 className="font-display mt-2 text-lg font-extrabold uppercase tracking-tight text-ink">
                {product.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {product.shortDescription}
              </p>
              <span className="tech-label mt-5 text-lm-red">
                More details →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
