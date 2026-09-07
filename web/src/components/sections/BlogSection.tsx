'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import ArticleCard from '../articles/ArticleCard'
import { EASE } from '../../lib/animations'
import type { PublicArticle } from '@/lib/articles/types'

type Props = {
  articles: PublicArticle[]
}

export default function BlogSection({ articles }: Props) {
  const reduced = useReducedMotion()
  const [featured, ...rest] = articles

  if (!featured) return null

  return (
    <section id="blog" aria-label="LIQUI MOLY insights and articles" className="border-t border-line bg-base">
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 lg:mb-10">
          <div>
            <p className="tech-label text-lm-blue">Insights</p>
            <h3 className="font-display mt-2 text-xl font-extrabold uppercase tracking-tight text-ink lg:text-2xl">
              Latest from the LIQUI MOLY desk
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Specification-first guidance for workshops, fleets and owners — distributed nationally by Octagen.
            </p>
          </div>
          <Link
            href="/articles"
            className="site-btn border border-line bg-white px-5 py-2.5 text-[0.62rem] font-semibold tracking-[0.16em] text-ink uppercase hover:border-lm-blue hover:text-lm-blue"
          >
            View all articles
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE }}
            className="lg:col-span-3"
          >
            <ArticleCard article={featured} featured />
          </motion.div>

          {rest.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EASE, delay: (i % 3) * 0.06 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
