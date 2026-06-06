'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { postSchema } from '@/lib/validations'

export type ActionResult = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function createPost(formData: FormData): Promise<ActionResult> {
  const raw = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    excerpt: formData.get('excerpt') as string,
    tags: formData.get('tags') as string,
    published: formData.get('published') === 'on',
  }

  const parsed = postSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const tags = parsed.data.tags
    ? parsed.data.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : []

  await prisma.post.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt,
      tags,
      published: parsed.data.published ?? false,
    },
  })

  revalidatePath('/posts')
  revalidatePath('/feed')
  redirect('/posts')
}

export async function updatePost(id: string, formData: FormData): Promise<ActionResult> {
  const raw = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    excerpt: formData.get('excerpt') as string,
    tags: formData.get('tags') as string,
    published: formData.get('published') === 'on',
  }

  const parsed = postSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const existing = await prisma.post.findUnique({ where: { id } })

  if (!existing) {
    return { success: false, error: 'Post not found' }
  }

  const tags = parsed.data.tags
    ? parsed.data.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : []

  await prisma.post.update({
    where: { id },
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt,
      tags,
      published: parsed.data.published ?? false,
    },
  })

  revalidatePath('/posts')
  revalidatePath(`/posts/${id}`)
  revalidatePath('/feed')
  redirect(`/posts/${id}`)
}

export async function deletePost(id: string): Promise<ActionResult> {
  const existing = await prisma.post.findUnique({ where: { id } })

  if (!existing) {
    return { success: false, error: 'Post not found' }
  }

  await prisma.post.delete({ where: { id } })

  revalidatePath('/posts')
  revalidatePath('/feed')
  redirect('/posts')
}
