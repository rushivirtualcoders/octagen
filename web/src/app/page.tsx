import HomePage from '@/App'
import { getPublishedArticles } from '@/lib/cms/public-articles'
import { getInstagramFeed } from '@/lib/instagram/feed'

export default async function Page() {
  const [articles, instagram] = await Promise.all([
    getPublishedArticles(6),
    getInstagramFeed(),
  ])
  return (
    <HomePage
      articles={articles}
      instagramPosts={instagram.posts}
      instagramProfileUrl={instagram.profileUrl}
    />
  )
}
