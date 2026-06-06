'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center flex flex-col items-center gap-4">
      <span className="font-mono text-7xl font-bold text-destructive/30 border border-destructive/20 bg-destructive/5 rounded-xl px-8 py-4">
        500
      </span>
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="text-sm text-muted-foreground max-w-sm">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <div className="flex items-center gap-3 mt-2">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="ghost">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
