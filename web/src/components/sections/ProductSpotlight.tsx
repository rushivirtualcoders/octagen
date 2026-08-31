import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import SectionFrame from '../ui/SectionFrame'
import { EASE } from '../../lib/animations'
import { INQUIRY_MAILTO, SPOTLIGHT_PRODUCTS, type SpotlightProduct } from '../../lib/constants'

const AUTO_MS = 5000
const PAUSE_MS = 6000

function StageEffects({ product, reduced }: { product: SpotlightProduct; reduced: boolean }) {
  if (product.motion === 'orbit') {
    return (
      <>
        {[0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            aria-hidden
            viewBox="0 0 200 200"
            className="pointer-events-none absolute top-1/2 left-1/2 size-[min(70vw,18rem)] -translate-x-1/2 -translate-y-1/2"
            animate={reduced ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 16 + i * 6, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="100" cy="100" r={68 + i * 16} fill="none" stroke={product.glow} strokeWidth="0.6" opacity={0.28 - i * 0.06} />
          </motion.svg>
        ))}
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: product.glow, boxShadow: `0 0 24px ${product.glow}` }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </>
    )
  }
  if (product.motion === 'scan') {
    return (
      !reduced && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-[12%] h-px bg-gradient-to-r from-transparent via-lm-blue to-transparent shadow-[0_0_20px_rgba(0,81,158,0.7)]"
            animate={{ top: ['10%', '88%', '10%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-[12%] h-8 bg-gradient-to-b from-lm-blue/20 to-transparent"
            animate={{ top: ['10%', '88%', '10%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )
    )
  }
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute top-[55%] left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ borderColor: `${product.glow}66` }}
          animate={reduced ? undefined : { scale: [0.4, 2.4], opacity: [0.55, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 0.7 }}
        />
      ))}
    </>
  )
}

function Callout({ callout, delay }: { callout: SpotlightProduct['callouts'][number]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      style={{ top: callout.top, left: callout.left }}
      className="absolute z-20 max-w-[9rem] border border-white/15 bg-ink/90 px-2.5 py-2 backdrop-blur-md sm:max-w-[10rem]"
    >
      <span className="tech-label text-lm-red">{callout.index}</span>
      <p className="font-display mt-0.5 text-[0.65rem] font-bold uppercase text-white sm:text-xs">{callout.label}</p>
    </motion.div>
  )
}

const copyStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const copyItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export default function ProductSpotlight() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [progress, setProgress] = useState(0)
  const pausedUntil = useRef(0)
  const count = SPOTLIGHT_PRODUCTS.length
  const product = SPOTLIGHT_PRODUCTS[active]

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
      if (p >= 1) {
        go(active + 1)
      } else {
        setProgress(p)
      }
    }, 32)
    return () => window.clearInterval(id)
  }, [active, go, reduced])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(active + 1, true)
    else if (info.offset.x > 60) go(active - 1, true)
  }

  const slideVariants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d > 0 ? 56 : -56,
      scale: 0.97,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -56 : 56,
      scale: 0.97,
      transition: { duration: 0.35, ease: EASE },
    }),
  }

  const bottleVariants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d > 0 ? 40 : -40,
      scale: 0.88,
      rotate: d > 0 ? -8 : 8,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -30 : 30,
      scale: 0.92,
      transition: { duration: 0.3, ease: EASE },
    }),
  }

  return (
    <section
      id="spotlight"
      aria-label="Flagship product spotlight"
      className="relative overflow-hidden border-t border-line bg-ink text-white"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ background: `radial-gradient(ellipse at 72% 40%, ${product.glow}22, transparent 58%)` }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
        <SectionFrame
          index="04"
          eyebrow="Flagship spotlight"
          title={['BUILT FOR', 'EVERY MACHINE.']}
          accentLine={1}
          invert
          compact
          description="Auto-rotating flagship families — technical callouts for the future catalogue."
        />

        <div className="relative mt-5 lg:mt-6">
          <div className="relative overflow-hidden border border-white/10">
            <div aria-hidden className="absolute inset-x-0 top-0 z-30 h-0.5 bg-white/10">
              <motion.span
                className="block h-full origin-left bg-lm-red"
                style={{ scaleX: progress }}
              />
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_0.95fr]">
              <div className="relative min-h-[16rem] overflow-hidden border-b border-white/10 lg:min-h-[19rem] lg:border-b-0 lg:border-r">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`copy-${product.index}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: EASE }}
                    className="flex h-full flex-col justify-center p-5 sm:p-6 lg:p-7"
                  >
                    <motion.div variants={copyStagger} initial="hidden" animate="visible">
                      <motion.p variants={copyItem} className="tech-label text-lm-red">
                        {product.category}
                      </motion.p>
                      <motion.h3
                        variants={copyItem}
                        className="font-display mt-2 text-[clamp(1.35rem,2.8vw,2.2rem)] font-extrabold uppercase leading-tight"
                      >
                        {product.name}
                      </motion.h3>
                      <motion.p
                        variants={copyItem}
                        className="font-display mt-1 text-lg font-bold lg:text-xl"
                        style={{ color: product.glow }}
                      >
                        {product.format}
                      </motion.p>
                      <motion.p variants={copyItem} className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                        {product.description}
                      </motion.p>
                      <motion.p variants={copyItem} className="mt-1 max-w-md text-xs text-white/45 sm:text-sm">
                        {product.detail}
                      </motion.p>

                      <motion.ul variants={copyStagger} className="mt-4 space-y-2 border-t border-white/10 pt-4">
                        {product.callouts.map((c) => (
                          <motion.li key={c.index} variants={copyItem} className="flex gap-2.5">
                            <span className="tech-label shrink-0 text-lm-red">{c.index}</span>
                            <div>
                              <p className="font-display text-xs font-bold uppercase">{c.label}</p>
                              <p className="mt-0.5 text-[0.7rem] text-white/50">{c.text}</p>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>

                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.45, ease: EASE }}
                      className="mt-5"
                    >
                      <MagneticButton href={INQUIRY_MAILTO}>Ask about this product</MagneticButton>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                className="relative min-h-[14rem] touch-pan-y sm:min-h-[16rem] lg:min-h-[19rem]"
                drag={reduced ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={onDragEnd}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`stage-${product.index}`}
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={slideVariants}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="absolute inset-0 flex items-center justify-center bg-[#0c1316]"
                  >
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 grid-tech opacity-20"
                      animate={reduced ? undefined : { opacity: [0.15, 0.28, 0.15] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <StageEffects product={product} reduced={!!reduced} />
                    <motion.div
                      aria-hidden
                      className="absolute inset-[20%] blur-3xl"
                      animate={{ background: `radial-gradient(circle, ${product.glow}45, transparent 70%)` }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                    <motion.div
                      custom={direction}
                      variants={bottleVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="relative z-10"
                    >
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-[min(42vw,220px)] w-auto max-w-[min(78vw,240px)] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] lg:h-[240px]"
                        animate={reduced ? undefined : { y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </motion.div>
                    <AnimatePresence>
                      {product.callouts.map((c, i) => (
                        <Callout key={c.index} callout={c} delay={0.15 + i * 0.1} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous product"
                onClick={() => go(active - 1, true)}
                className="flex size-9 items-center justify-center border border-white/20 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next product"
                onClick={() => go(active + 1, true)}
                className="flex size-9 items-center justify-center border border-white/20 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
              >
                →
              </button>
              <motion.span
                key={active}
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="tech-label text-white/40"
              >
                {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </motion.span>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-0.5 sm:max-w-xl sm:justify-end">
              {SPOTLIGHT_PRODUCTS.map((item, i) => (
                <button
                  key={item.index}
                  type="button"
                  onClick={() => go(i, true)}
                  className={`relative shrink-0 overflow-hidden border px-2.5 py-2 text-left transition-colors ${
                    i === active ? 'border-lm-red bg-white/10' : 'border-white/15 hover:border-white/30'
                  }`}
                >
                  <motion.span
                    layout
                    className="tech-label block text-[0.55rem] text-white/45"
                  >
                    {item.index}
                  </motion.span>
                  <span className="font-display mt-0.5 block max-w-[6.5rem] truncate text-[0.6rem] font-bold uppercase lg:max-w-[7rem] lg:text-[0.65rem]">
                    {item.name}
                  </span>
                  {i === active && (
                    <motion.span
                      layoutId="spotlight-tab-glow"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 border border-lm-red/40"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
