import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PostCard } from '@/components/PostCard'
import { Button } from '@/components/ui/Button'
import { PenLine, LayoutDashboard } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'My Posts',
  description: 'Manage your DevLog posts.',
}

export default async function PostsPage() {
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

  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (e) {
    console.error('[Posts] DB error:', e)
  }

  const published = posts.filter((p) => p.published).length
  const drafts = posts.filter((p) => !p.published).length

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <LayoutDashboard size={20} className="text-muted-foreground" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">My Posts</h1>
            <p className="text-sm text-muted-foreground">
              {published} published · {drafts} draft{drafts !== 1 ? 's' : ''} · SSR - always fresh
            </p>
          </div>
        </div>
        <Button asChild size="sm" id="dashboard-new-post">
          <Link href="/posts/new">
            <PenLine size={14} />
            New Post
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <PenLine size={20} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">No posts yet.</p>
          <p className="text-xs text-muted-foreground">Create your first post to get started.</p>
          <Button asChild variant="outline" size="sm" className="mt-2" id="empty-new-post">
            <Link href="/posts/new">Write something</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} showActions />
          ))}
        </div>
      )}
    </div>
  )
}
