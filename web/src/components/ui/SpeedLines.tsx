import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  className?: string
  color?: string
}

/** Horizontal speed lines — hero entrance and racing only. */
export default function SpeedLines({ className = '', color = 'via-lm-blue/40' }: Props) {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          className={`absolute h-px w-[55%] bg-gradient-to-r from-transparent ${color} to-transparent`}
          style={{ top: `${12 + i * 14}%`, left: '-10%' }}
          animate={{ x: ['-20%', '80%'], opacity: [0, 0.7, 0] }}
          transition={{
            duration: 1.8 + i * 0.18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.14,
          }}
        />
      ))}
    </div>
  )
}
