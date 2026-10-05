import type { Metadata } from 'next'
import Link from 'next/link'
import { DISTRIBUTOR } from '@/lib/constants'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `About us | ${SITE_NAME}`,
  description:
    'LIQUI MOLY is the hero brand. Octagen is the exclusive authorized national distributor in India — German motor oils, additives and care, supplied by inquiry.',
  alternates: { canonical: `${SITE_URL}/about` },
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-base pt-24">
        <div className="mx-auto grid max-w-[1400px] items-start gap-8 px-6 py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-7 lg:px-10 lg:py-10">
          <div className="pt-2">
            <h1 className="font-display text-[clamp(4.2rem,8vw,6.75rem)] leading-[0.8] font-extrabold tracking-[-0.04em] text-ink uppercase">
              About
              <br />
              Us
            </h1>
            <p className="tech-label mt-8 text-muted">German chemistry. Indian supply.</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              LIQUI MOLY develops the oils, additives and care. {DISTRIBUTOR} is the exclusive
              authorized national distributor that supplies them across India.
            </p>
          </div>

          <figure className="overflow-hidden rounded-[1.6rem] bg-surface">
            <img
              src="/assets/images/lm/turner-lg.jpg"
              alt="LIQUI MOLY liveried race car on track"
              className="h-72 w-full object-cover lg:h-[26rem]"
            />
          </figure>

          <div>
            <figure className="overflow-hidden rounded-[1.6rem] bg-white">
              <img
                src="/assets/images/engine-oil.jpg"
                alt="Engine oil on a crankshaft and pistons"
                className="h-44 w-full object-cover lg:h-52"
              />
            </figure>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-ink">Our approach</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Specification first. Workshops, fleets and owners get the right grade and pack size
              through an inquiry — no public prices, no cart, and product pages stay on
              liqui-moly.com.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-base px-6 pb-16 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] items-end gap-6 rounded-[2rem] bg-[#f4f1eb] px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8 lg:px-10 lg:py-10">
          <figure className="overflow-hidden rounded-[1.4rem] bg-white">
            <img
              src="/assets/images/oil-pour.jpg"
              alt="Motor oil poured into an engine"
              className="h-72 w-full object-cover lg:h-[22rem]"
            />
          </figure>

          <div className="rounded-[1.6rem] bg-white px-6 py-8 text-center lg:px-8 lg:py-10">
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.9] font-extrabold tracking-tight text-ink uppercase">
              The brand.
              <br />
              The supply.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted">
              Founded in Ulm in 1957, LIQUI MOLY develops and produces motor oils, additives and
              car care in Germany — including OEM-approved grades such as Top Tec 4200. {DISTRIBUTOR}{' '}
              operates and fulfils LIQUI MOLY India.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-left">
              <div>
                <dt className="font-display text-xl font-extrabold text-ink uppercase">1957</dt>
                <dd className="tech-label mt-1 text-muted">Ulm, Germany</dd>
              </div>
              <div>
                <dt className="font-display text-xl font-extrabold text-ink uppercase">India</dt>
                <dd className="tech-label mt-1 text-muted">National fulfilment</dd>
              </div>
            </dl>
            <div className="mt-7 flex justify-center">
              <Link
                href="/contact"
                className="site-btn bg-lm-red px-6 py-3 text-[0.65rem] font-semibold tracking-[0.16em] text-white uppercase hover:bg-[#c96a0e]"
              >
                Contact us
              </Link>
            </div>
          </div>

          <figure className="overflow-hidden rounded-[1.4rem] bg-white">
            <img
              src="/assets/images/lm/black-falcon-lg.jpg"
              alt="LIQUI MOLY sponsored race car"
              className="h-72 w-full object-cover object-[center_60%] lg:h-[22rem]"
            />
          </figure>
        </div>
      </section>
    </>
  )
}
