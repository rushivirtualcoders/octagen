import { useEffect } from 'react'
import Lenis from 'lenis'
import { cancelFrame, frame } from 'framer-motion'

export function useLenis() {
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

    // Drive Lenis from Motion’s frame loop so scroll + Framer stay in sync
    const update = ({ timestamp }: { timestamp: number }) => {
      lenis.raf(timestamp)
    }
    frame.update(update, true)

    const onClick = (event: MouseEvent) => {
      if (document.body.classList.contains('inquiry-open')) return
      const anchor = (event.target as HTMLElement).closest?.('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target as HTMLElement, {
        offset: -72,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
    document.addEventListener('click', onClick)

    const onLenisControl = (event: Event) => {
      const detail = (event as CustomEvent<{ stop?: boolean }>).detail
      if (detail?.stop) lenis.stop()
      else lenis.start()
    }
    window.addEventListener('octagen:lenis', onLenisControl)

    return () => {
      cancelFrame(update)
      document.removeEventListener('click', onClick)
      window.removeEventListener('octagen:lenis', onLenisControl)
      lenis.destroy()
    }
  }, [])
}
