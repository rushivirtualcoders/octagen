'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import type { CatalogueCategory, VehiclePath } from '@/lib/catalogue'
import { EASE } from '@/lib/animations'

const PATHS: {
  id: VehiclePath
  title: string
  subtitle: string
  href: string
  image: string
  cta: string
}[] = [
  {
    id: 'car',
    title: 'Car',
    subtitle: 'Motor oils, additives, care & gear oils for passenger vehicles.',
    href: '/products/car',
    image: '/assets/images/performance-car.jpg',
    cta: 'Explore Car Products',
  },
  {
    id: 'bike',
    title: 'Bike',
    subtitle: 'Motorcycle oils, additives & chain care for two-wheelers.',
    href: '/products/bike',
    image: '/assets/images/lm/mxgp.jpg',
    cta: 'Explore Bike Products',
  },
]

export default function ProductGroups({
  categories,
}: {
  categories: CatalogueCategory[]
}) {
  const reduced = useReducedMotion()
  const [hover, setHover] = useState<VehiclePath | null>(null)

  return (
    <section
      id="products"
      aria-label="Product groups"
      className="relative overflow-hidden border-t border-line bg-base"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
        <SectionFrame
          eyebrow="Product groups"
          title={['CAR OR BIKE.', 'THEN THE RIGHT SPEC.']}
          accentLine={0}
          description="Choose your vehicle path, browse categories, then open product details on liqui-moly.com. Quotes and supply go through Octagen."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {PATHS.map((path, i) => {
            const cats = categories.filter((c) => c.path === path.id && c.featured)
            const active = hover === path.id
            return (
              <motion.article
                key={path.id}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.08 }}
                onMouseEnter={() => setHover(path.id)}
                onMouseLeave={() => setHover(null)}
                className="group relative flex min-h-[440px] flex-col overflow-hidden border border-line bg-surface"
              >
                <div className="relative h-52 overflow-hidden lg:h-60">
                  <img
                    src={path.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out ${
                      active ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                </div>

                <div className="relative z-10 flex flex-1 flex-col p-6 lg:p-8">
                  <p className="tech-label text-lm-red">Vehicle path</p>
                  <h3 className="font-display mt-2 text-3xl font-extrabold uppercase tracking-tight text-ink lg:text-4xl">
                    {path.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{path.subtitle}</p>

                  <ul className="mt-5 flex min-h-[4.5rem] flex-wrap content-start gap-2">
                    {cats.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/products/${path.id}?category=${cat.slug}`}
                          className="tech-label inline-block border border-line px-3 py-1.5 text-muted transition-colors hover:border-lm-red hover:text-lm-red"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={path.href}
                    className="site-btn mt-6 inline-flex w-fit bg-lm-red px-6 py-3.5 text-[0.65rem] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-[#c96a0e]"
                  >
                    {path.cta}
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
