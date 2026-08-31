import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import SmoothSlider from '../ui/SmoothSlider'
import { WHY_CHOOSE_US } from '../../lib/constants'
import { EASE } from '../../lib/animations'

const ICONS = [
  // German engineering
  <path key="gear" d="M12 8l1.2-2.2 2.2.4.8-2 2 .8.4-2.2L21 4l-2.2-1.2.4-2.2-2-.8-.8-2-2.2 1.2L12 0l-1.2 2.2-2.2-.4-.8 2-2-.8-.4 2.2L3 4l2.2 1.2-.4 2.2 2 .8.8 2 2.2-1.2L12 8z" />,
  // Motorsport
  <path key="flag" d="M4 22V4l4 2 4-2 4 2 4-2v18l-4-2-4 2-4-2-4 2-4-2z" />,
  // Protection
  <path key="shield" d="M12 2l8 3v7c0 5-3.4 9.7-8 11-4.6-1.3-8-6-8-11V5l8-3z" />,
  // Range
  <path key="grid" d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />,
]

export default function WhyChooseUs() {
  const [active, setActive] = useState(0)

  return (
    <section id="why-us" aria-label="Why choose LIQUI MOLY" className="border-t border-line bg-base py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow="Why choose us"
          lines={['ENGINEERED IN GERMANY', 'TRUSTED WORLDWIDE']}
          accentLine={1}
        />

        <div className="mt-16 hidden gap-6 lg:grid lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE } }}
              className="group relative bg-surface p-8 transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(11,18,21,0.08)]"
            >
              <span className="tech-label text-ink/20">{String(i + 1).padStart(2, '0')}</span>
              <motion.div
                whileHover={{ rotate: 8, scale: 1.06 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-6 flex size-14 items-center justify-center rounded-full border border-line bg-white text-lm-blue transition-colors duration-500 group-hover:border-lm-blue group-hover:bg-lm-blue group-hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
                  {ICONS[i]}
                </svg>
              </motion.div>
              <h3 className="font-display mt-8 text-lg font-bold tracking-tight text-ink uppercase">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed font-light text-muted">{item.text}</p>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-lm-red transition-all duration-700 group-hover:w-full" />
            </motion.article>
          ))}
        </div>

        <div className="mt-12 lg:hidden">
          <SmoothSlider
            count={WHY_CHOOSE_US.length}
            active={active}
            onChange={setActive}
            mode="slide"
            renderSlide={(i) => {
              const item = WHY_CHOOSE_US[i]
              return (
                <article className="bg-surface p-8">
                  <span className="tech-label text-ink/20">{String(i + 1).padStart(2, '0')}</span>
                  <div className="mt-6 flex size-14 items-center justify-center rounded-full border border-line bg-white text-lm-blue">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
                      {ICONS[i]}
                    </svg>
                  </div>
                  <h3 className="font-display mt-8 text-xl font-bold tracking-tight text-ink uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed font-light text-muted">{item.text}</p>
                </article>
              )
            }}
          />
        </div>
      </div>
    </section>
  )
}
