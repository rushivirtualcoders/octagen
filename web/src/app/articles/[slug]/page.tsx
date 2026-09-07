import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleBody from '@/components/articles/ArticleBody'
import InquiryTrigger from '@/components/inquiry/InquiryTrigger'
import PublicShell from '@/components/layout/PublicShell'
import { formatArticleDate } from '@/lib/articles/content'
import { getPublishedArticleBySlug, getPublishedArticleSlugs } from '@/lib/cms/public-articles'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getPublishedArticleBySlug(slug)

  if (!article) {
    return { title: `Article not found | ${SITE_NAME}` }
  }

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.excerpt,
    alternates: { canonical: `${SITE_URL}/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `${SITE_URL}/articles/${article.slug}`,
      images: article.coverImageUrl
        ? [{ url: article.coverImageUrl, alt: article.title }]
        : undefined,
    },
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await getPublishedArticleBySlug(slug)

  if (!article) notFound()

  const date = formatArticleDate(article.publishedAt)

  return (
    <PublicShell>
      <article className="border-b border-line bg-base">
        <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-14">
          <Link href="/articles" className="tech-label text-lm-blue transition-colors hover:text-ink">
            ← All articles
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="tech-label text-lm-red">{article.category.name}</p>
              <h1 className="font-display mt-3 text-[clamp(1.75rem,4vw,3rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
                {article.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted lg:text-base">
                {article.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted">
                {date ? <span>{date}</span> : null}
                {date ? <span aria-hidden>·</span> : null}
                <span>{article.author}</span>
              </div>
            </div>

            <div className="relative min-h-[16rem] overflow-hidden rounded-[10px] border border-line bg-surface lg:min-h-[20rem]">
              <img
                src={article.coverImageUrl || '/assets/images/hero-car.jpg'}
                alt=""
                className={`absolute inset-0 h-full w-full ${
                  article.coverImageUrl.includes('.png') ? 'object-contain p-8' : 'object-cover'
                }`}
              />
            </div>
          </div>
        </div>
      </article>

      <div className="mx-auto max-w-[760px] px-6 py-12 lg:px-10 lg:py-16">
        <ArticleBody body={article.body} />

        <div className="mt-12 rounded-[10px] border border-line bg-white p-6 sm:p-8">
          <p className="tech-label text-lm-blue">Need supply or specification help?</p>
          <h2 className="font-display mt-2 text-xl font-extrabold uppercase tracking-tight text-ink">
            Talk to Octagen
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            LIQUI MOLY India is supplied exclusively through Octagen. Submit an inquiry with your vehicle,
            workshop or fleet details and we will quote the correct product and pack size.
          </p>
          <InquiryTrigger
            className="site-btn mt-6 inline-flex border border-lm-blue bg-transparent px-6 py-3 text-[0.62rem] font-semibold tracking-[0.16em] text-ink uppercase"
            subject={article.title}
            type="GENERAL"
          >
            Submit inquiry / get quote
          </InquiryTrigger>
        </div>
      </div>
    </PublicShell>
  )
}
