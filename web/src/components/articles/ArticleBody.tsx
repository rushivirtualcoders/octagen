import { articleParagraphs } from '@/lib/articles/content'

export default function ArticleBody({ body }: { body: string }) {
  const paragraphs = articleParagraphs(body)

  return (
    <div className="space-y-5 text-sm leading-relaxed text-muted lg:text-base">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  )
}
