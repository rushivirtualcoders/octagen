import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ASSETS } from '../../lib/constants'

type Props = {
  className?: string
  opacity?: number
}

/** Muted loop for insight / knowledge sections — poster fallback when motion is reduced. */
export default function SectionVideo({ className = '', opacity = 0.72 }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const play = () => {
      el.play().catch(() => undefined)
    }

    const onVisibility = () => {
      if (document.hidden) el.pause()
      else play()
    }

    play()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [reduced])

  if (reduced) {
    return (
      <img
        src={ASSETS.insightsPoster}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        style={{ opacity }}
      />
    )
  }

  return (
    <motion.video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={ASSETS.insightsPoster}
      initial={{ opacity: 0, scale: 1.06 }}
      whileInView={{ opacity, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${className}`}
      aria-hidden
    >
      <source src={ASSETS.insightsVideo} type="video/mp4" />
    </motion.video>
  )
}
