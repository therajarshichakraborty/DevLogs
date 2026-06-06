import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center flex flex-col items-center gap-4">
      <span className="font-mono text-7xl font-bold text-muted/50 border border-border rounded-xl px-8 py-4">
        404
      </span>
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="mt-2">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}
