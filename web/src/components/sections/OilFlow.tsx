import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ASSETS } from '../../lib/constants'
import { EASE } from '../../lib/animations'
import AnimatedCounter from '../ui/AnimatedCounter'

const PROTECTION_POINTS = [
  'Uniform synthetic film on every bearing surface',
  'Thermal stability from cold start to redline',
  'Deposit control that keeps tolerances factory-tight',
]

export default function OilFlow() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04])

  return (
    <section
      ref={sectionRef}
      id="oil-flow"
      aria-label="Oil flowing into the engine"
      className="relative border-t border-line bg-base py-28 lg:py-40"
    >
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          <p className="tech-label mb-6 flex items-center gap-3 text-lm-blue">
            <span className="inline-block size-1.5 rounded-full bg-oil" />
            Precision lubrication
          </p>

          <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.94] font-extrabold tracking-tight text-ink uppercase">
            Oil into
            <span className="block text-lm-red">the engine.</span>
          </h2>

          <p className="mt-8 max-w-lg text-base leading-relaxed font-light text-muted">
            A controlled film of synthetic oil reaching metal — the same protection that starts in
            the bottle and finishes at the redline.
          </p>

          <ul className="mt-10 space-y-4">
            {PROTECTION_POINTS.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.15 + i * 0.1 }}
                className="flex items-start gap-4 text-sm font-light text-ink/80"
              >
                <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-lm-blue" />
                {point}
              </motion.li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-10 border-t border-line pt-10">
            <div>
              <p className="font-display text-3xl font-black text-ink tabular-nums">
                <AnimatedCounter to={200} suffix="°C+" duration={1.8} />
              </p>
              <p className="tech-label mt-1 text-muted">Film strength</p>
            </div>
            <div>
              <p className="font-display text-3xl font-black text-ink tabular-nums">
                <AnimatedCounter to={15} suffix="k" duration={1.8} />
              </p>
              <p className="tech-label mt-1 text-muted">RPM protection</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          style={reduced ? undefined : { y: imageY }}
          className="relative"
        >
          <motion.div
            style={reduced ? undefined : { scale: imageScale }}
            className="relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]"
          >
            <img
              src={ASSETS.oilPour}
              alt="Synthetic oil pouring from a performance bottle into an engine"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[42%_center]"
            />

            {!reduced && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-[8%] left-[36%] h-[58%] w-10 origin-top rotate-[16deg] bg-gradient-to-b from-transparent via-[#F2C14E]/45 to-transparent blur-[2px]"
                animate={{ opacity: [0.15, 0.7, 0.15], y: ['-6%', '8%', '-6%'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
