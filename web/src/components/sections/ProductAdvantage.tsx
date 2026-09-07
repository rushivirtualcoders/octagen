import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import { PRODUCT_ADVANTAGES } from '../../lib/constants'
import { EASE } from '../../lib/animations'

export default function ProductAdvantage() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const current = PRODUCT_ADVANTAGES[active]

  return (
    <section id="advantage" aria-label="The product advantage" className="grid-tech border-t border-line bg-surface py-8 lg:py-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionFrame
          eyebrow="The product advantage"
          title={['WHY PROFESSIONALS', 'CHOOSE WITH EVIDENCE.']}
          accentLine={1}
          align="center"
          compact
          description="Octagen organises manufacturer-approved information so workshops, fleets and owners select LIQUI MOLY by specification."
        />

        <div className="mt-5 overflow-hidden border border-line lg:mt-6 lg:grid lg:grid-cols-[1fr_0.88fr]">
          <div className="flex flex-col divide-y divide-line border-b border-line lg:border-b-0 lg:border-r">
            {PRODUCT_ADVANTAGES.map((item, i) => {
              const isActive = active === i
              return (
                <motion.article
                  key={item.index}
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                  className={`group relative cursor-default px-5 py-4 transition-colors duration-300 sm:px-6 sm:py-5 ${
                    isActive ? 'bg-white' : 'bg-base hover:bg-white/60'
                  }`}
                >
                  <motion.span
                    aria-hidden
                    className="absolute top-0 left-0 h-0.5 bg-lm-red"
                    animate={{ width: isActive ? '100%' : '2rem' }}
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <p className="tech-label text-lm-red">{item.cue}</p>
                    <span className="font-display text-lg font-black text-ink/10 sm:text-xl">{item.index}</span>
                  </div>
                  <h3 className="font-display mt-2 text-base font-extrabold uppercase tracking-tight text-ink sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{item.text}</p>
                </motion.article>
              )
            })}
          </div>

          <div className="relative min-h-[12rem] sm:min-h-[14rem] lg:min-h-[17rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.index}
                initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="absolute inset-0"
              >
                <img
                  src={current.image}
                  alt={current.imageAlt}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-ink/30 to-transparent lg:from-ink/45"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
              <motion.p
                key={`label-${current.index}`}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="tech-label text-lm-red"
              >
                {current.cue}
              </motion.p>
              <motion.p
                key={`caption-${current.index}`}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.06 }}
                className="font-display mt-1 text-sm font-bold uppercase text-white sm:text-base"
              >
                {current.title}
              </motion.p>
            </div>

            {!reduced && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute top-4 right-4 size-16 border border-white/25 sm:size-20"
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-center text-[0.65rem] leading-relaxed text-muted sm:text-xs">
          Approvals follow the manufacturer&apos;s published data. Octagen presents the catalogue and inquiry path — it
          does not replace OEM service documentation.
        </p>
      </div>
    </section>
  )
}
