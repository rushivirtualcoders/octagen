import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/animations'

type Slide = {
  src: string
  alt: string
}

type Props = {
  slides: readonly Slide[]
  active: number
  onActiveChange: (index: number) => void
  interval?: number
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

export default function HeroImageSlider({
  slides,
  active,
  onActiveChange,
  interval = 5500,
}: Props) {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (slides.length === 0) return

    let cancelled = false

    const load = async () => {
      await preloadImage(slides[0].src)
      if (!cancelled) setReady(true)

      await Promise.all(slides.slice(1).map((slide) => preloadImage(slide.src)))
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [slides])

  useEffect(() => {
    if (!ready || reduced || slides.length <= 1) return

    const id = window.setInterval(() => {
      onActiveChange((active + 1) % slides.length)
    }, interval)

    return () => window.clearInterval(id)
  }, [active, interval, onActiveChange, ready, reduced, slides.length])

  if (slides.length === 0) return null

  return (
    <motion.div
      className="absolute inset-0 bg-white"
      initial={false}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      aria-hidden
    >
      {slides.map((slide, index) => (
        <motion.img
          key={slide.src}
          src={slide.src}
          alt=""
          decoding="async"
          fetchPriority={index === 0 ? 'high' : 'low'}
          loading={index === 0 ? 'eager' : 'lazy'}
          initial={false}
          animate={{ opacity: index === active ? 1 : 0 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ))}
    </motion.div>
  )
}
