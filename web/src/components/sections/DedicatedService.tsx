import { useState } from 'react'
import { motion } from 'framer-motion'
import SmoothSlider from '../ui/SmoothSlider'
import MagneticButton from '../ui/MagneticButton'
import { DEDICATED_SERVICES, INQUIRY_MAILTO } from '../../lib/constants'
import { EASE } from '../../lib/animations'

export default function DedicatedService() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="service"
      aria-label="Dedicated distributor service"
      className="relative overflow-hidden border-y border-line bg-surface py-28 lg:py-36"
    >
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div className="relative order-2 lg:order-1">
          <SmoothSlider
            count={DEDICATED_SERVICES.length}
            active={active}
            onChange={setActive}
            autoPlay
            mode="fade"
            className="aspect-[4/3] w-full shadow-[0_30px_80px_rgba(11,18,21,0.1)]"
            renderSlide={(i) => {
              const slide = DEDICATED_SERVICES[i]
              return (
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-white/10" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="tech-label text-white/70">{slide.tag}</p>
                    <p className="font-display mt-2 text-2xl font-bold tracking-tight text-white uppercase">
                      {slide.title}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="racing-stripe-v pointer-events-none absolute top-0 left-0 h-full w-1.5"
                  />
                </div>
              )
            }}
          />
        </div>

        <div className="order-1 lg:order-2">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="tech-label mb-6 flex items-center gap-3 text-lm-blue"
          >
            <span className="inline-block h-px w-10 bg-lm-blue" />
            Dedicated service
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE, delay: 0.08 }}
            className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[0.95] font-extrabold tracking-tight text-ink uppercase"
          >
            National distribution.
            <span className="mt-1 block text-lm-red">Local commitment.</span>
          </motion.h2>

          <ul className="mt-10 space-y-3">
            {DEDICATED_SERVICES.map((item, i) => {
              const isActive = i === active
              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.85, ease: EASE, delay: i * 0.08 }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-start gap-5 border px-5 py-4 text-left transition-all duration-500 ${
                      isActive
                        ? 'border-lm-blue bg-white shadow-[0_12px_40px_rgba(11,18,21,0.06)]'
                        : 'border-line bg-white/40 hover:border-lm-blue/30 hover:bg-white/80'
                    }`}
                  >
                    <span
                      className={`tech-label mt-0.5 transition-colors duration-500 ${
                        isActive ? 'text-lm-red' : 'text-ink/25'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`font-display block text-base font-bold tracking-tight uppercase transition-colors duration-500 ${
                          isActive ? 'text-ink' : 'text-ink/70'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`mt-1 block text-sm font-light transition-all duration-500 ${
                          isActive ? 'max-h-24 opacity-100 text-muted' : 'max-h-0 overflow-hidden opacity-0'
                        }`}
                      >
                        {item.text}
                      </span>
                    </span>
                    <motion.span
                      aria-hidden
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      className="mt-2 h-px w-8 origin-left bg-lm-red"
                    />
                  </button>
                </motion.li>
              )
            })}
          </ul>

          <div className="mt-10">
            <MagneticButton href={INQUIRY_MAILTO} variant="blue">
              Submit inquiry
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
