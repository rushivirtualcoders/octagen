import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { EASE } from '../../lib/animations'
import { ASSETS } from '../../lib/constants'
import CinematicCar from '../ui/CinematicCar'
import TireSmoke from '../ui/TireSmoke'
import SpeedLines from '../ui/SpeedLines'
import LightStreaks from '../ui/LightStreaks'

const REDLINE_RPM = 9000

export default function Racing() {
  const ref = useRef<HTMLElement>(null)
  const [rpm, setRpm] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const fill = useTransform(scrollYProgress, [0.15, 0.75], [0, 1])
  const carSlide = useTransform(scrollYProgress, [0.05, 0.55], ['14%', '-2%'])
  const carBlur = useTransform(scrollYProgress, [0.05, 0.45], [12, 0])
  const carFilter = useTransform(carBlur, (v) => `blur(${v}px)`)
  const headlineY = useTransform(scrollYProgress, [0.1, 0.6], [48, 0])

  useMotionValueEvent(fill, 'change', (v) => {
    setRpm(Math.round(Math.min(Math.max(v, 0), 1) * REDLINE_RPM))
  })

  return (
    <section
      id="racing"
      ref={ref}
      aria-label="Motorsport DNA"
      className="relative min-h-[120vh] overflow-hidden bg-[#eef2f7]"
    >
      <LightStreaks className="absolute inset-x-0 top-0 z-[5] h-20" />

      {/* Full-bleed track visual — motorsport only */}
      <motion.div
        style={{ x: carSlide, filter: carFilter }}
        className="absolute inset-0 lg:inset-y-0 lg:left-[22%] lg:w-[78%]"
      >
        <CinematicCar
          src={ASSETS.racing}
          alt="Fictional sports car racing on a bright track"
          className="h-full w-full"
          objectPosition="center 40%"
          speedLines
          autoOrbit={false}
          lightSweep
        />
      </motion.div>

      <SpeedLines className="absolute inset-0 z-[2] hidden lg:block" />
      <TireSmoke
        intensity="drift"
        className="absolute bottom-[10%] left-[28%] z-[3] h-[38%] w-[44%] hidden lg:block"
      />

      <div className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-r from-[#eef2f7]/55 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-28 bg-gradient-to-t from-[#eef2f7]/80 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[120vh] w-full max-w-[1400px] flex-col justify-center px-6 py-32 lg:px-10">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="tech-label mb-6 flex items-center gap-3 text-lm-red"
          >
            <span className="racing-stripe-h inline-block h-1 w-10" />
            Motorsport DNA
          </motion.p>

          <motion.div style={{ y: headlineY }}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            className="font-display text-[clamp(3.2rem,9vw,8rem)] leading-[0.88] font-black tracking-[-0.03em] text-ink uppercase drop-shadow-[0_2px_18px_rgba(255,255,255,0.85)]"
            >
              {['BUILT FOR', 'THE REDLINE'].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    variants={{
                      hidden: { y: '112%' },
                      visible: {
                        y: 0,
                        transition: { duration: 1.1, ease: EASE, delay: i * 0.12 },
                      },
                    }}
                    className={`block ${i === 1 ? 'text-lm-red' : ''}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="mt-8 max-w-md text-base leading-relaxed font-light text-muted"
          >
            Performance engineered for drivers who push beyond ordinary limits — inspired by the
            precision of Formula racing and grand touring.
          </motion.p>
        </div>

        <div className="mt-16 flex items-end gap-8 lg:mt-20">
          <div className="hidden h-[320px] flex-col items-end justify-between py-1 md:flex">
            {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((n) => (
              <span
                key={n}
                className={`tech-label ${n >= 7 ? 'text-lm-red' : 'text-ink/25'}`}
              >
                {n}
              </span>
            ))}
          </div>
          <div className="relative h-[280px] w-1.5 overflow-hidden bg-ink/10 md:h-[320px]">
            <motion.div
              style={{ scaleY: fill, transformOrigin: 'bottom' }}
              className="absolute inset-0 bg-gradient-to-t from-lm-orange via-lm-red to-lm-red"
            />
          </div>
          <div className="flex flex-col justify-between py-1">
            <span className="tech-label text-lm-red">Redline</span>
            <div>
              <p className="font-display text-[clamp(2.4rem,6vw,4rem)] font-black tracking-tight text-ink tabular-nums">
                {rpm.toLocaleString('en-US')}
              </p>
              <p className="tech-label mt-1 text-muted">RPM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
