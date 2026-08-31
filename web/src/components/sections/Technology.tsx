import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { TECHNOLOGIES } from '../../lib/constants'
import { EASE } from '../../lib/animations'

/** Minimal line-art technical diagrams, stroke-drawn on scroll. */
const DIAGRAMS = [
  // Advanced synthetic base — molecule
  <g key="molecule" strokeWidth="1.4">
    <motion.path d="M24 8 38 16v16L24 40 10 32V16L24 8Z" />
    <motion.circle cx="24" cy="24" r="3.4" />
    <motion.path d="M24 8v12.6M38 16l-10.6 6M10 32l10.6-6" />
  </g>,
  // Thermal stability — heat waves
  <g key="thermal" strokeWidth="1.4">
    <motion.path d="M8 16c5-5 11 5 16 0s11 5 16 0" />
    <motion.path d="M8 25c5-5 11 5 16 0s11 5 16 0" />
    <motion.path d="M8 34c5-5 11 5 16 0s11 5 16 0" />
  </g>,
  // Friction control — sliding plates
  <g key="friction" strokeWidth="1.4">
    <motion.path d="M8 18h26M14 30h26" />
    <motion.path d="M30 14l4 4-4 4M18 26l-4 4 4 4" />
    <motion.path d="M8 24h32" strokeDasharray="2 4" />
  </g>,
  // Engine cleanliness — droplet + check
  <g key="clean" strokeWidth="1.4">
    <motion.path d="M24 7c7 8.5 11 13.6 11 19a11 11 0 1 1-22 0c0-5.4 4-10.5 11-19Z" />
    <motion.path d="M19 26.5l3.6 3.8L30 22" />
  </g>,
]

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.6, ease: EASE, delay: 0.25 + i * 0.15 },
  }),
}

export default function Technology() {
  return (
    <section id="technology" className="relative border-t border-line bg-base py-28 lg:py-40">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow="Formulation engineering"
          lines={['THE SCIENCE', 'BEHIND PERFORMANCE']}
        />

        <div className="mt-20 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {TECHNOLOGIES.map((tech, i) => (
            <motion.article
              key={tech.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -5, transition: { duration: 0.35, ease: EASE } }}
              className="group relative bg-white p-8 transition-colors duration-500 hover:bg-surface lg:p-10"
            >
              <span className="tech-label text-ink/25">{String(i + 1).padStart(2, '0')}</span>
              <motion.svg
                viewBox="0 0 48 48"
                fill="none"
                stroke="var(--color-lm-orange)"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-8 h-14 w-14"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={i}
                variants={{ hidden: {}, visible: {} }}
                aria-hidden
              >
                <motion.g variants={draw} custom={i}>
                  {DIAGRAMS[i]}
                </motion.g>
              </motion.svg>
              <h3 className="font-display mt-8 text-lg font-bold tracking-tight text-ink uppercase">
                {tech.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed font-light text-muted">{tech.text}</p>
              {/* Subtle oil-flow tick — technology only, no smoke */}
              <motion.span
                aria-hidden
                className="absolute top-8 right-8 size-1.5 rounded-full bg-oil"
                animate={{ y: [0, 18, 0], opacity: [0.2, 0.9, 0.2] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
              />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-lm-red transition-all duration-700 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
