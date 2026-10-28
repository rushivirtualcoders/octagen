'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type AboutMediaSlide = {
  id: string
  title: string
  type: 'video' | 'image'
  src: string
  poster?: string
  thumb: string
}

type Props = {
  slides: AboutMediaSlide[]
}

export default function AboutMediaSlider({ slides }: Props) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const slide = slides[active]

  const go = useCallback(
    (next: number) => {
      setPlaying(false)
      setActive((next + slides.length) % slides.length)
    },
    [slides.length],
  )

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.pause()
    el.currentTime = 0
  }, [active])

  useEffect(() => {
    const el = videoRef.current
    if (!el || slide?.type !== 'video') return
    if (playing) {
      void el.play().catch(() => setPlaying(false))
    } else {
      el.pause()
    }
  }, [playing, slide?.type])

  if (!slide) return null

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink">
        {slide.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              key={slide.id}
              src={slide.src}
              poster={slide.poster}
              playsInline
              controls={playing}
              className="h-full w-full object-cover"
              onEnded={() => setPlaying(false)}
            />
            {!playing ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-ink/25 hover:bg-ink/35"
                aria-label={`Play ${slide.title}`}
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-lm-red text-white sm:size-20">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            ) : null}
          </>
        ) : (
          <img src={slide.src} alt={slide.title} className="h-full w-full object-cover" />
        )}

        <p className="pointer-events-none absolute inset-x-0 top-0 bg-ink/55 px-4 py-2.5 tech-label text-white">
          {slide.title}
        </p>

        {slides.length > 1 ? (
          <button
            type="button"
            onClick={() => go(active + 1)}
            className="absolute top-1/2 right-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-md hover:border-lm-red hover:text-lm-red sm:size-12"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        ) : null}
      </div>

      <ul className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slides.map((item, index) => (
          <li key={item.id} className="shrink-0">
            <button
              type="button"
              onClick={() => {
                setPlaying(false)
                setActive(index)
              }}
              aria-label={item.title}
              aria-current={index === active}
              className={`relative block h-16 w-28 overflow-hidden rounded-lg border-2 sm:h-20 sm:w-36 ${
                index === active ? 'border-lm-red' : 'border-transparent hover:border-line'
              }`}
            >
              <img src={item.thumb} alt="" className="h-full w-full object-cover" />
              {item.type === 'video' ? (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/30">
                  <span className="flex size-6 items-center justify-center rounded-full bg-lm-red text-white">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
