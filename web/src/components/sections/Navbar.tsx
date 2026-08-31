import { ASSETS, CLAIM, DISTRIBUTOR, NAV_LINKS } from '../../lib/constants'
import { EASE } from '../../lib/animations'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={`${DISTRIBUTOR} home`}>
      <img src={ASSETS.octagenLogo} alt={DISTRIBUTOR} className="h-9 w-auto sm:h-10" />
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b border-line bg-white/95 backdrop-blur-xl transition-all duration-500 ${
        scrolled ? 'py-3.5 shadow-[0_8px_30px_rgba(11,18,21,0.06)]' : 'py-5'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Logo />

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="tech-label text-[#0B1215] transition-colors duration-300 hover:text-lm-blue"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="tech-label text-lm-blue">{CLAIM}</span>
          <a
            href="#guidance"
            className="sweep tech-label bg-lm-red px-6 py-3 text-white transition-colors duration-300 hover:bg-[#c40017]"
          >
            Get Quote
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-[-1] flex h-screen flex-col justify-center bg-white px-8 lg:hidden"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2 text-5xl font-extrabold tracking-tight text-[#0B1215] uppercase"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#guidance"
              onClick={() => setOpen(false)}
              className="tech-label mt-12 inline-block w-fit bg-lm-red px-8 py-4 text-white"
            >
              Get Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
