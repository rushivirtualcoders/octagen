import { unstable_cache } from 'next/cache'
import { INSTAGRAM_PROFILE, SOCIAL_FEED } from '@/lib/constants'

export type InstagramPost = {
  id: string
  src: string
  alt: string
  href: string
  timestamp?: string
}

const FALLBACK_POSTS: InstagramPost[] = SOCIAL_FEED.map((post, index) => ({
  id: `fallback-${index}`,
  src: post.src,
  alt: post.alt,
  href: INSTAGRAM_PROFILE,
}))

type GraphMedia = {
  id: string
  caption?: string
  media_type?: string
  media_url?: string
  thumbnail_url?: string
  permalink?: string
  timestamp?: string
}

function mapGraphMedia(items: GraphMedia[]): InstagramPost[] {
  const posts: InstagramPost[] = []
  for (const item of items) {
    const src =
      item.media_type === 'VIDEO' || item.media_type === 'CAROUSEL_ALBUM'
        ? item.thumbnail_url || item.media_url
        : item.media_url || item.thumbnail_url
    if (!src) continue
    const caption = (item.caption || '').replace(/\s+/g, ' ').trim()
    posts.push({
      id: item.id,
      src,
      alt: caption ? caption.slice(0, 120) : 'Octagen Instagram post',
      href: item.permalink || INSTAGRAM_PROFILE,
      ...(item.timestamp ? { timestamp: item.timestamp } : {}),
    })
    if (posts.length >= 9) break
  }
  return posts
}

async function fetchInstagramFeedUncached(): Promise<{
  posts: InstagramPost[]
  source: 'instagram' | 'fallback'
  profileUrl: string
}> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim()
  const userId = process.env.INSTAGRAM_USER_ID?.trim()
  const profileUrl =
    process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE?.trim() || INSTAGRAM_PROFILE

  if (!token || !userId) {
    return { posts: FALLBACK_POSTS, source: 'fallback', profileUrl }
  }

  try {
    const url = new URL(`https://graph.facebook.com/v21.0/${userId}/media`)
    url.searchParams.set(
      'fields',
      'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
    )
    url.searchParams.set('limit', '9')
    url.searchParams.set('access_token', token)

    const res = await fetch(url.toString(), { cache: 'no-store' })

    if (!res.ok) {
      console.error('[instagram] Graph API error', res.status, await res.text())
      return { posts: FALLBACK_POSTS, source: 'fallback', profileUrl }
    }

    const data = (await res.json()) as { data?: GraphMedia[] }
    const posts = mapGraphMedia(data.data ?? [])
    if (posts.length === 0) {
      return { posts: FALLBACK_POSTS, source: 'fallback', profileUrl }
    }

    while (posts.length < 9) {
      const fallback = FALLBACK_POSTS[posts.length % FALLBACK_POSTS.length]
      posts.push({ ...fallback, id: `${fallback.id}-pad-${posts.length}` })
    }

    return { posts, source: 'instagram', profileUrl }
  } catch (error) {
    console.error('[instagram] fetch failed', error)
    return { posts: FALLBACK_POSTS, source: 'fallback', profileUrl }
  }
}

/** Cached for 1 hour — new posts appear on the next refresh window. */
export const getInstagramFeed = unstable_cache(
  fetchInstagramFeedUncached,
  ['instagram-feed-v1'],
  { revalidate: 3600 },
)
