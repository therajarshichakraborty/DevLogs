'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { PenLine } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/feed', label: 'Feed' },
  { href: '/posts', label: 'My Posts' },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-3 z-50 w-full md:w-[75%] mx-auto px-4 md:px-0">
      <div className="w-full h-14 px-6 flex items-center justify-between gap-6 border border-border/80 bg-background/60 backdrop-blur-md rounded-xl shadow-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold text-sm shrink-0">
          <PenLine size={16} strokeWidth={2.5} />
          DevLog
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                pathname === link.href
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button asChild size="sm" className="rounded-full">
            <Link href="/posts/new">
              <PenLine size={14} />
              New Post
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
