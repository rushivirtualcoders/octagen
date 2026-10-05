import type { Metadata } from 'next'
import InquiryForm from '@/components/inquiry/InquiryForm'
import { CONTACT_INFO } from '@/lib/constants'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `Contact us | ${SITE_NAME}`,
  description:
    'Contact Octagen in Ahmedabad for LIQUI MOLY inquiries, workshop partnerships and bulk supply across India.',
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.address)}&z=15&output=embed`

  return (
    <>
      <div className="mx-auto grid max-w-[980px] items-start gap-8 px-6 pt-24 pb-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-10">
        <section>
          <h1 className="text-xl font-bold tracking-tight text-ink">Get in touch</h1>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-ink">Phone</h3>
            <ul className="mt-1 space-y-0.5">
              {CONTACT_INFO.phones.map((phone) => (
                <li key={phone}>
                  <a
                    className="text-sm text-lm-red hover:underline"
                    href={`tel:${phone.replace(/\s/g, '')}`}
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-ink">Email</h3>
            <a
              className="mt-1 block text-sm text-lm-red hover:underline"
              href={`mailto:${CONTACT_INFO.email}`}
            >
              {CONTACT_INFO.email}
            </a>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-ink">Ahmedabad office</h3>
            <address className="mt-1 max-w-xs text-sm leading-relaxed text-muted not-italic">
              {CONTACT_INFO.address}
            </address>
          </div>
        </section>

        <section className="rounded-xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(11,18,21,0.05)] lg:p-5">
          <InquiryForm
            compact
            defaults={{ type: 'GENERAL', subject: 'Contact page inquiry' }}
            submitLabel="Send"
            submitClassName="bg-lm-red hover:bg-[#c96a0e]"
          />
        </section>
      </div>

      <iframe
        title="Octagen office map"
        src={mapSrc}
        className="h-64 w-full border-t border-line sm:h-72"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </>
  )
}
