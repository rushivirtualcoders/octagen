import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

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

/** Only paints active + previous slide to cut GPU cost of 5 full-bleed layers. */
export default function HeroImageSlider({
  slides,
  active,
  onActiveChange,
  interval = 6500,
}: Props) {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [prev, setPrev] = useState(active)
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    if (slides.length === 0) return
    let cancelled = false
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if (!cancelled) setReady(true)
    }
    img.onerror = () => {
      if (!cancelled) setReady(true)
    }
    img.src = slides[0].src

    // Warm the next slide only (not the whole gallery)
    if (slides[1]) {
      const next = new Image()
      next.decoding = 'async'
      next.src = slides[1].src
    }

    return () => {
      cancelled = true
    }
  }, [slides])

  useEffect(() => {
    if (active === prev) return
    setPrev(active)
  }, [active, prev])

  useEffect(() => {
    if (!ready || reduced || slides.length <= 1) return
    const id = window.setInterval(() => {
      const current = activeRef.current
      onActiveChange((current + 1) % slides.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [interval, onActiveChange, ready, reduced, slides.length])

  if (slides.length === 0) return null

  const indices = prev === active ? [active] : [prev, active]

  return (
    <div
      className="absolute inset-0 bg-white transition-opacity duration-700"
      style={{ opacity: ready ? 1 : 0 }}
      aria-hidden
    >
      {indices.map((index) => {
        const slide = slides[index]
        const isActive = index === active
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${slide.src}-${index}`}
            src={slide.src}
            alt=""
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'low'}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
            style={{
              opacity: isActive ? 1 : 0,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        )
      })}
    </div>
  )
}
