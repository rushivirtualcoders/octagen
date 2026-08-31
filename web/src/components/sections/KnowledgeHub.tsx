import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import SectionVideo from '../ui/SectionVideo'
import { INQUIRY_MAILTO, KNOWLEDGE_ARTICLES } from '../../lib/constants'
import { EASE } from '../../lib/animations'

export default function KnowledgeHub() {
  const reduced = useReducedMotion()
  const [featured, ...rest] = KNOWLEDGE_ARTICLES
  const [active, setActive] = useState<string>(featured.index)

  return (
    <section id="insights" aria-label="Knowledge hub preview" className="border-t border-line bg-base py-8 lg:py-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionFrame
          index="07"
          eyebrow="Knowledge hub preview"
          title={['KNOWLEDGE THAT', 'KEEPS YOU MOVING.']}
          accentLine={1}
          align="center"
          compact
          description="Source-backed guidance before you inquire — provisional articles, not final technical advice."
        />

        <div className="mt-5 overflow-hidden border border-line lg:mt-6 lg:grid lg:grid-cols-[0.92fr_1.08fr]">
          <article className="relative min-h-[15rem] overflow-hidden border-b border-line bg-ink sm:min-h-[17rem] lg:min-h-[18.5rem] lg:border-b-0 lg:border-r">
            <SectionVideo opacity={0.78} />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />
            <motion.span
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="absolute top-0 left-0 z-10 h-0.5 w-full origin-left bg-lm-red"
            />

            <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7">
              <div className="flex items-start justify-between gap-3">
                <p className="tech-label text-lm-red">{featured.tag} · featured</p>
                <span className="font-display text-4xl font-black text-white/15 sm:text-5xl">{featured.index}</span>
              </div>

              <div>
                <h3 className="font-display max-w-sm text-[clamp(1.25rem,2.6vw,1.85rem)] font-extrabold uppercase leading-tight text-white">
                  {featured.title}
                </h3>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-white/75 sm:text-sm">{featured.summary}</p>
                <a
                  href={INQUIRY_MAILTO}
                  className="tech-label mt-4 inline-flex items-center gap-2 text-white transition-transform hover:translate-x-1"
                >
                  Ask for guidance →
                </a>
              </div>
            </div>
          </article>

          <div className="flex flex-col divide-y divide-line bg-surface">
            {rest.map((article, i) => {
              const isActive = active === article.index
              return (
                <motion.article
                  key={article.index}
                  initial={reduced ? false : { opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
                  onMouseEnter={() => setActive(article.index)}
                  onFocus={() => setActive(article.index)}
                  tabIndex={0}
                  className={`group relative flex flex-1 items-stretch transition-colors duration-300 ${
                    isActive ? 'bg-white' : 'bg-base hover:bg-white/70'
                  }`}
                >
                  <motion.span
                    aria-hidden
                    className="w-1 shrink-0"
                    animate={{ background: isActive ? article.stripe : '#e2e8f0' }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                  <div className="flex flex-1 flex-col justify-center px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="tech-label text-lm-red">{article.tag}</p>
                      <span
                        aria-hidden
                        className="font-display text-xl font-black sm:text-2xl"
                        style={{
                          background: article.stripe,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {article.index}
                      </span>
                    </div>
                    <h3 className="font-display mt-2 text-base font-bold uppercase tracking-tight text-ink sm:text-lg">
                      {article.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{article.summary}</p>
                    <span className="tech-label mt-3 inline-flex text-lm-orange opacity-0 transition-opacity group-hover:opacity-100">
                      Read concept →
                    </span>
                  </div>
                </motion.article>
              )
            })}

            <div className="grid grid-cols-3 divide-x divide-line bg-white">
              {KNOWLEDGE_ARTICLES.map((article) => (
                <div key={`tag-${article.index}`} className="px-3 py-3 text-center sm:px-4 sm:py-3.5">
                  <p className="tech-label text-[0.55rem] text-muted sm:text-[0.6rem]">{article.tag}</p>
                  <p className="font-display mt-1 text-[0.6rem] font-bold uppercase text-ink sm:text-xs">
                    Article {article.index}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
