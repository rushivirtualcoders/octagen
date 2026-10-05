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
        <div className="mx-auto max-w-[1100px] px-6 py-12 lg:px-10 lg:py-14">
          <p className="tech-label text-lm-red">Contact</p>
          <h1 className="font-display mt-3 text-[clamp(2.4rem,5vw,3.75rem)] font-extrabold tracking-tight text-ink uppercase">
            Contact us
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted lg:text-base">
            LIQUI MOLY India is operated and fulfilled by {DISTRIBUTOR}. Write to the Ahmedabad
            office for a grade, a workshop order or a supply question.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1100px] items-start gap-12 px-6 py-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16 lg:px-10 lg:py-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Phone</h2>
              <ul className="mt-3 space-y-1.5">
                {CONTACT_INFO.phones.map((phone) => (
                  <li key={phone}>
                    <a className="text-base text-ink hover:text-lm-red" href={`tel:${phone.replace(/\s/g, '')}`}>
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Email</h2>
              <a className="mt-3 block text-base text-ink hover:text-lm-red" href={`mailto:${CONTACT_INFO.email}`}>
                {CONTACT_INFO.email}
              </a>
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Office</h2>
              <address className="mt-3 max-w-sm text-base leading-relaxed text-ink not-italic">
                {CONTACT_INFO.address}
              </address>
            </div>
            <p className="max-w-sm border-t border-line pt-6 text-sm leading-relaxed text-muted">
              Include the vehicle or workshop, the specification if you have it, and the quantity.
              The team replies with the matching product and the next step.
            </p>
          </div>

          <div className="border border-line bg-[#f7f6f4] p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-ink">Message</h2>
            <p className="mt-1 mb-5 text-sm text-muted">We reply from the Narol office.</p>
            <InquiryForm
              compact
              defaults={{ type: 'GENERAL', subject: 'Contact page inquiry' }}
              submitLabel="Send"
              submitClassName="bg-lm-red hover:bg-[#c96a0e]"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <iframe
          title="Octagen office, Narol, Ahmedabad"
          src={mapSrc}
          className="h-80 w-full sm:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  )
}
