import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import MagneticButton from '../ui/MagneticButton'
import InstagramWall from './InstagramWall'
import { EASE } from '../../lib/animations'
import { INFORMATIVE_AUDIENCES } from '../../lib/constants'
import type { InstagramPost } from '@/lib/instagram/feed'

const IMAGE_FALLBACKS = [
  '/assets/images/lm/for-the-drivers-hero.jpg',
  '/assets/images/racing-alt.jpg',
  '/assets/images/performance-car.jpg',
] as const

function CoverImage({
  src,
  alt,
  loading,
  className,
}: {
  src: string
  alt: string
  loading?: 'eager' | 'lazy'
  className?: string
}) {
  const candidates = [src, ...IMAGE_FALLBACKS.filter((item) => item !== src)]
  const [index, setIndex] = useState(0)
  const failed = index >= candidates.length

  if (failed) {
    return (
      <div
        aria-hidden
        className={`${className ?? ''} bg-gradient-to-br from-ink via-[#1a2830] to-lm-blue/40`}
      />
    )
  }

  return (
    <img
      src={candidates[index]}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setIndex((current) => current + 1)}
      className={className}
    />
  )
}

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
      <span
        aria-hidden
        className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-lm-red/10 text-[0.6rem] font-bold text-lm-red"
      >
        ✓
      </span>
      {children}
    </li>
  )
}

export default function ProductSpotlight({
  instagramPosts,
  instagramProfileUrl,
}: {
  instagramPosts?: InstagramPost[]
  instagramProfileUrl?: string
} = {}) {
  const reduced = useReducedMotion()

  return (
    <section
      id="spotlight"
      aria-label="Workshops, owners and Octagen community"
      className="border-t border-line bg-base"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
        <SectionFrame
          eyebrow="Stay informed"
          title={['GUIDANCE FOR', 'EVERY DRIVER.']}
          accentLine={1}
          description="Workshop support, owner guidance and the latest from our community — specification first, supply through Octagen."
        />

        <div className="mt-10 space-y-6 lg:mt-12 lg:space-y-8">
          {INFORMATIVE_AUDIENCES.map((block, blockIndex) => {
            const reverse = blockIndex % 2 === 1

            return (
              <motion.article
                key={block.id}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.85, ease: EASE, delay: blockIndex * 0.08 }}
                className="overflow-hidden rounded-[10px] border border-line bg-white shadow-[0_12px_40px_rgba(11,18,21,0.04)]"
              >
                <div
                  className={`grid lg:grid-cols-2 ${reverse ? '[&>*:first-child]:lg:order-2' : ''}`}
                >
                  <div className="relative min-h-[15rem] overflow-hidden bg-ink sm:min-h-[18rem]">
                    <CoverImage
                      src={block.image}
                      alt={block.imageAlt}
                      loading={blockIndex === 0 ? 'eager' : 'lazy'}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink/10" />
                    <span className="tech-label absolute top-4 left-4 rounded-[10px] border border-white/25 bg-ink/40 px-3 py-1.5 text-white backdrop-blur-sm">
                      {block.tag}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <p className="tech-label text-lm-blue">{block.tag}</p>
                    <h3 className="font-display mt-2 text-[clamp(1.35rem,2.5vw,2rem)] font-extrabold uppercase leading-tight tracking-tight text-ink">
                      {block.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted lg:text-[0.95rem]">
                      {block.text}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {block.points.map((point) => (
                        <CheckItem key={point}>{point}</CheckItem>
                      ))}
                    </ul>
                    <div className="mt-7">
                      <MagneticButton
                        inquiry
                        inquiryType={block.id === 'b2b' ? 'WORKSHOP' : 'PRODUCT_QUOTE'}
                        variant={block.id === 'b2c' ? 'primary' : 'blue'}
                      >
                        {block.cta}
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <InstagramWall initialPosts={instagramPosts} initialProfileUrl={instagramProfileUrl} />
      </div>
    </section>
  )
}
