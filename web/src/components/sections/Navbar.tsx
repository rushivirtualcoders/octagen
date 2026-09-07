'use client'

import { ASSETS, CLAIM, DISTRIBUTOR, NAV_LINKS } from '../../lib/constants'
import { EASE } from '../../lib/animations'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InquiryTrigger from '../inquiry/InquiryTrigger'

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label={`${DISTRIBUTOR} home`}>
      <img src={ASSETS.octagenLogo} alt={DISTRIBUTOR} className="h-6 w-auto sm:h-7" />
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        ticking = false
      })
    }
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
      className={`fixed inset-x-0 top-0 z-[100] border-b border-line bg-white transition-shadow duration-300 ${
        scrolled ? 'py-2 shadow-[0_4px_20px_rgba(11,18,21,0.05)]' : 'py-2.5'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-5 xl:gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.62rem] font-semibold tracking-[0.16em] text-[#0B1215] uppercase transition-colors duration-300 hover:text-lm-blue"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-lm-blue uppercase">
            {CLAIM}
          </span>
          <InquiryTrigger
            className="site-btn bg-lm-red px-4 py-2 text-[0.62rem] font-semibold tracking-[0.16em] text-white uppercase hover:bg-[#c40017]"
            type="PRODUCT_QUOTE"
          >
            Get Quote
          </InquiryTrigger>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1 lg:hidden"
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
            <InquiryTrigger
              className="site-btn tech-label mt-12 w-fit bg-lm-red px-8 py-4 text-white hover:bg-[#c40017]"
              type="PRODUCT_QUOTE"
              onOpen={() => setOpen(false)}
            >
              Get Quote
            </InquiryTrigger>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
