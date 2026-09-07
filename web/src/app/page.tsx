import HomePage from '@/App'
import { getPublishedArticles } from '@/lib/cms/public-articles'

export default async function Page() {
  const articles = await getPublishedArticles(6)
  return <HomePage articles={articles} />
}
