import Link from 'next/link'
import { formatArticleDate } from '@/lib/articles/content'
import type { PublicArticle } from '@/lib/articles/types'

type Props = {
  article: PublicArticle
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: Props) {
  const date = formatArticleDate(article.publishedAt)

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[10px] border border-line bg-white shadow-[0_12px_40px_rgba(11,18,21,0.04)] transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(11,18,21,0.08)] ${
        featured ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : ''
      }`}
    >
      <Link
        href={`/articles/${article.slug}`}
        className={`relative block overflow-hidden bg-surface ${featured ? 'min-h-[14rem] lg:min-h-full' : 'aspect-[16/10]'}`}
      >
        <img
          src={article.coverImageUrl || '/assets/images/hero-car.jpg'}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
            article.coverImageUrl.includes('.png') ? 'object-contain p-6' : 'object-cover'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
        <span className="tech-label absolute top-3 left-3 rounded-[10px] border border-white/20 bg-ink/45 px-2.5 py-1 text-white backdrop-blur-sm">
          {article.category.name}
        </span>
      </Link>

      <div className={`flex flex-1 flex-col p-5 ${featured ? 'lg:p-7' : 'sm:p-6'}`}>
        {date ? <p className="tech-label text-muted">{date}</p> : null}
        <h3
          className={`font-display mt-2 font-extrabold uppercase leading-tight tracking-tight text-ink ${
            featured ? 'text-xl lg:text-2xl' : 'text-base sm:text-lg'
          }`}
        >
          <Link href={`/articles/${article.slug}`} className="transition-colors hover:text-lm-blue">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-xs text-muted">{article.author}</p>
          <Link
            href={`/articles/${article.slug}`}
            className="tech-label text-lm-blue transition-transform hover:translate-x-0.5"
          >
            Read article →
          </Link>
        </div>
      </div>
    </article>
  )
}
