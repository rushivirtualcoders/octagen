import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/animations'
import { ASSETS, INQUIRY_MAILTO } from '../../lib/constants'
import MagneticButton from '../ui/MagneticButton'

export default function FinalCTA() {
  const reduced = useReducedMotion()

  return (
    <section
      id="contact"
      className="relative flex min-h-[90vh] items-center overflow-hidden border-t border-line bg-base"
    >
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-[18%] left-[12%] size-32 rounded-full bg-lm-blue/10 blur-2xl"
            animate={{ y: [0, -18, 0], x: [0, 12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[10%] bottom-[22%] size-40 rounded-full bg-lm-red/10 blur-3xl"
            animate={{ y: [0, 14, 0], x: [0, -10, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
        </>
      )}
      <img
        src={ASSETS.engine}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,119,10,0.06),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-32 text-center lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="tech-label mb-8 text-lm-blue"
        >
          Every drop engineered
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="font-display mx-auto max-w-5xl text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.94] font-black tracking-[-0.02em] text-ink uppercase"
        >
          {['ENGINEERED FOR', 'EVERY REVOLUTION.'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                variants={{
                  hidden: { y: '112%' },
                  visible: {
                    y: 0,
                    transition: { duration: 1.1, ease: EASE, delay: i * 0.12 },
                  },
                }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          className="mx-auto mt-8 max-w-md leading-relaxed font-light text-muted"
        >
          Tell us about your vehicle or fleet and our team will recommend the right oil — no carts,
          no checkout, just engineering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href={INQUIRY_MAILTO}>Submit Inquiry / Get Quote</MagneticButton>
          <MagneticButton href="#products" variant="ghost" dataCursor="VIEW">
            Explore the Range
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
