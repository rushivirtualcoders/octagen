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
        <div className="mx-auto max-w-[1400px] px-6 py-5 lg:px-10">
          <p className="tech-label flex items-center gap-3 text-lm-red">
            <span className="h-px w-8 bg-lm-red" />
            Contact
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Contact us</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            LIQUI MOLY India is operated and fulfilled by {DISTRIBUTOR}. Ask a general question,
            propose a workshop partnership, or apply as a bulk distributor.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
          <h2 className="text-xl font-semibold tracking-tight text-ink">Location and support</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-line bg-white p-5">
                <h3 className="tech-label text-lm-red">Phone</h3>
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
              <div className="rounded-2xl border border-line bg-white p-5">
                <h3 className="tech-label text-lm-red">Support email</h3>
                <a className="mt-3 block text-sm text-ink hover:text-lm-red" href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="rounded-2xl border border-line bg-white p-5 sm:col-span-2 lg:col-span-1">
                <h3 className="tech-label text-lm-red">Office and warehouse</h3>
                <address className="mt-3 text-sm leading-relaxed text-ink not-italic">{CONTACT_INFO.address}</address>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line bg-white">
              <iframe
                title="Octagen office and warehouse, Narol, Ahmedabad"
                src={mapSrc}
                className="h-full min-h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base">
        <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
          <div className="rounded-2xl border border-line bg-white p-6 lg:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-ink">Send an inquiry</h2>
            <p className="mt-2 mb-6 max-w-xl text-sm leading-relaxed text-muted">
              Choose general inquiry, workshop partnership, or bulk distributor application. Include
              the vehicle or workshop, the specification if you have it, and the quantity.
            </p>
            <InquiryForm
              compact
              showTypeChoices
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
