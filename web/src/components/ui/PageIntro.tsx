import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ASSETS, CLAIM, DISTRIBUTOR } from '../../lib/constants'
import { EASE } from '../../lib/animations'

/** Brief intro curtain — Land Rover / Maserati launch feel. */
export default function PageIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(false)
      return
    }
    const t = window.setTimeout(() => setShow(false), 1600)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: EASE }}
          aria-hidden
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="racing-stripe-h absolute top-0 left-0 h-1.5 w-full origin-left"
          />
          <motion.img
            src={ASSETS.octagenLogo}
            alt={DISTRIBUTOR}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="h-14 w-auto sm:h-16"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="tech-label mt-6 text-lm-blue"
          >
            {CLAIM}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
            className="absolute bottom-0 left-0 h-1.5 w-full origin-left racing-stripe-h"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
