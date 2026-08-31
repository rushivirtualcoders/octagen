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
import { HISTORY_MILESTONES } from '../../lib/constants'
import { EASE } from '../../lib/animations'

const COUNT = HISTORY_MILESTONES.length

function TimelineNode({
  index,
  active,
  accent,
  onSelect,
}: {
  index: number
  active: boolean
  accent: string
  onSelect: () => void
}) {
  const m = HISTORY_MILESTONES[index]
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${m.year} — ${m.title}`}
      aria-current={active ? 'step' : undefined}
      className="group relative flex w-full items-center gap-4 py-3 text-left lg:py-4"
    >
      <motion.span
        animate={
          active
            ? { scale: 1.35, boxShadow: `0 0 0 8px ${accent}22` }
            : { scale: 1, boxShadow: '0 0 0 0px transparent' }
        }
        transition={{ duration: 0.45, ease: EASE }}
        className="relative z-10 size-3 shrink-0 border-2 border-base"
        style={{ backgroundColor: active ? accent : '#e8eef5' }}
      />
      <span
        className={`tech-label transition-colors duration-300 ${
          active ? 'text-ink' : 'text-muted group-hover:text-lm-blue'
        }`}
      >
        {m.year}
      </span>
    </button>
  )
}

export default function BrandHistory() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const milestone = HISTORY_MILESTONES[active]
  const isDist = 'distributor' in milestone && milestone.distributor

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })
  const lineScale = useTransform(progress, [0, 1], [0, 1])
  const watermarkX = useTransform(progress, [0, 1], ['0%', '-18%'])
  const watermarkOpacity = useTransform(progress, [0, 0.5, 1], [0.06, 0.1, 0.06])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT)))
    setActive((prev) => (prev === next ? prev : next))
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
            style={reduced ? undefined : { x: watermarkX, opacity: watermarkOpacity }}
            className="pointer-events-none absolute -right-[8%] bottom-[10%] font-display text-[clamp(8rem,28vw,22rem)] font-black leading-none tracking-tighter text-ink select-none"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={milestone.year}
                initial={reduced ? false : { opacity: 0, y: 40, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.65, ease: EASE }}
                className="block"
              >
                {milestone.year}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <div className="grid-tech pointer-events-none absolute inset-0 opacity-50" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 py-16 lg:px-10 lg:py-20">
            <div className="grid flex-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-between">
                <SectionFrame
                  index="03"
                  eyebrow="Heritage"
                  title={['DECADES OF', 'GERMAN PRECISION.']}
                  accentLine={1}
                  description="From Ulm to the world stage — and now across India through Octagen."
                />

                <div className="mt-10 hidden lg:block">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="tech-label text-muted">Timeline</span>
                    <span className="tech-label text-lm-blue">
                      {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden bg-line">
                    <motion.div
                      className="h-full origin-left bg-gradient-to-r from-lm-blue via-oil to-lm-red"
                      style={{ scaleX: lineScale }}
                    />
                  </div>
                  <motion.div
                    className="mt-8 inline-flex items-center gap-3 border border-line bg-white px-4 py-3"
                    animate={reduced ? undefined : { y: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="racing-stripe-h inline-block h-1 w-8" />
                    <span className="tech-label text-ink/80">Made in Germany</span>
                  </motion.div>
                </div>
              </div>

              <div className="hidden lg:col-span-2 lg:block">
                <div className="relative flex h-full flex-col justify-center pl-2">
                  <div aria-hidden className="absolute top-[12%] bottom-[12%] left-[5px] w-px bg-line">
                    <motion.div
                      className="w-full origin-top bg-gradient-to-b from-lm-blue via-oil to-lm-red"
                      style={{ scaleY: lineScale, height: '100%' }}
                    />
                  </div>
                  {HISTORY_MILESTONES.map((_, i) => (
                    <TimelineNode
                      key={HISTORY_MILESTONES[i].year}
                      index={i}
                      active={active === i}
                      accent={HISTORY_MILESTONES[i].accent}
                      onSelect={() => setActive(i)}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 lg:flex lg:items-center">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={milestone.year}
                    initial={
                      reduced
                        ? false
                        : {
                            opacity: 0,
                            x: 48,
                            clipPath: 'inset(0 0 100% 0)',
                          }
                    }
                    animate={{
                      opacity: 1,
                      x: 0,
                      clipPath: 'inset(0 0 0 0)',
                    }}
                    exit={{
                      opacity: 0,
                      x: -32,
                      clipPath: 'inset(100% 0 0 0)',
                      transition: { duration: 0.4, ease: EASE },
                    }}
                    transition={{ duration: 0.75, ease: EASE }}
                    className={`relative w-full overflow-hidden border p-8 lg:p-12 ${
                      isDist
                        ? 'border-lm-blue bg-ink text-white shadow-[0_32px_80px_rgba(11,18,21,0.2)]'
                        : 'border-line bg-white shadow-[0_24px_60px_rgba(11,18,21,0.06)]'
                    }`}
                  >
                    {!isDist && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-1 origin-left"
                        style={{ backgroundColor: milestone.accent }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                      />
                    )}

                    {isDist && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-12 -bottom-12 size-48 rounded-full bg-lm-blue/25 blur-3xl"
                      />
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`tech-label ${isDist ? 'text-lm-red' : 'text-lm-blue'}`}>
                        {milestone.era}
                      </span>
                      <span
                        className={`font-display text-sm font-bold tracking-[0.2em] uppercase ${
                          isDist ? 'text-white/45' : 'text-ink/25'
                        }`}
                      >
                        {milestone.year}
                      </span>
                    </div>

                    <motion.h3
                      initial={reduced ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                      className={`font-display mt-6 text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold uppercase leading-tight tracking-tight ${
                        isDist ? 'text-white' : 'text-ink'
                      }`}
                    >
                      {milestone.title}
                    </motion.h3>

                    <motion.p
                      initial={reduced ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
                      className={`mt-5 max-w-xl text-sm leading-relaxed lg:text-base ${
                        isDist ? 'text-white/72' : 'text-muted'
                      }`}
                    >
                      {milestone.text}
                    </motion.p>

                    <motion.p
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      className={`tech-label mt-10 ${isDist ? 'text-white/40' : 'text-ink/35'}`}
                    >
                      Scroll to travel the timeline
                    </motion.p>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile: horizontal milestone picker */}
            <div className="mt-8 flex gap-2 overflow-x-auto pb-2 lg:hidden [scrollbar-width:none]">
              {HISTORY_MILESTONES.map((m, i) => (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`tech-label shrink-0 border px-4 py-2 ${
                    active === i ? 'border-lm-red bg-lm-red text-white' : 'border-line bg-surface text-muted'
                  }`}
                >
                  {m.year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reduced motion: show all milestones stacked */}
        {reduced && (
          <div className="mx-auto max-w-[1400px] space-y-4 px-6 pb-16 lg:px-10">
            {HISTORY_MILESTONES.map((m) => {
              const dist = 'distributor' in m && m.distributor
              return (
                <article
                  key={m.year}
                  className={`border p-6 ${dist ? 'border-lm-blue bg-ink text-white' : 'border-line bg-white'}`}
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
