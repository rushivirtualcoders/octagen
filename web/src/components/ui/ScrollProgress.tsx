import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin racing-stripe scroll progress — Ferrari / Mercedes-style chrome. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 })

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[3px] bg-transparent">
      <motion.div style={{ scaleX, transformOrigin: 'left' }} className="h-full racing-stripe-h" />
    </div>
  )
}
