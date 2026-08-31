import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { EASE } from '../../lib/animations'
import { ASSETS, BRAND, CLAIM, DISTRIBUTOR, DISTRIBUTOR_TAGLINE, HERO_STATS } from '../../lib/constants'
import AnimatedCounter from '../ui/AnimatedCounter'
import MagneticButton from '../ui/MagneticButton'
import SplitText from '../ui/SplitText'
import HeroVideo from '../ui/HeroVideo'

export default function Hero() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-base lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
      aria-label="Octagen and LIQUI MOLY India"
    >
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col justify-between px-6 pt-32 pb-8 lg:px-10 lg:pt-36 lg:pb-10"
      >
        <div className="section-rail max-w-xl lg:max-w-2xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 2.1, ease: EASE }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <img src={ASSETS.liquiMolyLogo} alt={BRAND} className="h-8 w-auto" />
            <span className="tech-label text-lm-red">{DISTRIBUTOR_TAGLINE}</span>
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 2.15, ease: EASE }}
            className="tech-label mb-4 text-lm-orange"
          >
            {CLAIM} · {DISTRIBUTOR}
          </motion.p>

          <SplitText
            as="h1"
            text="GERMAN MOTOR OILS FOR INDIA"
            accentWord="INDIA"
            delay={2.2}
            immediate
            className="font-display text-[clamp(2.2rem,5.2vw,4.8rem)] leading-[0.92] font-extrabold tracking-[-0.025em] text-ink uppercase"
          />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 2.85 }}
            className="mt-7 max-w-lg text-[0.95rem] leading-relaxed text-muted"
          >
            {DISTRIBUTOR} is the exclusive authorised national distributor for {BRAND} in India —
            motor oils, additives and car care with specification-led selection, workshop support
            and inquiry-based supply nationwide.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 3 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticButton href="#paths">Explore Car Products</MagneticButton>
            <MagneticButton href="#paths" variant="orange">
              Explore Bike Products
            </MagneticButton>
          </motion.div>
        </div>

        <motion.dl
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 lg:grid-cols-4"
        >
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.25 + i * 0.07, duration: 0.7, ease: EASE }}
            >
              <dd className="font-display text-2xl font-bold tracking-tight text-ink lg:text-3xl">
                <AnimatedCounter to={stat.to} suffix={stat.suffix} duration={2.2} />
              </dd>
              <dt className="tech-label mt-2 text-muted">{stat.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>

      <div className="relative min-h-[42svh] lg:min-h-[100svh]">
        <motion.div
          style={reduced ? undefined : { scale: panelScale }}
          className="absolute inset-0 origin-center lg:clip-diagonal-tr"
        >
          <HeroVideo />
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:bg-gradient-to-l lg:from-white/20 lg:via-transparent lg:to-transparent"
        />
        <motion.div
          aria-hidden
          initial={reduced ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 2.5, ease: EASE }}
          className="absolute top-0 left-0 hidden h-full w-1 origin-top bg-lm-red lg:block"
        />
      </div>
    </section>
  )
}
