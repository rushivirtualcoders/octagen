import type { Variants } from 'framer-motion'

/** Cinematic ease — slow, confident settle. */
export const EASE = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE, delay },
  }),
}

export const fadeBlur: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.05, ease: EASE, delay },
  }),
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.95, ease: EASE, delay },
  }),
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: EASE, delay },
  }),
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: EASE, delay },
  }),
}

export const lineReveal: Variants = {
  hidden: { y: '112%' },
  visible: (delay = 0) => ({
    y: 0,
    transition: { duration: 1.1, ease: EASE, delay },
  }),
}

export const staggerChildren: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
}
