import { motion, useReducedMotion } from 'framer-motion'

/** Brief light-streak wipe used once between major chapters. */
export default function LightStreaks({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 h-[2px] w-[40%] -translate-y-1/2 bg-gradient-to-r from-transparent via-lm-red/50 to-transparent"
          style={{ top: `${40 + i * 18}%` }}
          initial={{ x: '-60%', opacity: 0 }}
          whileInView={{ x: ['-60%', '120%'], opacity: [0, 1, 0] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, delay: 0.15 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  )
}
