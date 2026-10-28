import type { Metadata } from 'next'
import AboutMediaSlider from '@/components/about/AboutMediaSlider'
import { DISTRIBUTOR } from '@/lib/constants'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `About us | ${SITE_NAME}`,
  description:
    'LIQUI MOLY brand story and values. Octagen is the exclusive authorized national distributor in India.',
  alternates: { canonical: `${SITE_URL}/about` },
}

const MEDIA_SLIDES = [
  {
    id: 'my-motor-oil',
    title: 'LIQUI MOLY — My motor oil',
    type: 'video' as const,
    src: '/assets/videos/lm-my-motor-oil.mp4',
    poster: '/assets/images/lm/for-the-drivers-hero.jpg',
    thumb: '/assets/images/lm/for-the-drivers-hero.jpg',
  },
  {
    id: 'classic',
    title: 'Classic cars',
    type: 'image' as const,
    src: '/assets/images/lm/classic-cars.jpg',
    thumb: '/assets/images/lm/classic-cars.jpg',
  },
  {
    id: 'commercial',
    title: 'LIQUI MOLY commercial',
    type: 'video' as const,
    src: '/assets/videos/lm-commercial-2019.mp4',
    poster: '/assets/images/lm/for-the-drivers-large.jpg',
    thumb: '/assets/images/lm/for-the-drivers-large.jpg',
  },
  {
    id: 'mxgp',
    title: 'Motorcycle & MXGP',
    type: 'image' as const,
    src: '/assets/images/lm/mxgp.jpg',
    thumb: '/assets/images/lm/mxgp.jpg',
  },
  {
    id: 'hillclimb',
    title: 'Hillclimb',
    type: 'image' as const,
    src: '/assets/images/lm/hillclimb.jpg',
    thumb: '/assets/images/lm/hillclimb.jpg',
  },
]

const VALUES = [
  {
    title: 'Excellence',
    text: 'We are ambitious and always give our very best. We act in a solution-oriented and precise manner, setting standards in quality and innovation.',
  },
  {
    title: 'Integrity',
    text: 'We act diligently and reliably. We are open, honest, and stand by our word — both internally and externally.',
  },
  {
    title: 'Respect',
    text: 'We treat one another with loyalty, trust, and as equals — always appreciative, always collegial, always grateful.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="border-b border-line bg-base pt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-5 lg:px-10">
          <p className="tech-label flex items-center gap-3 text-lm-red">
            <span className="h-px w-8 bg-lm-red" />
            Octagen
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">About us</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            LIQUI MOLY is the German brand, founded in Ulm in 1957 and manufactured in-house in
            Germany — oils, additives and car care developed for drivers and workshops worldwide.
            {` ${DISTRIBUTOR}`} is the exclusive authorized national distributor in India. Liqui-Moly
            India is operated and fulfilled by Octagen from Ahmedabad: the official catalogue, one
            inquiry path for the right grade and pack size, and national supply — without a cart and
            without prices online.
          </p>
        </div>
      </section>

      {/* Media slider + paragraph */}
      <section id="brand" className="scroll-mt-24 border-b border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
          <AboutMediaSlider slides={MEDIA_SLIDES} />

          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted lg:text-base">
            <p>
              Having fun at the wheel is what drives LIQUI MOLY — from everyday driving to motorsport.
              Decades of research, development and racing go into oils, additives and car care built
              for real vehicles and real drivers.
            </p>
            <p>
              Whether inherited, longed for or built up over many years, vehicles offer freedom and
              unforgettable moments. That connection is what the brand celebrates: for you. FOR THE
              DRIVERS.
            </p>
          </div>
        </div>
      </section>

      {/* col-6 image | col-6 paragraph */}
      <section className="border-b border-line bg-base">
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-6 py-8 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-12">
          <figure className="overflow-hidden rounded-2xl border border-line">
            <img
              src="/assets/images/lm/for-the-drivers-large.jpg"
              alt="Drivers enjoying the road — LIQUI MOLY brand world"
              className="h-64 w-full object-cover sm:h-80 lg:h-[22rem]"
            />
          </figure>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Having fun at the wheel is diverse
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted lg:text-base">
              Whether it is a car or truck, a motorcycle, on or off the road, on race tracks or in
              everyday traffic — having fun at the wheel can mean something different to everybody.
              That diversity forms the basis of the LIQUI MOLY brand and drives top performance again
              and again. For people who love being on the move. For you. FOR THE DRIVERS.
            </p>
          </div>
        </div>
      </section>

      {/* Values — 3 equal columns (1/3 · 1/3 · 1/3) */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-14">
          <h2 className="text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
            Our values. Our attitude. Our driving force.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:mt-12 lg:gap-10">
            {VALUES.map((value) => (
              <article key={value.title} className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-ink lg:text-xl">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted lg:text-[0.95rem]">
                  {value.text}
                </p>
              </article>
            ))}
          </div>

          <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl border border-line bg-white lg:mt-14">
            <video
              src="/assets/videos/lm-cera-tec.mp4"
              poster="/assets/images/lm/for-the-drivers.jpg"
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center bg-ink/60 px-4 py-2.5">
              <p className="tech-label text-white">Our values. Our attitude. Our drive.</p>
            </div>
          </div>

          <div className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed lg:text-base">
            <p className="text-black">
              These are not just the values we communicate — this is our daily aspiration. We are the
              LIQUI MOLY family worldwide: strong, inclusive and diverse. The LIQUI MOLY spirit is
              fueled by these values.
            </p>
            <p className="text-black">
              It is important to know what we represent to know where we are heading:{' '}
              <span className="font-semibold text-black">Excellence. Integrity. Respect.</span>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
