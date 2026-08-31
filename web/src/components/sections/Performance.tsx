import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import CinematicCar from '../ui/CinematicCar'
import LightStreaks from '../ui/LightStreaks'
import AnimatedCounter from '../ui/AnimatedCounter'
import { ASSETS, PERFORMANCE_METRICS } from '../../lib/constants'
import { EASE } from '../../lib/animations'

export default function Performance() {
  const ref = useRef<HTMLElement>(null)
  const [rpm, setRpm] = useState(1200)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const floatY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const heat = useTransform(scrollYProgress, [0.2, 0.7], [0.15, 0.85])
  const rpmMv = useTransform(scrollYProgress, [0.15, 0.75], [1800, 8200])

  useMotionValueEvent(rpmMv, 'change', (v) => setRpm(Math.round(v)))

  return (
    <section id="performance" ref={ref} className="relative bg-surface py-28 lg:py-40">
      <LightStreaks className="absolute inset-x-0 top-0 h-16" />

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div
          initial={{ clipPath: 'inset(12% 12% 12% 12%)', opacity: 0.4 }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.35, ease: EASE }}
          style={{ y: floatY }}
          className="relative aspect-[4/3] overflow-hidden shadow-[0_30px_80px_rgba(11,18,21,0.12)] lg:aspect-[5/4]"
        >
          <CinematicCar
            src={ASSETS.performance}
            alt="Fictional performance car in a bright studio"
            className="absolute inset-0 h-full w-full"
            lightSweep
            autoOrbit
          />
          {/* Heat / friction overlay — no smoke */}
          <motion.div
            aria-hidden
            style={{ opacity: heat }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(226,0,26,0.28),transparent_55%)] mix-blend-multiply"
          />
          <div className="absolute right-5 bottom-5 z-10 flex items-end gap-4">
            <p className="tech-label text-white/80 drop-shadow">Chassis 07 · Studio</p>
            <div className="bg-white/90 px-3 py-2 backdrop-blur-sm">
              <p className="font-display text-lg font-bold text-ink tabular-nums">
                {rpm.toLocaleString('en-US')}
              </p>
              <p className="tech-label text-[0.55rem] text-muted">RPM</p>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionHeading
            eyebrow="Advanced lubrication technology"
            lines={['PERFORMANCE', 'WITHOUT', 'COMPROMISE']}
            accentLine={2}
          />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
            className="mt-8 max-w-lg leading-relaxed font-light text-muted"
          >
            Advanced lubrication technology designed to reduce friction, protect critical engine
            components and maintain performance under the most demanding conditions.
          </motion.p>

          <div className="mt-12 space-y-7">
            {PERFORMANCE_METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, ease: EASE, delay: i * 0.1 }}
              >
                <div className="mb-2.5 flex items-baseline justify-between">
                  <span className="tech-label text-ink/80">{metric.label}</span>
                  <span className="font-display text-lg font-bold text-lm-orange">{metric.display}</span>
                </div>
                <div className="h-px w-full bg-ink/10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: EASE, delay: 0.15 + i * 0.1 }}
                    style={{ width: `${metric.pct}%`, transformOrigin: 'left' }}
                    className="h-full bg-gradient-to-r from-lm-orange to-lm-red"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <p className="tech-label mt-10 text-muted">
            Friction drop{' '}
            <span className="text-lm-orange">
              <AnimatedCounter to={38} suffix="%" prefix="-" duration={1.6} />
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
