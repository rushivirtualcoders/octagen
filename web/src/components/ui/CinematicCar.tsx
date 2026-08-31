import { useRef, type CSSProperties } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { EASE } from '../../lib/animations'

type Props = {
  src: string
  alt: string
  className?: string
  objectPosition?: string
  interactive?: boolean
  autoOrbit?: boolean
  lightSweep?: boolean
  speedLines?: boolean
  stripe?: boolean
  flat?: boolean
  priority?: boolean
  style?: CSSProperties
}

/**
 * Light-theme cinematic car plate inspired by Ferrari / Mercedes / Land Rover
 * product stages: perspective orbit, glare, light sweep, ken-burns.
 */
export default function CinematicCar({
  src,
  alt,
  className = '',
  objectPosition = 'center',
  interactive = true,
  autoOrbit = true,
  lightSweep = true,
  speedLines = false,
  stripe = true,
  flat = false,
  priority = false,
  style,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start end', 'end start'],
  })
  const kenBurns = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const driftY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [8, -8]), {
    stiffness: 80,
    damping: 18,
  })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), {
    stiffness: 80,
    damping: 18,
  })
  const glareX = useSpring(useTransform(mx, [-0.5, 0.5], [12, 88]), {
    stiffness: 55,
    damping: 20,
  })
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% 40%, rgba(255,255,255,0.55) 0%, transparent 40%)`

  const onMove = (e: React.MouseEvent) => {
    if (flat || reduced || !interactive || !rootRef.current) return
    const rect = rootRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <div
      ref={rootRef}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      data-cursor="DRAG"
      className={`relative overflow-hidden bg-transparent ${flat ? '' : '[perspective:1600px]'} ${className}`}
      style={style}
    >
      <motion.div
        style={{
          rotateX: flat || reduced ? 0 : rotateX,
          rotateY: flat || reduced ? 0 : rotateY,
          scale: flat || reduced ? 1 : kenBurns,
          y: flat || reduced ? 0 : driftY,
          transformStyle: flat ? undefined : 'preserve-3d',
        }}
        animate={
          flat || reduced || !autoOrbit
            ? undefined
            : { rotateY: [0, 2.8, 0, -2.8, 0], rotateX: [0, -1.4, 0, 1.4, 0] }
        }
        transition={autoOrbit ? { duration: 16, repeat: Infinity, ease: 'easeInOut' } : undefined}
        className={`absolute ${flat ? 'inset-0' : 'inset-[-3%]'} will-change-transform`}
      >
        <motion.img
          src={src}
          alt={alt}
          initial={reduced ? false : { opacity: 0, scale: 1.16, x: '8%' }}
          {...(priority
            ? { animate: { opacity: 1, scale: 1, x: '0%' } }
            : {
                whileInView: { opacity: 1, scale: 1, x: '0%' },
                viewport: { once: true, amount: 0.25 },
              })}
          transition={{
            opacity: { duration: 1.1, ease: EASE },
            scale: { duration: 4.8, ease: EASE },
            x: { duration: 1.8, ease: EASE },
          }}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
        />

        {!reduced && interactive && (
          <motion.div
            aria-hidden
            style={{ background: glare }}
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          />
        )}

        {lightSweep && !reduced && (
          <motion.div
            aria-hidden
            initial={{ x: '-130%', opacity: 0 }}
            whileInView={{ x: ['-130%', '145%'], opacity: [0, 1, 0] }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2.4, delay: 0.5, ease: EASE }}
            className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent"
          />
        )}

        {speedLines && !reduced && (
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-lm-blue/50 to-transparent"
                style={{ top: `${16 + i * 16}%`, left: 0, width: '140%' }}
                animate={{ x: ['-25%', '18%'], opacity: [0.2, 0.7, 0.2] }}
                transition={{
                  duration: 1.6 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {stripe && (
        <div aria-hidden className="racing-stripe-v pointer-events-none absolute top-0 left-0 h-full w-1.5" />
      )}
    </div>
  )
}
