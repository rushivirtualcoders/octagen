import type { Metadata } from 'next'
import Link from 'next/link'
import { DISTRIBUTOR } from '@/lib/constants'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `About us | ${SITE_NAME}`,
  description:
    'LIQUI MOLY develops motor oils, additives and car care in Germany. Octagen is the exclusive authorized national distributor in India.',
  alternates: { canonical: `${SITE_URL}/about` },
}

const FACTS = [
  { value: '1957', label: 'Founded in Ulm' },
  { value: 'Germany', label: 'Developed and produced' },
  { value: '4,000+', label: 'Oils, additives and care' },
  { value: 'India', label: 'Fulfilled by Octagen' },
]

const RANGE = [
  {
    title: 'Motor oils',
    text: 'Grades for car and bike, written to the approval already printed for the engine. Top Tec 4200 is one example.',
  },
  {
    title: 'Additives',
    text: 'The company began with a molybdenum disulfide additive. Treatments such as Cera Tec sit in the same range.',
  },
  {
    title: 'Car care',
    text: 'Products for the work around the engine and the vehicle, supplied with the oils a workshop already uses.',
  },
]

const SUPPLY = [
  {
    title: 'Tell us the vehicle',
    text: 'Share the car or bike, the approval you already have, or the volume a workshop moves.',
  },
  {
    title: 'We match the grade',
    text: 'Octagen replies with the LIQUI MOLY product and the pack size. There is no cart on this site.',
  },
  {
    title: 'Supply from Ahmedabad',
    text: 'Workshops, fleets and owners are fulfilled in India by the exclusive authorized national distributor.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-base pt-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-6 px-6 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:px-10 lg:py-6">
          <div>
            <p className="tech-label flex items-center gap-3 text-lm-red">
              <span className="h-px w-8 bg-lm-red" />
              Octagen
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              About us
            </h1>
            <p className="mt-2 text-sm font-semibold tracking-tight text-lm-red">
              German chemistry. Indian supply.
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              LIQUI MOLY develops motor oils, additives and car care in Germany. {DISTRIBUTOR} is
              the exclusive authorized national distributor in India.
            </p>
          </div>
          <figure className="overflow-hidden border border-line bg-surface">
            <img
              src="/assets/images/performance-alt.jpg"
              alt="LIQUI MOLY liveried race car on track"
              className="h-44 w-full object-cover sm:h-52"
            />
          </figure>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <dl className="mx-auto grid max-w-[1200px] grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact) => (
            <div key={fact.label} className="border-line px-6 py-7 lg:border-l lg:px-8 lg:first:border-l-0">
              <dt className="font-display text-[clamp(1.6rem,2.4vw,2.1rem)] font-extrabold tracking-tight text-ink">
                {fact.value}
              </dt>
              <dd className="mt-1 text-sm text-muted">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-base">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.15rem)] font-extrabold tracking-tight text-ink uppercase">
              The company
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted lg:text-[0.95rem]">
              <p>
                LIQUI MOLY was founded in Ulm in 1957. The first product was an oil additive built
                around molybdenum disulfide. Head office and production remain in Ulm, with further
                production in Saarlouis.
              </p>
              <p>
                Oils, additives and care are still developed and produced in Germany. The same name
                appears in everyday driving and in motorsport, including touring cars and hillclimb.
              </p>
              <p>
                In India that range is fulfilled by {DISTRIBUTOR}, from the Ahmedabad office. Owners,
                workshops and fleets inquire here. Prices and checkout are not part of this site.
              </p>
            </div>
          </div>
          <figure className="overflow-hidden border border-line">
            <img
              src="/assets/images/oil-pour.jpg"
              alt="Motor oil poured into an engine"
              className="h-72 w-full object-cover lg:h-[24rem]"
            />
          </figure>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-[1200px] gap-4 px-6 py-14 lg:grid-cols-2 lg:px-10 lg:py-16">
          <article className="border border-line bg-white p-7 lg:p-9">
            <p className="tech-label text-lm-red">LIQUI MOLY</p>
            <h2 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-ink uppercase">
              Made in Germany
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              More than 4,000 oils, additives and care products. Grades are written to OEM approvals.
              Development stays in Germany. The motorsport name stays with LIQUI MOLY.
            </p>
          </article>
          <article className="border border-line bg-white p-7 lg:p-9">
            <p className="tech-label text-lm-red">Octagen</p>
            <h2 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-ink uppercase">
              Distributor in India
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {DISTRIBUTOR} is the exclusive authorized national distributor. The catalogue on this
              site opens the official LIQUI MOLY product page. Supply is arranged from Ahmedabad.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-base">
        <div className="mx-auto max-w-[1200px] px-6 py-14 lg:px-10 lg:py-16">
          <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.15rem)] font-extrabold tracking-tight text-ink uppercase">
            What the range covers
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {RANGE.map((item) => (
              <div key={item.title} className="border-t-2 border-lm-red pt-5">
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-10 lg:py-16">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.15rem)] font-extrabold tracking-tight text-ink uppercase">
              How supply works
            </h2>
            <ol className="mt-8 list-none space-y-6 p-0">
              {SUPPLY.map((step) => (
                <li key={step.title}>
                  <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
            <Link
              href="/contact"
              className="site-btn mt-8 inline-flex bg-lm-red px-6 py-3.5 text-[0.65rem] font-semibold tracking-[0.16em] text-white uppercase hover:bg-[#c96a0e]"
            >
              Contact us
            </Link>
          </div>
          <figure className="overflow-hidden border border-line bg-white">
            <img
              src="/assets/images/lm/hillclimb.jpg"
              alt="LIQUI MOLY race car on a hillclimb"
              className="h-64 w-full object-cover sm:h-80"
            />
          </figure>
        </div>
      </section>
    </>
  )
}
