import type { Metadata } from 'next'
import ArticleCard from '@/components/articles/ArticleCard'
import InquiryTrigger from '@/components/inquiry/InquiryTrigger'
import PublicShell from '@/components/layout/PublicShell'
import { getAllPublishedArticles } from '@/lib/cms/public-articles'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `Insights & articles | ${SITE_NAME}`,
  description:
    'Specification-first LIQUI MOLY guidance for workshops, fleets and vehicle owners in India — articles from Octagen, the authorized national distributor.',
  alternates: { canonical: `${SITE_URL}/articles` },
}

export default async function ArticlesPage() {
  const articles = await getAllPublishedArticles()

  return (
    <PublicShell>
      <div className="border-b border-line bg-base">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16">
          <p className="tech-label text-lm-blue">Insights</p>
          <h1 className="font-display mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            Articles & technical guidance
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted lg:text-base">
            Practical notes on oil selection, OEM approvals, workshop supply and LIQUI MOLY applications —
            published by Octagen for India&apos;s authorized distributor channel.
          </p>
          <InquiryTrigger
            className="site-btn mt-8 inline-flex border border-lm-blue bg-transparent px-6 py-3 text-[0.62rem] font-semibold tracking-[0.16em] text-ink uppercase"
            subject="Article page inquiry"
            type="GENERAL"
          >
            Submit inquiry / get quote
          </InquiryTrigger>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </PublicShell>
  )
}
