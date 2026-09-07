import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin racing-stripe scroll progress — Ferrari / Mercedes-style chrome. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  // Lighter spring — less lag behind Lenis
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.15 })

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[3px] bg-transparent">
      <motion.div style={{ scaleX, transformOrigin: 'left' }} className="h-full racing-stripe-h" />
    </div>
  )
}
