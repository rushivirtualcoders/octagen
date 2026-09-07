import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import { CATALOGUE_CATEGORIES, MACHINE_PATHS } from '../../lib/constants'
import { EASE } from '../../lib/animations'

const BIKE_FALLBACKS = ['/assets/images/lm/mxgp.jpg', '/assets/images/lm/hillclimb.jpg']

function PathImage({
  path,
  active,
}: {
  path: (typeof MACHINE_PATHS)[number]
  active: boolean
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
      className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        active ? 'scale-105' : 'scale-100'
      } ${path.id === 'bike' ? 'object-[center_35%]' : 'object-center'}`}
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
      className="relative overflow-hidden border-t border-line bg-base"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-tech opacity-40"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 pt-14 pb-10 lg:px-10 lg:pt-16 lg:pb-12">
        <SectionFrame
          eyebrow="Choose your machine"
          title={['TWO PATHS.', 'ONE STANDARD OF PERFORMANCE.']}
          accentLine={1}
          description="Select a vehicle path, then narrow by category and specification — inquiry through Octagen."
        />

        <motion.div
          aria-hidden
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mt-8 h-px w-full max-w-xl origin-left bg-gradient-to-r from-lm-red via-lm-blue/60 to-transparent"
        />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-4 px-6 pb-12 lg:grid-cols-2 lg:gap-5 lg:px-10 lg:pb-14">
        {MACHINE_PATHS.map((path, pathIndex) => {
          const isActive = hover === path.id
          const isDimmed = hover !== null && hover !== path.id

          return (
            <motion.a
              key={path.id}
              href={path.href}
              onMouseEnter={() => setHover(path.id)}
              onMouseLeave={() => setHover(null)}
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, ease: EASE, delay: pathIndex * 0.1 }}
              className={`group relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-[10px] border border-line bg-ink shadow-[0_24px_80px_rgba(11,18,21,0.12)] transition-all duration-500 lg:min-h-[30rem] ${
                isActive ? 'z-10 -translate-y-1 border-white/20 shadow-[0_32px_100px_rgba(11,18,21,0.22)]' : ''
              } ${isDimmed ? 'opacity-55 saturate-[0.65]' : 'opacity-100'}`}
              data-cursor="VIEW"
            >
              <div className="absolute inset-0" style={{ background: path.fallback }} />
              <PathImage path={path} active={isActive} />

              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${path.accent}22 0%, transparent 55%)`,
                }}
              />

              <div
                aria-hidden
                className="absolute top-0 left-0 h-1 w-full origin-left transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: path.accent, transform: isActive ? 'scaleX(1)' : 'scaleX(0.35)' }}
              />

              <span
                aria-hidden
                className="pointer-events-none absolute top-4 right-5 font-display text-[clamp(4rem,12vw,7rem)] font-black leading-none text-white/[0.07] select-none lg:top-6 lg:right-8"
              >
                {path.index}
              </span>

              <div className="relative z-10 flex flex-col gap-5 p-6 lg:p-9">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="inline-flex items-center gap-2 rounded-[10px] border border-white/20 bg-white/10 px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md"
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: path.accent }}
                    />
                    {path.id === 'car' ? '4W' : '2W'}
                  </span>
                  <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-white/70 uppercase">
                    {path.label}
                  </span>
                </div>

                <div>
                  <h3 className="font-display max-w-md text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[0.95] tracking-tight text-white uppercase">
                    {path.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/72 lg:text-[0.95rem]">
                    {path.text}
                  </p>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-[10px] border border-white/25 bg-white/10 px-4 py-2.5 text-[0.62rem] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/15">
                  {path.cta}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </motion.a>
          )
        })}
      </div>

      <div className="relative border-t border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="tech-label text-lm-blue">Catalogue families</p>
              <h3 className="font-display mt-2 text-xl font-extrabold tracking-tight text-ink uppercase lg:text-2xl">
                Narrow by category
              </h3>
            </div>
            <p className="max-w-sm text-sm text-muted">
              Four product families across car and two-wheeler paths — specifications first, inquiry
              through Octagen.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {CATALOGUE_CATEGORIES.map((cat, i) => {
              const dim = hover !== null && hover !== cat.path
              const pathAccent = cat.path === 'car' ? '#e8770a' : '#e2001a'

              return (
                <motion.a
                  key={cat.name}
                  href="#spotlight"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                  className={`group relative overflow-hidden rounded-[10px] border border-line bg-white p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_16px_48px_rgba(11,18,21,0.08)] lg:p-6 ${
                    dim ? 'opacity-45' : 'opacity-100'
                  }`}
                >
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ backgroundColor: pathAccent }}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="font-display text-2xl font-black leading-none text-ink/10"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="rounded-[10px] px-2 py-1 text-[0.58rem] font-semibold tracking-[0.14em] uppercase"
                      style={{
                        color: pathAccent,
                        backgroundColor: `${pathAccent}14`,
                      }}
                    >
                      {cat.path === 'car' ? '4W' : '2W'}
                    </span>
                  </div>

                  <h4 className="font-display mt-4 text-base font-bold uppercase text-ink lg:text-lg">
                    {cat.name}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{cat.text}</p>

                  <span className="tech-label mt-5 inline-flex items-center gap-1.5 text-ink/50 transition-colors duration-300 group-hover:text-lm-red">
                    View range
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
