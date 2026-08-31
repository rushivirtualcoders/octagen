import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/animations'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  className?: string
  delay?: number
  accentWord?: string
  accentClass?: string
  /** Use animate instead of whileInView (hero above the fold). */
  immediate?: boolean
}

/** Line-mask + word stagger — Ferrari/Mercedes headline grammar. */
export default function SplitText({
  text,
  as = 'h1',
  className = '',
  delay = 0,
  accentWord,
  accentClass = 'text-lm-red',
  immediate = false,
}: Props) {
  const reduced = useReducedMotion()
  const Tag = as
  const words = text.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={reduced ? false : { y: '115%' }}
            {...(immediate
              ? { animate: { y: 0 } }
              : { whileInView: { y: 0 }, viewport: { once: true, amount: 0.6 } })}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.08 }}
            className={`inline-block pr-[0.28em] ${word === accentWord ? accentClass : 'text-[#0B1215]'}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
