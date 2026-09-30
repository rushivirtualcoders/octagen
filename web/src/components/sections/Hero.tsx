'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/animations'
import { CLAIM } from '../../lib/constants'
import HeroVideo from '../ui/HeroVideo'
import SplitText from '../ui/SplitText'

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-base"
      aria-label="Octagen high performance motor oil"
    >
      <HeroVideo />

      {/* Scrim only behind the headline so on-screen video type stays visible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,46rem)] bg-gradient-to-r from-white from-40% via-white/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/55 to-transparent"
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 pt-24 pb-16 lg:px-10 lg:pt-28">
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
        </div>
      </div>
    </section>
  )
}
