'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import InquiryTrigger from '@/components/inquiry/InquiryTrigger'
import { ASSETS, CONTACT_INFO, DISTRIBUTOR, INSTAGRAM_PROFILE } from '@/lib/constants'
import { EASE } from '@/lib/animations'

const WHATSAPP_URL = `https://wa.me/${CONTACT_INFO.phones[0].replace(/\D/g, '')}`

const PRODUCT_LINKS = [
  { href: '/products/car', label: 'Motor oils' },
  { href: '/products/car', label: 'Additives' },
  { href: '/products/car', label: 'Car care' },
  { href: '/products/bike', label: '2-Wheeler oils' },
  { href: '/#most-loved', label: 'Most loved' },
  { href: '/#products', label: 'Full catalogue' },
]

const COMPANY_LINKS = [
  { href: '/about', label: 'About us' },
  { href: '/about', label: 'Octagen distributor' },
  { href: '/#advantage', label: 'Why LIQUI MOLY' },
  { href: '/contact', label: 'Contact' },
  { href: '/products/car', label: 'Car products' },
  { href: '/products/bike', label: 'Bike products' },
]

const RESOURCE_LINKS = [
  { href: '/articles', label: 'Knowledge hub' },
  { href: '/#guidance', label: 'FAQs' },
  { href: '/#activities', label: 'Activities' },
  { href: '/#process', label: 'How to inquire' },
  { href: '/contact', label: 'Get a quote' },
]

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <p className="tech-label text-lm-red">{children}</p>
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-white/65 transition-colors hover:text-white">
      {children}
    </Link>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:border-lm-red hover:text-lm-red"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const year = new Date().getFullYear()

  function onSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return
    const subject = encodeURIComponent('Subscribe to Octagen updates')
    const body = encodeURIComponent(`Please add ${trimmed} to Octagen / LIQUI MOLY India updates.`)
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <footer className="relative border-t border-white/10 bg-ink text-white">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="racing-stripe-h h-1 w-full origin-left"
        />

        <div className="mx-auto w-full max-w-[1400px] px-6 pt-14 pb-10 lg:px-10 lg:pt-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-3">
              <Link href="/" aria-label={`${DISTRIBUTOR} home`} className="inline-block">
                <img
                  src={ASSETS.octagenLogo}
                  alt={DISTRIBUTOR}
                  className="h-10 w-auto brightness-0 invert sm:h-12"
                />
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
                Premium LIQUI MOLY motor oils, additives and car care — distributed nationally across
                India by {DISTRIBUTOR}, the exclusive authorized national distributor.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <SocialIcon href={INSTAGRAM_PROFILE} label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </SocialIcon>
                <SocialIcon href={WHATSAPP_URL} label="WhatsApp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.96.52 3.8 1.44 5.4L2 22l4.92-1.55a9.9 9.9 0 0 0 5.12 1.4h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.75 14.05c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.93-4.38-.14-.2-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35h.55c.18 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.3.02.49-.1.2-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.29.29-.12.57.16.28.73 1.2 1.57 1.94 1.08.96 1.99 1.26 2.27 1.4.28.14.45.12.61-.07.17-.2.7-.81.89-1.09.19-.28.38-.23.64-.14.26.1 1.66.78 1.95.92.28.14.47.21.54.33.07.12.07.69-.17 1.36Z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href={`mailto:${CONTACT_INFO.email}`} label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </SocialIcon>
              </div>
            </div>

            {/* Products */}
            <nav aria-label="Products" className="lg:col-span-2">
              <FooterHeading>Products</FooterHeading>
              <ul className="mt-4 space-y-2.5">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Company */}
            <nav aria-label="Company" className="lg:col-span-2">
              <FooterHeading>Company</FooterHeading>
              <ul className="mt-4 space-y-2.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Resources */}
            <nav aria-label="Resources" className="lg:col-span-2">
              <FooterHeading>Resources</FooterHeading>
              <ul className="mt-4 space-y-2.5">
                {RESOURCE_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Get in touch */}
            <div className="sm:col-span-2 lg:col-span-3">
              <FooterHeading>Get in touch</FooterHeading>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="tech-label text-[0.6rem] text-lm-red/90">Phone / WhatsApp</dt>
                  <dd className="mt-1.5 space-y-1">
                    {CONTACT_INFO.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="block text-white/85 transition hover:text-lm-red"
                      >
                        {phone}
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="tech-label text-[0.6rem] text-lm-red/90">Email</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-white/85 transition hover:text-lm-red"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="tech-label text-[0.6rem] text-lm-red/90">Office</dt>
                  <dd className="mt-1.5 max-w-xs leading-relaxed text-white/65">{CONTACT_INFO.address}</dd>
                </div>
                <div>
                  <dt className="tech-label text-[0.6rem] text-lm-red/90">Hours</dt>
                  <dd className="mt-1.5 text-white/85">Mon–Sat · 9:00 AM – 6:00 PM IST</dd>
                </div>
              </dl>

              <form onSubmit={onSubscribe} className="mt-6 space-y-2.5">
                <label className="sr-only" htmlFor="footer-subscribe-email">
                  Email for updates
                </label>
                <input
                  id="footer-subscribe-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-lm-red/60"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-lm-red px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#c96a0e]"
                >
                  Subscribe to updates
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="max-w-3xl text-xs leading-relaxed text-white/50">
              Liqui-Moly India is proudly operated and fulfilled by {DISTRIBUTOR}, the exclusive
              authorized national distributor.
            </p>
            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-xs text-white/45">
                © {year} {DISTRIBUTOR}. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/45">
                <Link href="/contact" className="hover:text-white">
                  Privacy
                </Link>
                <Link href="/contact" className="hover:text-white">
                  Terms
                </Link>
                <Link href="/articles" className="hover:text-white">
                  Sitemap
                </Link>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-[0.65rem] tracking-wide text-white/60 uppercase">
                <span className="size-1.5 rounded-full bg-lm-red" aria-hidden />
                Exclusive LIQUI MOLY · India
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating actions: brand orange Get Quote + WhatsApp green */}
      <div className="pointer-events-none fixed right-4 bottom-4 z-[120] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        <InquiryTrigger className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-lm-red px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(11,18,21,0.28)] transition hover:bg-[#c96a0e]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          Get Quote
        </InquiryTrigger>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition hover:brightness-110"
          style={{ backgroundColor: '#25D366' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.96.52 3.8 1.44 5.4L2 22l4.92-1.55a9.9 9.9 0 0 0 5.12 1.4h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.75 14.05c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.93-4.38-.14-.2-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35h.55c.18 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.3.02.49-.1.2-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.29.29-.12.57.16.28.73 1.2 1.57 1.94 1.08.96 1.99 1.26 2.27 1.4.28.14.45.12.61-.07.17-.2.7-.81.89-1.09.19-.28.38-.23.64-.14.26.1 1.66.78 1.95.92.28.14.47.21.54.33.07.12.07.69-.17 1.36Z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </>
  )
}
