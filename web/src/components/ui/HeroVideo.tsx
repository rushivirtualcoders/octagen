import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ASSETS } from '../../lib/constants'

/**
 * Cinematic hero film — muted loop, readable but still a wash
 * so type and the product still lead.
 */
export default function HeroVideo() {
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
        src={ASSETS.heroPoster}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-[0.48]"
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
      poster={ASSETS.heroPoster}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 0.58, scale: 1.03 }}
      transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      aria-hidden
    >
      <source src={ASSETS.heroVideo} type="video/mp4" />
    </motion.video>
  )
}
