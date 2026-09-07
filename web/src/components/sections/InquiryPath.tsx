import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import MagneticButton from '../ui/MagneticButton'
import { INQUIRY_MAILTO, INQUIRY_STEPS } from '../../lib/constants'
import { EASE } from '../../lib/animations'

const AUTO_MS = 4500
const PAUSE_MS = 5000

export default function InquiryPath() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [progress, setProgress] = useState(0)
  const pausedUntil = useRef(0)
  const count = INQUIRY_STEPS.length
  const step = INQUIRY_STEPS[active]

  const go = useCallback(
    (next: number, manual = false) => {
      const normalized = (next + count) % count
      if (normalized === active) return
      const forward = (normalized - active + count) % count
      const backward = (active - normalized + count) % count
      setDirection(forward <= backward ? 1 : -1)
      setActive(normalized)
      setProgress(0)
      if (manual) pausedUntil.current = Date.now() + PAUSE_MS
    },
    [active, count],
  )

  useEffect(() => {
    if (reduced) return
    setProgress(0)
    const start = performance.now()
    const id = window.setInterval(() => {
      if (Date.now() < pausedUntil.current) return
      const p = (performance.now() - start) / AUTO_MS
      if (p >= 1) go(active + 1)
      else setProgress(p)
    }, 32)
    return () => window.clearInterval(id)
  }, [active, go, reduced])

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -24 : 24,
      transition: { duration: 0.3, ease: EASE },
    }),
  }

  return (
    <section
      id="process"
      aria-label="Inquiry path from specification to supply"
      className="border-t border-line bg-ink py-8 text-white lg:py-10"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionFrame
          eyebrow="The inquiry path"
          title={['FROM SPEC', 'TO SUPPLY.']}
          accentLine={1}
          invert
          compact
          align="center"
          description="Catalogue first. Quote second. No cart — for owners, workshops and bulk buyers across India."
        />

        <div className="relative mt-5 overflow-hidden border border-white/10 lg:mt-6">
          <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-0.5 bg-white/10">
            <motion.span className="block h-full origin-left bg-lm-red" style={{ scaleX: progress }} />
          </div>

          <div className="grid gap-px bg-white/10 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative bg-[#0c1316] p-5 sm:p-6 lg:p-7">
              <div aria-hidden className="absolute inset-x-6 top-[2.15rem] hidden h-px bg-white/15 sm:block lg:inset-x-7" />
              <ol className="relative grid gap-3 sm:grid-cols-4 sm:gap-2">
                {INQUIRY_STEPS.map((item, i) => {
                  const isActive = i === active
                  const isDone = i < active
                  return (
                    <li key={item.index}>
                      <button
                        type="button"
                        onClick={() => go(i, true)}
                        className={`group flex w-full items-start gap-2.5 text-left transition-colors sm:flex-col sm:items-center sm:gap-2 sm:text-center ${
                          isActive ? 'text-white' : 'text-white/45 hover:text-white/70'
                        }`}
                      >
                        <motion.span
                          aria-hidden
                          animate={
                            isActive
                              ? { scale: 1.15, boxShadow: '0 0 0 6px rgba(226,0,26,0.2)' }
                              : { scale: 1, boxShadow: '0 0 0 0px transparent' }
                          }
                          transition={{ duration: 0.4, ease: EASE }}
                          className={`relative z-10 flex size-8 shrink-0 items-center justify-center border-2 font-display text-xs font-bold sm:size-9 ${
                            isActive
                              ? 'border-lm-red bg-lm-red text-white'
                              : isDone
                                ? 'border-lm-red/60 bg-lm-red/20 text-white'
                                : 'border-white/25 bg-ink text-white/60'
                          }`}
                        >
                          {item.index}
                        </motion.span>
                        <span className="min-w-0">
                          <span className="tech-label block text-[0.55rem] sm:text-[0.6rem]">{item.label}</span>
                          <span className="font-display mt-0.5 hidden text-[0.65rem] font-bold uppercase leading-tight sm:block lg:text-xs">
                            {item.title.split(' ').slice(0, 2).join(' ')}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>

              {!reduced && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute bottom-4 right-4 size-12 border border-white/10"
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </div>

            <div className="relative min-h-[11rem] overflow-hidden bg-white/5 sm:min-h-[12rem]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step.index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex h-full flex-col justify-center p-5 sm:p-6 lg:p-7"
                >
                  <motion.p
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.4, ease: EASE }}
                    className="tech-label text-lm-red"
                  >
                    Step {step.index} · {step.label}
                  </motion.p>
                  <motion.h3
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.45, ease: EASE }}
                    className="font-display mt-2 text-xl font-extrabold uppercase tracking-tight sm:text-2xl"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16, duration: 0.45, ease: EASE }}
                    className="mt-2 max-w-lg text-xs leading-relaxed text-white/70 sm:text-sm"
                  >
                    {step.text}
                  </motion.p>
                  <motion.p
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.22, duration: 0.4, ease: EASE }}
                    className="tech-label mt-3 text-white/40"
                  >
                    {step.audience}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0c1316] px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton href={INQUIRY_MAILTO}>Submit Inquiry / Get Quote</MagneticButton>
              <a href="#paths" className="tech-label text-white/45 transition-colors hover:text-white">
                Choose a path →
              </a>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous step"
                onClick={() => go(active - 1, true)}
                className="flex size-8 items-center justify-center border border-white/20 text-sm text-white/70 hover:border-white hover:text-white"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next step"
                onClick={() => go(active + 1, true)}
                className="flex size-8 items-center justify-center border border-white/20 text-sm text-white/70 hover:border-white hover:text-white"
              >
                →
              </button>
              <span className="tech-label text-white/35">
                {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
