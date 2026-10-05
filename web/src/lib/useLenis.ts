import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { cancelFrame, frame } from 'framer-motion'

const easeOut = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export function useLenis() {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const skipReset = useRef(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.18,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      autoRaf: false,
    })
    lenisRef.current = lenis

    const update = ({ timestamp }: { timestamp: number }) => {
      lenis.raf(timestamp)
    }
    frame.update(update, true)

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (document.body.classList.contains('inquiry-open')) return

      const anchor = (event.target as HTMLElement).closest?.('a[href]')
      if (!anchor || anchor.getAttribute('target') === '_blank') return

      const raw = anchor.getAttribute('href')
      if (!raw || raw.startsWith('mailto:') || raw.startsWith('tel:')) return

      let url: URL
      try {
        url = new URL(raw, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return

      const samePage = url.pathname === window.location.pathname && url.search === window.location.search
      if (!samePage) return

      event.preventDefault()
      event.stopPropagation()

      if (!url.hash || url.hash === '#top') {
        const top = url.hash ? document.querySelector(url.hash) : null
        if (top) {
          lenis.scrollTo(top as HTMLElement, { offset: 0, duration: 1.15, easing: easeOut })
        } else {
          lenis.scrollTo(0, { duration: 1.15, easing: easeOut })
        }
        return
      }

      const target = document.querySelector(url.hash)
      if (!target) return
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.15, easing: easeOut })
    }
    document.addEventListener('click', onClick, true)

    const onLenisControl = (event: Event) => {
      const detail = (event as CustomEvent<{ stop?: boolean }>).detail
      if (detail?.stop) lenis.stop()
      else lenis.start()
    }
    window.addEventListener('octagen:lenis', onLenisControl)

    return () => {
      cancelFrame(update)
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('octagen:lenis', onLenisControl)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (skipReset.current) {
      skipReset.current = false
      return
    }

    const hash = window.location.hash
    if (hash && hash !== '#top') {
      const target = document.querySelector(hash)
      if (target) {
        lenis.scrollTo(target as HTMLElement, { offset: -72, immediate: true })
        return
      }
    }
    lenis.scrollTo(0, { immediate: true })
  }, [pathname])
}
