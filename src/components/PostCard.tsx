import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

type Post = {
  id: string
  title: string
  excerpt: string
  tags: string[]
  published: boolean
  createdAt: Date | string
}

type PostCardProps = {
  post: Post
  showActions?: boolean
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function PostCard({ post, showActions = false }: PostCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                post.published
                  ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800'
                  : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              {post.published ? 'Published' : 'Draft'}
            </span>
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar size={11} />
            {formatDate(post.createdAt)}
          </div>
        </div>

        <Link
          href={`/posts/${post.id}`}
          className="font-semibold text-base leading-tight hover:text-muted-foreground transition-colors mt-1 line-clamp-2"
        >
          {post.title}
        </Link>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{post.excerpt}</p>
      </CardContent>

      <CardFooter className="mt-auto pt-0 flex items-center justify-between">
        <Link
          href={`/posts/${post.id}`}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Read more →
        </Link>
        {showActions && (
          <Link
            href={`/posts/${post.id}/edit`}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Edit
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
