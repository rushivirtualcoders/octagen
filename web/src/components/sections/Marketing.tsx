'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import SectionFrame from '../ui/SectionFrame'
import { LIQUI_MOLY_INDIA_URL, type MarketingMediaItem } from '@/lib/catalogue'
import { EASE } from '@/lib/animations'

export type { MarketingMediaItem }

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export default function Marketing({ media }: { media: MarketingMediaItem[] }) {
  const reduced = useReducedMotion()
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const banner = media.find((m) => m.featured) ?? media[0]
  const rest = media.filter((m) => m.id !== banner?.id)
  const videos = rest.filter((m) => m.type === 'video')
  const photos = rest.filter((m) => m.type === 'image')

  return (
    <section
      id="marketing"
      aria-label="Marketing banner and media"
      className="relative overflow-hidden border-t border-line bg-surface"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionFrame
            eyebrow="Marketing banner & media"
            title={['FROM LIQUI MOLY.', 'FOR INDIA.']}
            accentLine={0}
            description="Photos and films sourced from the LIQUI MOLY brand world — motorsport, drivers and German chemistry. Explore more on liqui-moly.com."
          />
          <a
            href={LIQUI_MOLY_INDIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="site-btn shrink-0 bg-lm-red px-6 py-3.5 text-[0.65rem] font-semibold tracking-[0.16em] text-white uppercase hover:bg-[#c96a0e]"
          >
            Visit liqui-moly.com
          </a>
        </div>

        {/* Featured banner */}
        {banner && (
          <motion.a
            href={banner.href || LIQUI_MOLY_INDIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: EASE }}
            className="group relative mt-10 block min-h-[320px] overflow-hidden border border-line lg:min-h-[440px]"
          >
            <img
              src={banner.src}
              alt={banner.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1215]/90 via-[#0B1215]/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215]/70 via-transparent to-transparent" />
            <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end p-6 lg:min-h-[440px] lg:p-10">
              <p className="tech-label text-lm-red">LIQUI MOLY India</p>
              <h3 className="font-display mt-2 max-w-xl text-3xl font-extrabold uppercase tracking-tight text-white lg:text-5xl">
                {banner.title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 lg:text-base">
                {banner.caption}
              </p>
              <span className="tech-label mt-6 inline-flex w-fit items-center gap-2 text-white transition-transform group-hover:translate-x-1">
                Open on liqui-moly.com →
              </span>
            </div>
          </motion.a>
        )}

        {/* Videos row */}
        {videos.length > 0 && (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {videos.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveVideo(item.src)}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.06 }}
                className="group relative min-h-[220px] overflow-hidden border border-line text-left lg:min-h-[280px]"
                aria-label={`Play ${item.title}`}
              >
                <img
                  src={item.poster || item.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105 ${
                    item.poster?.includes('cera-tec') || item.poster?.includes('products/')
                      ? 'object-contain bg-[#0B1215] p-10'
                      : 'object-cover'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215]/90 via-[#0B1215]/35 to-transparent" />
                <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-lm-red text-white transition-transform duration-300 group-hover:scale-110">
                  <PlayIcon />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="tech-label text-lm-red">Video · liqui-moly</p>
                  <h3 className="font-display mt-1 text-xl font-extrabold uppercase tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/75">{item.caption}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Photo mosaic */}
        {photos.length > 0 && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((item, i) => (
              <motion.a
                key={item.id}
                href={item.href || LIQUI_MOLY_INDIA_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.04 }}
                className="group relative min-h-[200px] overflow-hidden border border-line lg:min-h-[240px]"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215]/85 via-[#0B1215]/2 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="tech-label text-lm-red">Photo</p>
                  <h3 className="font-display mt-1 text-lg font-extrabold uppercase tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/75">{item.caption}</p>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0B1215]/85 p-4 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
          >
            <button
              type="button"
              className="absolute top-5 right-5 tech-label text-white hover:text-lm-red"
              onClick={() => setActiveVideo(null)}
            >
              Close
            </button>
            <div
              className="aspect-video w-full max-w-4xl overflow-hidden border border-white/20 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`${activeVideo}${activeVideo.includes('?') ? '&' : '?'}autoplay=1`}
                title="LIQUI MOLY marketing video"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
