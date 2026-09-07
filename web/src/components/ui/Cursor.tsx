import { useEffect, useRef, useState } from 'react'

/** Dark custom cursor for light theme. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const visibleRef = useRef(false)
  const labelStateRef = useRef('')
  const [enabled, setEnabled] = useState(false)
  const [hasLabel, setHasLabel] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
    document.body.classList.add('custom-cursor')
    return () => document.body.classList.remove('custom-cursor')
  }, [])

  useEffect(() => {
    if (!enabled) return
    const target = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let frame = 0

    const setVisible = (on: boolean) => {
      if (visibleRef.current === on) return
      visibleRef.current = on
      const opacity = on ? '1' : '0'
      if (dotRef.current) dotRef.current.style.opacity = opacity
      if (ringRef.current) ringRef.current.style.opacity = opacity
    }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      setVisible(true)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.('[data-cursor]')
      const next = el?.getAttribute('data-cursor') ?? ''
      if (next === labelStateRef.current) return
      labelStateRef.current = next
      setHasLabel(Boolean(next))
      if (labelRef.current) labelRef.current.textContent = next
    }

    const onLeave = () => setVisible(false)

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="site-cursor-layer" aria-hidden>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[320] size-1.5 -translate-x-1/2 rounded-full bg-lm-red transition-opacity duration-300"
        style={{ opacity: 0, marginLeft: -3, marginTop: -3, willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[319] flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: 0, willChange: 'transform' }}
      >
        <div
          className={`flex items-center justify-center rounded-full border transition-all duration-300 ease-out ${
            hasLabel
              ? 'site-btn border-transparent bg-lm-red px-4 py-2 text-[0.6rem] font-semibold tracking-[0.2em] text-white'
              : 'size-9 border-ink/30 bg-white/80'
          }`}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <span ref={labelRef} />
        </div>
      </div>
    </div>
  )
}
