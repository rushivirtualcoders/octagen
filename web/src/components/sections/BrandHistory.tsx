import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import { HISTORY_MILESTONES, OCTAGEN_PILLARS } from '../../lib/constants'
import { EASE } from '../../lib/animations'

const COUNT = HISTORY_MILESTONES.length

const YEAR_SHORT: Record<string, string> = {
  '1957': '1957',
  '1970s': '70s',
  '1990s': '90s',
  '2000s': '00s',
  Today: 'Now',
  India: 'IN',
}

function HeritageStamp({ octagen }: { octagen: boolean }) {
  return (
    <div
      aria-hidden
      className="relative inline-flex size-24 items-center justify-center rounded-full border border-dashed border-ink/20 lg:size-28"
    >
      <div className="absolute inset-2 rounded-full border border-ink/10" />
      <div className="text-center px-2">
        {octagen ? (
          <>
            <p className="text-[0.5rem] font-semibold tracking-[0.18em] text-ink/70 uppercase">
              Distributed by
            </p>
            <p className="font-display text-sm font-extrabold tracking-[0.1em] text-lm-red uppercase">
              Octagen
            </p>
            <p className="mt-1 text-[0.45rem] font-semibold tracking-[0.14em] text-muted uppercase">
              Ahmedabad, India
            </p>
          </>
        ) : (
          <>
            <p className="text-[0.5rem] font-semibold tracking-[0.22em] text-ink/70 uppercase">
              Engineered
            </p>
            <p className="font-display text-sm font-extrabold tracking-[0.12em] text-lm-red uppercase">
              in Ulm
            </p>
            <p className="mt-1 text-[0.45rem] font-semibold tracking-[0.18em] text-muted uppercase">
              Made in Germany
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function PrecisionScale({ active, progress }: { active: number; progress: number }) {
  return (
    <div className="w-full max-w-xs">
      <div className="mb-2 flex items-end justify-between">
        <span className="text-[0.58rem] font-semibold tracking-[0.18em] text-muted uppercase">
          Precision scale
        </span>
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          {HISTORY_MILESTONES[active].year}
        </span>
      </div>
      <div className="relative h-8 border border-line bg-white">
        {Array.from({ length: 13 }).map((_, i) => (
          <span
            key={i}
            aria-hidden
            className={`absolute bottom-0 w-px bg-ink/15 ${i % 4 === 0 ? 'h-4' : 'h-2'}`}
            style={{ left: `${(i / 12) * 100}%` }}
          />
        ))}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-lm-red shadow-[0_0_12px_rgba(226,0,26,0.45)]"
          style={{ left: `${progress * 100}%`, x: '-50%' }}
        />
      </div>
      <div className="mt-2 flex justify-between gap-1">
        {HISTORY_MILESTONES.map((m, i) => (
          <span
            key={m.year}
            className={`text-[0.5rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 ${
              i === active ? 'text-lm-red' : 'text-ink/25'
            }`}
          >
            {YEAR_SHORT[m.year] ?? m.year}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function BrandHistory() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const milestone = HISTORY_MILESTONES[active]
  const isDist = 'distributor' in milestone && milestone.distributor
  const coords = 'coordinates' in milestone ? milestone.coordinates : '48.4011° N · 9.9876° E'
  const location = 'location' in milestone ? milestone.location : 'Ulm, DE'
  const address = 'address' in milestone ? milestone.address : null

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })
  const [scaleProgress, setScaleProgress] = useState(0)
  const watermarkX = useTransform(progress, [0, 1], ['0%', '-12%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT)))
    setActive((prev) => (prev === next ? prev : next))
    setScaleProgress(v)
  })

  useEffect(() => {
    if (reduced) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setActive((i) => Math.min(COUNT - 1, i + 1))
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setActive((i) => Math.max(0, i - 1))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [reduced])

  return (
    <section id="history" aria-label="LIQUI MOLY brand heritage" className="border-t border-line bg-base">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: reduced ? 'auto' : `${COUNT * 100}vh` }}
      >
        <div className={`${reduced ? '' : 'sticky top-0'} flex min-h-[100svh] flex-col overflow-hidden`}>
          <motion.div
            aria-hidden
            style={reduced ? undefined : { x: watermarkX }}
            className="pointer-events-none absolute -right-[6%] top-[8%] z-0 font-display text-[clamp(7rem,24vw,20rem)] font-black leading-[0.85] tracking-tighter text-ink/[0.04] select-none"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={milestone.year}
                initial={reduced ? false : { opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="block uppercase"
              >
                {milestone.year}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <div className="grid-tech pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 py-14 lg:px-10 lg:py-16">
            <div className="grid flex-1 gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
                <SectionFrame
                  eyebrow="Heritage"
                  title={['DECADES OF', 'GERMAN PRECISION.']}
                  accentLine={1}
                  description={
                    isDist
                      ? 'German engineering meets Indian distribution — Octagen brings LIQUI MOLY nationwide with decades of local lubricant expertise.'
                      : 'From Ulm to the world stage — and now across India through Octagen.'
                  }
                />

                <div className="mt-10 hidden flex-col gap-8 lg:flex">
                  <div className="flex items-start gap-8">
                    <HeritageStamp octagen={Boolean(isDist)} />
                    <div>
                      <p className="text-[0.58rem] font-semibold tracking-[0.2em] text-muted uppercase">
                        {isDist ? 'Headquarters' : 'Coordinates'}
                      </p>
                      <p className="font-display mt-2 text-sm font-bold tracking-[0.08em] text-ink uppercase">
                        {coords}
                      </p>
                      <p className="tech-label mt-1 text-lm-blue">{location}</p>
                      {address && (
                        <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-muted">{address}</p>
                      )}
                    </div>
                  </div>

                  <PrecisionScale active={active} progress={scaleProgress} />
                </div>
              </div>

              <div className="relative z-10 lg:col-span-7 lg:flex lg:flex-col lg:justify-center">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={milestone.year}
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE } }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className={`relative w-full rounded-[10px] border ${
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

                    <div className="p-7 lg:p-9">
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
                          {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
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

                <div
                  className="mt-6 flex flex-wrap gap-2 lg:mt-8"
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
                        className={`rounded-[10px] border px-4 py-2.5 text-[0.62rem] font-semibold tracking-[0.14em] uppercase transition-all duration-400 ${
                          isActive
                            ? 'scale-105 border-lm-red bg-lm-red text-white shadow-[0_8px_24px_rgba(226,0,26,0.25)]'
                            : 'border-line bg-white text-muted hover:border-ink/20 hover:text-ink'
                        }`}
                        style={isActive ? undefined : { borderColor: `${m.accent}33` }}
                      >
                        {m.year}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 lg:hidden">
              <PrecisionScale active={active} progress={scaleProgress} />
              <div className="mt-6 flex items-start gap-5">
                <HeritageStamp octagen={Boolean(isDist)} />
                <div>
                  <p className="text-[0.58rem] font-semibold tracking-[0.2em] text-muted uppercase">
                    {isDist ? 'Headquarters' : 'Coordinates'}
                  </p>
                  <p className="font-display mt-1 text-sm font-bold tracking-[0.08em] text-ink uppercase">
                    {coords}
                  </p>
                  <p className="tech-label mt-0.5 text-lm-blue">{location}</p>
                  {address && (
                    <p className="mt-2 text-xs leading-relaxed text-muted">{address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {reduced && (
          <div className="mx-auto max-w-[1400px] space-y-4 px-6 pb-16 lg:px-10">
            {HISTORY_MILESTONES.map((m) => {
              const dist = 'distributor' in m && m.distributor
              return (
                <article
                  key={m.year}
                  className={`rounded-[10px] border p-6 ${dist ? 'border-lm-blue bg-ink text-white' : 'border-line bg-white'}`}
                >
                  <p className="tech-label text-lm-blue">{m.era}</p>
                  <h3 className="font-display mt-2 text-xl font-bold uppercase">{m.title}</h3>
                  <p className={`mt-2 text-sm ${dist ? 'text-white/70' : 'text-muted'}`}>{m.text}</p>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
