'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/animations'
import { INSTAGRAM_PROFILE, SOCIAL_FEED } from '../../lib/constants'
import type { InstagramPost } from '@/lib/instagram/feed'

const HOUR_MS = 60 * 60 * 1000

const FALLBACK: InstagramPost[] = SOCIAL_FEED.map((post, index) => ({
  id: `fallback-${index}`,
  src: post.src,
  alt: post.alt,
  href: INSTAGRAM_PROFILE,
}))

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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={candidates[index]}
      alt={alt}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setIndex((current) => current + 1)}
      className={className}
    />
  )
}

function handleFromUrl(url: string) {
  try {
    const path = new URL(url).pathname.replace(/\/+/g, '/').replace(/\/$/, '')
    const handle = path.split('/').filter(Boolean)[0]
    return handle ? `@${handle}` : '@instagram'
  } catch {
    return '@instagram'
  }
}

export default function InstagramWall({
  initialPosts,
  initialProfileUrl,
}: {
  initialPosts?: InstagramPost[]
  initialProfileUrl?: string
}) {
  const reduced = useReducedMotion()
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts?.length ? initialPosts : FALLBACK)
  const [profileUrl, setProfileUrl] = useState(initialProfileUrl || INSTAGRAM_PROFILE)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const res = await fetch('/api/instagram', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as {
          posts?: InstagramPost[]
          profileUrl?: string
        }
        if (cancelled) return
        if (data.posts?.length) setPosts(data.posts.slice(0, 9))
        if (data.profileUrl) setProfileUrl(data.profileUrl)
      } catch {
        // Keep current tiles on network errors
      }
    }

    void load()
    const timer = window.setInterval(load, HOUR_MS)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  const handle = handleFromUrl(profileUrl)

  return (
    <div className="mt-14 lg:mt-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="tech-label text-lm-blue">Social wall</p>
          <h3 className="font-display mt-2 text-xl font-extrabold uppercase tracking-tight text-ink lg:text-2xl">
            Follow on Instagram
          </h3>
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="site-btn border border-line bg-white px-5 py-2.5 text-[0.62rem] font-semibold tracking-[0.16em] text-ink uppercase hover:border-lm-blue hover:text-lm-blue"
        >
          {handle}
        </a>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4">
        {posts.map((post, i) => (
          <motion.a
            key={post.id}
            href={post.href || profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.06 }}
            className="group relative aspect-square overflow-hidden rounded-[10px] border border-line bg-surface"
          >
            <CoverImage
              src={post.src}
              alt={post.alt}
              loading={i < 3 ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute right-2 bottom-2 rounded-[10px] bg-white/90 px-2 py-1 text-[0.5rem] font-semibold tracking-[0.1em] text-ink uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:right-3 sm:bottom-3">
              Instagram
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
