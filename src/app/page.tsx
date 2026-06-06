import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, PenLine, Globe, Zap, Database, Code2, Layers, RefreshCw, Server } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Home - Developer Blog Platform',
  description: 'Write, publish, and manage your developer notes with DevLog.',
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="py-20 text-center flex flex-col items-center gap-6">
        <Badge variant="outline" className="px-4 py-1 text-xs">
          Open Source · Built for ChaiCode Cohort 2026
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground max-w-2xl leading-[1.1]">
          Your developer notes,{' '}
          <span className="text-muted-foreground">beautifully organized</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
          DevLog is a minimal full-stack blog platform. Write posts, tag them, save drafts,
          and publish to the public feed. Built to showcase every core Next.js concept.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild size="lg" id="hero-start-writing">
            <Link href="/posts/new">
              <PenLine size={16} />
              Start writing
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" id="hero-browse-feed">
            <Link href="/feed">
              Browse feed <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {['Next.js 15', 'Prisma ORM', 'PostgreSQL', 'Server Actions', 'ISR · SSG · SSR', 'shadcn/ui'].map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-md border border-border bg-muted text-muted-foreground text-xs font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="py-10 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 p-4">
              <span className="text-3xl font-bold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 border-t border-border">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Everything you need</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            A small but complete project demonstrating all major Next.js concepts.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card key={f.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mb-2 text-muted-foreground">
                  <f.icon size={16} />
                </div>
                <CardTitle className="text-sm">{f.title}</CardTitle>
                <CardDescription className="text-xs">{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 border-t border-border">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
          <p className="text-muted-foreground mt-2 text-sm">Three steps to start sharing your developer notes.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center text-xs font-bold text-muted-foreground">
                {i + 1}
              </div>
              <h3 className="font-semibold text-sm">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 border-t border-border">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Rendering strategies</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Each page uses the right rendering strategy for its data needs.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {renderingCards.map((r) => (
            <Card key={r.strategy} className="text-center">
              <CardContent className="pt-6 pb-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3 text-muted-foreground">
                  <r.icon size={18} />
                </div>
                <Badge variant="secondary" className="mb-2 text-xs">{r.strategy}</Badge>
                <p className="text-xs text-muted-foreground mt-2">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 border-t border-border text-center">
        <h2 className="text-2xl font-bold tracking-tight">Ready to start writing?</h2>
        <p className="text-muted-foreground mt-2 mb-6 text-sm">
          Create your first post in seconds. No account needed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" id="bottom-cta-new-post">
            <Link href="/posts/new">
              <PenLine size={16} />
              Create your first post
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" id="bottom-cta-about">
            <Link href="/about">Learn more →</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

const stats = [
  { value: 'CRUD', label: 'Full API Coverage' },
  { value: '3', label: 'Rendering Strategies' },
  { value: '100%', label: 'TypeScript' },
  { value: 'Free', label: 'Open Source' },
]

const features = [
  { icon: PenLine, title: 'Write posts', desc: 'Title, content, excerpt, and tags. Draft or publish in one click.' },
  { icon: Globe, title: 'Public feed (ISR)', desc: 'Published posts appear in the feed, revalidated every 60 seconds.' },
  { icon: Layers, title: 'Dashboard (SSR)', desc: 'Your posts dashboard is always server-rendered fresh on every request.' },
  { icon: Zap, title: 'Server Actions', desc: 'Create, edit, and delete via Server Actions - no manual fetch calls.' },
  { icon: Database, title: 'Prisma + PostgreSQL', desc: 'Full database integration with structured queries and type safety.' },
  { icon: Code2, title: 'REST API routes', desc: 'GET, POST, PUT, PATCH, DELETE - all fully implemented and documented.' },
]

const steps = [
  { title: 'Write your post', desc: 'Fill in the title, content, excerpt, and tags. Choose to save as draft or publish.' },
  { title: 'Publish to feed', desc: 'Toggle the publish switch and your post goes live in the public feed immediately.' },
  { title: 'Manage and edit', desc: 'Head to My Posts to edit, update, or delete any of your posts at any time.' },
]

const renderingCards = [
  { icon: Server, strategy: 'SSG', desc: 'Home & About pages are statically generated at build time.' },
  { icon: RefreshCw, strategy: 'ISR (60s)', desc: 'The public feed revalidates every 60 seconds for fresh content.' },
  { icon: Zap, strategy: 'SSR', desc: 'My Posts and post detail pages are rendered fresh on every request.' },
]
