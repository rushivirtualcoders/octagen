import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ASSETS, INQUIRY_MAILTO, PRODUCTS, type Product } from '../../lib/constants'
import { EASE } from '../../lib/animations'
import { useIsMobile } from '../../lib/useIsMobile'
import MagneticButton from '../ui/MagneticButton'

function ProductSlide({ product }: { product: Product }) {
  const reduced = useReducedMotion()
  const [activeSpec, setActiveSpec] = useState(0)

  return (
    <div className="relative flex h-full w-full items-center overflow-hidden">
      <span
        aria-hidden
        className="font-display text-outline pointer-events-none absolute top-1/2 left-1/2 w-max -translate-x-1/2 -translate-y-1/2 text-[16vw] font-black tracking-tight uppercase select-none"
      >
        {product.name}
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-[1250px] items-center gap-10 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 70, rotate: -18 }}
          whileInView={{ opacity: 1, y: 0, rotate: 8 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.4, ease: EASE }}
          className="relative mx-auto w-56 sm:w-64 lg:w-80"
          data-cursor="VIEW"
        >
          <div
            aria-hidden
            className="absolute inset-0 scale-125 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${product.glow}33 0%, transparent 65%)` }}
          />
          <motion.img
            src={product.image}
            alt={`${product.name} ${product.viscosity} engine oil bottle`}
            loading="lazy"
            className="sweep relative w-full drop-shadow-[0_24px_40px_rgba(11,18,21,0.18)]"
            animate={reduced ? undefined : { rotate: [8, 18, 8], y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          {!reduced && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-4 left-[18%] w-8 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/70 to-transparent"
              animate={{ x: ['-40%', '220%'], opacity: [0, 1, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: EASE, repeatDelay: 2.4 }}
            />
          )}
          <div
            aria-hidden
            className="absolute inset-x-6 -bottom-4 h-8 rounded-[100%] blur-xl"
            style={{ background: `${product.glow}26` }}
          />
        </motion.div>

        <div>
          <p className="tech-label mb-5 text-muted">
            {product.index} — <span className="text-lm-orange">{product.series}</span>
          </p>
          <h3 className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-none font-black tracking-tight text-ink uppercase">
            {product.name}
          </h3>
          <p className="font-display mt-3 text-2xl font-bold text-lm-red">{product.viscosity}</p>
          <p className="tech-label mt-6 text-ink/70">{product.application}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed font-light text-muted">
            {product.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {product.specs.map((spec, i) => (
              <li key={spec.label}>
                <button
                  type="button"
                  onClick={() => setActiveSpec(i)}
                  className={`tech-label border px-4 py-2 transition-colors duration-300 ${
                    activeSpec === i
                      ? 'border-lm-red bg-lm-red text-white'
                      : 'border-ink/15 text-muted hover:border-lm-orange hover:text-lm-orange'
                  }`}
                >
                  {spec.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="font-display mt-4 text-xl font-bold text-ink">
            {product.specs[activeSpec].value}
          </p>

          <div className="mt-9">
            <MagneticButton href={INQUIRY_MAILTO}>Submit Inquiry</MagneticButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const isMobile = useIsMobile(1024)
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${((PRODUCTS.length - 1) / PRODUCTS.length) * 100}%`],
  )

  if (isMobile) {
    return (
      <section id="products" className="border-t border-line bg-base">
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-24 pb-4">
          <div className="relative">
            <img
              src={ASSETS.performance}
              alt=""
              aria-hidden
              className="pointer-events-none absolute top-0 right-0 h-40 w-auto object-contain opacity-20"
            />
            <p className="tech-label mb-4 flex items-center gap-3 text-lm-orange">
              <span className="inline-block h-px w-10 bg-lm-orange" />
              The range
            </p>
            <h2 className="font-display text-4xl font-black tracking-tight text-ink uppercase">
              Engineered for every engine
            </h2>
          </div>
        </div>
        {PRODUCTS.map((product) => (
          <div key={product.index} className="min-h-[90svh] py-10">
            <ProductSlide product={product} />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section id="products" aria-label="Product range" className="border-t border-line bg-base">
      <div ref={trackRef} className="relative" style={{ height: `${PRODUCTS.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <img
            src={ASSETS.performance}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-[18%] right-[-4%] z-0 h-[72%] w-auto max-w-[52%] object-contain opacity-[0.16]"
          />
          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] items-end justify-between px-6 pt-28 lg:px-10">
            <div>
              <p className="tech-label mb-3 flex items-center gap-3 text-lm-orange">
                <span className="inline-block h-px w-10 bg-lm-orange" />
                The range
              </p>
              <h2 className="font-display text-3xl font-black tracking-tight text-ink uppercase">
                Engineered for every engine
              </h2>
            </div>
            <div className="tech-label flex items-center gap-4 text-muted">
              <span>Scroll</span>
              <span className="inline-block h-px w-14 bg-ink/20" />
              <span>0{PRODUCTS.length} Series</span>
            </div>
          </div>

          <motion.div style={{ x }} className="relative z-10 flex h-full">
            {PRODUCTS.map((product) => (
              <div key={product.index} className="h-full w-screen shrink-0">
                <ProductSlide product={product} />
              </div>
            ))}
          </motion.div>

          <div className="mx-auto mb-10 h-px w-full max-w-[1400px] bg-ink/10 px-0">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-lm-red"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
