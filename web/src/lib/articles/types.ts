export type PublicArticle = {
  slug: string
  title: string
  excerpt: string
  body: string
  author: string
  coverImageUrl: string
  category: {
    name: string
    slug: string
  }
  publishedAt: string | null
}
