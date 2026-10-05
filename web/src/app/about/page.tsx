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

const ORIGIN = [
  { value: '1957', label: 'Founded in Ulm' },
  { value: 'Germany', label: 'Made in house' },
  { value: '4,000+', label: 'Products in the range' },
  { value: 'India', label: 'Supplied by Octagen' },
]

const RANGE = [
  { value: 'Oils', label: 'Grades for car and bike' },
  { value: 'Additives', label: 'Protection and cleaning' },
  { value: 'Care', label: 'For the vehicle itself' },
  { value: 'OEM', label: 'Written to approvals' },
]

const TRACK = [
  { value: 'Ulm', label: 'Where it is developed' },
  { value: 'Circuit', label: 'Touring and hillclimb' },
  { value: 'Road', label: 'The same name in service' },
  { value: 'India', label: 'Fulfilled from Ahmedabad' },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-base pt-24">
        <div className="mx-auto grid max-w-[1400px] items-start gap-8 px-6 py-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-7 lg:px-10 lg:py-12">
          <div className="pt-2 lg:pt-6">
            <p className="tech-label text-lm-red">About us</p>
            <h1 className="font-display mt-3 text-[clamp(3.6rem,7vw,6.25rem)] leading-[0.82] font-extrabold tracking-[-0.04em] text-ink uppercase">
              About
              <br />
              Us
            </h1>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              German engine chemistry, supplied in India by {DISTRIBUTOR}. One brand. One authorised
              distributor.
            </p>
          </div>

          <figure className="overflow-hidden rounded-[1.75rem] bg-surface">
            <img
              src="/assets/images/lm/turner-lg.jpg"
              alt="LIQUI MOLY liveried race car on track"
              className="h-72 w-full object-cover lg:h-[28rem]"
            />
          </figure>

          <div>
            <figure className="overflow-hidden rounded-[1.75rem] bg-white">
              <img
                src="/assets/images/engine-oil.jpg"
                alt="Engine oil on pistons and a crankshaft"
                className="h-48 w-full object-cover lg:h-56"
              />
            </figure>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-ink">The company</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              LIQUI MOLY was founded in Ulm in 1957. Oils, additives and care are still developed
              and produced in Germany. {DISTRIBUTOR} fulfils that range from Ahmedabad.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-base px-6 pb-8 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] items-end gap-6 rounded-[2rem] bg-surface px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.15fr)_minmax(0,0.82fr)] lg:gap-8 lg:px-8 lg:py-10">
          <figure className="overflow-hidden rounded-[1.5rem] bg-white">
            <img
              src="/assets/images/oil-pour.jpg"
              alt="Motor oil poured into an engine"
              className="h-80 w-full object-cover lg:h-[26rem]"
            />
          </figure>

          <div className="rounded-[1.6rem] bg-white px-6 py-8 lg:px-8 lg:py-10">
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.75rem)] leading-[0.95] font-extrabold tracking-tight text-ink uppercase">
              From Ulm
              <br />
              to India
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                The company began with an oil additive built around molybdenum disulfide. Head office
                and production remain in Ulm, with further production in Saarlouis.
              </p>
              <p>
                Grades are written to OEM approvals, including oils such as Top Tec 4200. The same
                name appears in everyday driving and in motorsport.
              </p>
              <p>
                {DISTRIBUTOR} is the exclusive authorized national distributor. Workshops, fleets and
                owners inquire here. There is no cart on this site.
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {ORIGIN.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-display text-xl font-extrabold text-ink uppercase">{fact.value}</dt>
                  <dd className="mt-1 text-xs text-muted">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="overflow-hidden rounded-[1.5rem] bg-white">
            <img
              src="/assets/images/lm/black-falcon-lg.jpg"
              alt="LIQUI MOLY sponsored race car"
              className="h-80 w-full object-cover object-[center_40%] lg:h-[26rem]"
            />
          </figure>
        </div>
      </section>

      <section className="bg-base px-6 pb-8 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] items-end gap-6 rounded-[2rem] bg-surface px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.15fr)_minmax(0,0.82fr)] lg:gap-8 lg:px-8 lg:py-10">
          <figure className="overflow-hidden rounded-[1.5rem] bg-white">
            <img
              src="/assets/images/products/top-tec-4200.png"
              alt="LIQUI MOLY Top Tec 4200 5W-30"
              className="h-80 w-full object-cover object-top lg:h-[26rem]"
            />
          </figure>

          <div className="rounded-[1.6rem] bg-white px-6 py-8 lg:px-8 lg:py-10">
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.75rem)] leading-[0.95] font-extrabold tracking-tight text-ink uppercase">
              Oils, additives
              <br />
              and care
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                The German range covers motor oils, additives and products for the vehicle itself.
                Oils such as Top Tec 4200 are written to OEM approvals.
              </p>
              <p>
                Additives sit beside those oils, from the original molybdenum disulfide line through
                to treatments such as Cera Tec. Care products cover the work a workshop does around
                the engine.
              </p>
              <p>
                {DISTRIBUTOR} supplies the grade and pack size you ask for. Car and bike catalogues
                on this site open the official LIQUI MOLY product page.
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {RANGE.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-display text-xl font-extrabold text-ink uppercase">{fact.value}</dt>
                  <dd className="mt-1 text-xs text-muted">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="overflow-hidden rounded-[1.5rem] bg-white">
            <img
              src="/assets/images/lm/paint.jpg"
              alt="LIQUI MOLY paint care products"
              className="h-80 w-full object-cover lg:h-[26rem]"
            />
          </figure>
        </div>
      </section>

      <section className="bg-base px-6 pb-8 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] items-end gap-6 rounded-[2rem] bg-surface px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.15fr)_minmax(0,0.82fr)] lg:gap-8 lg:px-8 lg:py-10">
          <figure className="overflow-hidden rounded-[1.5rem] bg-white">
            <img
              src="/assets/images/tire-smoke.jpg"
              alt="Race car with tire smoke"
              className="h-80 w-full object-cover lg:h-[26rem]"
            />
          </figure>

          <div className="rounded-[1.6rem] bg-white px-6 py-8 lg:px-8 lg:py-10">
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.75rem)] leading-[0.95] font-extrabold tracking-tight text-ink uppercase">
              On the circuit
              <br />
              and the road
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                LIQUI MOLY is carried on touring cars and in hillclimb. The chemistry is developed
                for that use and for the car or bike that never sees a circuit.
              </p>
              <p>
                A workshop in India is not buying a race programme. It is buying the grade that
                matches the approval already printed for the engine.
              </p>
              <p>
                {DISTRIBUTOR} is the exclusive authorized national distributor for that supply. The
                motorsport name stays with LIQUI MOLY. Fulfilment in India stays with Octagen.
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {TRACK.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-display text-xl font-extrabold text-ink uppercase">{fact.value}</dt>
                  <dd className="mt-1 text-xs text-muted">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="overflow-hidden rounded-[1.5rem] bg-white">
            <img
              src="/assets/images/lm/hillclimb.jpg"
              alt="LIQUI MOLY race car on a hillclimb"
              className="h-80 w-full object-cover object-center lg:h-[26rem]"
            />
          </figure>
        </div>
      </section>

      <section className="bg-base px-6 pb-16 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] items-end gap-6 rounded-[2rem] bg-surface px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.15fr)_minmax(0,0.82fr)] lg:gap-8 lg:px-8 lg:py-10">
          <figure className="overflow-hidden rounded-[1.5rem] bg-white">
            <img
              src="/assets/images/hero-car.jpg"
              alt="Performance car on the road"
              className="h-80 w-full object-cover lg:h-[26rem]"
            />
          </figure>

          <div className="rounded-[1.6rem] bg-white px-6 py-8 lg:px-8 lg:py-10">
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.75rem)] leading-[0.95] font-extrabold tracking-tight text-ink uppercase">
              How supply
              <br />
              works
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                Workshops, fleets and owners use the same path. Share the car or bike, the approval
                you already have, or the volume a bay moves.
              </p>
              <p>
                {DISTRIBUTOR} replies with the LIQUI MOLY grade and pack size, then fulfils it from
                Ahmedabad. This site has no cart and no prices.
              </p>
            </div>
            <Link
              href="/contact"
              className="site-btn mt-8 inline-flex bg-lm-red px-6 py-3.5 text-[0.65rem] font-semibold tracking-[0.16em] text-white uppercase hover:bg-[#c96a0e]"
            >
              Contact us
            </Link>
          </div>

          <figure className="overflow-hidden rounded-[1.5rem] bg-white">
            <img
              src="/assets/images/racing-night.jpg"
              alt="Racing at night"
              className="h-80 w-full object-cover lg:h-[26rem]"
            />
          </figure>
        </div>
      </section>
    </>
  )
}
