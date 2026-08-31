import { motion, useReducedMotion } from 'framer-motion'
import { EASE, fadeBlur, fadeUp, scaleIn, slideLeft, slideRight, staggerFast } from '../../lib/animations'

type Variant = 'up' | 'blur' | 'scale' | 'left' | 'right'

const VARIANTS = {
  up: fadeUp,
  blur: fadeBlur,
  scale: scaleIn,
  left: slideLeft,
  right: slideRight,
} as const

type Props = {
  children: React.ReactNode
  variant?: Variant
  delay?: number
  once?: boolean
  margin?: string
  className?: string
}

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  once = true,
  margin = '-60px',
  className = '',
}: Props) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      custom={delay}
      variants={VARIANTS[variant]}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealStagger({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={staggerFast}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
