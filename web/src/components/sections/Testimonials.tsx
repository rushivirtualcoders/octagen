'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import { TESTIMONIALS } from '../../lib/constants'
import { EASE } from '../../lib/animations'

const PER_PAGE = 3
const AUTO_MS = 5500

type Item = (typeof TESTIMONIALS)[number]

function TestimonialCard({ item }: { item: Item }) {
  const [hover, setHover] = useState(false)

  return (
    <article
      className="testimonial-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        aria-hidden
        className="testimonial-card__media"
        style={{ opacity: hover ? 1 : 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt="" loading="lazy" decoding="async" />
        <span className="testimonial-card__shade" />
      </div>

      <div className="testimonial-card__body">
        <div className="testimonial-card__avatar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" loading="lazy" decoding="async" />
        </div>

        <p
          className="testimonial-card__quote"
          style={{ opacity: hover ? 0 : 1 }}
        >
          {'"'}
          {item.quote}
          {'"'}
        </p>

        <footer className="testimonial-card__footer">
          <cite
            className="testimonial-card__name"
            style={{ color: hover ? '#ffffff' : '#0B1215' }}
          >
            {item.name}
          </cite>
          <p
            className="testimonial-card__role"
            style={{ color: hover ? 'rgba(255,255,255,0.8)' : '#5C6B78' }}
          >
            {item.role}
            {item.location ? `, ${item.location}` : ''}
          </p>
        </footer>
      </div>
    </article>
  )
}

function ArrowButton({
  direction,
  onClick,
  label,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="testimonial-arrow">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        {direction === 'prev' ? (
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  )
}

export default function Testimonials() {
  const reduced = useReducedMotion()
  const pageCount = Math.ceil(TESTIMONIALS.length / PER_PAGE)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduced || paused || pageCount <= 1) return
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % pageCount)
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [paused, pageCount, reduced])

  const visible = TESTIMONIALS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <section
      id="testimonials"
      aria-label="Customer reviews and testimonials"
      className="border-t border-line bg-base"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-tech opacity-30" />

        <div className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionFrame
              eyebrow="Testimonials"
              title={['TRUSTED BY', 'WORKSHOPS & DRIVERS.']}
              accentLine={1}
              description="What fleet managers, workshop owners and vehicle owners say about supply and support through Octagen."
            />
            <div className="flex items-center gap-3 pb-1">
              <ArrowButton
                direction="prev"
                onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
                label="Previous testimonials"
              />
              <ArrowButton
                direction="next"
                onClick={() => setPage((p) => (p + 1) % pageCount)}
                label="Next testimonials"
              />
            </div>
          </div>

          <div className="mt-10 lg:mt-12" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visible.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="mt-8 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Testimonial pages"
          >
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === page}
                aria-label={`Show testimonials page ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === page ? 'w-8 bg-lm-red' : 'w-1.5 bg-ink/20 hover:bg-ink/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
