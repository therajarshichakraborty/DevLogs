'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/Button'
import { createPost, updatePost, ActionResult } from '@/actions/posts'

type Post = {
  id: string
  title: string
  content: string
  excerpt: string
  tags: string[]
  published: boolean
}

const initialState: ActionResult = { success: true }

export function PostForm({ post }: { post?: Post }) {
  const action = post
    ? async (prev: ActionResult, formData: FormData) => updatePost(post.id, formData)
    : async (prev: ActionResult, formData: FormData) => createPost(formData)

  const [state, formAction, pending] = useActionState(action, initialState)
  const errors = state.fieldErrors ?? {}

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter post title..."
          defaultValue={post?.title}
          required
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title[0]}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          placeholder="A short summary shown in the feed..."
          defaultValue={post?.excerpt}
          className="min-h-[80px]"
          required
        />
        {errors.excerpt ? (
          <p className="text-xs text-destructive">{errors.excerpt[0]}</p>
        ) : (
          <p className="text-xs text-muted-foreground">Max 200 characters - shown in feed previews</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your post content here..."
          defaultValue={post?.content}
          className="min-h-[240px]"
          required
        />
        {errors.content && <p className="text-xs text-destructive">{errors.content[0]}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          name="tags"
          placeholder="nextjs, react, typescript"
          defaultValue={post?.tags.join(', ')}
        />
        {errors.tags ? (
          <p className="text-xs text-destructive">{errors.tags[0]}</p>
        ) : (
          <p className="text-xs text-muted-foreground">Comma separated</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          id="published"
          name="published"
          type="checkbox"
          className="h-4 w-4 accent-foreground cursor-pointer"
          defaultChecked={post?.published}
        />
        <Label htmlFor="published" className="cursor-pointer">
          Publish immediately
        </Label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" loading={pending} id="submit-post-btn">
          {post ? 'Save Changes' : 'Create Post'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
