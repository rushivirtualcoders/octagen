import { NextResponse } from 'next/server'
import { getInstagramFeed } from '@/lib/instagram/feed'

export async function GET() {
  const feed = await getInstagramFeed()

  return NextResponse.json(
    {
      posts: feed.posts,
      source: feed.source,
      profileUrl: feed.profileUrl,
      fetchedAt: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    },
  )
}
