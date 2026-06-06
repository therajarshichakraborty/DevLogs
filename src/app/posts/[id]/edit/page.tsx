import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PostForm } from '@/components/PostForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Edit Post' }

type Props = { params: Promise<{ id: string }> }

export default async function EditPostPage({ params }: Props) {
  const { id } = await params

  const post = await prisma.post.findUnique({ where: { id } }).catch(() => null)

  if (!post) notFound()

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8 pb-6 border-b border-border">
        <h1 className="text-xl font-bold tracking-tight">Edit Post</h1>
        <p className="text-sm text-muted-foreground mt-1 truncate">{post.title}</p>
      </div>
      <PostForm post={post} />
    </div>
  )
}
