import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/animations'
import { PARTNER_BRANDS } from '../../lib/constants'
import SectionFrame from '../ui/SectionFrame'

export default function BrandsPartners() {
  const reduced = useReducedMotion()

  return (
    <section id="brands" aria-label="Octagen brand portfolio" className="border-t border-line bg-base py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionFrame
          index="03"
          eyebrow="Brand portfolio"
          title={['OCTAGEN DISTRIBUTES', 'PREMIUM AUTOMOTIVE BRANDS.']}
          accentLine={1}
          description="LIQUI MOLY leads today. The platform is structured for additional authorised brands — the same model used by multi-brand distributors such as Semini Motors (Sri Lanka) and regional Liqui Moly importers."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_BRANDS.map((brand, i) => {
            const active = brand.status === 'active'
            return (
              <motion.article
                key={brand.id}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className={`relative flex flex-col border p-6 transition-shadow duration-300 ${
                  active
                    ? 'border-lm-red bg-ink text-white shadow-[0_24px_60px_rgba(11,18,21,0.18)]'
                    : 'border-line bg-white hover:border-lm-orange/40 hover:shadow-md'
                }`}
              >
                {active && (
                  <span className="tech-label absolute top-4 right-4 bg-lm-red px-2 py-1 text-white">
                    Live now
                  </span>
                )}
                {!active && (
                  <span className="tech-label absolute top-4 right-4 text-lm-orange">Coming soon</span>
                )}
                <p className={`tech-label ${active ? 'text-lm-orange' : 'text-muted'}`}>{brand.origin}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight uppercase">
                  {brand.name}
                </h3>
                <p className={`mt-3 flex-1 text-sm leading-relaxed ${active ? 'text-white/75' : 'text-muted'}`}>
                  {brand.category}
                </p>
                <p className={`mt-5 text-xs leading-relaxed ${active ? 'text-white/60' : 'text-muted/80'}`}>
                  {brand.note}
                </p>
              </motion.article>
            )
          })}
        </div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="tech-label mt-10 text-center text-muted"
        >
          Reference distributors studied: Mannol · BMC Filters · K&N · Liqui Moly Indonesia & Thailand · Semini Motors
        </motion.p>
      </div>
    </section>
  )
}
