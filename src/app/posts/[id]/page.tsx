import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DeleteButton } from '@/components/DeleteButton'
import { Calendar, ArrowLeft, Pencil } from 'lucide-react'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } }).catch(() => null)
  if (!post) return { title: 'Post Not Found' }
  return { title: post.title, description: post.excerpt }
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params

  const post = await prisma.post.findUnique({ where: { id } }).catch(() => null)

  if (!post) notFound()

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <Button asChild variant="ghost" size="sm">
          <Link href="/posts">
            <ArrowLeft size={14} />
            All Posts
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" id={`edit-post-${post.id}`}>
            <Link href={`/posts/${post.id}/edit`}>
              <Pencil size={13} />
              Edit
            </Link>
          </Button>
          <DeleteButton id={post.id} />
        </div>
      </div>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                post.published
                  ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800'
                  : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              {post.published ? 'Published' : 'Draft'}
            </span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-3 leading-tight">{post.title}</h1>

          <p className="text-muted-foreground text-base leading-relaxed italic mb-4">{post.excerpt}</p>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar size={12} />
            {formattedDate}
          </div>
        </header>

        <div className="border-t border-border pt-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, i) =>
              paragraph.trim() ? (
                <p key={i} className="text-muted-foreground leading-[1.85] mb-4 text-base">
                  {paragraph}
                </p>
              ) : (
                <br key={i} />
              )
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
