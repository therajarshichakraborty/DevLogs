import type { Metadata } from 'next'
import { PostForm } from '@/components/PostForm'

export const metadata: Metadata = { title: 'New Post' }

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8 pb-6 border-b border-border">
        <h1 className="text-xl font-bold tracking-tight">New Post</h1>
        <p className="text-sm text-muted-foreground mt-1">Write something worth sharing.</p>
      </div>
      <PostForm />
    </div>
  )
}
