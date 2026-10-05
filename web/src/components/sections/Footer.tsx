import Link from 'next/link'
import { motion } from 'framer-motion'
import { ASSETS, CONTACT_INFO, DISTRIBUTOR, NAV_LINKS } from '../../lib/constants'
import { EASE } from '../../lib/animations'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        className="racing-stripe-h h-1 w-full origin-left"
      />

      <div className="mx-auto w-full max-w-[1400px] px-6 py-14 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="max-w-sm">
            <Link href="/" aria-label={`${DISTRIBUTOR} home`}>
              <img src={ASSETS.octagenLogo} alt={DISTRIBUTOR} className="h-16 w-auto sm:h-20" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed font-light text-muted">
              Premium motor oils, additives and car care — distributed nationally across India by{' '}
              {DISTRIBUTOR}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-semibold text-ink">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-lm-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold text-ink">Contact</p>
            <ul className="mt-4 space-y-1.5">
              {CONTACT_INFO.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-sm text-lm-red hover:underline"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="mt-3 block text-sm text-lm-red hover:underline"
            >
              {CONTACT_INFO.email}
            </a>
            <address className="mt-3 max-w-xs text-sm leading-relaxed text-muted not-italic">
              {CONTACT_INFO.address}
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs leading-relaxed font-light text-muted">
              Liqui-Moly India is proudly operated and fulfilled by {DISTRIBUTOR}, the exclusive
              authorized national distributor.
            </p>
            <p className="tech-label mt-3 text-ink/30">
              © {new Date().getFullYear()} {DISTRIBUTOR}. All rights reserved.
            </p>
          </div>
          <a
            href="#top"
            aria-label="Back to top"
            className="group flex size-11 shrink-0 items-center justify-center bg-lm-red text-white transition-colors hover:bg-[#c96a0e]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <path d="M6 14l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
