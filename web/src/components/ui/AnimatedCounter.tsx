import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/animations'

type Props = {
  to: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

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
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
