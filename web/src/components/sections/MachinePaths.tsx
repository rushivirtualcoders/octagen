import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import { CATALOGUE_CATEGORIES, MACHINE_PATHS } from '../../lib/constants'
import { EASE } from '../../lib/animations'

const BIKE_FALLBACKS = ['/assets/images/lm/mxgp.jpg', '/assets/images/lm/hillclimb.jpg']

function PathImage({
  path,
}: {
  path: (typeof MACHINE_PATHS)[number]
}) {
  const [src, setSrc] = useState<string>(path.image)
  const [failed, setFailed] = useState(false)

  const onError = () => {
    if (path.id === 'bike') {
      const next = BIKE_FALLBACKS.find((candidate) => candidate !== src)
      if (next) {
        setSrc(next)
        return
      }
    }
    setFailed(true)
  }

  if (failed) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 opacity-90"
        style={{
          background: `${path.fallback}, repeating-linear-gradient(-12deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)`,
        }}
      />
    )
  }

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      onError={onError}
      className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
        path.id === 'bike' ? 'object-[center_35%]' : 'object-center'
      }`}
    />
  )
}

export default function MachinePaths() {
  const reduced = useReducedMotion()
  const [hover, setHover] = useState<'car' | 'bike' | null>(null)

  return (
    <section
      id="paths"
      aria-label="Choose car or bike product path"
      className="relative border-t border-line bg-surface"
    >
      <div className="mx-auto max-w-[1400px] px-6 pt-12 pb-8 lg:px-10 lg:pt-14 lg:pb-10">
        <SectionFrame
          index="02"
          eyebrow="Choose your machine"
          title={['TWO PATHS.', 'ONE STANDARD OF PERFORMANCE.']}
          accentLine={1}
          description="Select a vehicle path, then narrow by category and specification — inquiry through Octagen."
        />
      </div>

      <div className="mx-auto grid max-w-[1400px] border-y border-line lg:grid-cols-2">
        {MACHINE_PATHS.map((path) => (
          <motion.a
            key={path.id}
            href={path.href}
            onMouseEnter={() => setHover(path.id)}
            onMouseLeave={() => setHover(null)}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: EASE }}
            className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden lg:min-h-[26rem] lg:border-r last:lg:border-r-0"
            data-cursor="VIEW"
          >
            <div className="absolute inset-0" style={{ background: path.fallback }} />
            <PathImage path={path} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/15" />

            <motion.div
              aria-hidden
              className="absolute top-0 left-0 h-1 w-full origin-left bg-lm-red"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            />

            <div className="relative z-10 p-6 lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-5xl font-black leading-none text-white/10 lg:text-7xl">
                  {path.index}
                </span>
                <span className="tech-label border border-white/25 bg-ink/30 px-3 py-1.5 text-white/90 backdrop-blur-sm">
                  {path.label}
                </span>
              </div>
              <h3 className="font-display mt-4 max-w-md text-[clamp(1.35rem,2.8vw,2.1rem)] font-extrabold leading-tight tracking-tight text-white uppercase">
                {path.title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75">{path.text}</p>
              <p className="tech-label mt-6 inline-flex items-center gap-2 text-white transition-transform duration-300 group-hover:translate-x-2">
                {path.cta}
                <span aria-hidden>→</span>
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
        <p className="tech-label mb-4 text-muted">Catalogue families</p>
        <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
          {CATALOGUE_CATEGORIES.map((cat, i) => {
            const dim = hover !== null && hover !== cat.path
            return (
              <motion.a
                key={cat.name}
                href="#spotlight"
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                className={`group bg-base p-5 transition-colors duration-400 hover:bg-white lg:p-6 ${dim ? 'opacity-40' : ''}`}
              >
                <span className="tech-label text-lm-blue">{cat.path === 'car' ? '4W' : '2W'}</span>
                <h4 className="font-display mt-2 text-base font-bold uppercase text-ink lg:text-lg">{cat.name}</h4>
                <p className="mt-2 text-sm text-muted">{cat.text}</p>
                <span className="mt-4 inline-block h-0.5 w-0 bg-lm-red transition-all duration-500 group-hover:w-full" />
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
