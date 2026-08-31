import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MOTORSPORT_SLIDES } from '../../lib/constants'
import { EASE } from '../../lib/animations'

export default function MotorsportSlider() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = MOTORSPORT_SLIDES.length
  const slide = MOTORSPORT_SLIDES[active]

  const go = useCallback(
    (next: number) => {
      setActive((next + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (paused || reduced || count <= 1) return
    const id = window.setInterval(() => go(active + 1), 5200)
    return () => window.clearInterval(id)
  }, [active, count, go, paused, reduced])

  return (
    <section
      id="grid"
      aria-label="LIQUI MOLY motorsport partnerships"
      className="relative overflow-hidden border-y border-line bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[72vh] lg:min-h-[82vh]">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            initial={reduced ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.05, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/80 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[72vh] w-full max-w-[1400px] flex-col justify-end px-6 py-16 lg:min-h-[82vh] lg:px-10 lg:py-20">
          <p className="tech-label mb-4 flex items-center gap-3 text-white/70">
            <span className="racing-stripe-h inline-block h-1 w-10" />
            On the grid
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-xl"
            >
              <p className="tech-label text-lm-red">{slide.series}</p>
              <h2 className="font-display mt-3 text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.9] font-black tracking-tight text-white uppercase">
                {slide.title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed font-light text-white/70">
                {slide.text}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {MOTORSPORT_SLIDES.map((item, i) => (
              <button
                key={item.title}
                type="button"
                aria-label={item.title}
                aria-current={i === active}
                onClick={() => go(i)}
                className={`tech-label border px-4 py-2 transition-colors duration-300 ${
                  i === active
                    ? 'border-white bg-white text-ink'
                    : 'border-white/25 text-white/70 hover:border-white hover:text-white'
                }`}
              >
                {item.short}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
