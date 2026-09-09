'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import { HISTORY_MILESTONES, OCTAGEN_PILLARS } from '../../lib/constants'
import { EASE } from '../../lib/animations'

const SLIDE_MS = 3500
const COUNT = HISTORY_MILESTONES.length

export default function BrandHistory() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const activeRef = useRef(0)
  activeRef.current = active

  useEffect(() => {
    if (reduced || paused || COUNT <= 1) return
    const id = window.setInterval(() => {
      setActive((activeRef.current + 1) % COUNT)
    }, SLIDE_MS)
    return () => window.clearInterval(id)
  }, [paused, reduced])

  const milestone = HISTORY_MILESTONES[active]
  const isDist = 'distributor' in milestone && milestone.distributor
  const coords = 'coordinates' in milestone ? milestone.coordinates : '48.4011° N · 9.9876° E'
  const location = 'location' in milestone ? milestone.location : 'Ulm, DE'
  const address = 'address' in milestone ? milestone.address : null

  return (
    <section
      id="history"
      aria-label="Brand heritage"
      className="border-t border-line bg-base"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionFrame
              eyebrow="Heritage"
              title={['DECADES OF', 'GERMAN PRECISION.']}
              accentLine={1}
              description={
                isDist
                  ? 'German engineering meets Indian distribution — Octagen brings premium lubricants nationwide with decades of local expertise.'
                  : 'From Ulm to the world stage — and now across India through Octagen.'
              }
            />

            <div className="mt-10 flex items-start gap-6">
              <div
                aria-hidden
                className="relative inline-flex size-20 shrink-0 items-center justify-center rounded-full border border-dashed border-ink/20 lg:size-24"
              >
                <div className="absolute inset-2 rounded-full border border-ink/10" />
                <div className="px-2 text-center">
                  {isDist ? (
                    <>
                      <p className="text-[0.45rem] font-semibold tracking-[0.16em] text-ink/70 uppercase">
                        Distributed by
                      </p>
                      <p className="font-display text-xs font-extrabold tracking-[0.1em] text-lm-red uppercase">
                        Octagen
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[0.45rem] font-semibold tracking-[0.18em] text-ink/70 uppercase">
                        Engineered
                      </p>
                      <p className="font-display text-xs font-extrabold tracking-[0.1em] text-lm-red uppercase">
                        in Ulm
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[0.58rem] font-semibold tracking-[0.2em] text-muted uppercase">
                  {isDist ? 'Headquarters' : 'Coordinates'}
                </p>
                <p className="font-display mt-1 text-sm font-bold tracking-[0.08em] text-ink uppercase">
                  {coords}
                </p>
                <p className="tech-label mt-1 text-lm-blue">{location}</p>
                {address && (
                  <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-muted">{address}</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className="mb-6 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Heritage timeline"
            >
              {HISTORY_MILESTONES.map((m, i) => {
                const isActive = active === i
                return (
                  <button
                    key={m.year}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`rounded-[10px] border px-3.5 py-2 text-[0.62rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${
                      isActive
                        ? 'border-lm-red bg-lm-red text-white'
                        : 'border-line bg-white text-muted hover:border-ink/20 hover:text-ink'
                    }`}
                  >
                    {m.year}
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={milestone.year}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`relative w-full overflow-hidden rounded-[10px] border ${
                  isDist
                    ? 'border-lm-blue/40 bg-ink text-white shadow-[0_20px_60px_rgba(11,18,21,0.18)]'
                    : 'border-line bg-white shadow-[0_16px_48px_rgba(11,18,21,0.06)]'
                }`}
              >
                <div
                  aria-hidden
                  className="h-1 w-full"
                  style={{ backgroundColor: isDist ? '#e8770a' : milestone.accent }}
                />

                <div className="p-6 sm:p-8 lg:p-9">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`tech-label ${isDist ? 'text-lm-red' : 'text-lm-blue'}`}>
                        {milestone.era}
                      </span>
                      <span
                        className={`rounded-[10px] px-2.5 py-1 text-[0.58rem] font-semibold tracking-[0.14em] uppercase ${
                          isDist ? 'bg-white/10 text-white/80' : 'bg-surface text-ink/50'
                        }`}
                      >
                        {milestone.year}
                      </span>
                    </div>
                    <span className={`tech-label ${isDist ? 'text-white/35' : 'text-ink/30'}`}>
                      {String(active + 1).padStart(2, '0')} /{' '}
                      {String(HISTORY_MILESTONES.length).padStart(2, '0')}
                    </span>
                  </div>

                  <h3
                    className={`font-display mt-5 text-[clamp(1.45rem,2.8vw,2.1rem)] font-extrabold leading-tight tracking-tight uppercase ${
                      isDist ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {milestone.title}
                  </h3>

                  <p
                    className={`mt-4 max-w-2xl text-sm leading-relaxed lg:text-[0.95rem] ${
                      isDist ? 'text-white/75' : 'text-muted'
                    }`}
                  >
                    {milestone.text}
                  </p>

                  {isDist && (
                    <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                      {OCTAGEN_PILLARS.map((pillar) => (
                        <li
                          key={pillar.label}
                          className="rounded-[10px] border border-white/10 bg-white/5 px-3.5 py-3"
                        >
                          <p className="text-[0.6rem] font-semibold tracking-[0.12em] text-lm-red uppercase">
                            {pillar.label}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-white/65">{pillar.text}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
