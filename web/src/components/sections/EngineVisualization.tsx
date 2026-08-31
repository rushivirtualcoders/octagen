import { lazy, Suspense, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { ASSETS, ENGINE_STAGES } from '../../lib/constants'
import { EASE } from '../../lib/animations'

const EngineScene = lazy(() => import('../3d/EngineScene'))

const FLOW = ['Oil pump', 'Oil filter', 'Crankshaft', 'Bearings', 'Pistons', 'Turbocharger']

/** Dark immersive pocket inside the light site — Ferrari / Maserati pattern. */
export default function EngineVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [stage, setStage] = useState(0)
  const reduced = useReducedMotion()
  const nearView = useInView(containerRef, { margin: '600px 0px' })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v
    const next = Math.min(ENGINE_STAGES.length - 1, Math.floor(v * ENGINE_STAGES.length))
    setStage((prev) => (prev === next ? prev : next))
  })

  return (
    <section id="engine" aria-label="Engine oil flow visualization">
      <div ref={containerRef} className="relative h-[320vh] bg-[#0B1215]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="absolute inset-0">
            {nearView && !reduced ? (
              <Suspense fallback={null}>
                <EngineScene progressRef={progressRef} />
              </Suspense>
            ) : (
              <img
                src={ASSETS.engine}
                alt="Golden oil flowing over engine internals"
                loading="lazy"
                className="h-full w-full object-cover opacity-80"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215]/80 via-transparent to-[#0B1215]/35" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 lg:px-10">
            <p className="tech-label mb-4 flex items-center gap-3 text-[#F2C14E]">
              <span className="inline-block h-px w-10 bg-[#F2C14E]" />
              Precision lubrication
            </p>
            <h2 className="font-display max-w-2xl text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.95] font-extrabold tracking-tight text-white uppercase">
              Oil reaches every critical component
            </h2>
          </div>

          <div className="relative z-10 mx-auto hidden w-full max-w-[1400px] flex-1 items-center justify-end px-6 lg:flex lg:px-10">
            <ol className="space-y-4">
              {FLOW.map((step, i) => {
                const active = Math.floor((i / FLOW.length) * ENGINE_STAGES.length) <= stage
                return (
                  <li key={step} className="flex items-center justify-end gap-4">
                    <span
                      className={`tech-label transition-colors duration-500 ${
                        active ? 'text-[#F2C14E]' : 'text-white/25'
                      }`}
                    >
                      {step}
                    </span>
                    <span
                      className={`inline-block size-1.5 rounded-full transition-colors duration-500 ${
                        active ? 'bg-[#F2C14E]' : 'bg-white/15'
                      }`}
                    />
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 lg:px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="max-w-md"
              >
                <p className="tech-label mb-2 text-lm-red">
                  {String(stage + 1).padStart(2, '0')} / {ENGINE_STAGES.length}
                </p>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white uppercase lg:text-3xl">
                  {ENGINE_STAGES[stage].title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed font-light text-white/55">
                  {ENGINE_STAGES[stage].text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 h-px w-full bg-white/10">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                className="h-full bg-[#F2C14E]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
