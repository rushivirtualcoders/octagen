import type { Metadata } from 'next'
import Link from 'next/link'
import { DISTRIBUTOR } from '@/lib/constants'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `About us | ${SITE_NAME}`,
  description:
    'LIQUI MOLY was founded in Ulm in 1957 and is manufactured in Germany. Octagen is the exclusive authorized national distributor in India.',
  alternates: { canonical: `${SITE_URL}/about` },
}

const LM_FACTS = [
  { value: '1957', label: 'Founded in Ulm' },
  { value: 'Germany', label: 'Made in house' },
  { value: 'Ulm', label: 'Head office and production' },
  { value: '4,000+', label: 'Oils, additives and care' },
]

const RANGE = [
  {
    title: 'Motor oils',
    text: 'Grades for car and bike, written to the approval already printed for the engine. Top Tec 4200 is one example.',
  },
  {
    title: 'Additives',
    text: 'The company began with a molybdenum disulfide oil additive. Treatments such as Cera Tec sit in the same range.',
  },
  {
    title: 'Car care',
    text: 'Products for the work around the engine and the vehicle, supplied with the oils a workshop already uses.',
  },
]

const OCTAGEN = [
  {
    title: 'History in India',
    text: 'Octagen has supplied lubricants in India for more than twenty years. Liqui-Moly India is operated and fulfilled from the Ahmedabad office and warehouse.',
  },
  {
    title: 'Who it supplies',
    text: 'Workshops, fleets and vehicle owners use one inquiry path. The grade and pack size are confirmed from the catalogue, then supplied inside India.',
  },
  {
    title: 'What stays in Germany',
    text: 'Octagen does not formulate the oils. Development and production stay with LIQUI MOLY. This site has no cart and no prices.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-base pt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-5 lg:px-10">
          <p className="tech-label flex items-center gap-3 text-lm-red">
            <span className="h-px w-8 bg-lm-red" />
            Octagen
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">About us</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            LIQUI MOLY is the German brand, founded in 1957 and manufactured in-house in Germany.
            {` ${DISTRIBUTOR}`} is the official national distributor in India.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="#liqui-moly" className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink hover:border-ink">
              About LIQUI MOLY
            </a>
            <a href="#octagen" className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink hover:border-ink">
              About Octagen
            </a>
          </div>
        </div>
      </section>

      <section id="liqui-moly" className="scroll-mt-24 border-b border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
          <p className="tech-label text-lm-red">About LIQUI MOLY</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">Founded in Germany, 1957</h2>
          <dl className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {LM_FACTS.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-line bg-white p-5">
                <dt className="text-lg font-semibold text-ink">{fact.value}</dt>
                <dd className="mt-1 text-sm text-muted">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-base">
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-6 py-8 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:py-10">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-ink">The story</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                LIQUI MOLY was founded in Ulm in 1957. The first product was an oil additive built
                around molybdenum disulfide. That is still the start of the range.
              </p>
              <p>
                Oils, additives and car care are developed and produced in Germany. Head office and
                production remain in Ulm, with further production in Saarlouis. The work is done in
                house, not bought in as a finished brand.
              </p>
              <p>
                The same name is used in everyday driving and in motorsport, including touring cars
                and hillclimb. Grades such as Top Tec 4200 are written to OEM approvals.
              </p>
            </div>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-line">
            <img
              src="/assets/images/oil-pour.jpg"
              alt="Motor oil poured into an engine"
              className="h-64 w-full object-cover sm:h-72"
            />
          </figure>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
          <h2 className="text-xl font-semibold tracking-tight text-ink">Manufactured in Germany</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="text-base font-semibold text-ink">Ulm</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Where the company was founded, and where head office and production still sit.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="text-base font-semibold text-ink">Saarlouis</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A second German production site. The range is not made outside that system.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="text-base font-semibold text-ink">In house</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Development and production stay with LIQUI MOLY. More than 4,000 oils, additives
                and care products are in the range.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base">
        <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
          <h2 className="text-xl font-semibold tracking-tight text-ink">What the range covers</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {RANGE.map((item) => (
              <div key={item.title} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="octagen" className="scroll-mt-24 border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-6 py-8 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:py-10">
          <div>
            <p className="tech-label text-lm-red">About Octagen</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">
              Official national distributor
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                {DISTRIBUTOR} is the official national distributor for LIQUI MOLY in India, and the
                exclusive authorized partner for supply. Liqui-Moly India is operated and fulfilled
                by Octagen.
              </p>
              <p>
                The office is in Ahmedabad. The catalogue on this site opens the official LIQUI MOLY
                product page. An inquiry is how a workshop, a fleet or an owner asks for a grade.
              </p>
              <p>
                Octagen does not formulate the oils. That work stays in Germany. Octagen supplies
                the range inside India.
              </p>
            </div>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-line bg-white">
            <img
              src="/assets/images/lm/hillclimb.jpg"
              alt="LIQUI MOLY race car on a hillclimb"
              className="h-64 w-full object-cover sm:h-72"
            />
          </figure>
        </div>
      </section>

      <section className="border-t border-line bg-base">
        <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
          <h2 className="text-xl font-semibold tracking-tight text-ink">Octagen in India</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {OCTAGEN.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </article>
            ))}
          </div>
          <Link
            href="/contact"
            className="site-btn mt-8 inline-flex bg-lm-red px-6 py-3.5 text-[0.65rem] font-semibold tracking-[0.16em] text-white uppercase hover:bg-[#c96a0e]"
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
