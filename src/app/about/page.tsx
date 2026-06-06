import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About',
  description: 'About DevLog - a Next.js full-stack assignment for ChaiCode Web Dev Cohort 2026.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-10 pb-6 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight">About DevLog</h1>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          A Next.js 15 full-stack project built for the ChaiCode Web Dev Cohort 2026 assignment.
          Demonstrates file-based routing, SSR/SSG/ISR, API routes, Server Actions, and Prisma + PostgreSQL.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Rendering strategies
          </h2>
          <div className="rounded-lg border border-border overflow-hidden">
            {renderingStrategies.map((row, i) => (
              <div
                key={row.route}
                className={`flex items-center gap-4 px-4 py-3 text-sm flex-wrap ${i % 2 === 0 ? 'bg-muted/40' : 'bg-background'}`}
              >
                <code className="font-mono text-xs text-foreground min-w-[160px]">{row.route}</code>
                <Badge variant="secondary" className="text-xs shrink-0">{row.strategy}</Badge>
                <span className="text-muted-foreground text-xs">{row.reason}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            API routes
          </h2>
          <div className="rounded-lg border border-border overflow-hidden">
            {apiRoutes.map((row, i) => (
              <div
                key={`${row.method}-${row.path}`}
                className={`flex items-center gap-4 px-4 py-3 text-sm flex-wrap ${i % 2 === 0 ? 'bg-muted/40' : 'bg-background'}`}
              >
                <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded shrink-0 ${methodColors[row.method]}`}>
                  {row.method}
                </span>
                <code className="font-mono text-xs text-foreground min-w-[160px]">{row.path}</code>
                <span className="text-muted-foreground text-xs">{row.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Server Actions
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {serverActions.map((a) => (
              <Card key={a.name}>
                <CardHeader className="pb-2">
                  <code className="text-xs font-mono text-foreground">{a.name}</code>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-md border border-border bg-muted text-xs font-mono text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const renderingStrategies = [
  { route: '/', strategy: 'SSG', reason: 'Static marketing page - no dynamic data' },
  { route: '/about', strategy: 'SSG', reason: 'Static content, never changes at runtime' },
  { route: '/feed', strategy: 'ISR (60s)', reason: 'Public posts - stale-while-revalidate' },
  { route: '/posts', strategy: 'SSR', reason: 'Dashboard - always fetch fresh data' },
  { route: '/posts/[id]', strategy: 'SSR', reason: 'Post detail - always up to date' },
  { route: '/posts/[id]/edit', strategy: 'SSR', reason: 'Loads existing post data before editing' },
]

const apiRoutes = [
  { method: 'GET', path: '/api/posts', desc: 'List all posts (filter by published, tag)' },
  { method: 'POST', path: '/api/posts', desc: 'Create a new post' },
  { method: 'GET', path: '/api/posts/[id]', desc: 'Get a single post by ID' },
  { method: 'PUT', path: '/api/posts/[id]', desc: 'Full replacement update' },
  { method: 'PATCH', path: '/api/posts/[id]', desc: 'Partial field update' },
  { method: 'DELETE', path: '/api/posts/[id]', desc: 'Delete a post' },
]

const serverActions = [
  { name: 'createPost(fd)', desc: 'Creates post from form data, revalidates feed and dashboard.' },
  { name: 'updatePost(id, fd)', desc: 'Updates existing post, revalidates affected paths.' },
  { name: 'deletePost(id)', desc: 'Deletes post and redirects to dashboard.' },
]

const techStack = [
  'Next.js 15 (App Router)',
  'Prisma 5',
  'PostgreSQL (Neon)',
  'TypeScript',
  'Tailwind CSS',
  'shadcn/ui',
  'next-themes',
  'Zod',
  'lucide-react',
]

const methodColors: Record<string, string> = {
  GET: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
  POST: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  PUT: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  PATCH: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
}
