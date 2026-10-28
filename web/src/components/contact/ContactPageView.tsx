import Link from 'next/link'
import ContactEnquiryForm from '@/components/contact/ContactEnquiryForm'
import { CONTACT_INFO, DISTRIBUTOR, INSTAGRAM_PROFILE } from '@/lib/constants'

const WHATSAPP_URL = `https://wa.me/${CONTACT_INFO.phones[0].replace(/\D/g, '')}`

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A14.5 14.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconSocial() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function ContactCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-line bg-white p-5 shadow-sm">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-ink">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="tech-label text-lm-red">{label}</p>
        <div className="mt-2 space-y-1 text-sm leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  )
}

export default function ContactPageView() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.address)}&z=15&output=embed`
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`

  return (
    <>
      {/* Dark hero — same structure as Lubechem, Octagen ink + orange */}
      <section className="relative overflow-hidden bg-ink pt-24 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(233,126,17,0.22),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/5 to-transparent"
        />
        <div className="relative mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-white/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-lm-red">Contact Us</li>
            </ol>
          </nav>

          <h1 className="font-display max-w-3xl text-[clamp(2.6rem,6.5vw,4.75rem)] leading-[0.95] font-extrabold tracking-[-0.03em]">
            Let&apos;s talk
            <br />
            <span className="text-lm-red">performance.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Send us your specification question, workshop requirement, or commercial enquiry for
            LIQUI MOLY in India. We respond within one business day during our working week.
          </p>
        </div>
      </section>

      {/* Cards + form */}
      <section className="border-b border-line bg-base">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10 lg:px-10 lg:py-14">
          <div className="space-y-4">
            <ContactCard icon={<IconMail />} label="Email">
              <a href={`mailto:${CONTACT_INFO.email}`} className="font-medium transition hover:text-lm-red">
                {CONTACT_INFO.email}
              </a>
            </ContactCard>

            <ContactCard icon={<IconPhone />} label="Phone">
              {CONTACT_INFO.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="block font-medium transition hover:text-lm-red"
                >
                  {phone}
                </a>
              ))}
              <p className="text-muted">Mon–Sat 09:00 – 18:00 IST</p>
            </ContactCard>

            <ContactCard icon={<IconPin />} label="Address">
              <address className="not-italic">{CONTACT_INFO.address}</address>
            </ContactCard>

            <ContactCard icon={<IconChat />} label="WhatsApp">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[#128C7E] transition hover:text-[#25D366]"
              >
                {CONTACT_INFO.phones[0]}
                <span aria-hidden>→</span>
              </a>
              <p className="text-muted">Fastest channel for quick product questions</p>
            </ContactCard>

            <ContactCard icon={<IconSocial />} label="Instagram">
              <a
                href={INSTAGRAM_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium transition hover:text-lm-red"
              >
                @liquimoly_india
                <span aria-hidden>→</span>
              </a>
              <p className="text-muted">Operated & fulfilled by {DISTRIBUTOR}</p>
            </ContactCard>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm lg:p-8">
            <p className="tech-label text-lm-red">Send enquiry</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
              Tell us what you&apos;re working on.
            </h2>
            <div className="mt-6">
              <ContactEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-14">
          <p className="tech-label text-lm-red">Find us</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Ahmedabad location</h2>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-lm-red transition hover:underline"
            >
              View larger map →
            </a>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <iframe
              title="Octagen office and warehouse, Narol, Ahmedabad"
              src={mapSrc}
              className="h-[min(28rem,70vh)] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
