import { motion } from 'framer-motion'
import { EASE } from '../../lib/animations'

type Props = {
  eyebrow?: string
  lines: string[]
  accentLine?: number
  className?: string
  invert?: boolean
}

export default function SectionHeading({ eyebrow, lines, accentLine, className = '', invert = false }: Props) {
  return (
    <div className={className}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`tech-label mb-6 flex items-center gap-3 ${invert ? 'text-white/55' : 'text-muted'}`}
        >
          <span className="inline-block size-1.5 rounded-full bg-lm-red" />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className={`font-display text-[clamp(2.1rem,4.6vw,4.4rem)] leading-[0.95] font-extrabold tracking-[-0.02em] uppercase ${invert ? 'text-white' : 'text-ink'}`}
      >
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: { y: '112%' },
                visible: { y: 0, transition: { duration: 1, ease: EASE, delay: i * 0.1 } },
              }}
              className={`block ${i === accentLine ? 'text-lm-red' : ''}`}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.h2>
    </div>
  )
}
