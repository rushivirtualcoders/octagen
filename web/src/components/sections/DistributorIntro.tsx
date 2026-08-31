import { motion, useReducedMotion } from 'framer-motion'
import { DISTRIBUTOR, DISTRIBUTOR_POINTS } from '../../lib/constants'
import { EASE } from '../../lib/animations'

export default function DistributorIntro() {
  const reduced = useReducedMotion()

  return (
    <section
      id="octagen"
      aria-label="About Octagen distribution"
      className="border-t border-line bg-ink text-white"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 lg:px-10 lg:py-16">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="tech-label text-lm-orange">Exclusive national distributor</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] font-extrabold tracking-tight uppercase">
            {DISTRIBUTOR} brings German automotive brands to India
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/70">
            Octagen operates and fulfils LIQUI MOLY across India — authorised supply, technical guidance,
            workshop support and inquiry-led ordering for retail, fleet and bulk buyers.
          </p>
        </motion.div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {DISTRIBUTOR_POINTS.map((point, i) => (
            <motion.li
              key={point.title}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.07 }}
              className="border border-white/10 bg-white/5 p-5"
            >
              <p className="tech-label text-lm-orange">{point.tag}</p>
              <p className="mt-2 font-display text-lg font-bold tracking-tight">{point.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{point.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
