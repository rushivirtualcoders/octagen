import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.09 })
    let frame = 0

    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onClick = (event: MouseEvent) => {
      if (document.body.classList.contains('inquiry-open')) return
      const anchor = (event.target as HTMLElement).closest?.('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target as HTMLElement, { duration: 1.6 })
    }
    document.addEventListener('click', onClick)

    const onLenisControl = (event: Event) => {
      const detail = (event as CustomEvent<{ stop?: boolean }>).detail
      if (detail?.stop) lenis.stop()
      else lenis.start()
    }
    window.addEventListener('octagen:lenis', onLenisControl)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onClick)
      window.removeEventListener('octagen:lenis', onLenisControl)
      lenis.destroy()
    }
  }, [])
}
