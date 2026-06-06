import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(120, 'Title too long'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(200, 'Excerpt too long'),
  tags: z.string().optional(),
  published: z.boolean().optional().default(false),
})

export type PostInput = z.infer<typeof postSchema>
