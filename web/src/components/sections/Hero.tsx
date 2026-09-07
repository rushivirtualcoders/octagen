import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { EASE } from '../../lib/animations'
import { CLAIM, HERO_SLIDES, HERO_STATS } from '../../lib/constants'
import AnimatedCounter from '../ui/AnimatedCounter'
import HeroImageSlider from '../ui/HeroImageSlider'
import MagneticButton from '../ui/MagneticButton'
import SplitText from '../ui/SplitText'

export default function Hero() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-base"
      aria-label="Octagen high performance motor oil"
    >
      <HeroImageSlider
        slides={HERO_SLIDES}
        active={activeSlide}
        onActiveChange={setActiveSlide}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/25 sm:via-white/88 sm:to-white/10 lg:via-white/75 lg:to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent"
      />

      <div
        className="absolute top-1/2 right-5 z-20 flex -translate-y-1/2 flex-col items-center gap-2.5 lg:right-8"
        role="tablist"
        aria-label="Hero image slides"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeSlide
          return (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show slide ${index + 1}: ${slide.alt}`}
              onClick={() => setActiveSlide(index)}
              className={`rounded-full transition-all duration-500 ease-out ${
                isActive ? 'size-2.5 bg-lm-red shadow-[0_0_0_3px_rgba(226,0,26,0.2)]' : 'size-1.5 bg-ink/30 hover:bg-ink/50'
              }`}
            />
          )
        })}
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-between px-6 pt-24 pb-8 lg:px-10 lg:pt-28 lg:pb-10"
      >
        <div className="section-rail max-w-xl lg:max-w-2xl">
          <motion.p
            initial={reduced ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="tech-label mb-6 text-lm-blue"
          >
            {CLAIM}
          </motion.p>

          <SplitText
            as="h1"
            text="ENGINEERED FOR EXTREME PERFORMANCE"
            accentWord="EXTREME"
            delay={0.15}
            immediate
            className="font-display text-[clamp(2.4rem,5.5vw,5.2rem)] leading-[0.9] font-extrabold tracking-[-0.025em] text-ink uppercase"
          />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="mt-7 max-w-md text-[0.95rem] leading-relaxed text-muted"
          >
            Advanced motor oil engineered for power, protection and performance under extreme
            conditions.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticButton href="#paths">Explore Car Products</MagneticButton>
            <MagneticButton href="#paths" variant="blue">
              Explore Bike Products
            </MagneticButton>
          </motion.div>
        </div>

        <motion.dl
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-12 grid max-w-4xl grid-cols-2 gap-6 border-t border-line pt-8 lg:grid-cols-4"
        >
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.06, duration: 0.65, ease: EASE }}
            >
              <dd className="font-display text-2xl font-bold tracking-tight text-ink lg:text-3xl">
                <AnimatedCounter to={stat.to} suffix={stat.suffix} duration={2.2} />
              </dd>
              <dt className="tech-label mt-2 text-muted">{stat.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  )
}
