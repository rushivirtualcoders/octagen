'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import { EASE } from '@/lib/animations'

export type ActivityItem = {
  id: string
  title: string
  text: string
  image: string
  href: string
}

export default function MarketingActivities({
  activities,
}: {
  activities: ActivityItem[]
}) {
  const reduced = useReducedMotion()

  return (
    <section
      id="activities"
      aria-label="Marketing activities"
      className="relative overflow-hidden border-t border-line bg-surface"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
        <SectionFrame
          eyebrow="Marketing activities"
          title={['WHERE THE BRAND', 'SHOWS UP.']}
          accentLine={1}
          description="Motorsport, workshops, driver campaigns and trade programmes — the activity layers behind LIQUI MOLY in India."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {activities.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              className="group grid overflow-hidden border border-line bg-base transition-colors hover:border-lm-red/50 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            >
              <div className="relative min-h-[180px] overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-6 lg:p-8">
                <p className="tech-label text-lm-blue">Activity</p>
                <h3 className="font-display mt-2 text-2xl font-extrabold uppercase tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
                <span className="tech-label mt-5 text-lm-red transition-transform group-hover:translate-x-1">
                  View on liqui-moly.com →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
