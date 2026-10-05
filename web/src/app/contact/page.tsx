import type { Metadata } from 'next'
import InquiryForm from '@/components/inquiry/InquiryForm'
import { CONTACT_INFO, DISTRIBUTOR } from '@/lib/constants'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `Contact us | ${SITE_NAME}`,
  description:
    'Contact Octagen in Ahmedabad for LIQUI MOLY specification help, workshop supply and national fulfilment.',
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.address)}&z=15&output=embed`

  return (
    <>
      <section className="border-b border-line bg-base pt-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-6 px-6 py-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-10 lg:py-6">
          <div>
            <p className="tech-label flex items-center gap-3 text-lm-red">
              <span className="h-px w-8 bg-lm-red" />
              Contact
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              Contact us
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              LIQUI MOLY India is operated and fulfilled by {DISTRIBUTOR}. Use the form for a
              general inquiry, a workshop partnership, or a bulk distributor application.
            </p>
          </div>
          <div className="overflow-hidden border border-line bg-surface">
            <iframe
              title="Octagen office, Narol, Ahmedabad"
              src={mapSrc}
              className="h-44 w-full sm:h-52"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-[1200px] gap-4 px-6 py-6 sm:grid-cols-3 lg:px-10">
          <div className="border border-line bg-white p-5">
            <h2 className="tech-label text-lm-red">Phone</h2>
            <ul className="mt-3 space-y-1.5">
              {CONTACT_INFO.phones.map((phone) => (
                <li key={phone}>
                  <a className="text-sm text-ink hover:text-lm-red" href={`tel:${phone.replace(/\s/g, '')}`}>
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-line bg-white p-5">
            <h2 className="tech-label text-lm-red">Email</h2>
            <a className="mt-3 block text-sm text-ink hover:text-lm-red" href={`mailto:${CONTACT_INFO.email}`}>
              {CONTACT_INFO.email}
            </a>
          </div>
          <div className="border border-line bg-white p-5">
            <h2 className="tech-label text-lm-red">Office and warehouse</h2>
            <address className="mt-3 text-sm leading-relaxed text-ink not-italic">
              {CONTACT_INFO.address}
            </address>
          </div>
        </div>
      </section>

      <section className="bg-base">
        <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10 lg:py-12">
          <div className="border border-line bg-white p-6 lg:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-ink">Send a message</h2>
            <p className="mt-2 mb-6 max-w-xl text-sm leading-relaxed text-muted">
              Choose general inquiry, workshop partnership, or bulk distributor application. Include
              the vehicle or workshop, the specification if you have it, and the quantity.
            </p>
            <InquiryForm
              compact
              defaults={{ type: 'GENERAL', subject: 'Contact page inquiry' }}
              submitLabel="Send"
              submitClassName="bg-lm-red hover:bg-[#c96a0e]"
            />
          </div>
        </div>
      </section>
    </>
  )
}
