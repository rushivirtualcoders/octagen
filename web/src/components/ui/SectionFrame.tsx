import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/animations'

type Props = {
  eyebrow: string
  title: string[]
  accentLine?: number
  description?: string
  invert?: boolean
  align?: 'left' | 'center'
  compact?: boolean
}

export default function SectionFrame({
  eyebrow,
  title,
  accentLine,
  description,
  invert = false,
  align = 'left',
  compact = false,
}: Props) {
  const reduced = useReducedMotion()
  const centered = align === 'center'

  return (
    <header className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <motion.div
        initial={reduced ? false : { opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: EASE }}
        className={`flex items-center gap-4 ${compact ? 'mb-4' : 'mb-8'} ${centered ? 'justify-center' : ''}`}
      >
        <span className={`h-px w-10 shrink-0 ${invert ? 'bg-white/20' : 'bg-line'}`} />
        <p className={`tech-label ${invert ? 'text-lm-red' : 'text-lm-red'}`}>{eyebrow}</p>
      </motion.div>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className={`font-display leading-[0.92] font-extrabold tracking-[-0.02em] uppercase ${
          compact ? 'text-[clamp(1.75rem,3.8vw,3rem)]' : 'text-[clamp(2rem,4.8vw,4rem)]'
        } ${invert ? 'text-white' : 'text-ink'}`}
      >
        {title.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: { y: '110%' },
                visible: { y: 0, transition: { duration: 0.95, ease: EASE, delay: i * 0.08 } },
              }}
              className={`block ${i === accentLine ? 'text-lm-red' : ''}`}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {description && (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className={`text-sm leading-relaxed lg:text-[0.95rem] ${
            compact ? 'mt-3' : 'mt-6'
          } ${invert ? 'text-white/65' : 'text-muted'} ${centered ? 'mx-auto max-w-xl' : 'max-w-xl'}`}
        >
          {description}
        </motion.p>
      )}
    </header>
  )
}
