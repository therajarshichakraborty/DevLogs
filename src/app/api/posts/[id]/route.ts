import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { postSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await prisma.post.findUnique({ where: { id } })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: post })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await prisma.post.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

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

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        excerpt: parsed.data.excerpt,
        tags,
        published: parsed.data.published ?? false,
      },
    })

    return NextResponse.json({ success: true, data: post })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await prisma.post.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
        ...(body.tags !== undefined && {
          tags: Array.isArray(body.tags) ? body.tags : body.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
        }),
        ...(body.published !== undefined && { published: body.published }),
      },
    })

    return NextResponse.json({ success: true, data: post })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to patch post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await prisma.post.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    await prisma.post.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Post deleted successfully' })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
