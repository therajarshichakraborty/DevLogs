import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { postSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const tag = searchParams.get('tag')

    const where: Record<string, unknown> = {}

    if (published === 'true') where.published = true
    if (published === 'false') where.published = false
    if (tag) where.tags = { has: tag }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = postSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const tags = parsed.data.tags
      ? parsed.data.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    const post = await prisma.post.create({
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        excerpt: parsed.data.excerpt,
        tags,
        published: parsed.data.published ?? false,
      },
    })

    return NextResponse.json({ success: true, data: post }, { status: 201 })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
