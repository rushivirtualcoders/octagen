import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

type Props = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost' | 'orange' | 'white'
  className?: string
  dataCursor?: string
}

export default function MagneticButton({
  children,
  href = '#',
  variant = 'primary',
  className = '',
  dataCursor,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 16 })
  const sy = useSpring(y, { stiffness: 200, damping: 16 })

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.32)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.32)
  }

  const styles =
    variant === 'primary'
      ? 'bg-lm-red text-white hover:bg-[#c40017]'
      : variant === 'orange'
        ? 'bg-lm-orange text-white hover:bg-[#c44a00]'
        : variant === 'white'
          ? 'bg-white text-ink hover:bg-surface'
          : 'border border-ink/20 text-ink hover:border-lm-orange hover:text-lm-orange'

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor={dataCursor}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{ x: sx, y: sy }}
      className={`sweep inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.7rem] font-semibold tracking-[0.24em] uppercase transition-colors duration-300 ${styles} ${className}`}
    >
      {children}
    </motion.a>
  )
}
