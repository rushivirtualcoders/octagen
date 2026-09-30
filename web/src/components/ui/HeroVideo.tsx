'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ASSETS } from '../../lib/constants'

/**
 * Full-bleed LIQUI MOLY commercial loop for the homepage hero.
 * Muted / playsInline / loops — poster shown until playback starts.
 */
export default function HeroVideo() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const play = () => {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
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
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={ASSETS.heroPoster}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
      />
    )
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Poster underneath until video is ready */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.heroPoster}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover object-[68%_center] transition-opacity duration-700 ${
          playing ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <motion.video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={ASSETS.heroPoster}
        onPlaying={() => setPlaying(true)}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: playing ? 1 : 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[68%_center]"
      >
        <source src={ASSETS.heroVideo} type="video/mp4" />
      </motion.video>
    </div>
  )
}
