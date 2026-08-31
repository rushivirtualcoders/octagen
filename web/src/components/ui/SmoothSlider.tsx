import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/animations'

type Props = {
  count: number
  active: number
  onChange: (index: number) => void
  autoPlay?: boolean
  interval?: number
  mode?: 'fade' | 'slide'
  className?: string
  renderSlide: (index: number) => ReactNode
}

export default function SmoothSlider({
  count,
  active,
  onChange,
  autoPlay = true,
  interval = 5200,
  mode = 'fade',
  className = '',
  renderSlide,
}: Props) {
  const reduced = useReducedMotion()
  const [direction, setDirection] = useState(1)

  const go = useCallback(
    (next: number, dir = 1) => {
      setDirection(dir)
      onChange((next + count) % count)
    },
    [count, onChange],
  )

  useEffect(() => {
    if (!autoPlay || reduced || count <= 1) return
    const id = window.setInterval(() => go(active + 1, 1), interval)
    return () => window.clearInterval(id)
  }, [active, autoPlay, count, go, interval, reduced])

  const variants =
    mode === 'slide'
      ? {
          enter: (d: number) => ({ x: d > 0 ? '108%' : '-108%', opacity: 0.35 }),
          center: { x: 0, opacity: 1 },
          exit: (d: number) => ({ x: d > 0 ? '-108%' : '108%', opacity: 0.35 }),
        }
      : {
          enter: { opacity: 0, scale: 1.04 },
          center: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.98 },
        }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={active}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.95, ease: EASE }}
          className="h-full w-full"
        >
          {renderSlide(active)}
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => go(i, i > active ? 1 : -1)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? 'w-10 bg-lm-red' : 'w-3 bg-ink/15 hover:bg-lm-orange/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
