import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { PostCard } from '@/components/PostCard'
import { Button } from '@/components/ui/Button'
import { Rss, PenLine } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Public Feed',
  description: 'Browse all published DevLog posts.',
}

export default async function FeedPage() {
  let posts: {
    id: string
    title: string
    excerpt: string
    tags: string[]
    published: boolean
    createdAt: Date
    content: string
    updatedAt: Date
  }[] = []

  let error: string | null = null

  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch (e) {
    error = 'Failed to load posts. Please try again later.'
    console.error('[Feed] DB error:', e)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Rss size={20} className="text-muted-foreground" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Public Feed</h1>
            <p className="text-sm text-muted-foreground">
              {posts.length} published post{posts.length !== 1 ? 's' : ''} · ISR - revalidates every 60s
            </p>
          </div>
        </div>
        <Button asChild size="sm">
          <Link href="/posts/new">
            <PenLine size={14} />
            Write
          </Link>
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {!error && posts.length === 0 && (
        <div className="py-20 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Rss size={20} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">No published posts yet.</p>
          <p className="text-xs text-muted-foreground">Be the first - write a post and publish it.</p>
          <Button asChild variant="outline" size="sm" className="mt-2">
            <Link href="/posts/new">Write something</Link>
          </Button>
        </div>
      )}

      {posts.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
