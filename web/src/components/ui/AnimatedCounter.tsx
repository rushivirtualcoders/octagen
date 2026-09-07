import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/animations'

type Props = {
  to: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

/** Updates DOM text directly — avoids React re-render every animation frame. */
export default function AnimatedCounter({
  to,
  suffix = '',
  prefix = '',
  className = '',
  duration = 1.8,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return

    const write = (n: number) => {
      el.textContent = `${prefix}${n.toLocaleString('en-US')}${suffix}`
    }

    if (reduced) {
      write(to)
      return
    }

    write(0)
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => write(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration, reduced, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
