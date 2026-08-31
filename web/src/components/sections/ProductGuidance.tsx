import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import SectionFrame from '../ui/SectionFrame'
import { ASSETS, INQUIRY_MAILTO } from '../../lib/constants'
import { EASE } from '../../lib/animations'

const FAQS = [
  {
    q: 'Where can I buy LIQUI MOLY in India?',
    a: 'Through Octagen — the exclusive authorized national distributor. Submit an inquiry on this page and we will quote supply for your requirement.',
  },
  {
    q: 'Which oil is right for my car or bike?',
    a: 'Check your owner\'s manual for the OEM viscosity grade and approval code (e.g. ACEA C3, BMW Longlife-04, VW 504.00). Share your vehicle details with us and we will confirm the right product.',
  },
  {
    q: 'Can workshops and fleets order in bulk?',
    a: 'Yes. Octagen handles wholesale supply for workshops, service centres and fleet operators across India. Use the inquiry form to start the conversation.',
  },
  {
    q: 'Is LIQUI MOLY made in Germany?',
    a: 'Yes. Every product is formulated, developed and manufactured in Germany — the same chemistry trusted by Formula 1, MotoGP and ADAC motorsport globally.',
  },
  {
    q: 'How long does supply take?',
    a: 'Octagen distributes nationally. Once your inquiry is confirmed and a quote accepted, supply timelines depend on volume and location — typically discussed as part of the quote process.',
  },
]

function FAQItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="border-b border-line last:border-b-0"
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left"
      >
        <span className="font-display text-sm font-bold uppercase tracking-tight text-ink sm:text-[0.95rem]">{q}</span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mt-0.5 shrink-0 text-xl leading-none text-lm-red"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.38, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="pb-4 pr-8 text-sm leading-relaxed text-muted">{a}</p>
      </motion.div>
    </motion.div>
  )
}

export default function ProductGuidance() {
  const reduced = useReducedMotion()

  return (
    <>
      <section
        id="guidance"
        aria-label="Product guidance"
        className="relative overflow-hidden border-t border-line bg-base"
      >
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-14 lg:px-10 lg:py-20">
            <SectionFrame
              index="08"
              eyebrow="Product guidance"
              title={['NOT SURE WHAT', 'YOUR MACHINE NEEDS?']}
              accentLine={1}
              description="Tell us about your vehicle, application or business requirement. We help identify the right next step — no oil finder, no checkout, just a qualified inquiry."
            />
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              className="mt-8"
            >
              <MagneticButton href={INQUIRY_MAILTO}>Talk to a product specialist</MagneticButton>
              <p className="mt-4 max-w-sm text-[0.72rem] leading-relaxed text-muted">
                Inquiry is the only path to supply. Email routing is provisional until production
                addresses are confirmed.
              </p>
            </motion.div>
          </div>

          <div className="relative min-h-[18rem] bg-lm-blue lg:min-h-[auto]">
            <div className="absolute inset-0">
              <img
                src={ASSETS.oilPour}
                alt="LIQUI MOLY product being applied in a workshop"
                loading="lazy"
                className="h-full w-full object-cover opacity-90 mix-blend-luminosity"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-lm-blue/80 via-lm-blue/40 to-lm-red/30" />
            <motion.div
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="absolute top-0 left-0 h-1 w-full origin-left bg-lm-red"
            />
            <div className="relative z-10 flex h-full min-h-[18rem] items-end p-8 lg:p-12">
              <div>
                <p className="tech-label text-lm-red">Octagen · India</p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/85">
                  Specification first. Supply through Octagen — the exclusive authorized national
                  distributor for LIQUI MOLY in India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-label="Frequently asked questions"
        className="border-t border-line bg-surface py-10 lg:py-12"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="tech-label text-lm-red">Quick answers</p>
              <h2 className="font-display mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold uppercase leading-tight tracking-tight text-ink">
                FREQUENTLY<br />
                <span className="text-lm-red">ASKED</span> QUESTIONS
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                Everything you need before submitting an inquiry — products, supply, specifications and
                the Octagen network.
              </p>
              <div className="mt-6">
                <MagneticButton href={INQUIRY_MAILTO}>Get a quote</MagneticButton>
              </div>
            </motion.div>

            <div className="divide-y divide-line border-t border-line" itemScope itemType="https://schema.org/FAQPage">
              {FAQS.map((faq, i) => (
                <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <meta itemProp="name" content={faq.q} />
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <meta itemProp="text" content={faq.a} />
                  </div>
                  <FAQItem q={faq.q} a={faq.a} delay={i * 0.06} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
