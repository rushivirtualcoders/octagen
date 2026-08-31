import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  className?: string
  /** rear-left studio (hero) vs track (racing) */
  intensity?: 'subtle' | 'drift'
}

/**
 * Tire smoke — hero and racing only. Soft, sparse, never cartoon.
 */
export default function TireSmoke({ className = '', intensity = 'subtle' }: Props) {
  const reduced = useReducedMotion()
  if (reduced) return null

  const wisps = intensity === 'drift' ? [0, 1, 2, 3] : [0, 1, 2]

  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      <img
        src="/assets/images/tire-smoke.png"
        alt=""
        className={`absolute inset-0 h-full w-full object-cover mix-blend-multiply ${
          intensity === 'drift' ? 'opacity-45' : 'opacity-28'
        }`}
      />
      {wisps.map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gradient-to-t from-ink/20 via-ink/8 to-transparent blur-2xl"
          style={{
            width: 140 + i * 40,
            height: 70 + i * 18,
            left: `${8 + i * 10}%`,
            bottom: `${4 + i * 3}%`,
          }}
          animate={{
            x: [0, -28 - i * 12, -50 - i * 18],
            y: [0, -8, -16],
            opacity: [0, intensity === 'drift' ? 0.35 : 0.22, 0],
            scale: [0.7, 1.15, 1.4],
          }}
          transition={{
            duration: 4.2 + i * 0.6,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.7,
          }}
        />
      ))}
    </div>
  )
}
