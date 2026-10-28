import type { Metadata } from 'next'
import ContactPageView from '@/components/contact/ContactPageView'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `Contact us | ${SITE_NAME}`,
  description:
    'Contact Octagen in Ahmedabad for LIQUI MOLY specification help, workshop supply and national fulfilment. Send an enquiry or reach us by phone, email or WhatsApp.',
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactPage() {
  return <ContactPageView />
}
